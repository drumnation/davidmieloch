import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ZAI_IMAGE_ENDPOINT = 'https://api.z.ai/api/paas/v4/images/generations';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function publicPathForGeneratedImage({ slug, placementId, variantId }) {
  return `/blog/${slug}/images/generated/${placementId}/${variantId}.png`;
}

function localPathForGeneratedImage({ publicRoot, slug, placementId, variantId }) {
  return path.join(
    publicRoot,
    'blog',
    slug,
    'images',
    'generated',
    placementId,
    `${variantId}.png`,
  );
}

function selectArticle(plan, slug) {
  const article = (plan.articles ?? []).find((item) => item.slug === slug);
  if (!article) throw new Error(`No article "${slug}" in interior image plan.`);
  return article;
}

function selectVariants(article, { limit, placementId, onlyMissing, publicRoot }) {
  const selected = [];
  for (const placement of article.placements ?? []) {
    if (placementId && placement.id !== placementId) continue;
    for (const variant of placement.variants ?? []) {
      const outputPath = localPathForGeneratedImage({
        publicRoot,
        slug: article.slug,
        placementId: placement.id,
        variantId: variant.id,
      });
      if (onlyMissing && fs.existsSync(outputPath)) continue;
      selected.push({ placement, variant, outputPath });
      if (limit && selected.length >= limit) return selected;
    }
  }
  return selected;
}

async function callZai({ apiKey, model, prompt, quality, size, userId }) {
  const response = await fetch(ZAI_IMAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      quality,
      size,
      user_id: userId,
    }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Z.ai image API ${response.status}: ${body}`);
  }

  const json = JSON.parse(body);
  const imageUrl = json.data?.[0]?.url;
  if (!imageUrl) throw new Error(`Z.ai image API returned no image URL: ${body}`);
  return { json, imageUrl };
}

async function downloadImage(url) {
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    lastError = `Image download ${response.status}: ${await response.text()}`;
    await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
  }
  throw new Error(lastError);
}

function readExistingManifest(manifestPath, generatedAt) {
  if (fs.existsSync(manifestPath)) return readJson(manifestPath);
  return {
    schemaVersion: 'generated-interior-image-manifest-v1',
    generatedAt,
    updatedAt: generatedAt,
    publicPublishingPerformed: false,
    approvalStatus: 'needs-david-selection',
    assets: [],
    failures: [],
  };
}

function upsertAsset(manifest, asset) {
  manifest.assets = (manifest.assets ?? []).filter((item) => item.id !== asset.id);
  manifest.assets.push(asset);
}

function recordFailure(manifest, failure) {
  manifest.failures = (manifest.failures ?? []).filter((item) => item.id !== failure.id);
  manifest.failures.push(failure);
}

export async function generateInteriorImages({
  inputPath,
  articlesRoot,
  publicRoot,
  slug,
  placementId = null,
  limit = 1,
  provider = 'zai',
  model = 'glm-image',
  quality = 'hd',
  size = '1280x720',
  spendApproved = false,
  dryRun = false,
  onlyMissing = true,
  generatedAt = new Date().toISOString(),
}) {
  if (provider !== 'zai') throw new Error(`Unsupported image provider "${provider}".`);
  if (!dryRun && !spendApproved) {
    throw new Error('image:generate requires --spend-approved because image generation costs money.');
  }
  if (!dryRun && !process.env.ZAI_API_KEY) throw new Error('Missing ZAI_API_KEY.');

  const plan = readJson(inputPath);
  const article = selectArticle(plan, slug);
  const selected = selectVariants(article, {
    limit,
    placementId,
    onlyMissing,
    publicRoot,
  });

  const manifestPath = path.join(articlesRoot, slug, 'images', 'generated', 'manifest.json');
  const manifest = readExistingManifest(manifestPath, generatedAt);
  manifest.updatedAt = generatedAt;
  manifest.article = {
    slug: article.slug,
    title: article.title,
    planPath: path.relative(process.cwd(), inputPath),
  };
  manifest.provider = {
    id: provider,
    endpoint: ZAI_IMAGE_ENDPOINT,
    model,
    quality,
    size,
  };

  const results = [];
  const failures = [];

  for (const selection of selected) {
    const { placement, variant, outputPath } = selection;
    const publicPath = publicPathForGeneratedImage({
      slug,
      placementId: placement.id,
      variantId: variant.id,
    });
    const id = `${placement.id}:${variant.id}`;
    const baseAsset = {
      id,
      placementId: placement.id,
      variantId: variant.id,
      role: placement.target?.role ?? 'article-interior',
      targetHeading: placement.target?.afterHeading ?? null,
      altText: placement.altText,
      caption: placement.captionSeed,
      prompt: variant.prompt,
      promptChecksum: variant.promptChecksum,
      publicPath,
      sourcePath: path.relative(process.cwd(), outputPath),
      status: dryRun ? 'planned' : 'generated-needs-review',
    };

    if (dryRun) {
      results.push(baseAsset);
      upsertAsset(manifest, baseAsset);
      continue;
    }

    try {
      const { json, imageUrl } = await callZai({
        apiKey: process.env.ZAI_API_KEY,
        model,
        prompt: variant.prompt,
        quality,
        size,
        userId: `davidmieloch-${slug}-${variant.id}`,
      });
      const image = await downloadImage(imageUrl);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, image);
      const asset = {
        ...baseAsset,
        status: 'generated-needs-review',
        checksumSha256: sha256(image),
        provider,
        model,
        quality,
        size,
        generatedAt,
        created: json.created ?? null,
        contentFilter: json.content_filter ?? null,
        sourceUrlExpires: 'Provider image URLs are temporary; local PNG is the durable artifact.',
      };
      results.push(asset);
      upsertAsset(manifest, asset);
    } catch (error) {
      const failure = {
        ...baseAsset,
        status: 'generation-failed',
        error: error.message,
        generatedAt,
      };
      failures.push(failure);
      recordFailure(manifest, failure);
    }

    writeJson(manifestPath, manifest);
  }

  writeJson(manifestPath, manifest);

  return {
    schemaVersion: 'interior-image-generation-result-v1',
    generatedAt,
    publicPublishingPerformed: false,
    dryRun,
    spendApproved,
    article: {
      slug: article.slug,
      title: article.title,
    },
    selected: selected.length,
    generated: results.filter((item) => item.status === 'generated-needs-review').length,
    planned: results.filter((item) => item.status === 'planned').length,
    failures: failures.length,
    manifestPath: path.relative(process.cwd(), manifestPath),
    results,
    failureDetails: failures,
    observation: {
      claim: 'Interior image generation writes durable assets and receipts before article insertion.',
      status: failures.length ? 'DEGRADED' : 'PASS',
      fallbackChain: [
        'content/articles/<slug>/images/generated/manifest.json',
        'content/distribution/factory-primitives-interior-image-plan.json',
        'ROM heartbeat',
      ],
    },
  };
}
