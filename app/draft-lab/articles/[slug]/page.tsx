import fs from "node:fs";
import path from "node:path";

import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

import review from "../../../../content/distribution/draft-image-review.json";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type DraftCandidate = {
  slug: string;
  title: string;
  collection: string;
  relativePath: string;
  wordCount: number;
  imageStatus: string;
  sourceBucket: string;
  promptSeed: string;
  previewMarkdownPath: string;
  images: Array<{
    src: string;
    sourcePath: string;
    role: string;
  }>;
};

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
};

type GeneratedInteriorManifest = {
  schemaVersion: string;
  generatedAt?: string;
  updatedAt?: string;
  approvalStatus?: string;
  assets: GeneratedInteriorImage[];
};

const candidates = review.candidates as DraftCandidate[];
const removedCandidates = (review.removedCandidates ?? []) as DraftCandidate[];
const allCandidates = [...candidates, ...removedCandidates];
const draftHeroImages: Record<
  string,
  { src: string; alt: string; caption: string }
> = {
  "the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter": {
    src: "/home/next-series/article-heroes/the-filter-linkedin.png",
    alt: "A 1950s space western black hole filtering compute chips above a factory rail checkpoint",
    caption: "The Filter: cost and scarcity return as useful pressure.",
  },
  "the-ai-bill-you-cant-predict": {
    src: "/home/next-series/article-heroes/the-meter-linkedin.png",
    alt: "A monumental 1950s analog meter tower over a retro space factory floor",
    caption: "The Meter: AI billing needs instruments, not vibes.",
  },
  "the-most-valuable-ai-skill-isnt-prompting": {
    src: "/home/next-series/article-heroes/the-noticers-linkedin.png",
    alt: "Observers in a retro space western lookout booth watching factory robots below",
    caption: "The Noticers: judgment moves from prompting to observation.",
  },
  "the-credibility-problem-with-ai-corporate-communications": {
    src: "/home/next-series/article-heroes/the-credibility-problem-linkedin.png",
    alt: "A cracked 1950s broadcast screen being examined by a glowing proof-chain machine",
    caption:
      "The Credibility Problem: AI corporate language has to earn trust again.",
  },
  "the-crew-seed": {
    src: "/home/next-series/article-heroes/the-crew-linkedin.png",
    alt: "A western-hat foreman coordinating retro robot workers across a vast space factory",
    caption: "The Crew: the human role moves from typing to orchestration.",
  },
};

export const metadata: Metadata = {
  title: "Draft Article Preview",
  description: "Private noindex preview for unpublished article drafts.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    return [];
  }

  return allCandidates.map((candidate) => ({ slug: candidate.slug }));
}

