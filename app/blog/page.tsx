import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { getPublishedArticles, getSiteUrl } from '../../src/content/articles';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays and field notes on AI-native software work, agents, engineering judgment, and developer tools.',
  alternates: {
    canonical: `${getSiteUrl()}/blog`,
    types: {
      'application/rss+xml': `${getSiteUrl()}/rss.xml`,
    },
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

export default function BlogPage() {
  const articles = getPublishedArticles();
  const [leadArticle, ...restArticles] = articles;
  const featuredArticles = restArticles.slice(0, 4);
  const archiveArticles = restArticles.slice(4);

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={styles.eyebrow}>Writing</p>
          <h1 className={styles.title}>Field notes from the software factory.</h1>
          <p className={styles.description}>
            The current canon starts with agents, governance, dark factories, and the work that survives when the tools keep moving.
          </p>
        </div>
        <div className={styles.headerStats} aria-label="Archive status">
          <span>{articles.length} essays</span>
          <span>Factory first</span>
          <span>Audio queue open</span>
        </div>
      </section>

      {leadArticle ? (
        <section className={styles.lead} aria-label="Lead essay">
          <Link href={`/blog/${leadArticle.slug}`} className={styles.leadImageLink}>
            {leadArticle.coverImage ? (
              <Image
                src={leadArticle.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.leadImage}
              />
            ) : null}
            <span className={styles.imageShade} />
          </Link>
          <div className={styles.leadCopy}>
            <p className={styles.cardMeta}>{leadArticle.series ?? formatDate(leadArticle.publishedAt)}</p>
            <h2 className={styles.leadTitle}>
              <Link href={`/blog/${leadArticle.slug}`}>{leadArticle.title}</Link>
            </h2>
            <p className={styles.leadSummary}>{leadArticle.description}</p>
            <Link href={`/blog/${leadArticle.slug}`} className={styles.readLink}>
              Read the essay
            </Link>
          </div>
        </section>
      ) : null}

      <section className={styles.featuredGrid} aria-label="Featured essays">
        {featuredArticles.map((article) => (
          <Link href={`/blog/${article.slug}`} className={styles.featuredCard} key={article.slug}>
            <span className={styles.featuredImageWrap}>
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 50vw, 24vw"
                  className={styles.featuredImage}
                />
              ) : null}
            </span>
            <span className={styles.cardMeta}>{article.series ?? formatDate(article.publishedAt)}</span>
            <strong className={styles.featuredTitle}>{article.title}</strong>
          </Link>
        ))}
      </section>

      <section className={styles.archive} aria-label="Article archive">
        <div className={styles.archiveHeader}>
          <p className={styles.eyebrow}>Archive</p>
          <h2 className={styles.archiveTitle}>All published writing</h2>
        </div>
        <div className={styles.archiveList}>
          {archiveArticles.map((article) => (
            <article key={article.slug} className={styles.archiveCard}>
              <Link href={`/blog/${article.slug}`} className={styles.archiveImageLink}>
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 180px"
                    className={styles.archiveImage}
                  />
                ) : null}
              </Link>
              <div className={styles.archiveCopy}>
                <div className={styles.meta}>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                  {article.series ? <span>{article.series}</span> : null}
                </div>
                <h3 className={styles.articleTitle}>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className={styles.summary}>{article.description}</p>
                <div className={styles.tags}>
                  {article.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
