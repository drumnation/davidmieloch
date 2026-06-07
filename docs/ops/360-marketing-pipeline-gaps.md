# 360 Marketing Pipeline Gaps

Generated: 2026-06-07

Forgejo governance:

- Content/social scheduler: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/20
- Gmail signature kit: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/21

## Current Spine

The site is the canonical content hub.

Deterministic artifacts now exist for:

- Article inventory: `content/distribution/content-ledger.json`
- Article readiness: `content/distribution/article-readiness-report.json`
- Website release schedule: `content/distribution/site-release-calendar.json`
- Social packages: `content/distribution/social-packages/`
- LinkedIn article transfer packets: `content/distribution/linkedin-article-transfer/`
- Factory Primitives interior art queue: `content/distribution/factory-primitives-interior-image-plan.json`
- Lead capture/Twenty routing docs: `docs/ops/lead-funnel-workflow.md`

## Gaps Blocking the End State

### 1. Drafts Are Not Yet Image-Complete

The next five website drafts have hero images and interior image plans, but none
has approved/generated body images inserted into the article.

Next substrate:

```bash
pnpm content:pipeline image:generate-batch --input=content/distribution/factory-primitives-interior-image-plan.json --spend-approved
pnpm content:pipeline image:approve <slug> <placement-id> <variant-id>
pnpm content:pipeline image:publish-assets <slug>
```

The first command does not exist yet. It should use the existing spend-gated
image provider pattern and write receipts/checksums beside each article.

### 2. Website Release Is Still Manual

`site-release-calendar.json` declares release times, but no command flips
approved drafts from `draft` to `published`, verifies public routing, and records
a release receipt.

Next substrate:

```bash
pnpm content:pipeline site:release:due --now=<iso>
pnpm content:pipeline site:release <slug> --approved-by=David
```

### 3. LinkedIn Article Staging Still Needs Browser Execution

The repo has transfer packets, but LinkedIn article creation remains a
browser/manual flow.

Safe next step:

- Use the packet in `content/distribution/linkedin-article-transfer/<slug>/`.
- Stage the LinkedIn article draft in the browser.
- Stop before public publish/schedule unless David approves the exact action.
- Record the draft URL/receipt.

### 4. Newsletter Capture Exists As A Direction, Not A Weekly Operating Loop

Twenty/contact routing is being documented, but the content pipeline does not
yet generate newsletter issues from scheduled site releases.

Next substrate:

```bash
pnpm content:pipeline newsletter:issue --week=<yyyy-mm-dd> --write
pnpm content:pipeline newsletter:lead-magnet <series-slug> --write
```

Newsletter outputs should include:

- subject line options
- short personal intro
- article links
- a reply prompt
- Twenty campaign/list target
- approval status

### 5. Social Promotion Is Wider Than Current Postiz Value

LinkedIn profile is the highest-value channel. Postiz has value for simple posts
once channels are connected, but the meaty article path is still LinkedIn
browser/API specific.

Next substrate:

- Treat Postiz as a simple-post scheduler.
- Keep LinkedIn articles as transfer packets plus browser/API staging.
- Keep Reddit as community-specific discussion packages, not mirrored posts.
- Keep Medium/Hashnode/DEV/HackerNoon/DZone/Substack as platform-specific
  import/editorial flows with canonical links back to the site.

## IP/Image Policy

Articles that use named copyrighted worlds as metaphors, such as `ASI Should Be
the Avatar, Not God`, should not silently ask an image model to imitate the
protected show, characters, or house style.

Approved strategy options:

1. Original symbolic art that communicates the idea without copying characters,
   logos, costumes, or exact visual style.
2. Web-sourced images only when the source/rights/citation are recorded.
3. Screenshots/stills only after explicit rights/fair-use review.

This is now flagged by:

```bash
pnpm content:pipeline article:readiness --write
```

## Done Definition

The 360 pipeline is not done until:

1. Draft articles can move from idea/import to image-complete website draft.
2. Website releases can execute from a schedule with approval receipts.
3. LinkedIn articles/posts can be staged from transfer packets.
4. Social/simple-post promotion can be scheduled from the release calendar.
5. Newsletter issues can be generated from the release calendar and routed
   toward Twenty-backed lists.
6. Every public action has an approval seam and a receipt.
