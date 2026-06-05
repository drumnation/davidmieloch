import {
  getSingularityLabsFieldNotes,
  getSiteUrl,
} from "../../../src/content/articles";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();
  const items = getSingularityLabsFieldNotes().map((article) => ({
    title: article.title,
    slug: article.slug,
    canonicalUrl: article.canonicalUrl,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt ?? null,
    sourceDescription: article.description,
    commercialConcept: article.commercialConcept ?? null,
    commercialSummary: article.commercialSummary ?? null,
    singularityLabsCta: article.singularityLabsCta ?? null,
    tags: article.tags,
  }));

  return Response.json(
    {
      version: 1,
      channel: "singularity-labs",
      source: {
        site: siteUrl,
        canonicalOwner: "davidmieloch.com",
        feedUrl: `${siteUrl}/feeds/singularity-labs.json`,
      },
      items,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    },
  );
}
