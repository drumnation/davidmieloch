# Content Ops Console Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the internal, env-gated `/admin/content` Content Ops Console for davidmieloch.com with a normalized content pipeline read model, Storybook screen journey, API endpoints, safe scheduling/readiness/package actions, and agent-readable next-action access.

**Architecture:** Add a shared `src/content-ops` module that reads existing repo artifacts and returns normalized view models. Storybook, `/admin/content`, `/api/admin/content/*`, and `pnpm content:pipeline ops:*` consume the same contracts so content state is visible without creating a parallel CMS database. Public publishing, deployment, paid generation, and public social posting remain outside the console and behind the existing release ladder and approval seams.

**Tech Stack:** Next.js App Router, React 18, TypeScript, CSS modules, Vitest, Storybook 8, existing `scripts/content-pipeline.mjs`, existing content distribution JSON artifacts.

---

## Current Branch And Baseline

Work from:

```bash
cd /Users/dmieloch/.config/superpowers/worktrees/david-monorepo/codex-content-launch-gate-20260628
git status --short --branch
```

Expected baseline:

```text
## codex/content-ops-console-design-20260628
clean — nothing to commit
```

Design spec:

```text
docs/superpowers/specs/2026-06-28-content-ops-console-design.md
```

Governance links:

- Forgejo #16: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/16
- Forgejo #17: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/17
- Forgejo #18: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/18
- Forgejo #20: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/20

## File Structure

Create:

- `src/content-ops/types.ts`
  - Type-only contracts for normalized inventory, readiness, schedule, approval, receipt, agent-action, API result, and write-action result data.
- `src/content-ops/server.ts`
  - Node/server-only artifact readers and normalized read model builder.
- `src/content-ops/actions.ts`
  - Node/server-only safe write actions for schedule upsert/cancel, release dry-run, package preparation, and approved-unscheduled scheduling.
- `src/content-ops/fixtures.ts`
  - Storybook fixture data that satisfies the real normalized view-model types.
- `src/content-ops/content-ops-read-model.test.ts`
  - Unit tests for artifact reads, derived counts, approved-unscheduled, next actions, and receipts.
- `src/content-ops/content-ops-actions.test.ts`
  - Unit tests for safe write actions and refusal behavior.
- `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.tsx`
  - Pure presentational component for the console journey.
- `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.module.css`
  - Console styling.
- `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.stories.tsx`
  - Storybook journey: Overview, Needs Scheduling, Schedule Board, Readiness And Blockers, Agent Actions, Receipts, Full Journey.
- `src/shared-components/organisms/ContentOpsConsole/index.ts`
  - Component export.
- `app/admin/content/page.tsx`
  - Env-gated internal route.
- `app/api/admin/content/_lib/respond.ts`
  - Shared API guard/response helpers.
- `app/api/admin/content/overview/route.ts`
- `app/api/admin/content/inventory/route.ts`
- `app/api/admin/content/readiness/route.ts`
- `app/api/admin/content/schedule/route.ts`
- `app/api/admin/content/approvals/route.ts`
- `app/api/admin/content/receipts/route.ts`
- `app/api/admin/content/agent/next/route.ts`
- `app/api/admin/content/agent/approved-unscheduled/route.ts`
- `app/api/admin/content/schedule/upsert/route.ts`
- `app/api/admin/content/schedule/cancel/route.ts`
- `app/api/admin/content/release/dry-run/route.ts`
- `app/api/admin/content/packages/prepare/route.ts`
- `app/api/admin/content/agent/schedule-approved-unscheduled/route.ts`
- `src/content-ops-api-routes.test.ts`
  - API route guard and payload tests.
- `src/content-ops-admin-route.test.ts`
  - Route source/static behavior tests for noindex and public nav exclusion.

Modify:

- `scripts/content-pipeline.mjs`
  - Add `ops:next`, `ops:approved-unscheduled`, and `ops:schedule-approved-unscheduled`.
- `package.json`
  - Add focused scripts only if existing scripts are insufficient. Prefer using existing `type-check`, `build-storybook`, and `vitest` commands.

Do not modify:

- Public navigation.
- Existing production release ladder behavior.
- Existing social publishing behavior.
- `content/articles/**` article copy.

## Task 1: Add Content Ops Types And Read-Model Tests

**Files:**

- Create: `src/content-ops/types.ts`
- Create: `src/content-ops/content-ops-read-model.test.ts`

- [ ] **Step 1: Create the type contract file**

Create `src/content-ops/types.ts` with these exported types:

```ts
export type ContentOpsStatus = 'ready' | 'blocked' | 'warning' | 'unknown';

export type ContentOpsPathState = {
  path: string;
  exists: boolean;
};

export type ContentOpsInventoryItem = {
  slug: string;
  title: string;
  collection: string;
  source: string;
  websiteState: 'published' | 'draft' | 'not-staged' | 'unknown';
  releaseState: 'scheduled' | 'needs-schedule' | 'released' | 'unknown';
  readinessState: ContentOpsStatus;
  approvalState: 'approved' | 'missing' | 'partial' | 'not-required';
  missingGates: string[];
  nextAction: string;
  paths: ContentOpsPathState[];
};

export type ContentOpsScheduleEntry = {
  id: string;
  lane: 'website' | 'social' | 'external';
  platform: string;
  slug: string;
  title: string;
  scheduledAt: string | null;
  status: string;
  blocked: boolean;
  approvalState: 'approved' | 'missing' | 'partial' | 'not-required';
  safeDefault: string;
  nextCommand: string | null;
};

export type ContentOpsReadinessItem = {
  slug: string;
  title: string;
  status: ContentOpsStatus;
  blockers: string[];
  warnings: string[];
  missingAssets: string[];
};

export type ContentOpsReceipt = {
  path: string;
  status: string;
  generatedAt: string | null;
  command: string | null;
  publicPublishingPerformed: boolean;
};

export type ContentOpsNextAction = {
  id: string;
  label: string;
  slug: string | null;
  priority: number;
  safe: boolean;
  command: string | null;
  reason: string;
};

export type ContentOpsSnapshot = {
  schemaVersion: 'content-ops-snapshot-v1';
  generatedAt: string;
  publicPublishingPerformed: false;
  paidGenerationPerformed: false;
  latestLiveArticle: {
    slug: string;
    title: string;
    publishedAt: string | null;
    canonicalUrl: string | null;
  } | null;
  counts: {
    inventoryItems: number;
    publishedArticles: number;
    websiteDrafts: number;
    approvedUnscheduled: number;
    needsScheduling: number;
    blockers: number;
    scheduledEntries: number;
    receipts: number;
  };
  inventory: ContentOpsInventoryItem[];
  approvedUnscheduled: ContentOpsInventoryItem[];
  readiness: ContentOpsReadinessItem[];
  schedules: ContentOpsScheduleEntry[];
  receipts: ContentOpsReceipt[];
  nextActions: ContentOpsNextAction[];
  blockers: string[];
  warnings: string[];
};

export type ContentOpsApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

export type ContentOpsActionResult = {
  ok: boolean;
  action: string;
  generatedAt: string;
  publicPublishingPerformed: false;
  paidGenerationPerformed: false;
  changedFiles: string[];
  receiptPath: string | null;
  blockers: string[];
  warnings: string[];
  nextCommand: string | null;
};
```

- [ ] **Step 2: Write failing read-model tests**

Create `src/content-ops/content-ops-read-model.test.ts`:

