# Site Launch Narration Plan

## Launch Position

The narration player stays. It is a differentiating part of the site, but it should not block publishing new writing.

Launch articles in three states:

- `voiced`: MP3 exists and the player can load it.
- `queued`: article is published and waiting for narration production.
- `text-only`: intentionally no narration, usually legacy or low-priority material.

## Current Routing

Article narration should use the article slug as the voice track id.

Example:

- Page: `/blog/the-factory`
- Voice track id: `the-factory`
- Expected MP3 path: `/audio/voice/the-factory.mp3`

This keeps new narration work deterministic: add the MP3, register the track, verify the page.

## Production Workflow

1. Publish the article and hero images first.
2. Create a narration script that is pleasant to hear, not a literal markdown dump.
3. Generate or manually export the voice clone audio.
4. Store the MP3 in `public/audio/voice/{article-slug}.mp3`.
5. Add the track to `voiceTracks.ts`.
6. Run the audio routing smoke test and a browser check.

## Speechify / API Position

Manual Speechify export is acceptable for the first launch wave because voice quality matters more than full automation. API generation becomes valuable when the backlog is stable and repeatable.

The API path should be added only after we define:

- input script format
- voice/source label
- synthetic narration disclosure
- output MP3 naming convention
- retry and cost logging

## Launch Gate

The website is launchable without every article voiced if:

- every article has a cover image or derived cover fallback
- every article route renders
- the player hides missing narration cleanly
- a backlog exists for queued article audio
- the current voiced pages still work