export default async function DraftArticlePreviewPage({ params }: PageProps) {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    notFound();
  }

  const { slug } = await params;
  const candidate = allCandidates.find((item) => item.slug === slug);

  if (!candidate) {
    notFound();
  }

  const sourcePath = path.join(process.cwd(), candidate.previewMarkdownPath);

  if (!fs.existsSync(sourcePath)) {
    notFound();
  }

  const markdown = renderDraftMarkdown(
    stripFrontmatter(fs.readFileSync(sourcePath, "utf8")),
    candidate,
  );
  const mappedHeroImage = draftHeroImages[candidate.slug];
  const stagedHeroImage =
    candidate.images.find((image) => image.role === "candidate-hero") ??
    candidate.images[0];
  const heroImage =
    mappedHeroImage ??
    (stagedHeroImage
      ? {
          src: stagedHeroImage.src,
          alt: `${candidate.title} candidate hero image`,
          caption: `${candidate.title} candidate hero`,
        }
      : undefined);
  const generatedInteriorImages = readGeneratedInteriorImages(candidate.slug);
  const generatedInteriorPlacements = groupGeneratedInteriorImages(
    generatedInteriorImages,
  );
  const returnTo = `/draft-lab/articles/${candidate.slug}`;

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <Link href="/draft-lab" style={styles.backLink}>
          Back to draft lab
        </Link>
      </nav>
      <article>
        <header style={styles.header}>
          <p style={styles.eyebrow}>
            Unpublished draft · {candidate.collection}
          </p>
          <h1 style={styles.title}>{candidate.title}</h1>
          <div style={styles.statusGrid} aria-label="Draft status">
            <span>{candidate.wordCount.toLocaleString()} words</span>
            <span>{candidate.imageStatus}</span>
            <span>{candidate.sourceBucket}</span>
          </div>
          <p style={styles.source}>{candidate.relativePath}</p>
          <blockquote style={styles.prompt}>{candidate.promptSeed}</blockquote>
          <form action="/api/draft-lab" method="post" style={styles.actionRow}>
            <input type="hidden" name="action" value="draft-decision" />
            <input type="hidden" name="slug" value={candidate.slug} />
            <input type="hidden" name="returnTo" value={returnTo} />
            <input
              name="reason"
              placeholder="Why keep/remove/maybe?"
              style={styles.reasonInput}
            />
            <button name="status" value="keep" style={styles.keepButton}>
              Keep
            </button>
            <button name="status" value="maybe" style={styles.maybeButton}>
              Maybe
            </button>
            <button name="status" value="remove" style={styles.removeButton}>
              Remove
            </button>
          </form>
          <form
            action="/api/draft-lab"
            method="post"
            style={styles.launchApprovalForm}
          >
            <input type="hidden" name="action" value="approve-launch" />
            <input type="hidden" name="slug" value={candidate.slug} />
            <input type="hidden" name="gate" value="all" />
            <input type="hidden" name="returnTo" value={returnTo} />
            <input
              name="note"
              placeholder="Approval note"
              style={styles.reasonInput}
            />
            <button style={styles.keepButton}>
              Approve article gates
            </button>
            <span style={styles.approvalHint}>
              Writes local approval state only. It does not publish.
            </span>
          </form>
        </header>
        {heroImage ? (
          <figure style={styles.heroFigure}>
            <img
              src={heroImage.src}
              alt={heroImage.alt ?? `${candidate.title} hero image`}
              style={styles.heroImage}
            />
            <figcaption style={styles.heroCaption}>
              {heroImage.caption}
            </figcaption>
          </figure>
        ) : null}

        {generatedInteriorPlacements.length > 0 ? (
          <section
            style={styles.generatedSection}
            aria-labelledby="generated-interior-images"
          >
            <div style={styles.generatedHeader}>
              <p style={styles.eyebrow}>Interior image candidates</p>
              <h2 id="generated-interior-images" style={styles.generatedTitle}>
                Generated art waiting for selection
              </h2>
              <p style={styles.generatedDescription}>
                These are not published into the article yet. Pick the ones that
                actually clarify the idea, then the approved images can be
                inserted with captions and counted by the article readiness
                lint.
              </p>
            </div>
            <div style={styles.placementReviewList}>
              {generatedInteriorPlacements.map((placement) => (
                <section key={placement.id} style={styles.placementReview}>
                  <div style={styles.placementHeader}>
                    <p style={styles.placementKicker}>{placement.id}</p>
                    <h3 style={styles.placementTitle}>
                      {placement.heading}
                    </h3>
                    {placement.selected ? (
                      <span style={styles.selectedBadge}>Selected</span>
                    ) : (
                      <span style={styles.reviewBadge}>
                        {placement.images.length} choices
                      </span>
                    )}
                  </div>
                  <div style={styles.generatedGrid}>
                    {placement.images.map((image) => (
                      <figure key={image.id} style={styles.generatedCard}>
                        <a
                          href={image.publicPath}
                          style={styles.generatedImageLink}
                        >
                          <img
                            src={image.publicPath}
                            alt={
                              image.altText ?? `${candidate.title} generated art`
                            }
                            style={styles.generatedImage}
                            loading="lazy"
                          />
                        </a>
                        <figcaption style={styles.generatedCaption}>
                          <strong>
                            {image.targetHeading ?? image.placementId}
                          </strong>
                          <span>
                            {image.caption ?? "No caption drafted yet."}
                          </span>
                          <code>{image.status}</code>
                        </figcaption>
                        <form
                          action="/api/draft-lab"
                          method="post"
                          style={styles.imageDecisionForm}
                        >
                          <input
                            type="hidden"
                            name="action"
                            value="image-decision"
                          />
                          <input
                            type="hidden"
                            name="slug"
                            value={candidate.slug}
                          />
                          <input
                            type="hidden"
                            name="assetId"
                            value={image.id}
                          />
                          <input
                            type="hidden"
                            name="returnTo"
                            value={returnTo}
                          />
                          <input
                            name="reason"
                            placeholder="Optional note"
                            style={styles.imageReasonInput}
                          />
                          <button
                            name="decision"
                            value="approve"
                            style={styles.keepButton}
                          >
                            Check
                          </button>
                          <button
                            name="decision"
                            value="reject"
                            style={styles.removeButton}
                          >
                            X
                          </button>
                        </form>
                      </figure>
                    ))}
                  </div>
                  <form
                    action="/api/draft-lab"
                    method="post"
                    style={styles.requestImageForm}
                  >
                    <input type="hidden" name="action" value="request-image" />
                    <input type="hidden" name="slug" value={candidate.slug} />
                    <input
                      type="hidden"
                      name="placementId"
                      value={placement.id}
                    />
                    <input type="hidden" name="returnTo" value={returnTo} />
                    <textarea
                      name="prompt"
                      placeholder="Describe the replacement image you want for this spot."
                      style={styles.requestTextarea}
                    />
                    <button style={styles.maybeButton}>
                      Queue new image request
                    </button>
                  </form>
                </section>
              ))}
            </div>
          </section>
        ) : null}

        <ReactMarkdown
          components={{
            h1: ({ children }) => <h2 style={styles.markdownH1}>{children}</h2>,
            h2: ({ children }) => <h2 style={styles.markdownH2}>{children}</h2>,
            h3: ({ children }) => <h3 style={styles.markdownH3}>{children}</h3>,
            p: ({ children }) => <p style={styles.paragraph}>{children}</p>,
            a: ({ href, children }) => (
              <a href={href} style={styles.markdownLink}>
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img
                src={src || ""}
                alt={alt || ""}
                style={styles.markdownImage}
                loading="lazy"
              />
            ),
            blockquote: ({ children }) => (
              <blockquote style={styles.blockquote}>{children}</blockquote>
            ),
            ul: ({ children }) => <ul style={styles.list}>{children}</ul>,
            ol: ({ children }) => <ol style={styles.list}>{children}</ol>,
            li: ({ children }) => <li style={styles.listItem}>{children}</li>,
          }}
        >
          {markdown}
        </ReactMarkdown>
        <section style={styles.editorSection} aria-labelledby="draft-editor">
          <div style={styles.generatedHeader}>
            <p style={styles.eyebrow}>Draft editor</p>
            <h2 id="draft-editor" style={styles.generatedTitle}>
              Edit the staging markdown
            </h2>
            <p style={styles.generatedDescription}>
              This saves the staged Draft Lab markdown, not a public post. Use
              it for cleanup while the article is still unpublished.
            </p>
          </div>
          <form action="/api/draft-lab" method="post" style={styles.editorForm}>
            <input type="hidden" name="action" value="save-markdown" />
            <input type="hidden" name="slug" value={candidate.slug} />
            <input type="hidden" name="returnTo" value={returnTo} />
            <textarea
              name="markdown"
              defaultValue={markdown}
              spellCheck
              style={styles.editorTextarea}
            />
            <button style={styles.keepButton}>Save draft text</button>
          </form>
        </section>
      </article>
    </main>
  );
}

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n\n?/, "").trim();
}

