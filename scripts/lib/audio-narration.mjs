import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const AUDIO_SCHEMA_VERSION = 'article-audio-v1';
const SPEECHIFY_STREAM_ENDPOINT = 'https://api.speechify.ai/v1/audio/stream';
const DEFAULT_MODEL = 'simba-english';
const DEFAULT_LANGUAGE = 'en';
const MAX_STREAM_CHARS = 20000;

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => parseScalar(item))
      .filter(Boolean);
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

function readMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  if (!frontmatter) return { raw, body: raw.trim(), meta: {} };
  return {
    raw,
    body: raw.slice(frontmatter[0].length).trim(),
    meta: parseFrontmatter(frontmatter[1]),
  };
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function quoteYaml(value) {
  return JSON.stringify(String(value));
}

function writeAudioMarkdown(filePath, metadata, body) {
  const frontmatter = Object.entries(metadata)
    .map(([key, value]) => `${key}: ${quoteYaml(value)}`)
    .join('\n');
  fs.writeFileSync(filePath, `---\n${frontmatter}\n---\n\n${body.trim()}\n`);
}

function articlePath(articlesRoot, slug) {
  return path.join(articlesRoot, slug, 'index.md');
}

function audioScriptPath(articlesRoot, slug) {
  return path.join(articlesRoot, slug, 'audio.md');
}

function audioManifestPath(articlesRoot, slug) {
  return path.join(articlesRoot, slug, 'audio-manifest.json');
}

function audioOutputPath(publicRoot, slug) {
  return path.join(publicRoot, 'audio', 'voice', 'blog', `${slug}.mp3`);
}

