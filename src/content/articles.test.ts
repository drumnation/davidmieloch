import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { afterEach, describe, expect, it } from 'vitest';

const contentRoot = join(process.cwd(), '..', 'content-test-fixture');
const articlesRoot = join(contentRoot, 'articles');
const publicRoot = join(contentRoot, 'public');

process.env.CONTENT_ARTICLES_ROOT = articlesRoot;
process.env.CONTENT_PUBLIC_ROOT = publicRoot;

afterEach(() => {
  rmSync(contentRoot, { recursive: true, force: true });
});

function writeArticle(slug: string, frontmatter: string, body: string) {
  const directory = join(articlesRoot, slug);
  mkdirSync(directory, { recursive: true });
  writeFileSync(
    join(directory, 'index.md'),
    `---\n${frontmatter.trim()}\n---\n\n${body}`,
    'utf8',
  );
}

describe('article content loader', () => {
  it('loads markdown articles with simple frontmatter sorted newest first', async () => {
    const { getAllArticles, getPublishedArticles } = await import('./articles');

    writeArticle(
      'older-draft',
      `
title: "Older Draft"
description: "Draft article"
publishedAt: "2026-01-01"
status: "draft"
canonicalUrl: "https://davidmieloch.com/blog/older-draft"
tags: ["draft", "internal"]
`,
      'Draft body',
    );
    writeArticle(
      'newer-published',
      `
title: "Newer Published"
description: "Published article"
publishedAt: "2026-02-01"
status: "published"
canonicalUrl: "https://davidmieloch.com/blog/newer-published"
sourcePlatform: "linkedin"
sourceUrl: ""
series: "Observer"
tags: ["ai", "agents"]
coverImage: "/blog/newer-published/cover.png"
`,
      '# Published body',
    );

    expect(getAllArticles().map((article) => article.slug)).toEqual([
      'newer-published',
      'older-draft',
    ]);
    expect(getPublishedArticles()).toMatchObject([
      {
        slug: 'newer-published',
        title: 'Newer Published',
        tags: ['ai', 'agents'],
        body: '# Published body',
      },
    ]);
  });

  it('derives a cover image from the public article image folder', async () => {
    const { getPublishedArticle } = await import('./articles');

    writeArticle(
      'derived-cover',
      `
title: "Derived Cover"
description: "Article with image assets"
publishedAt: "2026-03-01"
status: "published"
canonicalUrl: "https://davidmieloch.com/blog/derived-cover"
tags: ["assets"]
`,
      'Article body',
    );

    const imageDirectory = join(publicRoot, 'blog', 'derived-cover', 'images');
    mkdirSync(imageDirectory, { recursive: true });
    writeFileSync(join(imageDirectory, 'medium-01.png'), '');
    writeFileSync(join(imageDirectory, 'hero-panel.png'), '');

    expect(getPublishedArticle('derived-cover')?.coverImage).toBe(
      '/blog/derived-cover/images/hero-panel.png',
    );
  });
});
