#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { loadDotEnvFile } from './lib/load-dotenv.mjs';
import {
  fetchMediumFeed,
  importMediumArticle,
  mediumFeedUrl,
  parseMediumFeed,
} from './lib/medium-reader.mjs';
import {
  contentMetricsChecklist,
  contentMetricsReport,
  recordContentMetric,
} from './lib/content-metrics.mjs';
import {
  readObsidianArticle,
  resolveObsidianBlogsRoot,
  scanObsidianArticles,
} from './lib/obsidian-reader.mjs';
import {
  checksumPayload,
  readRecentObservations,
  resolveHeartbeatPath,
  writeObservation,
} from './lib/observability.mjs';
import { generatePlatformPackages, platformPackageDefaults } from './lib/platform-packages.mjs';
import { importWebsiteArticle } from './lib/website-importer.mjs';

const appRoot = process.cwd();
const envPath = path.join(appRoot, '.env.local');
const contentRoot = process.env.CONTENT_ROOT
  ? path.resolve(process.env.CONTENT_ROOT)
  : path.join(appRoot, 'content');
const articlesRoot = path.join(contentRoot, 'articles');
const publicRoot = path.join(appRoot, 'public');
const ledgerPath = path.join(contentRoot, 'distribution/platform-ledger.json');
const statusPath = path.join(contentRoot, 'distribution/pipeline-status.json');
const packagesRoot = path.join(contentRoot, 'distribution/packages');
const metricsPath = path.join(contentRoot, 'distribution/content-metrics.json');
const launchCalendarPath = path.join(contentRoot, 'distribution/launch-calendar.json');
const syndicationPolicyPath = path.join(contentRoot, 'distribution/syndication-policy.json');
const PIPELINE_CLASSES = ['DATA_PIPELINE', 'AGENTIC_WORKFLOW', 'COMPILATION_PIPELINE'];

function redact(value) {
  if (!value) return null;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(rawFrontmatter) {
  const meta = {};
  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => parseScalar(item))
        .filter(Boolean);
    } else {
      meta[key] = parseScalar(value);
    }
  }
  return meta;
}

function readMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  if (!frontmatter) return { body: raw.trim(), meta: {} };
  return {
    body: raw.slice(frontmatter[0].length).trim(),
    meta: parseFrontmatter(frontmatter[1]),
  };
}

function readArticle(slug) {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  if (!fs.existsSync(articlePath)) {
    throw new Error(`Missing article: ${articlePath}`);
  }
  const { body, meta } = readMarkdown(articlePath);
  return { slug, body, meta };
}

function readVariant(slug, platform) {
  const variantPath = path.join(articlesRoot, slug, 'variants', `${platform}.md`);
  if (fs.existsSync(variantPath)) {
    return readMarkdown(variantPath);
  }

  const packagePath = path.join(packagesRoot, slug, `${platform}.md`);
  if (fs.existsSync(packagePath)) {
    return readMarkdown(packagePath);
  }

  throw new Error(`Missing ${platform} variant or package: ${variantPath} or ${packagePath}`);
}

function readOptionalVariants(slug, platforms) {
  const variants = {};
  for (const platform of platforms) {
    const variantPath = path.join(articlesRoot, slug, 'variants', `${platform}.md`);
    if (fs.existsSync(variantPath)) {
      variants[platform] = readMarkdown(variantPath);
    }
  }
  return variants;
}

function readLedger() {
  if (!fs.existsSync(ledgerPath)) {
    throw new Error(`Missing distribution ledger: ${ledgerPath}`);
  }
  return JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
}

