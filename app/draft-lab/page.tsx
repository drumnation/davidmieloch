import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import review from '../../content/distribution/draft-image-review.json';
import styles from './DraftLab.module.css';

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

export const metadata: Metadata = {
  title: 'Draft Lab',
  description: 'Private review surface for unpublished article image readiness.',
  robots: {
    index: false,
    follow: false,
  },
};

const candidates = review.candidates as DraftCandidate[];
const removedCandidates = (review.removedCandidates ?? []) as DraftCandidate[];
const withImages = candidates.filter((candidate) => candidate.images.length > 0);
const missingImages = candidates.filter((candidate) => candidate.images.length === 0);

export default function DraftLabPage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Draft Lab</p>
          <h1 className={styles.title}>Unpublished article image review.</h1>
          <p className={styles.description}>
            Existing vault images are staged here for review. Drafts without images are listed with prompt seeds so the next generation pass can fill the gaps without guessing.
          </p>
          <div className={styles.commandBox} aria-label="Draft decision commands">
            <code>pnpm draft:decision -- set &lt;slug&gt; remove &quot;reason&quot;</code>
            <code>pnpm draft:decision -- set &lt;slug&gt; keep &quot;reason&quot;</code>
          </div>
        </div>
        <div className={styles.stats} aria-label="Draft image status">
          <span>{review.summary.candidates} candidates</span>
          <span>{review.summary.removedCandidates} marked remove</span>
          <span>{review.summary.withImages} with images</span>
          <span>{review.summary.missingImages} need images</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="generated-concepts">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Generated direction</p>
          <h2 id="generated-concepts" className={styles.sectionTitle}>First contact sheet for missing draft art</h2>
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
          <h2 id="existing-images" className={styles.sectionTitle}>Drafts with image candidates</h2>
        </div>
        <div className={styles.imageDrafts}>
          {withImages.map((candidate) => (
            <article className={styles.imageCard} key={candidate.slug}>
              <div className={styles.cardCopy}>
                <span className={styles.collection}>{candidate.collection}</span>
                <h3>{candidate.title}</h3>
                <span className={styles.decision}>Decision: {candidate.decision.status}</span>
                <p>{candidate.nextImageAction}</p>
                <Link className={styles.previewLink} href={`/draft-lab/articles/${candidate.slug}`}>
                  Preview draft article
                </Link>
                <code>{candidate.relativePath}</code>
              </div>
              <div className={styles.gallery}>
                {candidate.images.slice(0, 6).map((image) => (
                  <figure key={image.id} className={styles.figure}>
                    <Image src={image.src} alt="" fill sizes="(max-width: 900px) 50vw, 240px" />
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
          <h2 id="missing-images" className={styles.sectionTitle}>Drafts missing images</h2>
        </div>
        <div className={styles.missingGrid}>
          {missingImages.map((candidate) => (
            <article className={styles.missingCard} key={`${candidate.slug}-${candidate.sourceBucket}`}>
              <span className={styles.collection}>{candidate.collection}</span>
              <h3>{candidate.title}</h3>
              <span className={styles.decision}>Decision: {candidate.decision.status}</span>
              <p className={styles.meta}>{candidate.wordCount.toLocaleString()} words · {candidate.sourceBucket}</p>
              <p>{candidate.nextImageAction}</p>
              <Link className={styles.previewLink} href={`/draft-lab/articles/${candidate.slug}`}>
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
            <h2 id="removed-drafts" className={styles.sectionTitle}>Marked for removal</h2>
          </div>
          <div className={styles.removedList}>
            {removedCandidates.map((candidate) => (
              <article className={styles.removedCard} key={`${candidate.slug}-${candidate.sourceBucket}`}>
                <div>
                  <span className={styles.collection}>{candidate.collection}</span>
                  <h3>{candidate.title}</h3>
                  <p className={styles.meta}>{candidate.wordCount.toLocaleString()} words · {candidate.relativePath}</p>
                  {candidate.decision.reason ? <p>{candidate.decision.reason}</p> : null}
                </div>
                <Link className={styles.previewLink} href={`/draft-lab/articles/${candidate.slug}`}>
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
