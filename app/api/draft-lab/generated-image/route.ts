import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
  }

  const url = new URL(request.url);
  const publicPath = url.searchParams.get("path") ?? "";

  if (!isValidPublicImagePath(publicPath)) {
    return NextResponse.json(
      { ok: false, error: "invalid image path" },
      { status: 400 },
    );
  }

  const imageUrl = new URL(publicPath, url.origin);
  imageUrl.searchParams.set("draft-lab-cache-bust", Date.now().toString());

  return NextResponse.redirect(imageUrl, {
    status: 307,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isValidPublicImagePath(publicPath: string) {
  return (
    publicPath.startsWith("/blog/") &&
    !publicPath.includes("..") &&
    !publicPath.includes("\\") &&
    !publicPath.includes("?") &&
    !publicPath.includes("#")
  );
}
