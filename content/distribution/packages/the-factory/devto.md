---
platform: "devto"
mode: "api-draft-or-manual-copy"
post_mode: "full-mirror"
title: "The Factory"
canonical_url: "https://davidmieloch.com/blog/the-factory"
tracked_url: "https://davidmieloch.com/blog/the-factory?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-factory"
source_slug: "the-factory"
generated_at: "2026-05-18T21:41:27.864Z"
canonical_support: "supported"
approval_required: true
public_publish_allowed: false
---

# The Factory

## Posting guidance

Developer-facing mirror draft with canonical URL preserved.

- Do not publish without David approval.
- Preserve canonical URL: https://davidmieloch.com/blog/the-factory
- Record the final platform URL back in content/distribution/platform-ledger.json.

## Copy

![a2 hero conceptual](/blog/the-factory/images/a2-hero-conceptual.png)

## The Productivity Trap

In the 1880s, factories started replacing steam engines with electric motors. On paper, it was a revolution. Electric motors were smaller, cleaner, more precise, and individually controllable. The productivity gains should have been immediate and obvious.

They weren't. For thirty years, nothing much changed.

**The reason was simple:** factory managers put the new motors exactly where the steam engines had been. Same floor layouts. Same belt-and-pulley power distribution. Same arrangement of machines. They had better tools. They had the same workflow.

![pasted image 20260417161200](/blog/the-factory/images/pasted-image-20260417161200.png)

The productivity leap came in the 1920s, when a new generation of managers rebuilt factory floors from scratch around what electric motors actually made possible: individual motors on each machine, layouts organized around the flow of materials rather than the routing of mechanical power. They didn't augment the old factory. They replaced it.

Software is at that same inflection point now.

---

## The Workflow We Inherited

![a2 whatfactory digital](/blog/the-factory/images/a2-whatfactory-digital.png)

The way software gets built today has a recognizable shape. A developer works locally, writing code and running tests. When a piece of work is ready, they push it to version control and open a pull request: a formal proposal to merge their changes into the shared codebase.

Other developers read the diff. They leave comments. The original developer responds, makes changes, pushes again. A CI pipeline runs automated tests. Someone with merge rights approves it. The code lands.

This workflow was designed for humans. It assumes a developer who needs context, who reads prose, who can be interrupted and asked a question, who reviews code by scrolling through a diff. It's a good workflow. It's been refined over decades.

It's also the steam engine layout.

---

## What the Factory Actually Is

![a2 factory pipeline](/blog/the-factory/images/a2-factory-pipeline.png)

The factory thesis is different: design the workflow from scratch around agents, and compress time in ways that weren't previously possible.

A well-written product requirements document goes in. Planned, implemented, tested, delivered code comes out. Planning, architecture, implementation, QA, code review: agents handle all of it. The human isn't in the loop for any individual task. The human is the architect of the system that handles those tasks.

I'm not the only one building this. Three engineers at StrongDM already run a factory that works this way. The system takes specifications written in markdown, builds the software, tests it against behavioral scenarios, and produces shippable artifacts. The humans approve outcomes.

Projects that would have taken a year and five to ten engineers can be done over the course of days if agents work autonomously off a well-specified PRD. That's not a marginal improvement. That's a different category of output.

The PR still exists. Version control still exists. Code review still exists. But every participant is an agent with a defined role, a persistent memory of the work they've seen, and a job that doesn't end at 5pm.

---

## The Hard Problem: Trust

When you remove yourself from the individual tasks, the engineering problem changes. It's no longer "how do I write better code?" It becomes: what does a system look like where you can trust agents, and their social outcomes, to produce working code of the quality required to accomplish the goal?

At 10,000 lines of code overnight, you cannot review it. At 300,000 lines across a month, the theater of pretending otherwise starts to feel pathetic.

Trust at scale is the factory's actual engineering challenge. Everything else is in service of that.

---

## The Governance Layer

![a2 governance crystals](/blog/the-factory/images/a2-governance-crystals.png)

Trust starts before the agent writes a line.

The factory runs three levels of plans. Phase plans map what needs to be built across the arc of a feature. Project plans situate the feature in the larger system. Execution plans tell the agent exactly where to go and what to do, step by step.

