import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const AUDIO_SCHEMA_VERSION = 'article-audio-v1';
const AUDIO_TRANSCRIPT_SCHEMA_VERSION = 'article-audio-transcript-v1';
const SPEECHIFY_STREAM_ENDPOINT = 'https://api.speechify.ai/v1/audio/stream';
const OPENAI_TRANSCRIPTION_ENDPOINT = 'https://api.openai.com/v1/audio/transcriptions';
const DEFAULT_MODEL = 'simba-english';
const DEFAULT_TRANSCRIPTION_MODEL = 'gpt-4o-transcribe';
const DEFAULT_LANGUAGE = 'en';
const MAX_STREAM_CHARS = 20000;
const GENERATION_CHUNK_CHARS = 3500;
const MIN_AUDIO_DURATION_RATIO = 0.7;
const MIN_TRANSCRIPT_WORD_RATIO = 0.8;
const MAX_TRANSCRIPT_WORD_RATIO = 1.25;
const MIN_TRANSCRIPT_ORDERED_COVERAGE = 0.72;
const MIN_TRANSCRIPT_TAIL_COVERAGE = 0.68;
const MP3_BYTES_PER_SECOND = 8000;

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

function audioTranscriptPath(articlesRoot, slug) {
  return path.join(articlesRoot, slug, 'audio-transcript.json');
}

function audioOutputPath(publicRoot, slug) {
  return path.join(publicRoot, 'audio', 'voice', 'blog', `${slug}.mp3`);
}

