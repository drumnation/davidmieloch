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

5. Commit the MP3 and manifest:

```bash
pnpm content:pipeline audio:status <slug>
```

## Player Integration

The existing route mapper turns `/blog/<slug>` into `<slug>`. Generated blog audio tracks use that same slug as the `AudioTrack.id`, so the current footer player loads the narration natively.

Generated tracks live in:

```txt
src/shared-components/organisms/Footer/components/dual-audio/playlists/generatedBlogVoiceTracks.ts
```

`voiceTracks.ts` imports that file and spreads the generated tracks into the existing static page narration list.

## Safety

- `audio:prepare`, `audio:approve`, `audio:status`, `audio:quote`, and `audio:tracks` do not call Speechify.
- `audio:generate` refuses unless `--spend-approved` is present.
- `audio:generate` refuses unless `audio:approve` has marked the script approved.
- If `index.md` changes, `audio:status` marks the script stale.
- If `audio.md` changes after MP3 generation, `audio:status` marks the MP3 stale.
- API keys and voice IDs should come from environment variables or 1Password, not committed files.
