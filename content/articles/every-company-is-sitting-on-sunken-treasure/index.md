---
title: "Every Company Is Sitting on Sunken Treasure"
description: "The cost of the dive just dropped by 90%. Every company has one. A cancelled project with thousands of hours baked in. A codebase nobody wants to touch because the people who..."
publishedAt: "2026-04-02"
status: "published"
sourcePlatform: "linkedin"
sourceUrl: ""
canonicalUrl: "https://davidmieloch.com/blog/every-company-is-sitting-on-sunken-treasure"
series: "AI Factory"
tags: ["ai", "engineering", "legacy-code", "agents"]
coverImage: "/blog/every-company-is-sitting-on-sunken-treasure/images/treasure-hero.png"
---

![treasure hero](/blog/every-company-is-sitting-on-sunken-treasure/images/treasure-hero.png)

## The cost of the dive just dropped by 90%.

Every company has one. A cancelled project with thousands of hours baked in. A codebase nobody wants to touch because the people who built it left and the architecture aged out of anyone's comfort zone. A repo that shows up in onboarding docs with a note that says "ignore this."

It's not that the work was bad. It's that the cost of understanding it, updating it, and integrating it was always higher than starting over. So it sits there. Like a shipwreck. Everyone knows there's something on the ocean floor. Nobody's going to fund the dive.

That math just changed.

---

## What Sunken Treasure Looks Like

You know it when you see it:

- A three-year project that got deprioritized when priorities shifted
- A component library nobody maintained after the lead left
- Forked dependencies that drifted so far from upstream nobody knows what was changed or why
- A Storybook instance with hundreds of broken stories
- Services that work but haven't been touched in two years because everyone's afraid of what happens if they do

This isn't technical debt. Technical debt implies someone is making payments. This is technical abandonment. The payments stopped. The repo is just sitting there, compounding in the wrong direction.

Every company has at least one. Most have several.

---

![treasure archaeology](/blog/every-company-is-sitting-on-sunken-treasure/images/treasure-archaeology.png)

## The Economics of Recovery

The reason these projects stay dead is simple: the recovery cost never penciled out.

To bring a cancelled project back, you need someone who understands the old architecture, the current architecture, and the gap between them. That person either doesn't exist anymore or has moved on to other work. You'd need to pull a senior engineer off active projects for weeks, maybe months, just to produce an assessment. Not a fix. An assessment.

Nobody authorizes that. The opportunity cost is too high. So the treasure stays underwater.

But here's what changed: AI can do the archaeology. And it turns out legacy codebases are where AI has a surprising advantage.

For a while the argument was that AI could handle greenfield projects but would choke on messy, illogical legacy code. The real-world spaghetti that humans wrote under deadline pressure with inconsistent patterns and no documentation. That argument sounds reasonable until you think about what legacy recovery actually requires.

It's not creativity. It's not designing something new. It's reading. Tracing. Diffing. Recognizing patterns across tens of thousands of lines of code that no single person can hold in their head at once. It's figuring out what a forked dependency changed three years ago when nobody left notes. It's mapping every environment variable across 14 services. It's reading an entire library and telling you which 180 lines are custom.

Those are research skills, not invention skills. And research is where AI is strongest.

A fresh engineer joining a legacy project needs weeks to ramp up. They have to build a mental model from scratch, and they can only hold so much of it at once. They get frustrated. They make assumptions. They miss connections between services because they read one last Tuesday and the other today and the details have already faded.

AI reads the entire codebase in minutes and doesn't forget what it saw on line 200 when it gets to line 50,000. It doesn't carry the political baggage of who wrote what or why. It doesn't get demoralized by spaghetti. It just traces the connections.

And here's the part the luddite argument missed completely: legacy projects are written in older languages with older frameworks. jQuery. Angular 1. Backbone. Class-based React. These aren't cutting-edge patterns with sparse documentation. They're some of the most thoroughly documented technologies in AI training data. The research needed to understand a 2018 React codebase is a solved problem. The AI has seen thousands of projects exactly like it.

Legacy code is hard for humans because it requires patience, context retention, and deep familiarity with outdated patterns. Those happen to be things AI is better at than any new hire you could bring in.

That doesn't mean AI understands the business logic. It doesn't know why someone made a weird architectural choice in 2019. But it can map every connection, identify every deviation, and produce an assessment that would take a senior engineer weeks. In an afternoon.

---

## A Saturday Experiment

I tried this on a weekend. Low stakes. A cancelled project I'd worked on years ago. Complex internal application, multiple apps, shared component library in a separate repo, forked dependencies locked to old framework versions.

If the experiment went nowhere, I'd have a normal Saturday. Play some StarCraft. Make dinner. Forget about it.

By 2pm I had four research documents totaling thousands of lines. Complete architecture diagrams. Every environment variable catalogued. A full inventory of what existed and what state it was in.

The things we thought we knew about this codebase? Mostly wrong.