function readLaunchCalendar() {
  if (!fs.existsSync(launchCalendarPath)) {
    throw new Error(`Missing launch calendar: ${launchCalendarPath}`);
  }
  return JSON.parse(fs.readFileSync(launchCalendarPath, 'utf8'));
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function hashnodeToken() {
  return process.env.HASHNODE_TOKEN ?? process.env.HASHNODE_API_KEY;
}

function devtoTags(tags) {
  if (!Array.isArray(tags)) return [];
  const normalized = [];
  for (const tag of tags) {
    const value = String(tag).toLowerCase().replace(/[^a-z0-9]/g, '');
    if (value && !normalized.includes(value)) normalized.push(value);
    if (normalized.length === 4) break;
  }
  return normalized;
}

function commandClaim(command, slug) {
  return slug
    ? `content pipeline command "${command}" produced an observable result for "${slug}"`
    : `content pipeline command "${command}" produced an observable result`;
}

function observeCommand(command, slug, statusValue, data = {}) {
  return writeObservation(appRoot, {
    source: 'content-pipeline',
    observer_id: `content-pipeline.${command}`,
    event: statusValue === 'PASS' ? 'OBSERVER_FIRED' : 'FAILURE',
    claim: commandClaim(command, slug),
    status: statusValue,
    recursion_depth: 0,
    fallback_chain_index: 0,
    data: {
      command,
      slug: slug ?? null,
      system_classes: PIPELINE_CLASSES,
      fallback_chain: [
        'structured command result checksum',
        'heartbeat readback',
        'ROM heartbeat',
      ],
      ...data,
    },
  });
}

function observeFallbackReadback(command, slug, primaryRecord) {
  const { heartbeatPath, records, corruptLines } = readRecentObservations(appRoot, 25);
  const foundPrimary = records.some((record) => record.checksum === primaryRecord.checksum);
  return writeObservation(appRoot, {
    source: 'content-pipeline-readback',
    observer_id: `content-pipeline.${command}.readback`,
    event: foundPrimary ? 'OBSERVER_FIRED' : 'FAILURE',
    claim: `heartbeat readback observed content-pipeline.${command}`,
    status: foundPrimary ? 'PASS' : 'FAIL',
    recursion_depth: 1,
    fallback_chain_index: 1,
    observation_strength: foundPrimary ? 3 : 1,
    data: {
      command,
      slug: slug ?? null,
      heartbeatPath,
      observed_checksum: primaryRecord.checksum,
      records_checked: records.length,
      corrupt_lines: corruptLines,
    },
  });
}

function observeReadbackCrossCheck(command, slug, readbackRecord) {
  return writeObservation(appRoot, {
    source: 'content-pipeline-readback-cross-check',
    observer_id: `content-pipeline.${command}.readback-cross-check`,
    event: readbackRecord.status === 'PASS' ? 'OBSERVER_FIRED' : 'FAILURE',
    claim: `readback observer for content-pipeline.${command} is itself observable`,
    status: readbackRecord.status,
    recursion_depth: 2,
    fallback_chain_index: 2,
    data: {
      command,
      slug: slug ?? null,
      observed_observer_id: readbackRecord.observer_id,
      observed_checksum: readbackRecord.checksum,
    },
  });
}

async function devto(pathname, options = {}) {
  if (!process.env.DEVTO_API_KEY) {
    throw new Error('Missing DEVTO_API_KEY. Refusing to call DEV API.');
  }
  const response = await fetch(`https://dev.to/api${pathname}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.DEVTO_API_KEY,
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  }
  if (!response.ok) throw new Error(`DEV API ${response.status}: ${JSON.stringify(payload)}`);
  return payload;
}

async function hashnode(query, variables = {}) {
  const token = hashnodeToken();
  if (!token) {
    throw new Error('Missing HASHNODE_TOKEN or HASHNODE_API_KEY. Refusing to call Hashnode API.');
  }
  const response = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const text = await response.text();
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = { errors: [{ message: text || 'Hashnode returned a non-JSON response.' }] };
  }
  if (!response.ok || payload.errors) {
    throw new Error(`Hashnode API ${response.status}: ${JSON.stringify(payload.errors ?? payload)}`);
  }
  return payload.data;
}

async function status() {
  const result = {
    checkedAt: new Date().toISOString(),
    configured: {
      devto: Boolean(process.env.DEVTO_API_KEY),
      hashnode: Boolean(hashnodeToken()),
      hashnodePublication: Boolean(process.env.HASHNODE_PUBLICATION_ID),
      medium: 'browser-import',
      linkedin: 'browser-capture',
      hackernoon: 'browser-editorial',
      substack: 'browser-newsletter',
      dzone: 'browser-editorial',
    },
    tokens: {
      devto: redact(process.env.DEVTO_API_KEY),
      hashnode: redact(hashnodeToken()),
    },
    accounts: {},
  };

  if (process.env.DEVTO_API_KEY) {
    const me = await devto('/users/me');
    const articles = await devto('/articles/me/all?per_page=20');
    result.accounts.devto = {
      id: me.id,
      name: me.name,
      username: me.username,
      websiteUrl: me.website_url,
      articleCount: articles.length,
      drafts: articles
        .filter((article) => !article.published)
        .map((article) => ({ id: article.id, title: article.title, url: article.url })),
    };
  }

  if (hashnodeToken()) {
    const data = await hashnode(`
      query Me {
        me {
          id
          username
          name
          publications(first: 20) {
            edges {
              node { id title url }
            }
          }
          drafts(first: 20) {
            edges {
              node { id title slug canonicalUrl }
            }
            totalDocuments
          }
        }
      }
    `);
    result.accounts.hashnode = data.me;
  }

  fs.mkdirSync(path.dirname(statusPath), { recursive: true });
  fs.writeFileSync(statusPath, `${JSON.stringify(result, null, 2)}\n`);
  return result;
}

function validate() {
  const ledger = readLedger();
  const errors = [];
  const articleSlugs = fs.existsSync(articlesRoot)
    ? fs
        .readdirSync(articlesRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : [];

  for (const slug of articleSlugs) {
    const articlePath = path.join(articlesRoot, slug, 'index.md');
    if (!fs.existsSync(articlePath)) continue;
    const article = readArticle(slug);
    const ledgerArticle = ledger.articles?.[slug];
    if (!ledgerArticle) errors.push(`${slug}: missing ledger entry`);
    if (article.meta.status === 'published' && !article.meta.canonicalUrl) {
      errors.push(`${slug}: published article is missing canonicalUrl`);
    }
    if (article.meta.status === 'published' && !String(article.meta.canonicalUrl).startsWith('https://davidmieloch.com/blog/')) {
      errors.push(`${slug}: canonicalUrl must point to davidmieloch.com/blog`);
    }
  }

  for (const [slug, article] of Object.entries(ledger.articles ?? {})) {
    if (!article.platforms) {
      errors.push(`${slug}: missing platform statuses`);
      continue;
    }
    for (const [platform, record] of Object.entries(article.platforms)) {
      const statusValue = record?.status;
      if (Array.isArray(statusValue)) {
        errors.push(`${slug}/${platform}: status must be a single string`);
      }
      if (statusValue === 'published' && !record.url) {
        errors.push(`${slug}/${platform}: published platform status requires url`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Validation failed:\n- ${errors.join('\n- ')}`);
    throw new Error(`Validation failed:\n- ${errors.join('\n- ')}`);
  }

  return { ok: true, articles: articleSlugs.length };
}

