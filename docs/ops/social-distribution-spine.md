# Social Distribution Spine

Generated: 2026-06-05

## Purpose

Build a small self-owned Buffer-like scheduler for promoting canonical davidmieloch.com articles without turning public posting into invisible automation.

## Deterministic Spine

Raw inputs:

- `content/distribution/content-ledger.json`
- `content/distribution/publish-schedule.json`
- canonical article Markdown under `content/articles/<slug>/index.md`
- generated platform packages under `content/distribution/packages/<slug>/`

Derived artifacts:

- `content/distribution/social-calendar.json`
- `content/distribution/social-packages/<slug>/<platform>.md`
- `content/distribution/social-packages/<slug>/manifest.json`
- `content/distribution/social-manifests/<slug>/<platform>.json`
- `content/distribution/n8n/social-dispatch-packets.json`
- `content/distribution/refusal-inbox.json`
- receipt records for every draft, approval, dispatch, rejection, and metric capture

## Decision Seam

Name: `public-social-post-approval`

Actor: David

Safe default: `do-not-post`

Automation before seam:

- generate short teaser candidates
- attach canonical tracked URLs
- schedule proposed post windows
- create draft-only records where a platform supports drafts
- render browser/manual instructions

Automation after seam:

- dispatch a specific approved post to a specific platform at a specific time
- record the platform URL and metrics capture task

Disallowed without explicit approval:

- post to LinkedIn
- post to Reddit
- post to X
- send Substack email
- submit HackerNoon/DZone editorial review

## Platform Adapters

- LinkedIn: browser/manual until API access is explicitly approved.
- Reddit: community-specific discussion seeds; API or browser only after subreddit, title, and body are approved.
- X: API-backed if credentials and plan allow it; otherwise browser/manual. Short posts only.
- Bluesky/Mastodon: good early API candidates if accounts are created.
- Substack Notes: browser/manual unless API support is confirmed.

## Postiz And n8n Split

Postiz is the internal scheduling/channel substrate. n8n is the workflow
orchestrator. They should be combined through deterministic packets, not by
letting either tool become the source of truth.

- Website ledger: canonical content, approvals, schedule intent, receipts.
- Postiz: connected channels, calendar UI, social dispatch state.
- n8n: reminders, workflow transitions, calls into Postiz APIs, metrics capture jobs.
- Commander Data: owns the n8n workflow buildout and maintenance.

Safe default remains `do-not-post`. n8n may move approved packets and notify
agents, but it must not create public posting approval.

Exposure gate for every GUI:

```text
Does anybody but Dave need to touch this GUI?
```

If the answer is no or unknown, keep the GUI internal. This applies especially
to Postiz, n8n, analytics, credentials, content admin, agent-control surfaces,
and scheduling dashboards.

## CLI Shape

- `pnpm content:pipeline social:package <slug|all>` creates teaser packages.
- `pnpm content:pipeline social:readiness` reports account and credential custody state.
- `pnpm content:pipeline social:schedule --start=<iso> --interval-hours=8 --write` writes `social-calendar.json`.
- `pnpm content:pipeline social:due --now=<iso>` reports due approved/unapproved posts.
- `pnpm content:pipeline social:manifest <slug|all> <platform|all> --write` writes signed post manifests.
- `pnpm content:pipeline social:n8n:export --write` emits workflow-ready schedule packets.
- `pnpm content:pipeline social:refusal <platform> <action> --reason=<reason>` records blocked actions.
- `pnpm content:pipeline social:postiz:push --dry-run` refuses until credential custody and a Postiz adapter are ready.

## Teaser Rules

- Lead with the tension, not the whole argument.
- Do not bait a fight that replaces the article.
- Every teaser routes back to the canonical website URL with UTM tags.
- Reddit posts are community-specific and discussion-first.
- LinkedIn teasers stay short enough to make the article the payload.
- X posts should be threadable, but the first post must stand alone.

## Observability

Required claims:

- Every generated teaser has a source article.
- Every scheduled post has a safe default of `do-not-post`.
- Every public dispatch has an approval receipt.
- Every published URL has a metrics capture task.

Fallback chain:

1. `social-ledger.json`
2. platform receipts in `platform-ledger.json`
3. manual platform screenshot or URL receipt
4. ROM heartbeat

## Next Build Step

Build the Postiz adapter behind `social:postiz:push`. It should read signed manifests, refuse unless credential custody and David approval are present, and create Postiz drafts or schedules only. It must not publish public posts.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This file owns one concern: the deterministic social distribution spine.

### I — Interface
Score: ✅
Notes: The CLI commands expose package, schedule, manifest, n8n, refusal, and dry-run push surfaces without exposing provider internals.

### E — Encapsulation
Score: ✅
Notes: Credentials remain outside repo custody; manifests carry copy and approval state, not secrets.

### C — Connection
Score: ✅
Notes: The website ledger, Postiz, n8n, and platform accounts connect through packet files and approval receipts.

### I — Implementation
Score: ⚠️
Notes: The deterministic packet layer exists; the Postiz API adapter and provider connections remain blocked on 1Password write access.

## Merge Decision

Pass for substrate. Block connector execution until credential custody is fixed.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It turns social distribution from browser labor into package, manifest, schedule, and workflow packets with explicit refusal states.
