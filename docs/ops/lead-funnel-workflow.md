# Lead Funnel Workflow

## Purpose

Turn site attention into observable relationship state without making Twenty,
email, or marketing automation the only copy of a lead.

## Default Shape

```text
Visitor form submit
  -> /api/contact
  -> lead intake receipt
  -> durable lead sink
  -> CRM sync
  -> newsletter sync when consent is explicit
  -> email/agent alert fallback
  -> follow-up queue
```

## Current David Mieloch Site

Public signup surfaces:

- Homepage positioning band: `placement=homepage-positioning-band`
- Blog index top: `placement=blog-index-top`
- Blog index after featured essays: `placement=blog-index-after-featured`
- Article footer: `placement=article-footer-<slug>`

All signup blocks submit:

```text
topic=Newsletter Signup
newsletterOptIn=true
message=Newsletter signup from <placement>. Consent: explicit form submit.
```

The same route also handles direct contact form submissions. Twenty and
MailerLite are downstream sinks; the form should still succeed when at least one
required durable intake sink or SMTP fallback captures the message.

## Environment

Required for durable lead capture:

```text
SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY
LEAD_ALERT_WEBHOOK_URL
```

Optional CRM/newsletter sinks:

```text
LEAD_SOURCE=davidmieloch.com
TWENTY_API_BASE_URL or TWENTY_BASE_URL
TWENTY_API_KEY
TWENTY_CREATE_OPPORTUNITIES=false # optional safety toggle
MAILERLITE_API_KEY
MAILERLITE_GROUP_ID
```

## Observability

Run before launch:

```text
pnpm contact:check
pnpm contact:twenty:check
```

Run only when a marked test person may be created in Twenty:

```text
pnpm contact:twenty:check -- --send
```

Every check writes ROM heartbeat observations so the check itself is observable.

## Twenty Access Boundary

Twenty should stay internal by default. Public website visitors should only hit
the site API, never the Twenty API directly.

If people outside Dave need Twenty access, expose only the Twenty web app behind
an explicit access boundary:

- dedicated `brain-garden.io` subdomain
- Caddy TLS route
- SSO or allowlisted access proxy in front of Twenty when possible
- Twenty workspace roles with least privilege
- rate limiting and request logging at the edge
- no direct public Postgres, Redis, worker, or internal API ports
- backups before migration
- synthetic login/API health checks after exposure

Before exposing any CRM GUI, ask:

```text
Does anybody but Dave need to touch this GUI?
```

If the answer is no or unknown, keep it internal.

## Reuse For We Learn Music

Create a separate brand/source mapping instead of reusing the David funnel:

```text
LEAD_SOURCE=welearnmusic.com
topic=Parent Signup / School Inquiry / Music App Feedback
Twenty organization/workspace: We Learn Music
newsletter group: We Learn Music audience
```

Keep the same deterministic spine: form submit, durable receipt, CRM sync,
newsletter sync, alert fallback, follow-up queue.
