import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
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
      .map((item) => parseScalar(item))
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
  const match = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  if (!match) return { meta: {}, body: raw.trim(), raw };
  return {
    meta: parseFrontmatter(match[1]),
    body: raw.slice(match[0].length).trim(),
    raw,
  };
}

function stripLeadingTitle(markdown, title) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return markdown
    .replace(new RegExp(`^#\\s+${escapedTitle}\\s*\\n+`), '')
    .trim();
}

function normalizeForLinkedIn(markdown) {
  return markdown
    .replace(/!\[[^\]]*]\([^)]*\)\n?/g, '')
    .replace(/```[\s\S]*?```/g, (block) => {
      const lines = block.split(/\r?\n/);
      return lines.slice(1, -1).join('\n').trim();
    })
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function excerpt(markdown, maxLength = 220) {
  const text = markdown
    .replace(/[#>*_`|:-]/g, ' ')
    .replace(/\[[^\]]*]\(([^)]*)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}...`;
}

function resolveHeroSource(publicRoot, coverImage) {
  if (!coverImage) return null;
  const relativePath = coverImage.replace(/^\//, '');
  return path.join(publicRoot, relativePath);
}

function articlePacket({
  articlesRoot,
  publicRoot,
  slug,
  generatedAt,
}) {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  if (!fs.existsSync(articlePath)) {
    throw new Error(`Missing website article markdown: ${articlePath}`);
  }
  const article = readMarkdown(articlePath);
  const title = article.meta.title ?? slug;
  const body = normalizeForLinkedIn(stripLeadingTitle(article.body, title));
  const heroSourcePath = resolveHeroSource(publicRoot, article.meta.coverImage);
  const heroExists = Boolean(heroSourcePath && fs.existsSync(heroSourcePath));
  const heroChecksum = heroExists ? sha256(fs.readFileSync(heroSourcePath)) : null;

  return {
    slug,
    title,
    subtitle: article.meta.description ?? excerpt(body),
    series: article.meta.series ?? null,
    canonicalUrl: article.meta.canonicalUrl ?? `https://davidmieloch.com/blog/${slug}`,
    sourceArticlePath: articlePath,
    bodyMarkdown: body,
    bodyChecksumSha256: sha256(body),
    wordCount: body.split(/\s+/).filter(Boolean).length,
    heroImage: {
      publicPath: article.meta.coverImage ?? null,
      sourcePath: heroSourcePath,
      exists: heroExists,
      checksumSha256: heroChecksum,
    },
    safety: {
      publicPublishingAllowed: false,
      safeDefault: 'stop-at-linkedin-draft-preview',
      requiresDavidApproval: true,
    },
    browserStaging: {
      destination: 'https://www.linkedin.com/pulse/new/',
      mode: 'browser-assisted',
      stopBefore: 'publish-submit-schedule',
      orderedFields: [
        'heroImage.sourcePath',
        'title',
        'subtitle',
        'bodyMarkdown',
        'canonicalUrl',
      ],
    },
    generatedAt,
  };
}

function packetMarkdown(packet) {
  return `# ${packet.title}

## Safety

- Safe default: ${packet.safety.safeDefault}
- Public publishing allowed: ${packet.safety.publicPublishingAllowed ? 'yes' : 'no'}
- David approval required: ${packet.safety.requiresDavidApproval ? 'yes' : 'no'}
- Stop before: ${packet.browserStaging.stopBefore}

## Transfer Fields

- Hero image: ${packet.heroImage.sourcePath ?? 'missing'}
- Hero image exists: ${packet.heroImage.exists ? 'yes' : 'no'}
- Canonical URL: ${packet.canonicalUrl}
- Body checksum: ${packet.bodyChecksumSha256}

## Subtitle

${packet.subtitle}

## Body

${packet.bodyMarkdown}
`;
}

export function buildLinkedInArticleTransferPackets({
  launchPlan,
  articlesRoot,
  publicRoot,
  outputRoot,
  slug = 'all',
  write = false,
  generatedAt = new Date().toISOString(),
}) {
  const launchArticles = launchPlan.articles ?? [];
  const selectedArticles = slug === 'all'
    ? launchArticles
    : launchArticles.filter((article) => article.slug === slug);
  if (selectedArticles.length === 0) {
    throw new Error(`No launch article selected for LinkedIn transfer: ${slug}`);
  }

  const packets = selectedArticles.map((article) => {
    const packet = articlePacket({
      articlesRoot,
      publicRoot,
      slug: article.slug,
      generatedAt,
    });
    const packetRoot = path.join(outputRoot, article.slug);
    const jsonPath = path.join(packetRoot, 'linkedin-article-transfer.json');
    const markdownPath = path.join(packetRoot, 'linkedin-article-transfer.md');
    if (write) {
      fs.mkdirSync(packetRoot, { recursive: true });
      fs.writeFileSync(jsonPath, `${JSON.stringify(packet, null, 2)}\n`);
      fs.writeFileSync(markdownPath, packetMarkdown(packet));
    }
    return {
      ...packet,
      jsonPath,
      markdownPath,
    };
  });

  return {
    schemaVersion: 'linkedin-article-transfer-batch-v1',
    generatedAt,
    publicPublishingPerformed: false,
    safeDefault: 'stop-at-linkedin-draft-preview',
    summary: {
      selectedArticles: packets.length,
      heroImagesPresent: packets.filter((packet) => packet.heroImage.exists).length,
      totalWords: packets.reduce((sum, packet) => sum + packet.wordCount, 0),
    },
    packets,
    observation: {
      claim: 'LinkedIn Article transfer packets are derived from canonical website markdown',
      status: packets.every((packet) => packet.heroImage.exists) ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'linkedin article transfer packet',
        'canonical website markdown',
        'ROM heartbeat',
      ],
    },
  };
}
