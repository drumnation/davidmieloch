# AI Architect Site Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition davidmieloch.com around David Mieloch as an AI Architect building dark software factories, beginning with the blog landing and then extending through navigation, legacy content framing, home page messaging, and visual assets.

**Architecture:** Keep content metadata in `src/content`, keep route-level pages in `app`, and extract reusable brand/content display pieces into focused files rather than growing the current inline blog page. The work is staged so the blog can improve first without forcing a whole-site rewrite in one change.

**Tech Stack:** Next.js App Router, React, TypeScript, inline route metadata, existing content markdown loader, Puppeteer e2e script, Caddy-hosted staging on singularity-one.

---

## File Structure

- Modify `src/content/articles.ts`: add article metadata needed by the blog landing, including `era`, `featured`, and `heroImage`.
- Modify `src/content/articles.test.ts`: cover sorting, current/legacy grouping, and required blog metadata.
- Modify `content/articles/*/index.md`: add `era`, `featured`, and refined cover/hero metadata.
- Create `src/content/sitePositioning.ts`: single source for current brand copy, old-era labels, and dated-context banner copy.
- Create `app/blog/BlogIndex.tsx`: presentational blog landing component.
- Create `app/blog/blogIndexStyles.ts`: blog landing style constants.
- Modify `app/blog/page.tsx`: route wrapper that loads articles and renders `BlogIndex`.
- Modify `app/blog/[slug]/page.tsx`: add dated-context banner for legacy/transitional articles.
- Create `src/shared-components/molecules/ContentEraBanner/ContentEraBanner.tsx`: reusable historical-context banner.
- Modify `src/shared-components/organisms/Header/Header.logic.ts`: update nav labels and add blog link.
- Modify `src/shared-components/pages/Home/Home.tsx`: replace the old Full-Stack Business Person lead with the AI Architect / software factory thesis.
- Modify `scripts/e2e-loader-check.mjs`: extend blog e2e to assert hero image and featured article visibility.
- Create `docs/ops/site-rebrand-governance.md`: operating notes for staging, internal Caddy, Forgejo issues, and cutover.

## Task 1: Content Metadata Contract

**Files:**
- Modify: `src/content/articles.ts`
- Modify: `src/content/articles.test.ts`
- Modify: `content/articles/your-ai-isnt-hallucinating-its-lying/index.md`

- [ ] **Step 1: Write failing metadata tests**

Add tests in `src/content/articles.test.ts` that assert:

```ts
expect(article.era).toBe('current');
expect(article.featured).toBe(true);
expect(article.heroImage).toContain('/blog/your-ai-isnt-hallucinating-its-lying/images/');
```

Also assert every published article has an era:

```ts
for (const article of getPublishedArticles()) {
  expect(['current', 'transitional', 'legacy']).toContain(article.era);
}
```

- [ ] **Step 2: Run test to verify failure**

Run:

```bash
rtk pnpm exec vitest src/content/articles.test.ts --run
```

Expected: FAIL because `era`, `featured`, and `heroImage` are not implemented.

- [ ] **Step 3: Extend the article type and parser**

Add fields to `Article`:

```ts
era: 'current' | 'transitional' | 'legacy';
featured: boolean;
heroImage?: string;
```

Add parser helpers:

```ts
function parseEra(frontmatter: Frontmatter, slug: string): Article['era'] {
  const era = requiredString(frontmatter, 'era', slug);
  if (era === 'current' || era === 'transitional' || era === 'legacy') {
    return era;
  }
  throw new Error(`Article "${slug}" has unsupported era "${era}".`);
}

function optionalBoolean(frontmatter: Frontmatter, key: string): boolean {
  return optionalString(frontmatter, key) === 'true';
}
```

Return the new fields from `readArticle`.

- [ ] **Step 4: Update canonical article frontmatter**

Add to `content/articles/your-ai-isnt-hallucinating-its-lying/index.md`:

```yaml
era: current
featured: true
heroImage: /blog/your-ai-isnt-hallucinating-its-lying/images/ai-lies-hero.png
```

- [ ] **Step 5: Run test to verify pass**

Run:

```bash
rtk pnpm exec vitest src/content/articles.test.ts --run
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
rtk git add src/content/articles.ts src/content/articles.test.ts content/articles/your-ai-isnt-hallucinating-its-lying/index.md
rtk git commit -m "Add article era metadata"
```

## Task 2: Site Positioning Source

**Files:**
- Create: `src/content/sitePositioning.ts`

- [ ] **Step 1: Create positioning constants**

Create:

```ts
export const currentPositioning = {
  title: 'AI Architect for Software Factories',
  shortThesis: 'I design agentic systems that turn ideas, code, prompts, tools, tests, and governance into operating software factories.',
  factoryMetaphor: 'Dark chocolate software factory',
  legacyNote: 'This page reflects an earlier framing. My current work has moved from AI-assisted execution toward designing and operating software factories.',
} as const;

export const contentEraLabels = {
  current: 'Current thesis',
  transitional: 'Bridge material',
  legacy: 'Historical note',
} as const;
```

