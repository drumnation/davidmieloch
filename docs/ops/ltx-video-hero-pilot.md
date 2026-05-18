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

## Greater Mission

This trailer is not decoration. It is the mythic version of the homepage thesis:

> David Mieloch is an AI Architect building software factories.

The story is:

> A human architect built a factory that keeps thinking after he leaves.

The conclusion is:

> Human taste designs the machine. The machine turns intent into shipped systems. The factory runs in the dark.

The video should make the viewer feel that David's work has moved beyond "using AI tools" into designing production systems that convert ideas into software, writing, proof, and operational leverage.

Public homepage message:

```text
David Mieloch
AI Architect
I build software factories.
```

Mythic trailer message:

```text
Brain Garden
The Dark Chocolate Software Factory
Human taste. Machine throughput.
```

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

## Clip Prompt Matrix

Use the same audio segment for every variation in a clip. Generate multiple synchronized feeds, then cut between them in the edit.

### Clip 01: Establishing Blast, `0:00-0:08`

Wide feed:

```text
Epic wide shot of a vast dark chocolate software factory at night, conveyor belts carrying glossy chocolate computer chips, amber furnace blasts hitting on orchestral brass, blue status lights pulsing with snare, graphite steel architecture, cinematic camera push forward, no humans, no readable text, no logos, serious premium industrial scale.
```

Macro feed:

```text
Macro cinematic shot of glossy dark chocolate computer chips moving on a precision conveyor, gold circuit traces molded into cocoa wafers, robotic inspection lights flashing blue, amber reflections on polished graphite metal, movement synchronized to military orchestral hits, no text, no logos.
```

Console feed:

```text
Dark factory control console reflected in glass over a production line, build queues and agent orchestration shown as abstract glowing blocks with no readable text, blue status lights pulse to the snare, amber machine light surges on brass hits, serious technical cinematic style.
```

### Clip 02: Assembly Escalation, `0:08-0:16`

Wide feed:

```text
Rows of robotic arms stamping chocolate-silicon chips into molds with military precision, fast synchronized motion, snare-driven mechanical cadence, molten cocoa channels and graphite rails, orange furnace glow, blue inspection sensors, no people, no text, no logos.
```

Macro feed:

```text
Close shot of robotic tools pressing gold circuit patterns into glossy dark chocolate wafers, sparks of amber light, blue machine vision scanners, conveyor movement locked to aggressive orchestral percussion, premium industrial realism, no text.
```

Oracle feed:

```text
The production line begins to behave like a single intelligence, lights coordinating across machines, robotic arms moving as if conducted by an unseen mind, no face, no humanoid character, abstract factory consciousness, dark chocolate and graphite steel.
```

### Clip 03: Brain Garden Reveal, `0:16-0:24`

Wide feed:

```text
Reveal a cathedral-scale orchestration core inside the dark chocolate software factory, a warm amber central machine surrounded by blue agent status lights, conveyor lines feeding into it like roots, no face, no copied sci-fi character, no humans, cinematic awe.
```

Console feed:

```text
Agent workflow control room overlooking the factory floor, abstract build pipelines, test lights, memory nodes, and governance gates shown as non-readable luminous interface shapes, synchronized pulses with brass and snare, serious operator-console aesthetic.
```

Oracle feed:

```text
Brain Garden as an abstract factory intelligence, a glowing central cocoa-and-silicon core, tendrils of light routing work between machines, warm chocolate vats and blue signal lights, immense scale, no face, no text, no logos, not dystopian.
```

### Clip 04: Dark Chocolate Forge, `0:24-0:32`

Wide feed:

```text
Molten dark chocolate pouring through a high-tech forge into circuit molds, brass-heavy orchestral intensity, amber heat, graphite machinery, blue inspection beams, camera glides low beside the flow, serious technical luxury, no people, no text.
```

Macro feed:

```text
Extreme close-up of molten chocolate cooling into chip-shaped wafers with gold circuit traces, robotic calipers inspect each piece, amber glow and blue scanner lines pulse with the music, tactile premium realism, no text.
```

Console feed:

```text
Quality-control station in a dark software factory, abstract green and blue pass lights, test gates, artifact checks, conveyor of chocolate computer chips, no readable text, no humans, urgent orchestral momentum.
```

### Clip 05: Software Factory Proof, `0:32-0:40`

Wide feed:

```text
Factory floor transforms raw ideas into visible software artifacts, conveyor lines carry chocolate chips past glowing build stations, abstract code reflections in glass without readable text, tests pass as blue lights, amber machinery, cinematic serious scale.
```

Console feed:

```text
Close view of agent orchestration consoles controlling build queues, deploy gates, content pipelines, and observability signals as abstract interface blocks, no readable words, no logos, reflected over dark chocolate machinery, synchronized to snare.
```

Macro feed:

```text
Chocolate computer chips enter an inspection tunnel where blue light scans each circuit trace, defective pieces are silently diverted, good pieces accelerate forward, precision quality-control metaphor for tests and governance, no text.
```

### Clip 06: Bombastic Climax, `0:40-0:48`

Wide feed:

```text
Fast cinematic flight down the main production line into a cathedral-scale dark chocolate software factory, hundreds of robotic stations moving in synchronized orchestral force, amber blasts, blue status constellation, graphite steel, overwhelming scale, no humans.
```

Oracle feed:

```text
The Brain Garden core surges with coordinated light, every conveyor and robotic arm responds, factory intelligence at full throughput, warm cocoa glow, blue signal storms, serious and majestic, not evil, no face, no text.
```

Macro feed:

```text
Rapid montage-style macro shot of chocolate computer chips launching from molds into aligned trays, gold circuits flashing, inspection lasers, amber reflections, motion timed to brass impacts and snare, premium industrial intensity.
```

### Clip 07: Cliff Ending, `0:48-0:52.846`

Title-card feed:

```text
The factory suddenly drops into near darkness, one final chocolate computer chip glows with blue circuitry on a black graphite surface, amber light fades, space reserved for code-native title overlay, no in-image text, no logos.
```

Factory-drop feed:

```text
Camera reaches the edge of a massive production void inside the dark chocolate software factory, machinery drops away into darkness as the music cliff-ends, blue lights flicker out, amber glow collapses to black, no humans, no text.
```

Homepage transition feed:

```text
Final hard cinematic shot of the central factory line locking into place, all machines stop at once, a single blue status light remains, dark graphite and chocolate tones, clean negative space for homepage title overlay, no in-image text.
```

## Variation Strategy

For each clip, generate 2-4 synchronized feeds:

- `wide`: large-scale production floor.
- `macro`: chocolate computer chips, molds, robotic arms.
- `console`: agent dashboards, build queues, observability lights.
- `oracle`: Brain Garden core, abstract factory intelligence.

The edit can switch between feeds while all clips remain synced to the same audio segment.

Recommended first manual run:

1. Generate Clip 01 wide, macro, and console.
2. Keep the best visual seed/style reference.
3. Generate Clip 02 wide and macro using the same style language.
4. Only then fan out to the full seven-clip set.

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