The execution plan is the key one. An agent following an execution plan isn't thinking and doing. It's doing. The thinking already happened upstream. This matters because thinking is expensive. Doing is cheap. When you separate them, you use the right tool at the right moment.

The same principle applies to how agents receive instructions. The difference between "keep the schema financially coherent" and `"unit_cost": "Decimal"` isn't style. One requires inference. The other states the answer. Prompts at factory scale aren't requests. They're specifications.

---

## The Social Layer

Code generation is a solo act. Software factories are social systems.

### The Skeptic

Quality assurance at factory scale has a specific enemy: agents that fake passing tests. If the agent writing the code is also writing the tests, the incentive to fake is structural.

The factory needs a skeptic whose job is to catch the theater. That skeptic writes the failing tests before the feature exists, before the builder agent has written a line. You can't fake a test written by someone else before you existed.

The loop that follows is structured social interaction. The builder implements until the tests pass. The skeptic reviews: were the tests altered? do they actually test the feature? Mutation testing finds the hollow assertions. Issues become threads, threads become resolutions, resolutions become the record.

When priority work stalls, the system can force a social event: a capped iteration that drives the work to completion. The loop is a governance mechanism, not a retry.

### Roles With Memory

The factory's agents have specializations and they accumulate what they've seen.

The security reviewer builds a catalog of patterns across every PR they touch. When they review new code, they're comparing it against that catalog. That compounds in a way a scanner doesn't.

The architecture reviewer watches for drift from the structural rules and established patterns. The CI agent owns the pipeline: when it's red, its job is to get it green, not to report it. These aren't task assignments. They're identities.

### The Platform

The social layer needs infrastructure designed for it. The factory runs its own version control: agents post reviews, open threads, request changes, resolve conversations, and trigger downstream workflows as native participants. Standard platforms weren't built with agents as first-class citizens.

---

## The Memory Layer

![a2 memory growth](/blog/the-factory/images/a2-memory-growth.png)

A factory that doesn't learn is just expensive repetition.

Significant decisions, caught failures, discovered patterns: all of it becomes memory. Not as a side effect. As an explicit output. The system compounds.

Every application the factory produces follows the same meta-structure: the same directory patterns, the same module boundaries, the same routing conventions. Memorize the generalized structure once, and you can navigate any application built that way. You don't read 300,000 lines. You recognize the shape and know where to look. It's like growing crystals: the rules are simple, but the structures they produce are consistent and self-similar at every scale.

The structural rules are strict enough that cheap models can follow them. That's by design. The factory's output isn't clever. It's correct, verifiable, and navigable.

Those three layers together are my best answer to the trust problem. Whether they hold when pricing changes is what I find out next.

---

## Building While the Materials Are Free

![a2 postsubsidy photorealistic](/blog/the-factory/images/a2-postsubsidy-photorealistic.png)

Right now, AI subscriptions are subsidized. Flat-rate, high-cap usage. That window is closing.

Three paths are emerging for when it does:

**Use frontier models less.** Structured prompts as specifications let cheaper models produce what expensive models produce with prose instructions. The ensemble pattern from Part 1 (cheap models explore, premium model synthesizes) is already built for a more expensive world.

**Run local.** Apple's unified memory laptops now ship with up to 128GB of RAM, enough to run capable models directly. The machines are $5,000 and up. Not cheap, but a one-time cost, not a subscription that can reprice.

**Self-host open source.** Models like DeepSeek, Qwen, and Google's Gemma 4 are open source. Run the weights on rented GPU clusters. RunPod and similar providers make this accessible. Full control of your data. Nobody can reprice open weights.

The execution plans, the agent roles, the memory system: all of it survives whatever pricing environment comes next. None of it depends on cheap frontier tokens. It was built during the subsidy window, and it runs on whatever power is cheapest.

This is my best attempt at building something that survives. Whether that's enough, I'll find out.

Build the factory while the materials are free. Run it on whatever you can afford.

---

*This is Part 2 of a series. [Part 1: The Golden Hammer]() covers the ensemble pattern and synthesis methodology.*

---

Read the canonical version and related series on davidmieloch.com.

Read the canonical version: https://davidmieloch.com/blog/the-factory?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-factory