function readArticle(articlesRoot, slug) {
  const filePath = articlePath(articlesRoot, slug);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing article: ${filePath}`);
  }
  return {
    path: filePath,
    ...readMarkdown(filePath),
  };
}

function readAudioScript(articlesRoot, slug) {
  const filePath = audioScriptPath(articlesRoot, slug);
  if (!fs.existsSync(filePath)) return null;
  return {
    path: filePath,
    ...readMarkdown(filePath),
  };
}

function readManifest(articlesRoot, slug) {
  const filePath = audioManifestPath(articlesRoot, slug);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function articleSlugs(articlesRoot) {
  if (!fs.existsSync(articlesRoot)) return [];
  return fs
    .readdirSync(articlesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(articlesRoot, entry.name, 'index.md')))
    .map((entry) => entry.name)
    .sort();
}

function removeMarkdownTables(markdown) {
  const lines = markdown.split(/\r?\n/);
  const kept = [];
  let inTable = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const next = lines[index + 1] ?? '';
    const looksLikeTableHeader = line.includes('|') && /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(next);
    const looksLikeTableRow = inTable && line.includes('|');

    if (looksLikeTableHeader) {
      inTable = true;
      index += 1;
      continue;
    }

    if (looksLikeTableRow) continue;
    inTable = false;
    kept.push(line);
  }

  return kept.join('\n');
}

function normalizeAcronyms(text) {
  const replacements = [
    ['AI', 'A.I.'],
    ['API', 'A.P.I.'],
    ['CI', 'C.I.'],
    ['CLI', 'C.L.I.'],
    ['DNS', 'D.N.S.'],
    ['GPU', 'G.P.U.'],
    ['JSON', 'J.S.O.N.'],
    ['LLM', 'L.L.M.'],
    ['MP3', 'M.P.3.'],
    ['PRD', 'P.R.D.'],
    ['PR', 'P.R.'],
    ['QA', 'Q.A.'],
    ['SEO', 'S.E.O.'],
    ['SSML', 'S.S.M.L.'],
    ['TTS', 'T.T.S.'],
    ['UBI', 'U.B.I.'],
    ['UI', 'U.I.'],
    ['UX', 'U.X.'],
    ['VPS', 'V.P.S.'],
  ];

  return replacements.reduce((current, [from, to]) => (
    current.replace(new RegExp(`\\b${from}s?\\b`, 'g'), (match) => (
      match.endsWith('s') && from !== 'SSML' ? `${to}s` : to
    ))
  ), text);
}

function normalizeForSpeech(markdown) {
  return normalizeAcronyms(
    removeMarkdownTables(markdown)
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, (_match, code) => code.replace(/[_-]+/g, ' '))
      .replace(/^\s*!\[[^\]]*]\([^)]+\)\s*$/gm, '')
      .replace(/!\[\[([^\]]+)]]/g, '')
      .replace(/!\[[^\]]*]\([^)]+\)/g, '')
      .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/^\s*---+\s*$/gm, '')
      .replace(/^#{1,6}\s+(.+)$/gm, '\n$1.\n')
      .replace(/^>\s?/gm, '')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      .replace(/[*_~]{1,3}/g, '')
      .replace(/\s+([.,!?;:])/g, '$1')
      .replace(/((?:[A-Z]\.){2,})\./g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim(),
  );
}

function paragraphize(text) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function paragraphsToSsml(paragraphs, emotion = 'direct') {
  const body = paragraphs
    .map((paragraph) => `    <p>${escapeXml(paragraph)}</p>`)
    .join('\n    <break time="650ms"/>\n');
  return `<speak>\n  <speechify:style emotion="${escapeXml(emotion)}">\n${body}\n  </speechify:style>\n</speak>`;
}

function scriptToSsml(scriptBody, emotion = 'direct') {
  return paragraphsToSsml(paragraphize(scriptBody), emotion);
}

function ssmlChunks(scriptBody, emotion = 'direct') {
  const paragraphs = paragraphize(scriptBody);
  const chunks = [];
  let current = [];

  for (const paragraph of paragraphs) {
    const candidate = [...current, paragraph];
    const candidateSsml = paragraphsToSsml(candidate, emotion);
    if (candidateSsml.length <= MAX_STREAM_CHARS) {
      current = candidate;
      continue;
    }

    if (current.length > 0) {
      chunks.push(paragraphsToSsml(current, emotion));
      current = [paragraph];
      continue;
    }

    const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [paragraph];
    let sentenceChunk = [];
    for (const sentence of sentences.map((item) => item.trim()).filter(Boolean)) {
      const sentenceCandidate = [...sentenceChunk, sentence];
      if (paragraphsToSsml([sentenceCandidate.join(' ')], emotion).length <= MAX_STREAM_CHARS) {
        sentenceChunk = sentenceCandidate;
        continue;
      }
      if (sentenceChunk.length === 0) {
        throw new Error('A single sentence exceeds the Speechify stream character limit.');
      }
      chunks.push(paragraphsToSsml([sentenceChunk.join(' ')], emotion));
      sentenceChunk = [sentence];
    }
    if (sentenceChunk.length > 0) {
      current = [sentenceChunk.join(' ')];
    }
  }

  if (current.length > 0) chunks.push(paragraphsToSsml(current, emotion));
  return chunks.length > 0 ? chunks : [scriptToSsml(scriptBody, emotion)];
}

function estimateAudio(scriptBody) {
  const ssml = scriptToSsml(scriptBody);
  const chunks = ssmlChunks(scriptBody);
  const plainCharacters = scriptBody.length;
  const ssmlCharacters = ssml.length;
  const estimatedWords = scriptBody.split(/\s+/).filter(Boolean).length;
  const estimatedMinutes = Math.round((estimatedWords / 150) * 10) / 10;
  return {
    plainCharacters,
    ssmlCharacters,
    estimatedWords,
    estimatedMinutes,
    endpoint: SPEECHIFY_STREAM_ENDPOINT,
    requiresChunking: ssmlCharacters > MAX_STREAM_CHARS,
    chunkCount: chunks.length,
    maxChunkCharacters: Math.max(...chunks.map((chunk) => chunk.length)),
    maxStreamCharacters: MAX_STREAM_CHARS,
  };
}

function baseManifest({
  article,
  scriptBody,
  slug,
  generatedAt,
  status,
  voiceId = null,
  audioPath = null,
  audioBytes = null,
  audioHash = null,
}) {
  return {
    schemaVersion: AUDIO_SCHEMA_VERSION,
    slug,
    title: article.meta.title,
    status,
    sourceArticlePath: article.path,
    sourceHash: sha256(article.raw),
    scriptPath: audioScriptPath(path.dirname(path.dirname(article.path)), slug),
    scriptHash: sha256(scriptBody),
    preparedAt: generatedAt,
    voiceProvider: 'speechify',
    voiceId,
    model: DEFAULT_MODEL,
    language: DEFAULT_LANGUAGE,
    audioFormat: 'mp3',
    outputPath: audioPath,
    publicSrc: audioPath ? `/audio/voice/blog/${slug}.mp3` : null,
    audioBytes,
    audioHash,
    quote: estimateAudio(scriptBody),
    decisionSeam: {
      name: 'paid-audio-generation',
      safeDefault: 'do-not-generate',
      approvalRequired: true,
    },
    observation: {
      claim: 'article audio has a versioned script and generation receipt',
      status: status === 'current' ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'audio-manifest.json',
        'audio.md sourceHash and scriptHash',
        'public MP3 checksum',
        'ROM heartbeat',
      ],
    },
  };
}

export function prepareArticleAudio({
  articlesRoot,
  slug,
  force = false,
  generatedAt = new Date().toISOString(),
}) {
  const article = readArticle(articlesRoot, slug);
  const scriptPath = audioScriptPath(articlesRoot, slug);
  const existing = readAudioScript(articlesRoot, slug);
  const sourceHash = sha256(article.raw);

  if (existing && !force) {
    const existingHash = existing.meta.sourceHash;
    return {
      slug,
      action: existingHash === sourceHash ? 'skipped-current-script' : 'skipped-stale-script',
      scriptPath,
      status: existingHash === sourceHash ? 'script-current' : 'audio-script-stale',
      sourceHash,
      scriptSourceHash: existingHash ?? null,
      note: 'Use --force to regenerate audio.md from the canonical article.',
    };
  }

  const scriptBody = normalizeForSpeech(article.body);
  fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
  writeAudioMarkdown(scriptPath, {
    title: `${article.meta.title} - Audio Version`,
    sourceArticle: slug,
    sourceHash,
    status: 'needs-approval',
    preparedAt: generatedAt,
    format: 'spoken-markdown-v1',
  }, scriptBody);

  const manifest = baseManifest({
    article,
    scriptBody,
    slug,
    generatedAt,
    status: 'script-prepared',
  });
  writeJson(audioManifestPath(articlesRoot, slug), manifest);

  return {
    slug,
    action: 'prepared-audio-script',
    scriptPath,
    manifestPath: audioManifestPath(articlesRoot, slug),
    manifest,
  };
}

export function approveArticleAudio({
  articlesRoot,
  slug,
  approvedAt = new Date().toISOString(),
}) {
  const script = readAudioScript(articlesRoot, slug);
  if (!script) throw new Error(`Missing audio script for "${slug}". Run audio:prepare first.`);
  const manifest = readManifest(articlesRoot, slug);
  if (!manifest) throw new Error(`Missing audio manifest for "${slug}". Run audio:prepare first.`);
  const article = readArticle(articlesRoot, slug);
  const sourceHash = sha256(article.raw);
  if (script.meta.sourceHash !== sourceHash) {
    throw new Error(`Audio script for "${slug}" is stale. Run audio:prepare --force before approval.`);
  }

  const nextManifest = {
    ...manifest,
    status: 'script-approved',
    approvedAt,
    sourceHash,
    scriptHash: sha256(script.body),
  };
  writeJson(audioManifestPath(articlesRoot, slug), nextManifest);
  return {
    slug,
    action: 'approved-audio-script',
    manifestPath: audioManifestPath(articlesRoot, slug),
    manifest: nextManifest,
  };
}

function getSpeechifyApiKey() {
  return process.env.SPEECHIFY_API_KEY;
}

function getSpeechifyVoiceId(options = {}) {
  return options.voiceId ?? process.env.SPEECHIFY_VOICE_ID;
}

async function speechifyStream({ input, voiceId, apiKey }) {
  const response = await fetch(SPEECHIFY_STREAM_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg,application/json',
    },
    body: JSON.stringify({
      input,
      voice_id: voiceId,
      audio_format: 'mp3',
      model: DEFAULT_MODEL,
      language: DEFAULT_LANGUAGE,
    }),
  });

  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok) {
    const errorBody = contentType.includes('application/json')
      ? JSON.stringify(await response.json())
      : await response.text();
    throw new Error(`Speechify API ${response.status}: ${errorBody}`);
  }

  if (contentType.includes('application/json')) {
    const payload = await response.json();
    const base64 = payload.audio_data ?? payload.audioData ?? payload.audio;
    if (!base64) throw new Error('Speechify returned JSON without audio_data.');
    return Buffer.from(base64, 'base64');
  }

  return Buffer.from(await response.arrayBuffer());
}

function concatMp3Chunks({ chunks, outputPath, tempRoot, slug }) {
  if (chunks.length === 1) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, chunks[0]);
    return;
  }

  const tempDir = path.join(tempRoot, `.audio-${slug}-${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });
  const listPath = path.join(tempDir, 'chunks.txt');
  const chunkPaths = chunks.map((chunk, index) => {
    const chunkPath = path.join(tempDir, `chunk-${String(index + 1).padStart(3, '0')}.mp3`);
    fs.writeFileSync(chunkPath, chunk);
    return chunkPath;
  });
  fs.writeFileSync(
    listPath,
    chunkPaths.map((chunkPath) => `file '${chunkPath.replace(/'/g, "'\\''")}'`).join('\n'),
  );
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const ffmpeg = spawnSync('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    listPath,
    '-c',
    'copy',
    outputPath,
  ], { encoding: 'utf8' });
  fs.rmSync(tempDir, { recursive: true, force: true });
  if (ffmpeg.status !== 0) {
    throw new Error(`ffmpeg failed to concatenate Speechify chunks: ${ffmpeg.stderr.trim()}`);
  }
}

