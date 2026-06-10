import fs from "node:fs";
import path from "node:path";

import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { ImageRequestForm } from "./ImageRequestForm";
import { ImageDecisionControls } from "./ImageDecisionControls";
import { LinkedInCopyButton } from "./LinkedInCopyButton";

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

type GeneratedImageRequest = {
  id: string;
  slug: string;
  placementId: string;
  prompt: string;
  status: string;
  requestedAt: string;
  requestedBy: string;
  sourceAssetId?: string;
  sourceVariantId?: string;
  sourceImageUrl?: string;
};

type GeneratedInteriorPlacement = {
  id: string;
  heading: string;
  selected: boolean;
  images: GeneratedInteriorImage[];
  requests: GeneratedImageRequest[];
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
  const generatedImageRequests = readGeneratedImageRequests(candidate.slug);
  const generatedInteriorPlacements = groupGeneratedInteriorImages(
    generatedInteriorImages,
    generatedImageRequests,
  );
  const generatedInteriorByHeading = new Map(
    generatedInteriorPlacements.map((placement) => [
      normalizeHeading(placement.heading),
      placement,
    ]),
  );
  const returnTo = `/draft-lab/articles/${candidate.slug}`;
  const linkedInArticleText = buildLinkedInArticleText({
    candidate,
    markdown,
    heroImage,
    placements: generatedInteriorPlacements,
  });

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <Link href="/draft-lab" style={styles.backLink}>
          Back to draft lab
        </Link>
      </nav>
      <LinkedInCopyButton articleText={linkedInArticleText} />
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

        <ReactMarkdown
          components={{
            h1: ({ children }) => <h2 style={styles.markdownH1}>{children}</h2>,
            h2: ({ children }) => {
              const headingText = textFromReactChildren(children);
              const placement = generatedInteriorByHeading.get(
                normalizeHeading(headingText),
              );

              return (
                <>
                  <h2 style={styles.markdownH2}>{children}</h2>
                  {placement ? (
                    <InlineImagePlacement
                      candidate={candidate}
                      placement={placement}
                      returnTo={returnTo}
                    />
                  ) : null}
                </>
              );
            },
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

function InlineImagePlacement({
  candidate,
  placement,
  returnTo,
}: {
  candidate: DraftCandidate;
  placement: GeneratedInteriorPlacement;
  returnTo: string;
}) {
  const placementReturnTo = `${returnTo}#image-set-${placement.id}`;

  return (
    <section id={`image-set-${placement.id}`} style={styles.placementReview}>
      <div style={styles.placementHeader}>
        <p style={styles.placementKicker}>Image set · {placement.id}</p>
        <h3 style={styles.placementTitle}>{placement.heading}</h3>
        {placement.selected ? (
          <span style={styles.selectedBadge}>Selected</span>
        ) : (
          <span style={styles.reviewBadge}>
            {placement.images.length} choices
          </span>
        )}
      </div>
      <p style={styles.placementHelp}>
        Choose the image that best supports this section. Selected images are
        highlighted, but the other options stay visible so you can compare or
        change your mind.
      </p>
      <div style={styles.generatedGrid}>
        {placement.images.map((image) => (
          <figure key={image.id} style={imageCardStyle(image.status)}>
            <ImageDecisionControls
              slug={candidate.slug}
              assetId={image.id}
              variantId={image.variantId}
              returnTo={placementReturnTo}
            />
            <a href={draftLabGeneratedImageUrl(image)} style={styles.generatedImageLink}>
              <img
                src={draftLabGeneratedImageUrl(image)}
                alt={image.altText ?? `${candidate.title} generated art`}
                style={styles.generatedImage}
                loading="lazy"
              />
            </a>
            <figcaption style={styles.generatedCaption}>
              <strong>{image.variantId}</strong>
              <span>{image.caption ?? "No caption drafted yet."}</span>
              <code>{image.status}</code>
            </figcaption>
            <ImageRequestForm
              slug={candidate.slug}
              placementId={placement.id}
              heading={placement.heading}
              returnTo={placementReturnTo}
              initialRequests={placement.requests.filter(
                (request) => request.sourceAssetId === image.id,
              )}
              sourceAssetId={image.id}
              sourceVariantId={image.variantId}
              sourceImageUrl={draftLabGeneratedImageUrl(image)}
              compact
            />
          </figure>
        ))}
      </div>
      <ImageRequestForm
        slug={candidate.slug}
        placementId={placement.id}
        heading={placement.heading}
        returnTo={placementReturnTo}
        initialRequests={placement.requests}
      />
    </section>
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

function buildLinkedInArticleText({
  candidate,
  markdown,
  heroImage,
  placements,
}: {
  candidate: DraftCandidate;
  markdown: string;
  heroImage?: { src: string; alt: string; caption: string };
  placements: GeneratedInteriorPlacement[];
}) {
  const lines: string[] = [];
  const placementByHeading = new Map(
    placements.map((placement) => [normalizeHeading(placement.heading), placement]),
  );

  lines.push(candidate.title);
  lines.push("");

  if (heroImage) {
    lines.push("[IMAGE: HERO]");
    lines.push(`Alt: ${heroImage.alt}`);
    lines.push(`Caption: ${heroImage.caption}`);
    lines.push(`Site asset: ${heroImage.src}`);
    lines.push("");
  }

  for (const line of markdown.split(/\r?\n/)) {
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line);
    if (headingMatch) {
      const heading = headingMatch[2].trim();
      lines.push(heading);
      const placement = placementByHeading.get(normalizeHeading(heading));
      const selectedImage =
        placement?.images.find((image) => image.status === "approved-selected") ??
        placement?.images[0];

      if (selectedImage) {
        lines.push("");
        lines.push(`[IMAGE: ${placement?.id ?? selectedImage.placementId}]`);
        lines.push(`Alt: ${selectedImage.altText ?? candidate.title}`);
        lines.push(`Caption: ${selectedImage.caption ?? "Caption needed."}`);
        lines.push(`Site asset: ${selectedImage.publicPath}`);
      } else if (placement) {
        lines.push("");
        lines.push(`[IMAGE NEEDED: ${placement.id}]`);
        lines.push(`Caption: ${placement.heading}`);
      }

      lines.push("");
      continue;
    }

    if (line.trim().startsWith("![")) {
      lines.push(`[IMAGE PLACEHOLDER FROM MARKDOWN: ${line.trim()}]`);
      lines.push("");
      continue;
    }

    if (line.trim() === "---") {
      lines.push("");
      continue;
    }

    lines.push(line);
  }

  lines.push("");
  lines.push("Canonical version:");
  lines.push(`https://davidmieloch.com/blog/${candidate.slug}`);

  return lines
    .join("\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function normalizeImageLookupKey(value: string) {
  return value.replace(/\\/g, "/").trim().toLowerCase();
}

function textFromReactChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromReactChildren).join("");
  }

  return "";
}

function normalizeHeading(value: string) {
  return value
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function groupGeneratedInteriorImages(
  images: GeneratedInteriorImage[],
  requests: GeneratedImageRequest[],
): GeneratedInteriorPlacement[] {
  const placements = new Map<string, GeneratedInteriorPlacement>();
  const requestsByPlacement = new Map<string, GeneratedImageRequest[]>();

  for (const request of requests) {
    const placementRequests = requestsByPlacement.get(request.placementId) ?? [];
    placementRequests.push(request);
    requestsByPlacement.set(request.placementId, placementRequests);
  }

  for (const image of images) {
    const placement = placements.get(image.placementId) ?? {
      id: image.placementId,
      heading: image.targetHeading ?? image.placementId,
      selected: false,
      images: [],
      requests: requestsByPlacement.get(image.placementId) ?? [],
    };

    placement.images.push(image);
    placement.selected =
      placement.selected || image.status === "approved-selected";
    placements.set(image.placementId, placement);
  }

  return Array.from(placements.values()).map((placement) => {
    const fullFrameImages = placement.images.filter(
      (image) => !isContactSheetSlice(image),
    );
    const reviewImages =
      fullFrameImages.length > 0 ? fullFrameImages : placement.images;

    return {
      ...placement,
      images: reviewImages.sort(compareImageChoices),
      requests: [...placement.requests].sort((left, right) =>
        right.requestedAt.localeCompare(left.requestedAt),
      ),
    };
  });
}

function compareImageChoices(
  left: GeneratedInteriorImage,
  right: GeneratedInteriorImage,
) {
  const statusDelta =
    imageStatusRank(left.status) - imageStatusRank(right.status);

  if (statusDelta !== 0) return statusDelta;

  return left.variantId.localeCompare(right.variantId);
}

function imageStatusRank(status: string) {
  if (status === "approved-selected") return 0;
  if (status === "generated-needs-review") return 1;
  if (status === "rejected-not-selected") return 2;
  if (status === "rejected-by-david") return 3;
  return 4;
}

function isContactSheetSlice(image: GeneratedInteriorImage) {
  return (
    image.variantId.includes("contact-sheet") ||
    image.sourcePath.includes("/contact-sheet/") ||
    image.publicPath.includes("/contact-sheet/") ||
    image.status === "generated-contact-sheet-needs-slicing"
  );
}

function draftLabGeneratedImageUrl(image: GeneratedInteriorImage) {
  return `/api/draft-lab/generated-image?path=${encodeURIComponent(
    image.publicPath,
  )}`;
}

function readGeneratedInteriorImages(slug: string): GeneratedInteriorImage[] {
  const manifestPath = draftLabReadableArticleFile(slug, "manifest.json");

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
          "rejected-not-selected",
          "rejected-by-david",
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

function readGeneratedImageRequests(slug: string): GeneratedImageRequest[] {
  const requestsPath = draftLabReadableArticleFile(slug, "requests.json");

  if (!fs.existsSync(requestsPath)) {
    return [];
  }

  try {
    const payload = JSON.parse(fs.readFileSync(requestsPath, "utf8")) as {
      requests?: GeneratedImageRequest[];
    };

    return (payload.requests ?? []).filter(
      (request) => request.slug === slug && request.placementId,
    );
  } catch {
    return [];
  }
}

function draftLabReadableArticleFile(slug: string, fileName: string) {
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

function imageCardStyle(status: string): CSSProperties {
  if (status === "approved-selected") {
    return {
      ...styles.generatedCard,
      ...styles.selectedGeneratedCard,
    };
  }

  if (status === "rejected-not-selected" || status === "rejected-by-david") {
    return {
      ...styles.generatedCard,
      ...styles.rejectedGeneratedCard,
    };
  }

  return styles.generatedCard;
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
    objectFit: "contain",
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
  selectedGeneratedCard: {
    border: "2px solid #245f3d",
    boxShadow: "0 0 0 3px rgba(36, 95, 61, 0.12)",
  },
  rejectedGeneratedCard: {
    opacity: 0.72,
    background: "#f7f0e7",
  },
  generatedImageLink: {
    display: "block",
    overflow: "hidden",
    borderRadius: "8px",
    background: "#120f0b",
  },
  generatedImage: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 9",
    objectFit: "contain",
  },
  generatedCaption: {
    display: "grid",
    gap: "6px",
    color: "#302b25",
    fontSize: "0.88rem",
    lineHeight: 1.38,
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