function scheduleDryRun(slug) {
  const article = readArticle(slug);
  const platforms = {
    davidmieloch: { action: 'canonical-site-build', mode: 'local-build' },
    linkedin: { action: 'create-launch-post', mode: 'requires-browser-confirmation' },
    reddit: { action: 'create-community-specific-discussion-package', mode: 'manual-package' },
    medium: { action: 'import-canonical-url', mode: 'requires-browser-confirmation' },
    devto: { action: 'create-unpublished-draft', mode: 'api-backed' },
    hashnode: { action: 'create-delisted-draft', mode: 'api-backed' },
    hackernoon: { action: 'import-canonical-url-submit-review', mode: 'requires-browser-confirmation' },
    dzone: { action: 'prepare-editorial-submission', mode: 'requires-browser-confirmation' },
    substack: { action: 'prepare-newsletter-draft', mode: 'requires-browser-confirmation' },
  };

  return {
    slug,
    title: article.meta.title,
    canonicalUrl: article.meta.canonicalUrl,
    publicPosting: 'not-performed-by-this-command',
    platforms,
  };
}

function manualPackage(slug, platform) {
  const platforms = platform ? [platform] : platformPackageDefaults.platforms;
  if (slug === 'all') {
    const slugs = fs
      .readdirSync(articlesRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => fs.existsSync(path.join(articlesRoot, entry.name, 'index.md')))
      .map((entry) => entry.name)
      .sort();
    return {
      generated: slugs.map((articleSlug) => {
        const article = readArticle(articleSlug);
        const variants = readOptionalVariants(articleSlug, platforms);
        return generatePlatformPackages({
          article,
          outputRoot: packagesRoot,
          variants,
          platforms,
        });
      }),
    };
  }
  const article = readArticle(slug);
  const variants = readOptionalVariants(slug, platforms);
  return generatePlatformPackages({
    article,
    outputRoot: packagesRoot,
    variants,
    platforms,
  });
}

function parseMetricRecordArgs(args) {
  const values = {};
  for (const arg of args) {
    if (!arg.startsWith('--')) continue;
    const separator = arg.indexOf('=');
    if (separator === -1) {
      values[arg.slice(2)] = true;
      continue;
    }
    values[arg.slice(2, separator)] = arg.slice(separator + 1);
  }
  return values;
}

function parseCommandOptions(startIndex = 3) {
  return parseMetricRecordArgs(process.argv.slice(startIndex));
}

function listPackageManifests() {
  if (!fs.existsSync(packagesRoot)) return [];
  return fs
    .readdirSync(packagesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesRoot, entry.name, 'manifest.json'))
    .filter((manifestPath) => fs.existsSync(manifestPath))
    .map((manifestPath) => JSON.parse(fs.readFileSync(manifestPath, 'utf8')));
}

function summarizePackageCoverage() {
  const manifests = listPackageManifests();
  const platforms = {};
  for (const manifest of manifests) {
    for (const file of manifest.files ?? []) {
      platforms[file.platform] ??= 0;
      platforms[file.platform] += 1;
    }
  }
  return {
    packagedArticles: manifests.length,
    platformPackageCounts: platforms,
  };
}

function summarizeLedgerReadiness(ledger) {
  const platforms = {};
  for (const article of Object.values(ledger.articles ?? {})) {
    for (const [platform, record] of Object.entries(article.platforms ?? {})) {
      platforms[platform] ??= {};
      const statusValue = record?.status ?? 'missing';
      platforms[platform][statusValue] ??= 0;
      platforms[platform][statusValue] += 1;
    }
  }
  return platforms;
}