Those "thousand broken Storybook stories" everyone remembered? 123. Still a lot for a person to fix manually. For AI running in parallel? Maybe 20 minutes.

That forked dependency everyone assumed was hopelessly diverged? 180 lines of custom code. That's it. The AI read the entire library, diffed it against upstream, and identified exactly what had been changed and why. Something I'd personally attempted and failed to do.

By 4pm I was playing StarCraft while the agents wrestled with webpack in another window. I'd check in between games when something needed a decision.

By dinner, the scope had expanded from "assess this cancelled project" to a full recovery plan with hour estimates, dependency chains, and rollback strategies.

My girlfriend was waiting on a dinner decision. The plan kept growing.

At 8:36pm I launched the execution engine and went to have pasta.

---

![treasure dive](/blog/every-company-is-sitting-on-sunken-treasure/images/treasure-dive.png)

## The Dive

The execution ran for three days.

Not because I was sitting there driving it. I'd check in between other things. Morning coffee, I'd read the logs. Between StarCraft games, I'd glance at the dashboard. Before bed, I'd see what it was stuck on, make a decision, let it continue.

The agents picked up tasks, completed them, hit walls, routed around problems, and kept going. When they needed a judgment call, they stopped and waited. Most of the time, they didn't need me.

What they produced was genuinely surprising.

The front-end migration came out close. Right colors. Right layout patterns. Components that matched what designers would have expected, despite no one giving explicit direction on aesthetics. The agents had absorbed enough context from the existing codebase to extrapolate what "right" looked like.

But the real value wasn't the code it generated. It was the map it drew.

Every connection catalogued. Every dependency traced. Every drift from upstream identified. The institutional knowledge that had been slowly evaporating as people moved on to other projects, reconstructed from the code itself. That archaeological work alone would have taken months of a senior engineer's time. The AI did it as a side effect of trying to migrate the code.

---

## What It Didn't Do

I want to be honest here: the three-day run didn't finish the project.

It completed maybe 40% of the migration plan before I ran out of AI credits. There's something absurd about that sentence. "I had to stop my autonomous software archaeology expedition because I exceeded my AI budget." A year ago, that problem didn't exist. Neither did the capability.

And even the 40% that completed revealed the problem was bigger than anyone had estimated. Every migrated component uncovered three more that needed attention. Every fixed dependency exposed assumptions baked into other services. The scope kept growing because the AI was finding connections nobody remembered existed.

That's a different kind of valuable than "project complete." I now know exactly what's down there. Exactly what it would take. And I have more architectural clarity about this codebase than existed at any previous point in its history, including when people were actively working on it.

The treasure isn't fully recovered. But the map is better than anything we had when the project was alive.

---

## What Three Days Taught Me

Running an execution engine for 72 hours straight, longer than I'd ever attempted, taught me things that months of planning never did.

Agents at 2am don't know what agents at 6pm discovered. I had to build memory persistence, a system that pulls relevant failures and decisions from previous runs before any new agent starts. Without it, they repeat each other's mistakes.

A 7-phase plan doesn't work for autonomous execution. Each phase needs to be broken into tasks small enough for a single agent context window, with explicit success criteria. My 7 phases expanded to 299 individual checkpoints.

When something fails, the system has to mark it for retry before moving on. Skipping a broken step and continuing downstream creates orphaned dependencies. I learned this when a migration left half the consuming services pointing at files that didn't exist.

None of this is in any tutorial. It's the kind of knowledge you only get from actually running these systems long enough to watch them fail in ways you didn't anticipate.

---

![treasure map](/blog/every-company-is-sitting-on-sunken-treasure/images/treasure-map.png)

## Why This Matters Beyond My Weekend

The specific project doesn't matter. What matters is the pattern.

Every organization has work that was abandoned not because it was bad, but because the economics of recovery didn't justify it. The knowledge was too dispersed. The codebase was too old. The people who understood it had moved on.

AI changes the recovery cost, not the recovery value. The treasure was always worth something. The dive was just too expensive.

What used to require a senior engineer spending weeks reading unfamiliar code now requires pointing an AI at a repo and waiting a few hours. The assessment that nobody would authorize at human cost becomes a Saturday experiment at AI cost.

This doesn't mean every cancelled project should be recovered. Some were cancelled for good reasons. But the decision should be based on the value of the work, not the cost of understanding it. For the first time, those two numbers aren't locked together.

---

## The Uncomfortable Implication

Most organizations don't have an inventory of their sunken treasure. Nobody's tracking the cumulative value of abandoned work because it was never worth tracking. The recovery cost made it irrelevant.

That assumption is now wrong, and most companies haven't updated it yet.

Somewhere in your organization's repos, there are thousands of hours of work sitting in cancelled projects, deprecated services, and abandoned prototypes. Some of it is genuinely worthless. Some of it solves problems you're currently paying people to solve again from scratch.

The cost of finding out which is which just dropped by an order of magnitude.

The treasure is still down there. The dive just got cheap.
