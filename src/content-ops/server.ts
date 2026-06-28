import fs from 'node:fs';
import path from 'node:path';

import type {
  ContentOpsInventoryItem,
  ContentOpsNextAction,
  ContentOpsReadinessItem,
  ContentOpsReceipt,
  ContentOpsScheduleEntry,
  ContentOpsSnapshot,
} from './types';

const APPROVAL_GATES = [
  'article-copy-approved',
  'hero-image-approved',
  'site-draft-preview-reviewed',
  'linkedin-reveal-copy-approved',
  'release-time-approved',
];

type BuildContentOpsSnapshotOptions = {
  appRoot?: string;
  generatedAt?: string;
};

type WebsiteArticle = {
  slug: string;
  title: string;
  status: string;
  publishedAt: string | null;
  canonicalUrl: string | null;
  path: string;
};

function relativeContentPath(appRoot: string, filePath: string) {
  return path.relative(appRoot, filePath).replaceAll(path.sep, '/');
}

function readJsonFile<T>(
  appRoot: string,
  relativePath: string,
  blockers: string[],
): T | null {
  const filePath = path.join(appRoot, relativePath);

  if (!fs.existsSync(filePath)) {
    blockers.push(`Missing ${relativePath}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    blockers.push(`Invalid JSON in ${relativePath}: ${message}`);
    return null;
  }
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  const meta: Record<string, string> = {};
  if (!match) return meta;

  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, '');

    meta[key] = value;
  }

  return meta;
}

function readWebsiteArticles(appRoot: string): WebsiteArticle[] {
  const articlesRoot = path.join(appRoot, 'content/articles');
  if (!fs.existsSync(articlesRoot)) return [];

  return fs
    .readdirSync(articlesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(articlesRoot, entry.name, 'index.md')),
    )
    .map((entry) => {
      const articlePath = path.join(articlesRoot, entry.name, 'index.md');
      const meta = parseFrontmatter(fs.readFileSync(articlePath, 'utf8'));

      return {
        slug: entry.name,
        title: meta.title ?? entry.name,
        status: meta.status ?? 'unknown',
        publishedAt: meta.publishedAt ?? null,
        canonicalUrl: meta.canonicalUrl ?? null,
        path: relativeContentPath(appRoot, articlePath),
      };
    })
    .sort((left, right) =>
      String(right.publishedAt ?? '').localeCompare(
        String(left.publishedAt ?? ''),
      ),
    );
}

function approvalStateFor(
  approvalLedger: unknown,
  slug: string,
): ContentOpsInventoryItem['approvalState'] {
  const gates =
    (approvalLedger as { approvals?: Record<string, { gates?: Record<string, { status?: string }> }> } | null)
      ?.approvals?.[slug]?.gates ?? {};
  const approved = APPROVAL_GATES.filter(
    (gate) => gates[gate]?.status === 'approved',
  );

  if (approved.length === APPROVAL_GATES.length) return 'approved';
  if (approved.length > 0) return 'partial';
  return 'missing';
}

function approvalStateFromEntry(entry: {
  approval?: { status?: string };
}): ContentOpsScheduleEntry['approvalState'] {
  return entry.approval?.status === 'approved' ? 'approved' : 'missing';
}

function normalizeSchedules(
  siteCalendar: unknown,
  socialCalendar: unknown,
  publishSchedule: unknown,
): ContentOpsScheduleEntry[] {
  const sitePayload = siteCalendar as
    | { safeDefault?: string; entries?: Array<Record<string, unknown>> }
    | null;
  const socialPayload = socialCalendar as
    | { entries?: Array<Record<string, unknown>> }
    | null;
  const publishPayload = publishSchedule as
    | { entries?: Array<Record<string, unknown>> }
    | null;

  const websiteEntries = (sitePayload?.entries ?? []).map((entry) => {
    const slug = String(entry.slug ?? '');
    const website = entry.website as { status?: string } | undefined;

    return {
      id: `website:${slug}`,
      lane: 'website' as const,
      platform: 'website',
      slug,
      title: String(entry.title ?? slug),
      scheduledAt:
        typeof entry.plannedReleaseAt === 'string'
          ? entry.plannedReleaseAt
          : typeof entry.releaseTarget === 'string'
            ? entry.releaseTarget
            : null,
      status: String(website?.status ?? entry.status ?? 'planned'),
      blocked: Boolean(entry.blocker),
      approvalState: 'missing' as const,
      safeDefault: sitePayload?.safeDefault ?? 'do-not-publish',
      nextCommand: slug
        ? `pnpm content:pipeline content:release-workflow ${slug}`
        : null,
    };
  });

  const socialEntries = (socialPayload?.entries ?? []).map((entry) => {
    const slug = String(entry.articleSlug ?? entry.slug ?? '');
    const platform = String(entry.platform ?? 'unknown');

    return {
      id: String(entry.id ?? `social:${platform}:${slug}`),
      lane: 'social' as const,
      platform,
      slug,
      title: String(entry.title ?? slug),
      scheduledAt:
        typeof entry.scheduledAt === 'string' ? entry.scheduledAt : null,
      status: String(entry.status ?? 'planned'),
      blocked: Boolean(entry.blocked),
      approvalState: approvalStateFromEntry(entry),
      safeDefault: String(entry.safeDefault ?? 'do-not-post'),
      nextCommand: slug
        ? `pnpm content:pipeline social:package ${slug} ${platform}`
        : null,
    };
  });

  const externalEntries = (publishPayload?.entries ?? []).map((entry) => {
    const slug = String(entry.articleSlug ?? entry.slug ?? '');
    const platform = String(entry.platform ?? 'unknown');

    return {
      id: String(entry.id ?? `external:${platform}:${slug}`),
      lane: 'external' as const,
      platform,
      slug,
      title: String(entry.title ?? slug),
      scheduledAt:
        typeof entry.scheduledAt === 'string' ? entry.scheduledAt : null,
      status: String(entry.status ?? 'planned'),
      blocked: Boolean(entry.blocked),
      approvalState: approvalStateFromEntry(entry),
      safeDefault: String(entry.safeDefault ?? 'do-not-publish'),
      nextCommand:
        typeof entry.nextCommand === 'string' ? entry.nextCommand : null,
    };
  });

  return [...websiteEntries, ...socialEntries, ...externalEntries].sort(
    (left, right) =>
      String(left.scheduledAt ?? '').localeCompare(
        String(right.scheduledAt ?? ''),
      ) || left.title.localeCompare(right.title),
  );
}

function normalizeReadiness(articleReadiness: unknown): ContentOpsReadinessItem[] {
  const payload = articleReadiness as
    | { websiteArticles?: Array<Record<string, unknown>> }
    | null;

  return (payload?.websiteArticles ?? []).map((article) => {
    const blockers = [
      ...stringArray(article.issues),
      ...stringArray(article.blockers),
    ];
    const warnings = stringArray(article.warnings);

    return {
      slug: String(article.slug ?? ''),
      title: String(article.title ?? article.slug ?? ''),
      status:
        blockers.length > 0 ? 'blocked' : warnings.length > 0 ? 'warning' : 'ready',
      blockers,
      warnings,
      missingAssets: warnings.filter((warning) =>
        /image|audio|transcript|package/i.test(warning),
      ),
    };
  });
}

function stringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function normalizeReceipts(appRoot: string): ContentOpsReceipt[] {
  const receiptsRoot = path.join(appRoot, 'content/distribution/release-receipts');
  if (!fs.existsSync(receiptsRoot)) return [];

  return fs
    .readdirSync(receiptsRoot)
    .filter((name) => name.endsWith('.json'))
    .map((name) => {
      const filePath = path.join(receiptsRoot, name);

      try {
        const payload = JSON.parse(fs.readFileSync(filePath, 'utf8')) as {
          status?: string;
          summary?: { status?: string };
          generatedAt?: string;
          command?: string;
          publicPublishingPerformed?: boolean;
        };

        return {
          path: relativeContentPath(appRoot, filePath),
          status: payload.status ?? payload.summary?.status ?? 'unknown',
          generatedAt: payload.generatedAt ?? null,
          command: payload.command ?? null,
          publicPublishingPerformed: Boolean(payload.publicPublishingPerformed),
        };
      } catch {
        return {
          path: relativeContentPath(appRoot, filePath),
          status: 'invalid-json',
          generatedAt: null,
          command: null,
          publicPublishingPerformed: false,
        };
      }
    })
    .sort((left, right) =>
      String(right.generatedAt ?? '').localeCompare(
        String(left.generatedAt ?? ''),
      ),
    );
}

function websiteStateFor(
  websiteArticle: WebsiteArticle | undefined,
): ContentOpsInventoryItem['websiteState'] {
  if (websiteArticle?.status === 'published') return 'published';
  if (websiteArticle?.status === 'draft') return 'draft';
  if (websiteArticle) return 'unknown';
  return 'not-staged';
}

function releaseStateFor(
  scheduledSlugs: Set<string>,
  item: Record<string, unknown>,
): ContentOpsInventoryItem['releaseState'] {
  if (scheduledSlugs.has(String(item.slug ?? ''))) return 'scheduled';

  const releaseSchedule = item.releaseSchedule as { status?: string } | undefined;
  if (releaseSchedule?.status === 'scheduled-or-queued') return 'scheduled';
  if (releaseSchedule?.status === 'released') return 'released';
  if (releaseSchedule?.status === 'needs-schedule') return 'needs-schedule';

  return 'needs-schedule';
}

function missingGatesFor(item: Record<string, unknown>) {
  const gates = item.gates as Record<string, unknown> | undefined;
  if (!gates) return [];

  return Object.values(gates).filter(
    (gate): gate is string =>
      typeof gate === 'string' && gate.includes('needs-'),
  );
}

export function buildContentOpsSnapshot({
  appRoot = process.cwd(),
  generatedAt = new Date().toISOString(),
}: BuildContentOpsSnapshotOptions = {}): ContentOpsSnapshot {
  const blockers: string[] = [];
  const warnings: string[] = [];
  const contentLedger = readJsonFile<{ items?: Array<Record<string, unknown>> }>(
    appRoot,
    'content/distribution/content-ledger.json',
    blockers,
  );
  const articleReadiness = readJsonFile<unknown>(
    appRoot,
    'content/distribution/article-readiness-report.json',
    blockers,
  );
  const siteCalendar = readJsonFile<unknown>(
    appRoot,
    'content/distribution/site-release-calendar.json',
    blockers,
  );
  const socialCalendar = readJsonFile<unknown>(
    appRoot,
    'content/distribution/social-calendar.json',
    blockers,
  );
  const publishSchedule = readJsonFile<unknown>(
    appRoot,
    'content/distribution/publish-schedule.json',
    blockers,
  );
  const approvalLedger = readJsonFile<unknown>(
    appRoot,
    'content/distribution/factory-primitives-approval-ledger.json',
    blockers,
  );

  const articles = readWebsiteArticles(appRoot);
  const publishedArticles = articles.filter(
    (article) => article.status === 'published',
  );
  const websiteDrafts = articles.filter((article) => article.status === 'draft');
  const readiness = normalizeReadiness(articleReadiness);
  const readinessBySlug = new Map(readiness.map((item) => [item.slug, item]));
  const schedules = normalizeSchedules(siteCalendar, socialCalendar, publishSchedule);
  const scheduledSlugs = new Set(
    schedules
      .filter((entry) => entry.lane === 'website' && entry.scheduledAt)
      .map((entry) => entry.slug),
  );

  const inventory: ContentOpsInventoryItem[] = (contentLedger?.items ?? []).map(
    (item) => {
      const slug = String(item.slug ?? '');
      const readinessItem = readinessBySlug.get(slug);
      const websiteArticle = articles.find((article) => article.slug === slug);
      const approvalState = approvalStateFor(approvalLedger, slug);
      const releaseState = releaseStateFor(scheduledSlugs, item);
      const readinessState = readinessItem?.status ?? 'unknown';

      return {
        slug,
        title: String(item.title ?? slug),
        collection: String(item.collection ?? 'Unassigned'),
        source: String(item.relativePath ?? item.sourcePath ?? slug),
        websiteState: websiteStateFor(websiteArticle),
        releaseState,
        readinessState,
        approvalState,
        missingGates: missingGatesFor(item),
        nextAction:
          releaseState === 'needs-schedule'
            ? 'Schedule release review'
            : readinessItem?.blockers.length
              ? 'Resolve readiness blockers'
              : 'Review current schedule',
        paths: [
          {
            path: `content/articles/${slug}/index.md`,
            exists: fs.existsSync(
              path.join(appRoot, 'content/articles', slug, 'index.md'),
            ),
          },
        ],
      };
    },
  );

  const approvedUnscheduled = inventory.filter(
    (item) =>
      item.approvalState === 'approved' && item.releaseState === 'needs-schedule',
  );
  const needsScheduling = inventory.filter(
    (item) => item.releaseState === 'needs-schedule',
  );
  const receipts = normalizeReceipts(appRoot);
  const nextActions: ContentOpsNextAction[] = [];

  if (approvedUnscheduled.length > 0) {
    nextActions.push({
      id: 'schedule-approved-unscheduled',
      label: `Schedule ${approvedUnscheduled.length} approved unscheduled item(s)`,
      slug: null,
      priority: 1,
      safe: true,
      command: 'pnpm content:pipeline ops:schedule-approved-unscheduled --dry-run',
      reason: 'Approved content lacks website release slots.',
    });
  }

  if (needsScheduling.length > 0) {
    nextActions.push({
      id: 'review-needs-scheduling',
      label: `Review ${needsScheduling.length} item(s) needing schedule`,
      slug: null,
      priority: 2,
      safe: true,
      command: 'pnpm content:pipeline ops:approved-unscheduled',
      reason: 'Content pipeline has items without release slots.',
    });
  }

  return {
    schemaVersion: 'content-ops-snapshot-v1',
    generatedAt,
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    latestLiveArticle: publishedArticles[0]
      ? {
          slug: publishedArticles[0].slug,
          title: publishedArticles[0].title,
          publishedAt: publishedArticles[0].publishedAt,
          canonicalUrl: publishedArticles[0].canonicalUrl,
        }
      : null,
    counts: {
      inventoryItems: inventory.length,
      publishedArticles: publishedArticles.length,
      websiteDrafts: websiteDrafts.length,
      approvedUnscheduled: approvedUnscheduled.length,
      needsScheduling: needsScheduling.length,
      blockers:
        blockers.length +
        readiness.filter((item) => item.status === 'blocked').length,
      scheduledEntries: schedules.length,
      receipts: receipts.length,
    },
    inventory,
    approvedUnscheduled,
    readiness,
    schedules,
    receipts,
    nextActions: nextActions.sort((left, right) => left.priority - right.priority),
    blockers,
    warnings,
  };
}
