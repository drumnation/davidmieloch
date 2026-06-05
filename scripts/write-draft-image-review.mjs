import fs from 'node:fs';
import path from 'node:path';

import { buildContentLedger } from './lib/content-ledger.mjs';

const appRoot = process.cwd();
const obsidianBlogsRoot = process.env.OBSIDIAN_BLOGS_ROOT
  || '/Users/dmieloch/Library/Mobile Documents/iCloud~md~obsidian/Documents/brain-vault/blogs';
const contentRoot = path.join(appRoot, 'content');
const publicRoot = path.join(appRoot, 'public');
const reviewPublicRoot = path.join(publicRoot, 'draft-lab');
const previewMarkdownRoot = path.join(contentRoot, 'distribution', 'draft-previews');
const reviewOutputPath = path.join(contentRoot, 'distribution', 'draft-image-review.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

const ledger = buildContentLedger({
  obsidianBlogsRoot,
  websiteArticlesRoot: path.join(contentRoot, 'articles'),
  publicRoot,
  packagesRoot: path.join(contentRoot, 'distribution', 'packages'),
  platformLedgerPath: path.join(contentRoot, 'distribution', 'platform-ledger.json'),
  publishSchedulePath: path.join(contentRoot, 'distribution', 'publish-schedule.json'),
});

fs.mkdirSync(path.dirname(reviewOutputPath), { recursive: true });
fs.rmSync(reviewPublicRoot, { recursive: true, force: true });
fs.rmSync(previewMarkdownRoot, { recursive: true, force: true });
fs.mkdirSync(reviewPublicRoot, { recursive: true });
fs.mkdirSync(previewMarkdownRoot, { recursive: true });

const candidates = ledger.items
  .filter((item) => item.gates.website === 'needs-website-staging')
  .filter((item) => item.sourceBucket !== 'organized-published')
  .map((item) => {
    const copiedImages = copyReviewImages(item);
    const previewMarkdownPath = copyPreviewMarkdown(item);

    return {
      slug: item.slug,
      title: item.title,
      collection: item.collection,
      sourceBucket: item.sourceBucket,
      relativePath: item.relativePath,
      wordCount: item.wordCount,
      gates: item.gates,
      imageEvidence: {
        embedCount: item.imageEvidence.embeds.length,
        adjacentImageCount: item.imageEvidence.adjacentImageCount,
        websiteImageCount: item.imageEvidence.websiteImageCount,
      },
      images: copiedImages,
      previewUrl: `/draft-lab/articles/${item.slug}`,
      previewMarkdownPath,
      imageStatus: copiedImages.length > 0
        ? 'existing-draft-images-available'
        : item.gates.image,
      nextImageAction: copiedImages.length > 0
        ? 'Select hero and inline candidates for website staging.'
        : 'Generate 3-4 hero candidates, then approve one before public release.',
      promptSeed: promptSeedFor(item),
    };
  });

const review = {
  schemaVersion: 'draft-image-review-v1',
  generatedAt: new Date().toISOString(),
  publicPublishingPerformed: false,
  sourceRoots: {
    obsidianBlogsRoot,
    reviewPublicRoot: '/draft-lab',
    previewMarkdownRoot: 'content/distribution/draft-previews',
    ledgerPath: 'content/distribution/content-ledger.json',
  },
  summary: {
    candidates: candidates.length,
    withImages: candidates.filter((item) => item.images.length > 0).length,
    missingImages: candidates.filter((item) => item.images.length === 0).length,
    byCollection: candidates.reduce((groups, item) => {
      groups[item.collection] ??= 0;
      groups[item.collection] += 1;
      return groups;
    }, {}),
  },
  candidates,
};

fs.writeFileSync(reviewOutputPath, `${JSON.stringify(review, null, 2)}\n`);
console.log(JSON.stringify({
  ok: true,
  outputPath: reviewOutputPath,
  copiedImages: candidates.reduce((total, item) => total + item.images.length, 0),
  summary: review.summary,
}, null, 2));

function copyReviewImages(item) {
  const sourceImages = imagePathsFor(item);
  const destinationRoot = path.join(reviewPublicRoot, item.slug);
  fs.mkdirSync(destinationRoot, { recursive: true });

  return sourceImages.slice(0, 12).map((sourcePath, index) => {
    const extension = path.extname(sourcePath).toLowerCase();
    const safeName = `${String(index + 1).padStart(2, '0')}-${safeBasename(sourcePath)}${extension}`;
    const destinationPath = path.join(destinationRoot, safeName);
    fs.copyFileSync(sourcePath, destinationPath);
    return {
      id: `${item.slug}-${index + 1}`,
      src: `/draft-lab/${item.slug}/${safeName}`,
      sourcePath,
      role: index === 0 ? 'candidate-hero' : 'candidate-inline',
    };
  });
}

function copyPreviewMarkdown(item) {
  const sourcePath = path.join(obsidianBlogsRoot, item.relativePath);
  const outputRelativePath = `content/distribution/draft-previews/${item.slug}.md`;
  const outputPath = path.join(appRoot, outputRelativePath);
  fs.copyFileSync(sourcePath, outputPath);
  return outputRelativePath;
}

function imagePathsFor(item) {
  const fromLedger = item.imageEvidence.adjacentImages
    .map((relativePath) => path.join(obsidianBlogsRoot, relativePath))
    .filter((filePath) => fs.existsSync(filePath) && imageExtensions.has(path.extname(filePath).toLowerCase()));

  return [...new Set(fromLedger)];
}

function safeBasename(filePath) {
  return path
    .basename(filePath, path.extname(filePath))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72);
}

function promptSeedFor(item) {
  const collectionPrompt = {
    'Factory Primitives': 'dark chocolate software factory, modular machines, deterministic workflow spine, glowing amber instrumentation',
    'Building Minds': 'multi-agent minds, shared memory core, specialized roles, intimate technical portrait, no readable text',
    'Memory, Context, and Reality': 'memory architecture, compressed timelines, maps and reality diverging, luminous cognitive infrastructure',
    'Observer Systems': 'measurement instruments, observers cross-checking reality, proof chains, forensic software lab',
    'Human Outcomes': 'human meaning under automation pressure, cinematic but grounded, warm contrast against industrial systems',
  }[item.collection] ?? 'AI-native software systems, cinematic editorial hero image, no readable text';

  return `${item.title}: ${collectionPrompt}. Magazine-quality 16:9 hero image, visually specific, no typography.`;
}
