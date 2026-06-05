# Article Image Generation Pipeline

Generated: 2026-06-05

## Purpose

Generate article hero and inline images cheaply, keep every prompt and receipt
beside the article, and make David's approval the only path from variant to
public asset.

## Provider Decision

Default bulk provider: Z.ai.

Reason: Z.ai's image pricing is low enough for backlog iteration, and the
models support the aspect ratios needed for article heroes, cards, and social
previews.

Premium comparison provider: OpenRouter.

Reason: OpenRouter is useful when a specific model is better for text rendering,
editing, or a flagship hero. It should not be the default backlog generator
unless its per-image cost is explicitly approved for that batch.

## Deterministic Spine

Per article:

- `content/articles/<slug>/image-brief.md`
- `content/articles/<slug>/images/variants/<variant-id>.png`
- `content/articles/<slug>/images/image-manifest.json`
- approved public assets under `public/blog/<slug>/images/`

## Workflow

1. Generate an image brief from the canonical article.
2. Produce 3-4 cheap variants in the target aspect ratios.
3. Store each variant with prompt, provider, model, cost estimate, and checksum.
4. Show variants in the private draft lab beside the article.
5. Approve one variant for hero, optional variants for inline use, and reject the rest.
6. Copy approved assets into the public article image directory.
7. Update article frontmatter `coverImage`.

## Approval States

- `draft-brief`
- `variants-generated`
- `hero-approved`
- `inline-approved`
- `rejected`
- `needs-regeneration`

## Budget Guard

Default cap: 4 variants per article per batch.

Public release requires:

- approved hero image
- public asset path
- image checksum
- generation receipt
- David approval receipt

## Next Build Step

Add CLI commands:

- `pnpm content:pipeline image:brief <slug>`
- `pnpm content:pipeline image:generate <slug> --provider=zai --count=4 --spend-approved`
- `pnpm content:pipeline image:approve <slug> <variant-id> --role=hero`
- `pnpm content:pipeline image:publish-assets <slug>`

These commands must refuse to spend money unless `--spend-approved` is present.
