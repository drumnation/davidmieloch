import type { ContentOpsInventoryItem, ContentOpsSnapshot } from './types';

const inventory: ContentOpsInventoryItem[] = [
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
    paths: [
      {
        path: 'content/articles/the-ai-bill-you-cant-predict/index.md',
        exists: true,
      },
    ],
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
    paths: [
      {
        path: 'content/articles/approved-draft/index.md',
        exists: true,
      },
    ],
  },
];

export const contentOpsFixture: ContentOpsSnapshot = {
  schemaVersion: 'content-ops-snapshot-v1',
  generatedAt: '2026-06-28T12:00:00.000Z',
  publicPublishingPerformed: false,
  paidGenerationPerformed: false,
  latestLiveArticle: {
    slug: 'the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
    title: "The AI Cost Rug Pull Isn't a Bubble. It's a Filter.",
    publishedAt: '2026-06-10',
    canonicalUrl:
      'https://davidmieloch.com/blog/the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
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
  inventory,
  approvedUnscheduled: inventory.filter(
    (item) =>
      item.approvalState === 'approved' && item.releaseState === 'needs-schedule',
  ),
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
    {
      id: 'social:linkedin:approved-draft',
      lane: 'social',
      platform: 'linkedin',
      slug: 'approved-draft',
      title: 'Approved Draft',
      scheduledAt: null,
      status: 'planned',
      blocked: false,
      approvalState: 'missing',
      safeDefault: 'do-not-post',
      nextCommand: 'pnpm content:pipeline social:package approved-draft linkedin',
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
