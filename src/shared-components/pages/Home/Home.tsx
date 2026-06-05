"use client";

import Image from "next/image";
import Link from "next/link";

import type { HomeArticleTeaser, HomePageProps } from "./Home.types";
import styles from "./Home.module.css";

const fallbackArticles: HomeArticleTeaser[] = [
  {
    slug: "the-factory",
    title: "The Factory",
    description:
      "The front-door thesis: software work has to be redesigned around agents, not decorated with them.",
    publishedAt: "2026-04-14",
    series: "Golden Hammer",
    coverImage: "/blog/the-factory/images/a2-hero-conceptual.png",
  },
  {
    slug: "the-golden-hammer",
    title: "The Golden Hammer",
    description:
      "The ensemble pattern: sample the design space, synthesize the best answer, move up a floor.",
    publishedAt: "2026-04-15",
    series: "Golden Hammer",
    coverImage: "/blog/the-golden-hammer/images/a1-hero-photorealistic.png",
  },
  {
    slug: "reality-needs-observers",
    title: "Reality Needs Observers",
    description:
      "The governance layer: factories need independent observation before their output can be trusted.",
    publishedAt: "2026-04-30",
    series: "The Observer Series",
    coverImage: "/blog/reality-needs-observers/images/hero.png",
  },
];

const upcomingPosts = [
  "The Filter",
  "The Meter",
  "The Noticers",
  "The Credibility Problem",
  "The Crew",
];

const operatingLanes = [
  {
    label: "Canonical archive",
    value: "20 essays",
    text: "Factory-era writing and selected legacy work are collected on the site first.",
  },
  {
    label: "Distribution",
    value: "Multi-surface",
    text: "DEV drafts are staged; Medium, HackerNoon, DZone, Substack, Hashnode, and Reddit route back here.",
  },
  {
    label: "Next wave",
    value: "June series",
    text: "New posts focus on cost, credibility, noticing, crews, and what survives the factory transition.",
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export const Home: React.FC<HomePageProps> = ({
  launchArticles = [],
  onReady,
}) => {
  const visualArticles =
    launchArticles.length > 0 ? launchArticles : fallbackArticles;
  const featuredSlugs = new Set([
    "the-factory",
    "the-golden-hammer",
    "reality-needs-observers",
  ]);
  const featuredArticles = visualArticles
    .filter((article) => featuredSlugs.has(article.slug))
    .slice(0, 3);
  const magazineArticles = visualArticles
    .filter((article) => !featuredSlugs.has(article.slug))
    .slice(0, 7);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>David Mieloch / AI Architect</p>
          <h1 id="home-title" className={styles.title}>
            I build software factories.
          </h1>
          <p className={styles.lede}>
            Brain Garden is the operating system: agents, governance,
            observability, and human judgment arranged into a factory that keeps
            working after the individual task is done.
          </p>
          <div className={styles.actions}>
            <Link href="/blog/the-factory" className={styles.primaryAction}>
              Read the factory thesis
            </Link>
            <Link href="/blog" className={styles.secondaryAction}>
              Browse the writing
            </Link>
            <a
              href="https://singularity-labs.org"
              className={styles.tertiaryAction}
            >
              Work with Singularity Labs
            </a>
          </div>
        </div>

        <div className={styles.posterWrap} aria-label="Dark software factory">
          <Image
            src="/blog/the-factory/images/a2-hero-conceptual.png"
            alt="Cinematic AI software factory with glowing machinery and conveyor rails"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            priority
            className={styles.posterImage}
            onLoad={onReady}
          />
          <div className={styles.posterOverlay} />
          <div className={styles.posterLabel}>
            <span className={styles.posterKicker}>Launch frame</span>
            <strong className={styles.posterTitle}>
              Dark Software Factory
            </strong>
            <span className={styles.posterMeta}>
              The trailer can arrive after the site is live.
            </span>
          </div>
        </div>
      </section>

      <section className={styles.visualShelf} aria-label="Illustrated articles">
        <div className={styles.shelfLead}>
          <p className={styles.eyebrow}>Featured archive</p>
          <h2 className={styles.shelfTitle}>
            The writing already has a visual world.
          </h2>
        </div>
        <div className={styles.shelfGrid}>
          {magazineArticles.map((article, index) => (
            <Link
              href={`/blog/${article.slug}`}
              className={`${styles.shelfCard} ${index === 0 ? styles.shelfCardLarge : ""}`}
              key={article.slug}
            >
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt=""
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 900px) 100vw, 42vw"
                      : "(max-width: 900px) 50vw, 20vw"
                  }
                  className={styles.shelfImage}
                />
              ) : null}
              <span className={styles.shelfTint} />
              <span className={styles.shelfText}>
                <span className={styles.shelfMeta}>
                  {article.series ?? formatDate(article.publishedAt)}
                </span>
                <strong>{article.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.statementBand} aria-label="Positioning">
        <p className={styles.statement}>
          The old site was about learning to talk to AI. The new site is about
          designing the factory that turns direction into shipped systems.
        </p>
        <p className={styles.statementNote}>
          Consulting work happens through{" "}
          <a href="https://singularity-labs.org">Singularity Labs</a>: custom AI
          factory design, factory builds, and foreman training.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="proof-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Start here</p>
          <h2 id="proof-title" className={styles.sectionTitle}>
            The current canon
          </h2>
        </div>
        <div className={styles.articleGrid}>
          {featuredArticles.map((article) => (
            <Link
              href={`/blog/${article.slug}`}
              className={styles.articleCard}
              key={article.title}
            >
              {article.coverImage ? (
                <span className={styles.articleImageWrap}>
                  <Image
                    src={article.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 32vw"
                    className={styles.articleImage}
                  />
                </span>
              ) : null}
              <span className={styles.articleMeta}>
                {article.series ?? formatDate(article.publishedAt)}
              </span>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleText}>{article.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.darkBand} aria-labelledby="pipeline-title">
        <div className={styles.darkInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.darkEyebrow}>Launch pipeline</p>
            <h2 id="pipeline-title" className={styles.darkTitle}>
              The site becomes the source of truth.
            </h2>
          </div>
          <div className={styles.laneGrid}>
            {operatingLanes.map((lane) => (
              <div className={styles.lane} key={lane.label}>
                <span className={styles.laneLabel}>{lane.label}</span>
                <strong className={styles.laneValue}>{lane.value}</strong>
                <p className={styles.laneText}>{lane.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="next-title">
        <div className={styles.nextLayout}>
          <div>
            <p className={styles.eyebrow}>Next series</p>
            <h2 id="next-title" className={styles.sectionTitle}>
              The June wave is about what survives when the factory works.
            </h2>
            <p className={styles.sectionText}>
              The upcoming posts shift from proving the factory exists to
              explaining the operating consequences: cost filters, credibility
              gaps, first-class noticing, and the temporary nature of the human
              foreman role.
            </p>
          </div>
          <ol className={styles.postList}>
            {upcomingPosts.map((post) => (
              <li className={styles.postItem} key={post}>
                {post}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
};

export default Home;
