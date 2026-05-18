import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { afterEach, describe, expect, it } from 'vitest';

const contentRoot = join(process.cwd(), '..', 'content-test-fixture');
const articlesRoot = join(contentRoot, 'articles');

process.env.CONTENT_ARTICLES_ROOT = articlesRoot;

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
});
