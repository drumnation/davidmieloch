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
pnpm content:pipeline metrics:report
pnpm contact:check
```

Each command records:

- command name
- article slug when present
- output checksum
- system classification vector
- fallback chain
- observer/readback status

## Content Metrics Observer

Content distribution metrics are stored in:

```text
content/distribution/content-metrics.json
```

The metrics report reconciles three independent surfaces:

1. Generated package manifests in `content/distribution/packages`
2. Published receipts in `content/distribution/platform-ledger.json`
3. Observed metrics in `content/distribution/content-metrics.json`

Run:

```bash
pnpm content:pipeline metrics:report
```

Expected initial state before public syndication:

```json
{
  "packagedArticles": 20,
  "packageFiles": 160,
  "publishedReceipts": 0,
  "metricRecords": 0,
  "missingMetricsForPublished": 0
}
```

Once an external platform URL is recorded as `published`, the report becomes `DEGRADED` until a matching metrics record exists. That closes the negative-space gap where a post exists but no one is watching whether it did anything.

Record a manual observation:

```bash
pnpm content:pipeline metrics:record the-factory medium \
  --url=https://medium.com/@davidmieloch/the-factory \
  --views=120 \
  --clicks=9 \
  --reactions=4 \
  --comments=1 \
  --shares=2
```

Fallback chain:

1. `content-metrics.json` checksum
2. Package manifest and ledger reconciliation
3. ROM heartbeat

## Failure Handling

If a command fails, it still writes a `FAILURE` heartbeat record with the error message. If the heartbeat path cannot be written, the command fails because the terminal fallback is unavailable.
