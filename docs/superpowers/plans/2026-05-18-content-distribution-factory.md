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
- [ ] Reconcile LinkedIn published articles against registry.
- [ ] Flag website-missing published articles.

## Task 4: Website Importer

**Files:**
- Create: `scripts/lib/website-importer.mjs`
- Modify: `scripts/content-pipeline.mjs`

- [x] Convert approved article folder into `content/articles/<slug>/index.md`.
- [x] Copy images into `public/blog/<slug>/images`.
- [x] Add required website frontmatter.
- [ ] Validate sitemap/RSS expectations after build.

## Task 5: Platform Package Generator

**Files:**
- Create: `scripts/lib/platform-packages.mjs`
- Create: `content/distribution/packages/`

- [x] Generate LinkedIn variant.
- [x] Generate Medium/Dev.to/Hashnode mirror package.
- [x] Generate social excerpt package.
- [x] Include canonical URL, backlinks, images, and manual posting checklist.

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

- [ ] Log every scan, transform, package generation, and publish attempt.
- [ ] Record input and output checksums.
- [ ] Add receipt verification observer.
- [ ] Add weekly drift report command.
- [ ] Ensure every observer has at least one fallback: registry report, manual package, ROM heartbeat.

## Task 8: Verification

- [ ] `rtk pnpm type-check`
- [ ] registry tests
- [ ] `rtk pnpm content:pipeline -- dry-run`
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
