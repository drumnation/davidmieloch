import fs from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

import { safeRedirectUrl } from "./redirect";

type DraftDecisionStatus = "keep" | "maybe" | "remove";
type ImageDecision = "approve" | "reject" | "review";
type LaunchGate =
  | "article-copy-approved"
  | "hero-image-approved"
  | "site-draft-preview-reviewed"
  | "linkedin-reveal-copy-approved"
  | "release-time-approved";

type DraftDecisions = {
  schemaVersion: string;
  updatedAt: string;
  decisions: Record<
    string,
    {
      status: DraftDecisionStatus;
      reason: string;
      decidedAt: string;
      decidedBy: string;
    }
  >;
};

type GeneratedInteriorImage = {
  id: string;
  placementId: string;
  variantId: string;
  role: string;
  status: string;
  decisionReason?: string;
  decidedAt?: string;
};

type GeneratedInteriorManifest = {
  schemaVersion: string;
  generatedAt?: string;
  updatedAt?: string;
  approvalStatus?: string;
  assets: GeneratedInteriorImage[];
};

type ImageRequest = {
  id: string;
  slug: string;
  placementId: string;
  prompt: string;
  status: "queued" | "processing" | "completed" | "failed" | "cancelled";
  requestedAt: string;
  requestedBy: string;
  updatedAt: string;
  sourceAssetId?: string;
  sourceVariantId?: string;
  sourceImageUrl?: string;
};

const allowedDraftStatuses = new Set<DraftDecisionStatus>([
  "keep",
  "maybe",
  "remove",
]);
const allowedImageDecisions = new Set<ImageDecision>([
  "approve",
  "reject",
  "review",
]);
const launchGates: LaunchGate[] = [
  "article-copy-approved",
  "hero-image-approved",
  "site-draft-preview-reviewed",
  "linkedin-reveal-copy-approved",
  "release-time-approved",
];

export async function POST(request: Request) {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
  }

  const formData = await request.formData();
  const action = stringValue(formData, "action");
  const slug = stringValue(formData, "slug");
  const returnTo = stringValue(formData, "returnTo") || "/draft-lab";

  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "missing slug" },
      { status: 400 },
    );
  }

  if (action === "draft-decision") {
    setDraftDecision(
      slug,
      stringValue(formData, "status"),
      stringValue(formData, "reason"),
    );
    return redirectBack(request, returnTo);
  }

  if (action === "image-decision") {
    setImageDecision(
      slug,
      stringValue(formData, "assetId"),
      stringValue(formData, "decision"),
      stringValue(formData, "reason"),
    );
    if (wantsJson(request)) {
      return NextResponse.json({ ok: true });
    }
    return redirectBack(request, returnTo);
  }

  if (action === "save-markdown") {
    savePreviewMarkdown(slug, stringValue(formData, "markdown"));
    return redirectBack(request, returnTo);
  }

  if (action === "request-image") {
    const imageRequest = queueImageRequest({
      slug,
      placementId: stringValue(formData, "placementId"),
      prompt: stringValue(formData, "prompt"),
      sourceAssetId: stringValue(formData, "sourceAssetId"),
      sourceVariantId: stringValue(formData, "sourceVariantId"),
      sourceImageUrl: stringValue(formData, "sourceImageUrl"),
    });
    if (wantsJson(request)) {
      return NextResponse.json({ ok: true, request: imageRequest });
    }
    return redirectBack(request, returnTo);
  }

  if (action === "approve-launch") {
    approveLaunchGates(
      slug,
      stringValue(formData, "gate") || "all",
      stringValue(formData, "note"),
    );
    return redirectBack(request, returnTo);
  }

  return NextResponse.json(
    { ok: false, error: `unsupported action ${action}` },
    { status: 400 },
  );
}

function approveLaunchGates(slug: string, gate: string, note: string) {
  const ledgerPath = path.join(
    process.cwd(),
    "content",
    "distribution",
    "factory-primitives-approval-ledger.json",
  );
  const packetPath = path.join(
    process.cwd(),
    "content",
    "distribution",
    "factory-primitives-approval-packet.json",
  );
  const now = new Date().toISOString();
  const ledger = readJson<{
    schemaVersion: string;
    updatedAt: string;
    publicPublishingPerformed: boolean;
    safeDefault: string;
    approvals: Record<
      string,
      {
        gates: Record<
          string,
          {
            status: string;
            approvedBy: string;
            approvedAt: string;
            note: string;
          }
        >;
      }
    >;
  }>(ledgerPath, {
    schemaVersion: "launch-approval-ledger-v1",
    updatedAt: now,
    publicPublishingPerformed: false,
    safeDefault: "do-not-publish",
    approvals: {},
  });
  const gates = gate === "all" ? launchGates : [gate as LaunchGate];

  for (const gateLabel of gates) {
    if (!launchGates.includes(gateLabel)) {
      throw new Error(`Unknown launch gate: ${gateLabel}`);
    }
  }

  ledger.updatedAt = now;
  ledger.publicPublishingPerformed = false;
  ledger.safeDefault = "do-not-publish";
  ledger.approvals[slug] ??= { gates: {} };

  for (const gateLabel of gates) {
    ledger.approvals[slug].gates[gateLabel] = {
      status: "approved",
      approvedBy: "David",
      approvedAt: now,
      note,
    };
  }

  writeJson(ledgerPath, ledger);
  updateApprovalPacket(packetPath, slug, ledger.approvals[slug].gates);
}

