const APPROVAL_GATE_LABELS = [
  'article-copy-approved',
  'hero-image-approved',
  'site-draft-preview-reviewed',
  'linkedin-reveal-copy-approved',
  'release-time-approved',
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function launchSlugs(launchPlan = {}) {
  return (launchPlan.articles ?? []).map((article) => article.slug);
}

function assertKnownSlug(launchPlan, slug) {
  const known = new Set(launchSlugs(launchPlan));
  if (!known.has(slug)) {
    throw new Error(`Unknown launch article slug: ${slug}`);
  }
}

function selectedSlugs(launchPlan, slug) {
  if (slug === 'all') return launchSlugs(launchPlan);
  assertKnownSlug(launchPlan, slug);
  return [slug];
}

function selectedGates(gate) {
  if (gate === 'all') return APPROVAL_GATE_LABELS;
  if (!APPROVAL_GATE_LABELS.includes(gate)) {
    throw new Error(`Unknown launch approval gate: ${gate}`);
  }
  return [gate];
}

export function emptyLaunchApprovalLedger(generatedAt = new Date().toISOString()) {
  return {
    schemaVersion: 'launch-approval-ledger-v1',
    updatedAt: generatedAt,
    publicPublishingPerformed: false,
    safeDefault: 'do-not-publish',
    approvals: {},
  };
}

export function approvalStatusFor(approvalLedger = {}, slug, gate) {
  return approvalLedger.approvals?.[slug]?.gates?.[gate] ?? null;
}

export function recordLaunchApproval({
  approvalLedger,
  launchPlan,
  slug,
  gate,
  approvedBy = 'David',
  note = '',
  generatedAt = new Date().toISOString(),
}) {
  if (!slug) throw new Error('launch:approve requires <slug|all>.');
  if (!gate) throw new Error('launch:approve requires <gate|all>.');

  const next = clone(approvalLedger ?? emptyLaunchApprovalLedger(generatedAt));
  next.schemaVersion = 'launch-approval-ledger-v1';
  next.publicPublishingPerformed = false;
  next.safeDefault = 'do-not-publish';
  next.updatedAt = generatedAt;

  const slugs = selectedSlugs(launchPlan, slug);
  const gates = selectedGates(gate);

  for (const articleSlug of slugs) {
    next.approvals[articleSlug] ??= { gates: {} };
    for (const gateLabel of gates) {
      next.approvals[articleSlug].gates[gateLabel] = {
        status: 'approved',
        approvedBy,
        approvedAt: generatedAt,
        note,
      };
    }
  }

  return {
    ledger: next,
    recorded: slugs.flatMap((articleSlug) => (
      gates.map((gateLabel) => ({
        slug: articleSlug,
        gate: gateLabel,
        status: 'approved',
      }))
    )),
  };
}

export function approvalGateLabels() {
  return [...APPROVAL_GATE_LABELS];
}
