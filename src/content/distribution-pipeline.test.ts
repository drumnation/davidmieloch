import { spawnSync } from 'child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { afterEach, describe, expect, it } from 'vitest';

import {
  generatePlatformPackages,
  loadSyndicationPolicy,
} from '../../scripts/lib/platform-packages.mjs';
import { buildDistributionQueue } from '../../scripts/lib/distribution-queue.mjs';
import {
  contentMetricsChecklist,
  contentMetricsReport,
  recordContentMetric,
} from '../../scripts/lib/content-metrics.mjs';

const roots: string[] = [];

afterEach(() => {
  for (const root of roots) {
    rmSync(root, { recursive: true, force: true });
  }
  roots.length = 0;
});

function tempRoot() {
  const root = mkdtempSync(join(tmpdir(), 'content-distribution-'));
  roots.push(root);
  return root;
}

function article() {
  return {
    slug: 'the-factory',
    meta: {
      title: 'The Factory',
      description: 'Factory thesis',
      canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
      tags: ['ai', 'factory'],
    },
    body: '## The Productivity Trap\n\nFactories changed when managers redesigned the line around the new power source.',
  };
}

function writeDraftCommandFixture(root: string, platform: 'devto' | 'hashnode') {
  const slug = 'package-only-article';
  mkdirSync(join(root, 'content/articles', slug), { recursive: true });
  mkdirSync(join(root, 'content/distribution/packages', slug), { recursive: true });
  writeFileSync(
    join(root, 'content/articles', slug, 'index.md'),
    `---
title: "Article Title"
description: "Article description"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
tags: ["ai", "pipeline", "agents", "factory", "april-fools"]
---

Canonical body should not be posted when a package exists.
`,
  );
  writeFileSync(
    join(root, 'content/distribution/packages', slug, `${platform}.md`),
    `---
title: "Packaged Title"
description: "Packaged description"
canonical_url: "https://davidmieloch.com/blog/${slug}"
tags: ["distribution", "draft"]
---

Packaged ${platform} body.
`,
  );
  return slug;
}

function writeFetchStub(root: string, capturePath: string) {
  const stubPath = join(root, 'fetch-stub.mjs');
  writeFileSync(
    stubPath,
    `import { writeFileSync } from 'node:fs';

globalThis.fetch = async (url, options = {}) => {
  const body = options.body ? JSON.parse(options.body) : null;
  writeFileSync(${JSON.stringify(capturePath)}, JSON.stringify({ url: String(url), body }, null, 2));

  if (String(url).includes('dev.to')) {
    return {
      ok: true,
      status: 201,
      text: async () => JSON.stringify({
        id: 123,
        title: body.article.title,
        published: body.article.published,
        url: 'https://dev.to/dashboard'
      })
    };
  }

  const hashnodePayload = {
    data: {
      createDraft: {
        draft: {
          id: 'draft-123',
          slug: 'package-only-article',
          title: body.variables.input.title,
          canonicalUrl: body.variables.input.originalArticleURL
        }
      }
    }
  };

  return {
    ok: true,
    status: 200,
    json: async () => hashnodePayload,
    text: async () => JSON.stringify(hashnodePayload)
  };
};
`,
  );
  return stubPath;
}

function runDraftCommand(root: string, command: string, slug: string, capturePath: string, extraArgs: string[] = []) {
  const stubPath = writeFetchStub(root, capturePath);
  return spawnSync(
    process.execPath,
    ['--import', stubPath, join(process.cwd(), 'scripts/content-pipeline.mjs'), command, slug, ...extraArgs],
    {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        DEVTO_API_KEY: 'dev-token',
        HASHNODE_TOKEN: 'hash-token',
        HASHNODE_PUBLICATION_ID: 'publication-123',
      },
    },
  );
}

function writeLedgerFixture(root: string) {
  mkdirSync(join(root, 'content/distribution'), { recursive: true });
  writeFileSync(
    join(root, 'content/distribution/platform-ledger.json'),
    JSON.stringify({
      updatedAt: '2026-05-18',
      articles: {
        'the-factory': {
          title: 'The Factory',
          canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
          platforms: {
            davidmieloch: { status: 'ready-local', url: 'https://davidmieloch.com/blog/the-factory' },
            devto: { status: 'not-started', url: '' },
            hashnode: { status: 'not-started', url: '' },
            hackernoon: { status: 'not-started', url: '' },
            medium: { status: 'published', url: 'https://medium.com/@davidmieloch/the-factory' },
          },
        },
      },
    }, null, 2),
  );
}

