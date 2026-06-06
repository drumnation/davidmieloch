# Email Opportunity Routing

## Goal

Do not lose legitimate job, consulting, press, or collaboration opportunities during the site move.

## Routing Model

```text
Inbound opportunity email
  -> domain mail routing / contact form
  -> durable lead table or alert webhook
  -> CRM sync
  -> newsletter opt-in sync when explicitly checked
  -> David's Gmail
  -> opportunity triage destination
  -> agent notification
  -> agent starts a thread with Dave when the opportunity looks legitimate
```

## Current App-Level Contact Path

The contact API route can still send direct email through SMTP:

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
CONTACT_FORM_RECEIVER_EMAIL
```

The route sends configured SMTP submissions to `CONTACT_FORM_RECEIVER_EMAIL` and sets `replyTo` to the sender's email.

Lead capture no longer depends on SMTP alone. Configure at least one durable intake sink:

```text
SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY
LEAD_ALERT_WEBHOOK_URL
```

Optional downstream sync:

```text
LEAD_SOURCE=davidmieloch.com
TWENTY_API_BASE_URL
TWENTY_API_KEY
MAILERLITE_API_KEY
MAILERLITE_GROUP_ID
```

`TWENTY_BASE_URL` is also accepted as an alias for `TWENTY_API_BASE_URL`.
Set `TWENTY_CREATE_OPPORTUNITIES=false` if the Twenty workspace does not yet
have the opportunity fields/stages needed for automatic opportunity creation.

The user-facing form should succeed when the lead is captured in the table or
sent through the alert webhook. Twenty and MailerLite are replayable downstream
systems, not the only copy of the lead. The Twenty sync creates the basic CRM
person first, then best-effort company/opportunity context. If richer Twenty
fields are missing, the contact form should still preserve the lead through the
durable intake/email path.

## Recommended Destinations

Use a destination group, not one hidden mailbox:

```text
CONTACT_FORM_RECEIVER_EMAIL=david-primary-gmail-or-forwarding-alias
OPPORTUNITY_TRIAGE_EMAIL=agent-visible-triage-alias
```

The site can later send job/consulting topics to both destinations. Until that code is changed, route the receiving mailbox or Cloudflare Email Routing rule to both Gmail and the triage alias.

## Opportunity Classification

Treat these topics as opportunity-sensitive:

- Job Opportunity
- Freelance / Consulting
- Press / Speaking
- Partnership or collaboration language in the message body

For those messages, agents should create a human-facing thread with:

```text
Subject/source
Sender identity
Company/domain
Opportunity type
Deadline/timing
Compensation or budget if present
Why it might be legitimate
Recommended next response
```

## Email Routing Cutover Rules

- Preserve MX records unless the new mail provider is already verified.
- Preserve SPF, DKIM, and DMARC TXT records unless replacement values are known.
- Test new routing on a subdomain or staging alias before changing primary routing.
- Send a marked test message after every routing change.

## Action-Time Confirmation

Changing email routing requires explicit confirmation in this form:

```text
Confirm email routing change:
- Domain/alias:
- Current destination(s):
- New destination(s):
- Test recipient:
- Rollback:
```

No agent should mutate MX, TXT, Cloudflare Email Routing, Gmail filters, or forwarding destinations without that confirmation.

## Tests

Use a unique marker:

```text
[BG-OPPORTUNITY-ROUTING-TEST yyyy-mm-dd hh:mm]
```

Verify:

- Message arrives in Gmail.
- Message arrives in the agent-visible triage destination.
- Attachments survive if sent through the contact form.
- Reply-To is the external sender, not the SMTP sender.

`pnpm contact:check` writes a ROM heartbeat observation before any send test. A failed check still records a `FAILURE` event so the opportunity-routing observer is not silently dead.

Twenty has a separate probe:

```text
pnpm contact:twenty:check
```

That command is read-only. It verifies whether the Twenty base URL/API key are
configured and whether the metadata API is reachable. To create a marked test
person in Twenty, run:

```text
pnpm contact:twenty:check -- --send
```

Only run the send mode when a `BG Twenty routing test ...` person may be created
in the CRM.
