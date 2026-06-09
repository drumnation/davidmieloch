import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ZAI_IMAGE_ENDPOINT = 'https://api.z.ai/api/paas/v4/images/generations';
const MINIMAX_IMAGE_ENDPOINT = 'https://api.minimax.io/v1/image_generation';

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

function requestsPathForSlug({ articlesRoot, slug }) {
  return path.join(articlesRoot, slug, 'images', 'generated', 'requests.json');
}

function selectArticle(plan, slug) {
  const article = (plan.articles ?? []).find((item) => item.slug === slug);
  if (!article) throw new Error(`No article "${slug}" in interior image plan.`);
  return article;
}

function selectPlacement(article, placementId) {
  const placement = (article.placements ?? []).find((item) => item.id === placementId);
  if (!placement) throw new Error(`No placement "${placementId}" in article "${article.slug}".`);
  return placement;
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

async function callMiniMax({
  apiKey,
  model,
  prompt,
  aspectRatio,
  responseFormat,
  count,
  sourceImageUrl,
}) {
  const response = await fetch(MINIMAX_IMAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      aspect_ratio: aspectRatio,
      response_format: responseFormat,
      n: count,
      prompt_optimizer: true,
      ...(sourceImageUrl
        ? {
            subject_reference: [
              {
                type: 'character',
                image_file: sourceImageUrl,
              },
            ],
          }
        : {}),
    }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`MiniMax image API ${response.status}: ${body}`);
  }

  const json = JSON.parse(body);
  if (json.base_resp?.status_code && json.base_resp.status_code !== 0) {
    throw new Error(`MiniMax image API ${json.base_resp.status_code}: ${json.base_resp.status_msg}`);
  }

  const imageUrl = json.data?.image_urls?.[0];
  const imageBase64 = json.data?.images?.[0] ?? json.data?.image_base64?.[0];
  if (!imageUrl && !imageBase64) {
    throw new Error(`MiniMax image API returned no image: ${body}`);
  }
  return { json, imageUrl, imageBase64 };
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

function imageBufferFromBase64(value) {
  const normalized = value.includes(',') ? value.split(',').at(-1) : value;
  return Buffer.from(normalized, 'base64');
}

function endpointForProvider(provider) {
  if (provider === 'zai') return ZAI_IMAGE_ENDPOINT;
  if (provider === 'minimax') return MINIMAX_IMAGE_ENDPOINT;
  throw new Error(`Unsupported image provider "${provider}".`);
}

function apiKeyForProvider(provider) {
  if (provider === 'zai') return process.env.ZAI_API_KEY;
  if (provider === 'minimax') return process.env.MINIMAX_API_KEY;
  throw new Error(`Unsupported image provider "${provider}".`);
}

