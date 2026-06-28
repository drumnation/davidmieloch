# Site Launch Narration Plan

## Position

Drafts can move without narration. Published canonical articles should not be promoted without their generated narration assets.

That means a post can be researched, edited, and staged as draft material without audio. Once it becomes `content/articles/<slug>/index.md` with `status: "published"`, it must pass the launch gate before release promotion.

## Required Assets

For each published article:

- Article: `content/articles/<slug>/index.md`
- Spoken script: `content/articles/<slug>/audio.md`
- Manifest: `content/articles/<slug>/audio-manifest.json`
- Transcript proof: `content/articles/<slug>/audio-transcript.json`
- MP3: `public/audio/voice/blog/<slug>.mp3`
- Player registry: `src/shared-components/organisms/Footer/components/dual-audio/playlists/generatedBlogVoiceTracks.ts`

If the article declares `coverImage`, the image path must resolve under `public`.

## Production Workflow

1. Promote approved writing into `content/articles/<slug>/index.md`.
2. Approve article text and imagery.
3. Generate or refresh the spoken script:

```bash
pnpm content:pipeline audio:prepare <slug>
```

4. Review the script for phrasing that sounds bad aloud.
5. Approve the script:

```bash
pnpm content:pipeline audio:approve <slug>
```

6. Generate paid audio only after spend approval:

```bash
pnpm content:pipeline audio:generate <slug> --spend-approved
```

7. Transcribe and verify the generated MP3 against `audio.md`:

```bash
pnpm content:pipeline audio:transcribe-verify <slug> --spend-approved
```

8. Refresh generated player tracks:

```bash
pnpm content:pipeline audio:tracks
```

9. Run the launch gate:

```bash
pnpm content:launch-gate <slug>
```

## Gate Behavior

`content:launch-gate` is verification only. It does not call Speechify, call OpenAI transcription, publish to social platforms, or deploy the site.

CI runs the gate for changed article/audio assets. If a post is missing the script, manifest, MP3, transcript proof, or generated track entry, CI fails before merge/promotion.
