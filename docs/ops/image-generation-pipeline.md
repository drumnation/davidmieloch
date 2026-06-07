# Article Image Generation Pipeline

Generated: 2026-06-05

## Purpose

Generate article hero and inline images cheaply, keep every prompt and receipt
beside the article, and make David's approval the only path from variant to
public asset.

The immediate Factory Primitives need is **not** new hero art. Each of the five
upcoming articles already has a hero. The missing layer is article-body art:
five interesting, style-matched interior images per article, with enough
variants to choose between before anything is inserted into the article.

## Provider Decision

Default bulk provider: Z.ai.

Reason: Z.ai's image pricing is low enough for backlog iteration, and the
models support the aspect ratios needed for article heroes, cards, and social
previews.

Premium comparison provider: OpenRouter.

Reason: OpenRouter is useful when a specific model is better for text rendering,
editing, or a flagship hero. It should not be the default backlog generator
unless its per-image cost is explicitly approved for that batch.

Secondary bulk provider: MiniMax.

Reason: the current MiniMax Plus account includes the M3 text model plus image,
speech, and music generation in the same quota, with a large monthly token
allowance. Twenty CRM already uses the MiniMax key for Ask AI, and that same
provider account should be evaluated for image generation so routine article
and brand image batches do not keep defaulting to paid Z.ai usage when MiniMax
quota is already available.

Do not store the MiniMax API key in this repo. Keep it in environment/secret
storage only. MiniMax is now wired through the same durable image-generation
spine as Z.ai, with one receipt/checksum per generated placement variant.

## Deterministic Spine

Per article:

- `content/articles/<slug>/image-brief.md`
- `content/articles/<slug>/images/interior-plan.json`
- `content/articles/<slug>/images/generated/manifest.json`
- `public/blog/<slug>/images/generated/<placement-id>/<variant-id>.png`
- approved public assets under `public/blog/<slug>/images/`

Batch-level review:

- `content/distribution/factory-primitives-interior-image-plan.json`

## Workflow

1. Generate an image brief from the canonical article sections.
2. For the Factory Primitives batch, plan 5 interior placements per article.
3. Produce at least 2 cheap variants per placement: 25 kept targets, 50 candidate images.
4. Store each variant with prompt, provider, model, cost estimate, and checksum.
5. Show variants in the private draft lab beside the article.
6. Approve one variant per placement, reject the rest, and request regeneration where the metaphor misses.
7. Copy approved interior assets into the public article image directory.
8. Insert approved images into the article body after their target headings.

## Approval States

- `draft-brief`
- `variants-generated`
- `hero-approved`
- `inline-approved`
- `rejected`
- `needs-regeneration`

## Budget Guard

Default hero cap: 4 variants per article per batch.

Default interior cap for Factory Primitives: 10 variants per article per batch
because the target is 5 approved body images per article.

Public release requires:

- approved hero image
- approved interior images for scheduled Factory Primitives articles
- public asset path
- image checksum
- generation receipt
- David approval receipt

## Implemented CLI

Implemented:

- `pnpm content:pipeline image:interior-plan --write --count=5 --variants=2`
- `pnpm content:pipeline image:generate <slug> --dry-run --limit=10`
- `ZAI_API_KEY=<secret> pnpm content:pipeline image:generate <slug> --limit=10 --spend-approved`
- `MINIMAX_API_KEY=<secret> pnpm content:pipeline image:generate <slug> --provider=minimax --model=image-01 --size=16:9 --limit=10 --spend-approved`

Still needed:

- `pnpm content:pipeline image:approve <slug> <variant-id> --role=hero`
- `pnpm content:pipeline image:publish-assets <slug>`

`image:generate` refuses to spend money unless `--spend-approved` is present.
It also refuses non-dry-run generation when `ZAI_API_KEY` is missing.

## Current First Article State

The first Factory Primitives article has:

- 10 generated full-frame interior variants in `content/articles/the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter/images/generated/manifest.json`
- one generated visual-direction contact sheet at `public/blog/the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter/images/generated/contact-sheet/interior-contact-sheet.png`

The contact sheet is only a review artifact. It does not satisfy launch lint
until individual images are generated or sliced, approved, and inserted after
their target headings.
