# Content Distribution Wave One Checklist

Last updated: 2026-05-19

## Operating Rules

- [ ] Treat `davidmieloch.com` as the canonical home once canonical blog URLs resolve correctly.
- [ ] Use `davidmieloch.brain-garden.io` as the working hosted site until `davidmieloch.com/blog/...` stops returning stale Vercel 404s.
- [ ] Do not post new LinkedIn content without explicit David approval.
- [ ] Treat Reddit as manual-only, discussion-first, and reputation-sensitive.
- [ ] Treat Medium, DEV, Hashnode, HackerNoon, DZone, and Substack as distribution surfaces that route readers back to the website.
- [ ] Record every external draft, submission, publish, rejection, or skipped decision in `content/distribution/platform-ledger.json`.
- [ ] Record performance metrics in `content/distribution/content-metrics.json` after anything is public.

## Website Canonical Archive

Already in the local website content archive:

- [x] Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- [x] Alphabetize your code.
- [x] Building with Brain Garden: Real-World Lessons in Practical AI
- [x] Developing with a Team of AI's
- [x] Every Company Is Sitting on Sunken Treasure
- [x] How to Make Your AI Code Look Human
- [x] Judgment Over Keystrokes
- [x] Pixel Precision in Developer Tools: What I Learned Building Designer Cloud
- [x] Reality Needs Observers
- [x] Reuse your code: Authoring your own Universal Library with Webpack
- [x] The Beauty of ES6's Object Destructuring Assignment
- [x] The Factory
- [x] The Foreman
- [x] The Golden Hammer
- [x] The Moving Target
- [x] The Overnight Shift
- [x] What I Learned Building a Photoshop in the Browser
- [x] Why Character Choice Matters in Agent Design
- [x] Why you should Encapsulate your Javascript Conditionals in a Function
- [x] Your AI Isn't Hallucinating. It's Lying.

Website work still needed:

- [ ] Fix canonical `davidmieloch.com/blog/...` routing so Medium and other platforms can safely import canonical URLs.
- [ ] Keep `davidmieloch.brain-garden.io` available as staging/internal hosted canonical preview.
- [ ] Mark older Medium-era engineering posts as historical/legacy on the website.
- [ ] Pin the modern Factory/Governance thesis above the older AI transformation material.
- [ ] Add series landing pages for Golden Hammer, The Observer Series, AI Factory, Agent Design, and Legacy Engineering Notes.
- [ ] Make the article images visible and uncropped enough to pull readers into the posts.
- [ ] Add newsletter signup CTA to article pages and series pages.

## LinkedIn

LinkedIn is currently the source of truth for modern published articles, not an automation target.

Already published on LinkedIn and imported locally:

- [x] Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- [x] Every Company Is Sitting on Sunken Treasure
- [x] How to Make Your AI Code Look Human
- [x] Reality Needs Observers
- [x] The Factory
- [x] The Foreman
- [x] The Golden Hammer
- [x] The Moving Target
- [x] The Overnight Shift
- [x] Why Character Choice Matters in Agent Design
- [x] Your AI Isn't Hallucinating. It's Lying.

LinkedIn rules:

- [ ] No automated LinkedIn posting.
- [ ] Use LinkedIn only for reconciliation, source URLs, and explicit David-approved launches.
- [ ] Backfill LinkedIn source URLs into ledger receipts where missing or stale.

## Medium

Already on Medium:

- [x] Alphabetize your code.
- [x] Building with Brain Garden: Real-World Lessons in Practical AI
- [x] Developing with a Team of AI's
- [x] Judgment Over Keystrokes
- [x] Pixel Precision in Developer Tools: What I Learned Building Designer Cloud
- [x] Reuse your code: Authoring your own Universal Library with Webpack
- [x] The Beauty of ES6's Object Destructuring Assignment
- [x] What I Learned Building a Photoshop in the Browser
- [x] Why Character Choice Matters in Agent Design
- [x] Why you should Encapsulate your Javascript Conditionals in a Function

Observed Medium drafts:

- [ ] Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- [ ] Thinking about Thinking Machines
- [ ] Create your own Suno AI Alexa Skill
- [ ] Encapsulate all react stateful logic in a custom hook

Modern LinkedIn-sourced posts to back-sync to Medium:

- [ ] Academic Research Is a Software Patch (draft exists; review and publish or update receipt)
- [ ] Every Company Is Sitting on Sunken Treasure
- [ ] How to Make Your AI Code Look Human
- [ ] Reality Needs Observers
- [ ] The Factory
- [ ] The Foreman
- [ ] The Golden Hammer
- [ ] The Moving Target
- [ ] The Overnight Shift
- [ ] Your AI Isn't Hallucinating. It's Lying.

Medium execution notes:

