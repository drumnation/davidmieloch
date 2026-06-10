import { describe, expect, it } from "vitest";

import { dynamicParams, generateStaticParams } from "../../app/blog/[slug]/page";

const futureDraftSlugs = [
  "the-ai-bill-you-cant-predict",
  "the-most-valuable-ai-skill-isnt-prompting",
  "the-credibility-problem-with-ai-corporate-communications",
  "the-crew-seed",
];

describe("public blog route safety", () => {
  it("does not dynamically render slugs outside the published static set", () => {
    expect(dynamicParams).toBe(false);
  });

  it("does not generate public blog paths for future draft articles", () => {
    const generatedSlugs = generateStaticParams().map((params) => params.slug);

    expect(generatedSlugs).not.toEqual(
      expect.arrayContaining(futureDraftSlugs),
    );
  });

  it("does generate the launch path for the next approved article", () => {
    const generatedSlugs = generateStaticParams().map((params) => params.slug);

    expect(generatedSlugs).toContain(
      "the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter",
    );
  });
});
