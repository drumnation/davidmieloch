import Link from 'next/link';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

import { getPublishedArticles, getSiteUrl } from '../../src/content/articles';

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

export default function BlogPage() {
  const articles = getPublishedArticles();

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <p style={styles.eyebrow}>Writing</p>
        <h1 style={styles.title}>Field notes from AI-native software work.</h1>
        <p style={styles.description}>
          Essays about agents, developer tools, software factories, and the strange parts of building while the tools are changing underneath us.
        </p>
      </section>

      <section style={styles.list} aria-label="Articles">
        {articles.map((article) => (
          <article key={article.slug} style={styles.card}>
            <div style={styles.meta}>
              <time dateTime={article.publishedAt}>
                {new Intl.DateTimeFormat('en', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  timeZone: 'UTC',
                }).format(new Date(article.publishedAt))}
              </time>
              {article.series ? <span>{article.series}</span> : null}
            </div>
            <h2 style={styles.articleTitle}>
              <Link href={`/blog/${article.slug}`} style={styles.link}>
                {article.title}
              </Link>
            </h2>
            <p style={styles.summary}>{article.description}</p>
            <div style={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} style={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: '920px',
    margin: '0 auto',
    padding: '128px 24px 80px',
    color: '#141414',
  },
  header: {
    borderBottom: '1px solid #dedede',
    paddingBottom: '32px',
    marginBottom: '28px',
  },
  eyebrow: {
    margin: '0 0 12px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#4451a4',
  },
  title: {
    margin: 0,
    maxWidth: '760px',
    fontSize: 'clamp(2.1rem, 6vw, 4rem)',
    lineHeight: 1,
    letterSpacing: 0,
  },
  description: {
    maxWidth: '680px',
    margin: '20px 0 0',
    color: '#4d4d4d',
    fontSize: '1.08rem',
    lineHeight: 1.6,
  },
  list: {
    display: 'grid',
    gap: '0',
  },
  card: {
    padding: '28px 0',
    borderBottom: '1px solid #e7e7e7',
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '10px',
    color: '#666',
    fontSize: '0.88rem',
  },
  articleTitle: {
    margin: 0,
    fontSize: '1.55rem',
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  link: {
    color: '#111',
    textDecoration: 'none',
  },
  summary: {
    maxWidth: '720px',
    margin: '10px 0 0',
    color: '#424242',
    lineHeight: 1.6,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '14px',
  },
  tag: {
    border: '1px solid #d7d7d7',
    borderRadius: '999px',
    padding: '4px 9px',
    color: '#555',
    fontSize: '0.78rem',
  },
};