async function probeUrl(url, skipNetwork) {
  if (skipNetwork) {
    return { url, status: 'SKIPPED', ok: null };
  }
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return { url, status: response.status, ok: response.ok };
  } catch (error) {
    const curl = spawnSync('curl', [
      '-k',
      '-I',
      '-L',
      '--max-time',
      '15',
      '-o',
      '/dev/null',
      '-w',
      '%{http_code}',
      url,
    ], { encoding: 'utf8' });
    const statusCode = Number(curl.stdout);
    if (statusCode > 0) {
      return {
        url,
        status: statusCode,
        ok: statusCode >= 200 && statusCode < 400,
        fallback: 'curl',
        primaryError: error.message,
      };
    }
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message,
      fallbackError: curl.stderr.trim(),
    };
  }
}

function readinessStatus({ ready = false, blocked = false, manual = false }) {
  if (ready) return 'ready';
  if (blocked) return 'blocked';
  if (manual) return 'manual-ready';
  return 'needs-work';
}

async function readinessReport() {
  const options = parseCommandOptions(2);
  const skipNetwork = Boolean(options['skip-network']);
  const ledger = readLedger();
  const packageCoverage = summarizePackageCoverage();
  const ledgerStatusCounts = summarizeLedgerReadiness(ledger);
  const canonicalProbe = await probeUrl('https://davidmieloch.com/blog/the-factory', skipNetwork);
  const stagingProbe = await probeUrl('https://davidmieloch.brain-garden.io/blog/the-factory', skipNetwork);
  const canonicalReady = canonicalProbe.ok === true;
  const stagingReady = stagingProbe.ok !== false;
  const hashnodeHasToken = Boolean(hashnodeToken());
  const hashnodeHasPublication = Boolean(process.env.HASHNODE_PUBLICATION_ID);
  const devtoReady = Boolean(process.env.DEVTO_API_KEY);

  return {
    generatedAt: new Date().toISOString(),
    purpose: 'content distribution platform readiness',
    publicPublishingPerformed: false,
    probes: {
      canonical: canonicalProbe,
      staging: stagingProbe,
    },
    packageCoverage,
    ledgerStatusCounts,
    platforms: {
      website: {
        status: readinessStatus({ ready: canonicalReady }),
        blocker: canonicalReady ? null : 'Canonical davidmieloch.com blog URL is not verified as reachable.',
        fallback: stagingReady ? 'Use davidmieloch.brain-garden.io for staging-only draft prep.' : 'Fix hosted site before import-based workflows.',
        nextAction: canonicalReady
          ? 'Keep website as canonical source of truth.'
          : 'Finish DNS/Caddy/Vercel cutover so davidmieloch.com/blog/the-factory returns 200.',
      },
      devto: {
        status: readinessStatus({ ready: devtoReady }),
        blocker: devtoReady ? null : 'Missing DEVTO_API_KEY.',
        nextAction: devtoReady
          ? 'Create remaining unpublished DEV drafts from generated packages.'
          : 'Add DEVTO_API_KEY before API-backed draft creation.',
      },
      hashnode: {
        status: readinessStatus({ ready: hashnodeHasToken && hashnodeHasPublication, blocked: !hashnodeHasToken || !hashnodeHasPublication }),
        blocker: hashnodeHasToken && hashnodeHasPublication
          ? null
          : 'Missing working Hashnode token/publication id pair.',
        nextAction: 'Recover HASHNODE_PUBLICATION_ID and verify GraphQL JSON responses before draft creation.',
      },
      medium: {
        status: readinessStatus({ manual: canonicalReady }),
        blocker: canonicalReady ? null : 'Medium import should wait for canonical davidmieloch.com URLs.',
        nextAction: canonicalReady
          ? 'Use browser import/manual editor flow and record receipts.'
          : 'Use local packages for prep only; do not import stale Vercel 404 URLs.',
      },
      hackernoon: {
        status: readinessStatus({ manual: true }),
        blocker: null,
        nextAction: 'Use editorial/manual draft flow; stop before Submit Story for Review until approved.',
      },
      dzone: {
        status: readinessStatus({ manual: true }),
        blocker: null,
        nextAction: 'Validate article submission path and record moderation receipts.',
      },
      substack: {
        status: readinessStatus({ manual: true }),
        blocker: null,
        nextAction: 'Prepare newsletter/series roundup drafts, not one-to-one mirrors.',
      },
      reddit: {
        status: 'approval-gated',
        blocker: 'David approval required per subreddit/title/body/link.',
        nextAction: 'Prepare discussion seeds only; do not post automatically.',
      },
      linkedin: {
        status: 'source-only',
        blocker: 'No automated posting by policy.',
        nextAction: 'Use LinkedIn only for source reconciliation unless explicitly approved.',
      },
    },
    observation: {
      claim: 'platform readiness is reconciled from configuration, canonical probes, package manifests, and ledger receipts',
      status: devtoReady && stagingReady ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'readiness report',
        'content-distribution-wave-one-checklist.md',
        'ROM heartbeat',
      ],
    },
  };
}