function audioBookOutputPath(publicRoot, collectionId) {
  return path.join(publicRoot, 'audio', 'voice', 'books', `${collectionId}.mp3`);
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

function readTranscriptVerification(articlesRoot, slug) {
  const filePath = audioTranscriptPath(articlesRoot, slug);
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

function ssmlChunks(scriptBody, emotion = 'direct', maxCharacters = MAX_STREAM_CHARS) {
  const paragraphs = paragraphize(scriptBody);
  const chunks = [];
  let current = [];

  for (const paragraph of paragraphs) {
    const candidate = [...current, paragraph];
    const candidateSsml = paragraphsToSsml(candidate, emotion);
    if (candidateSsml.length <= maxCharacters) {
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
      if (paragraphsToSsml([sentenceCandidate.join(' ')], emotion).length <= maxCharacters) {
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

function stripSsml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimatedSpeechSeconds(value) {
  const words = stripSsml(value).split(/\s+/).filter(Boolean).length;
  return (words / 150) * 60;
}

function estimatedMp3Seconds(buffer) {
  return buffer.length / MP3_BYTES_PER_SECOND;
}

function roundMetric(value) {
  return Number.isFinite(value) ? Math.round(value * 1000) / 1000 : 0;
}

function comparisonWords(value) {
  return String(value)
    .replace(/\b((?:[a-z]\.){2,})/gi, (match) => match.replace(/\./g, ''))
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9']+/g, ' ')
    .split(/\s+/)
    .map((word) => word.replace(/^'+|'+$/g, ''))
    .filter(Boolean);
}

function orderedCoverage(sourceWords, transcriptWords) {
  if (sourceWords.length === 0) return 1;
  if (transcriptWords.length === 0) return 0;

  let previous = new Uint32Array(transcriptWords.length + 1);
  let current = new Uint32Array(transcriptWords.length + 1);

  for (const sourceWord of sourceWords) {
    for (let index = 0; index < transcriptWords.length; index += 1) {
      current[index + 1] = sourceWord === transcriptWords[index]
        ? previous[index] + 1
        : Math.max(previous[index + 1], current[index]);
    }
    [previous, current] = [current, previous];
    current.fill(0);
  }

  return previous[transcriptWords.length] / sourceWords.length;
}

function compareTranscriptToScript(scriptBody, transcript) {
  const scriptWords = comparisonWords(scriptBody);
  const transcriptWords = comparisonWords(transcript);
  const wordCountRatio = scriptWords.length > 0
    ? transcriptWords.length / scriptWords.length
    : 0;
  const ordered = orderedCoverage(scriptWords, transcriptWords);
  const tailSize = Math.min(
    scriptWords.length,
    Math.max(20, Math.ceil(scriptWords.length * 0.12)),
  );
  const tailWords = tailSize > 0 ? scriptWords.slice(-tailSize) : [];
  const tailCoverage = orderedCoverage(tailWords, transcriptWords);
  const wordRatioPass = wordCountRatio >= MIN_TRANSCRIPT_WORD_RATIO
    && wordCountRatio <= MAX_TRANSCRIPT_WORD_RATIO;
  const orderedCoveragePass = ordered >= MIN_TRANSCRIPT_ORDERED_COVERAGE;
  const tailCoveragePass = tailCoverage >= MIN_TRANSCRIPT_TAIL_COVERAGE;
  const status = wordRatioPass && orderedCoveragePass && tailCoveragePass
    ? 'PASS'
    : 'FAIL';

  return {
    status,
    scriptWordCount: scriptWords.length,
    transcriptWordCount: transcriptWords.length,
    wordCountRatio: roundMetric(wordCountRatio),
    orderedCoverage: roundMetric(ordered),
    tailCoverage: roundMetric(tailCoverage),
    wordRatioPass,
    orderedCoveragePass,
    tailCoveragePass,
    thresholds: {
      minWordCountRatio: MIN_TRANSCRIPT_WORD_RATIO,
      maxWordCountRatio: MAX_TRANSCRIPT_WORD_RATIO,
      minOrderedCoverage: MIN_TRANSCRIPT_ORDERED_COVERAGE,
      minTailCoverage: MIN_TRANSCRIPT_TAIL_COVERAGE,
    },
  };
}

function audioDurationSeconds(filePath) {
  const ffprobe = spawnSync('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    filePath,
  ], { encoding: 'utf8' });

  if (ffprobe.status !== 0) return null;
  const duration = Number.parseFloat(ffprobe.stdout.trim());
  return Number.isFinite(duration) ? duration : null;
}

function validateAudioDuration({ actualSeconds, expectedSeconds, label }) {
  if (!actualSeconds || !expectedSeconds || expectedSeconds < 20) return;
  const ratio = actualSeconds / expectedSeconds;
  if (ratio < MIN_AUDIO_DURATION_RATIO) {
    throw new Error(`${label} duration too short: ${Math.round(actualSeconds)}s generated for estimated ${Math.round(expectedSeconds)}s script (${ratio.toFixed(2)} ratio).`);
  }
}

function assertSpeechifyChunkComplete({ buffer, input, slug, index }) {
  validateAudioDuration({
    actualSeconds: estimatedMp3Seconds(buffer),
    expectedSeconds: estimatedSpeechSeconds(input),
    label: `Speechify audio for ${slug} chunk ${index + 1}`,
  });
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
    '-y',
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

function concatMp3Files({ inputPaths, outputPath, tempRoot, collectionId }) {
  if (inputPaths.length === 0) {
    throw new Error('Cannot create an audiobook without current article MP3 files.');
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  if (inputPaths.length === 1) {
    fs.copyFileSync(inputPaths[0], outputPath);
    return;
  }

  const tempDir = path.join(tempRoot, `.audio-book-${collectionId}-${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });
  const listPath = path.join(tempDir, 'chapters.txt');
  fs.writeFileSync(
    listPath,
    inputPaths.map((inputPath) => `file '${inputPath.replace(/'/g, "'\\''")}'`).join('\n'),
  );

  const ffmpeg = spawnSync('ffmpeg', [
    '-hide_banner',
    '-y',
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
    throw new Error(`ffmpeg failed to concatenate audiobook chapters: ${ffmpeg.stderr.trim()}`);
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

  const chunks = ssmlChunks(script.body, 'direct', GENERATION_CHUNK_CHARS);
  const tooLong = chunks.find((chunk) => chunk.length > MAX_STREAM_CHARS);
  if (tooLong) {
    throw new Error(`Speechify stream chunk is ${tooLong.length} characters; max is ${MAX_STREAM_CHARS}. Shorten audio.md before generating.`);
  }

  const audioChunks = [];
  for (const [index, chunk] of chunks.entries()) {
    const audioChunk = await speechifyStream({
      input: chunk,
      voiceId: resolvedVoiceId,
      apiKey,
    });
    assertSpeechifyChunkComplete({ buffer: audioChunk, input: chunk, slug, index });
    audioChunks.push(audioChunk);
  }
  concatMp3Chunks({
    chunks: audioChunks,
    outputPath,
    tempRoot: path.dirname(outputPath),
    slug,
  });
  const audioBuffer = fs.readFileSync(outputPath);
  const actualDurationSeconds = audioDurationSeconds(outputPath) ?? estimatedMp3Seconds(audioBuffer);
  const expectedDurationSeconds = estimatedSpeechSeconds(script.body);
  validateAudioDuration({
    actualSeconds: actualDurationSeconds,
    expectedSeconds: expectedDurationSeconds,
    label: `Generated audio for ${slug}`,
  });

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
  nextManifest.audioDurationSeconds = Math.round(actualDurationSeconds * 100) / 100;
  nextManifest.expectedDurationSeconds = Math.round(expectedDurationSeconds * 100) / 100;
  nextManifest.audioDurationRatio = Math.round((actualDurationSeconds / expectedDurationSeconds) * 100) / 100;
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

export function verifyArticleAudioTranscript({
  articlesRoot,
  publicRoot,
  slug,
  transcript,
  provider = 'manual',
  model = 'unknown',
  generatedAt = new Date().toISOString(),
  failOnMismatch = true,
} = {}) {
  const article = readArticle(articlesRoot, slug);
  const script = readAudioScript(articlesRoot, slug);
  if (!script) throw new Error(`Missing audio script for "${slug}". Run audio:prepare first.`);

  const outputPath = audioOutputPath(publicRoot, slug);
  if (!fs.existsSync(outputPath)) {
    throw new Error(`Missing generated MP3 for "${slug}": ${outputPath}`);
  }

  const audioBuffer = fs.readFileSync(outputPath);
  const audioSeconds = audioDurationSeconds(outputPath) ?? estimatedMp3Seconds(audioBuffer);
  const expectedSeconds = estimatedSpeechSeconds(script.body);
  const comparison = compareTranscriptToScript(script.body, transcript);
  const payload = {
    schemaVersion: AUDIO_TRANSCRIPT_SCHEMA_VERSION,
    slug,
    title: article.meta.title,
    status: comparison.status === 'PASS' ? 'current' : 'failed',
    generatedAt,
    provider,
    model,
    sourceArticlePath: article.path,
    sourceHash: sha256(article.raw),
    scriptPath: script.path,
    scriptHash: sha256(script.body),
    audioPath: outputPath,
    audioBytes: audioBuffer.length,
    audioHash: sha256(audioBuffer),
    audioDurationSeconds: Math.round(audioSeconds * 100) / 100,
    expectedDurationSeconds: Math.round(expectedSeconds * 100) / 100,
    transcriptHash: sha256(transcript),
    transcript,
    comparison,
  };

  writeJson(audioTranscriptPath(articlesRoot, slug), payload);

  if (comparison.status !== 'PASS' && failOnMismatch) {
    const error = new Error(`Transcript verification failed for "${slug}".`);
    error.payload = payload;
    throw error;
  }

  return payload;
}

function transcriptStatusForSlug({ articlesRoot, publicRoot, slug }) {
  const article = readArticle(articlesRoot, slug);
  const script = readAudioScript(articlesRoot, slug);
  const outputPath = audioOutputPath(publicRoot, slug);
  const transcriptPath = audioTranscriptPath(articlesRoot, slug);
  const transcriptVerification = readTranscriptVerification(articlesRoot, slug);
  const audioExists = fs.existsSync(outputPath);
  const audioBuffer = audioExists ? fs.readFileSync(outputPath) : null;
  const audioHash = audioBuffer ? sha256(audioBuffer) : null;
  const scriptHash = script ? sha256(script.body) : null;
  const staleReasons = [];

  if (transcriptVerification && scriptHash && transcriptVerification.scriptHash !== scriptHash) {
    staleReasons.push('script-hash-mismatch');
  }
  if (transcriptVerification && audioHash && transcriptVerification.audioHash !== audioHash) {
    staleReasons.push('audio-hash-mismatch');
  }

  let status = 'needs-audio-script';
  if (script && !audioExists) status = 'needs-audio-file';
  else if (script && audioExists && !transcriptVerification) status = 'needs-transcript-verification';
  else if (script && audioExists && staleReasons.length > 0) status = 'audio-transcript-stale';
  else if (script && audioExists && transcriptVerification?.comparison?.status !== 'PASS') status = 'audio-transcript-failed';
  else if (script && audioExists) status = 'current';

  return {
    slug,
    title: article.meta.title,
    status,
    transcriptPath,
    transcriptExists: Boolean(transcriptVerification),
    provider: transcriptVerification?.provider ?? null,
    model: transcriptVerification?.model ?? null,
    scriptHash,
    transcriptScriptHash: transcriptVerification?.scriptHash ?? null,
    audioHash,
    transcriptAudioHash: transcriptVerification?.audioHash ?? null,
    staleReasons,
    comparison: transcriptVerification?.comparison ?? null,
  };
}

export function audioTranscriptStatus({ articlesRoot, publicRoot, slug }) {
  const slugs = slug === 'all' || !slug ? articleSlugs(articlesRoot) : [slug];
  const articles = slugs.map((articleSlug) => transcriptStatusForSlug({
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
      claim: 'article narration transcript proof matches current audio script and MP3 checksums',
      status: Object.keys(summary).length === 1 && summary.current ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'audio-transcript.json source and audio hashes',
        'transcript coverage comparison',
        'public/audio/voice/blog MP3 checksum',
        'ROM heartbeat',
      ],
    },
  };
}

export async function transcribeArticleAudio({
  articlesRoot,
  publicRoot,
  slug,
  spendApproved = false,
  force = false,
  model = DEFAULT_TRANSCRIPTION_MODEL,
  generatedAt = new Date().toISOString(),
} = {}) {
  if (!spendApproved) {
    throw new Error('audio:transcribe-verify requires --spend-approved because transcription costs money.');
  }

  const existingStatus = transcriptStatusForSlug({ articlesRoot, publicRoot, slug });
  if (existingStatus.status === 'current' && !force) {
    return {
      slug,
      action: 'skipped-current-transcript-verification',
      transcriptPath: existingStatus.transcriptPath,
      status: existingStatus,
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY.');
  }

  const outputPath = audioOutputPath(publicRoot, slug);
  if (!fs.existsSync(outputPath)) {
    throw new Error(`Missing generated MP3 for "${slug}": ${outputPath}`);
  }

  const form = new FormData();
  const audioBuffer = fs.readFileSync(outputPath);
  form.append('model', model);
  form.append('response_format', 'json');
  form.append('file', new Blob([audioBuffer], { type: 'audio/mpeg' }), `${slug}.mp3`);

  const response = await fetch(OPENAI_TRANSCRIPTION_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: form,
  });

  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok) {
    const errorBody = contentType.includes('application/json')
      ? JSON.stringify(await response.json())
      : await response.text();
    throw new Error(`OpenAI transcription API ${response.status}: ${errorBody}`);
  }

  const result = await response.json();
  if (!result.text) {
    throw new Error('OpenAI transcription response did not include text.');
  }

  return verifyArticleAudioTranscript({
    articlesRoot,
    publicRoot,
    slug,
    transcript: result.text,
    provider: 'openai',
    model,
    generatedAt,
  });
}

function statusForSlug({ articlesRoot, publicRoot, slug }) {
  const article = readArticle(articlesRoot, slug);
  const script = readAudioScript(articlesRoot, slug);
  const manifest = readManifest(articlesRoot, slug);
  const outputPath = audioOutputPath(publicRoot, slug);
  const sourceHash = sha256(article.raw);
  const scriptHash = script ? sha256(script.body) : null;
  const audioExists = fs.existsSync(outputPath);
  const audioBuffer = audioExists ? fs.readFileSync(outputPath) : null;
  const audioHash = audioBuffer ? sha256(audioBuffer) : null;
  const expectedDurationSeconds = script ? estimatedSpeechSeconds(script.body) : null;
  const actualDurationSeconds = audioBuffer
    ? audioDurationSeconds(outputPath) ?? estimatedMp3Seconds(audioBuffer)
    : null;
  const audioDurationRatio = actualDurationSeconds && expectedDurationSeconds
    ? actualDurationSeconds / expectedDurationSeconds
    : null;
  let status = 'needs-audio-script';

  if (script && script.meta.sourceHash !== sourceHash) status = 'audio-script-stale';
  else if (script && !manifest) status = 'needs-manifest';
  else if (script && manifest?.status === 'script-prepared') status = 'needs-script-approval';
  else if (script && manifest?.status === 'script-approved' && !audioExists) status = 'ready-for-paid-generation';
  else if (script && audioExists && manifest?.scriptHash !== scriptHash) status = 'audio-generation-stale';
  else if (script && audioExists && manifest?.audioHash !== audioHash) status = 'audio-file-changed';
  else if (script && audioExists && audioDurationRatio && audioDurationRatio < MIN_AUDIO_DURATION_RATIO) status = 'audio-duration-short';
  else if (script && audioExists) status = 'current';

  return {
    slug,
    title: article.meta.title,
    publishedAt: article.meta.publishedAt ?? article.meta.date ?? null,
    series: article.meta.series ?? null,
    status,
    sourceHash,
    scriptPath: script?.path ?? audioScriptPath(articlesRoot, slug),
    scriptHash,
    manifestPath: audioManifestPath(articlesRoot, slug),
    manifestStatus: manifest?.status ?? null,
    outputPath,
    publicSrc: audioExists ? `/audio/voice/blog/${slug}.mp3` : null,
    audioExists,
    audioBytes: audioExists ? fs.statSync(outputPath).size : null,
    audioDurationSeconds: actualDurationSeconds ? Math.round(actualDurationSeconds * 100) / 100 : null,
    expectedDurationSeconds: expectedDurationSeconds ? Math.round(expectedDurationSeconds * 100) / 100 : null,
    audioDurationRatio: audioDurationRatio ? Math.round(audioDurationRatio * 100) / 100 : null,
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
    .filter((item) => item.audioExists)
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

export function normalizeAudioCollectionId(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'all';
}

export function buildAudioBook({
  articlesRoot,
  publicRoot,
  collectionId = 'all',
  collectionTitle,
  series,
  manifestPath,
  write = false,
} = {}) {
  const requestedCollectionId = normalizeAudioCollectionId(collectionId);
  const requestedSeries = series ?? (requestedCollectionId === 'all' ? null : requestedCollectionId);
  const chapters = articleSlugs(articlesRoot)
    .map((slug) => statusForSlug({ articlesRoot, publicRoot, slug }))
    .filter((item) => item.status === 'current')
    .filter((item) => (
      requestedSeries
        ? normalizeAudioCollectionId(item.series ?? '') === normalizeAudioCollectionId(requestedSeries)
        : true
    ))
    .sort((left, right) => (
      String(left.publishedAt ?? '').localeCompare(String(right.publishedAt ?? '')) ||
      left.title.localeCompare(right.title)
    ));

  const totalEstimatedMinutes = Math.round(
    chapters.reduce((sum, chapter) => sum + (chapter.quote?.estimatedMinutes ?? 0), 0) * 10,
  ) / 10;
  const totalBytes = chapters.reduce((sum, chapter) => sum + (chapter.audioBytes ?? 0), 0);
  const outputPath = audioBookOutputPath(publicRoot, requestedCollectionId);
  const manifest = {
    schemaVersion: 'article-audio-book-v1',
    collectionId: requestedCollectionId,
    title: collectionTitle ?? (requestedSeries ? `${requestedSeries} - Audiobook` : 'All Articles - Audiobook'),
    series: requestedSeries,
    status: write ? 'current' : 'planned',
    publicSrc: write ? `/audio/voice/books/${requestedCollectionId}.mp3` : null,
    outputPath: write ? outputPath : null,
    audioBytes: write ? null : totalBytes,
    audioHash: null,
    chapterCount: chapters.length,
    totalEstimatedMinutes,
    chapters: chapters.map((chapter, index) => ({
      index: index + 1,
      slug: chapter.slug,
      title: chapter.title,
      publishedAt: chapter.publishedAt,
      series: chapter.series,
      publicSrc: chapter.publicSrc,
      audioBytes: chapter.audioBytes,
      audioHash: chapter.audioHash,
      estimatedMinutes: chapter.quote?.estimatedMinutes ?? null,
    })),
    decisionSeam: {
      name: 'audiobook-assembly',
      safeDefault: 'dry-run-only',
      approvalRequired: false,
      note: 'This combines already-approved article MP3 files and does not call a paid TTS API.',
    },
    observation: {
      claim: 'audiobook chapters are derived from current article audio manifests and MP3 checksums',
      status: chapters.length > 0 ? 'PASS' : 'DEGRADED',
      fallbackChain: [
        'per-article audio-manifest.json',
        'public/audio/voice/blog MP3 checksums',
        'audiobook manifest',
        'ROM heartbeat',
      ],
    },
  };

  if (write) {
    concatMp3Files({
      inputPaths: chapters.map((chapter) => chapter.outputPath),
      outputPath,
      tempRoot: path.dirname(outputPath),
      collectionId: requestedCollectionId,
    });
    const audioBuffer = fs.readFileSync(outputPath);
    manifest.outputPath = outputPath;
    manifest.publicSrc = `/audio/voice/books/${requestedCollectionId}.mp3`;
    manifest.audioBytes = audioBuffer.length;
    manifest.audioHash = sha256(audioBuffer);
    manifest.generatedAt = new Date().toISOString();
  }

  if (manifestPath) {
    writeJson(manifestPath, manifest);
  }

  return {
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    collectionId: requestedCollectionId,
    action: write ? 'generated-audiobook' : 'planned-audiobook',
    manifestPath: manifestPath ?? null,
    manifest,
  };
}