export async function generateArticleAudio({
  articlesRoot,
  publicRoot,
  slug,
  spendApproved = false,
  force = false,
  voiceId,
  generatedAt = new Date().toISOString(),
} = {}) {
  if (!spendApproved) {
    throw new Error('audio:generate requires --spend-approved because Speechify generation costs money.');
  }

  const apiKey = getSpeechifyApiKey();
  if (!apiKey) throw new Error('Missing SPEECHIFY_API_KEY.');
  const resolvedVoiceId = getSpeechifyVoiceId({ voiceId });
  if (!resolvedVoiceId) throw new Error('Missing SPEECHIFY_VOICE_ID or --voice-id=<id>.');

  const article = readArticle(articlesRoot, slug);
  const script = readAudioScript(articlesRoot, slug);
  if (!script) throw new Error(`Missing audio script for "${slug}". Run audio:prepare first.`);
  const manifest = readManifest(articlesRoot, slug);
  if (!manifest) throw new Error(`Missing audio manifest for "${slug}". Run audio:prepare first.`);

  const sourceHash = sha256(article.raw);
  const scriptHash = sha256(script.body);
  const outputPath = audioOutputPath(publicRoot, slug);
  if (manifest.status !== 'script-approved' && !force) {
    throw new Error(`Audio script for "${slug}" is not approved. Run audio:approve first.`);
  }
  if (script.meta.sourceHash !== sourceHash && !force) {
    throw new Error(`Audio script for "${slug}" is stale. Run audio:prepare --force before generation.`);
  }
  if (
    fs.existsSync(outputPath) &&
    manifest.scriptHash === scriptHash &&
    manifest.status === 'current' &&
    !force
  ) {
    return {
      slug,
      action: 'skipped-current-audio',
      outputPath,
      manifest,
    };
  }

  const chunks = ssmlChunks(script.body);
  const tooLong = chunks.find((chunk) => chunk.length > MAX_STREAM_CHARS);
  if (tooLong) {
    throw new Error(`Speechify stream chunk is ${tooLong.length} characters; max is ${MAX_STREAM_CHARS}. Shorten audio.md before generating.`);
  }

  const audioChunks = [];
  for (const chunk of chunks) {
    audioChunks.push(await speechifyStream({
      input: chunk,
      voiceId: resolvedVoiceId,
      apiKey,
    }));
  }
  concatMp3Chunks({
    chunks: audioChunks,
    outputPath,
    tempRoot: path.dirname(outputPath),
    slug,
  });
  const audioBuffer = fs.readFileSync(outputPath);

  const nextManifest = baseManifest({
    article,
    scriptBody: script.body,
    slug,
    generatedAt,
    status: 'current',
    voiceId: resolvedVoiceId,
    audioPath: outputPath,
    audioBytes: audioBuffer.length,
    audioHash: sha256(audioBuffer),
  });
  nextManifest.generatedAt = generatedAt;
  nextManifest.approvedAt = manifest.approvedAt ?? null;
  nextManifest.chunkCount = chunks.length;
  nextManifest.chunkCharacters = chunks.map((chunk) => chunk.length);
  writeJson(audioManifestPath(articlesRoot, slug), nextManifest);

  return {
    slug,
    action: 'generated-audio',
    outputPath,
    publicSrc: nextManifest.publicSrc,
    bytes: audioBuffer.length,
    manifestPath: audioManifestPath(articlesRoot, slug),
    manifest: nextManifest,
  };
}