- [ ] Retry import only after canonical `davidmieloch.com/blog/...` works.
- [ ] If Medium import keeps failing, use editor paste flow from `content/distribution/packages/<slug>/medium.md`.
- [ ] Preserve canonical link back to the website.
- [ ] Record Medium URLs in the ledger.

## DEV

Observed DEV state:

- [x] Why Character Choice Matters in Agent Design is already present as a DEV draft.

Posts to draft on DEV:

- [x] Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- [x] Every Company Is Sitting on Sunken Treasure
- [x] How to Make Your AI Code Look Human
- [x] Reality Needs Observers
- [x] The Factory
- [x] The Foreman
- [x] The Golden Hammer
- [x] The Moving Target
- [x] The Overnight Shift
- [x] Your AI Isn't Hallucinating. It's Lying.

DEV execution notes:

- [x] Patch `devto:create-draft` to read generated package files from `content/distribution/packages/<slug>/devto.md`.
- [ ] Keep DEV creates draft-only until reviewed.
- [ ] Publish developer-practical posts first; hold broader philosophy posts if they feel weak for DEV.
- [x] Resume DEV draft creation after rate limit clears; all modern LinkedIn-source DEV drafts are now created.

## Hashnode

Hashnode account is logged in as David Mieloch.

Posts to draft on Hashnode:

- [ ] Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- [ ] Every Company Is Sitting on Sunken Treasure
- [ ] How to Make Your AI Code Look Human
- [ ] Reality Needs Observers
- [ ] The Factory
- [ ] The Foreman
- [ ] The Golden Hammer
- [ ] The Moving Target
- [ ] The Overnight Shift
- [ ] Why Character Choice Matters in Agent Design
- [ ] Your AI Isn't Hallucinating. It's Lying.

Hashnode execution notes:

- [x] Confirm whether API draft creation still works under current Hashnode API plan limits.
- [x] Patch `hashnode:create-draft` to read generated package files from `content/distribution/packages/<slug>/hashnode.md`.
- [ ] Recover Hashnode publication/API path; current GraphQL request returns HTML with the available local key.
- [ ] Keep drafts delisted/unpublished until reviewed.

## HackerNoon

HackerNoon is logged in as `@drumnation`.

Candidate submissions:

- [x] The Factory (saved draft shell; not submitted)
- [ ] The Golden Hammer
- [ ] The Foreman
- [ ] Reality Needs Observers
- [ ] Your AI Isn't Hallucinating. It's Lying.
- [ ] Academic Research Is a Software Patch (And I Finally Have a Way to Install It)

HackerNoon execution notes:

- [ ] Treat HackerNoon as editorial submission, not instant mirror.
- [ ] Use `content/distribution/packages/<slug>/hackernoon.md` as submission copy.
- [x] Record draft status for The Factory.
- [ ] Record final editorial submission/result after David approval.

## DZone

DZone is logged in and the contributor process is documented at `/pages/contribute`.

Candidate DZone submissions:

- [ ] How to Make Your AI Code Look Human
- [ ] The Factory
- [ ] The Foreman
- [ ] Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- [ ] Every Company Is Sitting on Sunken Treasure

DZone execution notes:

- [ ] Use the plus/Post control, select "Post an Article", and send to moderation.
- [ ] Prefer practical engineering rewrites over philosophy mirrors.
- [ ] Use `content/distribution/packages/<slug>/dzone.md` as a starting point.
- [ ] Record moderation result.

## Substack

Substack is logged in.

Newsletter candidates:

- [ ] Launch note: "The Factory is now the front door"
- [ ] Golden Hammer series roundup
- [ ] Observer Series roundup
- [ ] Dark Chocolate Software Factory manifesto
- [ ] Monthly field note: what the factory shipped

Substack execution notes:

- [ ] Do not mirror every article one by one.
- [ ] Use Substack as a direct-audience layer with series framing.
- [ ] Route readers to the website series pages and mailing list.

## Reddit

Reddit is logged in, but it is David's main social account.

Reddit policy:

- [ ] No automated Reddit posting.
- [ ] No batch link-dropping.
- [ ] Draft discussion-native posts only.
- [ ] David approves subreddit, title, final text, and whether to include a link.

Potential discussion seeds:

- [ ] Local LLMs and post-subsidy model economics, based on The Factory.
- [ ] Why AI agents need adversarial observers, based on Reality Needs Observers.
- [ ] Why code that "looks human" is the wrong standard, based on How to Make Your AI Code Look Human.
- [ ] What software work looks like when the PR is not the unit of labor, based on The Foreman.

## Already Released And Needs Back-Sync

These are already released somewhere and need platform expansion or ledger reconciliation.

LinkedIn-source modern articles:

