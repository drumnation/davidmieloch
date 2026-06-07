import fs from 'node:fs';

import {
  approvalGateLabels,
  approvalStatusFor,
} from './launch-approval-ledger.mjs';

function bySlug(items = []) {
  return new Map(items.map((item) => [item.slug ?? item.articleSlug, item]));
}

function approvalGate(approvalLedger, slug, label) {
  const approval = approvalStatusFor(approvalLedger, slug, label);
  return {
    label,
    status: approval?.status ?? 'missing',
    requiredFrom: 'David',
    approvedBy: approval?.approvedBy ?? null,
    approvedAt: approval?.approvedAt ?? null,
    note: approval?.note ?? '',
  };
}

export function buildLaunchApprovalPacket({
  launchPlan,
  siteReleaseCalendar,
  socialCalendar,
  socialTeasers,
  approvalLedger = {},
  imageManifests = {},
  generatedAt = new Date().toISOString(),
}) {
  const siteEntries = bySlug(siteReleaseCalendar.entries);
  const socialEntries = bySlug(socialCalendar.entries);
  const teaserEntries = socialTeasers.teasers ?? {};

  const articles = (launchPlan.articles ?? []).map((article) => {
    const siteEntry = siteEntries.get(article.slug) ?? {};
    const socialEntry = socialEntries.get(article.slug) ?? {};
    const imageManifest = imageManifests[article.slug] ?? {};
    const heroAsset = (imageManifest.assets ?? []).find((asset) => asset.id === 'hero-linkedin')
      ?? (imageManifest.assets ?? [])[0]
      ?? null;
    const teaser = teaserEntries[article.slug]?.linkedin ?? null;
    const gates = approvalGateLabels().map((gate) => (
      approvalGate(approvalLedger, article.slug, gate)
    ));

    return {
      slug: article.slug,
      title: article.title,
      series: launchPlan.series ?? article.series ?? null,
      releaseTarget: siteEntry.plannedReleaseAt ?? article.releaseTarget ?? null,
      website: {
        status: siteEntry.website?.status ?? article.contentStatus ?? 'unknown',
        canonicalUrl: siteEntry.website?.canonicalUrl ?? null,
        draftPreviewUrl: `/draft-lab/articles/${article.slug}`,
        markdownPath: siteEntry.website?.markdownPath ?? null,
      },
      heroImage: {
        status: article.imageStatus ?? imageManifest.approval?.status ?? 'unknown',
        publicPath: article.coverImage ?? heroAsset?.publicPath ?? null,
        sourcePath: heroAsset?.sourcePath ?? null,
        checksumSha256: article.checksumSha256 ?? heroAsset?.checksumSha256 ?? null,
        caption: article.caption ?? heroAsset?.caption ?? null,
        manifestPath: article.imageManifest ?? null,
      },
      linkedinReveal: {
        status: socialEntry.status ?? 'missing',
        scheduledAt: socialEntry.scheduledAt ?? null,
        packagePath: socialEntry.packagePath ?? null,
        checksum: socialEntry.checksum ?? null,
        postizChannelStatus: socialEntry.postizChannelStatus ?? null,
        teaser,
      },
      gates,
      blocked: Boolean(article.blocker || socialEntry.blocked || !teaser),
      blocker: article.blocker ?? socialEntry.blocker ?? (!teaser ? 'Missing LinkedIn reveal teaser.' : null),
      nextAction: article.nextAction ?? 'David approval.',
    };
  });

  return {
    schemaVersion: 'launch-approval-packet-v1',
    generatedAt,
    publicPublishingPerformed: false,
    safeDefault: 'do-not-publish',
    decisionSeam: launchPlan.decisionSeam ?? {
      name: 'launch-approval',
      actor: 'David',
      safeDefault: 'do-not-publish',
    },
    summary: {
      articles: articles.length,
      blocked: articles.filter((article) => article.blocked).length,
      readyForDavidReview: articles.filter((article) => !article.blocked).length,
      approvalGatesPerArticle: articles[0]?.gates.length ?? 0,
      fullyApproved: articles.filter((article) => (
        article.gates.every((gate) => gate.status === 'approved')
      )).length,
    },
    articles,
    observation: {
      claim: 'Launch approval packet reconciles article, image, website, social, and approval state',
      status: articles.every((article) => !article.blocked) ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'launch approval packet',
        'launch plan and calendars',
        'ROM heartbeat',
      ],
    },
  };
}

export function readImageManifests(articles = []) {
  const manifests = {};
  for (const article of articles) {
    if (!article.imageManifest || !fs.existsSync(article.imageManifest)) continue;
    manifests[article.slug] = JSON.parse(fs.readFileSync(article.imageManifest, 'utf8'));
  }
  return manifests;
}
