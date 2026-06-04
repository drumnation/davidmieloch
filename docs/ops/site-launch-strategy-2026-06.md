# davidmieloch.com Factory-Era Launch Strategy

Generated: 2026-06-04

## Current State

- The website has 20 imported local articles under `content/articles`.
- The homepage has been reoriented around the current brand: David Mieloch as AI Architect building software factories.
- The homepage now uses a static Dark Software Factory poster image where the later video/commercial can go.
- The top nav now routes visitors toward `Factory` and `Writing` instead of old AI Transformation / React Best Practices pages.
- The homepage no longer auto-loads the old persistent audio player on `/`, so the launch hero is not occluded.
- The production build passes locally.
- Visual smoke artifacts are in `docs/ops/visuals/factory-home-desktop-final.png` and `docs/ops/visuals/factory-home-mobile-final.png`.

## Launch Thesis

The first public wave should say:

> I am no longer selling prompt literacy or AI transformation consulting. I am building and governing software factories.

The site should make the archive feel like proof, not a pile of posts. The homepage should route people into the factory thesis, then into the canon, then into the June series that explains the consequences of the factory model.

## Site Structure

Primary routes:

- `/` - Factory-era front door.
- `/blog/the-factory` - canonical thesis and primary CTA target.
- `/blog` - complete article archive.
- `/rebrand-lab` - internal review surface for brand/video direction, not primary public navigation.
- legacy routes remain reachable but are no longer top-level positioning.

Recommended next route work:

- Add a `Series` or `Start Here` section to `/blog`.
- Feature series tracks: The Factory, The Foreman, Governance/Observers, Legacy Tools.
- Give article cards larger image treatment so the imported visuals pull readers into the archive.
- Add mailing list capture after the hero and at the end of article pages.

## June Series Review

### 1. The Filter

Status: launch-candidate.

Purpose: explains the AI cost normalization moment as the dividing line between prompt users and factory builders.

Why it matters: this is the strongest bridge from current market anxiety into the factory thesis.

Needs:

- Hero image: cost meter / industrial filter / factory economics.
- Canonical website import.
- Distribution package after canonical URL is live.

### 2. The Meter

Status: launch-candidate.

Purpose: frames AI billing opacity as a governance problem.

Why it matters: connects directly to Brain Garden observability and the deterministic spine.

Needs:

- Hero image: unreadable AI billing console, glowing meter, agent call graph.
- Add one practical checklist callout for teams.
- Canonical website import.

### 3. The Noticers

Status: launch-candidate.

Purpose: argues that the most valuable AI-era human skill is detecting subtle failure in factory output.

Why it matters: gives executives and engineers a human role in the factory that is not nostalgia.

Needs:

- Hero image: observer station overlooking many agent outputs.
- Possibly connect to the existing `Reality Needs Observers` article.
- Canonical website import.

### 4. The Credibility Problem

Status: launch-candidate with edit pass.

Purpose: argues that AI corporate persuasion fails when the medium removes accountable human ethos.

Why it matters: widens the brand beyond software delivery into AI-mediated human trust.

Needs:

- Tighten the ending around what companies should do instead.
- Hero image: synthetic corporate avatar vs accountable human speaker.
- Canonical website import.

### 5. The Crew

Status: seed, hold.

Purpose: names the three-human factory-operator model and the temporary nature of foreman roles.

Why it matters: this can become the capstone for the June wave.

Needs:

- Expand beyond seed notes.
- Replace references that are too inside-baseball unless they serve the public story.
- Decide whether it is a standalone article or the conclusion of a series.

## Launch Sequence

1. Ship the factory-era homepage to staging.
2. Verify `/`, `/blog`, `/blog/the-factory`, `/rss.xml`, and `/sitemap.xml`.
3. Import the four launch-candidate June posts into website content as unpublished or scheduled articles.
4. Generate one hero image per June article.
5. Add blog series navigation so the archive reads like a magazine collection.
6. Add mailing list capture before external syndication.
7. Cut over canonical `davidmieloch.com` only after staging, Caddy/SSL, and email forwarding are verified.
8. Backfill external platforms from the canonical website URL.
9. Launch June wave on a coordinated schedule outside LinkedIn first.

## Distribution Strategy

Do not mirror blindly.

- Website: canonical full article, strongest images, series navigation, mailing list capture.
- Medium: clean article import with canonical URL once production routing works.
- DEV / Hashnode: technical angle, tags, canonical back-link.
- HackerNoon / DZone: submit editorially polished versions, not raw mirrors.
- Substack: newsletter framing with a short personal intro and a call to reply.
- Reddit: discussion posts only, written for the specific subreddit, never mass-posted.
- LinkedIn: source-of-truth for already-published modern articles, but no new LinkedIn publish without explicit approval.

## Observability

The launch is not done unless it can be observed.

- Synthetic checks: `/`, `/blog`, article pages, RSS, sitemap, contact form.
- Content ledger: every canonical import and every external draft/publish receipt.
- Metrics: pageviews, referrers, outbound syndication clicks, mailing list conversions.
- Behavior: add a lightweight analytics/session-insight platform only if the data can be exported or queried by agents.
- Review cadence: Emily or another content agent should review content metrics weekly and file recommendations.

## PIE-CI Review

### P - Purpose
Score: Solid

Notes: The homepage now has one purpose: position the factory-era brand and route readers into the writing canon.

### I - Interface
Score: Solid

Notes: Public navigation is smaller and harder to misuse: Factory, Writing, Bio, Code, Contact.

### E - Encapsulation
Score: Concern

Notes: Root-route theme behavior and persistent audio are still global layout concerns. The homepage now works with them, but longer-term layout should expose explicit per-route chrome controls.

### C - Connection
Score: Solid

Notes: The homepage no longer depends on the large old Mantine/styled-components homepage module graph.

### I - Implementation
Score: Solid

Notes: The new homepage is a single focused component plus CSS module. It removes more complexity than it adds.

## Merge Decision

Pass with follow-up.

## Required Fixes

1. Add explicit route-level chrome controls instead of hiding homepage audio in `ClientLayout`.
2. Import June launch-candidate posts into website content.
3. Add article/series image treatments to `/blog`.
4. Add mailing list capture before public launch.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. The homepage is now a simple factory-era front door, and the next changes are concrete content/import/design tasks instead of a full brand excavation.