function recordReceipt(slug, platform) {
  const options = parseCommandOptions(4);
  const statusValue = options.status;
  if (!statusValue) {
    throw new Error('receipt:record requires --status=<draft|submitted|published|skipped|blocked|rejected>.');
  }
  const receipt = recordReceiptWithValues(slug, platform, {
    status: statusValue,
    url: options.url ?? '',
    observedAt: options.observedAt ?? new Date().toISOString(),
    id: options.id,
    notes: options.notes,
    source: options.source,
  });
  return { slug, platform, receipt };
}

function parseNow(value) {
  if (!value) return new Date();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid --now value: ${value}`);
  }
  return parsed;
}

function launchDue() {
  const options = parseCommandOptions(2);
  const now = parseNow(options.now);
  const calendar = readLaunchCalendar();
  const launches = (calendar.launches ?? []).map((launch) => {
    const scheduledAt = new Date(launch.scheduledAt);
    const isDue = !Number.isNaN(scheduledAt.getTime()) && scheduledAt <= now;
    const blockers = [];
    if (!launch.articleSlug) blockers.push('missing articleSlug');
    if (launch.pendingSource?.status) blockers.push(launch.pendingSource.status);
    if (launch.approvalPolicy?.publicPublishAllowed !== true) {
      blockers.push('public publish disabled');
    }
    return {
      id: launch.id,
      title: launch.title,
      scheduledAt: launch.scheduledAt,
      articleSlug: launch.articleSlug,
      due: isDue,
      sourcePlatform: launch.sourcePlatform,
      targetPlatforms: launch.targetPlatforms ?? [],
      excludedPlatforms: launch.excludedPlatforms ?? [],
      approvalPolicy: launch.approvalPolicy ?? {},
      blockers,
      nextAction: launch.articleSlug
        ? 'Generate packages and create draft-only targets allowed by approval mode.'
        : 'Confirm source URL and import the article before creating platform drafts.',
    };
  });
  return {
    generatedAt: new Date().toISOString(),
    now: now.toISOString(),
    publicPublishingPerformed: false,
    due: launches.filter((launch) => launch.due),
    pending: launches.filter((launch) => !launch.due),
  };
}

async function createDraftForPlatform(slug, platform) {
  const options = parseCommandOptions(4);
  const ledger = readLedger();
  const article = ledger.articles?.[slug];
  if (!article) throw new Error(`Unknown article slug in ledger: ${slug}`);
  const existing = article.platforms?.[platform];
  if (!existing) throw new Error(`Unknown platform "${platform}" for article "${slug}".`);
  if (existing.status !== 'not-started' && !options.force) {
    return {
      slug,
      platform,
      skipped: true,
      reason: `existing platform status is "${existing.status}"`,
      receipt: existing,
    };
  }

  if (platform === 'devto') {
    const draft = await createDevtoDraft(slug);
    const receipt = recordReceiptWithValues(slug, platform, {
      status: 'draft',
      url: draft.url,
      id: String(draft.id),
      notes: 'Created as unpublished DEV draft through draft:create. Not publicly published.',
    });
    return { slug, platform, draft, receipt };
  }

  if (platform === 'hashnode') {
    const draft = await createHashnodeDraft(slug);
    const receipt = recordReceiptWithValues(slug, platform, {
      status: 'draft',
      url: draft.draft?.slug ? `hashnode:draft:${draft.draft.slug}` : '',
      id: draft.draft?.id,
      notes: 'Created as delisted Hashnode draft through draft:create. Not publicly published.',
    });
    return { slug, platform, draft, receipt };
  }

  return {
    slug,
    platform,
    skipped: true,
    reason: `${platform} is a browser/manual workflow; use receipt:record after manual draft setup.`,
  };
}

function recordReceiptWithValues(slug, platform, values) {
  const ledger = readLedger();
  const article = ledger.articles?.[slug];
  if (!article) throw new Error(`Unknown article slug in ledger: ${slug}`);
  if (!article.platforms?.[platform]) {
    throw new Error(`Unknown platform "${platform}" for article "${slug}".`);
  }
  article.platforms[platform] = {
    ...article.platforms[platform],
    status: values.status,
    url: values.url ?? '',
    observedAt: values.observedAt ?? new Date().toISOString(),
    ...(values.id ? { id: values.id } : {}),
    ...(values.notes ? { notes: values.notes } : {}),
    ...(values.source ? { source: values.source } : {}),
  };
  ledger.updatedAt = new Date().toISOString().slice(0, 10);
  writeJson(ledgerPath, ledger);
  return article.platforms[platform];
}

async function createDraftCommand(slug) {
  const platform = process.argv[4];
  if (!platform) {
    throw new Error('draft:create requires <slug> <platform|all>.');
  }
  if (platform !== 'all') {
    return createDraftForPlatform(slug, platform);
  }
  const targets = ['devto', 'hashnode', 'medium', 'hackernoon', 'dzone', 'substack'];
  const results = [];
  for (const target of targets) {
    results.push(await createDraftForPlatform(slug, target));
  }
  return { slug, results };
}

function receiptsReport() {
  const ledger = readLedger();
  const metrics = fs.existsSync(metricsPath)
    ? JSON.parse(fs.readFileSync(metricsPath, 'utf8'))
    : { records: {} };
  const missingReceipts = [];
  const missingMetrics = [];
  const statusCounts = summarizeLedgerReadiness(ledger);

  for (const [slug, article] of Object.entries(ledger.articles ?? {})) {
    for (const [platform, record] of Object.entries(article.platforms ?? {})) {
      if (record.status === 'not-started') {
        missingReceipts.push({ slug, platform, status: record.status });
      }
      if (record.status === 'published' && !metrics.records?.[slug]?.platforms?.[platform]) {
        missingMetrics.push({ slug, platform, url: record.url });
      }
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    status: missingReceipts.length > 0 || missingMetrics.length > 0 ? 'DEGRADED' : 'PASS',
    publicPublishingPerformed: false,
    statusCounts,
    missingReceipts,
    missingMetrics,
    observation: {
      claim: 'platform receipts and published metrics are observable from the ledger',
      status: missingReceipts.length > 0 || missingMetrics.length > 0 ? 'DEGRADED' : 'PASS',
      fallbackChain: [
        'platform-ledger.json status counts',
        'content-metrics.json published receipt reconciliation',
        'ROM heartbeat',
      ],
    },
  };
}

function metricsReport() {
  return contentMetricsReport({
    ledgerPath,
    packagesRoot,
    metricsPath,
  });
}

function metricsChecklist() {
  return contentMetricsChecklist({
    ledgerPath,
    metricsPath,
    policyPath: syndicationPolicyPath,
  });
}

function metricsRecord(slug, platform) {
  const args = parseMetricRecordArgs(process.argv.slice(4));
  const url = args.url;
  if (!url) {
    throw new Error('metrics:record requires --url=<published-url>.');
  }
  const metricValues = { ...args };
  delete metricValues.url;
  delete metricValues.source;
  delete metricValues.observedAt;
  delete metricValues.notes;
  const record = recordContentMetric({
    metricsPath,
    slug,
    platform,
    url,
    source: args.source ?? 'manual',
    observedAt: args.observedAt ?? new Date().toISOString(),
    metrics: metricValues,
    notes: args.notes ?? '',
  });
  return { slug, platform, record };
}

async function createDevtoDraft(slug) {
  const { body, meta } = readVariant(slug, 'devto');
  const article = readArticle(slug);
  const tags = Array.isArray(meta.tags) ? meta.tags : article.meta.tags;
  const payload = {
    article: {
      title: meta.title ?? article.meta.title,
      body_markdown: body,
      published: false,
      tags: devtoTags(tags),
      description: meta.description ?? article.meta.description,
      canonical_url: meta.canonical_url ?? article.meta.canonicalUrl,
    },
  };
  const created = await devto('/articles', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return {
    platform: 'devto',
    action: 'created-unpublished-draft',
    id: created.id,
    title: created.title,
    published: created.published,
    url: created.url,
  };
}

async function createHashnodeDraft(slug) {
  if (!process.env.HASHNODE_PUBLICATION_ID) {
    throw new Error('Missing HASHNODE_PUBLICATION_ID. Refusing to call Hashnode API.');
  }
  const { body, meta } = readVariant(slug, 'hashnode');
  const article = readArticle(slug);
  const tags = Array.isArray(meta.tags) ? meta.tags : article.meta.tags;
  const data = await hashnode(`
    mutation CreateDraft($input: CreateDraftInput!) {
      createDraft(input: $input) {
        draft { id slug title canonicalUrl }
      }
    }
  `, {
    input: {
      title: meta.title ?? article.meta.title,
      subtitle: meta.description ?? article.meta.description,
      publicationId: process.env.HASHNODE_PUBLICATION_ID,
      contentMarkdown: body,
      originalArticleURL: meta.canonical_url ?? article.meta.canonicalUrl,
      tags: tags.map((name) => ({
        name,
        slug: String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      })),
      settings: {
        enableTableOfContent: true,
        activateNewsletter: false,
        delist: true,
      },
    },
  });
  return {
    platform: 'hashnode',
    action: 'created-delisted-draft',
    draft: data.createDraft.draft,
  };
}

function linkedinCaptureList() {
  return {
    sourceOfTruth: 'linkedin',
    url: 'https://www.linkedin.com/in/davidmieloch/recent-activity/articles/',
    status: 'authenticated-browser-required',
    outputConvention: 'content/articles/<slug>/source-linkedin.md',
    note: 'If browser capture is unavailable, request a fresh LinkedIn data export and normalize each article into the same source-linkedin.md convention.',
  };
}

function obsidianScan() {
  const blogsRoot = resolveObsidianBlogsRoot();
  const candidates = scanObsidianArticles(blogsRoot);
  const ledger = fs.existsSync(ledgerPath) ? readLedger() : { articles: {} };
  const ledgerSlugs = new Set(Object.keys(ledger.articles ?? {}));
  return {
    blogsRoot,
    count: candidates.length,
    candidates: candidates.map((candidate) => ({
      ...candidate,
      inLedger: ledgerSlugs.has(candidate.slug),
      websiteExists: fs.existsSync(path.join(articlesRoot, candidate.slug, 'index.md')),
    })),
  };
}

function obsidianImport(slug, options = {}) {
  const blogsRoot = resolveObsidianBlogsRoot();
  const match = scanObsidianArticles(blogsRoot)
    .filter((candidate) => candidate.slug === slug)
    .sort((left, right) => {
      const leftFinal = String(left.status).includes('final') ? 1 : 0;
      const rightFinal = String(right.status).includes('final') ? 1 : 0;
      if (rightFinal !== leftFinal) return rightFinal - leftFinal;
      return right.imageCount - left.imageCount;
    })[0];
  if (!match) {
    throw new Error(`No Obsidian article candidate found for slug: ${slug}`);
  }

  const ledger = fs.existsSync(ledgerPath) ? readLedger() : { articles: {} };
  const ledgerArticle = ledger.articles?.[slug];
  const article = readObsidianArticle(match.sourcePath, blogsRoot);
  return importWebsiteArticle({
    article,
    articlesRoot,
    publicRoot,
    overwrite: Boolean(options.force),
    options: {
      publishedAt: ledgerArticle?.source?.publishedAt ?? article.date,
      series: ledgerArticle?.series ?? 'AI Factory',
      sourceUrl: ledgerArticle?.source?.url ?? '',
      canonicalUrl: ledgerArticle?.canonicalUrl || `https://davidmieloch.com/blog/${slug}`,
      tags: article.tags.length > 0 ? article.tags.filter((tag) => tag !== 'blog') : ['ai', 'agents'],
    },
  });
}

