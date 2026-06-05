# Postiz Social Scheduler

Generated: 2026-06-05

Forgejo issue: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/20

## Purpose

Postiz is the self-hosted scheduling substrate for social teasers and platform distribution work around canonical davidmieloch.com articles.

## Internal URL

- Primary: https://social-davidmieloch.brain-garden.io
- Avoid: `https://social.davidmieloch.brain-garden.io`

Postiz is an internal Brain Garden operator tool. It should be reached through the internal Brain Garden network, not exposed as a public marketing surface.

Do not route this through Cloudflare Tunnel or make it publicly reachable unless David explicitly asks for that deployment path.

Exposure gate:

```text
Does anybody but Dave need to touch this GUI?
```

If the answer is no or unknown, keep Postiz internal.

The nested hostname is also a bad fit for public edge TLS because the current wildcard certificate covers `*.brain-garden.io`, not `*.*.brain-garden.io`.

## Server Deployment

- Host: `singularity-one` through `dawn`
- Compose directory: `/home/dave/platform-repos/postiz-docker-compose`
- Compose override: `/home/dave/platform-repos/postiz-docker-compose/docker-compose.brain-garden.yaml`
- Runtime URL binding: `127.0.0.1:4007 -> postiz:5000`
- Caddy route: `social-davidmieloch.brain-garden.io -> localhost:4007`

Health check:

```bash
rtk fleet run dawn 'bash -lc "cd /home/dave/platform-repos/postiz-docker-compose && docker compose -f docker-compose.yaml -f docker-compose.brain-garden.yaml ps"'
rtk fleet run dawn 'bash -lc "curl -k -sSIL --resolve social-davidmieloch.brain-garden.io:443:127.0.0.1 --max-time 20 https://social-davidmieloch.brain-garden.io | sed -n '\''1,24p'\''"'
```

## Credential State

The Postiz admin credential is stored in 1Password:

- Vault: `Brain Garden`
- Item: `Postiz / social-davidmieloch / admin / login`
- Item id: `mpxdavee2l4mquo5maiocwcv3a`

The service account can read created Brain Garden vault items. Create/update still uses the interactive user-authenticated 1Password CLI path when Dave authorizes it.

Do not print, paste, or commit the server secrets file or 1Password field values.

## First User

`DISABLE_REGISTRATION=true` is configured. Postiz allows the first user signup, then disables the sign-up page.

The first account is created and login verified. Authenticated users land on:

```text
https://social-davidmieloch.brain-garden.io/launches
```

Do not create additional users unless Dave explicitly approves the operator access model.

## Provider Setup

Postiz ships with no social providers configured by default. Each provider needs its own OAuth app credentials or account connection flow.

Good first wave:

- Bluesky
- Mastodon
- Reddit
- LinkedIn
- X
- Medium
- DEV
- Hashnode

Manual-heavy later wave:

- Instagram
- Threads
- YouTube
- TikTok
- Pinterest

Use Postiz for scheduling and channel state. Keep davidmieloch.com as the canonical article source.

## n8n / Commander Data Integration

Postiz and n8n should be combined rather than treated as competing schedulers.

Preferred split:

- davidmieloch.com/content ledger owns canonical article metadata, copy, hero images, approvals, and receipts.
- Postiz owns social channel connection state, calendar UI, and scheduled dispatch state.
- n8n owns workflow orchestration: watch approved schedule packets, call Postiz APIs, run reminders, request missing assets, and trigger metrics capture.
- Commander Data owns n8n workflow design and maintenance.

This keeps the decision seam explicit. n8n may move approved packets and produce reminders, but it should not invent public publishing approval.

Open discovery item: n8n credentials and workflow packages exist on `singularity-one`, but no live `n8n` container or `:5678` listener was observed during the 2026-06-05 Postiz setup pass.

## Decision Seam

Name: `public-social-post-approval`

Actor: David

Safe default: `do-not-post`

Postiz may hold drafts, proposed schedules, and connected channels. Public posting still requires explicit approval for the article, platform, copy, URL, and time.

## Deterministic Spine

Source data:

- `content/distribution/content-ledger.json`
- `content/distribution/publish-schedule.json`
- `content/distribution/social-ledger.json`
- article Markdown and hero image metadata

Current CLI seam:

```bash
rtk pnpm content:pipeline social:package <slug|all>
rtk pnpm content:pipeline social:manifest <slug|all> <platform|all> --write
rtk pnpm content:pipeline social:schedule --start=<iso> --interval-hours=8 --write
rtk pnpm content:pipeline social:n8n:export --write
rtk pnpm content:pipeline social:postiz:push --dry-run
```

`social:postiz:push` currently refuses until a Postiz API adapter and connected target channel exist. The future non-dry-run implementation should create Postiz drafts or schedules only from signed manifests and should refuse public dispatch unless an approval receipt exists.

`social:n8n:export` emits workflow-ready schedule packets for Commander Data/n8n without posting.

## Observability

Primary checks:

- Postiz container health through Docker Compose.
- Caddy route HTTP probe.
- Screenshot or browser render of `/auth` or the logged-in dashboard.
- n8n workflow execution receipts once n8n is wired in.
- Ledger receipt for every draft, schedule, approval, and public dispatch.

Fallback chain:

1. Postiz API or UI state.
2. `content/distribution/social-ledger.json`.
3. Platform receipt URL or screenshot.
4. ROM heartbeat.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This file owns one concern: the Postiz social scheduler deployment.

### I — Interface
Score: ✅
Notes: Public URL, health commands, credential state, and future CLI seam are explicit.

### E — Encapsulation
Score: ✅
Notes: The admin credential is stored in 1Password; docs record only references, not secret values.

### C — Connection
Score: ✅
Notes: The deployment connects Caddy, Docker Compose, and future content pipeline adapters through narrow boundaries.

### I — Implementation
Score: ⚠️
Notes: Base infrastructure and first-user login are live. Provider credentials and channel connections remain manual blockers.

## Merge Decision

Pass for infrastructure documentation. Block automated public posting until provider channels, canary tests, and approval seams are complete.

## Required Fixes

1. Connect first-wave canary provider channels.
2. Record channel ids and delete paths in the social inventory.
3. Build the Postiz push CLI from canonical content metadata.
4. Keep public dispatch behind explicit David approval.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. Postiz becomes a named scheduling substrate, with clear health checks, credential blockers, and a narrow future CLI seam.
