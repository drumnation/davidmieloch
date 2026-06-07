import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_SOCIAL_PLATFORMS = [
  'linkedin',
  'x-twitter',
  'reddit',
  'bluesky',
  'mastodon',
  'threads',
  'facebook-page',
];

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function parseFrontmatter(rawFrontmatter) {
  const meta = {};
  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return meta;
}

function readArticleMarkdown(articlesRoot, slug) {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  if (!fs.existsSync(articlePath)) return null;
  const raw = fs.readFileSync(articlePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  if (!match) return { meta: {}, body: raw.trim() };
  return {
    meta: parseFrontmatter(match[1]),
    body: raw.slice(match[0].length).trim(),
  };
}

function plainExcerpt(markdown = '', maxLength = 280) {
  const text = markdown
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]*]\(([^)]*)\)/g, '$1')
    .replace(/[#>*_`|:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}...`;
}

function accountByPlatform(inventory, platform) {
  return (inventory.accounts ?? []).find((account) => account.platform === platform) ?? null;
}

function credentialCustodyStatus(inventory) {
  const store = inventory.credentialStore ?? {};
  return {
    verified: store.writeStatus === 'ready',
    status: store.writeStatus ?? 'unknown',
    blocker: store.blocker ?? null,
  };
}

function accountReadinessBlocker(inventory, account) {
  if (!account) {
    return 'No account inventory entry exists for this platform.';
  }
  if (account.blocker) {
    return account.blocker;
  }
  const custody = credentialCustodyStatus(inventory);
  if (account.knownState === 'not-created') {
    if (!custody.verified) {
      return inventory.credentialStore?.blocker ?? '1Password credential custody is not verified.';
    }
    return 'Account has not been created or reserved yet.';
  }
  if (account.developerApp?.redirectStatus?.includes('rejected') || account.developerApp?.redirectStatus === 'blocked') {
    return account.developerApp.redirectBlocker;
  }
  if (account.postizChannelStatus !== 'connected') {
    if (!custody.verified) {
      return inventory.credentialStore?.blocker ?? '1Password credential custody is not verified.';
    }
    return 'Postiz channel is not connected for this platform.';
  }
  return null;
}

function articleFromLedger(ledger, articlesRoot, slug) {
  const ledgerArticle = ledger.articles?.[slug];
  if (!ledgerArticle) {
    throw new Error(`Unknown article slug in platform ledger: ${slug}`);
  }
  const article = readArticleMarkdown(articlesRoot, slug);
  return {
    slug,
    title: ledgerArticle.title ?? article?.meta?.title ?? slug,
    series: ledgerArticle.series ?? article?.meta?.series ?? null,
    canonicalUrl: ledgerArticle.canonicalUrl ?? article?.meta?.canonicalUrl ?? `https://davidmieloch.com/blog/${slug}`,
    sourceUrl: ledgerArticle.source?.url ?? '',
    body: article?.body ?? '',
    excerpt: plainExcerpt(article?.body ?? '', 360),
  };
}

function trackedUrl(canonicalUrl, platform, slug) {
  const url = new URL(canonicalUrl);
  url.searchParams.set('utm_source', platform);
  url.searchParams.set('utm_medium', 'social');
  url.searchParams.set('utm_campaign', 'factory_content_pipeline');
  url.searchParams.set('utm_content', slug);
  return url.toString();
}

function shortTeaser(article, platform) {
  const url = trackedUrl(article.canonicalUrl, platform, article.slug);
  const thesis = article.excerpt || `${article.title} is part of the factory-era writing arc.`;
  if (platform === 'x-twitter') {
    return `${article.title}: ${thesis.slice(0, 150).replace(/\s+\S*$/, '')}\n\n${url}`;
  }
  if (platform === 'bluesky') {
    return `${article.title}\n\n${thesis.slice(0, 210).replace(/\s+\S*$/, '')}\n\n${url}`;
  }
  if (platform === 'mastodon') {
    return `${article.title}\n\n${thesis.slice(0, 360).replace(/\s+\S*$/, '')}\n\nCanonical essay: ${url}`;
  }
  if (platform === 'threads') {
    return `${article.title}\n\n${thesis.slice(0, 300).replace(/\s+\S*$/, '')}\n\n${url}`;
  }
  if (platform === 'facebook-page') {
    return `New from the Brain Garden archive: ${article.title}\n\n${thesis}\n\nRead it here: ${url}`;
  }
  if (platform === 'reddit') {
    return `Suggested discussion seed, not a blind link post.\n\nTitle: ${article.title}\n\nBody:\n${thesis}\n\nQuestion: does this match what you are seeing in your own workflows, or does it break down in practice?\n\nContext link: ${url}\n\nRules:\n- Pick one target subreddit.\n- Rewrite for that community.\n- Do not post without David approval.`;
  }
  return `${article.title}\n\n${thesis}\n\nRead the canonical essay: ${url}`;
}

function frontmatter(meta) {
  return Object.entries(meta)
    .map(([key, value]) => {
      if (Array.isArray(value)) return `${key}: [${value.map((item) => JSON.stringify(item)).join(', ')}]`;
      return `${key}: ${JSON.stringify(value ?? '')}`;
    })
    .join('\n');
}

function socialPackageMarkdown({ article, platform, inventory, generatedAt }) {
  const account = accountByPlatform(inventory, platform);
  const custody = credentialCustodyStatus(inventory);
  const metadata = {
    platform,
    source_slug: article.slug,
    title: article.title,
    canonical_url: article.canonicalUrl,
    tracked_url: trackedUrl(article.canonicalUrl, platform, article.slug),
    identity_layer: account?.identityLayer ?? 'unknown',
    account_kind: account?.accountKind ?? 'unknown',
    known_state: account?.knownState ?? 'unknown',
    postiz_channel_status: account?.postizChannelStatus ?? 'not-connected',
    test_post_policy: account?.testPostPolicy ?? 'unknown',
    generated_at: generatedAt,
    public_publish_allowed: false,
    credential_custody_verified: custody.verified,
  };

  return `---\n${frontmatter(metadata)}\n---\n\n# ${article.title} / ${platform}\n\n## Safety\n\n- Safe default: do-not-post.\n- Public posting requires explicit David approval.\n- Personal accounts are not connector-test targets.\n- Credential custody verified: ${custody.verified ? 'yes' : 'no'}.\n${custody.blocker ? `- Credential blocker: ${custody.blocker}\n` : ''}\n## Copy\n\n${shortTeaser(article, platform)}\n`;
}

function selectedSlugs(ledger, slug) {
  if (slug === 'all') return Object.keys(ledger.articles ?? {}).sort();
  return [slug];
}

function selectedPlatforms(platform, platforms = DEFAULT_SOCIAL_PLATFORMS) {
  if (!platform || platform === 'all') return platforms;
  return [platform];
}

export function buildSocialPackages({
  ledger,
  inventory,
  articlesRoot,
  outputRoot,
  slug,
  platform = null,
  generatedAt = new Date().toISOString(),
}) {
  const slugs = selectedSlugs(ledger, slug);
  const platforms = selectedPlatforms(platform);
  const generated = [];

  for (const articleSlug of slugs) {
    const article = articleFromLedger(ledger, articlesRoot, articleSlug);
    const packageRoot = path.join(outputRoot, articleSlug);
    fs.mkdirSync(packageRoot, { recursive: true });
    const files = [];
    for (const target of platforms) {
      const markdown = socialPackageMarkdown({ article, platform: target, inventory, generatedAt }).trim();
      const filePath = path.join(packageRoot, `${target}.md`);
      fs.writeFileSync(filePath, `${markdown}\n`);
      files.push({
        platform: target,
        filePath,
        checksum: sha256(markdown),
      });
    }
    const manifest = {
      schemaVersion: 'social-package-manifest-v1',
      slug: articleSlug,
      title: article.title,
      canonicalUrl: article.canonicalUrl,
      generatedAt,
      publicPublishingPerformed: false,
      files,
    };
    const manifestPath = path.join(packageRoot, 'manifest.json');
    writeJson(manifestPath, manifest);
    generated.push({ slug: articleSlug, packageRoot, manifestPath, files });
  }

  return {
    generatedAt,
    publicPublishingPerformed: false,
    safeDefault: 'do-not-post',
    generated,
    observation: {
      claim: 'social teaser packages are generated without public posting',
      status: 'PASS',
      fallbackChain: [
        'social package files',
        'social package manifest',
        'ROM heartbeat',
      ],
    },
  };
}

export function buildSocialReadiness({ inventory, generatedAt = new Date().toISOString() }) {
  const custody = credentialCustodyStatus(inventory);
  const accounts = (inventory.accounts ?? []).map((account) => {
    const personal = account.identityLayer === 'personal-authority';
    const canary = account.accountKind?.includes('canary') || account.identityLayer === 'brand-lab';
    const blocker = accountReadinessBlocker(inventory, account);
    return {
      platform: account.platform,
      identityLayer: account.identityLayer,
      accountKind: account.accountKind,
      knownState: account.knownState,
      postizChannelStatus: account.postizChannelStatus ?? 'not-connected',
      postizPriority: account.postizPriority,
      testPostPolicy: account.testPostPolicy,
      canaryEligible: canary && !personal,
      personalAccount: personal,
      readyForCredentialedSetup: custody.verified,
      readyForPostizDrafts: !blocker,
      readyForConnectorTest: !blocker && canary && account.deletePathKnown === true,
      blocked: Boolean(blocker),
      blocker,
    };
  });

  return {
    generatedAt,
    publicPublishingPerformed: false,
    exposureGate: inventory.exposureGate,
    credentialStore: inventory.credentialStore,
    postiz: inventory.postiz,
    n8n: inventory.n8n,
    summary: {
      accounts: accounts.length,
      blocked: accounts.filter((account) => account.blocked).length,
      canaryEligible: accounts.filter((account) => account.canaryEligible).length,
      connectorTestReady: accounts.filter((account) => account.readyForConnectorTest).length,
    },
    accounts,
    observation: {
      claim: 'social account readiness is derived from account inventory and credential custody',
      status: custody.verified ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'social-account-inventory.json',
        '1Password write probe',
        'ROM heartbeat',
      ],
    },
  };
}

