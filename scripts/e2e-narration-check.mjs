import fs from 'node:fs/promises';

import puppeteer from 'puppeteer';

const baseUrl = (process.env.E2E_BASE_URL || 'http://127.0.0.1:3001').replace(/\/+$/, '');
const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || await findChromeExecutable();
const generatedTracksPath = new URL('../src/shared-components/organisms/Footer/components/dual-audio/playlists/generatedBlogVoiceTracks.ts', import.meta.url);
const generatedTracksSource = await fs.readFile(generatedTracksPath, 'utf8');

const tracks = Array.from(generatedTracksSource.matchAll(/"id": "([^"]+)"[\s\S]*?"src": "([^"]+)"/g))
  .map((match) => ({ id: match[1], src: match[2] }));

const failures = [];

if (tracks.length === 0) {
  failures.push({ kind: 'registry', message: 'No generated blog narration tracks were found.' });
}

for (const track of tracks) {
  const url = `${baseUrl}${track.src}`;
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type') || '';
    const contentLength = Number(response.headers.get('content-length') || 0);

    if (!response.ok || !contentType.includes('audio/') || contentLength <= 0) {
      failures.push({
        kind: 'audio-asset',
        track,
        status: response.status,
        contentType,
        contentLength,
      });
    }
  } catch (error) {
    failures.push({ kind: 'audio-asset', track, error: error.message });
  }
}

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath,
  args: ['--disable-gpu', '--no-sandbox'],
});

try {
  const page = await browser.newPage();
  const target = tracks.find((track) => track.id === 'the-factory') || tracks[0];
  await page.goto(`${baseUrl}/blog/${target.id}`, { waitUntil: 'networkidle2', timeout: 30_000 });

  const result = await page.evaluate((expectedSrc) => {
    const audioElements = Array.from(document.querySelectorAll('audio')).map((element) => ({
      src: element.currentSrc || element.src,
      preload: element.preload,
    }));
    const bodyText = document.body.textContent || '';

    return {
      audioElements,
      hasExpectedAudioSrc: audioElements.some((element) => element.src.includes(expectedSrc)),
      hasNarrationText: bodyText.includes('Narration') || bodyText.includes('Audio'),
    };
  }, target.src);

  if (!result.hasExpectedAudioSrc) {
    failures.push({
      kind: 'browser-audio-binding',
      track: target,
      result,
    });
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error(JSON.stringify({ ok: false, baseUrl, checkedTracks: tracks.length, failures }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ ok: true, baseUrl, checkedTracks: tracks.length }, null, 2));
}

async function findChromeExecutable() {
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next well-known browser path.
    }
  }

  return undefined;
}
