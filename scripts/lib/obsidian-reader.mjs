import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_BLOGS_ROOT = '/Users/dmieloch/Library/Mobile Documents/iCloud~md~obsidian/Documents/brain-vault/blogs';

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function safeAssetName(value) {
  const extension = path.extname(value);
  const baseName = path.basename(value, extension);
  return `${slugify(baseName)}${extension.toLowerCase()}`;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(rawFrontmatter) {
  const meta = {};
  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) continue;
    meta[trimmed.slice(0, separatorIndex).trim()] = parseScalar(
      trimmed.slice(separatorIndex + 1),
    );
  }
  return meta;
}

function readMarkdownWithFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  if (!frontmatter) return { body: raw.trim(), meta: {} };
  return {
    body: raw.slice(frontmatter[0].length).trim(),
    meta: parseFrontmatter(frontmatter[1]),
  };
}

function walkMarkdown(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }
  return files;
}

function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function existingPath(candidates) {
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

function imageSourcePath(blogsRoot, articleDir, embedPath) {
  const normalized = embedPath.replace(/^blogs\//, '');
  return existingPath([
    path.join(articleDir, embedPath),
    path.join(blogsRoot, normalized),
    path.join(path.dirname(blogsRoot), embedPath),
  ]);
}

function collectImageEmbeds(body) {
  return Array.from(body.matchAll(/!\[\[([^\]]+)]]/g)).map((match) => match[1].trim());
}

export function resolveObsidianBlogsRoot(value = process.env.OBSIDIAN_BLOGS_ROOT) {
  return value ? path.resolve(value) : DEFAULT_BLOGS_ROOT;
}

export function scanObsidianArticles(blogsRoot = resolveObsidianBlogsRoot()) {
  if (!fs.existsSync(blogsRoot)) {
    throw new Error(`Missing Obsidian blogs root: ${blogsRoot}`);
  }

  return walkMarkdown(blogsRoot)
    .map((filePath) => {
      const { body, meta } = readMarkdownWithFrontmatter(filePath);
      const title = firstHeading(body);
      return {
        slug: title ? slugify(title) : slugify(path.basename(filePath, '.md')),
        title,
        sourcePath: filePath,
        relativePath: path.relative(blogsRoot, filePath),
        date: meta.date ?? null,
        status: meta.status ?? null,
        tags: Array.isArray(meta.tags) ? meta.tags : [],
        imageCount: collectImageEmbeds(body).length,
      };
    })
    .filter((candidate) => candidate.title);
}

export function readObsidianArticle(sourcePath, blogsRoot = resolveObsidianBlogsRoot()) {
  const { body, meta } = readMarkdownWithFrontmatter(sourcePath);
  const title = firstHeading(body);
  if (!title) throw new Error(`Missing H1 title in ${sourcePath}`);
  const slug = slugify(title);
  const images = collectImageEmbeds(body).map((embedPath) => {
    const fileName = safeAssetName(embedPath);
    return {
      embedPath,
      fileName,
      sourcePath: imageSourcePath(blogsRoot, path.dirname(sourcePath), embedPath),
      publicPath: `/blog/${slug}/images/${fileName}`,
    };
  });

  const normalizedBody = body
    .replace(/^#\s+.+\n+/, '')
    .replace(/!\[\[([^\]]+)]]/g, (_match, embedPath) => {
      const fileName = safeAssetName(embedPath.trim());
      return `![${fileName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')}](/blog/${slug}/images/${fileName})`;
    })
    .trim();

  return {
    slug,
    title,
    sourcePath,
    body: normalizedBody,
    date: meta.date ?? null,
    status: meta.status ?? null,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    images,
  };
}
