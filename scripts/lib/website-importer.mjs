import fs from 'node:fs';
import path from 'node:path';

function frontmatterValue(value) {
  if (Array.isArray(value)) return `[${value.map((item) => JSON.stringify(item)).join(', ')}]`;
  return JSON.stringify(value ?? '');
}

function descriptionFromBody(body) {
  const text = body
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]*]\(([^)]*)\)/g, '$1')
    .replace(/[#>*_`-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= 180) return text;
  return `${text.slice(0, 180).replace(/\s+\S*$/, '')}...`;
}

function websiteFrontmatter(article, options = {}) {
  const canonicalUrl = options.canonicalUrl ?? `https://davidmieloch.com/blog/${article.slug}`;
  const entries = {
    title: article.title,
    description: options.description ?? descriptionFromBody(article.body),
    publishedAt: options.publishedAt ?? article.date,
    status: options.status ?? 'published',
    sourcePlatform: options.sourcePlatform ?? 'linkedin',
    sourceUrl: options.sourceUrl ?? '',
    canonicalUrl,
    series: options.series ?? 'AI Factory',
    tags: options.tags ?? article.tags,
  };

  if (article.images[0]) {
    entries.coverImage = article.images[0].publicPath;
  }

  return `---\n${Object.entries(entries)
    .map(([key, value]) => `${key}: ${frontmatterValue(value)}`)
    .join('\n')}\n---`;
}

function existingArticleIsPlaceholder(filePath) {
  if (!fs.existsSync(filePath)) return false;
  return fs.readFileSync(filePath, 'utf8').includes('LinkedIn source capture pending');
}

export function importWebsiteArticle({
  article,
  articlesRoot,
  publicRoot,
  overwrite = false,
  options = {},
}) {
  const articleRoot = path.join(articlesRoot, article.slug);
  const articlePath = path.join(articleRoot, 'index.md');
  const mayOverwrite = overwrite || existingArticleIsPlaceholder(articlePath);
  if (fs.existsSync(articlePath) && !mayOverwrite) {
    throw new Error(`Refusing to overwrite existing non-placeholder article: ${articlePath}`);
  }

  const imageRoot = path.join(publicRoot, 'blog', article.slug, 'images');
  fs.mkdirSync(articleRoot, { recursive: true });
  fs.mkdirSync(imageRoot, { recursive: true });

  const copiedImages = [];
  for (const image of article.images) {
    if (!fs.existsSync(image.sourcePath)) {
      throw new Error(`Missing Obsidian image: ${image.sourcePath}`);
    }
    const destination = path.join(imageRoot, image.fileName);
    fs.copyFileSync(image.sourcePath, destination);
    copiedImages.push({
      sourcePath: image.sourcePath,
      publicPath: image.publicPath,
    });
  }

  const markdown = `${websiteFrontmatter(article, options)}\n\n${article.body.trim()}\n`;
  fs.writeFileSync(articlePath, markdown);

  return {
    slug: article.slug,
    articlePath,
    copiedImages,
  };
}
