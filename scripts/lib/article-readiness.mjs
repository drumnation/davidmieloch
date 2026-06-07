import fs from 'node:fs';
import path from 'node:path';

import {
  resolveObsidianBlogsRoot,
  scanObsidianArticles,
} from './obsidian-reader.mjs';

const COPYRIGHT_REFERENCE_PATTERNS = [
  /avatar:?\s+the\s+last\s+airbender/i,
  /legend\s+of\s+korra/i,
  /\baang\b/i,
  /\bnickelodeon\b/i,
  /\bnetflix\b/i,
  /\bjames\s+cameron\b/i,
];

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
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
    raw,
  };
}

function walkArticleSlugs(articlesRoot) {
  if (!fs.existsSync(articlesRoot)) return [];
  return fs
    .readdirSync(articlesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(articlesRoot, entry.name, 'index.md')))
    .map((entry) => entry.name)
    .sort();
}

function publicAssetPath(publicRoot, publicPath) {
  if (!publicPath || !String(publicPath).startsWith('/')) return null;
  return path.join(publicRoot, String(publicPath).slice(1));
}

function bodyImageCount(body) {
  return Array.from(body.matchAll(/!\[[^\]]*]\([^)]+\)/g)).length;
}

function headingCount(body) {
  return Array.from(body.matchAll(/^##\s+.+$/gm)).length;
}

function scoreWebsiteArticle({ slug, articlesRoot, publicRoot, siteReleaseCalendar }) {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  const article = readMarkdown(articlePath);
  const issues = [];
  const warnings = [];
  const gates = {};
  const status = article.meta.status ?? 'missing';
  const coverPath = publicAssetPath(publicRoot, article.meta.coverImage);
  const imageManifestPath = path.join(articlesRoot, slug, 'image-manifest.json');
  const interiorPlanPath = path.join(articlesRoot, slug, 'images', 'interior-plan.json');
  const imageBriefPath = path.join(articlesRoot, slug, 'image-brief.md');
  const imageManifest = readJsonIfExists(imageManifestPath);
  const interiorPlan = readJsonIfExists(interiorPlanPath);
  const calendarEntry = (siteReleaseCalendar?.entries ?? []).find((entry) => entry.slug === slug);

  gates.frontmatter = Boolean(article.meta.title && article.meta.description && article.meta.publishedAt && article.meta.status);
  gates.canonical = status !== 'published' || String(article.meta.canonicalUrl ?? '').startsWith('https://davidmieloch.com/blog/');
  gates.coverImage = Boolean(coverPath && fs.existsSync(coverPath));
  gates.imageManifest = Boolean(imageManifest);
  gates.interiorPlan = status === 'draft' ? Boolean(interiorPlan && fs.existsSync(imageBriefPath)) : true;
  gates.interiorImagesApproved = status === 'draft'
    ? (imageManifest?.assets ?? []).filter((asset) => asset.role === 'article-interior').length >= (interiorPlan?.targetApprovedImages ?? 0)
    : true;
  gates.releaseCalendar = status === 'draft' ? Boolean(calendarEntry) : true;
  gates.bodyStructure = headingCount(article.body) >= 3;
  gates.articleBodyImages = status === 'draft' ? bodyImageCount(article.body) >= (interiorPlan?.targetApprovedImages ?? 0) : true;

  if (!gates.frontmatter) issues.push('missing required frontmatter');
  if (!gates.canonical) issues.push('published canonicalUrl must point to davidmieloch.com/blog');
  if (!gates.coverImage) issues.push('coverImage missing or file not found');
  if (!gates.imageManifest) warnings.push('missing image-manifest.json');
  if (!gates.interiorPlan) warnings.push('draft missing image-brief.md or images/interior-plan.json');
  if (!gates.interiorImagesApproved) warnings.push('draft interior images planned but not generated/approved');
  if (!gates.articleBodyImages) warnings.push('draft body does not yet contain planned interior images');
  if (!gates.releaseCalendar) warnings.push('draft missing site release calendar entry');
  if (!gates.bodyStructure) warnings.push('article has fewer than 3 H2 sections');

  const blocking = issues.length > 0;
  const readyForPublicRelease = !blocking
    && Object.entries(gates)
      .filter(([gate]) => !['interiorImagesApproved', 'articleBodyImages'].includes(gate))
      .every(([, value]) => value)
    && gates.interiorImagesApproved
    && gates.articleBodyImages;

  return {
    slug,
    title: article.meta.title ?? slug,
    status,
    publishedAt: article.meta.publishedAt ?? null,
    canonicalUrl: article.meta.canonicalUrl ?? null,
    paths: {
      article: path.relative(process.cwd(), articlePath),
      coverImage: article.meta.coverImage ?? null,
      imageManifest: fs.existsSync(imageManifestPath) ? path.relative(process.cwd(), imageManifestPath) : null,
      interiorPlan: fs.existsSync(interiorPlanPath) ? path.relative(process.cwd(), interiorPlanPath) : null,
      imageBrief: fs.existsSync(imageBriefPath) ? path.relative(process.cwd(), imageBriefPath) : null,
    },
    counts: {
      h2Sections: headingCount(article.body),
      bodyImages: bodyImageCount(article.body),
      manifestAssets: imageManifest?.assets?.length ?? 0,
      plannedInteriorImages: interiorPlan?.targetApprovedImages ?? 0,
      plannedInteriorVariants: interiorPlan?.candidateVariants ?? 0,
      approvedInteriorImages: (imageManifest?.assets ?? []).filter((asset) => asset.role === 'article-interior').length,
    },
    calendar: calendarEntry ? {
      plannedReleaseAt: calendarEntry.plannedReleaseAt,
      linkedinStatus: calendarEntry.linkedin?.status ?? null,
    } : null,
    gates,
    issues,
    warnings,
    readyForPublicRelease,
  };
}

function sourceBucket(relativePath) {
  if (relativePath.startsWith('_organized/ready/')) return 'organized-ready';
  if (relativePath.startsWith('_organized/vault-drafts/')) return 'organized-vault-drafts';
  if (relativePath.startsWith('third-wave/')) return 'third-wave';
  if (/^\d+-\d+-\d+\//.test(relativePath)) return 'dated-folder';
  if (relativePath.startsWith('wave 2/')) return 'wave-2';
  return 'loose-root';
}

function classifyVaultCandidate(candidate, websiteSlugs) {
  const raw = fs.readFileSync(candidate.sourcePath, 'utf8');
  const referenceRisk = COPYRIGHT_REFERENCE_PATTERNS.some((pattern) => pattern.test(raw));
  const bucket = sourceBucket(candidate.relativePath);
  const status = candidate.status ?? (bucket === 'organized-ready' ? 'ready' : 'unknown');
  const alreadyOnWebsite = websiteSlugs.has(candidate.slug);
  const recommendedImageStrategy = referenceRisk
    ? 'Do not generate protected-character/style imitation. Use original symbolic art, licensed/publicity-safe stills only with source receipts, or web-sourced images with rights/citation review.'
    : candidate.imageCount > 0
      ? 'Review existing vault images and copy approved assets into website article folder.'
      : 'Generate original article art through the spend-gated image pipeline.';

  return {
    slug: candidate.slug,
    title: candidate.title,
    status,
    sourceBucket: bucket,
    relativePath: candidate.relativePath,
    sourcePath: candidate.sourcePath,
    date: candidate.date,
    imageCount: candidate.imageCount,
    alreadyOnWebsite,
    gates: {
      websiteImport: alreadyOnWebsite ? 'already-on-website' : 'needs-website-staging',
      images: candidate.imageCount > 0 ? 'has-vault-images' : 'needs-image-plan',
      ipPolicy: referenceRisk ? 'copyright-reference-review-required' : 'original-generation-ok',
      socialTeaser: alreadyOnWebsite ? 'package-or-calendar-check' : 'needs-short-teaser',
      releaseSchedule: alreadyOnWebsite ? 'calendar-check' : 'needs-schedule',
    },
    recommendedImageStrategy,
  };
}

function markdownReport(report) {
  const lines = [
    '# Article Readiness Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Summary',
    '',
    `- Website articles: ${report.summary.websiteArticles}`,
    `- Website drafts: ${report.summary.websiteDrafts}`,
    `- Website drafts ready for public release: ${report.summary.websiteDraftsReadyForRelease}`,
    `- Website drafts needing interior image completion: ${report.summary.websiteDraftsNeedingInteriorImages}`,
    `- Vault candidates: ${report.summary.vaultCandidates}`,
    `- Vault candidates not yet on website: ${report.summary.vaultCandidatesNotOnWebsite}`,
    `- Vault candidates with copyright-reference image risk: ${report.summary.vaultCandidatesWithCopyrightReferenceRisk}`,
    '',
    '## Website Draft Gates',
    '',
  ];

  for (const article of report.websiteDrafts) {
    lines.push(`### ${article.title}`);
    lines.push('');
    lines.push(`- Slug: \`${article.slug}\``);
    lines.push(`- Release: ${article.calendar?.plannedReleaseAt ?? 'not scheduled'}`);
    lines.push(`- Body images: ${article.counts.bodyImages}/${article.counts.plannedInteriorImages}`);
    lines.push(`- Approved interior images: ${article.counts.approvedInteriorImages}/${article.counts.plannedInteriorImages}`);
    lines.push(`- Ready: ${article.readyForPublicRelease ? 'yes' : 'no'}`);
    if (article.warnings.length) lines.push(`- Warnings: ${article.warnings.join('; ')}`);
    if (article.issues.length) lines.push(`- Issues: ${article.issues.join('; ')}`);
    lines.push('');
  }

  lines.push('## Vault Candidates Needing Website Staging');
  lines.push('');
  for (const candidate of report.vaultCandidates.filter((item) => !item.alreadyOnWebsite).slice(0, 30)) {
    lines.push(`### ${candidate.title}`);
    lines.push('');
    lines.push(`- Slug: \`${candidate.slug}\``);
    lines.push(`- Bucket: ${candidate.sourceBucket}`);
    lines.push(`- Source: \`${candidate.relativePath}\``);
    lines.push(`- Images: ${candidate.imageCount}`);
    lines.push(`- IP policy: ${candidate.gates.ipPolicy}`);
    lines.push(`- Image strategy: ${candidate.recommendedImageStrategy}`);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

export function buildArticleReadinessReport({
  articlesRoot,
  publicRoot,
  siteReleaseCalendarPath,
  obsidianBlogsRoot = resolveObsidianBlogsRoot(),
  outputPath,
  markdownOutputPath,
  write = false,
  generatedAt = new Date().toISOString(),
}) {
  const siteReleaseCalendar = readJsonIfExists(siteReleaseCalendarPath);
  const websiteArticles = walkArticleSlugs(articlesRoot).map((slug) => scoreWebsiteArticle({
    slug,
    articlesRoot,
    publicRoot,
    siteReleaseCalendar,
  }));
  const websiteSlugs = new Set(websiteArticles.map((article) => article.slug));
  const vaultCandidates = scanObsidianArticles(obsidianBlogsRoot)
    .map((candidate) => classifyVaultCandidate(candidate, websiteSlugs))
    .sort((left, right) => {
      const leftReady = left.sourceBucket === 'organized-ready' ? 0 : 1;
      const rightReady = right.sourceBucket === 'organized-ready' ? 0 : 1;
      return leftReady - rightReady || left.title.localeCompare(right.title);
    });
  const websiteDrafts = websiteArticles.filter((article) => article.status === 'draft');
  const report = {
    schemaVersion: 'article-readiness-report-v1',
    generatedAt,
    publicPublishingPerformed: false,
    summary: {
      websiteArticles: websiteArticles.length,
      websiteDrafts: websiteDrafts.length,
      websiteDraftsReadyForRelease: websiteDrafts.filter((article) => article.readyForPublicRelease).length,
      websiteDraftsNeedingInteriorImages: websiteDrafts.filter((article) => !article.gates.interiorImagesApproved || !article.gates.articleBodyImages).length,
      vaultCandidates: vaultCandidates.length,
      vaultCandidatesNotOnWebsite: vaultCandidates.filter((candidate) => !candidate.alreadyOnWebsite).length,
      vaultCandidatesWithCopyrightReferenceRisk: vaultCandidates.filter((candidate) => candidate.gates.ipPolicy === 'copyright-reference-review-required').length,
    },
    websiteArticles,
    websiteDrafts,
    vaultCandidates,
    observation: {
      claim: 'Website and vault article readiness can be audited before image generation, import, syndication, and release scheduling.',
      status: 'PASS',
      fallbackChain: [
        'content/distribution/article-readiness-report.json',
        'docs/ops/article-readiness-report.md',
        'ROM heartbeat',
      ],
    },
  };

  if (write) {
    if (!outputPath || !markdownOutputPath) {
      throw new Error('buildArticleReadinessReport write=true requires outputPath and markdownOutputPath.');
    }
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    fs.mkdirSync(path.dirname(markdownOutputPath), { recursive: true });
    fs.writeFileSync(markdownOutputPath, markdownReport(report));
  }

  return report;
}
