# davidmieloch.com Site Release Ladder

## Purpose

Stop treating a feature branch as a release. Every site or content change moves through visible states:

```text
draft/source -> canonical article or code change -> local verification -> staging verification -> production verification
```

If a step has no evidence, the step did not happen.

## Surfaces

- Local repo: `/Users/dmieloch/Dev/projects/personal/davidmieloch-website/david-monorepo`
- Staging/internal: `https://davidmieloch.brain-garden.io`
- Production/live: `https://davidmieloch.com`

Use the in-app browser on staging for visual/content review. Use production only for final live verification after promotion.

## One-Command Release Ladder

Use the release ladder instead of manually hopping between branch, staging, and production:

```bash
pnpm site:release-ladder --slug=<article-slug>
```

Default mode is a dry run. It prints the promotion path and does not push, deploy, restart services, or write a receipt. To perform the release:

```bash
pnpm site:release-ladder --slug=<article-slug> --execute
```

Execution refuses a dirty local worktree, runs `launch:assets`, fast-forwards `main`, backs up and deploys staging, verifies staging routes/RSS/audio, backs up and deploys production, verifies production routes/RSS/audio, runs live release status, and writes a JSON receipt under:

```text
content/distribution/release-receipts/
```

Use comma-separated slugs for a bundled article release:

```bash
pnpm site:release-ladder --slug=slug-one,slug-two --execute
```

If the command fails, it still writes a failed receipt with the step evidence gathered before the failure.

## Canonical Content Rule

Draft previews are not posts. A post is not launched on the website until it exists as:

```text
content/articles/<slug>/index.md
```

with `status: "published"` and a canonical URL under:

```text
https://davidmieloch.com/blog/<slug>
```

`content/distribution/draft-previews/*.md` may hold drafts, source imports, or review copies. Those files do not enter RSS, sitemap, or article routes by themselves.

## Release Asset Rule

Published canonical articles must have generated launch assets before promotion:

- `content/articles/<slug>/audio.md`
- `content/articles/<slug>/audio-manifest.json` with current hashes
- `content/articles/<slug>/audio-transcript.json` with current script/audio hashes and passing coverage
- `public/audio/voice/blog/<slug>.mp3`
- `generatedBlogVoiceTracks.ts` entry for the article slug and MP3
- Declared `coverImage` assets must resolve under `public`

CI runs the same gate for changed content/audio assets:

```bash
pnpm content:launch-gate <slug>
```

Run without a slug to verify every local published article:

```bash
pnpm content:launch-gate
```

The gate does not generate paid audio, run paid transcription, or deploy. It only blocks promotion when required artifacts are missing or stale.

## Promotion Gates

### 1. Local

Required evidence:

- Worktree state is known.
- Change is in the correct repo branch.
- Content exists under `content/articles` if this is a post.
- Launch assets pass for any published article.
- Local validation/build has run when code changed.

Useful commands:

```bash
pnpm content:pipeline validate
pnpm content:launch-gate
pnpm release:status
```

### 2. Staging

Required evidence:

- `https://davidmieloch.brain-garden.io/` returns 2xx/3xx.
- `/blog`, `/rss.xml`, `/sitemap.xml`, and changed route return 2xx/3xx.
- In-app browser is opened to the staging URL for visual review when the change is visible.
- Latest staging RSS item matches the intended staged article for a post launch.

### 3. Production

Required evidence:

- `https://davidmieloch.com/` returns 2xx/3xx.
- `/blog`, `/rss.xml`, `/sitemap.xml`, and changed route return 2xx/3xx.
- Production RSS latest item matches the intended production article for a post launch.
- Final status explicitly says `production verified`.

## Standard Release Status Command

Run before claiming site/content release state:

```bash
pnpm release:status
```

For a specific post or route:

```bash
pnpm content:pipeline site:release-status --live --slug=factory-amplification-and-modular-primitives
pnpm content:pipeline site:release-status --live --route=/blog/factory-amplification-and-modular-primitives
```

The command is read-only. It reports:

- Current branch dirty state
- Branch distance from `main`
- Latest local canonical article
- Draft previews not promoted into canonical articles
- Latest staging RSS item
- Latest production RSS item
- Staging/production route checks
- Blockers, warnings, next actions

## Completion Language

Use precise release labels:

- `local only`: code/content exists locally; not staged.
- `staging verified`: staging URL route checks prove the change is visible.
- `production verified`: production URL, route checks, RSS/sitemap prove the change is live.

Do not say `deployed`, `launched`, `live`, or `done` unless the matching surface has been verified.

## Stuck Branch Rule

If `pnpm release:status` reports the current branch ahead of `main`, next action is promotion, not more local polishing, unless there is a real blocker.

Stuck branch states must be reported as:

```text
branch ahead main -> staging status -> production status -> next promotion action
```

## Safe Defaults

- `release:status` never deploys or publishes.
- `site:release-ladder` is dry-run by default and requires `--execute` for push/deploy/restart.
- `content:launch-gate` never generates paid audio, runs paid transcription, publishes, or deploys.
- Public social posting remains governed by the content distribution approval seam.
- DNS or host cutover remains governed by `docs/ops/site-cutover.md`.
- If staging and production disagree, report disagreement instead of collapsing it into generic success.
