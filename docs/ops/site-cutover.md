# davidmieloch.com Site Cutover

## Current State

- The app is a Next.js site in `david-monorepo`.
- `vercel.json` still defines the Vercel build/install commands.
- No Cloudflare or Wrangler deployment config is currently committed in this app.
- `davidmieloch.com` must not be repointed until the replacement host is reachable over HTTPS and email routing is verified.

## Desired State

- `davidmieloch.com` serves the canonical blog/archive from the new host.
- Cloudflare remains the DNS control plane.
- Email delivery continues to reach David's Gmail and the opportunity triage path.
- Vercel remains available as rollback until the new host has survived a full verification window.

## Staging First Recommendation

Use a staging hostname before changing the apex domain:

```text
staging.davidmieloch.com -> singularity/outbound host
```

Verify:

```bash
curl -I https://staging.davidmieloch.com
curl -I https://staging.davidmieloch.com/blog
curl -I https://staging.davidmieloch.com/rss.xml
curl -I https://staging.davidmieloch.com/sitemap.xml
```

Expected:

```text
HTTP/2 200
```

## DNS Records to Inspect

Before any mutation, record the current values:

```text
A davidmieloch.com
AAAA davidmieloch.com
CNAME www
MX davidmieloch.com
TXT davidmieloch.com
TXT _dmarc
TXT selector/domain keys for DKIM
Cloudflare Email Routing destination/rules
```

## Cutover Safety Gates

Do not change apex DNS until all are true:

- New host serves HTTPS successfully on staging.
- `/blog`, a canonical article, `/rss.xml`, and `/sitemap.xml` work on staging.
- Contact form test succeeds on staging.
- Email forwarding is verified through Cloudflare or the chosen mail provider.
- Current DNS records are exported for rollback.
- Cloudflare TTL has been lowered to 300 seconds before cutover.

## Action-Time Confirmation

DNS mutation requires explicit confirmation in this form:

```text
Confirm DNS cutover:
- Zone: davidmieloch.com
- Record(s): A/AAAA/CNAME listed here
- Old value(s): listed here
- New value(s): listed here
- Rollback value(s): listed here
```

No agent should mutate Cloudflare DNS without that confirmation.

## Rollback

If the new host fails:

1. Restore previous A/AAAA/CNAME records.
2. Keep MX/TXT records unchanged unless the failure is email-specific.
3. Purge Cloudflare cache for affected routes.
4. Verify `https://davidmieloch.com` returns the old site.
5. Verify email delivery still reaches Gmail.

## Post-Cutover Verification

```bash
dig davidmieloch.com
dig www.davidmieloch.com
dig MX davidmieloch.com
curl -I https://davidmieloch.com
curl -I https://davidmieloch.com/blog
curl -I https://davidmieloch.com/rss.xml
curl -I https://davidmieloch.com/sitemap.xml
```

Then submit one marked contact-form test and one direct domain email test.
