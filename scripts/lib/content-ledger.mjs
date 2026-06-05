import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const DEFAULT_PLATFORMS = [
  'website',
  'linkedin',
  'medium',
  'devto',
  'hashnode',
  'hackernoon',
  'dzone',
  'substack',
  'reddit',
  'x',
];

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeTitle(value) {
  return String(value)
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/\(v\d+\)|\bv\d+\b/g, '')
    .replace(/^or:\s*/, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => parseScalar(item.trim()))
      .filter(Boolean);
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
    meta[trimmed.slice(0, separatorIndex).trim()] = parseScalar(
      trimmed.slice(separatorIndex + 1),
    );
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

function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function walkMarkdown(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(entryPath));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(entryPath);
  }
  return files;
}

function wordsIn(body) {
  return body.split(/\s+/).filter(Boolean).length;
}

function isImageFile(filePath) {
  return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function imageFilesIn(root) {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => path.join(root, entry.name));
}

function collectImageEmbeds(body) {
  const wiki = Array.from(body.matchAll(/!\[\[([^\]]+)]]/g)).map((match) => match[1].trim());
  const markdown = Array.from(body.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)).map((match) => match[1].trim());
  return [...wiki, ...markdown];
}

function adjacentVisualAssets(filePath) {
  const directory = path.dirname(filePath);
  const basename = path.basename(filePath, path.extname(filePath));
  const candidates = [
    path.join(directory, basename),
    path.join(directory, 'images'),
  ];
  const files = [];
  for (const candidate of candidates) {
    files.push(...imageFilesIn(candidate));
  }
  return [...new Set(files)];
}

function classifySource(relativePath) {
  const parts = relativePath.split(path.sep);
  const first = parts[0] ?? '';
  const second = parts[1] ?? '';

  if (first === '_organized') {
    if (second === 'ready') return { bucket: 'organized-ready', freshnessRank: 5 };
    if (second === 'vault-drafts') return { bucket: 'organized-vault-drafts', freshnessRank: 6 };
    if (second === 'published') return { bucket: 'organized-published', freshnessRank: 8 };
    return { bucket: 'organized-research', freshnessRank: 9 };
  }

  if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(first)) {
    return { bucket: 'dated-folder', freshnessRank: 0 };
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(first)) {
    return { bucket: 'dated-root-file', freshnessRank: 1 };
  }

  if (first === 'wave 2') return { bucket: 'wave-2', freshnessRank: 2 };
  if (first === 'third-wave') return { bucket: 'third-wave', freshnessRank: 3 };
  if (first === '_sync' || first === 'images') return { bucket: 'non-article-support', freshnessRank: 10 };
  return { bucket: 'loose-root', freshnessRank: 4 };
}

function isSupportDocument(relativePath, title) {
  const normalizedPath = relativePath.toLowerCase();
  const normalizedTitle = String(title).toLowerCase();
  return (
    /(^|[/\\])(notes|handoff|image-choices|revision-notes|content-grove|readme)\.md$/.test(normalizedPath) ||
    /(working notes|session handoff|image choices|revision notes)/.test(normalizedTitle)
  );
}

function inferCollection(title, relativePath, body) {
  const haystack = `${title} ${relativePath} ${body.slice(0, 500)}`.toLowerCase();

  if (/(filter|meter|noticers|credibility|crew|factory amplification|modular primitive|compression|code my fingers|context is not a token budget)/.test(haystack)) {
    return 'Factory Primitives';
  }
  if (/(soul file|building minds|cast not the character|three brothers|eight minds|agents disagree|agent memory|multiplicity|life coach|supplement stack|bmo|chatbot is the wrong word)/.test(haystack)) {
    return 'Building Minds';
  }
  if (/(memory is identity|five ways an agent can remember|map stops matching|fact that breaks|avatar not god|lifetimes of meaning|reorganization from the outside)/.test(haystack)) {
    return 'Memory, Context, and Reality';
  }
  if (/(observer|hallucinat|lying|distributed truth|fidelity|story vs state)/.test(haystack)) {
    return 'Observer Systems';
  }
  if (/(ubi|shore|meaning|human programming|mental agility|positive corruption)/.test(haystack)) {
    return 'Human Outcomes';
  }
  return 'Unassigned';
}

