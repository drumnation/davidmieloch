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
