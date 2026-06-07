# Factory Primitives LinkedIn Launch

This plan covers the next five Factory Primitives articles. Safe default:
do not publish without David approval.

## Release Batch

| Date | Article | Website state | LinkedIn article | Reveal post |
| --- | --- | --- | --- | --- |
| 2026-06-10 11:00 ET | The AI Cost Rug Pull Isn't a Bubble. It's a Filter. | staged draft | needs staging | needs approval |
| 2026-06-13 11:00 ET | The AI Bill You Can't Predict | staged draft | needs staging | needs approval |
| 2026-06-17 11:00 ET | The Most Valuable AI Skill Isn't Prompting | staged draft | needs staging | needs approval |
| 2026-06-20 11:00 ET | The Credibility Problem with AI Corporate Communications | staged draft | needs staging | needs approval |
| 2026-06-24 11:00 ET | The Crew | staged draft | needs staging | needs approval |

Source of truth: `content/distribution/site-release-calendar.json`.
Reveal-post calendar: `content/distribution/factory-primitives-social-calendar.json`.
Curated reveal copy: `content/distribution/social-teasers.json`.
Approval packet: `content/distribution/factory-primitives-approval-packet.json`.
Approval ledger: `content/distribution/factory-primitives-approval-ledger.json`.

## Decision Seam

The release decision is David-owned.

Inputs:

- canonical website draft
- article hero image
- LinkedIn article draft preview
- LinkedIn reveal post copy
- release time

Actions:

- approve website release
- approve LinkedIn article publish
- approve reveal post schedule
- hold article

Safe default: hold article.

Regenerate the approval packet:

```sh
pnpm content:pipeline launch:approval-packet --write --output=content/distribution/factory-primitives-approval-packet.json
```

Expected result before David approves:

- `articles: 5`
- `blocked: 0`
- `readyForDavidReview: 5`
- `approvalGatesPerArticle: 5`

The packet does not approve or publish anything. It only assembles the article
copy, hero image, website preview, LinkedIn reveal copy, and release time gates
into one review artifact.

Record approval only after David explicitly approves a gate:

```sh
pnpm content:pipeline launch:approve <slug|all> <gate|all> --by=David --note="approval note"
```

Supported gates:

- `article-copy-approved`
- `hero-image-approved`
- `site-draft-preview-reviewed`
- `linkedin-reveal-copy-approved`
- `release-time-approved`

This writes the local approval ledger and regenerates the approval packet. It
does not schedule, publish, submit, or call LinkedIn/Postiz.

## Programmatic Surface

LinkedIn's current public API surface is useful for feed posts. The official
Posts API supports organic posts, including article-card posts, through
`POST https://api.linkedin.com/rest/posts` with `w_member_social` for a member
or `w_organization_social` for an organization. Article-card posts require
explicit article fields and uploaded thumbnail assets; LinkedIn does not scrape
the URL for API-created article posts.

That means the low-friction programmable path is:

1. Keep the website article as canonical.
2. Generate the LinkedIn reveal post package from the canonical article.
3. Use Postiz/LinkedIn API to stage or schedule the feed reveal post.
4. Include the canonical URL and hero image.

The unresolved path is full LinkedIn long-form Articles. We should treat that as
browser-assisted until we prove a supported, draft-safe API for LinkedIn's
article editor.

## Operating Sequence

For each article:

1. Review the website draft in Draft Lab.
2. Approve or revise hero image.
3. Regenerate social package:
   `pnpm content:pipeline social:package <slug> linkedin`
4. Regenerate manifest:
   `pnpm content:pipeline social:manifest <slug> linkedin --write`
5. If publishing a native LinkedIn Article, use browser automation/manual review
   to paste the long-form article into LinkedIn and stop at draft/preview.
6. Schedule the LinkedIn feed reveal post through Postiz only after approval.
7. Record receipts in `content/distribution/platform-ledger.json`.

## Postiz Reveal Path

The broad `content/distribution/social-calendar.json` still includes backlog
items. Do not use it for this launch batch. Use the dedicated Factory
Primitives calendar.

Regenerate the calendar from the website release calendar and social packages:

```sh
pnpm content:pipeline social:launch-calendar --platform=linkedin --write --output=content/distribution/factory-primitives-social-calendar.json
```

Then verify the Postiz plan:

```sh
pnpm content:pipeline social:postiz:push --dry-run --platform=linkedin --limit=5 --input=content/distribution/factory-primitives-social-calendar.json
```

Expected dry-run result:

- `selectedEntries: 5`
- `readyEntries: 5`
- `blockedEntries: 0`
- `plannedActions: 5`

After David approves the article copy, image, and reveal copy, create internal
Postiz draft records only:

```sh
POSTIZ_API_KEY=<from-1password> pnpm content:pipeline social:postiz:push --dry-run=false --platform=linkedin --limit=5 --input=content/distribution/factory-primitives-social-calendar.json
```

This command must create Postiz `DRAFT` records only. It must not publish public
posts, submit LinkedIn articles, or post to Reddit. The CLI blocks non-dry-run
Postiz draft creation while approval status is missing, even if the channel is
connected and the package is otherwise ready.

## Observability

Required evidence per article:

- website draft path
- image manifest checksum
- LinkedIn package checksum
- LinkedIn manifest digest
- approval artifact
- scheduled/published URL after release

Fallback chain:

1. Postiz scheduled draft
2. LinkedIn browser scheduled post
3. Manual same-day post from approved package

## Current Readiness

As of this plan update, all five articles have 1920x1080 hero images staged and
all five have website draft entries. `The Crew` has been revised from seed notes
into a publishable draft, but still requires David editorial approval like the
rest of the batch.
