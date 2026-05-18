# Content Pipeline Observability

The content pipeline is observed as:

```text
DATA_PIPELINE + AGENTIC_WORKFLOW + COMPILATION_PIPELINE
```

## ROM Heartbeat

Every pipeline command writes a JSONL observation record. The heartbeat path is selected in this order:

1. `OBSERVABILITY_HEARTBEAT_PATH`
2. `/var/brain-garden/observability/heartbeat.jsonl`
3. `$XDG_DATA_HOME/brain-garden/observability/heartbeat.jsonl`
4. `.brain/observability/heartbeat.jsonl`

The repo-local fallback is ignored by git.

## Observer Chain

Primary observer:

```text
content-pipeline.<command>
```

Fallback observers:

```text
structured command result checksum
heartbeat readback
ROM heartbeat
```

The readback observer verifies that the primary observation record landed in the heartbeat file. The bootstrap command also writes a cross-check record so the readback observer is itself observable.
Normal pipeline commands also write a readback cross-check record at recursion depth 2.

## Bootstrap

Run:

```bash
pnpm content:observe
```

Expected result:

```json
{
  "ok": true,
  "fallbackChainLength": 3
}
```

## Routine Checks

Use these before creating drafts or changing routing:

```bash
pnpm content:pipeline validate
pnpm content:pipeline schedule:dry-run your-ai-isnt-hallucinating-its-lying
pnpm contact:check
```

Each command records:

- command name
- article slug when present
- output checksum
- system classification vector
- fallback chain
- observer/readback status

## Failure Handling

If a command fails, it still writes a `FAILURE` heartbeat record with the error message. If the heartbeat path cannot be written, the command fails because the terminal fallback is unavailable.
