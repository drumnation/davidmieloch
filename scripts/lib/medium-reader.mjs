import fs from 'node:fs';
import path from 'node:path';

const MEDIUM_FEED_URL = 'https://medium.com/feed/@davidmieloch';

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function decodeHtml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, '-')
    .replace(/&#8211;/g, '-')
    .replace(/&#8230;/g, '...');
}

function tagValue(itemXml, tagName) {
  const match = itemXml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`));
  return match ? decodeHtml(match[1]).trim() : '';
}

function categoryValues(itemXml) {
  return Array.from(itemXml.matchAll(/<category><!\[CDATA\[([\s\S]*?)]]><\/category>/g)).map(
    (match) => match[1].trim(),
  );
}

function cleanMediumUrl(url) {
  return url.replace(/\?.*$/, '');
}

function dateOnly(pubDate) {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

function assetExtension(url) {
  const match = url.match(/\.(png|jpe?g|webp|gif)(?:\?|$)/i);
  return match ? `.${match[1].toLowerCase().replace('jpeg', 'jpg')}` : '.jpg';
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, '')).replace(/\n{3,}/g, '\n\n').trim();
}

function htmlToMarkdown(html, imageMap) {
  const codeBlocks = [];
  let markdown = html
    .replace(/<img[^>]+src="https:\/\/medium\.com\/_\/stat[^"]*"[^>]*>/g, '')
    .replace(/<figure>\s*<img[^>]+src="([^"]+)"[^>]*>\s*<\/figure>/g, (_match, src) => {
      const local = imageMap.get(src);
      return local ? `\n\n![${path.basename(local).replace(/\.[^.]+$/, '').replace(/-/g, ' ')}](${local})\n\n` : '';
    })
    .replace(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_match, href, text) => {
      if (href.includes('medium.com/media/')) return '';
      const label = stripTags(text);
      return label ? `[${label}](${href})` : href;
    })
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, (_match, text) => {
      const code = decodeHtml(text.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '')).trim();
      const placeholder = `MEDIUM_CODE_BLOCK_${codeBlocks.length}`;
      codeBlocks.push(`\n\n\`\`\`\n${code}\n\`\`\`\n\n`);
      return placeholder;
    })
    .replace(/<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/g, (_match, text) => `\n\n## ${stripTags(text)}\n\n`)
    .replace(/<h[3-4][^>]*>([\s\S]*?)<\/h[3-4]>/g, (_match, text) => `\n\n### ${stripTags(text)}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (_match, text) => `\n- ${stripTags(text)}`)
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, (_match, text) => `\n\n${stripTags(text)}\n\n`)
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/?(ul|ol|figure|em|strong|blockquote)[^>]*>/g, '');

  markdown = stripTags(markdown)
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  for (const [index, block] of codeBlocks.entries()) {
    markdown = markdown.replace(`MEDIUM_CODE_BLOCK_${index}`, block);
  }

  return markdown;
}

export async function fetchMediumFeed(feedUrl = MEDIUM_FEED_URL) {
  const response = await fetch(feedUrl);
  if (!response.ok) throw new Error(`Medium feed ${response.status}: ${feedUrl}`);
  return response.text();
}

export function parseMediumFeed(feedXml) {
  return Array.from(feedXml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((match) => {
    const itemXml = match[1];
    const title = tagValue(itemXml, 'title');
    const link = cleanMediumUrl(tagValue(itemXml, 'link'));
    const content = tagValue(itemXml, 'content:encoded');
    const slug = slugify(title);
    return {
      slug,
      title,
      sourceUrl: link,
      publishedAt: dateOnly(tagValue(itemXml, 'pubDate')),
      tags: categoryValues(itemXml),
      contentHtml: content,
      imageUrls: Array.from(content.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g))
        .map((imageMatch) => imageMatch[1])
        .filter((url) => !url.includes('medium.com/_/stat')),
    };
  });
}

export async function importMediumArticle({ item, articlesRoot, publicRoot, overwrite = false }) {
  const articleRoot = path.join(articlesRoot, item.slug);
  const articlePath = path.join(articleRoot, 'index.md');
  if (fs.existsSync(articlePath) && !overwrite) {
    throw new Error(`Refusing to overwrite existing article: ${articlePath}`);
  }

  const imageRoot = path.join(publicRoot, 'blog', item.slug, 'images');
  fs.mkdirSync(articleRoot, { recursive: true });
  fs.mkdirSync(imageRoot, { recursive: true });

  const imageMap = new Map();
  for (const [index, url] of item.imageUrls.entries()) {
    const fileName = `medium-${String(index + 1).padStart(2, '0')}${assetExtension(url)}`;
    const publicPath = `/blog/${item.slug}/images/${fileName}`;
    const destination = path.join(imageRoot, fileName);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Medium image ${response.status}: ${url}`);
    fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
    imageMap.set(url, publicPath);
  }

  const body = htmlToMarkdown(item.contentHtml, imageMap);
  const description = body
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
  const frontmatter = {
    title: item.title,
    description,
    publishedAt: item.publishedAt,
    status: 'published',
    sourcePlatform: 'medium',
    sourceUrl: item.sourceUrl,
    canonicalUrl: `https://davidmieloch.com/blog/${item.slug}`,
    series: item.publishedAt < '2026-01-01' ? 'Legacy Engineering Notes' : 'Agent Design',
    tags: item.tags.length > 0 ? item.tags : ['engineering'],
  };
  const frontmatterText = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) return `${key}: [${value.map((itemValue) => JSON.stringify(itemValue)).join(', ')}]`;
      return `${key}: ${JSON.stringify(value)}`;
    })
    .join('\n');

  fs.writeFileSync(articlePath, `---\n${frontmatterText}\n---\n\n${body}\n`);
  return {
    slug: item.slug,
    articlePath,
    imageCount: item.imageUrls.length,
  };
}

export const mediumFeedUrl = MEDIUM_FEED_URL;
