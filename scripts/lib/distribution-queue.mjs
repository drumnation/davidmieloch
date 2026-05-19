import fs from 'node:fs';
import path from 'node:path';

const PASSIVE_STATUSES = new Set(['source', 'secondary-source', 'ready-local', 'published', 'skipped']);

function packageExists(packagesRoot, slug, platform) {
  return fs.existsSync(path.join(packagesRoot, slug, `${platform}.md`));
}

function policyFor(policy, platform) {
  return policy.platforms?.[platform] ?? {
    displayName: platform,
    workflow: 'manual',
    postMode: 'unknown',
    approvalRequired: true,
    publicPublishAllowed: false,
  };
}

function platformReadiness({ platform, configured = {}, canonicalReady }) {
  if (platform === 'devto') {
    return configured.devto ? { ready: true } : { ready: false, blocker: 'Missing DEVTO_API_KEY.' };
  }
  if (platform === 'hashnode') {
    return configured.hashnode && configured.hashnodePublication
      ? { ready: true }
      : { ready: false, blocker: 'Missing working Hashnode token/publication id pair.' };
  }
  if (platform === 'medium') {
    return canonicalReady
      ? { ready: true }
      : { ready: false, blocker: 'Canonical davidmieloch.com blog URLs are not verified.' };
  }
  if (platform === 'linkedin') {
    return { ready: false, blocker: 'LinkedIn is source/reference only unless David explicitly approves a launch.' };
  }
  if (platform === 'reddit') {
    return { ready: false, blocker: 'Reddit requires David approval for subreddit, title, body, and link.' };
  }
  return { ready: true };
}

function actionFor({ slug, article, platform, receipt, policy, hasPackage, configured, canonicalReady }) {
  const status = receipt?.status ?? 'missing';
  if (PASSIVE_STATUSES.has(status)) return null;

  const platformPolicy = policyFor(policy, platform);
  const readiness = platformReadiness({ platform, configured, canonicalReady });
  const base = {
    slug,
    title: article.title,
    series: article.series ?? null,
    platform,
    displayName: platformPolicy.displayName ?? platform,
    status,
    workflow: platformPolicy.workflow ?? 'manual',
    postMode: platformPolicy.postMode ?? 'unknown',
    approvalRequired: platformPolicy.approvalRequired !== false,
    publicPublishingAllowed: platformPolicy.publicPublishAllowed === true,
    hasPackage,
    url: receipt?.url ?? '',
  };

  if (status === 'draft') {
    return {
      ...base,
      priority: 20,
      action: 'review-existing-draft',
      blocked: false,
      nextCommand: `pnpm content:pipeline receipt:record ${slug} ${platform} --status=published --url=<published-url>`,
      note: 'Review the existing draft; public publish still requires David approval.',
    };
  }

  if (platform === 'reddit') {
    return {
      ...base,
      priority: 90,
      action: 'prepare-discussion-seed',
      blocked: true,
      blocker: readiness.blocker,
      nextCommand: `pnpm content:pipeline manual-package ${slug} reddit`,
      note: 'Prepare subreddit-specific discussion copy only; do not post automatically.',
    };
  }

  if (!readiness.ready) {
    return {
      ...base,
      priority: platform === 'hashnode' ? 70 : 80,
      action: 'blocked-until-ready',
      blocked: true,
      blocker: readiness.blocker,
      nextCommand: hasPackage ? null : `pnpm content:pipeline manual-package ${slug} ${platform}`,
      note: 'Resolve blocker before draft creation or platform import.',
    };
  }

  if (platform === 'devto' || platform === 'hashnode') {
    return {
      ...base,
      priority: 30,
      action: 'create-api-draft',
      blocked: false,
      nextCommand: `pnpm content:pipeline draft:create ${slug} ${platform}`,
      note: 'Creates an unpublished/delisted draft only.',
    };
  }

  if (platform === 'substack') {
    return {
      ...base,
      priority: 60,
      action: 'prepare-newsletter-framing',
      blocked: false,
      nextCommand: `pnpm content:pipeline manual-package ${slug} substack`,
      note: 'Use as series/newsletter framing, not a one-to-one mirror.',
    };
  }

  return {
    ...base,
    priority: 50,
    action: 'prepare-manual-draft',
    blocked: false,
    nextCommand: hasPackage ? null : `pnpm content:pipeline manual-package ${slug} ${platform}`,
    note: 'Manual/editorial workflow; stop before public publish until approved.',
  };
}

function groupedCounts(actions) {
  const groups = {};
  for (const action of actions) {
    groups[action.action] ??= { total: 0, blocked: 0, platforms: {} };
    groups[action.action].total += 1;
    if (action.blocked) groups[action.action].blocked += 1;
    groups[action.action].platforms[action.platform] ??= 0;
    groups[action.action].platforms[action.platform] += 1;
  }
  return groups;
}

export function buildDistributionQueue({
  ledger,
  policy,
  packagesRoot,
  configured = {},
  canonicalReady = false,
  generatedAt = new Date().toISOString(),
}) {
  const actions = [];
  for (const [slug, article] of Object.entries(ledger.articles ?? {})) {
    for (const [platform, receipt] of Object.entries(article.platforms ?? {})) {
      const action = actionFor({
        slug,
        article,
        platform,
        receipt,
        policy,
        hasPackage: packageExists(packagesRoot, slug, platform),
        configured,
        canonicalReady,
      });
      if (action) actions.push(action);
    }
  }

  actions.sort((left, right) => {
    if (left.blocked !== right.blocked) return left.blocked ? 1 : -1;
    if (left.priority !== right.priority) return left.priority - right.priority;
    if (left.platform !== right.platform) return left.platform.localeCompare(right.platform);
    return left.slug.localeCompare(right.slug);
  });

  return {
    generatedAt,
    publicPublishingPerformed: false,
    summary: {
      totalActions: actions.length,
      unblockedActions: actions.filter((action) => !action.blocked).length,
      blockedActions: actions.filter((action) => action.blocked).length,
      grouped: groupedCounts(actions),
    },
    actions,
    recommendedNext: actions.filter((action) => !action.blocked).slice(0, 10),
    observation: {
      claim: 'content distribution next actions are derived from ledger, packages, policy, and readiness',
      status: actions.some((action) => action.blocked) ? 'DEGRADED' : 'PASS',
      fallbackChain: [
        'platform ledger status readback',
        'syndication policy workflow readback',
        'ROM heartbeat',
      ],
    },
  };
}
