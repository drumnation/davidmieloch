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

const FALLBACK_POLICY = {
  version: 'syndication-policy-v1',
  canonicalHome: 'https://davidmieloch.com',
  defaultCampaign: 'content_distribution',
  mailingListUrl: 'https://davidmieloch.com/blog',
  platforms: {
    linkedin: {
      displayName: 'LinkedIn',
      postMode: 'launch-post',
      workflow: 'manual-browser-draft',
      canonicalSupport: 'not-supported',
      intent: 'Native launch post or article variant for the existing professional audience.',
      cta: 'Read the canonical essay on davidmieloch.com and join the mailing list there.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
    reddit: {
      displayName: 'Reddit',
      postMode: 'discussion',
      workflow: 'manual-community-post',
      canonicalSupport: 'not-supported',
      intent: 'Subreddit-specific discussion prompt that links to the canonical essay only when useful.',
      cta: 'If useful, include the canonical essay link as context after the discussion prompt.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
    medium: {
      displayName: 'Medium',
      postMode: 'full-mirror',
      workflow: 'manual-import',
      canonicalSupport: 'supported',
      intent: 'Canonical import or mirror with the original URL preserved.',
      cta: 'Read the canonical version and the full series on davidmieloch.com.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
    devto: {
      displayName: 'DEV',
      postMode: 'full-mirror',
      workflow: 'api-draft-or-manual-copy',
      canonicalSupport: 'supported',
      intent: 'Developer-facing mirror draft with canonical URL preserved.',
      cta: 'Read the canonical version and related series on davidmieloch.com.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
    hashnode: {
      displayName: 'Hashnode',
      postMode: 'full-mirror',
      workflow: 'api-delisted-draft-or-manual-copy',
      canonicalSupport: 'supported',
      intent: 'Developer-facing draft with original article URL preserved.',
      cta: 'Read the canonical version and related series on davidmieloch.com.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
    hackernoon: {
      displayName: 'HackerNoon',
      postMode: 'editorial-republish',
      workflow: 'manual-editorial-submission',
      canonicalSupport: 'supported',
      intent: 'Editorial submission package with tags and first-seen URL.',
      cta: 'Point readers to the canonical article and series page after editorial approval.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
    dzone: {
      displayName: 'DZone',
      postMode: 'editorial-rewrite',
      workflow: 'manual-editorial-rewrite',
      canonicalSupport: 'unknown',
      intent: 'Practical engineering rewrite package for DZone review.',
      cta: 'Use one contextual source link back to the canonical article when editorial rules allow.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
    substack: {
      displayName: 'Substack',
      postMode: 'newsletter',
      workflow: 'manual-newsletter-draft',
      canonicalSupport: 'not-supported',
      intent: 'Newsletter intro or series digest that sends readers to the canonical essay.',
      cta: 'Subscribe for future factory notes and read the canonical article on davidmieloch.com.',
      approvalRequired: true,
      publicPublishAllowed: false,
    },
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
    .replace(/[#>*_`]/g, '')
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

function cleanMarkdown(markdown) {
  return markdown
    .replace(/[ \t]+$/gm, '')
    .trim();
}

function defaultPolicyPath() {
  return path.join(process.cwd(), 'content', 'distribution', 'syndication-policy.json');
}

export function loadSyndicationPolicy(policyPath = defaultPolicyPath()) {
  if (!fs.existsSync(policyPath)) {
    return FALLBACK_POLICY;
  }

  return JSON.parse(fs.readFileSync(policyPath, 'utf8'));
}

function platformPolicy(policy, platform) {
  const match = policy.platforms?.[platform];
  if (!match) {
    throw new Error(`Unsupported platform package: ${platform}`);
  }
  return match;
}

function trackedUrl(canonicalUrl, platform, slug, policy) {
  const url = new URL(canonicalUrl);
  url.searchParams.set('utm_source', platform);
  url.searchParams.set('utm_medium', 'syndication');
  url.searchParams.set('utm_campaign', policy.defaultCampaign ?? 'content_distribution');
  url.searchParams.set('utm_content', slug);
  return url.toString();
}

function ctaLine(platform, tracked, policyForPlatform) {
  return `${policyForPlatform.cta}\n\nRead the canonical version: ${tracked}`;
}

function mirrorBody(article, platform, tracked, policyForPlatform) {
  return `${article.body.trim()}\n\n---\n\n${ctaLine(platform, tracked, policyForPlatform)}`;
}

function excerptBody(article, platform, tracked, policyForPlatform) {
  return `${excerpt(article.body, 620)}\n\n${ctaLine(platform, tracked, policyForPlatform)}`;
}

function newsletterBody(article, tracked, policyForPlatform) {
  return `Subject: ${article.meta.title}\n\nI published a new essay that belongs in the factory series:\n\n${excerpt(article.body, 520)}\n\n${ctaLine('substack', tracked, policyForPlatform)}\n\nMailing list destination: ${tracked}`;
}

function packageMarkdown({ platform, article, body, variantMeta = {}, generatedAt, policy }) {
  const guidance = platformPolicy(policy, platform);
  const canonicalUrl = variantMeta.canonical_url ?? variantMeta.source_url ?? article.meta.canonicalUrl;
  const tracked = trackedUrl(canonicalUrl, platform, article.slug, policy);
  const metadata = {
    platform,
    mode: guidance.workflow,
    post_mode: guidance.postMode,
    title: variantMeta.title ?? article.meta.title,
    canonical_url: canonicalUrl,
    tracked_url: tracked,
    source_slug: article.slug,
    generated_at: generatedAt,
    canonical_support: guidance.canonicalSupport,
    approval_required: guidance.approvalRequired,
    public_publish_allowed: guidance.publicPublishAllowed,
  };

  return `---\n${frontmatter(metadata)}\n---\n\n# ${metadata.title}\n\n## Posting guidance\n\n${guidance.intent}\n\n- Do not publish without David approval.\n- Preserve canonical URL: ${canonicalUrl}\n- Record the final platform URL back in content/distribution/platform-ledger.json.\n\n## Copy\n\n${body.trim()}\n`;
}

function redditMarkdown(article, generatedAt, policy) {
  const canonicalUrl = article.meta.canonicalUrl;
  const guidance = platformPolicy(policy, 'reddit');
  const tracked = trackedUrl(canonicalUrl, 'reddit', article.slug, policy);
  const summary = excerpt(article.body, 520);
  const title = article.meta.title;
  const body = `Suggested discussion shape, not a blind cross-post:\n\nTitle: ${title}\n\nBody:\n${summary}\n\nQuestion for the community: does this pattern match anything you are seeing in real workflows, or does it break down in your environment?\n\nCanonical essay: ${tracked}\n\nSubreddit fit checklist:\n- Read the target subreddit rules before posting.\n- Prefer a discussion prompt over a link dump.\n- Rewrite examples for the local community.\n- Do not post the same package to multiple subreddits unchanged.`;

  return packageMarkdown({
    platform: 'reddit',
    article,
    body,
    generatedAt,
    policy,
    variantMeta: {
      title,
      canonical_url: canonicalUrl,
    },
  });
}

function bodyForPlatform(article, platform, variant, policy) {
  const guidance = platformPolicy(policy, platform);
  const canonicalUrl = variant?.meta?.canonical_url ?? variant?.meta?.source_url ?? article.meta.canonicalUrl;
  const tracked = trackedUrl(canonicalUrl, platform, article.slug, policy);

  if (variant?.body) {
    return `${variant.body.trim()}\n\n---\n\n${ctaLine(platform, tracked, guidance)}`;
  }

  if (guidance.postMode === 'full-mirror') {
    return mirrorBody(article, platform, tracked, guidance);
  }

  if (guidance.postMode === 'newsletter') {
    return newsletterBody(article, tracked, guidance);
  }

  if (guidance.postMode === 'launch-post' || guidance.postMode === 'editorial-republish' || guidance.postMode === 'editorial-rewrite') {
    return excerptBody(article, platform, tracked, guidance);
  }

  return `Manual ${platform} package pending. Use canonical source: ${tracked}`;
}

export function generatePlatformPackages({
  article,
  outputRoot,
  variants = {},
  platforms = DEFAULT_PLATFORMS,
  generatedAt = new Date().toISOString(),
  policy = loadSyndicationPolicy(),
}) {
  if (!article?.slug || !article?.meta?.title || !article?.body) {
    throw new Error('generatePlatformPackages requires article.slug, article.meta.title, and article.body.');
  }

  const packageRoot = path.join(outputRoot, article.slug);
  fs.mkdirSync(packageRoot, { recursive: true });

  const files = [];
  for (const platform of platforms) {
    const guidance = platformPolicy(policy, platform);

    const variant = variants[platform];
    const body = platform === 'reddit'
      ? redditMarkdown(article, generatedAt, policy)
      : packageMarkdown({
          platform,
          article,
          body: bodyForPlatform(article, platform, variant, policy),
          variantMeta: variant?.meta ?? {},
          generatedAt,
          policy,
        });
    const cleanBody = cleanMarkdown(body);
    const filePath = path.join(packageRoot, `${platform}.md`);
    fs.writeFileSync(filePath, `${cleanBody}\n`);
    files.push({
      platform,
      file: path.relative(outputRoot, filePath),
      checksum: sha256(cleanBody),
      mode: guidance.workflow,
      postMode: guidance.postMode,
      canonicalSupport: guidance.canonicalSupport,
      approvalRequired: guidance.approvalRequired,
      hasVariant: Boolean(variant),
    });
  }

  const manifest = {
    slug: article.slug,
    title: article.meta.title,
    canonicalUrl: article.meta.canonicalUrl,
    generatedAt,
    policyVersion: policy.version,
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
  guidance: FALLBACK_POLICY.platforms,
};
