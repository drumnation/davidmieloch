# Content Distribution Accounting

Generated: 2026-05-20

## Executive State

Done means an article is present in the right substrate for that layer:

- Source/import layer: article exists in the local website content archive.
- Package layer: platform-specific markdown exists.
- Draft layer: target platform has a saved, non-public draft or draft shell.
- Publish layer: article is public on that platform and has a receipt.
- Metrics layer: published receipt has an observed metrics record.

Current state:

- Local canonical archive: 20/20 articles ready locally.
- Platform packages: 20/20 articles packaged for LinkedIn, Reddit, Medium, DEV, Hashnode, HackerNoon, DZone, and Substack.
- Public website canonical: blocked by `davidmieloch.com/blog/...` routing; staging/internal is usable, production canonical is not verified.
- Remote external drafts: 16 total known remote drafts or draft shells.
- Public publish automation: intentionally 0. Public publishing still requires David approval.
- Metrics: no missing metrics for published external receipts because no new syndicated public receipts have been recorded yet.

## Platform Accounting

### davidmieloch.com

Status: local-ready, production canonical blocked.

- 20/20 articles exist in the local website archive.
- Ledger marks all 20 as `ready-local`.
- `davidmieloch.com/blog/the-factory` is still not verified as production-canonical-ready by the pipeline.
- This blocks clean Medium import/canonical workflows.

Next:

- Finish DNS/Caddy/Vercel cutover so canonical blog URLs return 200 from the intended host.
- Then treat the website as the public canonical source for all syndication.

### LinkedIn

Status: source/reference only.

- 11 modern articles are recorded as LinkedIn `source`.
- 9 legacy Medium-era articles are `not-started` on LinkedIn and should not be posted there without explicit approval.
- No new LinkedIn posting is authorized.

Done:

- LinkedIn has been used as the modern source of truth.

Next:

- Continue source reconciliation only.

### Medium

Status: 10 existing/source posts, 10 modern not started.

Already on Medium:

- Alphabetize your code.
- Building with Brain Garden: Real-World Lessons in Practical AI
- Developing with a Team of AI's
- Judgment Over Keystrokes
- Pixel Precision in Developer Tools: What I Learned Building Designer Cloud
- Reuse your code: Authoring your own Universal Library with Webpack
- The Beauty of ES6's Object Destructuring Assignment
- What I Learned Building a Photoshop in the Browser
- Why you should Encapsulate your Javascript Conditionals in a Function
- Why Character Choice Matters in Agent Design

Not started on Medium:

- Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- Every Company Is Sitting on Sunken Treasure
- How to Make Your AI Code Look Human
- Reality Needs Observers
- The Factory
- The Foreman
- The Golden Hammer
- The Moving Target
- The Overnight Shift
- Your AI Isn't Hallucinating. It's Lying.

Blocker:

- Medium import should wait until production canonical `davidmieloch.com/blog/...` URLs work.

### DEV

Status: 15/20 remote unpublished drafts, 5 remaining.

Remote DEV drafts recorded:

- Academic Research Is a Software Patch (And I Finally Have a Way to Install It)
- Alphabetize your code.
- Building with Brain Garden: Real-World Lessons in Practical AI
- Every Company Is Sitting on Sunken Treasure
- How to Make Your AI Code Look Human
- Judgment Over Keystrokes
- Pixel Precision in Developer Tools: What I Learned Building Designer Cloud
- Reality Needs Observers
- The Factory
- The Foreman
- The Golden Hammer
- The Moving Target
- The Overnight Shift
- Why Character Choice Matters in Agent Design
- Your AI Isn't Hallucinating. It's Lying.

Remaining DEV drafts:

- Developing with a Team of AI's
- Reuse your code: Authoring your own Universal Library with Webpack
- The Beauty of ES6's Object Destructuring Assignment
- What I Learned Building a Photoshop in the Browser
- Why you should Encapsulate your Javascript Conditionals in a Function

Blocker:

- DEV API rate-limited the last backfill pass. Retry the remaining 5 later.

Next:

- Create the remaining 5 unpublished DEV drafts through `draft:create`.
- Review all 20 before any public publish.

### HackerNoon

