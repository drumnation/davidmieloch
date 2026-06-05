# *Or: What happens when the cost of the dive finally drops*

I'm doing something this weekend that I never would have attempted in a million years.

Not because I couldn't. Because it would have been stupid to try.

## The Setup

Here's the setup: I work at a company that makes specialized display hardware. About six years ago, we started building an ambitious tool - think "Photoshop in the browser" but for our proprietary content format. We deliberately built a specialized design tool for our signage hardware, our scripting language, and our content management platform. It had to be custom because the output format was custom. Three years in, we'd essentially built a full design application from scratch.

I joined four years ago to replace the original lead. The codebase was a "learn React" project that had grown into production software. Everyone on the team was a backend developer who'd never touched React before. The architecture was already groaning under its own weight.

It took us two years just to rewrite it into something we could actually add features to.

We built our own monorepo tooling before pnpm workspaces were a thing. We forked upstream dependencies and drifted so far from the original that we couldn't figure out what we'd even changed. We had a Storybook instance with hundreds of stories that broke when we tried to upgrade and nobody had time to fix. No tests. Multiple apps. A shared component library that lived in a separate repo because we didn't know better.

Six years. Five developers. Thousands of components.

Then the project got deprioritized. External dependencies fell through. Management wasn't sure who the product was even for anymore. The whole thing just... stopped.

And now it sits there. Getting older. The React version falling further behind. The patterns becoming more alien. The institutional knowledge fading as people move on to other things.

Classic sunken treasure.

## The Metaphor

Here's what I mean by that:

Sunken treasure isn't valuable because it's gold. It's valuable because the cost of the dive was always higher than the value of the recovery.

The ship goes down. Everyone knows there's something down there. But the equipment, the expertise, the risk, the time - it never pencils out. So it just sits on the ocean floor, getting buried deeper.

That's what happens to cancelled projects in software. The code doesn't disappear. It's right there in the repo. But the cost of understanding it, updating it, integrating it - it's underwater. Nobody's going to authorize a two-year archaeology expedition for a project that got cancelled.

Until the cost of the dive changes.

## The Experiment

Saturday. No deadlines. Nobody expecting anything from me.

I decided to run an experiment: what if I just... tried? Not a real project. Not a commitment. Just pointed my AI systems at this entire codebase - the main app, the component library, the forked dependencies, the 14 microservices it depends on - and asked: what would it take to bring this back?

If it failed, whatever. It's Saturday. I'd play some StarCraft, make dinner, forget about it.

By 2pm I had four research documents totaling thousands of lines. Complete architecture diagrams. Every environment variable catalogued and categorized. A full inventory of what existed and what state it was in.

The things we thought we knew? Mostly wrong.

Those "thousand broken Storybook stories" that everyone remembered? 123. Still a lot for a human - maybe 60-120 hours of manual work. For AI? Trivial. Parallelizable. Maybe 20 minutes.

That forked dependency we couldn't understand - the one that locked us to React 16 because we'd drifted too far from upstream? 180 lines of custom code. That's it. The AI read the entire library, diffed it against upstream, and identified exactly what we'd changed and why. Something I'd personally attempted and failed to do.

The "two year project" to migrate this into our modern monorepo? The AI produced a 7-phase plan with hour estimates totaling 51 hours. With RICE scoring. With dependency chains. With rollback strategies.

By 4pm I was playing StarCraft while Claude wrestled with webpack in another window.

## Meanwhile

The thing about Saturday experiments is they have to compete with Saturday.

I glued a stool back together that's been broken for months. Made tea. StarCraft was calling.

So I played. The AI agents were running in another window - I'd check between games when something needed a decision. Hit an npm routing issue with packages we'd published years ago. Pointed it at the local cache, told it to route around. Went back to my game.

This is the weird part: I'm running what would normally be a 15-20 developer project for 6-12 months. By myself. On a Saturday. While actively trying to relax.

The stakes were intentionally low. If the whole thing crashed, I'd have learned something and still had a decent weekend. But it kept working. Every time I checked back, more progress.

## The Scope Creep

By 6pm, the scope had expanded.

What started as "recover this cancelled project" had evolved into something bigger. As I refined the plan with AI assistance, I kept remembering things. The seeding service that was absurdly over-engineered. The admin tools scattered across three different repos. The whole architecture that had accumulated over a decade of decisions made under pressure.

By 6:37pm I had an 18-section PRD covering not just the original recovery, but a complete consolidation of our entire legacy stack. Permission systems. Feature flag architecture. A plugin-based admin panel. State management patterns. Storybook organization that could scale infinitely.

I didn't write 850 lines of technical specification. I directed its creation - nudging, correcting, remembering details, saying "no, that's wrong, here's what actually happened." The AI did the writing. I did the thinking.

My girlfriend was waiting on a dinner decision. The PRD kept growing.

## The Handoff

At 8:36pm, I launched the execution engine and went to dinner.

The plan was 51 hours of estimated work across 7 phases. The SQLite ledger was tracking responsibility. The task runner was processing the dependency tree.

I had pasta.

---

That's the real paradigm shift. Not "AI can code." But: what would you attempt if the cost of trying dropped by 90%?

I'm starting to find out.

---

*Part 2: *[three-day-run.md](./three-day-run.md)* - What happens when you let an autonomous execution engine run for 72 hours straight.*
