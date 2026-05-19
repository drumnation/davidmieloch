import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const METRICS_SCHEMA_VERSION = 'content-metrics-v1';

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function emptyMetrics() {
  return {
    schemaVersion: METRICS_SCHEMA_VERSION,
    records: {},
  };
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function listPackageManifests(packagesRoot) {
  if (!fs.existsSync(packagesRoot)) return [];
  return fs
    .readdirSync(packagesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesRoot, entry.name, 'manifest.json'))
    .filter((manifestPath) => fs.existsSync(manifestPath))
    .map((manifestPath) => JSON.parse(fs.readFileSync(manifestPath, 'utf8')));
}

function metricRecordCount(metrics) {
  return Object.values(metrics.records ?? {}).reduce((count, articleRecord) => {
    return count + Object.keys(articleRecord.platforms ?? {}).length;
  }, 0);
}

function increment(platforms, platform, field) {
  platforms[platform] ??= {
    packages: 0,
    publishedReceipts: 0,
    metricRecords: 0,
    missingMetricsForPublished: 0,
  };
  platforms[platform][field] += 1;
}

export function readContentMetrics(metricsPath) {
  return readJson(metricsPath, emptyMetrics());
}

export function recordContentMetric({
  metricsPath,
  slug,
  platform,
  url,
  source = 'manual',
  observedAt = new Date().toISOString(),
  metrics = {},
  notes = '',
}) {
  if (!slug || !platform || !url) {
    throw new Error('recordContentMetric requires slug, platform, and url.');
  }

  const contentMetrics = readContentMetrics(metricsPath);
  contentMetrics.records[slug] ??= { platforms: {} };
  contentMetrics.records[slug].platforms[platform] = {
    observedAt,
    url,
    source,
    metrics: {
      views: Number(metrics.views ?? metrics.impressions ?? metrics.reads ?? metrics.page_views_count ?? metrics.opens ?? 0),
      clicks: Number(metrics.clicks ?? 0),
      reactions: Number(metrics.reactions ?? metrics.likes ?? metrics.fans ?? metrics.public_reactions_count ?? metrics.upvotes ?? 0),
      comments: Number(metrics.comments ?? metrics.comments_count ?? 0),
      shares: Number(metrics.shares ?? 0),
      subscribers: Number(metrics.subscribers ?? metrics.followers ?? 0),
    },
    raw: metrics,
    notes,
  };
  contentMetrics.updatedAt = observedAt;
  writeJson(metricsPath, contentMetrics);
  return contentMetrics.records[slug].platforms[platform];
}

function policyPlatform(policy, platform) {
  return policy.platforms?.[platform] ?? {
    displayName: platform,
    metrics: {
      source: 'manual',
      fields: ['views', 'clicks', 'reactions', 'comments'],
    },
  };
}

export function contentMetricsChecklist({ ledgerPath, metricsPath, policyPath }) {
  const ledger = readJson(ledgerPath, { articles: {} });
  const metrics = readContentMetrics(metricsPath);
  const policy = readJson(policyPath, { platforms: {} });
  const platforms = {};
  const captureQueue = [];

  for (const [slug, article] of Object.entries(ledger.articles ?? {})) {
    for (const [platform, receipt] of Object.entries(article.platforms ?? {})) {
      const platformPolicy = policyPlatform(policy, platform);
      platforms[platform] ??= {
        displayName: platformPolicy.displayName ?? platform,
        source: platformPolicy.metrics?.source ?? 'manual',
        fields: platformPolicy.metrics?.fields ?? [],
        publishedReceipts: 0,
        metricRecords: 0,
        missingMetricRecords: 0,
      };

      const hasMetrics = Boolean(metrics.records?.[slug]?.platforms?.[platform]);
      if (hasMetrics) platforms[platform].metricRecords += 1;
      if (receipt?.status !== 'published') continue;

      platforms[platform].publishedReceipts += 1;
      if (hasMetrics) continue;

      platforms[platform].missingMetricRecords += 1;
      const fields = platformPolicy.metrics?.fields ?? [];
      captureQueue.push({
        slug,
        title: article.title,
        platform,
        displayName: platformPolicy.displayName ?? platform,
        url: receipt.url,
        source: platformPolicy.metrics?.source ?? 'manual',
        fields,
        command: [
          'pnpm content:pipeline metrics:record',
          slug,
          platform,
          `--url=${receipt.url}`,
          ...fields.map((field) => `--${field}=0`),
        ].join(' '),
      });
    }
  }

  return {
    schemaVersion: METRICS_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    publicPublishingPerformed: false,
    status: captureQueue.length === 0 ? 'PASS' : 'DEGRADED',
    platforms,
    captureQueue,
    observation: {
      claim: 'published platform receipts have a concrete metrics capture checklist',
      status: captureQueue.length === 0 ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'syndication-policy metric fields',
        'content-metrics.json records',
        'ROM heartbeat',
      ],
    },
  };
}

