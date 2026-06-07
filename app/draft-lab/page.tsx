import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import review from "../../content/distribution/draft-image-review.json";
import approvalPacket from "../../content/distribution/factory-primitives-approval-packet.json";
import factoryPrimitivesLaunch from "../../content/distribution/factory-primitives-launch-plan.json";
import styles from "./DraftLab.module.css";

type DraftImage = {
  id: string;
  src: string;
  sourcePath: string;
  role: string;
};

type DraftCandidate = {
  slug: string;
  title: string;
  collection: string;
  sourceBucket: string;
  relativePath: string;
  wordCount: number;
  imageStatus: string;
  nextImageAction: string;
  promptSeed: string;
  images: DraftImage[];
  decision: {
    status: string;
    reason: string;
    decidedAt: string | null;
    decidedBy: string | null;
  };
};

type ApprovalArticle = {
  slug: string;
  title: string;
  releaseTarget: string;
  website: {
    draftPreviewUrl: string;
    canonicalUrl: string;
  };
  heroImage: {
    publicPath: string;
    caption: string;
  };
  linkedinReveal: {
    scheduledAt: string;
    teaser: string;
    postizChannelStatus: string;
  };
  gates: Array<{
    label: string;
    status: string;
  }>;
};

export const metadata: Metadata = {
  title: "Draft Lab",
  description:
    "Private review surface for unpublished article image readiness.",
  robots: {
    index: false,
    follow: false,
  },
};

const candidates = review.candidates as DraftCandidate[];
const removedCandidates = (review.removedCandidates ?? []) as DraftCandidate[];
const withImages = candidates.filter(
  (candidate) => candidate.images.length > 0,
);
const missingImages = candidates.filter(
  (candidate) => candidate.images.length === 0,
);
const factoryPrimitives = factoryPrimitivesLaunch.articles;
const factoryPrimitiveBlockers = factoryPrimitives.filter(
  (article) => article.blocker,
);
const approvalArticles = approvalPacket.articles as ApprovalArticle[];

