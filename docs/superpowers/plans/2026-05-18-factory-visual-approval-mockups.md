# Factory Visual Approval Mockups Plan

> **For agentic workers:** Build only approval artifacts until David explicitly approves a direction. Do not replace production homepage/blog from this plan alone.

**Goal:** Produce a small set of visual mockups and generated-art candidates for the AI Architect / dark chocolate software factory rebrand.

**Architecture:** Keep approval work isolated from production routes. Use a temporary mockup route or static artifact directory, then promote only the approved direction into the real site implementation plan.

---

## Task 1: Approval Surface

**Files:**
- Create: `app/rebrand-lab/page.tsx`
- Create: `app/rebrand-lab/RebrandLab.tsx`
- Create: `app/rebrand-lab/rebrandLabStyles.ts`

- [ ] Build a non-indexed mockup route at `/rebrand-lab`.
- [ ] Add a visible "approval lab" label so it cannot be mistaken for production content.
- [ ] Add three tabs or sections:
  - Industrial Luxury Factory
  - Control Room / Operator Console
  - Editorial Field Manual
- [ ] Include desktop-first and mobile-friendly layouts.

## Task 2: Visual Assets

**Files:**
- Create: `public/rebrand-lab/`

- [ ] Generate or collect three still-art candidates:
  - homepage hero
  - blog hero
  - visual accent / chocolate chip macro
- [ ] Store prompt text next to each asset in `public/rebrand-lab/prompts.md`.
- [ ] Optimize images for web.
- [ ] Use real bitmap images, not decorative SVG placeholders.

## Task 3: Homepage Mockups

**Files:**
- Modify: `app/rebrand-lab/RebrandLab.tsx`

- [ ] Direction A: full-bleed cinematic hero with `AI Architect for Software Factories`.
- [ ] Direction B: control-room hero with proof artifacts immediately below.
- [ ] Both directions must show the next section above the fold edge on desktop and mobile.
- [ ] Include 3-4 proof artifact cards using existing site/project material.

## Task 4: Blog Mockup

**Files:**
- Modify: `app/rebrand-lab/RebrandLab.tsx`

- [ ] Mock the blog landing around "field notes from the factory floor".
- [ ] Show article eras: current, transitional, legacy.
- [ ] Show one featured article and a compact archive section.
- [ ] Avoid a generic card grid.

## Task 5: Video Hero Pilot Brief

**Files:**
- Create: `docs/ops/ltx-video-hero-pilot.md`

- [ ] Select a 15-second section of one David track.
- [ ] Define LTX prompt and negative constraints.
- [ ] Estimate cost for 10, 25, and 50 iterations.
- [ ] Define acceptance criteria for a loopable website hero.
- [ ] Do not run paid video generation until David approves the pilot budget.

## Task 6: Verification

- [ ] Run `rtk pnpm type-check`.
- [ ] Run `NEXT_TELEMETRY_DISABLED=1 OPENAI_API_KEY= rtk pnpm build`.
- [ ] Start or update staging.
- [ ] Use browser screenshots for:
  - `/rebrand-lab` desktop
  - `/rebrand-lab` mobile
  - `/blog` current comparison
- [ ] Attach screenshot paths or links to the Forgejo issue.

## Task 7: Approval Gate

- [ ] Summarize the three directions in Forgejo.
- [ ] Ask David to approve, combine, or reject directions.
- [ ] Only after approval, create an implementation plan for the production homepage/blog.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This plan owns one concern: approval mockups.

### I — Interface
Score: ✅
Notes: `/rebrand-lab` is the approval interface; production routes stay untouched.

### E — Encapsulation
Score: ✅
Notes: Mockup assets and code stay isolated until approved.

### C — Connection
Score: ✅
Notes: Depends only on existing app rendering and public assets.

### I — Implementation
Score: ✅
Notes: The plan avoids broad production changes and paid generation until approval.

## Merge Decision

Pass

## Required Fixes

None.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It creates a contained approval lab instead of mixing exploration into production pages.
