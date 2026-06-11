import fs from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

type GeneratedInteriorImage = {
  id: string;
  placementId: string;
  variantId: string;
  role: string;
  targetHeading?: string;
  altText?: string;
  caption?: string;
  publicPath: string;
  sourcePath: string;
  status: string;
  checksum?: string;
  approved?: boolean;
  decisionReason?: string;
  decidedAt?: string;
  requestId?: string | null;
  sourceAssetId?: string | null;
  sourceVariantId?: string | null;
  sourceImageUrl?: string | null;
  decisionSource?: string;
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

type WorkerObservation = {
  schemaVersion: string;
  checkedAt: string;
  status: "needs-worker" | "processing" | "idle";
  queued: number;
  processing: number;
  completed: number;
  failed: number;
  oldestQueuedAt: string | null;
  claim: string;
};

type GeneratedManifest = {
  schemaVersion?: string;
  assets?: Array<GeneratedInteriorImage>;
};

type RequestsPayload = {
  schemaVersion?: string;
  requests?: Array<ImageRequest>;
};

export async function GET(request: Request) {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    return NextResponse.json(
      { ok: false, error: "disabled" },
      { status: 404 },
    );
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") ?? "";
  const placementId = url.searchParams.get("placementId") ?? "";

  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "missing slug" },
      { status: 400 },
    );
  }
  if (!placementId) {
    return NextResponse.json(
      { ok: false, error: "missing placementId" },
      { status: 400 },
    );
  }

  const manifest = readManifest(slug, placementId);
  const requestsPayload = readRequests(slug);
  const requests = requestsPayload
    .filter((request) => request.placementId === placementId)
    .sort((left, right) => right.requestedAt.localeCompare(left.requestedAt));
  const observation = observeRequests(requests);

  return NextResponse.json({
    ok: true,
    placementId,
    images: manifest
      .filter((image) => image.placementId === placementId)
      .sort((left, right) => left.variantId.localeCompare(right.variantId)),
    requests,
    observation,
  });
}

function observeRequests(requests: ImageRequest[]): WorkerObservation {
  const queued = requests.filter((request) => request.status === "queued");
  const processing = requests.filter((request) => request.status === "processing");
  const failed = requests.filter((request) => request.status === "failed");
  const completed = requests.filter((request) => request.status === "completed");
  const oldestQueuedAt =
    queued.length > 0
      ? queued
          .map((request) => request.requestedAt)
          .sort((left, right) => left.localeCompare(right))[0]
      : null;

  return {
    schemaVersion: "draft-lab-placement-observation-v1",
    checkedAt: new Date().toISOString(),
    status:
      queued.length > 0 && processing.length === 0
        ? "needs-worker"
        : processing.length > 0
          ? "processing"
          : "idle",
    queued: queued.length,
    processing: processing.length,
    completed: completed.length,
    failed: failed.length,
    oldestQueuedAt,
    claim:
      queued.length > 0 && processing.length === 0
        ? "Image requests are stored, but no active worker is observed."
        : "Image request worker state is observable from request records.",
  };
}

function readManifest(slug: string, placementId?: string) {
  const manifestPath = draftLabFile(slug, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  try {
    const payload = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as GeneratedManifest;
    const images = payload.assets ?? [];
    if (!placementId) return images;
    return images.filter((image) => image.placementId === placementId);
  } catch {
    return [];
  }
}

function readRequests(slug: string) {
  const requestsPath = draftLabFile(slug, "requests.json");
  if (!fs.existsSync(requestsPath)) {
    return [];
  }

  try {
    const payload = JSON.parse(fs.readFileSync(requestsPath, "utf8")) as RequestsPayload;
    return payload.requests ?? [];
  } catch {
    return [];
  }
}

function draftLabFile(slug: string, fileName: string) {
  const repoPath = path.join(
    process.cwd(),
    "content",
    "articles",
    slug,
    "images",
    "generated",
    fileName,
  );
  const dataRoot = process.env.DRAFT_LAB_DATA_ROOT;

  if (!dataRoot) return repoPath;

  const dataPath = path.join(
    dataRoot,
    "content",
    "articles",
    slug,
    "images",
    "generated",
    fileName,
  );

  return fs.existsSync(dataPath) ? dataPath : repoPath;
}