function existingArticleSourcePlatform(slug) {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  if (!fs.existsSync(articlePath)) return null;
  return readMarkdown(articlePath).meta.sourcePlatform ?? null;
}

async function mediumScan() {
  const items = parseMediumFeed(await fetchMediumFeed());
  return {
    feedUrl: mediumFeedUrl,
    count: items.length,
    items: items.map((item) => ({
      slug: item.slug,
      title: item.title,
      sourceUrl: item.sourceUrl,
      publishedAt: item.publishedAt,
      tags: item.tags,
      imageCount: item.imageUrls.length,
      websiteExists: fs.existsSync(path.join(articlesRoot, item.slug, 'index.md')),
    })),
  };
}

async function mediumImport(slug, options = {}) {
  const items = parseMediumFeed(await fetchMediumFeed());
  const selected = slug === 'all'
    ? items.filter((item) => {
        const existingSource = existingArticleSourcePlatform(item.slug);
        return !existingSource || (options.force && existingSource === 'medium');
      })
    : items.filter((item) => item.slug === slug);
  if (selected.length === 0) {
    throw new Error(`No Medium item selected for "${slug}".`);
  }

  const imported = [];
  for (const item of selected) {
    imported.push(await importMediumArticle({
      item,
      articlesRoot,
      publicRoot,
      overwrite: Boolean(options.force),
    }));
  }
  return { imported };
}