```ts
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterEach, describe, expect, it } from 'vitest';

import { buildContentOpsSnapshot } from './server';

const tempRoots: string[] = [];

function tempRoot() {
  const root = mkdtempSync(join(tmpdir(), 'content-ops-'));
  tempRoots.push(root);
  return root;
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function writeJson(root: string, relativePath: string, value: unknown) {
  const filePath = join(root, relativePath);
  mkdirSync(join(filePath, '..'), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeArticle(root: string, slug: string, status: 'draft' | 'published') {
  const articleRoot = join(root, 'content/articles', slug);
  mkdirSync(articleRoot, { recursive: true });
  writeFileSync(
    join(articleRoot, 'index.md'),
    `---
title: "${slug.replace(/-/g, ' ')}"
description: "Description for ${slug}."
publishedAt: "2026-06-28"
status: "${status}"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
coverImage: "/blog/${slug}/images/hero.png"
---

# ${slug}
`,
  );
}

function writeMinimalArtifacts(root: string) {
  writeArticle(root, 'live-article', 'published');
  writeArticle(root, 'approved-draft', 'draft');
  writeJson(root, 'content/distribution/content-ledger.json', {
    schemaVersion: 'content-ledger-v1',
    generatedAt: '2026-06-28T00:00:00.000Z',
    publicPublishingPerformed: false,
    summary: { totalCandidates: 2 },
    items: [
      {
        slug: 'approved-draft',
        title: 'Approved Draft',
        collection: 'Factory Primitives',
        relativePath: 'approved-draft/index.md',
        gates: {
          release: 'needs-schedule',
        },
        releaseSchedule: { status: 'needs-schedule' },
      },
    ],
  });
  writeJson(root, 'content/distribution/article-readiness-report.json', {
    schemaVersion: 'article-readiness-report-v1',
    generatedAt: '2026-06-28T00:00:00.000Z',
    publicPublishingPerformed: false,
    summary: { websiteArticles: 2, websiteDrafts: 1 },
    websiteArticles: [
      {
        slug: 'live-article',
        title: 'Live Article',
        status: 'published',
        warnings: [],
        issues: [],
        readyForPublicRelease: true,
      },
      {
        slug: 'approved-draft',
        title: 'Approved Draft',
        status: 'draft',
        warnings: [],
        issues: [],
        readyForPublicRelease: true,
      },
    ],
    websiteDrafts: [
      {
        slug: 'approved-draft',
        title: 'Approved Draft',
        status: 'draft',
        warnings: [],
        issues: [],
        readyForPublicRelease: true,
      },
    ],
  });
  writeJson(root, 'content/distribution/site-release-calendar.json', {
    schemaVersion: 'site-release-calendar-v1',
    safeDefault: 'do-not-publish',
    entries: [],
  });
  writeJson(root, 'content/distribution/social-calendar.json', {
    schemaVersion: 'social-calendar-v1',
    publicPublishingPerformed: false,
    entries: [],
  });
  writeJson(root, 'content/distribution/publish-schedule.json', {
    schemaVersion: 'content-publish-schedule-v1',
    publicPublishingPerformed: false,
    entries: [],
  });
  writeJson(root, 'content/distribution/factory-primitives-approval-ledger.json', {
    schemaVersion: 'launch-approval-ledger-v1',
    publicPublishingPerformed: false,
    safeDefault: 'do-not-publish',
    approvals: {
      'approved-draft': {
        gates: {
          'article-copy-approved': { status: 'approved' },
          'hero-image-approved': { status: 'approved' },
          'site-draft-preview-reviewed': { status: 'approved' },
          'linkedin-reveal-copy-approved': { status: 'approved' },
          'release-time-approved': { status: 'approved' },
        },
      },
    },
  });
}

describe('content ops read model', () => {
  it('builds a normalized snapshot from existing content pipeline artifacts', () => {
    const root = tempRoot();
    writeMinimalArtifacts(root);

    const snapshot = buildContentOpsSnapshot({
      appRoot: root,
      generatedAt: '2026-06-28T12:00:00.000Z',
    });

    expect(snapshot.schemaVersion).toBe('content-ops-snapshot-v1');
    expect(snapshot.publicPublishingPerformed).toBe(false);
    expect(snapshot.paidGenerationPerformed).toBe(false);
    expect(snapshot.latestLiveArticle?.slug).toBe('live-article');
    expect(snapshot.counts.publishedArticles).toBe(1);
    expect(snapshot.counts.websiteDrafts).toBe(1);
    expect(snapshot.approvedUnscheduled.map((item) => item.slug)).toEqual([
      'approved-draft',
    ]);
    expect(snapshot.nextActions[0]).toMatchObject({
      id: 'schedule-approved-unscheduled',
      safe: true,
      command: 'pnpm content:pipeline ops:schedule-approved-unscheduled --dry-run',
    });
  });

  it('reports missing artifact blockers instead of throwing generic errors', () => {
    const root = tempRoot();

    const snapshot = buildContentOpsSnapshot({
      appRoot: root,
      generatedAt: '2026-06-28T12:00:00.000Z',
    });

    expect(snapshot.blockers).toContain(
      'Missing content/distribution/content-ledger.json',
    );
    expect(snapshot.counts.inventoryItems).toBe(0);
  });
});
```

- [ ] **Step 3: Run the failing tests**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops/content-ops-read-model.test.ts --run
```

Expected: FAIL because `src/content-ops/server.ts` and `buildContentOpsSnapshot` do not exist.

- [ ] **Step 4: Commit the failing tests and type contract**

```bash
git add src/content-ops/types.ts src/content-ops/content-ops-read-model.test.ts
git commit -m "test: define content ops read model contract"
```

## Task 2: Implement The Content Ops Read Model

**Files:**

- Create: `src/content-ops/server.ts`
- Modify: `src/content-ops/content-ops-read-model.test.ts`

- [ ] **Step 1: Implement JSON and markdown readers**

Create `src/content-ops/server.ts` with these top-level imports and helper functions:

```ts
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

function relativeContentPath(appRoot: string, filePath: string) {
  return path.relative(appRoot, filePath).replaceAll(path.sep, '/');
}

