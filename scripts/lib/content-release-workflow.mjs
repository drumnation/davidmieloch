import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const DEFAULT_SITE_URL = 'https://davidmieloch.com';
const DEFAULT_PLATFORMS = ['linkedin'];

export const CONTENT_RELEASE_WORKFLOW_STEP_IDS = [
  'canonical-article',
  'asset-gate',
  'homepage-teaser',
  'local-surfaces',
  'social-package-checklist',
  'scheduled-posting-checklist',
  'release-ladder',
];

function booleanOption(value) {
  return value === true || value === 'true' || value === '1' || value === 'yes';
}

function slugList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value).split(',').map((item) => item.trim()).filter(Boolean);
}

function safeTimestamp(generatedAt) {
  return String(generatedAt).replace(/[-:.]/g, '').replace(/\+\d{4}$/, 'Z');
}

function resolveInsideAppRoot(appRoot, filePath) {
  return path.isAbsolute(filePath) ? filePath : path.join(appRoot, filePath);
}

function repoRelativePath(appRoot, filePath) {
  const relativePath = path.relative(appRoot, filePath);
  return relativePath.startsWith('..') || path.isAbsolute(relativePath)
    ? filePath
    : relativePath;
}

function defaultCachedReceiptPath(namespace, generatedAt, slug) {
  const cacheRoot = process.env.XDG_CACHE_HOME
    ? path.resolve(process.env.XDG_CACHE_HOME)
    : path.join(os.homedir(), '.cache');

  return path.join(
    cacheRoot,
    'davidmieloch-release-receipts',
    namespace,
    `${safeTimestamp(generatedAt)}-${slug}.json`,
  );
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseArray(value) {
  const body = value.slice(1, -1).trim();
  if (!body) return [];
  return body.split(',').map((item) => parseScalar(item)).filter(Boolean);
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) {
    throw new Error('Article markdown frontmatter is required.');
  }
  const endIndex = markdown.indexOf('\n---', 4);
  if (endIndex === -1) {
    throw new Error('Article markdown frontmatter missing closing delimiter.');
  }

  const rawFrontmatter = markdown.slice(4, endIndex);
  const metadata = {};
  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    metadata[key] = value.startsWith('[') && value.endsWith(']')
      ? parseArray(value)
      : parseScalar(value);
  }
  return metadata;
}

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function commandLine(command, args) {
  return [command, ...args].join(' ');
}

function spawnCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 32,
  });
  return {
    command: commandLine(command, args),
    ok: result.status === 0,
    status: result.status,
    signal: result.signal,
    stdout: result.stdout?.trim() ?? '',
    stderr: result.stderr?.trim() ?? '',
  };
}

function assertCommandOk(result, message) {
  if (!result.ok) {
    const detail = result.stderr || result.stdout || `exit ${result.status}`;
    throw new Error(`${message}: ${detail}`);
  }
}

function findDerivedCoverImage(publicRoot, slug) {
  const imageRoot = path.join(publicRoot, 'blog', slug, 'images');
  if (!fs.existsSync(imageRoot)) return null;
  const image = fs.readdirSync(imageRoot)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort()[0];
  return image ? `/blog/${slug}/images/${image}` : null;
}

function readArticle(articlesRoot, publicRoot, slug) {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  if (!fs.existsSync(articlePath)) {
    return {
      slug,
      exists: false,
      path: articlePath,
    };
  }

  const metadata = parseFrontmatter(fs.readFileSync(articlePath, 'utf8'));
  const coverImage = metadata.coverImage ?? findDerivedCoverImage(publicRoot, slug);
  return {
    slug,
    exists: true,
    path: articlePath,
    title: metadata.title ?? slug,
    description: metadata.description ?? null,
    status: metadata.status ?? null,
    canonicalUrl: metadata.canonicalUrl ?? null,
    publishedAt: metadata.publishedAt ?? null,
    series: metadata.series ?? null,
    coverImage,
  };
}

function publishedArticles(articlesRoot, publicRoot) {
  if (!fs.existsSync(articlesRoot)) return [];
  return fs.readdirSync(articlesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readArticle(articlesRoot, publicRoot, entry.name))
    .filter((article) => article.exists && article.status === 'published')
    .sort((left, right) => Date.parse(right.publishedAt ?? 0) - Date.parse(left.publishedAt ?? 0));
}