- [ ] Reality Needs Observers: back-sync to Medium, DEV, Hashnode, HackerNoon; prepare Reddit discussion seed.
- [ ] The Moving Target: back-sync to Medium, DEV, Hashnode.
- [ ] The Foreman: back-sync to Medium, DEV, Hashnode, HackerNoon, DZone.
- [ ] The Golden Hammer: back-sync to Medium, DEV, Hashnode, HackerNoon.
- [ ] The Factory: back-sync to Medium, DEV, Hashnode, HackerNoon, DZone, Substack roundup.
- [ ] The Overnight Shift: back-sync to Medium, DEV, Hashnode.
- [ ] Every Company Is Sitting on Sunken Treasure: back-sync to Medium, DEV, Hashnode, DZone.
- [ ] How to Make Your AI Code Look Human: back-sync to Medium, DEV, Hashnode, DZone.
- [ ] Academic Research Is a Software Patch: review existing Medium draft, then back-sync to DEV, Hashnode, HackerNoon, DZone.
- [ ] Your AI Isn't Hallucinating. It's Lying.: back-sync to Medium, DEV, Hashnode, HackerNoon; prepare Reddit discussion seed.
- [x] Why Character Choice Matters in Agent Design: already on LinkedIn, website, Medium; DEV draft observed.
- [ ] Why Character Choice Matters in Agent Design: review existing DEV draft, draft Hashnode, consider HackerNoon.

Medium-source legacy articles:

- [x] Alphabetize your code: already on Medium and website.
- [x] Building with Brain Garden: already on Medium and website.
- [x] Developing with a Team of AI's: already on Medium and website.
- [x] Judgment Over Keystrokes: already on Medium and website.
- [x] Pixel Precision in Developer Tools: already on Medium and website.
- [x] Reuse your code: already on Medium and website.
- [x] The Beauty of ES6's Object Destructuring Assignment: already on Medium and website.
- [x] What I Learned Building a Photoshop in the Browser: already on Medium and website.
- [x] Why you should Encapsulate your Javascript Conditionals in a Function: already on Medium and website.
- [ ] Decide which legacy posts deserve DEV/Hashnode back-sync.
- [ ] Keep low-brand-fit legacy posts historical only.

## Not Released Yet And Should Launch Together

Current scheduled launch placeholder:

- [ ] Confirm the May 19, 2026 11:00 AM ET LinkedIn article URL after it publishes.
- [ ] Import the new article into `content/articles/<slug>/index.md`.
- [ ] Fill `articleSlug` in `content/distribution/launch-calendar.json`.
- [ ] Generate Medium, DEV, and Hashnode packages.
- [ ] Create Medium draft or import.
- [ ] Create DEV draft.
- [ ] Create Hashnode draft.
- [ ] Review all drafts.
- [ ] Publish approved external versions in a coordinated wave.
- [ ] Record receipts.
- [ ] Record first metrics snapshot after publish.

Future synchronized wave:

- [ ] Prepare Factory homepage update.
- [ ] Prepare series landing pages.
- [ ] Publish/submit the strongest 3-5 Factory articles across Medium, DEV, Hashnode, HackerNoon, and DZone.
- [ ] Publish one Substack roundup pointing to the series.
- [ ] Prepare one or two Reddit discussion seeds, but post only if David approves the exact community and copy.
- [ ] Route all CTAs to website series pages and mailing list signup.

## Pipeline Work Needed

- [x] Patch platform draft commands to consume generated package files instead of requiring article-local variants.
- [x] Add `launch:due` command to read `launch-calendar.json`.
- [x] Add guarded `draft:create` command for API-backed draft targets.
- [x] Add `readiness` command to report platform blockers and manual-ready states.
- [x] Add `queue` command to convert ledger gaps into prioritized next actions.
- [x] Add queue filters and Markdown checklist output for focused execution passes.
- [x] Add queue writer for durable next-action checklist artifacts.
- [x] Add generated package paths to queue checklists for browser/manual execution.
- [x] Add receipt writer for browser/manual workflows.
- [x] Add metrics capture checklist per platform.
- [x] Add observer that reports missing receipts and missing metrics as degraded states.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This file owns one concern: wave-one content distribution planning.

### I — Interface
Score: ✅
Notes: The interface is a checkbox checklist grouped by destination and launch state.

### E — Encapsulation
Score: ✅
Notes: It references platform procedures without embedding credentials or implementation details.

### C — Connection
Score: ✅
Notes: It connects only to existing ledger, package, and launch-calendar artifacts.

### I — Implementation
Score: ✅
Notes: The checklist is concrete enough to drive execution without creating a new abstraction.

## Merge Decision

Pass

## Required Fixes

None.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It turns scattered platform intent into one execution checklist that can be reconciled against the ledger.
