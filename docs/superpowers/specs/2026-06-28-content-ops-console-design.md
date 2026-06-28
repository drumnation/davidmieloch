# Content Ops Console Design

## Purpose

Build an internal control room for the davidmieloch.com content pipeline.

The console should answer operational questions without requiring David or an
agent to spelunk JSON files, remember pipeline commands, or infer production
state from a feature branch.

This is not a CMS. It is a governed operator surface over the existing content
distribution spine, release ladder, draft lab, schedules, approvals, receipts,
and launch gates.

## Governance Anchors

- Forgejo issue #16: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/16
  - Owns the content admin MVP.
- Forgejo issue #17: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/17
  - Owns the visual content calendar backed by `publish-schedule.json`.
- Forgejo issue #18: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/18
  - Owns approval-gated execution adapters.
- Forgejo issue #20: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/20
  - Owns Postiz/social scheduler integration.

## Placement Decision

Build v1 inside davidmieloch.com at:

```text
/admin/content
```

The route must be internal and hidden by default:

- `CONTENT_OPS_ENABLED=1` enables the route and read API.
- `CONTENT_OPS_WRITE_ENABLED=1` enables artifact-writing actions.
- Production/public indexing is disabled with `robots: noindex, nofollow`.
- The route is not added to public navigation.

Why in-site first:

- The website repo already owns canonical articles, release calendars, social
  schedules, approval ledgers, audio manifests, image manifests, RSS behavior,
  and release receipts.
- An external Brain Garden operator app would add another synchronization layer
  before the basic visibility problem is solved.
- The existing Draft Lab already proves the pattern: env-gated internal pages
  reading deterministic repo artifacts.

An external Brain Garden operator app can become v2 if multiple sites or
non-repo-owned pipelines need one shared content operations cockpit.

## Current Substrate

The console reads existing artifacts first:

- `content/distribution/content-ledger.json`
- `content/distribution/article-readiness-report.json`
- `content/distribution/site-release-calendar.json`
- `content/distribution/launch-calendar.json`
- `content/distribution/publish-schedule.json`
- `content/distribution/social-calendar.json`
- `content/distribution/factory-primitives-approval-ledger.json`
- `content/distribution/factory-primitives-approval-packet.json`
- `content/distribution/release-receipts/**`
- `content/articles/**/index.md`
- article audio manifests and transcripts under `content/articles/<slug>/`
- public audio and image assets under `public/`

Current observed state from the clean release worktree:

- 32 content ledger candidates.
- 26 website articles.
- 4 website drafts.
- 21 items needing schedule.
- 25 social calendar entries.
- 60 external publish schedule entries.

These artifacts are the source of truth for v1. The console should not invent a
parallel database.

## Product Shape

### Overview

The opening screen answers:

- What is live now?
- What is scheduled next?
- What is approved but unscheduled?
- What is blocked?
- What needs image, audio, transcript, teaser, social package, or release work?
- What is the next safe agent action?

### Needs Scheduling

Shows content that is approved, near-ready, or staged but lacks a release slot.

Each row should show:

- title
- slug
- source collection
- current website state
- readiness state
- approval state
- missing gates
- recommended next action

### Schedule Board

Shows a unified schedule view from:

- website release calendar
- social calendar
- external publish schedule
- Postiz/n8n handoff packets when present

The first version can be a table grouped by lane and platform. A calendar view
is useful, but it is secondary to getting deterministic state and actions
working.

### Readiness And Blockers

Shows blockers from article readiness, release workflow, launch assets, audio,
transcript, image manifests, social packages, and approval ledgers.

The console should distinguish:

- blocking failures
- warnings
- missing optional assets
- manual review needed
- spend approval needed
- public release approval needed

### Agent Actions

The console exposes safe, receipt-oriented actions:

- What is next?
- What is approved but unscheduled?
- Schedule all safe approved unscheduled content.
- Dry-run release readiness for a slug.
- Prepare social packages/checklists for a slug.
- Show exact release-ladder next command.

Agent actions must return:

