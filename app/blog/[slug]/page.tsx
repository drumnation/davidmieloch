import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { CSSProperties } from "react";

import {
  getPublishedArticle,
  getPublishedArticles,
  getSiteUrl,
} from "../../../src/content/articles";
import { NewsletterSignup } from "../../../src/shared-components/organisms/NewsletterSignup/NewsletterSignup";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: article.canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: article.canonicalUrl,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.coverImage ? [{ url: article.coverImage }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main style={styles.page}>
      <article>
        <header style={styles.header}>
          <p style={styles.eyebrow}>{article.series ?? "Essay"}</p>
          <h1 style={styles.title}>{article.title}</h1>
          <p style={styles.description}>{article.description}</p>
          <div style={styles.eraPanel} aria-label="Writing era">
            <strong style={styles.eraYear}>{article.publishedYear}</strong>
            <div>
              <p style={styles.eraLabel}>{article.era.label}</p>
              <p style={styles.eraDescription}>{article.era.description}</p>
            </div>
          </div>
          <div style={styles.meta}>
            <time dateTime={article.publishedAt}>
              {new Intl.DateTimeFormat("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(article.publishedAt))}
            </time>
            {article.sourcePlatform ? (
              <span>Source: {article.sourcePlatform}</span>
            ) : null}
          </div>
        </header>

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
                src={src ?? ""}
                alt={alt ?? ""}
                style={styles.image}
                loading="lazy"
              />
            ),
            blockquote: ({ children }) => (
              <blockquote style={styles.blockquote}>{children}</blockquote>
            ),
            ul: ({ children }) => <ul style={styles.list}>{children}</ul>,
            ol: ({ children }) => <ol style={styles.list}>{children}</ol>,
            li: ({ children }) => <li style={styles.listItem}>{children}</li>,
            hr: () => <hr style={styles.hr} />,
          }}
        >
          {article.body}
        </ReactMarkdown>

        <div style={styles.signupSlot}>
          <NewsletterSignup
            placement={`article-footer-${article.slug}`}
            tone="light"
            title="Want the next piece in this thread?"
            description="Join the list for new essays, audio versions, and practical notes from the factory work."
            ctaLabel="Follow the thread"
          />
        </div>

        {article.channels.includes("singularity-labs") ? (
          <aside
            style={styles.singularityLabsCta}
            aria-label="Singularity Labs consulting"
          >
            <p style={styles.ctaEyebrow}>Singularity Labs</p>
            <h2 style={styles.ctaTitle}>Need a factory for your own team?</h2>
            <p style={styles.ctaText}>
              {article.singularityLabsCta ??
                "Singularity Labs designs custom AI factories and trains the foreman who keeps them running."}
            </p>
            <a href="https://singularity-labs.org" style={styles.ctaLink}>
              Talk through a Factory Sketch
            </a>
          </aside>
        ) : null}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt ?? article.publishedAt,
            mainEntityOfPage: article.canonicalUrl,
            author: {
              "@type": "Person",
              name: "David Mieloch",
              url: getSiteUrl(),
            },
          }),
        }}
      />
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: "820px",
    margin: "0 auto",
    padding: "128px 24px 88px",
    color: "#171717",
  },
  header: {
    borderBottom: "1px solid #dedede",
    paddingBottom: "30px",
    marginBottom: "34px",
  },
  eyebrow: {
    margin: "0 0 12px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#4451a4",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2.2rem, 7vw, 4.4rem)",
    lineHeight: 0.98,
    letterSpacing: 0,
  },
  description: {
    margin: "20px 0 0",
    color: "#444",
    fontSize: "1.14rem",
    lineHeight: 1.58,
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "18px",
    color: "#666",
    fontSize: "0.9rem",
  },
  eraPanel: {
    display: "grid",
    gridTemplateColumns: "86px minmax(0, 1fr)",
    gap: "16px",
    marginTop: "22px",
    padding: "16px",
    border: "1px solid #dedede",
    borderRadius: "8px",
    background: "#f7f3ed",
  },
  eraYear: {
    color: "#171717",
    fontSize: "1.8rem",
    lineHeight: 1,
  },
  eraLabel: {
    margin: 0,
    color: "#4451a4",
    fontSize: "0.82rem",
    fontWeight: 800,
    textTransform: "uppercase",
  },
  eraDescription: {
    margin: "6px 0 0",
    color: "#444",
    lineHeight: 1.48,
  },
  markdownH1: {
    margin: "38px 0 14px",
    fontSize: "1.75rem",
    lineHeight: 1.15,
    letterSpacing: 0,
  },
  markdownH2: {
    margin: "38px 0 14px",
    fontSize: "1.55rem",
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  markdownH3: {
    margin: "28px 0 10px",
    fontSize: "1.2rem",
    lineHeight: 1.25,
    letterSpacing: 0,
  },
  paragraph: {
    margin: "0 0 20px",
    color: "#242424",
    fontSize: "1.04rem",
    lineHeight: 1.78,
  },
  markdownLink: {
    color: "#3445b4",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto",
    margin: "32px 0",
    borderRadius: "6px",
  },
  blockquote: {
    margin: "28px 0",
    paddingLeft: "18px",
    borderLeft: "3px solid #4451a4",
    color: "#333",
  },
  list: {
    margin: "0 0 22px 22px",
    padding: 0,
    color: "#242424",
    lineHeight: 1.72,
  },
  listItem: {
    marginBottom: "8px",
  },
  hr: {
    border: 0,
    borderTop: "1px solid #e2e2e2",
    margin: "34px 0",
  },
  signupSlot: {
    marginTop: "46px",
  },
  singularityLabsCta: {
    marginTop: "46px",
    padding: "24px",
    border: "1px solid #dedede",
    borderRadius: "8px",
    background: "#17191d",
    color: "#f8efe0",
  },
  ctaEyebrow: {
    margin: "0 0 10px",
    color: "#ffbd68",
    fontSize: "0.76rem",
    fontWeight: 800,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  ctaTitle: {
    margin: 0,
    color: "#f8efe0",
    fontSize: "1.65rem",
    lineHeight: 1.1,
    letterSpacing: 0,
  },
  ctaText: {
    margin: "14px 0 0",
    color: "#dfd3c2",
    fontSize: "1rem",
    lineHeight: 1.58,
  },
  ctaLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "42px",
    marginTop: "18px",
    padding: "0 14px",
    borderRadius: "6px",
    background: "#f8efe0",
    color: "#161412",
    fontWeight: 900,
    textDecoration: "none",
  },
};
