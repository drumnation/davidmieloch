# Factory Visual Approval Design

## Purpose

Create approval-ready visual directions for davidmieloch.com before implementing a full site rebrand. The mockups should help David choose the visual language for the AI Architect / software factory brand without prematurely committing production code.

This work exists because the site needs taste, not just execution. Codex can implement to a spec, but the spec should be approved as a visual contract first.

## Inputs

- Existing rebrand spec: `docs/superpowers/specs/2026-05-18-ai-architect-site-rebrand-design.md`
- Agent consultation notes: `docs/ops/openclaw-agent-consultation.md`
- Current staging site: `https://davidmieloch.brain-garden.io/blog`
- LTX pricing checked on 2026-05-18:
  - LTX API text/image-to-video at 1080p: about `$0.06/sec` fast or `$0.08/sec` pro for LTX-2.3.
  - LTX API audio-to-video at 1080p: about `$0.10/sec`.
  - LTX Studio Standard is the first self-serve commercial-use tier at `$35/mo`; Pro is `$125/mo`.

## Positioning Constraint

The first screen must not make visitors decode the metaphor.

Lead with:

> AI Architect for Software Factories

Use the dark chocolate software factory as the visual world below and around the claim. The metaphor should make the site memorable, but not obscure what David does.

## Visual Directions For Approval

### Direction A: Industrial Luxury Factory

Core idea: precision engineering meets premium craft.

Visual language:

- Dark chocolate, graphite, brushed steel, amber light.
- Conveyor belts with chocolate computer chips.
- Inspection stations, molds, gauges, signal lights.
- Dense but readable interfaces.

Homepage implication:

- Single declarative hero.
- Full-bleed factory video or image hero.
- Proof artifacts appear immediately below the fold.

Why it is likely strongest:

- Distinctive without looking unserious.
- Lets old portfolio proof become "factory output".
- Scales naturally to video.

Risk:

- Can become too literal or cute if the chocolate motif dominates.

### Direction B: Control Room / Operator Console

Core idea: David runs the operating system behind agentic production.

Visual language:

- Dark UI, factory telemetry, diagrams, queue status, build lights.
- Abstract production lines and system maps.
- Less chocolate, more governance and operational control.

Homepage implication:

- Hero looks like an active command center.
- Blog looks like field notes from the floor.
- Case studies become "systems shipped".

Why it may work:

- Serious and credible for technical buyers.
- Connects directly to observability and governance.

Risk:

- Could look like generic dark SaaS unless the factory/chocolate details are present.

### Direction C: Editorial Field Manual

Core idea: the site is the public notebook of a factory builder.

Visual language:

- Strong typography.
- Diagram fragments, artifact scans, code/proof snippets.
- Occasional cinematic hero art instead of constant immersive visuals.

Homepage implication:

- More essay-forward than portfolio-forward.
- Blog becomes the obvious center of gravity.
- Visuals support writing instead of driving the whole page.

Why it may work:

- Best fit if publishing velocity is the highest priority.
- Lowest implementation risk.

Risk:

- Less immediately memorable than the factory-video direction.

## Recommended First Mockup Set

Build three approval mockups, not the whole site:

1. Homepage first viewport and next-section hint for Direction A.
2. Blog landing first viewport for Direction A.
3. Alternate homepage first viewport for Direction B.

The first pass should be disposable. Its purpose is to choose the visual contract.

## Generated Still Art Prompts

### Hero Still Prompt

```text
A premium dark chocolate software factory at night, cinematic but realistic, warm amber machinery, graphite steel, conveyor belts carrying glossy chocolate computer chips, robotic arms placing circuit-like cocoa wafers into molds, subtle blue status lights, clean industrial luxury, high-detail production floor, no people, no text, no logos, serious technical atmosphere, 16:9 website hero composition with space for headline on the left.
```

### Blog Hero Prompt

```text
Editorial image for an AI architect's field notes, dark software factory control room overlooking a chocolate-chip production line, monitors showing abstract agent workflow diagrams, warm amber and cool blue signal colors, premium technical editorial style, no readable text, no logos, 16:9 composition.
```

### Visual Accent Prompt

```text
Macro photograph style render of chocolate computer chips, glossy dark cocoa wafers with gold circuit traces, arranged on a precision inspection tray, warm studio light, technical luxury, shallow depth of field, no text, no logos.
```

## LTX Music Video Pilot

Goal: test whether short segments from David's existing site music can drive a busy dark chocolate software factory video hero or commercial.

Candidate tracks already on the site:

| Track | File | Duration | Full audio-to-video estimate at `$0.10/sec` |
| --- | --- | ---: | ---: |
| Epic Battle Game - Opening Credits | `public/audio/music/epic-battle-game-opening-credits.mp3` | `52.846s` | `$5.28` |
| Reality Tunnel | `public/audio/music/reality-tunnel.mp3` | `480.287s` | `$48.03` |
| Frenetic Puzzle Game - Gameplay | `public/audio/music/frenetic-puzzle-game-gameplay.mp3` | `224.444s` | `$22.44` |