- command or action id
- changed files
- receipt path when written
- blockers
- warnings
- next recommended command
- `publicPublishingPerformed: false`
- `paidGenerationPerformed: false` unless an explicit spend approval action is
  added in a later phase

### Receipts

Shows the most recent receipts and their state:

- content release workflow receipts
- site release ladder receipts
- launch asset checks
- schedule generation receipts when available
- social/Postiz dry-run plans

This screen exists because feature branches and successful local commands should
not be mistaken for staged or production releases.

## API Design

Read endpoints:

```text
GET /api/admin/content/overview
GET /api/admin/content/inventory
GET /api/admin/content/readiness
GET /api/admin/content/schedule
GET /api/admin/content/approvals
GET /api/admin/content/receipts
GET /api/admin/content/agent/next
GET /api/admin/content/agent/approved-unscheduled
```

Write/action endpoints:

```text
POST /api/admin/content/schedule/upsert
POST /api/admin/content/schedule/cancel
POST /api/admin/content/release/dry-run
POST /api/admin/content/packages/prepare
POST /api/admin/content/agent/schedule-approved-unscheduled
```

Read endpoints require `CONTENT_OPS_ENABLED=1`.

Write endpoints require both:

```text
CONTENT_OPS_ENABLED=1
CONTENT_OPS_WRITE_ENABLED=1
```

The write endpoints modify only local repo governance artifacts. They do not
publish public content, deploy, send social posts, submit editorial review, or
call paid generation/transcription APIs.

## Shared Data Layer

Create a small server-side read model module that is used by both API routes and
future agent/CLI commands.

Responsibilities:

- read and validate known pipeline artifacts
- normalize article, schedule, approval, readiness, and receipt state
- compute derived views such as `approvedUnscheduled`
- compute `nextActions`
- expose pure functions for tests

The browser should consume normalized content ops view models, not raw pipeline
JSON files.

## Storybook Process

Design the console screens in Storybook before wiring the app route.

Story family:

```text
Content Ops Console / 01 Overview
Content Ops Console / 02 Needs Scheduling
Content Ops Console / 03 Schedule Board
Content Ops Console / 04 Readiness And Blockers
Content Ops Console / 05 Agent Actions
Content Ops Console / 06 Receipts
Content Ops Console / 07 Full Journey
```

Rules:

- Design/spec stories may use explicit fixture data labeled as fixture data.
- Product stories should use the same normalized view model shape as the real
  API.
- Do not ship unwired controls in the app route. If a button is not supported by
  the API, either omit it or render it disabled with a concrete reason.
- The Storybook journey is the visual review surface before route wiring.
- Once implemented and built, register the site Storybook with the internal
  Brain Garden Storybook hub and provide the live internal Storybook link for
  review.

The Brain Garden visual protocol still applies:

- local Storybook proves component behavior
- staging/internal URL proves reviewable deployed UI
- production URL is used only for final live verification after promotion

## Safety Boundary

The console is allowed to:

- read content and schedule artifacts
- write local schedule artifacts
- write local approval/scheduling receipts
- run dry-run checks
- prepare local social packages and checklists
- show exact next commands

The console is not allowed to:

- publish public website content
- deploy staging or production
- post to LinkedIn, Reddit, Postiz, Substack, Medium, DEV, Hashnode, HackerNoon,
  DZone, or any other platform
- submit content for editorial review
- spend image, audio, transcription, or model credits
- bypass release ladder gates
- turn draft previews into public posts without the existing canonical article
  and release process

Public publishing and deployment remain governed by:

- `pnpm content:pipeline content:release-workflow`
- `pnpm site:release-ladder`
- `pnpm release:status`
- the explicit `public-article-release-approval` and
  `public-social-post-approval` seams

## Agent Access

Agents should call the same normalized server functions as the API. A future CLI
layer can wrap those functions with stable subcommands:

```text
pnpm content:pipeline ops:next
pnpm content:pipeline ops:approved-unscheduled
pnpm content:pipeline ops:schedule-approved-unscheduled --dry-run
pnpm content:pipeline ops:schedule-approved-unscheduled --write
```