function writeLaunchCalendarFixture(root: string) {
  mkdirSync(join(root, 'content/distribution'), { recursive: true });
  writeFileSync(
    join(root, 'content/distribution/launch-calendar.json'),
    JSON.stringify({
      schemaVersion: 'launch-calendar-v1',
      updatedAt: '2026-05-18',
      launches: [
        {
          id: 'launch-1',
          title: 'Due launch',
          sourcePlatform: 'linkedin',
          scheduledAt: '2026-05-19T11:00:00-04:00',
          articleSlug: null,
          pendingSource: { status: 'awaiting-source-url' },
          targetPlatforms: [{ platform: 'devto', approvalMode: 'draft-only' }],
          approvalPolicy: {
            requiresDavidApproval: true,
            publicPublishAllowed: false,
          },
        },
        {
          id: 'launch-2',
          title: 'Future launch',
          sourcePlatform: 'linkedin',
          scheduledAt: '2026-05-20T11:00:00-04:00',
          articleSlug: 'the-factory',
          targetPlatforms: [{ platform: 'devto', approvalMode: 'draft-only' }],
          approvalPolicy: {
            requiresDavidApproval: true,
            publicPublishAllowed: false,
          },
        },
      ],
    }, null, 2),
  );
}

function runPipelineCommand(root: string, args: string[]) {
  return spawnSync(
    process.execPath,
    [join(process.cwd(), 'scripts/content-pipeline.mjs'), ...args],
    {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        CONTENT_ROOT: join(root, 'content'),
        DEVTO_API_KEY: '',
        HASHNODE_TOKEN: '',
        HASHNODE_API_KEY: '',
        HASHNODE_PUBLICATION_ID: '',
      },
    },
  );
}