function usage() {
  console.log(`Usage:
  pnpm content:pipeline status
  pnpm content:pipeline readiness [--skip-network]
  pnpm content:pipeline validate
  pnpm content:pipeline observe:bootstrap
  pnpm content:pipeline launch:due [--now=<iso-date>]
  pnpm content:pipeline schedule:dry-run <slug>
  pnpm content:pipeline manual-package <slug|all> [platform]
  pnpm content:pipeline draft:create <slug> <platform|all> [--force]
  pnpm content:pipeline devto:create-draft <slug>
  pnpm content:pipeline hashnode:create-draft <slug>
  pnpm content:pipeline receipt:record <slug> <platform> --status=<status> [--url=<url>] [--notes=<text>] [--id=<id>]
  pnpm content:pipeline receipts:report
  pnpm content:pipeline linkedin:capture-list
  pnpm content:pipeline obsidian:scan
  pnpm content:pipeline obsidian:import <slug> [--force]
  pnpm content:pipeline medium:scan
  pnpm content:pipeline medium:import <slug|all> [--force]
  pnpm content:pipeline metrics:report
  pnpm content:pipeline metrics:checklist
  pnpm content:pipeline metrics:record <slug> <platform> --url=<published-url> [--views=0] [--clicks=0] [--reactions=0] [--comments=0] [--shares=0] [--subscribers=0]

Safety:
  - DEV and Hashnode commands create unpublished/delisted drafts only.
  - draft:create creates only unpublished/delisted API-backed drafts and skips browser/manual platforms.
  - manual-package writes local posting packages only.
  - readiness and receipt commands write local governance artifacts only.
  - metrics commands write local observation data only.
  - Medium, LinkedIn, HackerNoon, DZone, and Substack remain browser/editorial workflows.
  - No command in this script publishes public content.
`);
}