function updateApprovalPacket(
  packetPath: string,
  slug: string,
  gates: Record<
    string,
    {
      status: string;
      approvedBy: string;
      approvedAt: string;
      note: string;
    }
  >,
) {
  const packet = readJson<{
    summary?: { fullyApproved?: number };
    articles?: Array<{
      slug: string;
      gates?: Array<{
        label: string;
        status: string;
        approvedBy: string | null;
        approvedAt: string | null;
        note: string;
      }>;
    }>;
  }>(packetPath, {});

  for (const article of packet.articles ?? []) {
    if (article.slug !== slug) continue;

    for (const gate of article.gates ?? []) {
      const approvedGate = gates[gate.label];
      if (!approvedGate) continue;

      gate.status = approvedGate.status;
      gate.approvedBy = approvedGate.approvedBy;
      gate.approvedAt = approvedGate.approvedAt;
      gate.note = approvedGate.note;
    }
  }

  if (packet.summary && packet.articles) {
    packet.summary.fullyApproved = packet.articles.filter((article) =>
      article.gates?.every((gate) => gate.status === "approved"),
    ).length;
  }

  writeJson(packetPath, packet);
}

function redirectBack(request: Request, returnTo: string) {
  return NextResponse.redirect(safeRedirectUrl(request, returnTo), {
    status: 303,
  });
}

function wantsJson(request: Request) {
  return (
    request.headers.get("accept")?.includes("application/json") ||
    request.headers.get("x-draft-lab-client") === "1"
  );
}

function setDraftDecision(slug: string, rawStatus: string, reason: string) {
  if (!allowedDraftStatuses.has(rawStatus as DraftDecisionStatus)) {
    throw new Error(`Unsupported draft status: ${rawStatus}`);
  }

  const decisionsPath = path.join(
    process.cwd(),
    "content",
    "distribution",
    "draft-decisions.json",
  );
  const now = new Date().toISOString();
  const decisions = readJson<DraftDecisions>(decisionsPath, {
    schemaVersion: "draft-decisions-v1",
    updatedAt: now,
    decisions: {},
  });

  decisions.updatedAt = now;
  decisions.decisions[slug] = {
    status: rawStatus as DraftDecisionStatus,
    reason,
    decidedAt: now,
    decidedBy: "draft-lab-ui",
  };

  writeJson(decisionsPath, decisions);
  updateDraftReviewDecision(slug, rawStatus as DraftDecisionStatus, reason, now);
}

function updateDraftReviewDecision(
  slug: string,
  status: DraftDecisionStatus,
  reason: string,
  decidedAt: string,
) {
  const reviewPath = path.join(
    process.cwd(),
    "content",
    "distribution",
    "draft-image-review.json",
  );
  const review = readJson<{
    summary?: {
      candidates?: number;
      removedCandidates?: number;
      withImages?: number;
      missingImages?: number;
    };
    candidates: Array<Record<string, unknown>>;
    removedCandidates?: Array<Record<string, unknown>>;
  }>(reviewPath, {
    candidates: [],
    removedCandidates: [],
  });
  const removedCandidates = review.removedCandidates ?? [];
  const allCandidates = [...review.candidates, ...removedCandidates];
  const candidate = allCandidates.find((item) => item.slug === slug);

  if (!candidate) {
    return;
  }

  candidate.decision = {
    status,
    reason,
    decidedAt,
    decidedBy: "draft-lab-ui",
  };

  review.candidates = allCandidates.filter(
    (item) => decisionStatus(item) !== "remove",
  );
  review.removedCandidates = allCandidates.filter(
    (item) => decisionStatus(item) === "remove",
  );

  if (review.summary) {
    review.summary.candidates = review.candidates.length;
    review.summary.removedCandidates = review.removedCandidates.length;
    review.summary.withImages = review.candidates.filter(
      (item) => Array.isArray(item.images) && item.images.length > 0,
    ).length;
    review.summary.missingImages = review.candidates.filter(
      (item) => !Array.isArray(item.images) || item.images.length === 0,
    ).length;
  }

  writeJson(reviewPath, review);
}