describe('platform package generation', () => {
  it('creates policy-driven full mirrors with canonical and tracked URLs', () => {
    const root = tempRoot();
    const policy = loadSyndicationPolicy();

    generatePlatformPackages({
      article: article(),
      outputRoot: root,
      platforms: ['medium'],
      policy,
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    const markdown = readFileSync(join(root, 'the-factory', 'medium.md'), 'utf8');
    const manifest = JSON.parse(readFileSync(join(root, 'the-factory', 'manifest.json'), 'utf8'));

    expect(markdown).toContain('post_mode: "full-mirror"');
    expect(markdown).toContain('canonical_url: "https://davidmieloch.com/blog/the-factory"');
    expect(markdown).toContain('tracked_url: "https://davidmieloch.com/blog/the-factory?utm_source=medium&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-factory"');
    expect(markdown).toContain('## The Productivity Trap');
    expect(markdown).toContain('Read the canonical version: https://davidmieloch.com/blog/the-factory?utm_source=medium');
    expect(manifest.policyVersion).toBe(policy.version);
    expect(manifest.files[0]).toMatchObject({
      platform: 'medium',
      postMode: 'full-mirror',
      canonicalSupport: 'supported',
      approvalRequired: true,
    });
  });

  it('creates discussion-first Reddit packages instead of duplicate mirrors', () => {
    const root = tempRoot();

    generatePlatformPackages({
      article: article(),
      outputRoot: root,
      platforms: ['reddit'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    const markdown = readFileSync(join(root, 'the-factory', 'reddit.md'), 'utf8');

    expect(markdown).toContain('post_mode: "discussion"');
    expect(markdown).toContain('Suggested discussion shape, not a blind cross-post');
    expect(markdown).toContain('Do not post the same package to multiple subreddits unchanged.');
    expect(markdown).not.toContain('## The Productivity Trap');
  });
});

describe('content metrics observability', () => {
  it('records metrics and reports coverage against package manifests and ledger receipts', () => {
    const root = tempRoot();
    const packagesRoot = join(root, 'packages');
    const ledgerPath = join(root, 'platform-ledger.json');
    const metricsPath = join(root, 'content-metrics.json');

    generatePlatformPackages({
      article: article(),
      outputRoot: packagesRoot,
      platforms: ['medium', 'reddit'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    writeFileSync(
      ledgerPath,
      JSON.stringify({
        articles: {
          'the-factory': {
            canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
            platforms: {
              medium: {
                status: 'published',
                url: 'https://medium.com/@davidmieloch/the-factory',
              },
              reddit: {
                status: 'draft',
              },
            },
          },
        },
      }),
    );

    recordContentMetric({
      metricsPath,
      slug: 'the-factory',
      platform: 'medium',
      url: 'https://medium.com/@davidmieloch/the-factory',
      source: 'manual',
      observedAt: '2026-05-18T12:00:00.000Z',
      metrics: {
        views: 120,
        clicks: 9,
        reactions: 4,
        comments: 1,
        shares: 2,
        subscribers: 0,
      },
    });

    const report = contentMetricsReport({
      ledgerPath,
      packagesRoot,
      metricsPath,
    });
    const platforms = report.platforms as Record<string, {
      packages: number;
      publishedReceipts: number;
      metricRecords: number;
      missingMetricsForPublished: number;
    }>;

    expect(report.summary).toMatchObject({
      packagedArticles: 1,
      packageFiles: 2,
      publishedReceipts: 1,
      metricRecords: 1,
      missingMetricsForPublished: 0,
    });
    expect(platforms.medium).toMatchObject({
      packages: 1,
      publishedReceipts: 1,
      metricRecords: 1,
      missingMetricsForPublished: 0,
    });
    expect(report.observation).toMatchObject({
      claim: 'content distribution metrics are reconciled against package manifests and platform receipts',
      status: 'PASS',
      fallbackChain: [
        'content-metrics.json checksum',
        'package manifest and ledger reconciliation',
        'ROM heartbeat',
      ],
    });
  });

  it('builds a platform-specific metrics capture queue for published receipts without metrics', () => {
    const root = tempRoot();
    const ledgerPath = join(root, 'platform-ledger.json');
    const metricsPath = join(root, 'content-metrics.json');
    const policyPath = join(root, 'syndication-policy.json');

    writeFileSync(
      ledgerPath,
      JSON.stringify({
        articles: {
          'the-factory': {
            title: 'The Factory',
            platforms: {
              devto: {
                status: 'published',
                url: 'https://dev.to/david/the-factory',
              },
              medium: {
                status: 'draft',
                url: 'https://medium.com/@david/the-factory',
              },
            },
          },
        },
      }),
    );
    writeFileSync(
      policyPath,
      JSON.stringify({
        platforms: {
          devto: {
            displayName: 'DEV',
            metrics: {
              source: 'api-or-manual',
              fields: ['page_views_count', 'public_reactions_count', 'comments_count'],
            },
          },
        },
      }),
    );

    const checklist = contentMetricsChecklist({ ledgerPath, metricsPath, policyPath });

    expect(checklist.status).toBe('DEGRADED');
    expect(checklist.captureQueue).toEqual([
      {
        slug: 'the-factory',
        title: 'The Factory',
        platform: 'devto',
        displayName: 'DEV',
        url: 'https://dev.to/david/the-factory',
        source: 'api-or-manual',
        fields: ['page_views_count', 'public_reactions_count', 'comments_count'],
        command: 'pnpm content:pipeline metrics:record the-factory devto --url=https://dev.to/david/the-factory --page_views_count=0 --public_reactions_count=0 --comments_count=0',
      },
    ]);
    const platforms = checklist.platforms as Record<string, {
      publishedReceipts: number;
      missingMetricRecords: number;
    }>;
    expect(platforms.devto).toMatchObject({
      publishedReceipts: 1,
      missingMetricRecords: 1,
    });
  });

  it('normalizes platform-native metric aliases into comparable counts', () => {
    const root = tempRoot();
    const metricsPath = join(root, 'content-metrics.json');

    const record = recordContentMetric({
      metricsPath,
      slug: 'the-factory',
      platform: 'devto',
      url: 'https://dev.to/david/the-factory',
      metrics: {
        page_views_count: 42,
        public_reactions_count: 7,
        comments_count: 3,
      },
    });

    expect(record.metrics).toMatchObject({
      views: 42,
      reactions: 7,
      comments: 3,
    });
    expect(record.raw).toMatchObject({
      page_views_count: 42,
      public_reactions_count: 7,
      comments_count: 3,
    });
  });
});

describe('distribution queue planning', () => {
  it('derives approval-aware next actions from ledger, packages, and readiness', () => {
    const root = tempRoot();
    const packagesRoot = join(root, 'packages');
    const ledger = {
      articles: {
        'the-factory': {
          title: 'The Factory',
          series: 'AI Factory',
          platforms: {
            devto: { status: 'not-started', url: '' },
            hashnode: { status: 'not-started', url: '' },
            medium: { status: 'not-started', url: '' },
            reddit: { status: 'manual-package-required', url: '' },
            hackernoon: { status: 'draft', url: 'https://app.hackernoon.com/mobile/draft' },
            linkedin: { status: 'source', url: 'https://linkedin.com/pulse/the-factory' },
          },
        },
      },
    };
    mkdirSync(join(packagesRoot, 'the-factory'), { recursive: true });
    writeFileSync(join(packagesRoot, 'the-factory', 'devto.md'), 'dev package');
    writeFileSync(join(packagesRoot, 'the-factory', 'medium.md'), 'medium package');
    const policy = loadSyndicationPolicy();

    const queue = buildDistributionQueue({
      ledger,
      policy,
      packagesRoot,
      configured: {
        devto: true,
        hashnode: true,
        hashnodePublication: false,
      },
      canonicalReady: false,
      generatedAt: '2026-05-19T00:00:00.000Z',
    });

    expect(queue.publicPublishingPerformed).toBe(false);
    expect(queue.summary).toMatchObject({
      totalActions: 5,
      unblockedActions: 2,
      blockedActions: 3,
      lanes: {
        'factory-front-door': {
          total: 5,
          blocked: 3,
          unblocked: 2,
        },
      },
    });
    expect(queue.recommendedNext.map((action) => action.action)).toEqual([
      'review-existing-draft',
      'create-api-draft',
    ]);
    expect(queue.actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          platform: 'devto',
          action: 'create-api-draft',
          blocked: false,
          releaseLane: 'factory-front-door',
          nextCommand: 'pnpm content:pipeline draft:create the-factory devto',
        }),
        expect.objectContaining({
          platform: 'medium',
          action: 'blocked-until-ready',
          blocked: true,
          blocker: 'Canonical davidmieloch.com blog URLs are not verified.',
        }),
        expect.objectContaining({
          platform: 'hashnode',
          action: 'blocked-until-ready',
          blocked: true,
          blocker: 'Missing working Hashnode token/publication id pair.',
        }),
      ]),
    );
    expect(queue.observation).toMatchObject({
      claim: 'content distribution next actions are derived from ledger, packages, policy, and readiness',
      status: 'DEGRADED',
    });
  });

  it('pushes legacy backfill behind the current factory brand lane', () => {
    const root = tempRoot();
    const ledger = {
      articles: {
        'legacy-post': {
          title: 'Legacy Post',
          series: 'Legacy Engineering Notes',
          source: { platform: 'medium' },
          platforms: {
            hackernoon: { status: 'not-started', url: '' },
          },
        },
        'factory-post': {
          title: 'Factory Post',
          series: 'AI Factory',
          source: { platform: 'linkedin' },
          platforms: {
            hackernoon: { status: 'not-started', url: '' },
          },
        },
      },
    };

    const queue = buildDistributionQueue({
      ledger,
      policy: loadSyndicationPolicy(),
      packagesRoot: root,
      canonicalReady: true,
    });

    expect(queue.actions.map((action) => action.slug)).toEqual(['factory-post', 'legacy-post']);
    expect(queue.actions[0]).toMatchObject({
      releaseLane: 'factory-front-door',
      priority: 40,
    });
    expect(queue.actions[1]).toMatchObject({
      releaseLane: 'legacy-backfill',
      priority: 75,
    });
  });
});

describe('platform draft commands', () => {
  it('creates DEV drafts from generated package markdown when article variant is absent', () => {
    const root = tempRoot();
    const capturePath = join(root, 'devto-capture.json');
    const slug = writeDraftCommandFixture(root, 'devto');

    const result = runDraftCommand(root, 'devto:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.article).toMatchObject({
      title: 'Packaged Title',
      body_markdown: 'Packaged devto body.',
      published: false,
      description: 'Packaged description',
      canonical_url: `https://davidmieloch.com/blog/${slug}`,
    });
    expect(request.body.article.tags).toEqual(['distribution', 'draft']);
  });

  it('limits DEV fallback article tags to four when the package has no tags', () => {
    const root = tempRoot();
    const capturePath = join(root, 'devto-capture.json');
    const slug = writeDraftCommandFixture(root, 'devto');
    writeFileSync(
      join(root, 'content/distribution/packages', slug, 'devto.md'),
      `---
title: "Packaged Title"
description: "Packaged description"
canonical_url: "https://davidmieloch.com/blog/${slug}"
---

Packaged devto body.
`,
    );

    const result = runDraftCommand(root, 'devto:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.article.tags).toEqual(['ai', 'pipeline', 'agents', 'factory']);
  });

  it('normalizes DEV tags to alphanumeric values', () => {
    const root = tempRoot();
    const capturePath = join(root, 'devto-capture.json');
    const slug = writeDraftCommandFixture(root, 'devto');
    writeFileSync(
      join(root, 'content/distribution/packages', slug, 'devto.md'),
      `---
title: "Packaged Title"
description: "Packaged description"
canonical_url: "https://davidmieloch.com/blog/${slug}"
tags: ["april-fools", "AI", "software-factory", "ai"]
---

Packaged devto body.
`,
    );

    const result = runDraftCommand(root, 'devto:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.article.tags).toEqual(['aprilfools', 'ai', 'softwarefactory']);
  });

  it('creates delisted Hashnode drafts from generated package markdown when article variant is absent', () => {
    const root = tempRoot();
    const capturePath = join(root, 'hashnode-capture.json');
    const slug = writeDraftCommandFixture(root, 'hashnode');

    const result = runDraftCommand(root, 'hashnode:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.variables.input).toMatchObject({
      title: 'Packaged Title',
      subtitle: 'Packaged description',
      publicationId: 'publication-123',
      contentMarkdown: 'Packaged hashnode body.',
      originalArticleURL: `https://davidmieloch.com/blog/${slug}`,
      settings: {
        enableTableOfContent: true,
        activateNewsletter: false,
        delist: true,
      },
    });
    expect(request.body.variables.input.tags).toEqual([
      { name: 'distribution', slug: 'distribution' },
      { name: 'draft', slug: 'draft' },
    ]);
  });
});

describe('platform readiness governance', () => {
  it('records manual platform receipts without patching the ledger by hand', () => {
    const root = tempRoot();
    writeLedgerFixture(root);

    const result = runPipelineCommand(root, [
      'receipt:record',
      'the-factory',
      'hackernoon',
      '--status=draft',
      '--url=https://app.hackernoon.com/mobile/draft-123',
      '--notes=Saved draft shell; not submitted.',
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      slug: 'the-factory',
      platform: 'hackernoon',
      receipt: {
        status: 'draft',
        url: 'https://app.hackernoon.com/mobile/draft-123',
        notes: 'Saved draft shell; not submitted.',
      },
    });

    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    expect(ledger.articles['the-factory'].platforms.hackernoon).toMatchObject({
      status: 'draft',
      url: 'https://app.hackernoon.com/mobile/draft-123',
      notes: 'Saved draft shell; not submitted.',
    });
  });

  it('reports platform readiness without requiring network access', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    generatePlatformPackages({
      article: article(),
      outputRoot: join(root, 'content/distribution/packages'),
      platforms: ['medium', 'devto', 'hackernoon'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    const result = runPipelineCommand(root, ['readiness', '--skip-network']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      purpose: 'content distribution platform readiness',
      publicPublishingPerformed: false,
      probes: {
        canonical: { status: 'SKIPPED' },
      },
      packageCoverage: {
        packagedArticles: 1,
        platformPackageCounts: {
          medium: 1,
          devto: 1,
          hackernoon: 1,
        },
      },
    });
    expect(payload.platforms.linkedin.status).toBe('source-only');
    expect(payload.platforms.reddit.status).toBe('approval-gated');
  });

  it('reports due launches and source blockers from the launch calendar', () => {
    const root = tempRoot();
    writeLaunchCalendarFixture(root);

    const result = runPipelineCommand(root, [
      'launch:due',
      '--now=2026-05-19T12:00:00-04:00',
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.due).toHaveLength(1);
    expect(payload.due[0]).toMatchObject({
      id: 'launch-1',
      due: true,
      blockers: ['missing articleSlug', 'awaiting-source-url', 'public publish disabled'],
    });
    expect(payload.pending[0]).toMatchObject({
      id: 'launch-2',
      due: false,
    });
  });

  it('skips manual draft creation targets and explains the handoff', () => {
    const root = tempRoot();
    writeLedgerFixture(root);

    const result = runPipelineCommand(root, [
      'draft:create',
      'the-factory',
      'hackernoon',
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      slug: 'the-factory',
      platform: 'hackernoon',
      skipped: true,
      reason: 'hackernoon is a browser/manual workflow; use receipt:record after manual draft setup.',
    });
  });

  it('reports missing receipts and missing metrics as observable state', () => {
    const root = tempRoot();
    writeLedgerFixture(root);

    const result = runPipelineCommand(root, ['receipts:report']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.status).toBe('DEGRADED');
    expect(payload.missingReceipts).toEqual(
      expect.arrayContaining([
        { slug: 'the-factory', platform: 'devto', status: 'not-started' },
        { slug: 'the-factory', platform: 'hackernoon', status: 'not-started' },
      ]),
    );
    expect(payload.missingMetrics).toEqual([
      { slug: 'the-factory', platform: 'medium', url: 'https://medium.com/@davidmieloch/the-factory' },
    ]);
    expect(payload.observation).toMatchObject({
      claim: 'platform receipts and published metrics are observable from the ledger',
      status: 'DEGRADED',
    });
  });

  it('prints a metrics capture checklist from policy fields', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    writeFileSync(
      join(root, 'content/distribution/syndication-policy.json'),
      JSON.stringify({
        platforms: {
          medium: {
            displayName: 'Medium',
            metrics: {
              source: 'manual',
              fields: ['views', 'reads', 'fans', 'clicks'],
            },
          },
        },
      }),
    );

    const result = runPipelineCommand(root, ['metrics:checklist']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.captureQueue).toEqual([
      expect.objectContaining({
        slug: 'the-factory',
        platform: 'medium',
        displayName: 'Medium',
        fields: ['views', 'reads', 'fans', 'clicks'],
        command: 'pnpm content:pipeline metrics:record the-factory medium --url=https://medium.com/@davidmieloch/the-factory --views=0 --reads=0 --fans=0 --clicks=0',
      }),
    ]);
    expect(payload.observation).toMatchObject({
      claim: 'published platform receipts have a concrete metrics capture checklist',
      status: 'DEGRADED',
    });
  });

  it('prints an approval-aware distribution queue without network access', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    generatePlatformPackages({
      article: article(),
      outputRoot: join(root, 'content/distribution/packages'),
      platforms: ['devto', 'medium', 'hackernoon'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });
    writeFileSync(
      join(root, 'content/distribution/syndication-policy.json'),
      JSON.stringify(loadSyndicationPolicy()),
    );

    const result = runPipelineCommand(root, ['queue', '--skip-network']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.summary).toMatchObject({
      totalActions: 3,
      blockedActions: 2,
    });
    expect(payload.actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          platform: 'devto',
          action: 'blocked-until-ready',
          blocker: 'Missing DEVTO_API_KEY.',
        }),
        expect.objectContaining({
          platform: 'hackernoon',
          action: 'prepare-manual-draft',
          blocked: false,
        }),
      ]),
    );
    expect(payload.observation).toMatchObject({
      status: 'DEGRADED',
    });
  });
});
