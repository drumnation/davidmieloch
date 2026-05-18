# Content Distribution System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `davidmieloch.com` the canonical indexed home for David's essays, use LinkedIn as the published-state source of truth, and prepare a safe scheduler for cross-platform distribution.

**Architecture:** The website repo owns public canonical Markdown, platform variants, and a machine-readable distribution ledger. API-backed platforms can create/schedule drafts programmatically; browser/editorial platforms are staged as drafts or submissions and require action-time confirmation before public posting. DNS, production deploys, and email routing changes are investigated and documented first, then executed only after explicit approval.

**Tech Stack:** Next.js 15 App Router, TypeScript, Node.js ESM scripts, Markdown frontmatter, React Markdown, DEV REST API, Hashnode GraphQL API, Cloudflare DNS/Email Routing, Vercel deployment inspection, browser-assisted LinkedIn capture.

---

## File Structure

- Create `content/articles/<slug>/index.md`: canonical public article source with frontmatter.
- Create `content/articles/<slug>/images/`: article-local images copied from the vault or existing site content.
- Create `content/articles/<slug>/variants/<platform>.md`: platform-native variants for LinkedIn, Medium, DEV, Hashnode, HackerNoon, DZone, and Substack.
- Create `content/distribution/platform-ledger.json`: one record per article and platform.
- Create `src/content/articles.ts`: typed article loader, parser, slug helpers, date sorting, and status filtering.
- Create `app/blog/page.tsx`: SEO-friendly article index.
- Create `app/blog/[slug]/page.tsx`: canonical article page with metadata and canonical URL.
- Create `app/rss.xml/route.ts`: RSS feed route.
- Create `app/sitemap.ts`: dynamic sitemap including canonical article URLs.
- Modify `app/page.tsx` or `src/shared-components/pages/Home/*`: add latest writing to the home page without turning the site into a landing-page-only archive.
- Modify `src/components/Navbar/*`: add a writing/blog navigation link.
- Modify `scripts/content-pipeline.mjs`: add ledger-aware commands for validation, variant generation, DEV draft creation, Hashnode draft creation, and dry-run scheduling.
- Create `scripts/linkedin-capture.mjs`: authenticated-browser/export capture helper that produces `source-linkedin.md` files without publishing.
- Create `scripts/check-contact-routing.mjs`: non-destructive contact/email verification helper.
- Create `docs/ops/site-cutover.md`: Cloudflare, Vercel, singularity host, rollback, and DNS cutover checklist.
- Create `docs/ops/email-opportunity-routing.md`: email forwarding, agent notification, and opportunity triage design.

---

### Task 1: Inventory and Ledger Baseline

**Files:**
- Create: `content/distribution/platform-ledger.json`
- Modify: `content/distribution/latest-content-priority.md`
- Create: `content/articles/.gitkeep`

- [ ] **Step 1: Read current known content sources**

Run:

```bash
pwd
find ../content -maxdepth 4 -type f \( -name '*.md' -o -name '*.json' \) | sort
find "/Users/dmieloch/Library/Mobile Documents/iCloud~md~obsidian/Documents/brain-vault/blogs" -maxdepth 4 -type f -name '*.md' | sort
```

Expected: the command lists existing Medium imports, platform drafts, local blog notes, and Obsidian drafts.

- [ ] **Step 2: Create the initial ledger**

Create `content/distribution/platform-ledger.json` with at least these records:

```json
{
  "updatedAt": "2026-05-18",
  "sourceOfTruth": {
    "publishedArticles": "linkedin",
    "canonicalArchive": "davidmieloch.com",
    "workingDrafts": "obsidian"
  },
  "articles": {
    "the-golden-hammer": {
      "title": "The Golden Hammer",
      "series": "Golden Hammer",
      "status": "needs-linkedin-capture",
      "canonicalUrl": "",
      "source": { "platform": "linkedin", "url": "", "publishedAt": "2026-04-15" },
      "platforms": {
        "linkedin": { "status": "source", "url": "" },
        "davidmieloch": { "status": "not-published", "url": "" },
        "medium": { "status": "not-started", "url": "" },
        "devto": { "status": "not-started", "url": "" },
        "hashnode": { "status": "not-started", "url": "" },
        "hackernoon": { "status": "not-started", "url": "" },
        "dzone": { "status": "not-started", "url": "" },
        "substack": { "status": "not-started", "url": "" }
      }
    },
    "the-overnight-shift": {
      "title": "The Overnight Shift",
      "series": "AI Factory",
      "status": "needs-linkedin-capture",
      "canonicalUrl": "",
      "source": { "platform": "linkedin", "url": "", "publishedAt": "2026-04-03" },
      "platforms": {
        "linkedin": { "status": "source", "url": "" },
        "davidmieloch": { "status": "not-published", "url": "" },
        "medium": { "status": "not-started", "url": "" },
        "devto": { "status": "not-started", "url": "" },
        "hashnode": { "status": "not-started", "url": "" },
        "hackernoon": { "status": "not-started", "url": "" },
        "dzone": { "status": "not-started", "url": "" },
        "substack": { "status": "not-started", "url": "" }
      }
    }
  }
}
```