Epic Battle Game - Opening Credits is now the primary trailer candidate. It is already the correct length for a bombastic homepage commercial, and the first 9-second LTX-2.3 Pro test proved the visual language can work. Reality Tunnel remains the artsy/world-building option. Frenetic Puzzle Game - Gameplay remains a kinetic promo option.

Recommended pilot:

- Length: `6-8 synced clips` covering the `52.846s` Epic Battle track.
- Format: `16:9`, 1080p.
- Mode: audio-to-video if the goal is music synchronization; image-to-video if the goal is visual style control.
- Output: a 52-second homepage trailer, a 15-second cutdown, and a 9:16 social crop test.

Cost model:

- LTX audio-to-video 1080p at `$0.10/sec`: `15s = $1.50` per generation, `30s = $3.00`, `60s = $6.00`.
- LTX-2.3 pro text/image-to-video 1080p at `$0.08/sec`: `15s = $1.20`, `30s = $2.40`, `60s = $4.80`.
- A single full pass over Epic Battle costs about `$5.28` using API audio-to-video pricing.
- Real budget should assume iteration, not one render. A practical Epic Battle trailer pass is `3 variations x 7 clips`, roughly `21 clips` and about `$15.85` at `$0.10/sec` if the clips cover the full track once per variation set. Budget `$25-$75` to allow failed shots, retakes, and alternate prompts.
- Studio credit pricing is less transparent in API terms; Standard at `$35/mo` is the lowest sensible self-serve tier for commercial work.

Pilot prompt:

```text
A busy dark chocolate software factory synchronized to electronic music. Conveyor belts carry glossy chocolate computer chips through robotic inspection stations. Amber furnaces glow, blue status lights pulse to the beat, agentic workflow diagrams appear as abstract reflections on glass panels, camera glides through the factory floor with premium cinematic movement. Serious, precise, technical, luxurious, not whimsical, no readable text, no logos.
```

Epic Battle trailer structure:

| Time | Shot role | Visual direction |
| --- | --- | --- |
| `0:00-0:08` | Establishing blast | Wide factory floor, chocolate chip conveyors, brass-hit lighting pulses. |
| `0:08-0:16` | Assembly escalation | Robotic arms stamping cocoa-silicon chips, snare-driven mechanical precision. |
| `0:16-0:24` | Brain Garden reveal | Central factory intelligence as glowing orchestration core, no face, no copied sci-fi character. |
| `0:24-0:32` | Dark chocolate forge | Molten chocolate, graphite machinery, circuit molds, military orchestral intensity. |
| `0:32-0:40` | Software factory proof | Build queues, agent consoles, test lights, code artifacts reflected in glass. |
| `0:40-0:48` | Bombastic climax | Camera flies down the production line into a cathedral-scale machine hall. |
| `0:48-0:52.846` | Cliff ending | Sudden drop to logo/title card or hard cut to homepage claim. |

Working title options:

- `Brain Garden: Dark Chocolate Software Factory`
- `Mieloch's Dark Chocolate Software Factory`
- `David Mieloch, AI Architect`

Recommendation: keep the homepage brand as David Mieloch / AI Architect, use Brain Garden as the system name, and use Dark Chocolate Software Factory as the cinematic world. "No humans allowed" can be an internal creative constraint for the video, but the public message should be "human taste, machine throughput" rather than anti-human.

Comparison criteria:

- Epic Battle wins if the site needs a bombastic homepage trailer and immediate cinematic authority.
- Reality Tunnel wins if the site needs mystery, depth, and a sense of discovery.
- Frenetic Puzzle Game wins if the site needs kinetic promo energy, fast cuts, and a commercial trailer feel.
- Neither full track should be generated until a short segment proves the direction.

## Approval Criteria

A visual direction is approved when:

- The first viewport clearly says what David does before the metaphor takes over.
- The design feels like premium engineering, not novelty chocolate branding.
- The image/video language can scale to blog covers, article art, and social variants.
- The homepage can show proof artifacts within one scroll.
- Mobile composition still works without hiding the core claim.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This spec owns one concern: visual approval for the rebrand.

### I — Interface
Score: ✅
Notes: The approval interface is three mockups, still prompts, and one video pilot brief.

### E — Encapsulation
Score: ✅
Notes: No production implementation details are exposed as mandatory design decisions.

### C — Connection
Score: ✅
Notes: Dependencies are limited to the existing site spec, OpenClaw consultation, and LTX pricing.

### I — Implementation
Score: ✅
Notes: The plan is intentionally bounded and avoids automating taste before approval.

## Merge Decision

Pass

## Required Fixes

None.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It turns a large aesthetic rebrand into three approval mockups and one video pilot.
