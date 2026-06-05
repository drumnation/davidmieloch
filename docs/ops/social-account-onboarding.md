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

## Postiz Channel Capability Map

Observed on 2026-06-05 in the self-hosted Postiz `v2.21.8` UI.

Native channel types shown by Postiz:

- X
- LinkedIn
- LinkedIn Page
- Reddit
- Instagram via Facebook Business
- Instagram Standalone
- Facebook Page
- Threads
- YouTube
- Google My Business
- TikTok
- Pinterest
- Dribbble
- Discord
- Slack
- Kick
- Twitch
- Mastodon
- Bluesky
- Lemmy
- Farcaster
- Telegram
- Nostr
- VK
- Medium
- Dev.to
- Hashnode
- WordPress
- ListMonk
- Moltbook
- Whop
- Skool
- MeWe

Good first canary:

- Bluesky. Postiz asks for service URL, identifier, and password/app password.
- Mastodon. Postiz redirects to the selected instance login.
- Dev.to, Medium, and Hashnode. Postiz asks for an API key.

Connected proof:

- Dev.to is connected in Postiz as `David Mieloch`.
- Postiz integration id: `cmq0w8mk40001nz8648id4dck`.
- Credential reference: 1Password `Brain Garden` item `dev.to_api_key`.
- No public post was created during connector proof.

OAuth-app channels that need server-side provider credentials before connecting:

- LinkedIn and LinkedIn Page require `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`.
- Reddit requires its app credentials before OAuth can work.
- X, Facebook, Instagram, Threads, YouTube, Google Business, TikTok, Pinterest, and similar platforms need provider-specific app credentials.

Unsupported or unsuitable channels should not be forced into Postiz. Use the same deterministic content ledger, signed manifest, approval receipt, and metrics receipt, but route execution through the narrowest available adapter:

- Native platform API from the content pipeline.
- n8n workflow owned by Commander Data.
- Browser/manual package with screenshot and URL receipt.
- Future custom Postiz provider only if the integration becomes repeated enough to justify maintaining it.

Postiz is the calendar/channel substrate, not the only possible execution engine.

## LinkedIn Setup Path

Postiz supports LinkedIn natively, but the provider must be configured first.

1. Create a LinkedIn Developer app.
2. Add the required LinkedIn products and permissions for posting and organization posting.
3. Configure redirect URIs:
   - Personal profile: `https://social-davidmieloch.brain-garden.io/integrations/social/linkedin`
   - Page provider: `https://social-davidmieloch.brain-garden.io/integrations/social/linkedin-page`
4. Store the app client id and client secret in 1Password.
5. Add only references to the server deployment notes; never commit the secret values.
6. Set `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET` in the Postiz compose override or server environment.
7. Restart Postiz.
8. Connect LinkedIn from the Postiz Add Channel UI.
9. Keep all LinkedIn posting behind explicit David approval.

Current LinkedIn state as of 2026-06-05:

- Company Page: `https://www.linkedin.com/company/128373941/`
- LinkedIn Developer app id: `237440067`
- App name: `Singularity-Labs-Social-Scheduler`
- Client id: recorded in `content/distribution/social-account-inventory.json`.
- Client secret: generated in LinkedIn, but not yet stored in 1Password because the current CLI session is a read-only service account. Do not put this secret in git, shell history, chat, or docs.
- Added products: Share on LinkedIn; Sign In with LinkedIn using OpenID Connect.
- Redirect setup is blocked: LinkedIn rejects `https://social-davidmieloch.brain-garden.io/integrations/social/linkedin` even though Postiz confirms that route is correct and the URL returns 200 inside Brain Garden.

Redirect blocker:

```text
social-davidmieloch.brain-garden.io -> 100.71.79.54
```

That is the Tailscale/internal address for singularity-one. LinkedIn's Developer app validator treats it as an invalid redirect target. Keep the Postiz GUI internal. The next safe design is a narrow public callback-only `brain-garden.io` route or OAuth bridge that forwards only the two LinkedIn callback paths to Postiz. Do not expose the whole Postiz GUI unless Dave explicitly answers yes to: "Does anybody but Dave need to touch this GUI?"

Observed failure before configuration:

```text
https://www.linkedin.com/oauth/v2/authorization?...&client_id=&...
LinkedIn response: You need to pass the "client_id" parameter.
```

This means the LinkedIn provider exists, but its OAuth app credentials are missing.

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