Expected: JSON parses and preserves the LinkedIn-first published-state model.

- [ ] **Step 3: Update latest priority notes**

Modify `content/distribution/latest-content-priority.md` so the immediate sequence is:

```markdown
1. Capture LinkedIn article URLs and bodies from the authenticated browser.
2. Publish canonical copies on `davidmieloch.com`.
3. Use canonical URLs for all external platform variants.
4. Create API-backed drafts only after canonical pages build locally.
5. Hold public posting, DNS, and email routing changes for confirmation.
```

Expected: the note no longer implies Medium or the old site content is canonical.

---

### Task 2: Canonical Blog Foundation

**Files:**
- Create: `src/content/articles.ts`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/rss.xml/route.ts`
- Create: `app/sitemap.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Add article loader**

Create `src/content/articles.ts` with a synchronous filesystem loader that reads `../content/articles/*/index.md`, parses YAML frontmatter, and returns sorted article metadata plus body text.

Expected public type:

```ts
export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  status: 'published' | 'draft' | 'archived';
  canonicalUrl: string;
  sourcePlatform?: string;
  sourceUrl?: string;
  series?: string;
  tags: string[];
  coverImage?: string;
  body: string;
};
```

- [ ] **Step 2: Add a blog index route**

Create `app/blog/page.tsx` that imports `getPublishedArticles()` and renders a dense writing index with title, date, description, series, and tags. Keep the UI quiet and article-focused.

Expected: `/blog` renders without client-side data fetching.

- [ ] **Step 3: Add canonical article route**

Create `app/blog/[slug]/page.tsx` with:

```ts
export async function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}
```

and `generateMetadata()` that sets `title`, `description`, Open Graph article data, and `alternates.canonical`.

Expected: each article page has a canonical URL on `https://davidmieloch.com/blog/<slug>`.

- [ ] **Step 4: Add RSS**

Create `app/rss.xml/route.ts` that serializes published articles into RSS XML with title, description, link, guid, and pubDate.

Expected: `/rss.xml` returns `Content-Type: application/xml`.

- [ ] **Step 5: Add sitemap**

Create `app/sitemap.ts` that includes static site routes and published article routes.

Expected: `next build` emits a sitemap route that includes `/blog` and article URLs.

---

### Task 3: First Canonical Article Imports

**Files:**
- Create: `content/articles/your-ai-isnt-hallucinating-its-lying/index.md`
- Create: `content/articles/the-golden-hammer/index.md`
- Create: `content/articles/the-overnight-shift/index.md`
- Modify: `content/distribution/platform-ledger.json`

- [ ] **Step 1: Import the local draft for "Your AI Isn't Hallucinating. It's Lying."**

Use `/Users/dmieloch/Library/Mobile Documents/iCloud~md~obsidian/Documents/brain-vault/blogs/agents-dont-hallucinate-they-lie.md` as the initial canonical body, preserving headings and image references.

Expected frontmatter:

```yaml
---
title: "Your AI Isn't Hallucinating. It's Lying."
description: "The word hallucination is doing more harm than the models are."
publishedAt: "2026-03-20"
status: "published"
sourcePlatform: "linkedin"
sourceUrl: ""
canonicalUrl: "https://davidmieloch.com/blog/your-ai-isnt-hallucinating-its-lying"
series: "The Observer Series"
tags: ["ai", "llm", "agents", "oversight-engineering"]
coverImage: "/blog/your-ai-isnt-hallucinating-its-lying/images/ai-lies-hero.png"
---
```

- [ ] **Step 2: Stage placeholder canonical shells for LinkedIn captures**

Create shells for `the-golden-hammer` and `the-overnight-shift` with `status: "draft"` and a body note:

```markdown
LinkedIn source capture pending. Do not publish until the authenticated article body and URL are captured.
```

Expected: they do not appear in `getPublishedArticles()`.

- [ ] **Step 3: Update the ledger**

Mark `your-ai-isnt-hallucinating-its-lying.platforms.davidmieloch.status` as `ready-local` and keep LinkedIn source URL blank until captured.

Expected: no external platform is marked published unless the URL exists.

---

### Task 4: Programmatic Distribution Pipeline

**Files:**
- Modify: `scripts/content-pipeline.mjs`
- Create: `scripts/content-pipeline.env.example`
- Create: `content/articles/your-ai-isnt-hallucinating-its-lying/variants/devto.md`
- Create: `content/articles/your-ai-isnt-hallucinating-its-lying/variants/hashnode.md`
- Create: `content/articles/your-ai-isnt-hallucinating-its-lying/variants/linkedin.md`
- Create: `content/articles/your-ai-isnt-hallucinating-its-lying/variants/medium.md`
- Create: `content/articles/your-ai-isnt-hallucinating-its-lying/variants/substack.md`