function renderDraftMarkdown(markdown: string, candidate: DraftCandidate) {
  const imageBySource = new Map<string, DraftCandidate["images"][number]>();

  for (const image of candidate.images) {
    imageBySource.set(normalizeImageLookupKey(image.sourcePath), image);
    imageBySource.set(
      normalizeImageLookupKey(path.basename(image.sourcePath)),
      image,
    );
  }

  return markdown.replace(/!\[\[([^\]]+)]]/g, (_match, rawPath: string) => {
    const lookupKey = normalizeImageLookupKey(rawPath);
    const image =
      imageBySource.get(lookupKey) ||
      imageBySource.get(normalizeImageLookupKey(path.basename(rawPath)));

    if (!image) {
      return `> Missing staged draft image: ${rawPath}`;
    }

    return `![${candidate.title} ${image.role}](${image.src})`;
  });
}

function normalizeImageLookupKey(value: string) {
  return value.replace(/\\/g, "/").trim().toLowerCase();
}

function groupGeneratedInteriorImages(images: GeneratedInteriorImage[]) {
  const placements = new Map<
    string,
    {
      id: string;
      heading: string;
      selected: boolean;
      images: GeneratedInteriorImage[];
    }
  >();

  for (const image of images) {
    const placement = placements.get(image.placementId) ?? {
      id: image.placementId,
      heading: image.targetHeading ?? image.placementId,
      selected: false,
      images: [],
    };

    placement.images.push(image);
    placement.selected =
      placement.selected || image.status === "approved-selected";
    placements.set(image.placementId, placement);
  }

  return Array.from(placements.values()).map((placement) => {
    const selectedImages = placement.images.filter(
      (image) => image.status === "approved-selected",
    );

    return {
      ...placement,
      images: selectedImages.length > 0 ? selectedImages : placement.images,
    };
  });
}

