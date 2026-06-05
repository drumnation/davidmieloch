# Content Distribution Deterministic Spine

## Spine Declaration

Domain: `content-distribution`

Critical inputs:

- `content/articles/**/index.md`
- `content/distribution/platform-ledger.json`
- `content/distribution/syndication-policy.json`
- `content/distribution/launch-calendar.json`
- `content/distribution/packages/**`
- `content/distribution/publish-schedule.json`

Health checks:

- `rtk pnpm content:pipeline validate`
- `rtk pnpm content:pipeline readiness`
- `rtk pnpm content:pipeline receipts:report`
- `rtk pnpm content:pipeline metrics:report`
- `rtk pnpm content:pipeline schedule:due`

Manual controls:

- Edit package markdown before platform load.
- Hold any schedule entry by leaving approval status missing.
- Record platform state through `receipt:record`.
- Record platform metrics through `metrics:record`.
- Stop all public publication by keeping `publicPublishingAllowed: false`.

Safe defaults:

- Do not publish.
- Do not submit for review.
- Do not post to LinkedIn.
- Do not post to Reddit.
- Prepare local packages and drafts only.

CLI commands:

- `content:pipeline queue`
- `content:pipeline queue:write`
- `content:pipeline manual-package`
- `content:pipeline draft:create`
- `content:pipeline schedule:generate`
- `content:pipeline schedule:due`
- `content:pipeline schedule:markdown`
- `content:pipeline receipt:record`
- `content:pipeline metrics:record`

Decision seams:

- `public-publish-approval`: David approves a specific platform, article, URL/copy, timing, and publish/submit action.
- `platform-fit-edit`: AI or David adapts the package to the surface before it becomes a draft.
- `metric-response`: Emily/agents can recommend changes from metrics, but site/content edits still go through normal repo review.

## Forgejo Reporting

Every agent status update or final report for governed content-distribution work
should include direct Forgejo links for the relevant issues, comments, pull
requests, or comparison pages.

Required metadata:

- Forgejo issue/comment/PR number.
- Direct URL.
- One-line description of what that governance object owns.
- Current status or blocker.

## Workflow Shape

```text
LinkedIn / Medium / Obsidian / website content
  -> deterministic import and package generation
  -> platform policy and ledger reconciliation
  -> queue generation
  -> schedule generation
  -> DECISION SEAM: David approves public publish/submit
  -> API/browser/manual execution
  -> receipt and metrics records
  -> Genesis heartbeat observations
```

AI is allowed to improve titles, intros, summaries, platform framing, and recommendations. AI is not allowed to be the only mechanism holding timing, approval, execution state, or receipts together.

## Observability

Primary observers:

- Queue observer: ledger plus package plus policy readback.
- Schedule observer: `publish-schedule.json` readback.
- Receipt observer: ledger status counts.
- Metrics observer: published receipt to metrics reconciliation.

Fallback chain:

1. Structured command output checksum.
2. Markdown checklist or JSON artifact readback.
3. ROM heartbeat.

Every command reports `publicPublishingPerformed: false` unless a future explicitly approved execution adapter does otherwise.

## Browser/API Execution Adapter Rules

Any future adapter must declare:

- Platform id.
- Whether it can create an unpublished draft.
- Whether it can publish publicly.
- Exact approval fields required before public publish.
- Dry-run mode.
- Receipt command emitted after success.
- Failure mode and manual fallback.

Browser adapters are acceptable for low-volume workflows, but they must turn successful repeated behavior into deterministic selectors, tests, or documented procedures after the second repetition.

## Determinism Reflection

Reusable behavior noticed:

- Platform draft loading repeatedly starts from ledger gaps plus package files.
- DZone/Substack loading needs the same queue-to-calendar view as API-backed platforms.
- Manual platform work needs a visible receipt trail.

Promotion decision:

- Implemented `schedule:generate`, `schedule:due`, and `schedule:markdown` now because they are small and reduce the next scheduling change.
- Created follow-up governance tickets for website admin/editor/calendar and execution adapters because those are larger app surfaces:
  - http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/16
  - http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/17
  - http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/18
- Kept public publishing out of this change because approval and platform-specific draft safety are the decision seam.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This file owns one concern: the deterministic spine for content distribution.

### I — Interface
Score: ✅
Notes: The interface is the set of declared inputs, commands, controls, and decision seams.

### E — Encapsulation
Score: ✅
Notes: Platform execution details stay behind future adapters and are not mixed into scheduling policy.

### C — Connection
Score: ✅
Notes: The spine connects only existing content artifacts, CLI commands, and receipt/metrics observers.

### I — Implementation
Score: ✅
Notes: The spine converts repeated manual distribution work into inspectable queue and schedule artifacts without authorizing public publishing.

## Merge Decision

Pass

## Required Fixes

None.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It gives the distribution system one deterministic path for queueing, scheduling, approval, receipts, and metrics before adding browser or API execution adapters.
