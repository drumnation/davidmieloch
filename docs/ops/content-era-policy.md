# Content Era Policy

Generated: 2026-06-05

## Purpose

Make time visible in the content system. The year something was written is part
of the claim, the tone, and the brand posture.

## Rule

Every public article must carry a visible publication year and era label.

The website should not flatten old writing into the current thesis. Older posts
can still be valuable, but they should read as artifacts from that moment, not
as David's current position.

## Current Era Map

- 2026: Factory era
- 2025: Transition era
- 2024: AI team era
- 2023: Engineering notes
- earlier: Earlier archive

## Pipeline Impact

Website:

- group writing by year
- show era context on article pages
- keep old articles discoverable without presenting them as the current brand

Syndication:

- old backfills should be labeled or framed as archive/backfill
- new releases should publish close to when the thinking is current
- social teasers should include the current framing when an older article is resurfaced

Audio:

- audio should match the canonical website article version
- future paid audio generation should wait until the article's era, title, and release frame are approved

Images:

- current factory-era work should use the current visual language
- old posts can keep original images, but new image regeneration should respect the era being represented

## Decision Seam

Name: `era-framing-approval`

Actor: David

Safe default: keep draft staged, do not publish.

Approval question:

> Is this post being presented as current doctrine, historical context, or a resurfaced archive piece?