The first implementation can expose agent access through JSON API endpoints and
server tests. The CLI wrapper can follow once the data contract is stable.

Agent-access output must be deterministic enough to paste into a status update:

- summary
- sorted lists
- blockers
- changed files
- receipt paths
- exact commands to run next

## Data Flow

```text
content/articles + distribution artifacts + receipts
  -> content ops read model
  -> Storybook fixtures and screen journey
  -> /api/admin/content/* read endpoints
  -> /admin/content UI
  -> gated write actions for schedules/packages/checklists
  -> updated local artifacts + receipts
  -> existing release workflow and release ladder
```

## Error Handling

Artifact read errors should produce useful operator states:

- missing file
- invalid JSON
- unsupported schema version
- stale generated artifact
- dirty worktree risk
- write disabled
- command failed

The API should return structured JSON errors. The UI should show the affected
artifact path, the consequence, and the next safe action.

## Testing And Verification

Design/spec phase:

- spec self-review for placeholders, contradictions, scope drift, and ambiguity

Implementation phase:

- unit tests for read model derivations
- API route tests for enabled/disabled gates
- Storybook snapshot or render tests for the screen journey
- `pnpm type-check`
- `pnpm build-storybook`
- route smoke against `/admin/content` with `CONTENT_OPS_ENABLED=1`
- staging/internal browser verification before claiming staged UI

Release phase:

- no production claim without `pnpm release:status`
- no content launch claim without launch asset checks and release receipts

## Implementation Phases

### Phase 1: Read Model And Storybook

- Create normalized content ops view models.
- Build Storybook fixture data from current artifact shapes.
- Build the seven-story console journey.
- Verify Storybook renders locally.

### Phase 2: Read API And Internal Route

- Add env-gated API read endpoints.
- Add env-gated `/admin/content` route.
- Wire the route to live API data.
- Verify disabled-by-default behavior.

### Phase 3: Safe Write Actions

- Add schedule upsert/cancel.
- Add dry-run release readiness.
- Add package/checklist preparation.
- Return receipts and changed-file summaries.

### Phase 4: Agent Access

- Add agent-facing JSON endpoints.
- Add deterministic next-action output.
- Add CLI wrappers after the API/read model contract stabilizes.

### Phase 5: Storybook Hub And Staging Review

- Register the personal-site Storybook surface with the internal Brain Garden
  Storybook hub.
- Provide the live internal Storybook URL.
- Deploy to staging/internal and verify `/admin/content` visually.

## Acceptance Criteria

- The console shows current article inventory, draft previews, schedules,
  approvals, readiness, blockers, and latest release state.
- The console can answer what is approved but unscheduled.
- The console can schedule approved unscheduled content safely without public
  publishing.
- The console can run dry-run readiness checks and prepare local packages or
  checklists.
- The console exposes an agent-readable next-action interface.
- Storybook contains the screen journey before the app route is treated as done.
- Public posting and deployment remain outside the console and behind existing
  gates.
- The implementation is verified on the relevant surface: local Storybook,
  staging/internal app, and production only if explicitly promoted.

## PIE-CI Review

### P - Purpose

Pass. The design owns one concern: an internal content operations control room
over the existing website content pipeline.

### I - Interface

Pass. Interfaces are explicit: normalized read model, API routes, Storybook
screen journey, env gates, and future CLI wrappers.

### E - Encapsulation

Pass. The console reads and writes governance artifacts but does not own public
publishing, paid generation, or deployment.

### C - Connection

Pass. The design connects existing ledgers, schedules, approvals, receipts,
Draft Lab precedent, Postiz handoff rules, and the release ladder.

### I - Implementation

Pass. The implementation path starts with read model and Storybook, then adds
API, route wiring, safe writes, agent access, and staging verification.

## Core Judgment

This reduces the surface area of the next change by making content state visible
before adding more automation. It also prevents the recurring failure mode where
content changes sit in branches, schedules live in JSON files, and production
state is inferred instead of verified.