export function buildSocialSchedule({
  packageRoot,
  inventory,
  startAt = new Date().toISOString(),
  intervalHours = 8,
  generatedAt = new Date().toISOString(),
}) {
  const start = new Date(startAt);
  if (Number.isNaN(start.getTime())) throw new Error(`Invalid --start value: ${startAt}`);

  const entries = [];
  if (fs.existsSync(packageRoot)) {
    const slugs = fs
      .readdirSync(packageRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    for (const slug of slugs) {
      const manifestPath = path.join(packageRoot, slug, 'manifest.json');
      if (!fs.existsSync(manifestPath)) continue;
      const manifest = readJson(manifestPath, {});
      for (const file of manifest.files ?? []) {
        const account = accountByPlatform(inventory, file.platform);
        const blocker = accountReadinessBlocker(inventory, account);
        const scheduledAt = new Date(start.getTime() + entries.length * Number(intervalHours) * 60 * 60 * 1000).toISOString();
        entries.push({
          id: `social:${file.platform}:${slug}:${scheduledAt.slice(0, 10)}`,
          scheduledAt,
          articleSlug: slug,
          title: manifest.title,
          platform: file.platform,
          packagePath: file.filePath,
          checksum: file.checksum,
          identityLayer: account?.identityLayer ?? 'unknown',
          accountKind: account?.accountKind ?? 'unknown',
          postizChannelStatus: account?.postizChannelStatus ?? 'not-connected',
          status: 'planned',
          publicPublishingAllowed: false,
          safeDefault: 'do-not-post',
          approval: {
            required: true,
            status: 'missing',
            requiredFrom: 'David',
          },
          blocked: Boolean(blocker),
          blocker,
        });
      }
    }
  }

  return {
    schemaVersion: 'social-calendar-v1',
    generatedAt,
    publicPublishingPerformed: false,
    decisionSeam: {
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
}

export function buildSocialPostManifest({
  ledger,
  inventory,
  slug,
  platform,
  packagePath,
  mode = 'draft',
  generatedAt = new Date().toISOString(),
  approvalStatus = 'missing',
}) {
  const article = ledger.articles?.[slug];
  if (!article) throw new Error(`Unknown article slug in platform ledger: ${slug}`);
  const account = accountByPlatform(inventory, platform);
  const custody = credentialCustodyStatus(inventory);
  const copy = packagePath && fs.existsSync(packagePath)
    ? fs.readFileSync(packagePath, 'utf8')
    : '';

  const unsigned = {
    version: 1,
    manifestId: `social:${platform}:${slug}:${sha256(`${slug}:${platform}:${generatedAt}`).slice(0, 12)}`,
    source: {
      articleSlug: slug,
      canonicalUrl: article.canonicalUrl,
      ledgerPath: 'content/distribution/platform-ledger.json',
      packagePath: packagePath ?? null,
    },
    destination: {
      platform,
      accountId: account?.proposedHandle ?? account?.platform ?? platform,
      identityLayer: account?.identityLayer ?? 'brand-lab',
      mode,
      postizChannelId: account?.postizChannelStatus === 'connected'
        ? account.postizChannelId ?? null
        : null,
    },
    approval: {
      status: approvalStatus,
      approvedBy: approvalStatus === 'approved' ? 'David' : '',
      approvedAt: approvalStatus === 'approved' ? generatedAt : '',
      approvalArtifact: '',
    },
    payload: {
      text: copy ? copy.split('\n## Copy\n\n')[1]?.trim() ?? copy.trim() : '',
      links: [article.canonicalUrl],
      media: [],
    },
    safety: {
      safeDefault: 'do-not-post',
      credentialCustodyVerified: custody.verified,
      deletePathKnown: false,
      publicExposureGateAnswered: true,
      refusalInboxPath: 'content/distribution/refusal-inbox.json',
    },
  };

  return {
    ...unsigned,
    signature: {
      algorithm: 'sha256',
      digest: sha256(stableStringify(unsigned)),
    },
  };
}

export function buildN8nExport({
  socialCalendar,
  inventory,
  generatedAt = new Date().toISOString(),
}) {
  const custody = credentialCustodyStatus(inventory);
  const blockedPackets = (socialCalendar.entries ?? []).filter((entry) => entry.blocked);
  const readyPackets = (socialCalendar.entries ?? []).filter((entry) => !entry.blocked);
  const packets = (socialCalendar.entries ?? []).map((entry) => ({
    packetId: `n8n:${entry.id}`,
    generatedAt,
    target: {
      platform: entry.platform,
      articleSlug: entry.articleSlug,
      scheduledAt: entry.scheduledAt,
      packagePath: entry.packagePath,
    },
    policy: {
      publicPublishingAllowed: false,
      safeDefault: 'do-not-post',
      requiresApproval: true,
      credentialCustodyVerified: custody.verified,
      allowedAction: entry.blocked ? 'blocked' : 'create-postiz-draft-or-schedule',
      blocker: entry.blocker ?? null,
    },
    postiz: {
      url: inventory.postiz?.url,
      network: inventory.postiz?.network,
      publicExposure: inventory.postiz?.publicExposure,
    },
  }));

  return {
    schemaVersion: 'social-n8n-export-v1',
    generatedAt,
    publicPublishingPerformed: false,
    ownerAgent: inventory.n8n?.ownerAgent ?? 'Commander Data',
    status: readyPackets.length > 0
      ? blockedPackets.length > 0
        ? 'partially-ready-for-internal-workflow-build'
        : 'ready-for-internal-workflow-build'
      : custody.verified
        ? 'blocked-on-channel-setup'
        : 'blocked-on-credential-custody',
    blocker: blockedPackets.length > 0
      ? `${blockedPackets.length} packets blocked by account or channel readiness.`
      : null,
    packets,
  };
}

export function recordSocialRefusal({
  refusalPath,
  platform,
  action,
  reason,
  notes = '',
  screenshotPath = null,
  generatedAt = new Date().toISOString(),
}) {
  if (!platform || !action || !reason) {
    throw new Error('social:refusal requires <platform> <action> --reason=<reason>.');
  }
  const inbox = readJson(refusalPath, {
    schemaVersion: 'social-refusal-inbox-v1',
    records: [],
  });
  const record = {
    id: `refusal:${platform}:${action}:${sha256(`${platform}:${action}:${generatedAt}:${reason}`).slice(0, 12)}`,
    ts: generatedAt,
    platform,
    action,
    status: 'blocked',
    reason,
    notes,
    screenshotPath,
    nextHumanAction: 'David or an authorized operator must resolve this manually.',
  };
  inbox.records.push(record);
  writeJson(refusalPath, inbox);
  return {
    publicPublishingPerformed: false,
    record,
    refusalPath,
  };
}

export const socialAutomationDefaults = {
  platforms: DEFAULT_SOCIAL_PLATFORMS,
};