async function generateImageWithProvider({
  provider,
  apiKey,
  model,
  prompt,
  quality,
  size,
  userId,
  sourceImageUrl,
}) {
  if (provider === 'zai') {
    const { json, imageUrl } = await callZai({
      apiKey,
      model,
      prompt,
      quality,
      size,
      userId,
    });
    return { json, image: await downloadImage(imageUrl) };
  }

  if (provider === 'minimax') {
    const { json, imageUrl, imageBase64 } = await callMiniMax({
      apiKey,
      model,
      prompt,
      aspectRatio: size,
      responseFormat: 'url',
      count: 1,
      sourceImageUrl,
    });
    return {
      json,
      image: imageBase64 ? imageBufferFromBase64(imageBase64) : await downloadImage(imageUrl),
    };
  }

  throw new Error(`Unsupported image provider "${provider}".`);
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

function readImageRequests(requestsPath) {
  if (!fs.existsSync(requestsPath)) {
    return {
      schemaVersion: 'draft-lab-image-requests-v1',
      requests: [],
    };
  }
  return readJson(requestsPath);
}

function updateImageRequest(requestsPayload, requestId, patch) {
  const now = patch.updatedAt ?? new Date().toISOString();
  requestsPayload.requests = (requestsPayload.requests ?? []).map((request) =>
    request.id === requestId
      ? {
          ...request,
          ...patch,
          updatedAt: now,
        }
      : request,
  );
}

function variantIdForRequest(request, index) {
  const safeId = request.id
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return `${request.placementId}-request-${safeId || index + 1}`;
}

function promptForQueuedRequest(request) {
  if (!request.sourceAssetId) return request.prompt;

  return [
    'Use the supplied source image as the visual reference for composition, palette, and style continuity.',
    `Source image variant: ${request.sourceVariantId ?? request.sourceAssetId}.`,
    `Requested change: ${request.prompt}`,
    'Keep it suitable as editorial article art. Do not add readable text unless explicitly requested.',
  ].join('\n');
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
  endpointForProvider(provider);
  if (!dryRun && !spendApproved) {
    throw new Error('image:generate requires --spend-approved because image generation costs money.');
  }
  const apiKey = apiKeyForProvider(provider);
  if (!dryRun && !apiKey) {
    throw new Error(`Missing ${provider === 'minimax' ? 'MINIMAX_API_KEY' : 'ZAI_API_KEY'}.`);
  }

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
    endpoint: endpointForProvider(provider),
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
      const { json, image } = await generateImageWithProvider({
        provider,
        apiKey,
        model,
        prompt: variant.prompt,
        quality,
        size,
        userId: `davidmieloch-${slug}-${variant.id}`,
      });
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
        traceId: json.id ?? null,
        metadata: json.metadata ?? null,
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

export async function processQueuedImageRequests({
  inputPath,
  articlesRoot,
  publicRoot,
  slug,
  requestId = null,
  limit = 1,
  provider = 'zai',
  model = 'glm-image',
  quality = 'hd',
  size = '1280x720',
  spendApproved = false,
  dryRun = false,
  generatedAt = new Date().toISOString(),
}) {
  endpointForProvider(provider);
  if (!dryRun && !spendApproved) {
    throw new Error('image:process-requests requires --spend-approved because image generation costs money.');
  }
  const apiKey = apiKeyForProvider(provider);
  if (!dryRun && !apiKey) {
    throw new Error(`Missing ${provider === 'minimax' ? 'MINIMAX_API_KEY' : 'ZAI_API_KEY'}.`);
  }

  const plan = readJson(inputPath);
  const article = selectArticle(plan, slug);
  const requestsPath = requestsPathForSlug({ articlesRoot, slug });
  const requestsPayload = readImageRequests(requestsPath);
  const queuedRequests = (requestsPayload.requests ?? [])
    .filter((request) => request.slug === slug && request.status === 'queued')
    .filter((request) => (requestId ? request.id === requestId : true))
    .slice(0, limit);
  if (requestId && queuedRequests.length === 0) {
    throw new Error(`No queued image request found for --request-id=${requestId}.`);
  }
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
    endpoint: endpointForProvider(provider),
    model,
    quality,
    size,
  };

  const results = [];
  const failures = [];

  queuedRequests.forEach((request, index) => {
    updateImageRequest(requestsPayload, request.id, {
      status: dryRun ? 'queued' : 'processing',
      workerStartedAt: dryRun ? null : generatedAt,
    });
  });
  if (!dryRun) {
    writeJson(requestsPath, requestsPayload);
  }

  for (const [index, request] of queuedRequests.entries()) {
    const placement = selectPlacement(article, request.placementId);
    const variantId = variantIdForRequest(request, index);
    const outputPath = localPathForGeneratedImage({
      publicRoot,
      slug,
      placementId: placement.id,
      variantId,
    });
    const publicPath = publicPathForGeneratedImage({
      slug,
      placementId: placement.id,
      variantId,
    });
    const id = `${placement.id}:${variantId}`;
    const generationPrompt = promptForQueuedRequest(request);
    const baseAsset = {
      id,
      placementId: placement.id,
      variantId,
      role: placement.target?.role ?? 'article-interior',
      targetHeading: placement.target?.afterHeading ?? null,
      altText: placement.altText,
      caption: placement.captionSeed,
      prompt: generationPrompt,
      promptChecksum: sha256(Buffer.from(generationPrompt)),
      requestPrompt: request.prompt,
      publicPath,
      sourcePath: path.relative(process.cwd(), outputPath),
      status: dryRun ? 'planned' : 'generated-needs-review',
      requestId: request.id,
      sourceAssetId: request.sourceAssetId ?? null,
      sourceVariantId: request.sourceVariantId ?? null,
      sourceImageUrl: request.sourceImageUrl ?? null,
      generationMode: request.sourceAssetId ? 'source-image-variation' : 'fresh-slot-concept',
    };

    if (dryRun) {
      results.push(baseAsset);
      continue;
    }

    try {
      const { json, image } = await generateImageWithProvider({
        provider,
        apiKey,
        model,
        prompt: generationPrompt,
        quality,
        size,
        userId: `davidmieloch-${slug}-${variantId}`,
        sourceImageUrl: provider === 'minimax' ? request.sourceImageUrl : null,
      });
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
        traceId: json.id ?? null,
        metadata: json.metadata ?? null,
        contentFilter: json.content_filter ?? null,
        sourceUrlExpires: 'Provider image URLs are temporary; local PNG is the durable artifact.',
      };
      results.push(asset);
      upsertAsset(manifest, asset);
      updateImageRequest(requestsPayload, request.id, {
        status: 'completed',
        processedAt: generatedAt,
        resultAssetId: asset.id,
      });
    } catch (error) {
      const failure = {
        ...baseAsset,
        status: 'generation-failed',
        error: error.message,
        generatedAt,
      };
      failures.push(failure);
      recordFailure(manifest, failure);
      updateImageRequest(requestsPayload, request.id, {
        status: 'failed',
        failedAt: generatedAt,
        error: error.message,
      });
    }

    if (!dryRun) {
      writeJson(manifestPath, manifest);
      writeJson(requestsPath, requestsPayload);
    }
  }

  if (!dryRun) {
    writeJson(manifestPath, manifest);
    writeJson(requestsPath, requestsPayload);
  }

  return {
    schemaVersion: 'image-request-worker-result-v1',
    generatedAt,
    publicPublishingPerformed: false,
    dryRun,
    spendApproved,
    article: {
      slug: article.slug,
      title: article.title,
    },
    queued: queuedRequests.length,
    generated: results.filter((item) => item.status === 'generated-needs-review').length,
    planned: results.filter((item) => item.status === 'planned').length,
    failures: failures.length,
    requestsPath: path.relative(process.cwd(), requestsPath),
    manifestPath: path.relative(process.cwd(), manifestPath),
    results,
    failureDetails: failures,
    observation: {
      claim: 'Draft Lab image requests are consumed by a deterministic worker and linked to generated assets.',
      status: failures.length ? 'DEGRADED' : 'PASS',
      fallbackChain: [
        'content/articles/<slug>/images/generated/requests.json',
        'content/articles/<slug>/images/generated/manifest.json',
        'ROM heartbeat',
      ],
    },
  };
}
