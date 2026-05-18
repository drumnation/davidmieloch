# AI Architect Site Rebrand Design

## Purpose

Reposition davidmieloch.com from a 2025 portfolio about AI-assisted work into a 2026 editorial and proof-of-work site for David Mieloch as an AI Architect building software factories.

The current site is valuable, but it preserves an older thesis:

- March 2025: learn to talk to AI so humans can do work faster.
- Late 2025: that framing became insufficient.
- January 2026: the public brand shifted toward AI Architect.
- March 2026: the working thesis became software factories.
- May 2026: the site needs to show that agentic work is now compounding into self-improvement loops.

The rebrand should make the old material legible as historical context while moving the primary visitor path toward the current thesis: designing, operating, and writing from inside a dark software factory.

## Positioning

Primary identity:

> David Mieloch is an AI Architect building software factories.

Editorial metaphor:

> The dark chocolate software factory: a place where agents, tools, prompts, code, governance, observability, and taste turn raw ideas into shipped systems.

Tone:

- Precise, direct, and technical.
- Slightly strange, cinematic, and memorable.
- Avoid generic AI-consultant language.
- Treat older AI-transformation content as dated field notes, not current doctrine.

## Current Site Problems

### Navigation

The header still promotes:

- `AI Transformation`
- `React Best Practices`
- `Biography`
- `Code`
- `Let's Connect`
- `Experience`

This makes the site feel like a 2025 job-seeking portfolio. The blog is not in the primary nav, even though it is now the canonical content surface.

### Home Page

The home page still centers the "Full-Stack Business Person" model. That was useful as a bridge concept, but it does not express the current factory-building thesis.

### Old Framework Pages

The AI Transformation and React Best Practices pages are not useless. They should be reframed as dated artifacts or earlier playbooks. They should not read as the current front door.

### Blog Landing

The blog route works technically, but it is visually plain. It has no hero asset, no editorial system, no current/legacy grouping, and no strong connection to the rest of the site.

## Information Architecture

Primary nav should move toward:

- `Factory Floor` -> `/`
- `Writing` -> `/blog`
- `Systems` -> `/code-examples`
- `Archive` -> a section or route that contains older AI Transformation and React Best Practices material
- `About` -> `/bio`
- `Contact` -> `/contact`

The exact labels can be tuned during implementation, but the hierarchy should make the current thesis obvious.

## Content Taxonomy

Every major page or article should be classed into one of these eras:

- `current`: expresses the software factory / AI Architect thesis.
- `transitional`: useful bridge material, but not the current thesis.
- `legacy`: historically relevant, but no longer the main argument.

Every old high-value page should get a small dated-context banner:

> Historical note: this page reflects my March 2025 framing. My current work has moved from AI-assisted execution toward designing and operating software factories.

The banner should link to `/blog` and the current factory thesis once that article exists.

## Blog Landing Design Direction

The blog landing should become the first polished expression of the new brand.

Required first viewport:

- Strong editorial heading around software factories.
- A visual hero asset: dark factory, chocolate computer chips, warm amber machinery, agentic assembly line, or related visual language.
- Featured current article card with cover image.
- A short timeline or "era" strip that explains the shift from prompt work to factory work.
- Clear route into the canonical article.

The page should not become a generic card grid. It should feel like an editorial control room or factory floor.

## Visual System

Core motifs:

- Dark chocolate factory.
- Chocolate computer chips.
- Conveyor belts, vats, molds, inspection stations.
- Warm amber and electric blue signal colors.
- Factory diagrams, proof chains, and operating consoles.
- AI art and video assets that feel inspectable, not stock-like.

Do not use the metaphor so heavily that the site becomes novelty. The metaphor should carry memory and atmosphere; the interface still needs to feel serious, technical, and readable.

## Implementation Boundaries

This rebrand should be executed in staged PRs:

1. Governance and planning.
2. Blog landing redesign.
3. Content taxonomy and legacy banners.
4. Home/nav repositioning.
5. Asset generation and refinement.
6. Production cutover once staging passes browser, e2e, and PIE-CI checks.

## Testing Requirements

Required checks:

- `pnpm type-check`
- `pnpm build`
- `pnpm test:e2e:loader`
- Blog landing e2e for desktop and mobile:
  - no persistent loader overlay
  - hero image visible
  - featured article visible
  - article navigation works
  - no horizontal overflow
- Manual screenshot review in the in-app browser.

## Governance Requirements

Use Forgejo as the durable source of record:

- One milestone for the rebrand.
- One issue per implementation phase.
- Planning docs committed to the branch.
- Every issue links to the relevant planning docs.
- Every implementation commit pushed to Forgejo.

## Success Criteria

The project is successful when:

- A visitor immediately sees David as an AI Architect building software factories.
- The blog is a central, attractive, SEO-indexable content hub.
- Older 2025 pages are framed as historical context.
- The site has a distinctive visual language that can scale into AI art/video.
- The staging URL and internal Caddy hostname both pass e2e and visual QA.
