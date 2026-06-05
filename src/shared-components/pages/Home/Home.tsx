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
    label: "For builders",
    value: "Start with the factory",
    text: "A practical path from prompt stacks and scripts toward durable agent workflows.",
  },
  {
    label: "For leaders",
    value: "See the operating model",
    text: "A clearer way to judge whether AI work is becoming capability or just theater.",
  },
  {
    label: "For teams",
    value: "Build the substrate",
    text: "Governance, observability, memory, and roles that make agent output trustworthy.",
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
            David Mieloch designs AI-native systems where agents, tools,
            governance, observability, and human judgment work together as
            durable production machinery.
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
            <span className={styles.posterKicker}>Featured thesis</span>
            <strong className={styles.posterTitle}>
              Dark Software Factory
            </strong>
            <span className={styles.posterMeta}>
              A visual language for the next era of software work.
            </span>
          </div>
        </div>
      </section>

      <section className={styles.visualShelf} aria-label="Illustrated articles">
        <div className={styles.shelfLead}>
          <p className={styles.eyebrow}>Featured archive</p>
          <h2 className={styles.shelfTitle}>
            Essays for the factory era of software.
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
          The question is no longer whether AI can help write code. The
          question is whether the surrounding system can turn that speed into
          trustworthy, repeatable outcomes.
        </p>
        <p className={styles.statementNote}>
          Through <a href="https://singularity-labs.org">Singularity Labs</a>,
          David helps teams design the operating model, tools, and governance
          needed to run AI-assisted software work with confidence.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="proof-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Start here</p>
          <h2 id="proof-title" className={styles.sectionTitle}>
            Three ways into the work
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
            <p className={styles.darkEyebrow}>What this is about</p>
            <h2 id="pipeline-title" className={styles.darkTitle}>
              From AI assistance to AI production.
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
              The next essays go deeper into factory operations.
            </h2>
            <p className={styles.sectionText}>
              Upcoming writing explores the practical consequences of agentic
              software work: what should be filtered, what must be measured,
              what needs independent observation, and how teams should evolve
              as more of the workflow becomes automated.
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