export function quoteArticleAudio({ articlesRoot, slug }) {
  const script = readAudioScript(articlesRoot, slug);
  if (!script) throw new Error(`Missing audio script for "${slug}". Run audio:prepare first.`);
  return {
    slug,
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    quote: estimateAudio(script.body),
    status: script.meta.status ?? 'unknown',
  };
}

function statusForSlug({ articlesRoot, publicRoot, slug }) {
  const article = readArticle(articlesRoot, slug);
  const script = readAudioScript(articlesRoot, slug);
  const manifest = readManifest(articlesRoot, slug);
  const outputPath = audioOutputPath(publicRoot, slug);
  const sourceHash = sha256(article.raw);
  const scriptHash = script ? sha256(script.body) : null;
  const audioExists = fs.existsSync(outputPath);
  const audioHash = audioExists ? sha256(fs.readFileSync(outputPath)) : null;
  let status = 'needs-audio-script';

  if (script && script.meta.sourceHash !== sourceHash) status = 'audio-script-stale';
  else if (script && !manifest) status = 'needs-manifest';
  else if (script && manifest?.status === 'script-prepared') status = 'needs-script-approval';
  else if (script && manifest?.status === 'script-approved' && !audioExists) status = 'ready-for-paid-generation';
  else if (script && audioExists && manifest?.scriptHash !== scriptHash) status = 'audio-generation-stale';
  else if (script && audioExists && manifest?.audioHash !== audioHash) status = 'audio-file-changed';
  else if (script && audioExists) status = 'current';

  return {
    slug,
    title: article.meta.title,
    status,
    sourceHash,
    scriptPath: script?.path ?? audioScriptPath(articlesRoot, slug),
    scriptHash,
    manifestPath: audioManifestPath(articlesRoot, slug),
    manifestStatus: manifest?.status ?? null,
    outputPath,
    publicSrc: audioExists ? `/audio/voice/blog/${slug}.mp3` : null,
    audioExists,
    audioHash,
    quote: script ? estimateAudio(script.body) : null,
  };
}

