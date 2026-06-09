import fs from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
  }

  const url = new URL(request.url);
  const publicPath = url.searchParams.get("path") ?? "";

  if (!publicPath.startsWith("/blog/") || publicPath.includes("..")) {
    return NextResponse.json(
      { ok: false, error: "invalid image path" },
      { status: 400 },
    );
  }

  const imagePath = path.join(process.cwd(), "public", publicPath);

  if (!imagePath.startsWith(path.join(process.cwd(), "public", "blog"))) {
    return NextResponse.json(
      { ok: false, error: "invalid image path" },
      { status: 400 },
    );
  }

  if (!fs.existsSync(imagePath)) {
    return NextResponse.json(
      { ok: false, error: "image not found" },
      { status: 404 },
    );
  }

  const image = fs.readFileSync(imagePath);

  return new NextResponse(image, {
    headers: {
      "Content-Type": contentTypeForPath(imagePath),
      "Cache-Control": "no-store",
    },
  });
}

function contentTypeForPath(imagePath: string) {
  const extension = path.extname(imagePath).toLowerCase();
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  return "image/png";
}
