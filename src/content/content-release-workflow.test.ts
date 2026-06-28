import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { afterEach, describe, expect, it } from 'vitest';

import {
  CONTENT_RELEASE_WORKFLOW_STEP_IDS,
  buildContentReleaseWorkflowPlan,
  buildContentReleaseWorkflowReceipt,
  collectContentReleaseWorkflowState,
  parseContentReleaseWorkflowConfig,
} from '../../scripts/lib/content-release-workflow.mjs';

const tempRoots: string[] = [];

function tempRoot() {
  const root = mkdtempSync(join(tmpdir(), 'content-release-workflow-'));
  tempRoots.push(root);
  return root;
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function writeArticle(root: string, slug: string, publishedAt = '2026-06-28') {
  const articleRoot = join(root, 'content/articles', slug);
  mkdirSync(articleRoot, { recursive: true });
  writeFileSync(
    join(articleRoot, 'index.md'),
    `---
title: "Launch Article"
description: "A controlled launch article."
publishedAt: "${publishedAt}"
status: "published"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
series: "AI Factory"
tags: [ai, launch]
channels: [singularity-labs]
coverImage: "/blog/${slug}/images/hero.png"
---

# Launch Article

Body.
`,
  );
  mkdirSync(join(root, 'public/blog', slug, 'images'), { recursive: true });
  writeFileSync(join(root, 'public/blog', slug, 'images/hero.png'), 'fake-png');
}

function writeSocialPackage(
  root: string,
  slug: string,
  options: { stalePath?: boolean } = {},
) {
  const packageRoot = join(root, 'content/distribution/social-packages', slug);
  mkdirSync(packageRoot, { recursive: true });
  const markdownPath = join(packageRoot, 'linkedin.md');
  writeFileSync(
    markdownPath,
    `---
platform: "linkedin"
source_slug: "${slug}"
canonical_url: "https://davidmieloch.com/blog/${slug}"
public_publish_allowed: false
---

# Launch Article / linkedin
`,
  );
  writeFileSync(
    join(packageRoot, 'manifest.json'),
    JSON.stringify(
      {
        schemaVersion: 'social-package-manifest-v1',
        slug,
        title: 'Launch Article',
        canonicalUrl: `https://davidmieloch.com/blog/${slug}`,
        publicPublishingPerformed: false,
        files: [
          {
            platform: 'linkedin',
            filePath: options.stalePath
              ? '/old/worktree/linkedin.md'
              : `content/distribution/social-packages/${slug}/linkedin.md`,
            checksum: 'not-checked-in-this-test',
          },
        ],
      },
      null,
      2,
    ),
  );
}

function writeSocialCalendar(root: string, slug: string) {
  const packagePath = `content/distribution/social-packages/${slug}/linkedin.md`;
  mkdirSync(join(root, 'content/distribution'), { recursive: true });
  writeFileSync(
    join(root, 'content/distribution/social-calendar.json'),
    JSON.stringify(
      {
        schemaVersion: 'social-calendar-v1',
        publicPublishingPerformed: false,
        entries: [
          {
            id: `social:linkedin:${slug}:2026-06-28`,
            articleSlug: slug,
            platform: 'linkedin',
            packagePath,
            publicPublishingAllowed: false,
            safeDefault: 'do-not-post',
            approval: {
              required: true,
              status: 'missing',
            },
          },
        ],
      },
      null,
      2,
    ),
  );
}

describe('content release workflow', () => {
  it('plans the full governed content path before release ladder handoff', () => {
    const config = parseContentReleaseWorkflowConfig({
      appRoot: '/repo',
      slug: 'launch-article',
      generatedAt: '2026-06-28T14:00:00.000Z',
      'release-ladder-receipt': '/tmp/site-release-ladder.json',
    });

    const plan = buildContentReleaseWorkflowPlan(config);

    expect(config.mode).toBe('dry-run');
    expect(plan.steps.map((step) => step.id)).toEqual(CONTENT_RELEASE_WORKFLOW_STEP_IDS);
    expect(plan.commands.assetGate).toBe('pnpm content:pipeline launch:assets launch-article');
    expect(plan.commands.socialPackage).toEqual([
      'pnpm content:pipeline social:package launch-article linkedin',
    ]);
    expect(plan.commands.socialSchedule).toBe(
      'content:release-workflow targeted social-calendar upsert',
    );
    expect(plan.commands.releaseLadder).toBe(
      'pnpm site:release-ladder --slug=launch-article --execute --receipt=/tmp/site-release-ladder.json',
    );
  });

  it('detects stale social package paths before launch', () => {
    const root = tempRoot();
    const slug = 'launch-article';
    writeArticle(root, slug);
    writeSocialPackage(root, slug, { stalePath: true });
    writeSocialCalendar(root, slug);

    const config = parseContentReleaseWorkflowConfig({ appRoot: root, slug });
    const state = collectContentReleaseWorkflowState(config);

    expect(state.summary.status).toBe('blocked');
    expect(state.homepageTeaser).toMatchObject({ ok: true, rank: 1 });
    expect(state.socialPackages.ok).toBe(false);
    expect(state.blockers).toContain(
      'linkedin social package manifest points outside this repo or missing file.',
    );
  });

  it('passes local drift checks when article, homepage, package, and schedule align', () => {
    const root = tempRoot();
    const slug = 'launch-article';
    writeArticle(root, slug);
    writeSocialPackage(root, slug);
    writeSocialCalendar(root, slug);

    const config = parseContentReleaseWorkflowConfig({ appRoot: root, slug });
    const state = collectContentReleaseWorkflowState(config);

    expect(state.summary.status).toBe('ready');
    expect(state.blockers).toEqual([]);
    expect(state.homepageTeaser.ok).toBe(true);
    expect(state.localSurfaces.expectedRoutes).toEqual([
      '/',
      '/blog',
      '/rss.xml',
      '/sitemap.xml',
      '/blog/launch-article',
      '/audio/voice/blog/launch-article.mp3',
    ]);
    expect(state.scheduledPostingChecklist).toMatchObject({
      ok: true,
      safeDefault: 'do-not-post',
      approvalRequired: true,
    });
    expect(state.scheduledPostingChecklist.entries[0].packagePath).toBe(
      'content/distribution/social-packages/launch-article/linkedin.md',
    );
  });

  it('blocks social calendar entries that point at old package paths', () => {
    const root = tempRoot();
    const slug = 'launch-article';
    writeArticle(root, slug);
    writeSocialPackage(root, slug);
    writeSocialCalendar(root, slug);
    writeFileSync(
      join(root, 'content/distribution/social-calendar.json'),
      JSON.stringify(
        {
          schemaVersion: 'social-calendar-v1',
          publicPublishingPerformed: false,
          entries: [
            {
              id: `social:linkedin:${slug}:2026-06-28`,
              articleSlug: slug,
              platform: 'linkedin',
              packagePath: '/old/worktree/linkedin.md',
              publicPublishingAllowed: false,
              safeDefault: 'do-not-post',
              approval: { required: true, status: 'missing' },
            },
          ],
        },
        null,
        2,
      ),
    );

    const config = parseContentReleaseWorkflowConfig({ appRoot: root, slug });
    const state = collectContentReleaseWorkflowState(config);

    expect(state.summary.status).toBe('blocked');
    expect(state.blockers).toContain(
      'linkedin social calendar entry points outside this repo or missing package file.',
    );
  });

  it('records workflow receipts without claiming public social posting', () => {
    const config = parseContentReleaseWorkflowConfig({
      appRoot: '/repo',
      slug: 'launch-article',
      execute: true,
      receipt: '/tmp/content-release-receipt.json',
    });
    const plan = buildContentReleaseWorkflowPlan(config);
    const receipt = buildContentReleaseWorkflowReceipt({
      config,
      plan,
      status: 'passed',
      state: {
        summary: { status: 'ready' },
        blockers: [],
      },
    });

    expect(receipt.publicPublishingPerformed).toBe(false);
    expect(receipt.socialPostingPerformed).toBe(false);
    expect(receipt.observation).toMatchObject({
      claim:
        'content release workflow reconciled canonical article, assets, homepage teaser, social checklist, schedule, and release ladder handoff',
      status: 'PASS',
    });
  });

  it('keeps generated workflow receipts outside the repo by default', () => {
    const writeConfig = parseContentReleaseWorkflowConfig({
      appRoot: '/repo',
      slug: 'launch-article',
      write: true,
      generatedAt: '2026-06-28T14:00:00.000Z',
    });
    const config = parseContentReleaseWorkflowConfig({
      appRoot: '/repo',
      slug: 'launch-article',
      execute: true,
      generatedAt: '2026-06-28T14:00:00.000Z',
    });

    expect(writeConfig.receiptPath).toContain('content-release-workflow');
    expect(writeConfig.receiptPath.startsWith('/repo/')).toBe(false);
    expect(config.receiptPath).toContain('content-release-workflow');
    expect(config.releaseLadderReceiptPath).toContain('site-release-ladder');
    expect(config.receiptPath.startsWith('/repo/')).toBe(false);
    expect(config.releaseLadderReceiptPath.startsWith('/repo/')).toBe(false);
  });
});