- [ ] **Step 2: Run type-check**

Run:

```bash
rtk pnpm type-check
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
rtk git add src/content/sitePositioning.ts
rtk git commit -m "Add site positioning copy source"
```

## Task 3: Blog Landing Redesign

**Files:**
- Create: `app/blog/BlogIndex.tsx`
- Create: `app/blog/blogIndexStyles.ts`
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Write e2e expectation before implementation**

Extend `scripts/e2e-loader-check.mjs` to assert the blog page contains:

```js
hasVisibleText('AI Architect for Software Factories')
hasVisibleText('Dark chocolate software factory')
```

Expected failure before implementing the new blog landing.

- [ ] **Step 2: Run e2e to verify failure**

Run:

```bash
E2E_BASE_URL=https://davidmieloch.brain-garden.io E2E_SCREENSHOT_DIR=/tmp/davidmieloch-rebrand-e2e rtk pnpm test:e2e:loader
```

Expected: FAIL because the new copy is absent.

- [ ] **Step 3: Extract `BlogIndex`**

Create `app/blog/BlogIndex.tsx` with props:

```ts
import type { Article } from '../../src/content/articles';

type BlogIndexProps = {
  articles: Article[];
};

export function BlogIndex({ articles }: BlogIndexProps) {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const remaining = articles.filter((article) => article.slug !== featured?.slug);
  // Render hero, featured article, era timeline, and remaining article list.
}
```

- [ ] **Step 4: Implement hero with image**

The first viewport must include:

- H1: `AI Architect for Software Factories`
- Supporting copy from `currentPositioning.shortThesis`
- A hero image using the featured article hero image
- Featured article title and link
- Era strip: `2025 Prompt Work`, `2026 Software Factories`, `Now Self-Improving Systems`

- [ ] **Step 5: Keep route wrapper small**

Replace the inline body of `app/blog/page.tsx` with:

```tsx
export default function BlogPage() {
  return <BlogIndex articles={getPublishedArticles()} />;
}
```

- [ ] **Step 6: Verify locally**

Run:

```bash
rtk pnpm type-check
NEXT_TELEMETRY_DISABLED=1 OPENAI_API_KEY= rtk pnpm build
E2E_BASE_URL=http://127.0.0.1:3001 rtk pnpm test:e2e:loader
```

Expected: type-check/build/e2e PASS once local server is running.

- [ ] **Step 7: Commit**

```bash
rtk git add app/blog/page.tsx app/blog/BlogIndex.tsx app/blog/blogIndexStyles.ts scripts/e2e-loader-check.mjs
rtk git commit -m "Redesign blog landing for software factory positioning"
```

## Task 4: Legacy Context Banners

**Files:**
- Create: `src/shared-components/molecules/ContentEraBanner/ContentEraBanner.tsx`
- Create: `src/shared-components/molecules/ContentEraBanner/index.ts`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: legacy route pages for AI Transformation and React Best Practices.

- [ ] **Step 1: Add banner component**

Create a component that accepts:

```ts
type ContentEraBannerProps = {
  era: 'current' | 'transitional' | 'legacy';
  note?: string;
};
```

It should render nothing for `current`, and render a concise dated-context note for `transitional` and `legacy`.

- [ ] **Step 2: Add article banner**

In `app/blog/[slug]/page.tsx`, render `ContentEraBanner` above article body using `article.era`.

- [ ] **Step 3: Add banners to old framework pages**

Add the banner near the top of:

- `app/enterprise-ai-development-framework/page.tsx`
- `app/fullstack-react-best-practices-integration/page.tsx`

Use `era="legacy"` for AI Transformation and `era="transitional"` for React Best Practices.

- [ ] **Step 4: Verify**

Run:

```bash
rtk pnpm type-check
NEXT_TELEMETRY_DISABLED=1 OPENAI_API_KEY= rtk pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
rtk git add src/shared-components/molecules/ContentEraBanner app/blog/[slug]/page.tsx app/enterprise-ai-development-framework/page.tsx app/fullstack-react-best-practices-integration/page.tsx
rtk git commit -m "Frame legacy pages as historical context"
```

## Task 5: Navigation and Home Repositioning

**Files:**
- Modify: `src/shared-components/organisms/Header/Header.logic.ts`
- Modify: `src/shared-components/pages/Home/Home.tsx`
- Modify: `src/shared-components/pages/Home/Home.constants.ts`

- [ ] **Step 1: Update nav labels**

Change primary nav toward:

```ts
[
  { label: 'Factory Floor', href: '/', ... },
  { label: 'Writing', href: '/blog', ... },
  { label: 'Systems', href: '/code-examples', ... },
  { label: 'Archive', href: '/enterprise-ai-development-framework', ... },
  { label: 'About', href: '/bio', ... },
]
```