function observeBootstrap() {
  const heartbeatPath = resolveHeartbeatPath(appRoot);
  const primary = writeObservation(appRoot, {
    source: 'content-pipeline-bootstrap',
    observer_id: 'content-pipeline.bootstrap.primary',
    event: 'OBSERVER_FIRED',
    claim: 'content pipeline observability can write a ROM heartbeat record',
    status: 'PASS',
    recursion_depth: 0,
    fallback_chain_index: 0,
    data: {
      heartbeatPath,
      system_classes: PIPELINE_CLASSES,
      fallback_chain: [
        'content-pipeline.bootstrap.readback',
        'content-pipeline.bootstrap.cross-check',
        'ROM heartbeat',
      ],
    },
  });

  const readback = observeFallbackReadback('bootstrap', null, primary.record);
  const crossCheck = observeReadbackCrossCheck('bootstrap', null, readback.record);

  return {
    ok: primary.record.status === 'PASS' && readback.record.status === 'PASS',
    heartbeatPath,
    observers: [
      primary.record.observer_id,
      readback.record.observer_id,
      crossCheck.record.observer_id,
    ],
    fallbackChainLength: 3,
    systemClasses: PIPELINE_CLASSES,
  };
}

async function runCommand(command, slug) {
  if (command === 'status') {
    return status();
  }
  if (command === 'readiness') {
    return readinessReport();
  }
  if (command === 'validate') {
    return validate();
  }
  if (command === 'observe:bootstrap') {
    return observeBootstrap();
  }
  if (command === 'launch:due') {
    return launchDue();
  }
  if (command === 'schedule:dry-run' && slug) {
    return scheduleDryRun(slug);
  }
  if (command === 'draft:create' && slug) {
    return createDraftCommand(slug);
  }
  if (command === 'manual-package' && slug) {
    return manualPackage(slug, process.argv[4]);
  }
  if (command === 'metrics:report') {
    return metricsReport();
  }
  if (command === 'metrics:checklist') {
    return metricsChecklist();
  }
  if (command === 'metrics:record' && slug && process.argv[4]) {
    return metricsRecord(slug, process.argv[4]);
  }
  if (command === 'devto:create-draft' && slug) {
    return createDevtoDraft(slug);
  }
  if (command === 'hashnode:create-draft' && slug) {
    return createHashnodeDraft(slug);
  }
  if (command === 'receipt:record' && slug && process.argv[4]) {
    return recordReceipt(slug, process.argv[4]);
  }
  if (command === 'receipts:report') {
    return receiptsReport();
  }
  if (command === 'linkedin:capture-list') {
    return linkedinCaptureList();
  }
  if (command === 'obsidian:scan') {
    return obsidianScan();
  }
  if (command === 'obsidian:import' && slug) {
    return obsidianImport(slug, { force: process.argv.includes('--force') });
  }
  if (command === 'medium:scan') {
    return mediumScan();
  }
  if (command === 'medium:import' && slug) {
    return mediumImport(slug, { force: process.argv.includes('--force') });
  }

  usage();
  process.exit(command ? 1 : 0);
}

async function main() {
  const [command, slug] = process.argv.slice(2);

  try {
    const payload = await runCommand(command, slug);
    const primary = observeCommand(command, slug, 'PASS', {
      output_checksum: checksumPayload(payload),
      output_shape: Array.isArray(payload) ? 'array' : typeof payload,
    });
    const readback = observeFallbackReadback(command, slug, primary.record);
    observeReadbackCrossCheck(command, slug, readback.record);
    console.log(JSON.stringify(payload, null, 2));
  } catch (error) {
    observeCommand(command ?? 'unknown', slug, 'FAIL', {
      error: error.message,
    });
    console.error(error.message);
    process.exit(1);
  }
}

loadDotEnvFile(envPath);
await main();
