import { spawnSync } from 'child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { afterEach, describe, expect, it } from 'vitest';

import {
  generatePlatformPackages,
  loadSyndicationPolicy,
} from '../../scripts/lib/platform-packages.mjs';
import {
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

  return {
    ok: true,
    status: 200,
    json: async () => ({
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
    })
  };
};
`,
  );
  return stubPath;
}

function runDraftCommand(root: string, command: string, slug: string, capturePath: string) {
  const stubPath = writeFetchStub(root, capturePath);
  return spawnSync(
    process.execPath,
    ['--import', stubPath, join(process.cwd(), 'scripts/content-pipeline.mjs'), command, slug],
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
