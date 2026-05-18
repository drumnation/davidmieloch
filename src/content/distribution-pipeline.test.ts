import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
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
