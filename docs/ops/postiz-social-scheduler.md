# Postiz Social Scheduler

Generated: 2026-06-05

Forgejo issue: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/20

## Purpose

Postiz is the self-hosted scheduling substrate for social teasers and platform distribution work around canonical davidmieloch.com articles.

## Public URL

- Primary: https://social-davidmieloch.brain-garden.io
- Avoid: `https://social.davidmieloch.brain-garden.io`

The nested hostname fails at the Cloudflare edge because the current wildcard certificate covers `*.brain-garden.io`, not `*.*.brain-garden.io`.

## Server Deployment

- Host: `singularity-one` through `dawn`
- Compose directory: `/home/dave/platform-repos/postiz-docker-compose`
- Compose override: `/home/dave/platform-repos/postiz-docker-compose/docker-compose.brain-garden.yaml`
- Runtime URL binding: `127.0.0.1:4007 -> postiz:5000`
- Caddy route: `social-davidmieloch.brain-garden.io -> localhost:4007`

Health check:

```bash
rtk fleet run dawn 'bash -lc "cd /home/dave/platform-repos/postiz-docker-compose && docker compose -f docker-compose.yaml -f docker-compose.brain-garden.yaml ps"'
rtk bash -lc 'curl -sSIL --max-time 20 https://social-davidmieloch.brain-garden.io | sed -n "1,24p"'
```

## Credential State

Postiz secrets currently exist only on the server in the deployment directory because the available 1Password service account can read the `Brain Garden` vault but cannot create or update items.

Do not print, paste, or commit the server secrets file.

Before this is fully governed, either:

1. Grant the Codex/Brain Garden 1Password service account create/update access to the vault.
2. Manually create a `Postiz self-host` item in 1Password and move the generated credentials there.

## First User

`DISABLE_REGISTRATION=true` is configured. Postiz allows the first user signup, then disables the sign-up page.

The first account still needs to be created interactively at:

```text
https://social-davidmieloch.brain-garden.io
```

Do not create the first user with an unstored password. The password must be stored in 1Password as part of the same setup pass.

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

Future CLI seam:

```bash
rtk pnpm content:pipeline social:package <slug|all>
rtk pnpm content:pipeline social:schedule --platforms=x,reddit,linkedin --start=<iso>
rtk pnpm content:pipeline social:postiz:push --dry-run
```

`social:postiz:push` should refuse public dispatch unless an approval receipt exists.

## Observability

Primary checks:

- Postiz container health through Docker Compose.
- Caddy route HTTP probe.
- Screenshot or browser render of `/auth` or the logged-in dashboard.
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
Score: ⚠️
Notes: Secrets must move from the server-only file into 1Password before the deployment is fully governed.

### C — Connection
Score: ✅
Notes: The deployment connects Caddy, Docker Compose, and future content pipeline adapters through narrow boundaries.

### I — Implementation
Score: ⚠️
Notes: Base infrastructure is live. Provider credentials and first-user setup remain manual blockers.

## Merge Decision

Pass for infrastructure documentation. Block automated public posting until the 1Password and approval seams are complete.

## Required Fixes

1. Store Postiz credentials in 1Password.
2. Create the first Postiz user.
3. Add provider credentials and connect channels.
4. Build the dry-run Postiz push CLI from canonical content metadata.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. Postiz becomes a named scheduling substrate, with clear health checks, credential blockers, and a narrow future CLI seam.
