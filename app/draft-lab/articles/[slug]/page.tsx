import fs from 'node:fs';
import path from 'node:path';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import type { CSSProperties } from 'react';
import type { Metadata } from 'next';

import review from '../../../../content/distribution/draft-image-review.json';

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
};

const candidates = review.candidates as DraftCandidate[];

export const metadata: Metadata = {
  title: 'Draft Article Preview',
  description: 'Private noindex preview for unpublished article drafts.',
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return candidates.map((candidate) => ({ slug: candidate.slug }));
}

export default async function DraftArticlePreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const candidate = candidates.find((item) => item.slug === slug);

  if (!candidate) {
    notFound();
  }

  const sourcePath = path.join(process.cwd(), candidate.previewMarkdownPath);

  if (!fs.existsSync(sourcePath)) {
    notFound();
  }

  const markdown = stripFrontmatter(fs.readFileSync(sourcePath, 'utf8'));

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <Link href="/draft-lab" style={styles.backLink}>Back to draft lab</Link>
      </nav>
      <article>
        <header style={styles.header}>
          <p style={styles.eyebrow}>Unpublished draft · {candidate.collection}</p>
          <h1 style={styles.title}>{candidate.title}</h1>
          <div style={styles.statusGrid} aria-label="Draft status">
            <span>{candidate.wordCount.toLocaleString()} words</span>
            <span>{candidate.imageStatus}</span>
            <span>{candidate.sourceBucket}</span>
          </div>
          <p style={styles.source}>{candidate.relativePath}</p>
          <blockquote style={styles.prompt}>{candidate.promptSeed}</blockquote>
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
            blockquote: ({ children }) => <blockquote style={styles.blockquote}>{children}</blockquote>,
            ul: ({ children }) => <ul style={styles.list}>{children}</ul>,
            ol: ({ children }) => <ol style={styles.list}>{children}</ol>,
            li: ({ children }) => <li style={styles.listItem}>{children}</li>,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n\n?/, '').trim();
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '116px 24px 92px',
    color: '#171717',
  },
  nav: {
    marginBottom: '24px',
  },
  backLink: {
    color: '#4451a4',
    fontWeight: 900,
    textDecoration: 'none',
  },
  header: {
    borderBottom: '1px solid #dedede',
    paddingBottom: '28px',
    marginBottom: '34px',
  },
  eyebrow: {
    margin: '0 0 12px',
    color: '#4451a4',
    fontSize: '0.78rem',
    fontWeight: 900,
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    fontSize: 'clamp(2.2rem, 7vw, 4.6rem)',
    lineHeight: 0.98,
    letterSpacing: 0,
  },
  statusGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '18px',
  },
  source: {
    margin: '18px 0 0',
    color: '#666',
    overflowWrap: 'anywhere',
    fontSize: '0.88rem',
  },
  prompt: {
    margin: '18px 0 0',
    padding: '14px 16px',
    borderLeft: '3px solid #4451a4',
    background: '#f3f0ec',
    color: '#333',
    lineHeight: 1.5,
  },
  markdownH1: {
    margin: '36px 0 12px',
    fontSize: '2rem',
    lineHeight: 1.1,
  },
  markdownH2: {
    margin: '34px 0 12px',
    fontSize: '1.72rem',
    lineHeight: 1.15,
  },
  markdownH3: {
    margin: '28px 0 10px',
    fontSize: '1.28rem',
    lineHeight: 1.22,
  },
  paragraph: {
    margin: '0 0 18px',
    color: '#303030',
    fontSize: '1.06rem',
    lineHeight: 1.72,
  },
  markdownLink: {
    color: '#4451a4',
    fontWeight: 800,
  },
  blockquote: {
    margin: '24px 0',
    padding: '6px 0 6px 18px',
    borderLeft: '3px solid #c8c8c8',
    color: '#444',
  },
  list: {
    margin: '0 0 22px',
    paddingLeft: '24px',
  },
  listItem: {
    marginBottom: '8px',
    lineHeight: 1.6,
  },
};
