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
