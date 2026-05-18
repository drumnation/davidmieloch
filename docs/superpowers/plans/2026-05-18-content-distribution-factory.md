# Content Distribution Factory Implementation Plan

> **For agentic workers:** Start read-only. Do not publish to external platforms until a platform has passed draft/receipt verification and David approves direct publishing.

**Goal:** Build a governed pipeline that reconciles LinkedIn, imports approved Obsidian content to the website, and generates platform-ready distribution packages.

**Architecture:** A small registry-centered pipeline: readers populate content state, transformers create platform outputs, publishers write only to approved targets, observers record claims and receipts.

---

## Task 1: Registry Schema

**Files:**
- Create: `content/distribution/content-registry.schema.json`
- Create: `content/distribution/content-registry.json`
- Create: `scripts/lib/content-registry.mjs`
- Create: `scripts/lib/content-registry.test.mjs`

- [ ] Define `contentId`, `slug`, `title`, `status`, `era`, `sourcePath`, `canonicalUrl`, `platformTargets`, `publishHistory`, and `assetManifest`.
- [ ] Validate registry records with a small schema validator.
- [ ] Add tests for missing required fields and unsupported statuses.

## Task 2: Obsidian Reader

**Files:**
- Create: `scripts/lib/obsidian-reader.mjs`
- Modify: `scripts/content-pipeline.mjs`

- [x] Read from configured vault path.
- [x] Support recursive vault scans for current mixed folder structure.
- [x] Return normalized article candidates without mutating vault files.
- [x] Emit ROM heartbeat observation for scan result.

## Task 3: LinkedIn Published-State Reader

**Files:**
- Create: `scripts/lib/linkedin-reader.mjs`
- Modify: `scripts/content-pipeline.mjs`

- [ ] Start with browser/manual export or saved HTML/JSON input, not direct login automation.
- [ ] Parse title, URL, publish date, and article id.
- [x] Reconcile LinkedIn published articles against registry.
- [x] Flag website-missing published articles.

## Task 4: Website Importer

**Files:**
- Create: `scripts/lib/website-importer.mjs`
- Modify: `scripts/content-pipeline.mjs`

- [x] Convert approved article folder into `content/articles/<slug>/index.md`.
- [x] Copy images into `public/blog/<slug>/images`.
- [x] Add required website frontmatter.
- [x] Validate sitemap/RSS expectations after build.

## Task 4b: Medium Legacy Import

**Files:**
- Create: `scripts/lib/medium-reader.mjs`
- Modify: `scripts/content-pipeline.mjs`

- [x] Read public Medium RSS feed.
- [x] Import Medium-only posts with original release dates.
- [x] Copy Medium images into per-article folders.
- [x] Preserve Medium as source platform in the ledger.

## Task 5: Platform Package Generator

**Files:**
- Create: `scripts/lib/platform-packages.mjs`
- Create: `content/distribution/packages/`
- Create: `content/distribution/syndication-policy.json`

- [x] Generate LinkedIn variant.
- [x] Generate Medium/Dev.to/Hashnode mirror package.
- [x] Generate social excerpt package.
- [x] Include canonical URL, backlinks, images, and manual posting checklist.
- [x] Add policy-driven platform modes: full mirror, launch post, discussion, editorial rewrite, newsletter.
- [x] Add tracked canonical CTAs with UTM source/campaign/content fields.
- [x] Add `manual-package all` to regenerate the whole archive consistently.

## Task 6: Scheduling And Approval

**Files:**
- Create: `scripts/lib/publish-scheduler.mjs`
- Modify: `content/distribution/platform-ledger.json`

- [ ] Model publish windows and embargo delays.
- [ ] Require `approvedBy` before any external platform draft or publish.
- [ ] Keep `publish` disabled by default.
- [x] Add `dry-run` and `manual-package` commands first.

## Task 7: Observability

**Files:**
- Modify: `scripts/lib/observability.mjs`
- Create: `docs/ops/content-distribution-observability.md`
- Create: `scripts/lib/content-metrics.mjs`
- Create: `content/distribution/content-metrics.json`

- [x] Log every scan, transform, package generation, and metrics report command.
- [x] Record input and output checksums.
- [ ] Add receipt verification observer.
- [x] Add metrics report command that reconciles packages, ledger receipts, and metrics records.
- [ ] Add weekly drift report command.
- [x] Ensure every observer has at least one fallback: registry report, manual package, metrics report, ROM heartbeat.

## Task 8: Verification

- [ ] `rtk pnpm type-check`
- [x] distribution package and metrics tests
- [x] `rtk pnpm content:pipeline manual-package all`
- [x] `rtk pnpm content:pipeline metrics:report`
- [ ] `NEXT_TELEMETRY_DISABLED=1 OPENAI_API_KEY= rtk pnpm build`
- [ ] staging synthetic checks for canonical article, RSS, sitemap

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This plan owns one concern: distribution pipeline implementation.

### I — Interface
Score: ✅
Notes: The CLI commands, registry, and package outputs are explicit.

### E — Encapsulation
Score: ✅
Notes: Readers, transformers, publishers, and observers are separate boundaries.

### C — Connection
Score: ✅
Notes: Browser automation is explicitly not a core dependency.

### I — Implementation
Score: ✅
Notes: The plan starts read-only and adds mutation only after verification.

## Merge Decision

Pass

## Required Fixes

None.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It makes platform distribution a registry-driven pipeline instead of a set of one-off browser sessions.
