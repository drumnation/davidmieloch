import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "../../app/api/draft-lab/generated-image/route";

describe("draft-lab generated image route", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("stays unavailable when Draft Lab is disabled", async () => {
    vi.stubEnv("DRAFT_LAB_ENABLED", "0");

    const response = await GET(
      new Request(
        "https://davidmieloch.com/api/draft-lab/generated-image?path=%2Fblog%2Farticle%2Fimages%2Fhero.png",
      ),
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: "disabled",
    });
  });

  it("redirects a valid blog image without tracing the public directory", async () => {
    vi.stubEnv("DRAFT_LAB_ENABLED", "1");
    vi.spyOn(Date, "now").mockReturnValue(123456789);

    const response = await GET(
      new Request(
        "https://davidmieloch.com/api/draft-lab/generated-image?path=%2Fblog%2Farticle%2Fimages%2Fhero.png",
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("location")).toBe(
      "https://davidmieloch.com/blog/article/images/hero.png?draft-lab-cache-bust=123456789",
    );
  });

  it.each([
    "/images/hero.png",
    "/blog/../secrets.txt",
    "/blog/article\\secrets.txt",
    "/blog/article/image.png?redirect=https://example.com",
    "/blog/article/image.png#fragment",
  ])("rejects invalid public paths: %s", async (publicPath) => {
    vi.stubEnv("DRAFT_LAB_ENABLED", "1");

    const requestUrl = new URL(
      "https://davidmieloch.com/api/draft-lab/generated-image",
    );
    requestUrl.searchParams.set("path", publicPath);

    const response = await GET(new Request(requestUrl));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: "invalid image path",
    });
  });
});
