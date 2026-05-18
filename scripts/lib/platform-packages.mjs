import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_PLATFORMS = [
  'linkedin',
  'reddit',
  'medium',
  'devto',
  'hashnode',
  'hackernoon',
  'dzone',
  'substack',
];

const PLATFORM_GUIDANCE = {
  linkedin: {
    mode: 'manual-browser-draft',
    intent: 'Launch post or native article variant for the existing professional audience.',
  },
  reddit: {
    mode: 'manual-community-post',
    intent: 'Subreddit-specific discussion prompt that links to the canonical essay only when useful.',
  },
  medium: {
    mode: 'manual-import',
    intent: 'Canonical import or mirror with canonical URL preserved.',
  },
  devto: {
    mode: 'api-draft-or-manual-copy',
    intent: 'Developer-facing mirror draft with canonical URL preserved.',
  },
  hashnode: {
    mode: 'api-delisted-draft-or-manual-copy',
    intent: 'Developer-facing draft with canonical URL preserved.',
  },
  hackernoon: {
    mode: 'manual-editorial-submission',
    intent: 'Editorial import/review package with tags and first-seen URL.',
  },
  dzone: {
    mode: 'manual-editorial-rewrite',
    intent: 'Practical engineering rewrite package for DZone review.',
  },
  substack: {
    mode: 'manual-newsletter-draft',
    intent: 'Newsletter intro that sends readers to the canonical essay.',
  },
};

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function excerpt(markdown, maxLength = 420) {
  const text = markdown
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]*]\(([^)]*)\)/g, '$1')
    .replace(/[#>*_`-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}...`;
}

function frontmatter(meta) {
  return Object.entries(meta)
    .map(([key, value]) => {
      if (Array.isArray(value)) return `${key}: [${value.map((item) => JSON.stringify(item)).join(', ')}]`;
      return `${key}: ${JSON.stringify(value ?? '')}`;
    })
    .join('\n');
}

function packageMarkdown({ platform, article, body, variantMeta = {}, generatedAt }) {
  const guidance = PLATFORM_GUIDANCE[platform];
  const canonicalUrl = variantMeta.canonical_url ?? variantMeta.source_url ?? article.meta.canonicalUrl;
  const metadata = {
    platform,
    mode: guidance.mode,
    title: variantMeta.title ?? article.meta.title,
    canonical_url: canonicalUrl,
    source_slug: article.slug,
    generated_at: generatedAt,
    public_publish_allowed: false,
  };

  return `---\n${frontmatter(metadata)}\n---\n\n# ${metadata.title}\n\n## Posting guidance\n\n${guidance.intent}\n\n- Do not publish without David approval.\n- Preserve canonical URL: ${canonicalUrl}\n- Record the final platform URL back in content/distribution/platform-ledger.json.\n\n## Copy\n\n${body.trim()}\n`;
}

function redditMarkdown(article, generatedAt) {
  const canonicalUrl = article.meta.canonicalUrl;
  const summary = excerpt(article.body, 520);
  const title = article.meta.title;
  const body = `Suggested starting shape, not a blind cross-post:\n\nTitle: ${title}\n\nBody:\n${summary}\n\nQuestion for the community: does this pattern match anything you are seeing in real workflows, or does it break down in your environment?\n\nCanonical essay: ${canonicalUrl}\n\nSubreddit fit checklist:\n- Read the target subreddit rules before posting.\n- Prefer a discussion prompt over a link dump.\n- Rewrite examples for the local community.\n- Do not post the same package to multiple subreddits unchanged.`;

  return packageMarkdown({
    platform: 'reddit',
    article,
    body,
    generatedAt,
    variantMeta: {
      title,
      canonical_url: canonicalUrl,
    },
  });
}

export function generatePlatformPackages({
  article,
  outputRoot,
  variants = {},
  platforms = DEFAULT_PLATFORMS,
  generatedAt = new Date().toISOString(),
}) {
  if (!article?.slug || !article?.meta?.title || !article?.body) {
    throw new Error('generatePlatformPackages requires article.slug, article.meta.title, and article.body.');
  }

  const packageRoot = path.join(outputRoot, article.slug);
  fs.mkdirSync(packageRoot, { recursive: true });

  const files = [];
  for (const platform of platforms) {
    if (!PLATFORM_GUIDANCE[platform]) {
      throw new Error(`Unsupported platform package: ${platform}`);
    }

    const variant = variants[platform];
    const body = platform === 'reddit'
      ? redditMarkdown(article, generatedAt)
      : packageMarkdown({
          platform,
          article,
          body: variant?.body ?? `Manual ${platform} package pending. Use canonical source: ${article.meta.canonicalUrl}`,
          variantMeta: variant?.meta ?? {},
          generatedAt,
        });
    const filePath = path.join(packageRoot, `${platform}.md`);
    fs.writeFileSync(filePath, `${body.trim()}\n`);
    files.push({
      platform,
      file: path.relative(outputRoot, filePath),
      checksum: sha256(body),
      mode: PLATFORM_GUIDANCE[platform].mode,
      hasVariant: Boolean(variant),
    });
  }

  const manifest = {
    slug: article.slug,
    title: article.meta.title,
    canonicalUrl: article.meta.canonicalUrl,
    generatedAt,
    publicPublishAllowed: false,
    files,
  };
  const manifestPath = path.join(packageRoot, 'manifest.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  return {
    slug: article.slug,
    packageRoot,
    manifestPath,
    files,
  };
}

export const platformPackageDefaults = {
  platforms: DEFAULT_PLATFORMS,
  guidance: PLATFORM_GUIDANCE,
};
