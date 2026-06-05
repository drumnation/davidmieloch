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

- `content/distribution/social-ledger.json`
- `content/distribution/social-calendar.json`
- `content/distribution/social-packages/<slug>/<platform>.md`
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

## CLI Shape

- `pnpm content:pipeline social:package <slug|all>` creates teaser packages.
- `pnpm content:pipeline social:schedule --platforms=x,reddit,linkedin --start=<iso>` writes `social-calendar.json`.
- `pnpm content:pipeline social:due --now=<iso>` reports due approved/unapproved posts.
- `pnpm content:pipeline social:approve <slug> <platform> --post-id=<id>` records approval only.
- `pnpm content:pipeline social:dispatch <slug> <platform>` refuses unless approval is present.
- `pnpm content:pipeline social:receipt <slug> <platform> --status=<draft|posted|blocked|rejected>` records outcome.

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

Implement `social:package` first. It should consume the content ledger and create draft teaser packages for LinkedIn, X, and Reddit without posting anything.
