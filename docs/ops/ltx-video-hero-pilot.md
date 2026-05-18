# LTX Video Hero Pilot

## Current Direction

Primary track:

- `Epic Battle Game - Opening Credits`
- File: `public/audio/music/epic-battle-game-opening-credits.mp3`
- Duration: `52.846s`
- Role: homepage trailer / commercial for David Mieloch's AI Architect brand.

Creative direction:

> Brain Garden: Dark Chocolate Software Factory.

The public homepage should still read as David Mieloch / AI Architect. Brain Garden is the system name. Dark Chocolate Software Factory is the cinematic world. "No humans allowed" is useful as a visual constraint, but not the public promise.

## LTX API Reality

Official docs show an audio-to-video endpoint:

```bash
curl -X POST https://api.ltx.video/v2/audio-to-video \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audio_uri": "https://example.com/audio.wav",
    "image_uri": "https://example.com/image.jpg",
    "prompt": "A busy dark chocolate software factory synchronized to orchestral battle music.",
    "resolution": "1920x1080",
    "model": "ltx-2-3-pro"
  }'
```

Important constraints:

- Audio-to-video accepts audio clips from `2-20s`.
- The API needs an `audio_uri`, not a local file path.
- The audio and optional reference images must be reachable by LTX. Internal Tailscale/Caddy URLs may not work.
- API access may require developer-console access or LTX sales enablement depending on the account.

## Shot Map

| Clip | Time | Duration | Role | Visual prompt direction |
| --- | ---: | ---: | --- | --- |
| 01 | `0:00-0:08` | `8s` | Establishing blast | Wide dark chocolate software factory, conveyor belts, amber light blasts, blue status lights. |
| 02 | `0:08-0:16` | `8s` | Assembly escalation | Robotic arms stamping chocolate computer chips in military precision. |
| 03 | `0:16-0:24` | `8s` | Brain Garden reveal | Central orchestration core, vast factory intelligence, no face, no copied sci-fi character. |
| 04 | `0:24-0:32` | `8s` | Chocolate forge | Molten chocolate, graphite machinery, circuit molds, heavy brass visual impact. |
| 05 | `0:32-0:40` | `8s` | Software proof | Build queues, agent consoles, tests passing, code artifacts reflected in glass. |
| 06 | `0:40-0:48` | `8s` | Bombastic climax | Camera flies down production line into cathedral-scale machine hall. |
| 07 | `0:48-0:52.846` | `4.846s` | Cliff ending | Hard drop to title card or homepage claim. |

## Variation Strategy

For each clip, generate 2-4 synchronized feeds:

- `wide`: large-scale production floor.
- `macro`: chocolate computer chips, molds, robotic arms.
- `console`: agent dashboards, build queues, observability lights.
- `oracle`: Brain Garden core, abstract factory intelligence.

The edit can switch between feeds while all clips remain synced to the same audio segment.

## Prompt Kernel

```text
A bombastic cinematic dark chocolate software factory synchronized to military orchestral battle music. Conveyor belts carry glossy chocolate computer chips through robotic inspection stations. Amber furnace light blasts on brass hits. Blue status lights pulse with the snare. Graphite steel machinery, molten cocoa, circuit molds, build queues, agent orchestration consoles, no humans, no readable text, no logos, serious premium industrial scale, camera movement driven by the music.
```

Negative constraints:

- no whimsical candy factory
- no cartoon chocolate river
- no copied Willy Wonka
- no copied Deep Thought
- no humans
- no readable text
- no gore, weapons, soldiers, or dystopian oppression
- no generic neon AI brain

## Cost Model

At `$0.10/sec` audio-to-video:

- One full 52.846s pass: about `$5.28`.
- Three full-coverage variation sets: about `$15.85`.
- Ten full-coverage variation sets: about `$52.85`.

Practical pilot:

- Generate 3 variations for clip 01 first.
- If the style holds, generate 2-3 variations for clips 02-07.
- Budget range: `$25-$75` for a serious first cut.

## Production Steps

1. Cut the source MP3 into clip files with `ffmpeg`.
2. Host clips somewhere LTX can fetch over public HTTPS.
3. Submit `audio-to-video` jobs for each clip/variation.
4. Poll job status until completion.
5. Download results into `artifacts/ltx/epic-battle/`.
6. Edit final sequence to the original full track.
7. Export:
   - `52s` homepage trailer.
   - `15s` homepage/social cutdown.
   - silent/muted hero loop fallback.

## API Script Shape

Create a script only after API credentials exist:

```text
scripts/ltx/submit-audio-video-jobs.mjs
scripts/ltx/poll-ltx-jobs.mjs
scripts/ltx/download-ltx-results.mjs
```

The scripts should read a manifest:

```json
{
  "project": "epic-battle-dark-factory",
  "model": "ltx-2-3-pro",
  "resolution": "1920x1080",
  "clips": [
    {
      "id": "clip-01-wide",
      "audioUri": "https://...",
      "prompt": "..."
    }
  ]
}
```

## Approval Gate

Do not automate paid generation until:

- LTX API key exists.
- Public hosting for audio clips is confirmed.
- David approves the first clip prompt matrix.
- A budget cap is set.
