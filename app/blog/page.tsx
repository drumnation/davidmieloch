import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import type { Article } from '../../src/content/articles';
import { getPublishedArticles, getSiteUrl } from '../../src/content/articles';
import { NewsletterSignup } from '../../src/shared-components/organisms/NewsletterSignup/NewsletterSignup';
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

function groupByYear(articles: Article[]) {
  return articles.reduce<Array<{ year: number; era: Article['era']; articles: Article[] }>>(
    (groups, article) => {
      const existing = groups.find((group) => group.year === article.publishedYear);

      if (existing) {
        existing.articles.push(article);
        return groups;
      }

      return [
        ...groups,
        {
          year: article.publishedYear,
          era: article.era,
          articles: [article],
        },
      ];
    },
    [],
  );
}

function MetaLine({ article }: { article: Article }) {
  return (
    <span className={styles.metaLine}>
      <span>{article.publishedYear}</span>
      <span>{article.era.shortLabel}</span>
      {article.series ? <span>{article.series}</span> : null}
    </span>
  );
}

export default function BlogPage() {
  const articles = getPublishedArticles();
  const [leadArticle, ...restArticles] = articles;
  const featuredArticles = restArticles.slice(0, 4);
  const yearGroups = groupByYear(articles);

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
          <span>{yearGroups.length} years</span>
          <span>Audio queue open</span>
        </div>
      </section>

      <section className={styles.signupSlot} aria-label="Email updates">
        <NewsletterSignup
          placement="blog-index-top"
          tone="dark"
          title="Get the next essay when it goes live."
          description="The archive is being rebuilt around the factory thesis. Join the list for new essays, audio versions, and launch notes."
        />
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
            <p className={styles.cardMeta}>{leadArticle.era.label}</p>
            <MetaLine article={leadArticle} />
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
            <span className={styles.cardMeta}>{article.era.shortLabel}</span>
            <MetaLine article={article} />
            <strong className={styles.featuredTitle}>{article.title}</strong>
          </Link>
        ))}
      </section>

      <section className={styles.signupSlot} aria-label="Email updates">
        <NewsletterSignup
          placement="blog-index-after-featured"
          tone="dark"
          title="Stay close to the next series."
          description="Factory primitives, observer roles, and the operating model are becoming a sequence. I’ll send the useful pieces as they land."
          ctaLabel="Send me the series"
        />
      </section>

      <section className={styles.archive} aria-label="Article archive">
        <div className={styles.archiveHeader}>
          <p className={styles.eyebrow}>Archive</p>
          <h2 className={styles.archiveTitle}>Writing by year</h2>
          <p className={styles.archiveIntro}>
            The date is part of the argument. Older pieces stay visible as artifacts of the thinking at that time, while newer work carries the current factory thesis.
          </p>
        </div>
        <div className={styles.archiveList}>
          {yearGroups.map((group) => (
            <section key={group.year} className={styles.yearSection} aria-labelledby={`year-${group.year}`}>
              <div className={styles.yearHeader}>
                <h3 id={`year-${group.year}`} className={styles.yearTitle}>{group.year}</h3>
                <div className={styles.yearCopy}>
                  <p className={styles.yearEra}>{group.era.label}</p>
                  <p className={styles.yearDescription}>{group.era.description}</p>
                </div>
              </div>
              <div className={styles.yearArticles}>
                {group.articles.map((article) => (
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
                      <h4 className={styles.articleTitle}>
                        <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                      </h4>
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
          ))}
        </div>
      </section>
    </main>
  );
}
