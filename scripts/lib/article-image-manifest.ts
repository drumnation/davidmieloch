import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import sharp from 'sharp';

type ArticleFrontmatter = {
  title?: string;
  series?: string;
  visualSystem?: string;
  publishedAt?: string;
  status?: string;
  canonicalUrl?: string;
  description?: string;
  [key: string]: any;
};

type ArticleImageReference = {
  altText: string;
  publicPath: string;
  fileName: string;
};

type ExistingAsset = {
  id?: string;
  role?: string;
  publicPath?: string;
  sourcePath?: string;
  targetHeading?: string | null;
  altText?: string;
  caption?: string;
  promptSummary?: string;
  provider?: string;
  generationReceipt?: any;
  [key: string]: any;
};

export type ArticleImageManifestAsset = {
  id: string;
  role: string;
  publicPath: string;
  sourcePath: string;
  width: number;
  height: number;
  aspectRatio: string;
  checksumSha256: string;
  caption: string;
  promptSummary: string;
  provider: string;
  generationReceipt: any;
  altText?: string;
  targetHeading?: string | null;
};

export type ArticleImageManifest = {
  schemaVersion: 'article-image-manifest-v1';
  generatedAt: string;
  publicPublishingPerformed: false;
  articleSlug: string;
  articleTitle: string;
  series: string;
  visualSystem: string;
  approval: {
    status: string;
    requiredFrom: string;
    approvedAt: string | null;
  };
  assets: ArticleImageManifestAsset[];
  launchReadiness: {
    status: string;
    releaseTarget: string | null;
    blocker: string | null;
  };
};

type BuildArticleImageManifestOptions = {
  articlesRoot: string;
  publicRoot: string;
  slug: string;
  generatedAt?: string;
  approvalStatus?: string;
};

type BuildArticleImageManifestResult = {
  manifestPath: string;
  manifest: ArticleImageManifest;
  publicPublishingPerformed: false;
  observation: {
    claim: string;
    status: 'PASS' | 'DEGRADED';
    fallbackChain: string[];
  };
};

function readJsonIfExists<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

function parseScalar(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(rawFrontmatter: string): ArticleFrontmatter {
  const meta: ArticleFrontmatter = {};
  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    meta[key] = parseScalar(value);
  }
  return meta;
}

function readMarkdown(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  if (!frontmatter) {
    return { body: raw.trim(), meta: {} as ArticleFrontmatter };
  }
  return {
    body: raw.slice(frontmatter[0].length).trim(),
    meta: parseFrontmatter(frontmatter[1]),
  };
}

