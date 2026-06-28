# Content Release Workflow

## Purpose

Stop article launches from drifting across article markdown, homepage teasers, audio, RSS, sitemap, social packages, schedules, and deployment.

```text
canonical article -> launch assets/audio/transcript -> homepage teaser eligibility -> local RSS/sitemap expectations -> social package checklist -> scheduled posting checklist -> site release ladder
```

## Commands

Dry-run the workflow:

```bash
pnpm content:release-workflow --slug=<article-slug>
```

Prepare local posting artifacts:

```bash
pnpm content:release-workflow --slug=<article-slug> --write
```

`--write` may regenerate `content/distribution/social-packages/<slug>/` and `content/distribution/social-calendar.json`. Commit those changes before release.

The workflow receipt defaults outside the repo under the user cache directory. Use `--receipt=<path>` when a receipt should be written into a specific review artifact location.

Execute release handoff:

```bash
pnpm content:release-workflow --slug=<article-slug> --execute
```

`--execute` verifies the committed content state, then calls:

```bash
pnpm site:release-ladder --slug=<article-slug> --execute --receipt=<cache-path>
```

In execute mode, both the content workflow receipt and the release-ladder receipt use cache-backed defaults so execution does not leave a clean committed release dirty. Override them with `--receipt=<path>` and `--release-ladder-receipt=<path>` when receipts should be written somewhere specific.

## Safety

- Dry-run is default.
- Social posting is never performed by this workflow.
- Public publishing remains approval-gated in generated social packages and calendar entries.
- If `--write` changes files, do not deploy until artifacts are reviewed and committed.
- `--execute` is for clean committed releases only.

## Checks

The workflow verifies:

- `content/articles/<slug>/index.md` exists and is `published`.
- Required metadata exists: `title`, `description`, `publishedAt`, `canonicalUrl`.
- `launch:assets` passes, including audio, transcript, manifest, generated track, and cover image.
- The article is eligible for the homepage teaser shelf: published, has a cover image, and appears in the first 10 visual articles.
- RSS/sitemap/article/audio route expectations are known before live release.
- Social package manifest paths point at the current repo, not an old worktree.
- Social calendar entries exist and remain `do-not-post` with explicit approval required.
- Release deployment goes through `site:release-ladder`.
