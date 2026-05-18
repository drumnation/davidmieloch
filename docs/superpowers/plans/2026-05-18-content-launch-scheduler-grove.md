# Content Launch Scheduler Grove Plan

Arbor-Skill-Signature: APG-v1

**Proposal ID**: content-launch-scheduler-2026-05-18
**Working Directory**: /Users/dmieloch/Dev/projects/personal/davidmieloch-website/david-monorepo
**Phase**: Content Distribution Factory / Launch Scheduling
**Feature**: Supervised multi-platform content launch scheduler
**Harness**: codex
**Provider**: unknown
**Model**: unknown

## Objective

Build a governed launch scheduler that can coordinate new canonical articles from LinkedIn/source channels into davidmieloch.com and approved external platforms without posting to LinkedIn or performing irreversible public publishing without David's explicit approval.

## Context

- LinkedIn remains source-of-truth for already published or scheduled articles, but new LinkedIn posting is approval-only and out of scope.
- The website is the canonical archive for SEO, AI indexing, and future mailing-list conversion.
- Current generated packages cover 20 articles and 8 platforms.
- First external wave should prioritize Medium, DEV, and Hashnode.
- DEV and Hashnode API commands currently exist but need to consume generated packages instead of requiring hand-maintained variant files.
- Medium remains browser/manual unless an approved API route appears.
- Every launch action must be observable through package manifests, platform ledger receipts, content metrics, and Genesis heartbeat records.

## Governance

- Grove/Arbor plan: `docs/superpowers/plans/2026-05-18-content-launch-scheduler-grove.md`
- Forgejo issue: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/15
- Steward/Ralph: David approval required for any irreversible public publish action.
- Factory loops: do not restart the broader site rebrand loop; this plan only covers launch scheduling and syndication controls.

## Stories

### Story 1: Define The Launch Calendar Contract

**Role**: worker
**Harness**: codex
**Depends**: none
**Files**:
- `content/distribution/launch-calendar.json`
- `content/distribution/syndication-policy.json`
- `docs/ops/content-distribution-platform-strategy.md`

- [ ] 001: Create `content/distribution/launch-calendar.json` with schema version, launch id, source platform, scheduled time, article slug or pending-source marker, target platforms, and approval policy.
- [ ] 002: Add the May 19, 2026 11:00 AM ET scheduled article as a supervised launch entry that excludes LinkedIn targets.
- [ ] 003: Document the launch calendar fields and approval semantics in the platform strategy doc.
- [ ] 004: Ensure every target platform declares one of `draft-only`, `manual-approval`, `publish-approved`, or `manual-only`.

**Validation Commands**:
```bash
rtk pnpm content:pipeline validate
rtk pnpm content:pipeline metrics:report
```

**Evidence Required**:
- Launch calendar exists and parses as JSON.
- Tomorrow's launch entry targets Medium, DEV, and Hashnode only.
- Docs state that LinkedIn is source/reference only unless David explicitly approves.

### Story 2: Add Scheduler CLI Readiness Commands

**Role**: worker
**Harness**: codex
**Depends**: Story 1
**Files**:
- `scripts/content-pipeline.mjs`
- `scripts/lib/content-launch-calendar.mjs`
- `src/content/distribution-pipeline.test.ts`

- [ ] 005: Add a launch-calendar reader module with strict validation for required fields and platform approval modes.
- [ ] 006: Add `pnpm content:pipeline launch:due` to list launches due within a configurable time window without creating drafts or publishing.
- [ ] 007: Add `pnpm content:pipeline launch:prepare <launch-id>` to resolve the article, regenerate packages, and report next actions without public posting.
- [ ] 008: Ensure `launch:prepare` refuses LinkedIn targets unless the launch entry explicitly says `manual-only` and `publishApprovedBy` is set.
- [ ] 009: Add focused tests for due-launch filtering, LinkedIn refusal, and package regeneration routing.

**Validation Commands**:
```bash
rtk pnpm exec vitest --config vitest.config.ts --run src/content/distribution-pipeline.test.ts src/content/articles.test.ts
rtk pnpm content:pipeline launch:due
rtk pnpm content:pipeline launch:prepare <launch-id>
```

