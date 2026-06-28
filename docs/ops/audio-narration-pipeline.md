# Audio Narration Pipeline

Generated: 2026-06-05

## Purpose

Generate article narration in David's cloned voice once, store the resulting MP3 in version control, and load it through the existing footer narration player.

## Deterministic Spine

Source article:

- `content/articles/<slug>/index.md`

Audio artifacts:

- `content/articles/<slug>/audio.md`
- `content/articles/<slug>/audio-manifest.json`
- `content/articles/<slug>/audio-transcript.json`
- `public/audio/voice/blog/<slug>.mp3`
- `src/shared-components/organisms/Footer/components/dual-audio/playlists/generatedBlogVoiceTracks.ts`

## Workflow

1. Prepare spoken script:

```bash
pnpm content:pipeline audio:prepare <slug>
```

This strips images, tables, code blocks, raw URLs, and formatting that reads badly aloud. It writes `audio.md` and a manifest with the canonical article hash.

2. Review the spoken script:

```bash
open content/articles/<slug>/audio.md
pnpm content:pipeline audio:quote <slug>
```

3. Approve the script after human review:

```bash
pnpm content:pipeline audio:approve <slug>
```

4. Generate paid Speechify audio:

```bash
SPEECHIFY_API_KEY="$(op read '<1password item field>')" \
SPEECHIFY_VOICE_ID="$SPEECHIFY_VOICE_ID" \
pnpm content:pipeline audio:generate <slug> --spend-approved
```

5. Transcribe and verify the generated MP3 against the spoken script:

```bash
OPENAI_API_KEY="$(op read '<1password item field>')" \
pnpm content:pipeline audio:transcribe-verify <slug> --spend-approved
```

This writes `audio-transcript.json` with the transcription text, script/audio hashes, word-count ratio, ordered coverage, and ending coverage. A transcript that cuts off before the article ends fails the command.

If OpenAI quota is blocked or you want GPU transcription, run Whisper on Singularity One/Dawn against the exact branch MP3, copy back the JSON, then verify it locally:

```bash
pnpm content:pipeline audio:transcribe-verify <slug> \
  --transcript-file=/tmp/<slug>.json \
  --provider=singularity-one-whisper \
  --model=turbo
```

6. Check audio and transcript status:

```bash
pnpm content:pipeline audio:status <slug>
pnpm content:pipeline audio:transcript-status <slug>
```

7. Refresh generated player tracks:

```bash
pnpm content:pipeline audio:tracks
```

## Future Article Rule

Future unpublished articles should not go straight to paid audio generation.

The release order is:

1. Stage the canonical article on the website.
2. Approve the article text.
3. Approve the hero and inline images.
4. Generate or refresh `audio.md`.
5. Review the spoken version for awkward TTS phrasing.
6. Approve the script.
7. Generate the paid MP3 once.
8. Transcribe and verify the MP3 against `audio.md`.

This keeps Speechify spend at the end of the pipeline. If the article changes
after generation, `audio:status` marks the audio stale by comparing the
article hash, script hash, and MP3 hash. If the MP3 or script changes after
transcription, `audio:transcript-status` marks the transcript proof stale.

## Audiobook Pipeline

Article MP3s can be assembled into collection audiobooks without calling
Speechify again. The command reads current per-article manifests, orders
chapters by `publishedAt`, and writes a collection manifest under
`content/distribution/audio-books/`.

Dry run:

```bash
pnpm content:pipeline audio:book golden-hammer --series="Golden Hammer" --title="Golden Hammer Audiobook"
```

Generate the combined MP3:

```bash
pnpm content:pipeline audio:book golden-hammer --series="Golden Hammer" --title="Golden Hammer Audiobook" --write
```

Generated audiobook MP3s live in:

```txt
public/audio/voice/books/<collection-id>.mp3
```

Do not generate all collection MP3s by default. The full published catalog is
large, and combined audiobooks duplicate already-versioned article audio.

## Player Integration

The existing route mapper turns `/blog/<slug>` into `<slug>`. Generated blog audio tracks use that same slug as the `AudioTrack.id`, so the current footer player loads the narration natively.

Generated tracks live in:

```txt
src/shared-components/organisms/Footer/components/dual-audio/playlists/generatedBlogVoiceTracks.ts
```

`voiceTracks.ts` imports that file and spreads the generated tracks into the existing static page narration list.

## Launch Gate

Published canonical articles must pass the release-asset gate before promotion:

```bash
pnpm content:launch-gate <slug>
```

The gate verifies the article, spoken script, manifest hashes, MP3, transcript proof, generated player track, and any declared `coverImage`. It does not call Speechify, call OpenAI transcription, or deploy.

CI runs this gate for changed article/audio assets so a post cannot be promoted with missing narration artifacts by accident.

## Safety

- `audio:prepare`, `audio:approve`, `audio:status`, `audio:transcript-status`, `audio:quote`, and `audio:tracks` do not call paid APIs.
- `audio:generate` refuses unless `--spend-approved` is present.
- `audio:generate` refuses unless `audio:approve` has marked the script approved.
- `audio:transcribe-verify` refuses paid API transcription unless `--spend-approved` is present and `OPENAI_API_KEY` is available.
- `audio:transcribe-verify --transcript-file=<path>` verifies an existing transcript generated elsewhere without calling a paid API.
- `audio:book` does not call Speechify; it concatenates already-approved MP3 files.
- If `index.md` changes, `audio:status` marks the script stale.
- If `audio.md` changes after MP3 generation, `audio:status` marks the MP3 stale.
- If the MP3 or `audio.md` changes after transcription, `audio:transcript-status` marks the transcript proof stale.
- API keys and voice IDs should come from environment variables or 1Password, not committed files.