function socialPackageState(config) {
  const packageRoot = path.join(config.socialPackagesRoot, config.slug);
  const manifestPath = path.join(packageRoot, 'manifest.json');
  const manifest = readJson(manifestPath, null);
  const files = [];
  const blockers = [];

  if (!manifest) {
    return {
      ok: false,
      packageRoot,
      manifestPath,
      files,
      blockers: ['Missing social package manifest.'],
    };
  }

  for (const platform of config.platforms) {
    const expectedPath = path.join(packageRoot, `${platform}.md`);
    const manifestFile = (manifest.files ?? []).find((file) => file.platform === platform);
    const manifestPackagePath = manifestFile?.filePath ?? expectedPath;
    const actualPath = resolveInsideAppRoot(config.appRoot, manifestPackagePath);
    const insideRepo = path.resolve(actualPath) === path.resolve(expectedPath);
    const exists = fs.existsSync(actualPath);
    const ok = Boolean(manifestFile && insideRepo && exists);

    if (!ok) {
      blockers.push(`${platform} social package manifest points outside this repo or missing file.`);
    }

    files.push({
      platform,
      expectedPath,
      repoRelativePath: repoRelativePath(config.appRoot, expectedPath),
      manifestPath: manifestPackagePath,
      resolvedPath: actualPath,
      exists,
      insideRepo,
      ok,
    });
  }

  return {
    ok: blockers.length === 0,
    packageRoot,
    manifestPath,
    manifest,
    files,
    blockers,
  };
}

function scheduledPostingChecklistState(config) {
  const calendar = readJson(config.socialCalendarPath, null);
  if (!calendar) {
    return {
      ok: false,
      path: config.socialCalendarPath,
      safeDefault: 'do-not-post',
      approvalRequired: true,
      entries: [],
      blockers: ['Missing social calendar checklist.'],
    };
  }

  const entries = (calendar.entries ?? []).filter((entry) => (
    entry.articleSlug === config.slug && config.platforms.includes(entry.platform)
  ));
  const missingPlatforms = config.platforms.filter((platform) => (
    !entries.some((entry) => entry.platform === platform)
  ));
  const unsafeEntries = entries.filter((entry) => (
    entry.publicPublishingAllowed === true
    || entry.safeDefault !== 'do-not-post'
    || entry.approval?.required !== true
  ));
  const stalePackageEntries = entries.filter((entry) => {
    const expectedPath = path.join(config.socialPackagesRoot, config.slug, `${entry.platform}.md`);
    const actualPath = entry.packagePath
      ? resolveInsideAppRoot(config.appRoot, entry.packagePath)
      : null;

    return !actualPath
      || path.resolve(actualPath) !== path.resolve(expectedPath)
      || !fs.existsSync(expectedPath);
  });
  const blockers = [
    ...missingPlatforms.map((platform) => `Missing ${platform} social calendar checklist entry.`),
    ...unsafeEntries.map((entry) => `${entry.platform} social calendar entry is not approval-gated.`),
    ...stalePackageEntries.map((entry) => `${entry.platform} social calendar entry points outside this repo or missing package file.`),
  ];

  return {
    ok: blockers.length === 0,
    path: config.socialCalendarPath,
    safeDefault: 'do-not-post',
    approvalRequired: true,
    entries,
    blockers,
  };
}

