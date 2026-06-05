#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ZAI_IMAGE_ENDPOINT = 'https://api.z.ai/api/paas/v4/images/generations';

const DEFAULT_PROMPTS = [
  {
    id: 'dark-factory-mark',
    prompt: [
      'Square logo for Singularity Labs, an AI architecture and dark factory systems company.',
      'A sharp abstract S monogram formed from dark chocolate-black factory rails and luminous signal lines.',
      'Premium software company identity, cinematic but clean, strong silhouette, works at small sizes.',
      'No words, no letters other than a subtle abstract S shape, no mockup, no background scene.',
      'Flat vector-like brand mark, centered, transparent or near-black background, high contrast.'
    ].join(' ')
  },
  {
    id: 'signal-forge',
    prompt: [
      'Square logo for Singularity Labs, AI architecture company.',
      'Minimal geometric symbol: a singularity core, software circuit traces, and factory conveyor geometry.',
      'Dark graphite, black, deep red, and molten gold accents.',
      'Professional technology brand mark, iconic, clean edges, readable as a social avatar.',
      'No text, no mockup, no photorealism, no busy background.'
    ].join(' ')
  },
  {
    id: 'chocolate-chip-factory',
    prompt: [
      'Square logo for Singularity Labs.',
      'A refined emblem combining a computer chip, dark chocolate square, and autonomous factory motif.',
      'Luxury industrial software brand, dark chocolate black, polished copper, electric blue pin lights.',
      'Simple centered mark for LinkedIn company avatar, clean silhouette, modern identity design.',
      'No text, no people, no product packaging, no clutter.'
    ].join(' ')
  }
];

function parseArgs(argv) {
  const args = {
    outDir: 'content/brand/singularity-labs/logo-candidates',
    model: 'glm-image',
    quality: 'hd',
    size: '1280x1280',
    count: DEFAULT_PROMPTS.length,
    spendApproved: false
  };

  for (const arg of argv) {
    if (arg === '--') continue;
    if (arg === '--spend-approved') args.spendApproved = true;
    else if (arg.startsWith('--out-dir=')) args.outDir = arg.slice('--out-dir='.length);
    else if (arg.startsWith('--model=')) args.model = arg.slice('--model='.length);
    else if (arg.startsWith('--quality=')) args.quality = arg.slice('--quality='.length);
    else if (arg.startsWith('--size=')) args.size = arg.slice('--size='.length);
    else if (arg.startsWith('--count=')) args.count = Number(arg.slice('--count='.length));
    else if (arg.startsWith('--prompt=')) {
      args.customPrompt = arg.slice('--prompt='.length);
      args.count = 1;
    } else if (arg === '--help') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  ZAI_API_KEY=... pnpm brand:logo -- --spend-approved
  ZAI_API_KEY=... node scripts/generate-brand-logo.mjs --spend-approved --count=3

Options:
  --spend-approved       Required. Confirms paid image generation is approved.
  --count=N              Number of built-in prompt variants to generate.
  --out-dir=PATH         Output directory. Default: content/brand/singularity-labs/logo-candidates
  --model=MODEL          Z.ai image model. Default: glm-image
  --quality=QUALITY      hd or standard. Default: hd
  --size=WxH             Image size. Default: 1280x1280
  --prompt=TEXT          Generate one custom prompt.
`);
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function callZai({ apiKey, model, prompt, quality, size }) {
  const response = await fetch(ZAI_IMAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      prompt,
      quality,
      size,
      user_id: 'davidmieloch-brand-logo'
    })
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

async function writeManifest({ manifestPath, generatedAt, results, failures }) {
  await writeFile(
    manifestPath,
    `${JSON.stringify({
      generatedAt,
      brand: 'Singularity Labs',
      purpose: 'LinkedIn company page logo candidates',
      publicApprovalStatus: 'needs-david-selection',
      variants: results,
      failures
    }, null, 2)}\n`
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (!args.spendApproved) {
    throw new Error('Refusing paid Z.ai image generation without --spend-approved.');
  }

  const apiKey = process.env.ZAI_API_KEY;
  if (!apiKey) throw new Error('Missing ZAI_API_KEY.');

  const outDir = path.resolve(args.outDir);
  await mkdir(outDir, { recursive: true });

  const selectedPrompts = args.customPrompt
    ? [{ id: 'custom', prompt: args.customPrompt }]
    : DEFAULT_PROMPTS.slice(0, Math.max(0, args.count));

  const generatedAt = new Date().toISOString();
  const manifestPath = path.join(outDir, 'manifest.json');
  const results = [];
  const failures = [];

  for (const promptSpec of selectedPrompts) {
    const variantId = `${generatedAt.replace(/[:.]/g, '-')}-${promptSpec.id}`;
    console.log(`Generating ${variantId}...`);
    try {
      const { json, imageUrl } = await callZai({
        apiKey,
        model: args.model,
        prompt: promptSpec.prompt,
        quality: args.quality,
        size: args.size
      });
      const image = await downloadImage(imageUrl);
      const checksum = sha256(image);
      const fileName = `${variantId}.png`;
      await writeFile(path.join(outDir, fileName), image);

      results.push({
        variantId,
        file: fileName,
        provider: 'zai',
        endpoint: ZAI_IMAGE_ENDPOINT,
        model: args.model,
        quality: args.quality,
        size: args.size,
        prompt: promptSpec.prompt,
        checksumSha256: checksum,
        created: json.created,
        contentFilter: json.content_filter ?? null,
        sourceUrlExpires: 'Z.ai image URLs are temporary; local PNG is the durable artifact.'
      });
    } catch (error) {
      failures.push({
        variantId,
        prompt: promptSpec.prompt,
        error: error.message
      });
      console.error(`Failed ${variantId}: ${error.message}`);
    }
    await writeManifest({ manifestPath, generatedAt, results, failures });
  }

  console.log(`Wrote ${results.length} logo candidate(s) to ${outDir}`);
  if (failures.length > 0) console.log(`Failures: ${failures.length}`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