function readGeneratedInteriorImages(slug: string): GeneratedInteriorImage[] {
  const manifestPath = path.join(
    process.cwd(),
    "content",
    "articles",
    slug,
    "images",
    "generated",
    "manifest.json",
  );

  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  try {
    const manifest = JSON.parse(
      fs.readFileSync(manifestPath, "utf8"),
    ) as GeneratedInteriorManifest;

    return manifest.assets
      .filter((asset) =>
        [
          "approved-selected",
          "generated-needs-review",
          "generated-contact-sheet-needs-slicing",
        ].includes(asset.status),
      )
      .filter((asset) => asset.role === "article-interior")
      .filter((asset) =>
        fs.existsSync(path.join(process.cwd(), asset.sourcePath)),
      )
      .sort((left, right) => {
        const placementDelta = left.placementId.localeCompare(
          right.placementId,
        );

        return placementDelta === 0
          ? left.variantId.localeCompare(right.variantId)
          : placementDelta;
      });
  } catch {
    return [];
  }
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "116px 24px 92px",
    color: "#171717",
  },
  nav: {
    marginBottom: "24px",
  },
  backLink: {
    color: "#4451a4",
    fontWeight: 900,
    textDecoration: "none",
  },
  header: {
    borderBottom: "1px solid #dedede",
    paddingBottom: "28px",
    marginBottom: "34px",
  },
  eyebrow: {
    margin: "0 0 12px",
    color: "#4451a4",
    fontSize: "0.78rem",
    fontWeight: 900,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2.2rem, 7vw, 4.6rem)",
    lineHeight: 0.98,
    letterSpacing: 0,
  },
  statusGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "18px",
  },
  source: {
    margin: "18px 0 0",
    color: "#666",
    overflowWrap: "anywhere",
    fontSize: "0.88rem",
  },
  prompt: {
    margin: "18px 0 0",
    padding: "14px 16px",
    borderLeft: "3px solid #4451a4",
    background: "#f3f0ec",
    color: "#333",
    lineHeight: 1.5,
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "18px",
  },
  launchApprovalForm: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
    marginTop: "10px",
    paddingTop: "14px",
    borderTop: "1px solid #dedede",
  },
  approvalHint: {
    color: "#666",
    fontSize: "0.84rem",
    lineHeight: 1.35,
  },
  reasonInput: {
    flex: "1 1 260px",
    minHeight: "40px",
    padding: "0 12px",
    border: "1px solid #d6d0c7",
    borderRadius: "8px",
    color: "#171717",
  },
  keepButton: {
    minHeight: "40px",
    padding: "0 14px",
    border: "0",
    borderRadius: "8px",
    background: "#245f3d",
    color: "#fffaf1",
    fontWeight: 900,
    cursor: "pointer",
  },
  maybeButton: {
    minHeight: "40px",
    padding: "0 14px",
    border: "0",
    borderRadius: "8px",
    background: "#4451a4",
    color: "#fffaf1",
    fontWeight: 900,
    cursor: "pointer",
  },
  removeButton: {
    minHeight: "40px",
    padding: "0 14px",
    border: "0",
    borderRadius: "8px",
    background: "#8a2e28",
    color: "#fffaf1",
    fontWeight: 900,
    cursor: "pointer",
  },
  heroFigure: {
    margin: "0 0 36px",
    overflow: "hidden",
    borderRadius: "10px",
    background: "#111",
    boxShadow: "0 18px 60px rgba(15, 12, 9, 0.2)",
  },
  heroImage: {
    display: "block",
    width: "100%",
    maxHeight: "720px",
    objectFit: "cover",
  },
  heroCaption: {
    padding: "12px 16px",
    background: "#15120f",
    color: "#f4e8d8",
    fontSize: "0.88rem",
    lineHeight: 1.4,
  },
  generatedSection: {
    margin: "0 0 42px",
    padding: "22px",
    border: "1px solid #ded6ca",
    borderRadius: "12px",
    background: "#fbf7ef",
  },
  generatedHeader: {
    display: "grid",
    gap: "8px",
    marginBottom: "18px",
  },
  generatedTitle: {
    margin: 0,
    fontSize: "clamp(1.8rem, 5vw, 3rem)",
    lineHeight: 1,
    letterSpacing: 0,
  },
  generatedDescription: {
    maxWidth: "720px",
    margin: 0,
    color: "#4c4740",
    fontSize: "1rem",
    lineHeight: 1.55,
  },
  generatedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  },
  placementReviewList: {
    display: "grid",
    gap: "18px",
  },
  placementReview: {
    display: "grid",
    gap: "12px",
    padding: "14px",
    border: "1px solid #e2d8c9",
    borderRadius: "12px",
    background: "#f4eadb",
  },
  placementHeader: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gap: "8px 14px",
    alignItems: "center",
  },
  placementKicker: {
    gridColumn: "1 / -1",
    margin: 0,
    color: "#7d5b2f",
    fontSize: "0.74rem",
    fontWeight: 900,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  placementTitle: {
    margin: 0,
    fontSize: "1.24rem",
    lineHeight: 1.12,
  },
  selectedBadge: {
    padding: "6px 8px",
    borderRadius: "999px",
    background: "#245f3d",
    color: "#fffaf1",
    fontSize: "0.72rem",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  reviewBadge: {
    padding: "6px 8px",
    borderRadius: "999px",
    background: "#4451a4",
    color: "#fffaf1",
    fontSize: "0.72rem",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  generatedCard: {
    display: "grid",
    gap: "10px",
    margin: 0,
    padding: "10px",
    border: "1px solid #e2d8c9",
    borderRadius: "10px",
    background: "#fffdf8",
  },
  generatedImageLink: {
    display: "block",
    overflow: "hidden",
    borderRadius: "8px",
    background: "#111",
  },
  generatedImage: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 9",
    objectFit: "cover",
  },
  generatedCaption: {
    display: "grid",
    gap: "6px",
    color: "#302b25",
    fontSize: "0.88rem",
    lineHeight: 1.38,
  },
  imageDecisionForm: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto auto",
    gap: "8px",
    alignItems: "center",
  },
  imageReasonInput: {
    minHeight: "36px",
    padding: "0 10px",
    border: "1px solid #d6d0c7",
    borderRadius: "8px",
    color: "#171717",
  },
  requestImageForm: {
    display: "grid",
    gap: "8px",
  },
  requestTextarea: {
    width: "100%",
    minHeight: "74px",
    padding: "10px",
    border: "1px solid #d6d0c7",
    borderRadius: "8px",
    color: "#171717",
    font: "inherit",
    lineHeight: 1.45,
    resize: "vertical",
  },
  editorSection: {
    margin: "46px 0 0",
    padding: "22px",
    border: "1px solid #ded6ca",
    borderRadius: "12px",
    background: "#fbf7ef",
  },
  editorForm: {
    display: "grid",
    gap: "12px",
  },
  editorTextarea: {
    width: "100%",
    minHeight: "70vh",
    padding: "16px",
    border: "1px solid #d6d0c7",
    borderRadius: "8px",
    color: "#171717",
    font: "0.98rem / 1.55 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    resize: "vertical",
  },
  markdownH1: {
    margin: "36px 0 12px",
    fontSize: "2rem",
    lineHeight: 1.1,
  },
  markdownH2: {
    margin: "34px 0 12px",
    fontSize: "1.72rem",
    lineHeight: 1.15,
  },
  markdownH3: {
    margin: "28px 0 10px",
    fontSize: "1.28rem",
    lineHeight: 1.22,
  },
  paragraph: {
    margin: "0 0 18px",
    color: "#303030",
    fontSize: "1.06rem",
    lineHeight: 1.72,
  },
  markdownLink: {
    color: "#4451a4",
    fontWeight: 800,
  },
  markdownImage: {
    display: "block",
    width: "100%",
    height: "auto",
    maxHeight: "560px",
    objectFit: "contain",
    margin: "24px 0",
    borderRadius: "8px",
    background: "#111",
  },
  blockquote: {
    margin: "24px 0",
    padding: "6px 0 6px 18px",
    borderLeft: "3px solid #c8c8c8",
    color: "#444",
  },
  list: {
    margin: "0 0 22px",
    paddingLeft: "24px",
  },
  listItem: {
    marginBottom: "8px",
    lineHeight: 1.6,
  },
};
