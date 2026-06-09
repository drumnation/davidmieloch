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
  processedAt?: string;
  failedAt?: string;
  resultAssetId?: string;
  error?: string;
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

  return NextResponse.json({ ok: true, requests });
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