function readJsonFile<T>(appRoot: string, relativePath: string, blockers: string[]): T | null {
  const filePath = path.join(appRoot, relativePath);
  if (!fs.existsSync(filePath)) {
    blockers.push(`Missing ${relativePath}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch (error) {
    blockers.push(`Invalid JSON in ${relativePath}: ${error instanceof Error ? error.message : String(error)}`);
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
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    meta[key] = value;
  }

  return meta;
}
```

- [ ] **Step 2: Implement article discovery**

Add these functions to `src/content-ops/server.ts`:

```ts
function readWebsiteArticles(appRoot: string) {
  const articlesRoot = path.join(appRoot, 'content/articles');
  if (!fs.existsSync(articlesRoot)) return [];

  return fs
    .readdirSync(articlesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(articlesRoot, entry.name, 'index.md')))
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
    .sort((left, right) => String(right.publishedAt ?? '').localeCompare(String(left.publishedAt ?? '')));
}
```

- [ ] **Step 3: Implement normalization functions**

Add normalization functions for approvals, schedules, readiness, inventory, receipts, and next actions:

```ts
function approvalStateFor(approvalLedger: any, slug: string): ContentOpsInventoryItem['approvalState'] {
  const gates = approvalLedger?.approvals?.[slug]?.gates ?? {};
  const approved = APPROVAL_GATES.filter((gate) => gates[gate]?.status === 'approved');
  if (approved.length === APPROVAL_GATES.length) return 'approved';
  if (approved.length > 0) return 'partial';
  return 'missing';
}

function normalizeSchedules(siteCalendar: any, socialCalendar: any, publishSchedule: any): ContentOpsScheduleEntry[] {
  const websiteEntries = (siteCalendar?.entries ?? []).map((entry: any) => ({
    id: `website:${entry.slug}`,
    lane: 'website' as const,
    platform: 'website',
    slug: entry.slug,
    title: entry.title ?? entry.slug,
    scheduledAt: entry.plannedReleaseAt ?? entry.releaseTarget ?? null,
    status: entry.website?.status ?? entry.status ?? 'planned',
    blocked: Boolean(entry.blocker),
    approvalState: 'missing' as const,
    safeDefault: siteCalendar?.safeDefault ?? 'do-not-publish',
    nextCommand: entry.slug ? `pnpm content:pipeline content:release-workflow ${entry.slug}` : null,
  }));

  const socialEntries = (socialCalendar?.entries ?? []).map((entry: any) => ({
    id: entry.id ?? `social:${entry.platform}:${entry.articleSlug}`,
    lane: 'social' as const,
    platform: entry.platform ?? 'unknown',
    slug: entry.articleSlug ?? entry.slug,
    title: entry.title ?? entry.articleSlug ?? entry.slug,
    scheduledAt: entry.scheduledAt ?? null,
    status: entry.status ?? 'planned',
    blocked: Boolean(entry.blocked),
    approvalState: entry.approval?.status === 'approved' ? 'approved' as const : 'missing' as const,
    safeDefault: entry.safeDefault ?? 'do-not-post',
    nextCommand: entry.articleSlug ? `pnpm content:pipeline social:package ${entry.articleSlug} ${entry.platform ?? 'linkedin'}` : null,
  }));

  const externalEntries = (publishSchedule?.entries ?? []).map((entry: any) => ({
    id: entry.id ?? `external:${entry.platform}:${entry.articleSlug ?? entry.slug}`,
    lane: 'external' as const,
    platform: entry.platform ?? 'unknown',
    slug: entry.articleSlug ?? entry.slug,
    title: entry.title ?? entry.articleSlug ?? entry.slug,
    scheduledAt: entry.scheduledAt ?? null,
    status: entry.status ?? 'planned',
    blocked: Boolean(entry.blocked),
    approvalState: entry.approval?.status === 'approved' ? 'approved' as const : 'missing' as const,
    safeDefault: entry.safeDefault ?? 'do-not-publish',
    nextCommand: entry.nextCommand ?? null,
  }));

  return [...websiteEntries, ...socialEntries, ...externalEntries].sort((left, right) => (
    String(left.scheduledAt ?? '').localeCompare(String(right.scheduledAt ?? '')) ||
    left.title.localeCompare(right.title)
  ));
}

function normalizeReadiness(articleReadiness: any): ContentOpsReadinessItem[] {
  return (articleReadiness?.websiteArticles ?? []).map((article: any) => {
    const blockers = [...(article.issues ?? []), ...(article.blockers ?? [])];
    const warnings = article.warnings ?? [];
    return {
      slug: article.slug,
      title: article.title ?? article.slug,
      status: blockers.length > 0 ? 'blocked' : warnings.length > 0 ? 'warning' : 'ready',
      blockers,
      warnings,
      missingAssets: warnings.filter((warning: string) => /image|audio|transcript|package/i.test(warning)),
    };
  });
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
        const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
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
    .sort((left, right) => String(right.generatedAt ?? '').localeCompare(String(left.generatedAt ?? '')));
}
```

- [ ] **Step 4: Implement `buildContentOpsSnapshot`**

Add the exported function:

```ts
export function buildContentOpsSnapshot({
  appRoot = process.cwd(),
  generatedAt = new Date().toISOString(),
}: BuildContentOpsSnapshotOptions = {}): ContentOpsSnapshot {
  const blockers: string[] = [];
  const warnings: string[] = [];
  const contentLedger = readJsonFile<any>(appRoot, 'content/distribution/content-ledger.json', blockers);
  const articleReadiness = readJsonFile<any>(appRoot, 'content/distribution/article-readiness-report.json', blockers);
  const siteCalendar = readJsonFile<any>(appRoot, 'content/distribution/site-release-calendar.json', blockers);
  const socialCalendar = readJsonFile<any>(appRoot, 'content/distribution/social-calendar.json', blockers);
  const publishSchedule = readJsonFile<any>(appRoot, 'content/distribution/publish-schedule.json', blockers);
  const approvalLedger = readJsonFile<any>(appRoot, 'content/distribution/factory-primitives-approval-ledger.json', blockers);

  const articles = readWebsiteArticles(appRoot);
  const publishedArticles = articles.filter((article) => article.status === 'published');
  const websiteDrafts = articles.filter((article) => article.status === 'draft');
  const readiness = normalizeReadiness(articleReadiness);
  const readinessBySlug = new Map(readiness.map((item) => [item.slug, item]));
  const schedules = normalizeSchedules(siteCalendar, socialCalendar, publishSchedule);
  const scheduledSlugs = new Set(
    schedules
      .filter((entry) => entry.lane === 'website' && entry.scheduledAt)
      .map((entry) => entry.slug),
  );

  const ledgerItems = contentLedger?.items ?? [];
  const inventory: ContentOpsInventoryItem[] = ledgerItems.map((item: any) => {
    const readinessItem = readinessBySlug.get(item.slug);
    const websiteArticle = articles.find((article) => article.slug === item.slug);
    const approvalState = approvalStateFor(approvalLedger, item.slug);
    const releaseState = scheduledSlugs.has(item.slug)
      ? 'scheduled'
      : item.releaseSchedule?.status === 'scheduled-or-queued'
        ? 'scheduled'
        : item.releaseSchedule?.status === 'released'
          ? 'released'
          : 'needs-schedule';

    const missingGates = [
      item.gates?.thesis,
      item.gates?.image,
      item.gates?.website,
      item.gates?.socialTeaser,
      item.gates?.release,
    ].filter((gate): gate is string => typeof gate === 'string' && gate.includes('needs-'));

    return {
      slug: item.slug,
      title: item.title ?? item.slug,
      collection: item.collection ?? 'Unassigned',
      source: item.relativePath ?? item.sourcePath ?? item.slug,
      websiteState: websiteArticle?.status === 'published'
        ? 'published'
        : websiteArticle?.status === 'draft'
          ? 'draft'
          : 'not-staged',
      releaseState,
      readinessState: readinessItem?.status ?? 'unknown',
      approvalState,
      missingGates,
      nextAction: releaseState === 'needs-schedule'
        ? 'Schedule release review'
        : readinessItem?.blockers.length
          ? 'Resolve readiness blockers'
          : 'Review current schedule',
      paths: [
        {
          path: `content/articles/${item.slug}/index.md`,
          exists: fs.existsSync(path.join(appRoot, 'content/articles', item.slug, 'index.md')),
        },
      ],
    };
  });

  const approvedUnscheduled = inventory.filter((item) => (
    item.approvalState === 'approved' && item.releaseState === 'needs-schedule'
  ));
  const needsScheduling = inventory.filter((item) => item.releaseState === 'needs-schedule');
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
      blockers: blockers.length + readiness.filter((item) => item.status === 'blocked').length,
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
```

- [ ] **Step 5: Run read-model tests**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops/content-ops-read-model.test.ts --run
```

Expected: PASS.

- [ ] **Step 6: Run type-check**

Run:

```bash
pnpm type-check
```

Expected: PASS.

- [ ] **Step 7: Commit the read model**

```bash
git add src/content-ops/server.ts src/content-ops/content-ops-read-model.test.ts
git commit -m "feat: add content ops read model"
```

## Task 3: Build Storybook Fixture And Console Journey

**Files:**

- Create: `src/content-ops/fixtures.ts`
- Create: `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.tsx`
- Create: `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.module.css`
- Create: `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.stories.tsx`
- Create: `src/shared-components/organisms/ContentOpsConsole/index.ts`

- [ ] **Step 1: Create fixture data**

Create `src/content-ops/fixtures.ts`:

```ts
import type { ContentOpsSnapshot } from './types';

export const contentOpsFixture: ContentOpsSnapshot = {
  schemaVersion: 'content-ops-snapshot-v1',
  generatedAt: '2026-06-28T12:00:00.000Z',
  publicPublishingPerformed: false,
  paidGenerationPerformed: false,
  latestLiveArticle: {
    slug: 'the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
    title: "The AI Cost Rug Pull Isn't a Bubble. It's a Filter.",
    publishedAt: '2026-06-10',
    canonicalUrl: 'https://davidmieloch.com/blog/the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
  },
  counts: {
    inventoryItems: 32,
    publishedArticles: 26,
    websiteDrafts: 4,
    approvedUnscheduled: 1,
    needsScheduling: 21,
    blockers: 4,
    scheduledEntries: 85,
    receipts: 3,
  },
  inventory: [
    {
      slug: 'the-ai-bill-you-cant-predict',
      title: "The AI Bill You Can't Predict",
      collection: 'Factory Primitives',
      source: 'content/articles/the-ai-bill-you-cant-predict/index.md',
      websiteState: 'draft',
      releaseState: 'needs-schedule',
      readinessState: 'warning',
      approvalState: 'partial',
      missingGates: ['needs-image-generation', 'needs-schedule'],
      nextAction: 'Resolve image warnings before scheduling.',
      paths: [{ path: 'content/articles/the-ai-bill-you-cant-predict/index.md', exists: true }],
    },
    {
      slug: 'approved-draft',
      title: 'Approved Draft',
      collection: 'Factory Primitives',
      source: 'content/articles/approved-draft/index.md',
      websiteState: 'draft',
      releaseState: 'needs-schedule',
      readinessState: 'ready',
      approvalState: 'approved',
      missingGates: ['needs-schedule'],
      nextAction: 'Schedule release review.',
      paths: [{ path: 'content/articles/approved-draft/index.md', exists: true }],
    },
  ],
  approvedUnscheduled: [],
  readiness: [
    {
      slug: 'the-ai-bill-you-cant-predict',
      title: "The AI Bill You Can't Predict",
      status: 'warning',
      blockers: [],
      warnings: ['draft interior images planned but not generated/approved'],
      missingAssets: ['draft interior images planned but not generated/approved'],
    },
  ],
  schedules: [
    {
      id: 'website:the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
      lane: 'website',
      platform: 'website',
      slug: 'the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
      title: "The AI Cost Rug Pull Isn't a Bubble. It's a Filter.",
      scheduledAt: '2026-06-28T14:47:45.358Z',
      status: 'released',
      blocked: false,
      approvalState: 'approved',
      safeDefault: 'do-not-publish',
      nextCommand: 'pnpm release:status',
    },
  ],
  receipts: [
    {
      path: 'content/distribution/release-receipts/20260628T144745358Z-the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter.json',
      status: 'passed',
      generatedAt: '2026-06-28T14:47:45.358Z',
      command: 'site:release-ladder',
      publicPublishingPerformed: false,
    },
  ],
  nextActions: [
    {
      id: 'schedule-approved-unscheduled',
      label: 'Schedule 1 approved unscheduled item',
      slug: null,
      priority: 1,
      safe: true,
      command: 'pnpm content:pipeline ops:schedule-approved-unscheduled --dry-run',
      reason: 'Approved content lacks website release slots.',
    },
  ],
  blockers: [],
  warnings: ['One draft has planned interior images that are not generated/approved.'],
};

contentOpsFixture.approvedUnscheduled = contentOpsFixture.inventory.filter(
  (item) => item.approvalState === 'approved' && item.releaseState === 'needs-schedule',
);
```

- [ ] **Step 2: Create the presentational component**

Create `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.tsx`:

```tsx
import type { ContentOpsSnapshot } from '../../../content-ops/types';
import styles from './ContentOpsConsole.module.css';

type ContentOpsConsoleProps = {
  snapshot: ContentOpsSnapshot;
  mode?: 'full' | 'overview' | 'scheduling' | 'readiness' | 'agent' | 'receipts';
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article className={styles.statCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export function ContentOpsConsole({ snapshot, mode = 'full' }: ContentOpsConsoleProps) {
  const showOverview = mode === 'full' || mode === 'overview';
  const showScheduling = mode === 'full' || mode === 'scheduling';
  const showReadiness = mode === 'full' || mode === 'readiness';
  const showAgent = mode === 'full' || mode === 'agent';
  const showReceipts = mode === 'full' || mode === 'receipts';

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Content Ops Console</p>
          <h1>Website publishing without branch archaeology.</h1>
          <p>
            Internal control room for canonical articles, schedules, readiness,
            approvals, receipts, and safe agent actions.
          </p>
        </div>
        <aside className={styles.guardrail}>
          <strong>Safe boundary</strong>
          <span>No public publishing.</span>
          <span>No deploys.</span>
          <span>No paid generation.</span>
        </aside>
      </section>

      {showOverview ? (
        <section className={styles.panel} aria-labelledby="content-ops-overview">
          <h2 id="content-ops-overview">Overview</h2>
          <div className={styles.statsGrid}>
            <StatCard label="Published" value={snapshot.counts.publishedArticles} />
            <StatCard label="Drafts" value={snapshot.counts.websiteDrafts} />
            <StatCard label="Needs schedule" value={snapshot.counts.needsScheduling} />
            <StatCard label="Blockers" value={snapshot.counts.blockers} />
          </div>
          {snapshot.latestLiveArticle ? (
            <p className={styles.liveLine}>
              Latest live: <strong>{snapshot.latestLiveArticle.title}</strong>
            </p>
          ) : (
            <p className={styles.liveLine}>No live article detected.</p>
          )}
        </section>
      ) : null}

      {showScheduling ? (
        <section className={styles.panel} aria-labelledby="content-ops-scheduling">
          <h2 id="content-ops-scheduling">Needs Scheduling</h2>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Website</th>
                  <th>Readiness</th>
                  <th>Approval</th>
                  <th>Next action</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.inventory.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <strong>{item.title}</strong>
                      <span>{item.slug}</span>
                    </td>
                    <td>{item.websiteState}</td>
                    <td>{item.readinessState}</td>
                    <td>{item.approvalState}</td>
                    <td>{item.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {showReadiness ? (
        <section className={styles.panel} aria-labelledby="content-ops-readiness">
          <h2 id="content-ops-readiness">Readiness And Blockers</h2>
          <div className={styles.cardGrid}>
            {snapshot.readiness.map((item) => (
              <article className={styles.statusCard} key={item.slug}>
                <span className={styles.status}>{item.status}</span>
                <h3>{item.title}</h3>
                {[...item.blockers, ...item.warnings].map((message) => (
                  <p key={message}>{message}</p>
                ))}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showAgent ? (
        <section className={styles.panel} aria-labelledby="content-ops-agent">
          <h2 id="content-ops-agent">Agent Actions</h2>
          <div className={styles.cardGrid}>
            {snapshot.nextActions.map((action) => (
              <article className={styles.statusCard} key={action.id}>
                <span className={styles.status}>{action.safe ? 'safe' : 'blocked'}</span>
                <h3>{action.label}</h3>
                <p>{action.reason}</p>
                {action.command ? <code>{action.command}</code> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showReceipts ? (
        <section className={styles.panel} aria-labelledby="content-ops-receipts">
          <h2 id="content-ops-receipts">Receipts</h2>
          <div className={styles.cardGrid}>
            {snapshot.receipts.map((receipt) => (
              <article className={styles.statusCard} key={receipt.path}>
                <span className={styles.status}>{receipt.status}</span>
                <h3>{receipt.command ?? 'receipt'}</h3>
                <p>{receipt.path}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
```

- [ ] **Step 3: Add CSS**

Create `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.module.css` with a dark operator-console visual language:

```css
.shell {
  min-height: 100vh;
  padding: 96px 24px;
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 189, 104, 0.16), transparent 32rem),
    linear-gradient(135deg, #0e1116 0%, #15191f 48%, #0d1014 100%);
  color: #f8efe0;
}

.hero,
.panel {
  max-width: 1220px;
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 24px;
  align-items: end;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(248, 239, 224, 0.16);
}

.eyebrow,
.status {
  color: #ffbd68;
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 900px;
  margin: 0;
  font-size: clamp(2.7rem, 7vw, 5.7rem);
  line-height: 0.92;
}

.hero p,
.liveLine,
.statusCard p {
  color: #d9cdbc;
  line-height: 1.55;
}

.guardrail,
.statCard,
.panel,
.statusCard {
  border: 1px solid rgba(248, 239, 224, 0.16);
  background: rgba(248, 239, 224, 0.05);
}

.guardrail {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 12px;
}

.panel {
  margin-top: 24px;
  padding: 22px;
  border-radius: 16px;
}

.panel h2 {
  margin: 0 0 16px;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

.statsGrid,
.cardGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.statCard,
.statusCard {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 12px;
}

.statCard strong {
  font-size: 2rem;
}

.tableWrap {
  overflow-x: auto;
}

.tableWrap table {
  width: 100%;
  border-collapse: collapse;
}

.tableWrap th,
.tableWrap td {
  padding: 12px;
  border-bottom: 1px solid rgba(248, 239, 224, 0.12);
  text-align: left;
  vertical-align: top;
}

.tableWrap td span {
  display: block;
  margin-top: 4px;
  color: #9fa8b5;
  font-size: 0.82rem;
}

.statusCard h3 {
  margin: 0;
}

.statusCard code {
  overflow-wrap: anywhere;
  color: #ffbd68;
}

@media (max-width: 860px) {
  .hero,
  .statsGrid,
  .cardGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Add Storybook stories**

Create `src/shared-components/organisms/ContentOpsConsole/ContentOpsConsole.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { contentOpsFixture } from '../../../content-ops/fixtures';
import { ContentOpsConsole } from './ContentOpsConsole';

const meta = {
  title: 'Content Ops Console/07 Full Journey',
  component: ContentOpsConsole,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContentOpsConsole>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullJourney: Story = {
  args: {
    snapshot: contentOpsFixture,
    mode: 'full',
  },
};

export const Overview: Story = {
  name: '01 Overview',
  args: {
    snapshot: contentOpsFixture,
    mode: 'overview',
  },
};

export const NeedsScheduling: Story = {
  name: '02 Needs Scheduling',
  args: {
    snapshot: contentOpsFixture,
    mode: 'scheduling',
  },
};

export const ScheduleBoard: Story = {
  name: '03 Schedule Board',
  args: {
    snapshot: contentOpsFixture,
    mode: 'scheduling',
  },
};

export const ReadinessAndBlockers: Story = {
  name: '04 Readiness And Blockers',
  args: {
    snapshot: contentOpsFixture,
    mode: 'readiness',
  },
};

export const AgentActions: Story = {
  name: '05 Agent Actions',
  args: {
    snapshot: contentOpsFixture,
    mode: 'agent',
  },
};

export const Receipts: Story = {
  name: '06 Receipts',
  args: {
    snapshot: contentOpsFixture,
    mode: 'receipts',
  },
};
```

- [ ] **Step 5: Add component export**

Create `src/shared-components/organisms/ContentOpsConsole/index.ts`:

```ts
export { ContentOpsConsole } from './ContentOpsConsole';
```

- [ ] **Step 6: Run Storybook checks**

Run:

```bash
pnpm exec vitest --config vitest.config.stories.ts --run
pnpm build-storybook
```

Expected: PASS. If `vitest.config.stories.ts` fails because a legacy story lacks metadata, keep `pnpm build-storybook` as the required Storybook proof and record the legacy failure in the commit message body.

- [ ] **Step 7: Commit Storybook journey**

```bash
git add src/content-ops/fixtures.ts src/shared-components/organisms/ContentOpsConsole
git commit -m "feat: add content ops console story journey"
```

## Task 4: Add Read API Endpoints

**Files:**

- Create: `app/api/admin/content/_lib/respond.ts`
- Create route files under `app/api/admin/content/**/route.ts`
- Create: `src/content-ops-api-routes.test.ts`

- [ ] **Step 1: Write API route tests**

Create `src/content-ops-api-routes.test.ts`:

```ts
import { afterEach, describe, expect, it } from 'vitest';

const originalEnabled = process.env.CONTENT_OPS_ENABLED;
const originalWriteEnabled = process.env.CONTENT_OPS_WRITE_ENABLED;

afterEach(() => {
  process.env.CONTENT_OPS_ENABLED = originalEnabled;
  process.env.CONTENT_OPS_WRITE_ENABLED = originalWriteEnabled;
});

describe('Content Ops API route source contracts', () => {
  it('keeps read API disabled unless CONTENT_OPS_ENABLED is set', async () => {
    process.env.CONTENT_OPS_ENABLED = '0';
    const { GET } = await import('../app/api/admin/content/overview/route');
    const response = await GET();
    expect(response.status).toBe(404);
  });

  it('keeps write API disabled unless CONTENT_OPS_WRITE_ENABLED is set', async () => {
    process.env.CONTENT_OPS_ENABLED = '1';
    process.env.CONTENT_OPS_WRITE_ENABLED = '0';
    const { POST } = await import('../app/api/admin/content/schedule/upsert/route');
    const response = await POST(
      new Request('https://davidmieloch.com/api/admin/content/schedule/upsert', {
        method: 'POST',
        body: JSON.stringify({ slug: 'draft', scheduledAt: '2026-07-01T12:00:00.000Z' }),
      }),
    );
    expect(response.status).toBe(404);
  });
});
```

- [ ] **Step 2: Run failing API tests**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops-api-routes.test.ts --run
```

Expected: FAIL because API route files do not exist.

- [ ] **Step 3: Create API response helpers**

Create `app/api/admin/content/_lib/respond.ts`:

```ts
import { NextResponse } from 'next/server';

export function readDisabledResponse() {
  return NextResponse.json({ ok: false, error: 'disabled' }, { status: 404 });
}

export function writeDisabledResponse() {
  return NextResponse.json({ ok: false, error: 'write disabled' }, { status: 404 });
}

export function assertReadEnabled() {
  return process.env.CONTENT_OPS_ENABLED === '1';
}

export function assertWriteEnabled() {
  return process.env.CONTENT_OPS_ENABLED === '1' && process.env.CONTENT_OPS_WRITE_ENABLED === '1';
}

export function jsonData<T>(data: T) {
  return NextResponse.json({ ok: true, data });
}

export function jsonError(error: unknown, status = 500) {
  return NextResponse.json(
    { ok: false, error: error instanceof Error ? error.message : String(error) },
    { status },
  );
}
```

- [ ] **Step 4: Add read routes**

Each read route uses this pattern. For `app/api/admin/content/overview/route.ts`:

```ts
import { buildContentOpsSnapshot } from '../../../../../src/content-ops/server';
import { assertReadEnabled, jsonData, readDisabledResponse } from '../_lib/respond';

export function GET() {
  if (!assertReadEnabled()) return readDisabledResponse();
  const snapshot = buildContentOpsSnapshot();
  return jsonData({
    latestLiveArticle: snapshot.latestLiveArticle,
    counts: snapshot.counts,
    blockers: snapshot.blockers,
    warnings: snapshot.warnings,
    nextActions: snapshot.nextActions,
  });
}
```

Use the same import shape for:

- `inventory/route.ts`: return `snapshot.inventory`.
- `readiness/route.ts`: return `snapshot.readiness`.
- `schedule/route.ts`: return `snapshot.schedules`.
- `approvals/route.ts`: return `{ approvedUnscheduled: snapshot.approvedUnscheduled }`.
- `receipts/route.ts`: return `snapshot.receipts`.
- `agent/next/route.ts`: return `snapshot.nextActions`.
- `agent/approved-unscheduled/route.ts`: return `snapshot.approvedUnscheduled`.

- [ ] **Step 5: Run API route tests**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops-api-routes.test.ts --run
pnpm type-check
```

Expected: PASS.

- [ ] **Step 6: Commit read API**

```bash
git add app/api/admin/content src/content-ops-api-routes.test.ts
git commit -m "feat: add content ops read api"
```

## Task 5: Add Env-Gated `/admin/content` Route

**Files:**

- Create: `app/admin/content/page.tsx`
- Create: `src/content-ops-admin-route.test.ts`

- [ ] **Step 1: Write route source test**

Create `src/content-ops-admin-route.test.ts`:

```ts
import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

describe('content ops admin route source', () => {
  it('is env-gated and noindexed', () => {
    const source = readFileSync('app/admin/content/page.tsx', 'utf8');
    expect(source).toContain('CONTENT_OPS_ENABLED');
    expect(source).toContain('notFound');
    expect(source).toContain('index: false');
    expect(source).toContain('follow: false');
  });

  it('is not linked from public navigation', () => {
    const pageSource = readFileSync('app/page.tsx', 'utf8');
    const layoutSource = readFileSync('app/layout.tsx', 'utf8');
    expect(pageSource).not.toContain('/admin/content');
    expect(layoutSource).not.toContain('/admin/content');
  });
});
```

- [ ] **Step 2: Run failing route test**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops-admin-route.test.ts --run
```

Expected: FAIL because `app/admin/content/page.tsx` does not exist.

- [ ] **Step 3: Create route page**

Create `app/admin/content/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildContentOpsSnapshot } from '../../../src/content-ops/server';
import { ContentOpsConsole } from '../../../src/shared-components/organisms/ContentOpsConsole';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Content Ops Console',
  description: 'Internal control room for davidmieloch.com content operations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContentOpsAdminPage() {
  if (process.env.CONTENT_OPS_ENABLED !== '1') {
    notFound();
  }

  const snapshot = buildContentOpsSnapshot();

  return <ContentOpsConsole snapshot={snapshot} />;
}
```

- [ ] **Step 4: Run route tests and type-check**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops-admin-route.test.ts --run
pnpm type-check
```

Expected: PASS.

- [ ] **Step 5: Commit route**

```bash
git add app/admin/content src/content-ops-admin-route.test.ts
git commit -m "feat: add internal content ops route"
```

## Task 6: Add Safe Write Actions

**Files:**

- Create: `src/content-ops/actions.ts`
- Create: `src/content-ops/content-ops-actions.test.ts`
- Create write API route files listed in the spec.

- [ ] **Step 1: Write action tests**

Create `src/content-ops/content-ops-actions.test.ts` with tests that prove actions do not publish:

```ts
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterEach, describe, expect, it } from 'vitest';

import {
  cancelContentOpsSchedule,
  dryRunContentOpsRelease,
  prepareContentOpsPackages,
  upsertContentOpsSchedule,
} from './actions';

const tempRoots: string[] = [];

function tempRoot() {
  const root = mkdtempSync(join(tmpdir(), 'content-ops-actions-'));
  tempRoots.push(root);
  return root;
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function writeJson(root: string, relativePath: string, value: unknown) {
  const filePath = join(root, relativePath);
  mkdirSync(join(filePath, '..'), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

describe('content ops safe actions', () => {
  it('upserts website schedule entries without claiming public publish', () => {
    const root = tempRoot();
    writeJson(root, 'content/distribution/site-release-calendar.json', {
      schemaVersion: 'site-release-calendar-v1',
      safeDefault: 'do-not-publish',
      entries: [],
    });

    const result = upsertContentOpsSchedule({
      appRoot: root,
      slug: 'approved-draft',
      title: 'Approved Draft',
      scheduledAt: '2026-07-01T12:00:00.000Z',
    });

    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.changedFiles).toEqual(['content/distribution/site-release-calendar.json']);
    const written = JSON.parse(readFileSync(join(root, 'content/distribution/site-release-calendar.json'), 'utf8'));
    expect(written.entries[0]).toMatchObject({
      slug: 'approved-draft',
      plannedReleaseAt: '2026-07-01T12:00:00.000Z',
      safeDefault: 'do-not-publish',
    });
  });

  it('returns dry-run release command without executing deploy', () => {
    const result = dryRunContentOpsRelease({ appRoot: tempRoot(), slug: 'approved-draft' });
    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.nextCommand).toBe('pnpm content:pipeline content:release-workflow approved-draft');
    expect(result.changedFiles).toEqual([]);
  });

  it('returns package preparation command without posting', () => {
    const result = prepareContentOpsPackages({ appRoot: tempRoot(), slug: 'approved-draft' });
    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.nextCommand).toBe('pnpm content:pipeline social:package approved-draft all');
  });

  it('cancels schedule entries by slug without deleting unrelated entries', () => {
    const root = tempRoot();
    writeJson(root, 'content/distribution/site-release-calendar.json', {
      schemaVersion: 'site-release-calendar-v1',
      safeDefault: 'do-not-publish',
      entries: [
        { slug: 'approved-draft', title: 'Approved Draft' },
        { slug: 'keep-draft', title: 'Keep Draft' },
      ],
    });

    const result = cancelContentOpsSchedule({ appRoot: root, slug: 'approved-draft' });
    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.changedFiles).toEqual(['content/distribution/site-release-calendar.json']);
    const written = JSON.parse(readFileSync(join(root, 'content/distribution/site-release-calendar.json'), 'utf8'));
    expect(written.entries.map((entry: { slug: string }) => entry.slug)).toEqual(['keep-draft']);
  });
});
```

- [ ] **Step 2: Run failing action tests**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops/content-ops-actions.test.ts --run
```

Expected: FAIL because `src/content-ops/actions.ts` does not exist.

- [ ] **Step 3: Implement safe actions**

Create `src/content-ops/actions.ts` with exported functions used by the tests:

```ts
import fs from 'node:fs';
import path from 'node:path';

import type { ContentOpsActionResult } from './types';

function result(action: string, overrides: Partial<ContentOpsActionResult>): ContentOpsActionResult {
  return {
    ok: true,
    action,
    generatedAt: new Date().toISOString(),
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    changedFiles: [],
    receiptPath: null,
    blockers: [],
    warnings: [],
    nextCommand: null,
    ...overrides,
  };
}

function readJson(filePath: string, fallback: any) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath: string, payload: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

export function upsertContentOpsSchedule({
  appRoot = process.cwd(),
  slug,
  title,
  scheduledAt,
}: {
  appRoot?: string;
  slug: string;
  title: string;
  scheduledAt: string;
}) {
  const relativePath = 'content/distribution/site-release-calendar.json';
  const filePath = path.join(appRoot, relativePath);
  const calendar = readJson(filePath, {
    schemaVersion: 'site-release-calendar-v1',
    safeDefault: 'do-not-publish',
    entries: [],
  });
  const entries = (calendar.entries ?? []).filter((entry: { slug: string }) => entry.slug !== slug);
  entries.push({
    slug,
    title,
    plannedReleaseAt: scheduledAt,
    status: 'planned',
    safeDefault: 'do-not-publish',
    publicPublishingAllowed: false,
    approval: {
      required: true,
      status: 'missing',
      requiredFrom: 'David',
    },
  });
  calendar.entries = entries.sort((left: any, right: any) => (
    String(left.plannedReleaseAt ?? '').localeCompare(String(right.plannedReleaseAt ?? ''))
  ));
  calendar.publicPublishingPerformed = false;
  calendar.safeDefault = 'do-not-publish';
  writeJson(filePath, calendar);

  return result('schedule-upsert', {
    changedFiles: [relativePath],
    nextCommand: `pnpm content:pipeline content:release-workflow ${slug}`,
  });
}

export function cancelContentOpsSchedule({ appRoot = process.cwd(), slug }: { appRoot?: string; slug: string }) {
  const relativePath = 'content/distribution/site-release-calendar.json';
  const filePath = path.join(appRoot, relativePath);
  const calendar = readJson(filePath, {
    schemaVersion: 'site-release-calendar-v1',
    safeDefault: 'do-not-publish',
    entries: [],
  });
  calendar.entries = (calendar.entries ?? []).filter((entry: { slug: string }) => entry.slug !== slug);
  calendar.publicPublishingPerformed = false;
  calendar.safeDefault = 'do-not-publish';
  writeJson(filePath, calendar);

  return result('schedule-cancel', {
    changedFiles: [relativePath],
    nextCommand: 'pnpm content:pipeline ops:next',
  });
}

export function dryRunContentOpsRelease({ slug }: { appRoot?: string; slug: string }) {
  return result('release-dry-run', {
    nextCommand: `pnpm content:pipeline content:release-workflow ${slug}`,
  });
}

export function prepareContentOpsPackages({ slug }: { appRoot?: string; slug: string }) {
  return result('packages-prepare', {
    nextCommand: `pnpm content:pipeline social:package ${slug} all`,
  });
}
```

- [ ] **Step 4: Add write API routes**

Each write route imports `assertWriteEnabled`, `jsonData`, `writeDisabledResponse`, and the matching action function.

Example `app/api/admin/content/schedule/upsert/route.ts`:

```ts
import { upsertContentOpsSchedule } from '../../../../../../src/content-ops/actions';
import { assertWriteEnabled, jsonData, jsonError, writeDisabledResponse } from '../../_lib/respond';

export async function POST(request: Request) {
  if (!assertWriteEnabled()) return writeDisabledResponse();

  try {
    const body = await request.json();
    const result = upsertContentOpsSchedule({
      slug: String(body.slug ?? ''),
      title: String(body.title ?? body.slug ?? ''),
      scheduledAt: String(body.scheduledAt ?? ''),
    });
    return jsonData(result);
  } catch (error) {
    return jsonError(error, 400);
  }
}
```

Add equivalent routes:

- `schedule/cancel/route.ts` calls `cancelContentOpsSchedule`.
- `release/dry-run/route.ts` calls `dryRunContentOpsRelease`.
- `packages/prepare/route.ts` calls `prepareContentOpsPackages`.

- [ ] **Step 5: Run action and API tests**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops/content-ops-actions.test.ts src/content-ops-api-routes.test.ts --run
pnpm type-check
```

Expected: PASS.

- [ ] **Step 6: Commit safe write actions**

```bash
git add src/content-ops/actions.ts src/content-ops/content-ops-actions.test.ts app/api/admin/content
git commit -m "feat: add safe content ops actions"
```

## Task 7: Add Agent Access And CLI Commands

**Files:**

- Modify: `scripts/content-pipeline.mjs`
- Modify: `src/content-ops/actions.ts`
- Modify: `src/content-ops/content-ops-actions.test.ts`
- Create: `src/content-ops-cli-source.test.ts`

- [ ] **Step 1: Add approved-unscheduled scheduling action**

Extend `src/content-ops/actions.ts` with:

```ts
import { buildContentOpsSnapshot } from './server';

export function scheduleApprovedUnscheduledContent({
  appRoot = process.cwd(),
  startAt = new Date().toISOString(),
  intervalDays = 7,
  write = false,
}: {
  appRoot?: string;
  startAt?: string;
  intervalDays?: number;
  write?: boolean;
}) {
  const snapshot = buildContentOpsSnapshot({ appRoot });
  const approved = snapshot.approvedUnscheduled;

  if (!write) {
    return result('schedule-approved-unscheduled', {
      changedFiles: [],
      warnings: approved.map((item, index) => `${item.slug} would be scheduled at index ${index}`),
      nextCommand: 'pnpm content:pipeline ops:schedule-approved-unscheduled --write',
    });
  }

  const changedFiles: string[] = [];
  approved.forEach((item, index) => {
    const date = new Date(startAt);
    date.setUTCDate(date.getUTCDate() + index * intervalDays);
    const scheduleResult = upsertContentOpsSchedule({
      appRoot,
      slug: item.slug,
      title: item.title,
      scheduledAt: date.toISOString(),
    });
    changedFiles.push(...scheduleResult.changedFiles);
  });

  return result('schedule-approved-unscheduled', {
    changedFiles: [...new Set(changedFiles)],
    nextCommand: 'pnpm content:pipeline ops:next',
  });
}
```

- [ ] **Step 2: Add CLI source test**

Create `src/content-ops-cli-source.test.ts`:

```ts
import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

describe('content ops CLI source', () => {
  it('registers read-only and write-gated ops commands', () => {
    const source = readFileSync('scripts/content-pipeline.mjs', 'utf8');
    expect(source).toContain('ops:next');
    expect(source).toContain('ops:approved-unscheduled');
    expect(source).toContain('ops:schedule-approved-unscheduled');
    expect(source).toContain('--write');
  });
});
```

- [ ] **Step 3: Run failing CLI test**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops-cli-source.test.ts --run
```

Expected: FAIL until `scripts/content-pipeline.mjs` is updated.

- [ ] **Step 4: Modify `scripts/content-pipeline.mjs` imports**

Add imports near existing content pipeline imports:

```js
import {
  buildContentOpsSnapshot,
} from '../src/content-ops/server.ts';
import {
  scheduleApprovedUnscheduledContent,
} from '../src/content-ops/actions.ts';
```

- [ ] **Step 5: Add CLI command functions**

Add functions before `runCommand`:

```js
function contentOpsNextCommand() {
  const snapshot = buildContentOpsSnapshot({ appRoot });
  console.log(JSON.stringify({
    generatedAt: snapshot.generatedAt,
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    nextActions: snapshot.nextActions,
    blockers: snapshot.blockers,
    warnings: snapshot.warnings,
  }, null, 2));
}

function contentOpsApprovedUnscheduledCommand() {
  const snapshot = buildContentOpsSnapshot({ appRoot });
  console.log(JSON.stringify({
    generatedAt: snapshot.generatedAt,
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    approvedUnscheduled: snapshot.approvedUnscheduled,
  }, null, 2));
}

function contentOpsScheduleApprovedUnscheduledCommand() {
  const options = parseCommandOptions(3);
  const result = scheduleApprovedUnscheduledContent({
    appRoot,
    write: Boolean(options.write),
    startAt: options.start ?? new Date().toISOString(),
    intervalDays: Number(options['interval-days'] ?? 7),
  });
  console.log(JSON.stringify(result, null, 2));
}
```

- [ ] **Step 6: Register CLI commands**

In `runCommand`, add:

```js
  if (command === 'ops:next') {
    return contentOpsNextCommand();
  }
  if (command === 'ops:approved-unscheduled') {
    return contentOpsApprovedUnscheduledCommand();
  }
  if (command === 'ops:schedule-approved-unscheduled') {
    return contentOpsScheduleApprovedUnscheduledCommand();
  }
```

In the usage text, add:

```text
  pnpm content:pipeline ops:next
  pnpm content:pipeline ops:approved-unscheduled
  pnpm content:pipeline ops:schedule-approved-unscheduled [--start=<iso-date>] [--interval-days=7] [--write]
```

In the safety block, add:

```text
  - ops commands read content operations state and can write local schedule artifacts only with --write; they do not publish public content, deploy, post, or spend credits.
```

- [ ] **Step 7: Add write API route for agent scheduling**

Create `app/api/admin/content/agent/schedule-approved-unscheduled/route.ts`:

```ts
import { scheduleApprovedUnscheduledContent } from '../../../../../../src/content-ops/actions';
import { assertWriteEnabled, jsonData, jsonError, writeDisabledResponse } from '../../_lib/respond';

export async function POST(request: Request) {
  if (!assertWriteEnabled()) return writeDisabledResponse();

  try {
    const body = await request.json();
    const result = scheduleApprovedUnscheduledContent({
      startAt: body.startAt ? String(body.startAt) : undefined,
      intervalDays: body.intervalDays ? Number(body.intervalDays) : undefined,
      write: Boolean(body.write),
    });
    return jsonData(result);
  } catch (error) {
    return jsonError(error, 400);
  }
}
```

- [ ] **Step 8: Run CLI and action tests**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops/content-ops-actions.test.ts src/content-ops-cli-source.test.ts src/content-ops-api-routes.test.ts --run
pnpm content:pipeline ops:next
pnpm content:pipeline ops:approved-unscheduled
pnpm content:pipeline ops:schedule-approved-unscheduled --dry-run
```

Expected: tests PASS; CLI commands print JSON with `publicPublishingPerformed: false`.

- [ ] **Step 9: Commit agent access**

```bash
git add scripts/content-pipeline.mjs src/content-ops app/api/admin/content/agent src/content-ops-cli-source.test.ts
git commit -m "feat: add content ops agent access"
```

## Task 8: Verification And Storybook/Staging Preparation

**Files:**

- No planned source changes. This task verifies the implementation and records external Storybook/staging status in the final report.

- [ ] **Step 1: Run full local verification**

Run:

```bash
pnpm exec vitest --config vitest.config.ts src/content-ops/content-ops-read-model.test.ts src/content-ops/content-ops-actions.test.ts src/content-ops-api-routes.test.ts src/content-ops-admin-route.test.ts src/content-ops-cli-source.test.ts --run
pnpm type-check
pnpm build-storybook
CONTENT_OPS_ENABLED=1 pnpm build
```

Expected: PASS.

- [ ] **Step 2: Start local preview for route smoke**

Run:

```bash
CONTENT_OPS_ENABLED=1 pnpm dev:alt
```

Open:

```text
http://127.0.0.1:3002/admin/content
```

Expected visible text:

```text
Content Ops Console
Website publishing without branch archaeology.
Safe boundary
```

- [ ] **Step 3: Verify disabled route**

Stop the dev server, then run:

```bash
CONTENT_OPS_ENABLED=0 pnpm dev:alt
```

Open:

```text
http://127.0.0.1:3002/admin/content
```

Expected: route returns the site 404 page.

- [ ] **Step 4: Register Storybook surface with Brain Garden hub**

Before registering, verify current remote availability:

```bash
ssh -o BatchMode=yes -o ConnectTimeout=5 singularity-one 'hostname; bg-storybook --json list'
```

If SSH times out, record the timeout in the final report and keep Storybook verification local for this pass.

If SSH works, register or onboard a personal-site Storybook surface using the current `bg-storybook` helper on `singularity-one`, targeting this repo's `pnpm storybook` command and port `7010`. Use the route:

```text
https://davidmieloch-storybook.brain-garden.io
```

Do not claim this URL works until `bg-storybook verify` and browser verification pass.

- [ ] **Step 5: Final implementation branch status**

Run:

```bash
git status --short --branch
git log --oneline -8
```

Expected: clean worktree, with the Content Ops Console commits on the current branch.

## Completion Audit

Before marking the goal complete, prove each requirement:

- API endpoints exist for schedule, inventory, approval state, release readiness, blockers, receipts, and agent views.
- `/admin/content` exists, is env-gated, is not in public navigation, and renders current content ops state when enabled.
- Storybook contains the seven-screen journey.
- Safe scheduling/readiness/package actions return receipts or command trails and do not publish/deploy/post/spend.
- Agent commands or endpoints answer next, approved-unscheduled, and schedule-approved-unscheduled.
- Tests pass for read model, safe actions, API gates, route gate, and CLI source.
- `pnpm type-check` passes.
- `pnpm build-storybook` passes.
- Staging/internal Storybook and `/admin/content` are verified before any staged completion claim.
- Production is not claimed unless a separate release promotion is explicitly approved and `pnpm release:status` proves it.

## Execution Recommendation

Use subagent-driven execution for Tasks 1-7 because the slices are independent enough to review between commits:

- Worker 1: Tasks 1-2 read model.
- Worker 2: Task 3 Storybook journey.
- Worker 3: Tasks 4-5 API and route.
- Worker 4: Tasks 6-7 safe actions and agent access.
- Main agent: Task 8 verification, Storybook hub/staging coordination, final audit.

If subagents are unavailable, use inline execution with one commit per task.