function upsertScheduledPostingChecklist(config) {
  const existing = readJson(config.socialCalendarPath, {
    schemaVersion: 'social-calendar-v1',
    generatedAt: config.generatedAt,
    publicPublishingPerformed: false,
    decisionSeam: {
      name: 'public-social-post-approval',
      actor: 'David',
      safeDefault: 'do-not-post',
    },
    summary: {
      totalEntries: 0,
      blockedEntries: 0,
    },
    entries: [],
  });
  const entries = [...(existing.entries ?? [])];
  const packageState = socialPackageState(config);

  for (const platform of config.platforms) {
    const packageFile = packageState.files.find((file) => file.platform === platform);
    const manifestFile = (packageState.manifest?.files ?? []).find((file) => file.platform === platform);
    const entryIndex = entries.findIndex((entry) => (
      entry.articleSlug === config.slug && entry.platform === platform
    ));
    const previous = entryIndex === -1 ? null : entries[entryIndex];
    const scheduledAt = previous?.scheduledAt ?? config.generatedAt;
    const nextEntry = {
      ...(previous ?? {}),
      id: previous?.id ?? `social:${platform}:${config.slug}:${scheduledAt.slice(0, 10)}`,
      scheduledAt,
      articleSlug: config.slug,
      title: packageState.manifest?.title ?? previous?.title ?? config.slug,
      platform,
      packagePath: packageFile?.repoRelativePath ?? repoRelativePath(
        config.appRoot,
        path.join(config.socialPackagesRoot, config.slug, `${platform}.md`),
      ),
      checksum: manifestFile?.checksum ?? previous?.checksum ?? null,
      status: previous?.status ?? 'planned',
      publicPublishingAllowed: false,
      safeDefault: 'do-not-post',
      approval: {
        required: true,
        status: previous?.approval?.status ?? 'missing',
        requiredFrom: previous?.approval?.requiredFrom ?? 'David',
      },
      blocked: previous?.blocked ?? false,
      blocker: previous?.blocker ?? null,
    };

    if (entryIndex === -1) entries.push(nextEntry);
    else entries[entryIndex] = nextEntry;
  }

  const nextCalendar = {
    ...existing,
    generatedAt: existing.generatedAt ?? config.generatedAt,
    publicPublishingPerformed: false,
    decisionSeam: existing.decisionSeam ?? {
      name: 'public-social-post-approval',
      actor: 'David',
      safeDefault: 'do-not-post',
    },
    summary: {
      totalEntries: entries.length,
      blockedEntries: entries.filter((entry) => entry.blocked).length,
    },
    entries,
  };
  writeJson(config.socialCalendarPath, nextCalendar);
  return {
    ok: true,
    command: 'content:release-workflow targeted social-calendar upsert',
    status: 0,
    signal: null,
    stdout: JSON.stringify({
      path: config.socialCalendarPath,
      upserted: config.platforms.map((platform) => `${config.slug}:${platform}`),
    }),
    stderr: '',
  };
}

export function parseContentReleaseWorkflowConfig(options = {}) {
  const appRoot = options.appRoot ? path.resolve(String(options.appRoot)) : process.cwd();
  const slugs = slugList(options.slug ?? options.slugs);
  if (slugs.length !== 1) {
    throw new Error('content:release-workflow requires exactly one --slug=<slug>.');
  }
  if (booleanOption(options.execute) && booleanOption(options.write)) {
    throw new Error('content:release-workflow cannot use --execute and --write together. Prepare, commit, then execute.');
  }

  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const contentRoot = options.contentRoot
    ? resolveInsideAppRoot(appRoot, String(options.contentRoot))
    : path.join(appRoot, 'content');
  const slug = slugs[0];
  const mode = booleanOption(options.execute)
    ? 'execute'
    : booleanOption(options.write)
      ? 'write'
      : 'dry-run';
  const platforms = slugList(options.platforms ?? options.platform) ;

  return {
    appRoot,
    contentRoot,
    articlesRoot: path.join(contentRoot, 'articles'),
    publicRoot: path.join(appRoot, 'public'),
    socialPackagesRoot: path.join(contentRoot, 'distribution/social-packages'),
    socialCalendarPath: path.join(contentRoot, 'distribution/social-calendar.json'),
    slug,
    platforms: platforms.length > 0 ? platforms : DEFAULT_PLATFORMS,
    generatedAt,
    mode,
    mutationAllowed: mode !== 'dry-run',
    receiptPath: options.receipt
      ? resolveInsideAppRoot(appRoot, String(options.receipt))
      : defaultCachedReceiptPath('content-release-workflow', generatedAt, slug),
    releaseLadderReceiptPath: options['release-ladder-receipt']
      ? resolveInsideAppRoot(appRoot, String(options['release-ladder-receipt']))
      : defaultCachedReceiptPath('site-release-ladder', generatedAt, slug),
  };
}