function decisionStatus(candidate: Record<string, unknown>) {
  const decision = candidate.decision;

  if (!decision || typeof decision !== "object") {
    return "";
  }

  const status = (decision as { status?: unknown }).status;

  return typeof status === "string" ? status : "";
}

function setImageDecision(
  slug: string,
  assetId: string,
  rawDecision: string,
  reason: string,
) {
  if (!assetId) {
    throw new Error("Missing image asset id.");
  }

  if (!allowedImageDecisions.has(rawDecision as ImageDecision)) {
    throw new Error(`Unsupported image decision: ${rawDecision}`);
  }

  const manifestPath = generatedManifestPath(slug);
  const manifest = readJson<GeneratedInteriorManifest>(manifestPath, {
    schemaVersion: "generated-interior-image-manifest-v1",
    assets: [],
  });
  const selectedAsset = manifest.assets.find((asset) => asset.id === assetId);

  if (!selectedAsset) {
    throw new Error(`Unknown image asset: ${assetId}`);
  }

  const now = new Date().toISOString();
  const decision = rawDecision as ImageDecision;

  for (const asset of manifest.assets) {
    if (decision === "approve" && asset.placementId === selectedAsset.placementId) {
      asset.status =
        asset.id === selectedAsset.id
          ? "approved-selected"
          : "rejected-not-selected";
    } else if (asset.id === selectedAsset.id) {
      asset.status =
        decision === "reject" ? "rejected-by-david" : "generated-needs-review";
    }

    if (asset.id === selectedAsset.id || asset.placementId === selectedAsset.placementId) {
      asset.decidedAt = now;
      asset.decisionReason = reason;
    }
  }

  manifest.updatedAt = now;
  manifest.approvalStatus = summarizeImageApproval(manifest.assets);
  writeJson(manifestPath, manifest);
}

function savePreviewMarkdown(slug: string, markdown: string) {
  const previewPath = path.join(
    process.cwd(),
    "content",
    "distribution",
    "draft-previews",
    `${slug}.md`,
  );

  fs.mkdirSync(path.dirname(previewPath), { recursive: true });
  fs.writeFileSync(previewPath, `${markdown.trim()}\n`);
}

function queueImageRequest({
  slug,
  placementId,
  prompt,
  sourceAssetId,
  sourceVariantId,
  sourceImageUrl,
}: {
  slug: string;
  placementId: string;
  prompt: string;
  sourceAssetId?: string;
  sourceVariantId?: string;
  sourceImageUrl?: string;
}) {
  if (!placementId || !prompt.trim()) {
    throw new Error("Image request needs a placement and prompt.");
  }

  const requestsPath = path.join(
    process.cwd(),
    "content",
    "articles",
    slug,
    "images",
    "generated",
    "requests.json",
  );
  const requests = readJson<{
    schemaVersion: string;
    requests: ImageRequest[];
  }>(requestsPath, {
    schemaVersion: "draft-lab-image-requests-v1",
    requests: [],
  });
  const now = new Date().toISOString();
  const imageRequest: ImageRequest = {
    id: `${placementId}-${sourceVariantId ? `${sourceVariantId}-` : ""}${Date.now()}`,
    slug,
    placementId,
    prompt: prompt.trim(),
    status: "queued",
    requestedAt: now,
    requestedBy: "draft-lab-ui",
    updatedAt: now,
    ...(sourceAssetId ? { sourceAssetId } : {}),
    ...(sourceVariantId ? { sourceVariantId } : {}),
    ...(sourceImageUrl ? { sourceImageUrl } : {}),
  };

  requests.requests.push(imageRequest);

  writeJson(requestsPath, requests);
  return imageRequest;
}

function generatedManifestPath(slug: string) {
  return path.join(
    process.cwd(),
    "content",
    "articles",
    slug,
    "images",
    "generated",
    "manifest.json",
  );
}

function summarizeImageApproval(assets: GeneratedInteriorImage[]) {
  const articleInteriorAssets = assets.filter(
    (asset) => asset.role === "article-interior",
  );
  const placementIds = new Set(
    articleInteriorAssets.map((asset) => asset.placementId),
  );
  const approvedPlacementIds = new Set(
    articleInteriorAssets
      .filter((asset) => asset.status === "approved-selected")
      .map((asset) => asset.placementId),
  );

  return approvedPlacementIds.size === placementIds.size
    ? "approved"
    : "needs-david-selection";
}

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function readJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function writeJson(filePath: string, value: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
