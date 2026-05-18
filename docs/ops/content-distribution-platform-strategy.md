# Content Distribution Platform Strategy

## Current Rule

davidmieloch.com is the canonical home. External sites are reach surfaces, not the source of truth.

The pipeline should create local packages and drafts first. Public posting requires an explicit receipt trail and David approval.

## Platform Modes

| Platform | Mode | Use |
| --- | --- | --- |
| Website | Canonical publish | SEO, AI indexing, durable archive |
| LinkedIn | Native launch post or article variant | Professional audience and published-state reconciliation |
| Reddit | Community-specific discussion package | Discovery and conversation, never blind mirroring |
| Medium | Canonical import or mirror | Broader essay discovery |
| DEV | API-created unpublished draft | Developer audience with canonical backlink |
| Hashnode | API-created delisted draft | Developer audience with canonical backlink |
| HackerNoon | Editorial submission package | Opinionated technical essay distribution |
| DZone | Editorial rewrite package | Practical engineering version |
| Substack | Newsletter intro | Direct audience and follow-up loop |

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

## Operating Loop

1. Reconcile LinkedIn published articles into the ledger.
2. Import website-missing articles into `content/articles`.
3. Generate packages with:

   ```bash
   rtk pnpm content:pipeline manual-package <slug>
   ```

4. Let agents rewrite platform packages for audience fit.
5. Human approval gates any first publish on a platform.
6. Record receipts in `content/distribution/platform-ledger.json`.
7. Run drift checks against the website, ledger, and platform receipts.

## Observability

Each package command writes Genesis heartbeat records through `scripts/lib/observability.mjs`.

Required claims:

- package files were created
- manifest records output checksums
- public publishing was not performed
- receipt URL is missing until a human or approved publisher fills it

Fallback chain:

1. package manifest checksum
2. ledger status readback
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