export function contentMetricsReport({ ledgerPath, packagesRoot, metricsPath }) {
  const ledger = readJson(ledgerPath, { articles: {} });
  const metrics = readContentMetrics(metricsPath);
  const manifests = listPackageManifests(packagesRoot);
  const platforms = {};
  const articles = {};

  for (const manifest of manifests) {
    articles[manifest.slug] ??= {
      canonicalUrl: manifest.canonicalUrl,
      packages: [],
      published: [],
      metrics: [],
      missingMetricsForPublished: [],
    };

    for (const file of manifest.files ?? []) {
      articles[manifest.slug].packages.push(file.platform);
      increment(platforms, file.platform, 'packages');
    }
  }

  let publishedReceipts = 0;
  let missingMetricsForPublished = 0;
  for (const [slug, article] of Object.entries(ledger.articles ?? {})) {
    articles[slug] ??= {
      canonicalUrl: article.canonicalUrl,
      packages: [],
      published: [],
      metrics: [],
      missingMetricsForPublished: [],
    };

    for (const [platform, record] of Object.entries(article.platforms ?? {})) {
      if (record?.status !== 'published') continue;
      publishedReceipts += 1;
      articles[slug].published.push(platform);
      increment(platforms, platform, 'publishedReceipts');

      const hasMetric = Boolean(metrics.records?.[slug]?.platforms?.[platform]);
      if (!hasMetric) {
        missingMetricsForPublished += 1;
        articles[slug].missingMetricsForPublished.push(platform);
        increment(platforms, platform, 'missingMetricsForPublished');
      }
    }
  }

  for (const [slug, articleMetrics] of Object.entries(metrics.records ?? {})) {
    articles[slug] ??= {
      canonicalUrl: ledger.articles?.[slug]?.canonicalUrl ?? null,
      packages: [],
      published: [],
      metrics: [],
      missingMetricsForPublished: [],
    };
    for (const platform of Object.keys(articleMetrics.platforms ?? {})) {
      articles[slug].metrics.push(platform);
      increment(platforms, platform, 'metricRecords');
    }
  }

  const packageFiles = manifests.reduce((count, manifest) => count + (manifest.files?.length ?? 0), 0);
  const metricRecords = metricRecordCount(metrics);
  const status = publishedReceipts === 0 || missingMetricsForPublished === 0 ? 'PASS' : 'DEGRADED';
  const metricsChecksum = sha256(JSON.stringify(metrics));

  return {
    schemaVersion: METRICS_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    summary: {
      packagedArticles: manifests.length,
      packageFiles,
      publishedReceipts,
      metricRecords,
      missingMetricsForPublished,
    },
    platforms,
    articles,
    observation: {
      claim: 'content distribution metrics are reconciled against package manifests and platform receipts',
      status,
      checksum: metricsChecksum,
      fallbackChain: [
        'content-metrics.json checksum',
        'package manifest and ledger reconciliation',
        'ROM heartbeat',
      ],
    },
  };
}