function readJsonIfExists(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function websiteArticleSlugs(articlesRoot) {
  if (!fs.existsSync(articlesRoot)) return new Set();
  return new Set(
    fs
      .readdirSync(articlesRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => fs.existsSync(path.join(articlesRoot, entry.name, 'index.md')))
      .map((entry) => entry.name),
  );
}

function websiteImageCount(publicRoot, slug) {
  return imageFilesIn(path.join(publicRoot, 'blog', slug, 'images')).length;
}

function packageCoverage(packagesRoot, slug) {
  const result = {};
  for (const platform of DEFAULT_PLATFORMS) {
    if (platform === 'website' || platform === 'x') continue;
    result[platform] = fs.existsSync(path.join(packagesRoot, slug, `${platform}.md`))
      ? 'package-ready'
      : 'needs-package';
  }
  return result;
}

function scheduleEntriesBySlug(publishSchedulePath) {
  const schedule = readJsonIfExists(publishSchedulePath, { entries: [] });
  const bySlug = new Map();
  for (const entry of schedule.entries ?? []) {
    if (!entry.articleSlug) continue;
    bySlug.set(entry.articleSlug, [...(bySlug.get(entry.articleSlug) ?? []), entry]);
  }
  return bySlug;
}

function releaseSchedule(entries = []) {
  const normalized = entries
    .map((entry) => ({
      scheduledAt: entry.scheduledAt,
      platform: entry.platform,
      displayName: entry.displayName,
      action: entry.action,
      status: entry.status,
      blocked: Boolean(entry.blocked),
      safeDefault: entry.safeDefault ?? 'do-not-publish',
      approvalStatus: entry.approval?.status ?? 'missing',
      publicPublishingAllowed: Boolean(entry.publicPublishingAllowed),
    }))
    .sort((left, right) => String(left.scheduledAt).localeCompare(String(right.scheduledAt)));

  return {
    status: normalized.length > 0 ? 'scheduled-or-queued' : 'needs-schedule',
    count: normalized.length,
    nextScheduledAt: normalized[0]?.scheduledAt ?? null,
    entries: normalized,
  };
}

function platformState(platformLedger, slug, packageState) {
  const article = platformLedger.articles?.[slug];
  const platforms = {};
  for (const platform of DEFAULT_PLATFORMS) {
    if (platform === 'x') {
      platforms[platform] = {
        status: 'needs-social-teaser',
        safeDefault: 'draft-only',
      };
      continue;
    }
    const existing = article?.platforms?.[platform];
    platforms[platform] = {
      status: existing?.status ?? packageState[platform] ?? 'not-started',
      url: existing?.url ?? '',
      safeDefault: platform === 'website' ? 'stage-on-site-first' : 'do-not-publish-without-approval',
    };
  }
  return platforms;
}

function gateStatus({ isOnWebsite, websiteImages, localImages, embeds, wordCount, packageState, scheduled }) {
  const hasAnyImage = websiteImages > 0 || localImages.length > 0 || embeds.length > 0;
  const hasSocialPackage = ['linkedin', 'reddit', 'x'].some((platform) => packageState[platform] === 'package-ready');
  return {
    thesis: wordCount >= 600 ? 'likely-finished-text-review-needed' : 'needs-thesis-lock',
    image: websiteImages > 0
      ? 'approved-or-staged-on-website'
      : hasAnyImage
        ? 'needs-image-selection-approval'
        : 'needs-image-generation',
    website: isOnWebsite ? 'staged-or-published' : 'needs-website-staging',
    socialTeaser: hasSocialPackage ? 'package-started' : 'needs-short-teaser',
    syndication: Object.values(packageState).some((value) => value === 'package-ready')
      ? 'package-started'
      : 'needs-platform-packages',
    release: scheduled.status,
    approval: 'needs-david-approval-before-public-release',
  };
}

function inventoryItem({
  blogsRoot,
  articlesRoot,
  publicRoot,
  packagesRoot,
  platformLedger,
  scheduleBySlug,
  filePath,
}) {
  const relativePath = path.relative(blogsRoot, filePath);
  const { body, meta } = readMarkdown(filePath);
  const title = meta.title ?? firstHeading(body);
  if (!title) return null;
  const source = classifySource(relativePath);
  if (source.bucket === 'non-article-support' || source.bucket === 'organized-research') return null;
  if (isSupportDocument(relativePath, title)) return null;

  const slug = slugify(title);
  const websiteSlugs = websiteArticleSlugs(articlesRoot);
  const isOnWebsite = websiteSlugs.has(slug);
  const embeds = collectImageEmbeds(body);
  const localImages = adjacentVisualAssets(filePath);
  const websiteImages = websiteImageCount(publicRoot, slug);
  const wordCount = wordsIn(body);
  const packageState = packageCoverage(packagesRoot, slug);
  const scheduled = releaseSchedule(scheduleBySlug.get(slug) ?? []);

  return {
    id: `content:${slug}:${source.bucket}`,
    slug,
    title,
    normalizedTitle: normalizeTitle(title),
    sourcePath: filePath,
    relativePath,
    sourceBucket: source.bucket,
    freshnessRank: source.freshnessRank,
    sourceStatus: meta.status ?? null,
    collection: inferCollection(title, relativePath, body),
    wordCount,
    imageEvidence: {
      embeds,
      adjacentImageCount: localImages.length,
      adjacentImages: localImages.map((item) => path.relative(blogsRoot, item)),
      websiteImageCount: websiteImages,
    },
    gates: gateStatus({
      isOnWebsite,
      websiteImages,
      localImages,
      embeds,
      wordCount,
      packageState,
      scheduled,
    }),
    releaseSchedule: scheduled,
    platforms: platformState(platformLedger, slug, packageState),
    social: {
      linkedinTeaser: packageState.linkedin === 'package-ready' ? 'package-ready' : 'needs-short-teaser',
      xTeaser: 'needs-short-teaser',
      redditSeed: packageState.reddit === 'package-ready' ? 'package-ready' : 'needs-community-specific-seed',
      note: 'Social posts should route back to canonical website URLs and stop before public publish until approved.',
    },
  };
}

function canonicalRank(item) {
  const statusBoost = item.sourceStatus === 'ready' ? -2 : 0;
  const imageBoost = item.gates.image === 'approved-or-staged-on-website' ? -1 : 0;
  return item.freshnessRank * 100000 - item.wordCount + statusBoost + imageBoost;
}

function duplicateGroups(items) {
  const byTitle = new Map();
  for (const item of items) {
    byTitle.set(item.normalizedTitle, [...(byTitle.get(item.normalizedTitle) ?? []), item]);
  }

  return [...byTitle.values()]
    .filter((group) => group.length > 1)
    .map((group) => {
      const sorted = [...group].sort((left, right) => canonicalRank(left) - canonicalRank(right));
      return {
        normalizedTitle: sorted[0].normalizedTitle,
        canonicalSlug: sorted[0].slug,
        canonicalSourcePath: sorted[0].sourcePath,
        duplicates: sorted.slice(1).map((item) => ({
          slug: item.slug,
          title: item.title,
          sourcePath: item.sourcePath,
          sourceBucket: item.sourceBucket,
        })),
      };
    });
}

function summarize(items) {
  const byCollection = {};
  const byGate = {};
  const bySourceBucket = {};
  for (const item of items) {
    byCollection[item.collection] ??= 0;
    byCollection[item.collection] += 1;
    bySourceBucket[item.sourceBucket] ??= 0;
    bySourceBucket[item.sourceBucket] += 1;
    for (const [gate, status] of Object.entries(item.gates)) {
      byGate[gate] ??= {};
      byGate[gate][status] ??= 0;
      byGate[gate][status] += 1;
    }
  }
  return {
    totalCandidates: items.length,
    byCollection,
    bySourceBucket,
    byGate,
    likelyLegitUnpublished: items.filter((item) => (
      item.gates.website === 'needs-website-staging' &&
      item.sourceBucket !== 'organized-published'
    )).length,
    needsImageWork: items.filter((item) => item.gates.image !== 'approved-or-staged-on-website').length,
    needsSocialTeaser: items.filter((item) => item.gates.socialTeaser === 'needs-short-teaser').length,
    needsReleaseSchedule: items.filter((item) => item.gates.release === 'needs-schedule').length,
  };
}

export function buildContentLedger({
  obsidianBlogsRoot,
  websiteArticlesRoot,
  publicRoot,
  packagesRoot,
  platformLedgerPath,
  publishSchedulePath,
  generatedAt = new Date().toISOString(),
} = {}) {
  const platformLedger = readJsonIfExists(platformLedgerPath, { articles: {} });
  const scheduleBySlug = scheduleEntriesBySlug(publishSchedulePath);
  const allItems = walkMarkdown(obsidianBlogsRoot)
    .map((filePath) => inventoryItem({
      blogsRoot: obsidianBlogsRoot,
      articlesRoot: websiteArticlesRoot,
      publicRoot,
      packagesRoot,
      platformLedger,
      scheduleBySlug,
      filePath,
    }))
    .filter(Boolean)
    .sort((left, right) => {
      const rankDelta = canonicalRank(left) - canonicalRank(right);
      return rankDelta === 0 ? left.title.localeCompare(right.title) : rankDelta;
    });

  const groups = duplicateGroups(allItems);
  const duplicatePaths = new Set(groups.flatMap((group) => group.duplicates.map((item) => item.sourcePath)));
  const canonicalItems = allItems.filter((item) => !duplicatePaths.has(item.sourcePath));

  return {
    schemaVersion: 'content-ledger-v1',
    generatedAt,
    publicPublishingPerformed: false,
    sourceOrder: [
      'dated-folder',
      'dated-root-file',
      'wave-2',
      'third-wave',
      'loose-root',
      'organized-ready',
      'organized-vault-drafts',
      'organized-published',
    ],
    sourceRoots: {
      obsidianBlogsRoot,
      websiteArticlesRoot,
      publicRoot,
      packagesRoot,
      platformLedgerPath,
      publishSchedulePath,
    },
    summary: summarize(canonicalItems),
    duplicateGroups: groups,
    items: canonicalItems,
    observation: {
      claim: 'upstream content candidates are deduped and gated before website staging, image work, social teasers, or syndication',
      status: canonicalItems.length > 0 ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'content-ledger.json readback',
        'Obsidian dated-folder manual inspection',
        'ROM heartbeat',
      ],
    },
  };
}

