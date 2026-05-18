# OpenClaw Agent Consultation

Purpose: route davidmieloch.com rebrand questions through the OpenClaw gateway on `dawn` so persona feedback is captured outside Codex chat and can be linked from Forgejo planning work.

## Gateway

- Host: `singularity-one` via `rtk fleet run dawn`
- Gateway: `ws://127.0.0.1:18791`
- Service: `openclaw-gateway`
- Health probe:

```bash
rtk fleet run dawn 'bash -lc "openclaw health --json"'
```

## Available Rebrand Lanes

- `emily`: branding and positioning
- `don`: creative direction and narrative
- `dawn`: governance, system view, and execution risk
- `day`: build-path critique and implementation sequencing
- `dusk`: second-pass critique and edge cases
- `bob`: visual direction
- `iris`: design direction, accessibility, and visual systems

Verify the current registry before dispatch:

```bash
rtk fleet run dawn 'bash -lc "openclaw agents list --json"'
```

## Non-Delivering Consultation

Use `openclaw agent` without `--deliver` for planning consultations. This runs a gateway agent turn and returns JSON to the caller without posting into Discord or another external channel.

```bash
rtk fleet run dawn 'bash -lc "openclaw agent --agent emily --message \"Route check for Codex governance: reply with ROUTE_OK and one sentence identifying your branding lane for davidmieloch.com. Do not make file changes.\" --json --timeout 120"'
```

Verified on 2026-05-18:

- Agent: `emily`
- Status: `ok`
- Run id: `d5b3d180-f3d8-42ce-9d95-380cb479091b`
- Session file: `/home/dave/.openclaw/agents/emily/sessions/db4e0a77-345c-499f-ae12-13c133fa10c4.jsonl`
- Reply: `ROUTE_OK`

## Dispatch Shape

For the software factory hero and AI Architect rebrand, ask each lane for a bounded artifact:

```text
We are planning the davidmieloch.com rebrand around AI Architect, software factories, dark factory operations, and a possible dark chocolate software factory video hero. Review Forgejo issue #10 and return:
1. One sharp recommendation.
2. One thing to avoid.
3. One concrete homepage/blog design implication.
Do not edit files. Keep the response under 250 words.
```

Recommended dispatch order:

1. `emily` and `don` for narrative framing.
2. `bob` and `iris` for visual language.
3. `dawn`, `day`, and `dusk` for governance and execution critique.

## Observability

Each consultation must leave two independent traces:

- OpenClaw JSON output, including `runId`, `status`, `agentMeta.sessionId`, and `sessionFile`.
- Forgejo issue comment summarizing the agent, prompt, result, and any follow-up issue created.

Fallbacks:

- If OpenClaw gateway fails, run `openclaw health --json` and `systemctl --user status openclaw-gateway` on `dawn`.
- If a specific agent fails, reroute the same prompt to `dawn` with the failed agent named in the prompt.
- If JSON output is unavailable, capture terminal output and link the exact command used in Forgejo.

## 2026-05-18 Rebrand Consultation

Prompt shape:

```text
For davidmieloch.com rebrand planning: David is moving from 2025 AI transformation and prompt-craft framing into 2026 AI Architect, dark software factory, and dark chocolate software factory imagery. Return exactly three bullets: one sharp recommendation, one thing to avoid, one homepage/blog implication. Do not edit files. Under 220 words.
```

Runs:

| Agent | Run id | Session file |
| --- | --- | --- |
| `emily` | `1b996c95-1c31-4aca-a1b1-edcaea1b9bfe` | `/home/dave/.openclaw/agents/emily/sessions/db4e0a77-345c-499f-ae12-13c133fa10c4.jsonl` |
| `don` | `3b2d90fe-7d42-4456-b622-c932fffb76bb` | `/home/dave/.openclaw/agents/don/sessions/48e0ce82-c5c6-40af-a33f-bc04c0155e9f.jsonl` |
| `bob` | `8ddbc59a-e0ab-46d1-8b22-12ae0a8e26bd` | `/home/dave/.openclaw/agents/bob/sessions/e04162f3-1802-46d8-82a2-76de30cb0ea9.jsonl` |
| `iris` | `44191ca8-05e2-4227-82ec-4bf26a81920b` | `/home/dave/.openclaw/agents/iris/sessions/5c8c2b5e-47dd-41d4-a76e-c57bef47dcb6.jsonl` |
| `dawn` | `46942377-d004-4740-94ac-9bd24e84430e` | `/home/dave/.openclaw/agents/dawn/sessions/2ec8ce3d-0046-4a8a-af10-f74872bc7a59.jsonl` |
| `day` | `29841c99-703a-4395-89c3-8c9dcd04610e` | `/home/dave/.openclaw/agents/day/sessions/c3991705-c9fa-45c3-9b6e-24f944165cf1.jsonl` |
| `dusk` | `ae5247de-66b5-440f-bd44-26af44eefc39` | `/home/dave/.openclaw/agents/dusk/sessions/fb0b0a5a-8c47-438f-b597-5b4121933a33.jsonl` |

Consensus:

- Positioning should lead with `AI Architect` and `software factory`, not prompt craft or generic AI transformation.
- `dark chocolate software factory` is useful as a memorable visual layer, but the first screen should still translate into buyer language: systems, architecture, throughput, governance, and proof.
- Old 2025 content should be explicitly dated as legacy or transitional, not blended into the new positioning.
- The homepage needs proof artifacts quickly: shipped systems, reference architectures, field notes, and case-study style evidence.
- Blog direction should move toward architecture notes, factory patterns, orchestration lessons, governance, quality control, and operating leverage.

Design constraints from the consultation:

- Avoid cyber-noir, sinister, or overly cute chocolate/factory wordplay.
- Avoid stacking too many abstractions at once. Keep one role, one metaphor, one promise.
- Use the homepage for credibility and the blog/editorial surface for the stranger, richer factory world.