export function audioStatus({ articlesRoot, publicRoot, slug }) {
  const slugs = slug === 'all' || !slug ? articleSlugs(articlesRoot) : [slug];
  const articles = slugs.map((articleSlug) => statusForSlug({
    articlesRoot,
    publicRoot,
    slug: articleSlug,
  }));
  const summary = articles.reduce((acc, item) => {
    acc[item.status] ??= 0;
    acc[item.status] += 1;
    return acc;
  }, {});
  return {
    generatedAt: new Date().toISOString(),
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    summary,
    articles,
    observation: {
      claim: 'article narration status is derived from article, audio script, manifest, and MP3 checksums',
      status: Object.keys(summary).length === 1 && summary.current ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'audio-manifest.json',
        'audio.md source hash',
        'public/audio/voice/blog MP3 checksum',
        'ROM heartbeat',
      ],
    },
  };
}

export function writeGeneratedBlogVoiceTracks({
  articlesRoot,
  publicRoot,
  outputPath,
}) {
  const tracks = articleSlugs(articlesRoot)
    .map((slug) => statusForSlug({ articlesRoot, publicRoot, slug }))
    .filter((item) => item.audioExists && item.status === 'current')
    .map((item) => ({
      id: item.slug,
      title: item.title,
      artist: 'Narration by David Mieloch',
      src: item.publicSrc,
      description: `Audio version of ${item.title}.`,
    }));

  const body = `import { AudioTrack } from '../DualAudio.types';

// Generated by pnpm content:pipeline audio:tracks. Do not edit by hand.
export const generatedBlogVoiceTracks: AudioTrack[] = ${JSON.stringify(tracks, null, 2)};
`;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, body);
  return {
    outputPath,
    tracks,
  };
}