function gateLine(item) {
  return [
    item.gates.thesis,
    item.gates.image,
    item.gates.website,
    item.gates.socialTeaser,
    item.gates.release,
  ].join(' | ');
}

export function contentLedgerMarkdown(ledger) {
  const lines = [
    '# Content Ledger',
    '',
    `Generated: ${ledger.generatedAt}`,
    `Public publishing performed: ${ledger.publicPublishingPerformed ? 'yes' : 'no'}`,
    '',
    '## Summary',
    '',
    `- Canonical candidates: ${ledger.summary.totalCandidates}`,
    `- Likely legit unpublished: ${ledger.summary.likelyLegitUnpublished}`,
    `- Needs image work: ${ledger.summary.needsImageWork}`,
    `- Needs social teaser: ${ledger.summary.needsSocialTeaser}`,
    `- Needs release schedule: ${ledger.summary.needsReleaseSchedule}`,
    `- Duplicate groups: ${ledger.duplicateGroups.length}`,
    '',
    '## Collections',
    '',
  ];

  for (const [collection, count] of Object.entries(ledger.summary.byCollection)) {
    lines.push(`- ${collection}: ${count}`);
  }

  lines.push('', '## Canonical Candidates', '');
  for (const item of ledger.items) {
    lines.push(`- [ ] ${item.title} (\`${item.slug}\`)`);
    lines.push(`  - Collection: ${item.collection}`);
    lines.push(`  - Source: \`${item.relativePath}\``);
    lines.push(`  - Gates: ${gateLine(item)}`);
    lines.push(`  - Release: ${item.releaseSchedule.status}${item.releaseSchedule.nextScheduledAt ? ` next ${item.releaseSchedule.nextScheduledAt}` : ''}`);
    lines.push(`  - Social: LinkedIn ${item.social.linkedinTeaser}; X ${item.social.xTeaser}; Reddit ${item.social.redditSeed}`);
  }

  lines.push('', '## Duplicate Groups', '');
  if (ledger.duplicateGroups.length === 0) {
    lines.push('- No duplicate groups detected.');
  } else {
    for (const group of ledger.duplicateGroups) {
      lines.push(`- Canonical: \`${group.canonicalSourcePath}\``);
      for (const duplicate of group.duplicates) {
        lines.push(`  - Duplicate: \`${duplicate.sourcePath}\``);
      }
    }
  }

  lines.push(
    '',
    '## Safe Operating Rules',
    '',
    '- Website staging comes before social scheduling.',
    '- Image generation/selection starts after thesis lock.',
    '- Social posts are short routing teasers, not argument mirrors.',
    '- Public social publishing requires explicit David approval.',
  );

  return `${lines.join('\n')}\n`;
}
