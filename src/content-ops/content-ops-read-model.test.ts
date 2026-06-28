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