export function buildContentReleaseWorkflowPlan(config) {
  const socialPackageCommands = config.platforms.map((platform) => (
    `pnpm content:pipeline social:package ${config.slug} ${platform}`
  ));
  const routes = [
    '/',
    '/blog',
    '/rss.xml',
    '/sitemap.xml',
    `/blog/${config.slug}`,
    `/audio/voice/blog/${config.slug}.mp3`,
  ];

  return {
    command: 'content:release-workflow',
    mode: config.mode,
    mutationAllowed: config.mutationAllowed,
    generatedAt: config.generatedAt,
    target: {
      slug: config.slug,
      platforms: config.platforms,
    },
    commands: {
      assetGate: `pnpm content:pipeline launch:assets ${config.slug}`,
      socialPackage: socialPackageCommands,
      socialSchedule: 'content:release-workflow targeted social-calendar upsert',
      releaseLadder: `pnpm site:release-ladder --slug=${config.slug} --execute --receipt=${config.releaseLadderReceiptPath}`,
    },
    steps: [
      {
        id: 'canonical-article',
        title: 'Verify canonical article exists with published metadata',
        mutates: false,
      },
      {
        id: 'asset-gate',
        title: 'Verify required assets, audio, and transcript are current',
        mutates: false,
        command: `pnpm content:pipeline launch:assets ${config.slug}`,
      },
      {
        id: 'homepage-teaser',
        title: 'Verify article is eligible for homepage teaser shelf',
        mutates: false,
      },
      {
        id: 'local-surfaces',
        title: 'Verify local route/RSS/sitemap/audio expectations before live release',
        mutates: false,
        routes,
      },
      {
        id: 'social-package-checklist',
        title: 'Prepare or verify social posting packages without public posting',
        mutates: config.mode === 'write',
        commands: socialPackageCommands,
      },
      {
        id: 'scheduled-posting-checklist',
        title: 'Prepare or verify scheduled posting checklist with approval seam',
        mutates: config.mode === 'write',
        command: 'content:release-workflow targeted social-calendar upsert',
      },
      {
        id: 'release-ladder',
        title: 'Hand off clean committed release to site release ladder',
        mutates: config.mode === 'execute',
        command: `pnpm site:release-ladder --slug=${config.slug} --execute --receipt=${config.releaseLadderReceiptPath}`,
      },
    ],
  };
}

export function collectContentReleaseWorkflowState(config) {
  const blockers = [];
  const warnings = [];
  const article = readArticle(config.articlesRoot, config.publicRoot, config.slug);

  if (!article.exists) {
    blockers.push('Canonical article is missing.');
  } else {
    if (article.status !== 'published') blockers.push('Canonical article is not published.');
    if (!article.canonicalUrl) blockers.push('Canonical article is missing canonicalUrl.');
    if (!article.description) blockers.push('Canonical article is missing description.');
    if (!article.publishedAt) blockers.push('Canonical article is missing publishedAt.');
  }

  const homepageArticles = publishedArticles(config.articlesRoot, config.publicRoot)
    .filter((item) => item.coverImage)
    .slice(0, 10);
  const homepageIndex = homepageArticles.findIndex((item) => item.slug === config.slug);
  const homepageTeaser = {
    ok: homepageIndex !== -1,
    rank: homepageIndex === -1 ? null : homepageIndex + 1,
    expectedSource: 'getPublishedArticles().filter(article.coverImage).slice(0, 10)',
    slugs: homepageArticles.map((item) => item.slug),
  };

  if (article.exists && !article.coverImage) {
    blockers.push('Canonical article has no cover image, so it cannot appear in homepage teaser shelf.');
  }
  if (article.exists && article.status === 'published' && article.coverImage && !homepageTeaser.ok) {
    blockers.push('Canonical article is not in homepage teaser shelf top 10.');
  }

  const socialPackages = socialPackageState(config);
  blockers.push(...socialPackages.blockers);

  const scheduledPostingChecklist = scheduledPostingChecklistState(config);
  blockers.push(...scheduledPostingChecklist.blockers);

  const localSurfaces = {
    expectedRoutes: [
      '/',
      '/blog',
      '/rss.xml',
      '/sitemap.xml',
      `/blog/${config.slug}`,
      `/audio/voice/blog/${config.slug}.mp3`,
    ],
    expectedRssLink: `${DEFAULT_SITE_URL}/blog/${config.slug}`,
    expectedSitemapUrl: `${DEFAULT_SITE_URL}/blog/${config.slug}`,
  };

  return {
    generatedAt: new Date().toISOString(),
    article,
    homepageTeaser,
    localSurfaces,
    socialPackages,
    scheduledPostingChecklist,
    blockers: [...new Set(blockers)],
    warnings,
    summary: {
      status: blockers.length > 0 ? 'blocked' : 'ready',
      blockerCount: blockers.length,
      warningCount: warnings.length,
    },
  };
}