Status: 1/20 remote draft shell, 19 package-ready.

Remote HackerNoon draft shell:

- The Factory: https://app.hackernoon.com/mobile/6a0bdccbc4dbb9f3d6e47038

Remaining:

- 19 package-ready articles still need HackerNoon draft/editorial loading.

Next:

- Use `content/distribution/packages/<slug>/hackernoon.md`.
- Stop before `Submit Story for Review` unless David approves.
- Record each saved draft with `receipt:record`.

### DZone

Status: 0/20 remote drafts, 20 package-ready, 20 scheduled.

Prepared artifacts:

- `docs/ops/content-distribution-dzone-next-actions.md`
- DZone entries in `content/distribution/publish-schedule.json`

Next:

- Load DZone editor drafts manually/browser-assisted.
- Stop before public submission unless David approves.
- Record each draft/submission result through `receipt:record`.

### Substack

Status: 0/20 remote drafts, 20 package-ready, 20 scheduled.

Prepared artifacts:

- `docs/ops/content-distribution-substack-next-actions.md`
- Substack entries in `content/distribution/publish-schedule.json`

Next:

- Treat Substack as a newsletter/series channel, not blind mirrors.
- Load drafts from `content/distribution/packages/<slug>/substack.md`.
- Stop before send/publish unless David approves.

### Hashnode

Status: 0/20 remote drafts, 20 package-ready, API blocked.

Blocker:

- Current Hashnode API/publication path is not working under available credentials/API access.

Next:

- Recover `HASHNODE_PUBLICATION_ID` and paid/allow-listed API access, or use browser draft loading.
- Keep drafts delisted/unpublished.

### Reddit

Status: 0/20 posted, 20 discussion packages available.

Policy:

- Manual only.
- No automated posting.
- David approves subreddit, title, final text, and link decision.

Next:

- Pick 1-2 high-fit discussion seeds after website canonical is stable.

## Schedule State

`content/distribution/publish-schedule.json` contains 40 approval-gated prep entries:

- DZone: 20 entries.
- Substack: 20 entries.
- Factory-front-door lane: 22 entries.
- Legacy-backfill lane: 18 entries.
- Public publishing allowed: false.
- Safe default: `do-not-publish`.

First scheduled entry:

- 2026-05-21T13:00:00.000Z: DZone / Academic Research Is a Software Patch (And I Finally Have a Way to Install It)

Last scheduled entry:

- 2026-06-10T01:00:00.000Z: Substack / Why you should Encapsulate your Javascript Conditionals in a Function

## Forgejo Pipeline

Active governance:

- #15 Pilot syndicate factory-era articles to external platforms
- #16 Build davidmieloch.com content admin MVP
- #17 Build visual content calendar admin backed by publish-schedule.json
- #18 Add approval-gated platform execution adapters for content distribution

Pipeline stages:

- #15 is active execution and reconciliation.
- #16 is next after canonical website routing and content archive stability.
- #17 is next after schedule JSON semantics stabilize.
- #18 is next after one manual/browser loading pass proves safe platform flows.

## Done Score

- Content inventory: 100%.
- Platform package generation: 100%.
- Scheduling spine: 100%.
- Website public canonical: blocked.
- DEV draft backfill: 75%.
- HackerNoon draft loading: 5%.
- DZone draft loading: 0%, but prep/schedule is 100%.
- Substack draft loading: 0%, but prep/schedule is 100%.
- Medium modern backfill: 0% until canonical routing is fixed.
- Hashnode remote drafts: 0% until API/browser path is resolved.
- Public external publishing: 0% by design.

## Immediate Next Moves

1. Fix production canonical routing for `davidmieloch.com/blog/...`.
2. Retry the 5 remaining DEV drafts after the API rate limit cools down.
3. Run one manual/browser loading pass for DZone and Substack to prove the draft path.
4. Turn the proven browser steps into issue #18 execution adapters.
5. Build the admin/editor and calendar surfaces from issues #16 and #17.

## Core Judgment

We are past content chaos and into governed distribution. The system knows what exists, what is packaged, what is drafted, what is blocked, and what is scheduled. The main unfinished work is remote draft loading and canonical website cutover, not content discovery.