**Evidence Required**:
- CLI returns machine-readable JSON suitable for agents.
- No launch command performs public publishing.
- Tests prove LinkedIn is blocked by default.

### Story 3: Route Draft Creation Through Generated Packages

**Role**: worker
**Harness**: codex
**Depends**: Story 2
**Files**:
- `scripts/content-pipeline.mjs`
- `scripts/lib/platform-packages.mjs`
- `src/content/distribution-pipeline.test.ts`

- [ ] 010: Update DEV draft creation to read `content/distribution/packages/<slug>/devto.md` and strip only the package wrapper, preserving article copy and canonical URL.
- [ ] 011: Update Hashnode draft creation to read `content/distribution/packages/<slug>/hashnode.md` and strip only the package wrapper, preserving article copy and canonical URL.
- [ ] 012: Add parser tests proving generated package markdown produces clean platform body markdown without posting guidance.
- [ ] 013: Ensure image references are either absolute canonical URLs or explicitly reported as a pre-publish blocker for platforms that cannot access site-relative images.

**Validation Commands**:
```bash
rtk pnpm exec vitest --config vitest.config.ts --run src/content/distribution-pipeline.test.ts
rtk pnpm content:pipeline manual-package the-factory devto
rtk pnpm content:pipeline manual-package the-factory hashnode
```

**Evidence Required**:
- DEV/Hashnode draft commands no longer require variant files for package-backed articles.
- Generated draft bodies exclude internal posting guidance.
- Relative image handling is explicit.

### Story 4: Record Receipts And Metrics After Launch

**Role**: worker
**Harness**: codex
**Depends**: Story 3
**Files**:
- `scripts/content-pipeline.mjs`
- `scripts/lib/content-metrics.mjs`
- `content/distribution/platform-ledger.json`
- `docs/ops/pipeline-observability.md`

- [ ] 014: Add `pnpm content:pipeline launch:record <launch-id> <platform> --url=<url> --status=<draft|published>` to update the platform ledger.
- [ ] 015: Ensure published receipts without matching metrics records cause `metrics:report` to return `DEGRADED`.
- [ ] 016: Write Genesis heartbeat records for `launch:due`, `launch:prepare`, and `launch:record`.
- [ ] 017: Document the 24-72 hour metrics follow-up command sequence.

**Validation Commands**:
```bash
rtk pnpm content:pipeline launch:record <launch-id> devto --url=https://dev.to/... --status=draft
rtk pnpm content:pipeline metrics:report
rtk pnpm content:pipeline observe:bootstrap
```

**Evidence Required**:
- Ledger updates are deterministic and validation-safe.
- Metrics report exposes missing observations as degraded state.
- Heartbeat records include launch id and platform.

### Story 5: Execute The Supervised Launch Runbook

**Role**: worker
**Harness**: codex
**Depends**: Story 4
**Files**:
- `docs/ops/content-distribution-platform-strategy.md`
- `content/distribution/launch-calendar.json`
- `content/distribution/platform-ledger.json`

- [ ] 018: At the scheduled launch window, confirm the source article is live and capture the source URL/title.
- [ ] 019: Import or verify the canonical davidmieloch.com article before external syndication.
- [ ] 020: Create DEV and Hashnode drafts only if API keys and package validation pass.
- [ ] 021: Prepare Medium browser import manually and stop before public publish if the UI exposes an irreversible publish step.
- [ ] 022: Record every draft or published URL in the platform ledger.
- [ ] 023: Run metrics report and post the launch outcome to Forgejo issue #15.

**Validation Commands**:
```bash
rtk pnpm content:pipeline validate
rtk pnpm content:pipeline metrics:report
rtk git diff --check
```

**Evidence Required**:
- Forgejo issue #15 contains the launch outcome.
- No LinkedIn posting occurred.
- Any external public publish is tied to explicit David approval.

## Completion Definition

- A reusable launch calendar exists.
- The CLI can identify due launches, prepare packages, create safe drafts, and record receipts.
- LinkedIn is blocked as a target unless explicitly approved.
- The tomorrow launch can be coordinated to Medium, DEV, and Hashnode without relying on chat memory.
- All launch activity is reconciled through the ledger, metrics report, and Genesis heartbeat.
