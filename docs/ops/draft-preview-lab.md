# Draft Preview Lab

Generated: 2026-06-05

## Purpose

Create a logged-in website area where unpublished content can be finished,
reviewed, imaged, narrated, scheduled, and syndicated before anything public is
published.

## First Screen

The draft lab should show a full-screen content calendar and a backlog table.

Each article row should expose:

- title
- series
- status
- website preview URL
- image status
- audio status
- social teaser status
- syndication status
- scheduled release date

## Article Review Screen

The article review screen should show:

- rendered article preview
- source Markdown editor
- image variants side by side
- approved hero and inline image slots
- audio script preview
- audio generation status
- teaser candidates for LinkedIn, X, Reddit, Medium, DEV, Hashnode, HackerNoon, DZone, and Substack
- approval buttons that write receipts instead of publishing directly

## Public Safety

The draft lab is a decision surface. It should not publish public content by
default.

Safe defaults:

- do not publish
- do not submit editorial review
- do not post social
- do not send Substack email
- do not spend image or audio credits without an explicit spend flag

## Next Build Step

Add a private route such as `/admin/content` or `/draft-lab`, protected by a
simple login. It should read content ledger, audio manifests, image manifests,
and schedule artifacts from the deterministic pipeline instead of inventing
state in the browser.

## Current Goal (2026-06-11)

Goal: finish the Draft Lab image-review experience so every image variant can be
generated, reviewed, and versioned without leaving selection state on page
reload.

Acceptance criteria:

1. Requesting images from a specific placement writes explicit worker feedback
   to the slot card and never requires guessing if generation started.
2. Image generation progress emits SSE terminal events that are visible in the UI
   (`queued`, `processing`, `completed`, `worker-error`) and includes the request
   identifier.
3. Image decisions are immediate and visible in-place; approved/rejected status
   persists when returning to the page.
4. Selecting a replacement image updates only that slot without forcing a full
   page jump or resetting unrelated cards.
5. The Draft Lab image state endpoint returns combined `images + requests +`
   worker observation for deterministic re-render and polling.