export function buildContentReleaseWorkflowReceipt({
  config,
  plan,
  status,
  state,
  commandLog = [],
  errors = [],
}) {
  return {
    command: 'content:release-workflow',
    status,
    mode: config.mode,
    generatedAt: config.generatedAt,
    receiptPath: config.receiptPath,
    target: {
      slug: config.slug,
      platforms: config.platforms,
    },
    publicPublishingPerformed: false,
    socialPostingPerformed: false,
    state,
    commandLog,
    errors,
    plan,
    observation: {
      claim:
        'content release workflow reconciled canonical article, assets, homepage teaser, social checklist, schedule, and release ladder handoff',
      status: status === 'passed' ? 'PASS' : status === 'planned' || status === 'prepared' ? 'DEGRADED' : 'FAIL',
      fallbackChain: [
        'canonical article readback',
        'launch asset/audio/transcript gate',
        'homepage teaser derivation',
        'social package manifest readback',
        'scheduled posting checklist readback',
        'site release ladder handoff',
      ],
    },
  };
}

function writeReceipt(receipt) {
  writeJson(receipt.receiptPath, receipt);
}

function errorWithPayload(message, payload) {
  const error = new Error(message);
  error.payload = payload;
  return error;
}

export async function runContentReleaseWorkflow(options = {}) {
  const config = parseContentReleaseWorkflowConfig(options);
  const plan = buildContentReleaseWorkflowPlan(config);
  const commandLog = [];
  const errors = [];

  const record = (stepId, result) => {
    commandLog.push({ stepId, ...result });
    return result;
  };

  try {
    if (config.mode === 'write') {
      for (const platform of config.platforms) {
        const result = record(
          'social-package-checklist',
          spawnCommand('pnpm', ['content:pipeline', 'social:package', config.slug, platform], {
            cwd: config.appRoot,
          }),
        );
        assertCommandOk(result, `Unable to write ${platform} social package`);
      }
      record('scheduled-posting-checklist', upsertScheduledPostingChecklist(config));
    }

    const assetGate = record(
      'asset-gate',
      spawnCommand('pnpm', ['content:pipeline', 'launch:assets', config.slug], {
        cwd: config.appRoot,
      }),
    );
    assertCommandOk(assetGate, 'Launch asset/audio/transcript gate failed');

    const state = collectContentReleaseWorkflowState(config);
    if (state.blockers.length > 0) {
      throw new Error(`Content release workflow blocked: ${state.blockers.join('; ')}`);
    }

    if (config.mode === 'execute') {
      const release = record(
        'release-ladder',
        spawnCommand(
          'pnpm',
          [
            'site:release-ladder',
            `--slug=${config.slug}`,
            '--execute',
            `--receipt=${config.releaseLadderReceiptPath}`,
          ],
          {
            cwd: config.appRoot,
          },
        ),
      );
      assertCommandOk(release, 'Site release ladder failed');
    }

    const status = config.mode === 'execute'
      ? 'passed'
      : config.mode === 'write'
        ? 'prepared'
        : 'planned';
    const receipt = buildContentReleaseWorkflowReceipt({
      config,
      plan,
      status,
      state,
      commandLog,
    });
    if (config.mode !== 'dry-run' || options.receipt) writeReceipt(receipt);
    return receipt;
  } catch (error) {
    errors.push(error.message);
    const state = collectContentReleaseWorkflowState(config);
    const receipt = buildContentReleaseWorkflowReceipt({
      config,
      plan,
      status: 'failed',
      state,
      commandLog,
      errors,
    });
    if (config.mode !== 'dry-run' || options.receipt) writeReceipt(receipt);
    throw errorWithPayload(`${error.message}. Content release receipt: ${config.receiptPath}`, receipt);
  }
}
