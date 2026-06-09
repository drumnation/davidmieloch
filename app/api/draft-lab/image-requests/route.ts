import fs from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

type ImageRequest = {
  id: string;
  slug: string;
  placementId: string;
  prompt: string;
  status: string;
  requestedAt: string;
  requestedBy?: string;
  updatedAt?: string;
  workerStartedAt?: string;
  processedAt?: string;
  failedAt?: string;
  resultAssetId?: string;
  error?: string;
  sourceAssetId?: string;
  sourceVariantId?: string;
  sourceImageUrl?: string;
};

export async function GET(request: Request) {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
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

  const requests = readImageRequests(slug)
    .filter((imageRequest) =>
      placementId ? imageRequest.placementId === placementId : true,
    )
    .sort((left, right) => right.requestedAt.localeCompare(left.requestedAt));

  return NextResponse.json({
    ok: true,
    requests,
    observation: observeImageWorker(requests),
  });
}

function observeImageWorker(requests: ImageRequest[]) {
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
    schemaVersion: "draft-lab-image-worker-observation-v1",
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

function readImageRequests(slug: string): ImageRequest[] {
  const requestsPath = path.join(
    process.cwd(),
    "content",
    "articles",
    slug,
    "images",
    "generated",
    "requests.json",
  );

  if (!fs.existsSync(requestsPath)) {
    return [];
  }

  try {
    const payload = JSON.parse(fs.readFileSync(requestsPath, "utf8")) as {
      requests?: ImageRequest[];
    };

    return (payload.requests ?? []).filter(
      (imageRequest) => imageRequest.slug === slug,
    );
  } catch {
    return [];
  }
}