function titleCase(value: string) {
  return value
    .split(/[-_./\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function simplifyAspectRatio(width: number, height: number) {
  if (!width || !height) return 'unknown';
  const ratio = width / height;
  const canonicalRatios = [
    { value: 16 / 9, label: '16:9' },
    { value: 4 / 3, label: '4:3' },
    { value: 3 / 2, label: '3:2' },
    { value: 1, label: '1:1' },
    { value: 9 / 16, label: '9:16' },
  ];
  for (const canonical of canonicalRatios) {
    if (Math.abs(ratio - canonical.value) < 0.06) return canonical.label;
  }
  const gcd = (left: number, right: number): number => {
    let a = Math.trunc(Math.abs(left));
    let b = Math.trunc(Math.abs(right));
    while (b !== 0) {
      const next = b;
      b = a % b;
      a = next;
    }
    return a || 1;
  };
  const divisor = gcd(width, height);
  return `${Math.trunc(width / divisor)}:${Math.trunc(height / divisor)}`;
}

function sha256(buffer: Buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function normalizeAssetSnapshot(asset: Partial<ArticleImageManifestAsset> | ExistingAsset) {
  return {
    id: asset.id ?? null,
    role: asset.role ?? null,
    publicPath: asset.publicPath ?? null,
    sourcePath: asset.sourcePath ?? null,
    width: Number(asset.width ?? 0),
    height: Number(asset.height ?? 0),
    aspectRatio: asset.aspectRatio ?? null,
    checksumSha256: asset.checksumSha256 ?? null,
    caption: asset.caption ?? null,
    promptSummary: asset.promptSummary ?? null,
    provider: asset.provider ?? null,
    altText: asset.altText ?? null,
    targetHeading: asset.targetHeading ?? null,
  };
}

function snapshotManifestAssets(assets: Array<Partial<ArticleImageManifestAsset> | ExistingAsset>) {
  return JSON.stringify(assets.map(normalizeAssetSnapshot));
}

function inferImageReferences(body: string, slug: string): ArticleImageReference[] {
  const references: ArticleImageReference[] = [];
  const seen = new Set<string>();

  const markdownMatches = Array.from(body.matchAll(/!\[([^\]]*)]\(([^)]+)\)/g));
  for (const match of markdownMatches) {
    const altText = match[1]?.trim() || '';
    const src = match[2]?.trim() || '';
    const fileName = path.basename(src);
    if (!fileName) continue;
    const publicPath = src.startsWith('/blog/')
      ? src
      : `/blog/${slug}/images/${fileName}`;
    references.push({
      altText,
      publicPath,
      fileName,
    });
    seen.add(fileName);
  }

  const wikiMatches = Array.from(body.matchAll(/!\[\[([^\]]+)]]/g));
  for (const match of wikiMatches) {
    const fileName = path.basename(match[1]?.trim() ?? '');
    if (!fileName || seen.has(fileName)) continue;
    references.push({
      altText: titleCase(path.basename(fileName, path.extname(fileName))),
      publicPath: `/blog/${slug}/images/${fileName}`,
      fileName,
    });
    seen.add(fileName);
  }

  return references;
}

function imageFiles(publicRoot: string, slug: string) {
  const imagesRoot = path.join(publicRoot, 'blog', slug, 'images');
  if (!fs.existsSync(imagesRoot)) return [];
  return fs
    .readdirSync(imagesRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => /\.(png|jpe?g|webp|gif|avif)$/i.test(entry.name))
    .map((entry) => path.join(imagesRoot, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

function resolveImagePath(publicRoot: string, slug: string, reference: ArticleImageReference) {
  const absolutePath = path.join(publicRoot, reference.publicPath.replace(/^\/+/, ''));
  if (fs.existsSync(absolutePath)) return absolutePath;
  const fallback = path.join(publicRoot, 'blog', slug, 'images', reference.fileName);
  if (fs.existsSync(fallback)) return fallback;
  return null;
}

function existingAssetLookup(existingAssets: ExistingAsset[]) {
  const byPublicPath = new Map<string, ExistingAsset>();
  const bySourcePath = new Map<string, ExistingAsset>();
  const byFileName = new Map<string, ExistingAsset>();

  for (const asset of existingAssets) {
    if (asset.publicPath) byPublicPath.set(asset.publicPath, asset);
    if (asset.sourcePath) bySourcePath.set(asset.sourcePath, asset);
    const fileName = asset.publicPath ? path.basename(asset.publicPath) : null;
    if (fileName) byFileName.set(fileName, asset);
  }

  return { byPublicPath, bySourcePath, byFileName };
}

export async function buildArticleImageManifest({
  articlesRoot,
  publicRoot,
  slug,
  generatedAt = new Date().toISOString(),
  approvalStatus = 'staged-for-david-review',
}: BuildArticleImageManifestOptions): Promise<BuildArticleImageManifestResult> {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  if (!fs.existsSync(articlePath)) {
    throw new Error(`Missing article: ${articlePath}`);
  }

  const manifestPath = path.join(articlesRoot, slug, 'image-manifest.json');
  const existingManifest = readJsonIfExists<Partial<ArticleImageManifest> & { assets?: ExistingAsset[] }>(manifestPath);
  const existingAssets = existingManifest?.assets ?? [];
  const existingLookup = existingAssetLookup(existingAssets);
  const existingApproval = existingManifest?.approval ?? null;
  const article = readMarkdown(articlePath);
  const references = inferImageReferences(article.body, slug);
  const folderImages = imageFiles(publicRoot, slug);

  const referencedFiles = new Set<string>();
  const orderedFiles: string[] = [];
  for (const reference of references) {
    const resolved = resolveImagePath(publicRoot, slug, reference);
    if (!resolved) {
      throw new Error(`Missing image for manifest reference ${reference.publicPath} in ${articlePath}`);
    }
    referencedFiles.add(path.basename(resolved));
    orderedFiles.push(resolved);
  }
  for (const filePath of folderImages) {
    const fileName = path.basename(filePath);
    if (referencedFiles.has(fileName)) continue;
    orderedFiles.push(filePath);
  }

  const assets: ArticleImageManifestAsset[] = [];
  for (const [index, filePath] of orderedFiles.entries()) {
    const fileName = path.basename(filePath);
    const publicPath = `/blog/${slug}/images/${fileName}`;
    const reference = references.find((item) => item.fileName === fileName) ?? {
      altText: titleCase(path.basename(fileName, path.extname(fileName))),
      publicPath,
      fileName,
    };
    const existing = existingLookup.byPublicPath.get(publicPath)
      ?? existingLookup.bySourcePath.get(path.relative(process.cwd(), filePath))
      ?? existingLookup.byFileName.get(fileName);

    const metadata = await sharp(filePath).metadata();
    const buffer = fs.readFileSync(filePath);
    const width = Number(metadata.width ?? 0);
    const height = Number(metadata.height ?? 0);
    const caption = String(existing?.caption ?? reference.altText ?? titleCase(path.basename(fileName, path.extname(fileName)))).trim();
    const promptSummary = String(existing?.promptSummary ?? caption).trim();

    assets.push({
      id: String(existing?.id ?? (index === 0 ? 'hero-linkedin' : `inline-${String(index).padStart(2, '0')}`)),
      role: String(existing?.role ?? (index === 0 ? 'hero-and-linkedin-preview' : 'article-interior')),
      publicPath,
      sourcePath: path.relative(process.cwd(), filePath),
      width,
      height,
      aspectRatio: simplifyAspectRatio(width, height),
      checksumSha256: sha256(buffer),
      caption,
      promptSummary,
      provider: String(existing?.provider ?? 'unknown-or-prior-generation'),
      generationReceipt: existing?.generationReceipt ?? null,
      ...(existing?.altText ? { altText: String(existing.altText) } : reference.altText ? { altText: reference.altText } : {}),
      ...(existing?.targetHeading !== undefined ? { targetHeading: existing.targetHeading ?? null } : {}),
    });
  }

  const existingAssetSnapshot = snapshotManifestAssets(existingAssets);
  const nextAssetSnapshot = snapshotManifestAssets(assets);
  const manifestChanged = existingAssetSnapshot !== nextAssetSnapshot;
  const approvalWasPublished = existingApproval?.status === 'approved';
  const approvalStatusToWrite = approvalWasPublished && manifestChanged
    ? approvalStatus
    : String(existingApproval?.status ?? approvalStatus);
  const approvalTimestampToWrite = manifestChanged
    ? null
    : existingApproval?.approvedAt ?? null;
  const launchReadinessStatus = approvalWasPublished && manifestChanged
    ? 'needs-editorial-approval'
    : assets.length > 0
      ? 'ready-for-editorial-approval'
      : 'needs-image-work';
  const launchReadinessBlocker = approvalWasPublished && manifestChanged
    ? 'Image assets changed after approval; re-approval required.'
    : existingManifest?.launchReadiness?.blocker ?? null;

  const manifest: ArticleImageManifest = {
    schemaVersion: 'article-image-manifest-v1',
    generatedAt,
    publicPublishingPerformed: false,
    articleSlug: slug,
    articleTitle: String(existingManifest?.articleTitle ?? article.meta.title ?? slug),
    series: String(existingManifest?.series ?? article.meta.series ?? 'Editorial'),
    visualSystem: String(existingManifest?.visualSystem ?? article.meta.visualSystem ?? 'editorial article art'),
    approval: {
      status: approvalStatusToWrite,
      requiredFrom: String(existingManifest?.approval?.requiredFrom ?? 'David'),
      approvedAt: approvalTimestampToWrite,
    },
    assets,
    launchReadiness: {
      status: launchReadinessStatus,
      releaseTarget: existingManifest?.launchReadiness?.releaseTarget ?? article.meta.publishedAt ?? null,
      blocker: launchReadinessBlocker,
    },
  };

  if (fs.existsSync(manifestPath)) {
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  } else {
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }

  return {
    manifestPath,
    manifest,
    publicPublishingPerformed: false,
    observation: {
      claim: 'article image manifests are normalized from the article body and image files on disk',
      status: 'PASS',
      fallbackChain: [
        'content/articles/<slug>/image-manifest.json',
        'public/blog/<slug>/images/*',
        'ROM heartbeat',
      ],
    },
  };
}
