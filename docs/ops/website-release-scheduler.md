# Website Release Scheduler

Generated: 2026-06-06

Forgejo issue: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/20

## Purpose

Coordinate davidmieloch.com article releases with LinkedIn staging and later
cross-channel promotion.

## Current Pivot

Postiz is useful as a social calendar once channels are connected, but the
highest-value channel right now is LinkedIn. LinkedIn profile is connected in
Postiz, but the meaty article flow still needs browser staging for LinkedIn
articles and posts.

The more valuable launch path is:

1. Finish the next five Factory Primitives drafts.
2. Stage them as website drafts with approved hero images.
3. Schedule website release dates.
4. Stage matching LinkedIn posts/articles manually or by browser automation.
5. Use Postiz/n8n for social reminders and simple promotional posts where it
   has a connected channel.

## Do Not Make The Website A Fake Social Provider

davidmieloch.com should not be custom-added to Postiz as though it were another
social network.

The website owns canonical article state. Postiz owns social scheduling state.
The bridge is `content/distribution/site-release-calendar.json`, not a custom
Postiz provider.

This reduces the next-change surface area:

- Article release state stays in git with the article content.
- Website publishing can be reviewed, tested, built, and deployed normally.
- LinkedIn/Postiz/n8n can consume the release calendar without gaining authority
  over the website.
- Public dispatch still has a David approval seam.

## Current Release Queue

The first queue contains five Factory Primitives drafts:

| Sequence | Slug | Website State | LinkedIn State |
| --- | --- | --- | --- |
| 1 | `the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter` | staged draft | needs browser staging |
| 2 | `the-ai-bill-you-cant-predict` | staged draft | needs browser staging |
| 3 | `the-most-valuable-ai-skill-isnt-prompting` | staged draft | needs browser staging |
| 4 | `the-credibility-problem-with-ai-corporate-communications` | staged draft | needs browser staging |
| 5 | `the-crew-seed` | staged draft | needs browser staging |

Each draft has:

- `content/articles/<slug>/index.md`
- `public/blog/<slug>/images/hero-linkedin.png`
- `content/distribution/social-packages/<slug>/linkedin.md`
- `content/distribution/social-manifests/<slug>/linkedin.json`

## Decision Seam

Name: `public-article-release-approval`

Actor: David

Safe default: `keep-draft`

Required gates:

1. Article copy approved.
2. Hero image approved.
3. Website draft preview reviewed.
4. LinkedIn post/article copy approved.
5. Release time approved.

## Deterministic Spine

Source artifacts:

- `content/distribution/site-release-calendar.json`
- `content/articles/*/index.md`
- `content/distribution/platform-ledger.json`
- `content/distribution/social-packages/*/linkedin.md`
- `content/distribution/social-manifests/*/linkedin.json`

Release execution should eventually become a CLI command:

```bash
pnpm content:pipeline site:release:due --now=<iso>
pnpm content:pipeline site:release <slug> --approve --published-at=<date>
```

Until that CLI exists, release is manual and explicit:

1. Change article `status` from `draft` to `published`.
2. Confirm `publishedAt` matches the approved release date.
3. Run typecheck/build.
4. Deploy davidmieloch.com.
5. Record the release receipt in the ledger.

## Observability

Primary checks:

- `content/distribution/site-release-calendar.json` lists every planned release.
- Draft article files exist.
- Hero files exist and are 16:9 LinkedIn-friendly.
- `getPublishedArticles()` excludes drafts before release.
- Public davidmieloch.com does not expose drafts before release.

Fallback checks:

1. Website build output.
2. Public URL `404` before release and `200` after release.
3. LinkedIn staged post/article screenshot.
4. ROM heartbeat.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This file owns one concern: website release scheduling for articles.

### I — Interface
Score: ✅
Notes: The handoff artifact is a single release calendar, not a new provider API.

### E — Encapsulation
Score: ✅
Notes: Website release state remains inside the website repo. Postiz does not own canonical content.

### C — Connection
Score: ✅
Notes: Postiz and n8n consume the schedule; they do not control website state.

### I — Implementation
Score: ⚠️
Notes: The release calendar and staged drafts exist. The deterministic release CLI is still a follow-up.

## Merge Decision

Pass for staging and planning. Block public release until David approves each
draft and release time.

## Required Fixes

1. Build the `site:release` CLI.
2. Add release receipts to the content ledger.
3. Browser-stage the matching LinkedIn posts/articles.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. Website publishing stays a git-governed content operation, while
Postiz remains a social scheduler.