Keep `Experience` if needed as a secondary CTA until the larger portfolio surface is redesigned.

- [ ] **Step 2: Replace old home thesis**

Replace the leading "Full-Stack Business Person" section with current positioning:

```tsx
<SectionHeading title="AI Architect for Software Factories" />
<SectionBodyText>
  I design agentic systems that turn ideas, code, prompts, tools, tests, governance, and taste into operating software factories.
</SectionBodyText>
```

- [ ] **Step 3: Link home to blog**

Add a clear CTA to `/blog` with copy:

```text
Read the factory notes
```

- [ ] **Step 4: Verify**

Run:

```bash
rtk pnpm type-check
NEXT_TELEMETRY_DISABLED=1 OPENAI_API_KEY= rtk pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
rtk git add src/shared-components/organisms/Header/Header.logic.ts src/shared-components/pages/Home/Home.tsx src/shared-components/pages/Home/Home.constants.ts
rtk git commit -m "Reposition navigation and home around software factories"
```

## Task 6: Visual Asset Pass

**Files:**
- Create: `public/brand/dark-factory/`
- Create or modify article and blog image references in `content/articles/*/index.md`

- [ ] **Step 1: Generate concept assets**

Create or commission these assets:

- `public/brand/dark-factory/blog-hero.png`
- `public/brand/dark-factory/chocolate-chip-conveyor.png`
- `public/brand/dark-factory/factory-floor-wide.png`

Visual direction:

- dark chocolate software factory
- chocolate computer chips
- amber factory lighting
- electric blue control signals
- readable, serious editorial style

- [ ] **Step 2: Wire images into blog landing**

Use `blog-hero.png` as a default hero image if an article has no `heroImage`.

- [ ] **Step 3: Verify image loading**

Run:

```bash
E2E_BASE_URL=https://davidmieloch.brain-garden.io E2E_SCREENSHOT_DIR=/tmp/davidmieloch-rebrand-e2e rtk pnpm test:e2e:loader
```

Expected: PASS with no broken first-viewport images.

- [ ] **Step 4: Commit**

```bash
rtk git add public/brand/dark-factory content/articles app/blog
rtk git commit -m "Add dark factory visual assets"
```

## Task 7: Staging, Observability, and Governance

**Files:**
- Create: `docs/ops/site-rebrand-governance.md`
- Modify: `scripts/e2e-loader-check.mjs` if additional checks are needed.

- [ ] **Step 1: Document staging endpoints**

Create `docs/ops/site-rebrand-governance.md` with:

```md
# Site Rebrand Governance

## Staging

- Internal URL: https://davidmieloch.brain-garden.io
- Direct service URL: http://100.71.79.54:3311
- Service: davidmieloch-staging.service
- Host: singularity-one / dawn

## Required Checks

- pnpm type-check
- pnpm build
- pnpm test:e2e:loader
- content:pipeline validate
- screenshot pass in the in-app browser
```

- [ ] **Step 2: Run remote staging checks**

Run:

```bash
rtk fleet run dawn 'bash -lc "cd /home/dave/platform-repos/davidmieloch-staging && E2E_BASE_URL=https://davidmieloch.brain-garden.io pnpm test:e2e:loader"'
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
rtk git add docs/ops/site-rebrand-governance.md scripts/e2e-loader-check.mjs
rtk git commit -m "Document rebrand governance checks"
```

## Final Verification

Run locally:

```bash
rtk pnpm type-check
NEXT_TELEMETRY_DISABLED=1 OPENAI_API_KEY= rtk pnpm build
E2E_BASE_URL=https://davidmieloch.brain-garden.io E2E_SCREENSHOT_DIR=/tmp/davidmieloch-rebrand-e2e rtk pnpm test:e2e:loader
OBSERVABILITY_HEARTBEAT_PATH=.brain/observability/test-heartbeat.jsonl rtk pnpm content:pipeline validate
```

Expected:

- type-check PASS
- build PASS
- e2e PASS
- content validation PASS

## Forgejo Governance

Create these Forgejo issues under the rebrand milestone:

1. `Rebrand IA: AI Architect / Software Factory positioning`
2. `Blog landing redesign: dark factory editorial surface`
3. `Content taxonomy: current, transitional, legacy`
4. `Legacy banners for 2025 framework pages`
5. `Home and navigation repositioning`
6. `Dark chocolate software factory visual asset pass`
7. `Staging, e2e, and observability hardening`

Each issue should link to:

- `docs/superpowers/specs/2026-05-18-ai-architect-site-rebrand-design.md`
- `docs/superpowers/plans/2026-05-18-ai-architect-site-rebrand.md`

## PIE-CI Gate

Before merge:

- Purpose: each file owns one concern.
- Interface: no broad public APIs or `export *` unless already established.
- Encapsulation: no third-party SDK leakage from content modules.
- Connection: no new runtime dependency unless the visual asset strategy requires it.
- Implementation: no dead copy, no duplicate positioning strings, no untested loader behavior.
