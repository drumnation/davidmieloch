# Social Account Onboarding

Generated: 2026-06-05

Forgejo issue: http://forge.brain-garden.io:4040/singularity-labs/davidmieloch-site/issues/20

## Purpose

Create a governed path for connecting personal and fresh brand accounts to Postiz and n8n without exposing sensitive control planes or creating unstored credentials.

## Hard Gates

1. Ask before exposing any GUI: `Does anybody but Dave need to touch this GUI?`
2. If no or unknown, keep it internal.
3. Do not create an account unless its credential item can be stored in 1Password first.
4. Do not connect a personal account until a fresh/canary account has proven the connector flow.
5. Do not publish from a personal account as a connector test.
6. Do not retry CAPTCHA, 2FA, suspicious prompts, or ToS ambiguity automatically. Record them in the refusal inbox.

## Current Blocker

Credential custody is now available for Postiz:

- The Postiz admin login is stored in the `Brain Garden` 1Password vault.
- The service account can read created items.
- Create/update remains an interactive user-authenticated 1Password CLI path when Dave authorizes it.

The active blocker is channel readiness:

- Fresh/canary accounts still need to be created or reserved.
- Provider channels still need to be connected in Postiz.
- Delete paths, recovery artifacts, and channel ids still need to be recorded.
- Public connector tests still need explicit approval.

Until those are done, the pipeline should stop at package, manifest, schedule, and blocked n8n packet generation.

## First Wave

Create or reserve these now that credential custody is available, storing every credential and recovery artifact before moving on:

| Platform | Account Kind | Identity Layer | Test Policy |
| --- | --- | --- | --- |
| Bluesky | Fresh canary | Brand lab | Bland public test allowed |
| Mastodon | Fresh canary | Brand lab | Bland public test allowed |
| Threads | Fresh canary | Brand lab | Bland public test allowed |
| Facebook Page | Fresh page | Brand lab | Page-only bland test allowed |
| YouTube | Reservation | Brand lab | No public test video |
| TikTok | Reservation | Brand lab | No public test video |

Existing personal accounts should be connected later and only after canary accounts prove the flow:

- LinkedIn
- X/Twitter
- Medium
- Instagram
- Reddit
- Facebook personal

## Credential Item Shape

Each account gets one 1Password item:

```text
Title: Social / <platform> / <handle> / <identity-layer>
Vault: Brain Garden
Fields:
- username
- password
- recovery email
- recovery phone, if any
- recovery codes
- platform URL
- Postiz channel id
- blast radius notes
- rotation date
- retirement state
```

## Canary Test Post

Use only on fresh/canary accounts:

```text
Brain Garden social scheduler test. This is a connector verification post from the internal content distribution pipeline.
```

Required proof:

- Credential item exists in 1Password.
- Postiz channel is connected.
- n8n is not inventing copy or destination.
- Delete path is known.
- Screenshot is captured.
- Platform URL is recorded.
- Automation is paused after the test.

## Refusal Inbox

Create one refusal record for any blocked action:

```json
{
  "ts": "2026-06-05T00:00:00-04:00",
  "platform": "example",
  "action": "create-account",
  "status": "blocked",
  "reason": "captcha-or-2fa",
  "nextHumanAction": "David must complete the prompt manually.",
  "screenshotPath": null
}
```

## Postiz / n8n Flow

```text
Website ledger
  -> social package
  -> signed manifest
  -> n8n policy gate
  -> Postiz draft or schedule
  -> David approval seam
  -> public dispatch
  -> receipt and metrics capture
```

Postiz owns the internal channel and calendar UI. n8n owns workflow transitions. The website ledger owns canonical content and approvals.

## ADHD Review

### Wide Set

- Credential inventory gate `[N6 V9 F10]`
- Canary brand-account lane `[N7 V8 F9]`
- Signed publishing manifest `[N8 V8 F10]`
- Refusal inbox for unsafe prompts `[N7 V9 F9]`
- Honeytoken accounts `[N8 V5 F6]`
- Short-lived 1Password leases `[N8 V6 F7]`

### Converge

- Credential inventory gate: required because account work is unsafe without custody.
- Canary brand-account lane: proves connectors without risking David's personal identity.
- ★ Signed publishing manifest: lets n8n and Postiz move approved work without inventing copy or destinations.
- Refusal inbox: prevents automation from grinding against human/security prompts.

### Traps

- Signing up everywhere tonight: creates credential and moderation debt before the pipeline is ready.
- Public test posts on personal accounts: proves the wrong thing while risking trust.
- Making Postiz public: exposes a control plane nobody but Dave needs.
- Letting n8n approve content: erases the decision seam.

## PIE-CI Review

### P — Purpose
Score: ✅
Notes: This file owns one concern: social account onboarding governance.

### I — Interface
Score: ✅
Notes: Gates, item shape, test policy, and refusal format are explicit.

### E — Encapsulation
Score: ✅
Notes: Secrets remain in 1Password; manifests carry references and approvals, not raw credentials.

### C — Connection
Score: ✅
Notes: Connections between website ledger, n8n, Postiz, and platforms are narrow.

### I — Implementation
Score: ⚠️
Notes: Credential custody exists. Account creation, provider channels, and canary connector tests remain manual blockers.

## Merge Decision

Pass for governance. Block public posting until canary account setup, channel connection, delete-path proof, and explicit approval are complete.

## Core Judgment

Does this reduce the surface area of the next change?

Answer: Yes. It turns social account setup into a repeatable ceremony with explicit custody, test, and refusal states.