export default function DraftLabPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Draft Lab</p>
          <h1 className={styles.title}>Unpublished article image review.</h1>
          <p className={styles.description}>
            Existing vault images are staged here for review. Drafts without
            images are listed with prompt seeds so the next generation pass can
            fill the gaps without guessing.
          </p>
          <div
            className={styles.commandBox}
            aria-label="Draft decision commands"
          >
            <code>
              pnpm draft:decision -- set &lt;slug&gt; remove &quot;reason&quot;
            </code>
            <code>
              pnpm draft:decision -- set &lt;slug&gt; keep &quot;reason&quot;
            </code>
          </div>
        </div>
        <div className={styles.stats} aria-label="Draft image status">
          <span>{review.summary.candidates} candidates</span>
          <span>{review.summary.removedCandidates} marked remove</span>
          <span>{review.summary.withImages} with images</span>
          <span>{review.summary.missingImages} need images</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="factory-primitives">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Next launch batch</p>
          <h2 id="factory-primitives" className={styles.sectionTitle}>
            Factory Primitives
          </h2>
          <p className={styles.sectionDescription}>
            Five linked pieces staged for the next release wave. The visual
            system is 1950s space-western industrial noir: amber machine light,
            frontier astronomy, brass instruments, and restrained blue signals.
          </p>
        </div>
        <figure className={styles.contactSheet}>
          <Image
            src="/draft-lab/_generated/factory-primitives-next-week-contact-sheet.png"
            alt="Factory Primitives article hero contact sheet"
            fill
            priority
            sizes="(max-width: 1220px) 100vw, 1220px"
          />
        </figure>
        <div className={styles.launchList}>
          {factoryPrimitives.map((article) => (
            <article className={styles.launchItem} key={article.slug}>
              <span className={styles.collection}>
                {article.releaseTarget}
              </span>
              <h3>{article.title}</h3>
              <p>{article.caption}</p>
              {article.blocker ? (
                <p className={styles.blocker}>Blocker: {article.blocker}</p>
              ) : null}
              <Link
                className={styles.previewLink}
                href={`/draft-lab/articles/${article.slug}`}
              >
                Preview draft article
              </Link>
            </article>
          ))}
        </div>
        {factoryPrimitiveBlockers.length > 0 ? (
          <p className={styles.batchWarning}>
            {factoryPrimitiveBlockers.length} article needs copy cleanup before
            the batch is launch-ready.
          </p>
        ) : null}
      </section>

      <section className={styles.section} aria-labelledby="approval-packet">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Approval packet</p>
          <h2 id="approval-packet" className={styles.sectionTitle}>
            Ready for launch review
          </h2>
          <p className={styles.sectionDescription}>
            Article preview, hero image, LinkedIn reveal copy, Postiz channel,
            and release time are reconciled here. Public posting still requires
            explicit approval.
          </p>
        </div>
        <div className={styles.approvalStats}>
          <span>{approvalPacket.summary.articles} articles</span>
          <span>
            {approvalPacket.summary.readyForDavidReview} ready for review
          </span>
          <span>{approvalPacket.summary.blocked} blocked</span>
          <span>
            {approvalPacket.summary.approvalGatesPerArticle} gates each
          </span>
        </div>
        <div className={styles.approvalGrid}>
          {approvalArticles.map((article) => (
            <article className={styles.approvalCard} key={article.slug}>
              <figure className={styles.approvalHero}>
                <Image
                  src={article.heroImage.publicPath}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 380px"
                />
              </figure>
              <div className={styles.approvalCopy}>
                <span className={styles.collection}>
                  {formatReleaseDate(article.releaseTarget)}
                </span>
                <h3>{article.title}</h3>
                <p>{article.heroImage.caption}</p>
                <blockquote>{article.linkedinReveal.teaser}</blockquote>
                <div className={styles.gateList} aria-label="Approval gates">
                  {article.gates.map((gate) => (
                    <span key={gate.label}>
                      {gate.label.replace(/-/g, " ")}: {gate.status}
                    </span>
                  ))}
                </div>
                <div className={styles.approvalActions}>
                  <Link
                    className={styles.previewLink}
                    href={article.website.draftPreviewUrl}
                  >
                    Review article
                  </Link>
                  <a
                    className={styles.secondaryLink}
                    href={article.website.canonicalUrl}
                  >
                    Canonical URL
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="generated-concepts">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Generated direction</p>
          <h2 id="generated-concepts" className={styles.sectionTitle}>
            First contact sheet for missing draft art
          </h2>
        </div>
        <figure className={styles.contactSheet}>
          <Image
            src="/draft-lab/_generated/unpublished-concept-contact-sheet.png"
            alt="Concept contact sheet for unpublished article art direction"
            fill
            priority
            sizes="(max-width: 1220px) 100vw, 1220px"
          />
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="existing-images">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Review</p>
          <h2 id="existing-images" className={styles.sectionTitle}>
            Drafts with image candidates
          </h2>
        </div>
        <div className={styles.imageDrafts}>
          {withImages.map((candidate) => (
            <article className={styles.imageCard} key={candidate.slug}>
              <div className={styles.cardCopy}>
                <span className={styles.collection}>
                  {candidate.collection}
                </span>
                <h3>{candidate.title}</h3>
                <span className={styles.decision}>
                  Decision: {candidate.decision.status}
                </span>
                <p>{candidate.nextImageAction}</p>
                <Link
                  className={styles.previewLink}
                  href={`/draft-lab/articles/${candidate.slug}`}
                >
                  Preview draft article
                </Link>
                <code>{candidate.relativePath}</code>
              </div>
              <div className={styles.gallery}>
                {candidate.images.slice(0, 6).map((image) => (
                  <figure key={image.id} className={styles.figure}>
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 50vw, 240px"
                    />
                    <figcaption>{image.role}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="missing-images">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Generate next</p>
          <h2 id="missing-images" className={styles.sectionTitle}>
            Drafts missing images
          </h2>
        </div>
        <div className={styles.missingGrid}>
          {missingImages.map((candidate) => (
            <article
              className={styles.missingCard}
              key={`${candidate.slug}-${candidate.sourceBucket}`}
            >
              <span className={styles.collection}>{candidate.collection}</span>
              <h3>{candidate.title}</h3>
              <span className={styles.decision}>
                Decision: {candidate.decision.status}
              </span>
              <p className={styles.meta}>
                {candidate.wordCount.toLocaleString()} words ·{" "}
                {candidate.sourceBucket}
              </p>
              <p>{candidate.nextImageAction}</p>
              <Link
                className={styles.previewLink}
                href={`/draft-lab/articles/${candidate.slug}`}
              >
                Preview draft article
              </Link>
              <blockquote>{candidate.promptSeed}</blockquote>
            </article>
          ))}
        </div>
      </section>

      {removedCandidates.length > 0 ? (
        <section className={styles.section} aria-labelledby="removed-drafts">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Excluded</p>
            <h2 id="removed-drafts" className={styles.sectionTitle}>
              Marked for removal
            </h2>
          </div>
          <div className={styles.removedList}>
            {removedCandidates.map((candidate) => (
              <article
                className={styles.removedCard}
                key={`${candidate.slug}-${candidate.sourceBucket}`}
              >
                <div>
                  <span className={styles.collection}>
                    {candidate.collection}
                  </span>
                  <h3>{candidate.title}</h3>
                  <p className={styles.meta}>
                    {candidate.wordCount.toLocaleString()} words ·{" "}
                    {candidate.relativePath}
                  </p>
                  {candidate.decision.reason ? (
                    <p>{candidate.decision.reason}</p>
                  ) : null}
                </div>
                <Link
                  className={styles.previewLink}
                  href={`/draft-lab/articles/${candidate.slug}`}
                >
                  Preview removed draft
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function formatReleaseDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(date);
}