- [ ] **Step 1: Add ledger validation**

Add a `validate` command:

```bash
pnpm content:pipeline validate
```

Expected: verifies every article has a ledger record, canonical URL, source status, and no platform duplicate with both `draft` and `published`.

- [ ] **Step 2: Add dry-run schedule command**

Add:

```bash
pnpm content:pipeline schedule:dry-run your-ai-isnt-hallucinating-its-lying
```

Expected: prints the platforms, action type, URL target, and whether each action is API-backed or browser/editorial.

- [ ] **Step 3: Add DEV draft creation**

Implement `devto:create-draft <slug>` using the official DEV API, `published: false`, tags from variant frontmatter, and `canonical_url` from the canonical article.

Expected: when `DEVTO_API_KEY` is absent, the command fails before making a network call with a clear missing-env message.

- [ ] **Step 4: Add Hashnode draft creation**

Implement `hashnode:create-draft <slug>` using `HASHNODE_TOKEN`, `HASHNODE_PUBLICATION_ID`, and the official GraphQL `createDraft` mutation.

Expected: when credentials are absent, the command fails before making a network call with a clear missing-env message.

- [ ] **Step 5: Keep browser/editorial platforms staged**

For Medium, LinkedIn, HackerNoon, DZone, and Substack, generate clipboard-ready files and instructions but do not submit or publish.

Expected: the dry run says `requires-browser-confirmation` for these platforms.

---

### Task 5: LinkedIn Capture Helper

**Files:**
- Create: `scripts/linkedin-capture.mjs`
- Modify: `content/distribution/latest-content-priority.md`

- [ ] **Step 1: Add capture command shape**

Create:

```bash
pnpm content:pipeline linkedin:capture-list
```

Expected: the command prints the LinkedIn activity URL and explains that authenticated browser capture is required if API cookies are unavailable.

- [ ] **Step 2: Add source file convention**

The helper writes captured article bodies to:

```text
content/articles/<slug>/source-linkedin.md
```

Expected: the source file includes title, LinkedIn URL, publication date, and exact body capture.

- [ ] **Step 3: Prevent accidental overwrite**

If `source-linkedin.md` already exists, require `--force`.

Expected: reruns do not destroy source captures.

---

### Task 6: Deployment, DNS, and Email Routing Investigation

**Files:**
- Create: `docs/ops/site-cutover.md`
- Create: `docs/ops/email-opportunity-routing.md`
- Create: `scripts/check-contact-routing.mjs`

- [ ] **Step 1: Inspect current deployment config**

Run:

```bash
git status --short
find . -maxdepth 3 -name 'vercel.json' -o -name 'wrangler.toml' -o -name 'package.json'
```

Expected: deployment files are listed without changing production.

- [ ] **Step 2: Document the Cloudflare cutover**

Create `docs/ops/site-cutover.md` with current state, desired state, DNS records to inspect, rollback steps, and confirmation gates.

Expected: the doc explicitly says no DNS mutation occurs without confirmation.

- [ ] **Step 3: Document email opportunity routing**

Create `docs/ops/email-opportunity-routing.md` with:

```text
Inbound opportunity email -> primary Gmail forward -> opportunity triage alias/list -> agent notification channel -> Dave thread
```

Expected: the doc separates Cloudflare Email Routing forwarding from app-level contact form notifications.

- [ ] **Step 4: Add non-destructive contact check script**

Create `scripts/check-contact-routing.mjs` that checks required env vars and can send a marked test email only when invoked with `--send`.

Expected: default run is read-only.

---

### Task 7: Verification

**Files:**
- Test: app build and scripts

- [ ] **Step 1: Run validation**

Run:

```bash
pnpm content:pipeline validate
```

Expected: no duplicate platform entries; draft shells do not block the build.

- [ ] **Step 2: Run type check**

Run:

```bash
pnpm type-check
```

Expected: no TypeScript errors from the blog routes or content loader.

- [ ] **Step 3: Run build**

Run:

```bash
pnpm build
```

Expected: `/blog`, `/blog/your-ai-isnt-hallucinating-its-lying`, `/rss.xml`, and `/sitemap.xml` are generated.

- [ ] **Step 4: Start local server**

Run:

```bash
pnpm dev
```

Expected: local site is available at `http://localhost:3001`.

- [ ] **Step 5: Browser verify**

Open `/blog`, the first article page, `/rss.xml`, and `/sitemap.xml`.

Expected: article text renders, canonical metadata exists, feed XML renders, and the sitemap includes article URLs.

---

## Self-Review

**Spec coverage:** The plan covers LinkedIn as published source of truth, canonical website blog pages, platform variants, API-backed drafts, browser/editorial staging, Cloudflare/Vercel cutover investigation, and email/opportunity routing.

**Placeholder scan:** There are no `TBD` or `TODO` instructions. External credentials and production changes are intentionally confirmation-gated.

**Type consistency:** Article fields, ledger keys, and command names are consistent across tasks.
