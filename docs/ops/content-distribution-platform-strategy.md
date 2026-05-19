# Content Distribution Platform Strategy

## Current Rule

davidmieloch.com is the canonical home. External sites are reach surfaces, not the source of truth.

The pipeline should create local packages and drafts first. Public posting requires an explicit receipt trail and David approval.

The executable policy lives in:

```text
content/distribution/syndication-policy.json
```

That file is the source of truth for post mode, canonical support, approval rules, CTA language, and metric fields. The package generator consumes it directly.

Scheduled launches live in:

```text
content/distribution/launch-calendar.json
```

That file is the source of truth for launch timing, source article readiness, target platform allow-lists, explicit exclusions, and approval mode. It does not grant permission to publish.

## Platform Modes

| Platform | Mode | Use |
| --- | --- | --- |
| Website | Canonical publish | SEO, AI indexing, durable archive |
| LinkedIn | `launch-post` | Professional audience and published-state reconciliation |
| Reddit | `discussion` | Discovery and conversation, never blind mirroring |
| Medium | `full-mirror` | Broader essay discovery with canonical source preserved |
| DEV | `full-mirror` | Developer audience with canonical backlink |
| Hashnode | `full-mirror` | Developer audience with canonical backlink |
| HackerNoon | `editorial-republish` | Opinionated technical essay distribution |
| DZone | `editorial-rewrite` | Practical engineering version |
| Substack | `newsletter` | Direct audience and follow-up loop |

## Package Rules

- Full mirrors preserve the canonical URL and append a tracked canonical CTA.
- Discussion packages are never mirrors; they are prompts that can include the canonical essay as context.
- Newsletter packages are series/editorial wrappers, not raw cross-posts.
- Editorial packages are starting drafts for human review.
- All packages include `public_publish_allowed: false`.
- UTM links use `utm_source=<platform>`, `utm_medium=syndication`, `utm_campaign=content_distribution`, and `utm_content=<slug>`.

## Reddit Policy

Reddit should not receive identical mirrors. Each package is a starting point for a subreddit-specific discussion:

- Read target subreddit rules first.
- Rewrite the post around the community's local concern.
- Prefer a discussion prompt over a link dump.
- Do not post the same text to multiple subreddits.
- Record the subreddit, post URL, and final copy in the ledger.

Reddit's official API documents `POST /api/submit` for links and self-posts, but the pipeline should stay manual-first until account/API access, subreddit fit, rate limits, and moderation risk are better observed.

## API Backed Drafts

DEV/Forem supports creating articles through `POST https://dev.to/api/articles`; its request body includes `published`, which defaults to `false`. The pipeline keeps this as draft-first.

Hashnode exposes a GraphQL endpoint at `https://gql.hashnode.com`. The existing pipeline uses `createDraft` and delists drafts by default when credentials are present.

References:

- Reddit API docs: https://www.reddit.com/dev/api/
- Forem/DEV API docs: https://developers.forem.com/api/v1
- Hashnode GraphQL docs: https://docs.hashnode.com/quickstart/introduction

## Launch Calendar Policy

Each launch entry declares:

- `sourcePlatform`: where the source article appears first.
- `scheduledAt`: the expected launch time with timezone offset.
- `articleSlug`: the canonical website slug, or `null` while the source URL is pending.
- `targetPlatforms`: an explicit allow-list of platform ids and approval modes.
- `excludedPlatforms`: platform ids that must not be touched during that launch.
- `approvalPolicy`: the human approval requirements for public publishing.

Allowed target approval modes:

- `draft-only`: creating an unpublished draft is allowed when credentials and package validation pass.
- `manual-approval`: prepare the package or browser import, then stop before public publish.
- `publish-approved`: public publishing is allowed only when an entry records explicit approval.
- `manual-only`: no automation; human/browser action only.

LinkedIn is a source/reference channel by default. Do not post new LinkedIn content from a launch calendar entry unless the entry explicitly includes LinkedIn with `manual-only`, `publish-approved`, and a concrete David approval record.

## Operating Loop

1. Reconcile LinkedIn published articles into the ledger.
2. Reconcile Medium legacy posts through `https://medium.com/feed/@davidmieloch`.
3. Import website-missing articles into `content/articles`.
4. Check due launch entries in `content/distribution/launch-calendar.json`.
5. Generate packages with:

   ```bash
   rtk pnpm content:pipeline manual-package <slug|all>
   ```

6. Let agents rewrite platform packages for audience fit.
7. Human approval gates any first publish on a platform.
8. Record receipts in `content/distribution/platform-ledger.json`.
9. Record content metrics in `content/distribution/content-metrics.json`.
10. Run drift checks against the website, ledger, platform receipts, launch calendar, and metrics records.

## Metrics Loop

The pipeline can record observed metrics after an external post exists:

```bash
rtk pnpm content:pipeline metrics:record the-factory medium \
  --url=https://medium.com/@davidmieloch/the-factory \
  --views=120 \
  --clicks=9 \
  --reactions=4 \
  --comments=1 \
  --shares=2
```

Then reconcile the package surface, ledger receipts, and metrics records:

```bash
rtk pnpm content:pipeline metrics:report
```

A published platform receipt without a metrics record is a degraded observation. That is intentional: the pipeline should notice when distribution happened but measurement did not.

## Readiness And Receipts

Use the readiness report before a distribution session:

```bash
rtk pnpm content:pipeline readiness
```

It reconciles canonical URL probes, package coverage, platform credentials, approval modes, and ledger receipts. Use `--skip-network` for local test runs.

Browser/manual work must be recorded through the receipt command instead of hand-editing ledger JSON:

```bash
rtk pnpm content:pipeline receipt:record the-factory hackernoon \
  --status=draft \
  --url=https://app.hackernoon.com/mobile/example \
  --notes="Saved draft shell; not submitted."
```

This keeps platform state updates attached to the intended article and makes manual surfaces observable.

## Observability

Each package and metrics command writes Genesis heartbeat records through `scripts/lib/observability.mjs`.

Required claims:

- package files were created
- manifest records output checksums
- public publishing was not performed
- receipt URL is missing until a human or approved publisher fills it
- published receipts have metrics records

Fallback chain:

1. package manifest checksum
2. ledger and metrics readback
3. ROM heartbeat

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This file owns one concern: platform distribution policy.

### I — Interface
Score: ✅
Notes: The public interface is the platform mode table and the `manual-package` command.

### E — Encapsulation
Score: ✅
Notes: Posting policy stays separate from platform client implementation.

### C — Connection
Score: ✅
Notes: External APIs are referenced only as capability boundaries.

### I — Implementation
Score: ✅
Notes: Manual-first packages reduce risk while preserving momentum.

## Merge Decision

Pass

## Required Fixes

None.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It separates content packaging from public posting and gives every platform a clear operating mode.
