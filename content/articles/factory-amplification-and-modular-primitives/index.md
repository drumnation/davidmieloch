---
title: "Factory Amplification and Modular Primitives"
description: "The factory's core move is to stop requesting compliance and start enforcing behavior at the infrastructure level. Slots, plans, and self-improving loops make agent work deterministic at scale."
publishedAt: "2026-05-19"
status: "published"
sourcePlatform: "linkedin"
sourceUrl: "https://www.linkedin.com/pulse/factory-amplification-modular-primitives-david-mieloch-rybue/"
canonicalUrl: "https://davidmieloch.com/blog/factory-amplification-and-modular-primitives"
series: "Factory Primitives"
tags: ["ai", "engineering", "agents", "factory", "self-improvement", "observability"]
channels: ["singularity-labs"]
commercialConcept: "Agent labor becomes deterministic infrastructure"
commercialSummary: "The factory turns repeated prompt workflows into upstream machinery, with planning, review, and improvement captured as durable slots."
singularityLabsCta: "If your agent workflow needs slots, plans, and observer loops, start with a Factory Sketch."
coverImage: "/blog/factory-amplification-and-modular-primitives/images/a1-orbital-factory.png"
---

# Factory Amplification and Modular Primitives

![Orbital factory](/blog/factory-amplification-and-modular-primitives/images/a1-orbital-factory.png)

## Machinery, Not Memory

![The sorcerer](/blog/factory-amplification-and-modular-primitives/images/a2-the-sorcerer.png)

The first stage looks like sorcery.

You're in a session with an agent, guiding it step by step. You remind it to check memory before it forgets. You catch the shortcuts. You push it back on course when it pattern-matches in the wrong direction. You repeat the same corrections session after session, teaching your preferences by hand. The quality depends entirely on your attention. The moment you stop narrating, things drift.

Over time you notice the same corrections keep surfacing. You start writing them down. You formalize the reminders into instructions, build the recurring patterns into your starting prompts. A workflow emerges: do this first, then check that, then run this before finishing. It works noticeably better. You've moved from casting spells to writing procedures.

But a new problem surfaces as the procedures get more complex.

The problem isn't the intent. It's the compliance model.

An agent has to *choose* to follow those instructions. All of them, in order, correctly, under whatever inference pressure it's under at that moment. An agent drifting toward the end of its context window, or pattern-matching to a shortcut that feels plausible, might skip a step. Not because it's being difficult. Following a long list of instructions is itself a non-deterministic act. The agent is making inferences about what to do at each stage, and inferences fail.

This is why sophisticated prompt workflows are the beginning of factory thinking, not an alternative to it. You've identified what should happen. You just haven't moved it out of the agent's inference process yet.

The factory's core move is to stop requesting compliance and start enforcing behavior at the infrastructure level. The factory has slots: defined positions in the pipeline where capabilities live permanently. The agents run on top of them. They never had the choice to skip them.

This shrinks the surface area where agent non-determinism can cause problems. The creative, judgment-dependent work still happens inside the agent: writing code, making architectural decisions, reviewing output. That stays non-deterministic because it has to. But the structural guarantees around that work get enforced by something that doesn't make inference errors.

The distinction isn't memory versus machinery. It's requested compliance versus enforced behavior. And at scale, only one of those holds.

![Compliance fork](/blog/factory-amplification-and-modular-primitives/images/a3-compliance-fork.png)

---

## Everything Upstream

What goes into those slots is where the factory gets its character.

The preferred primitive is a CLI. CLIs are simple, stateless, and cheap: no process to manage, no server to spawn, no protocol overhead. A CLI that compresses output, formats prompts, calls an external service, or writes to a shared registry is a piece of machinery the agent reaches for rather than behavior it has to reason through. As patterns emerge in agent workflows, the factory extracts them into commands. Instead of adding more instructions to a prompt, you build a CLI. The behavior becomes deterministic. Every agent gets the shortcut, and the shortcut never drifts.

MCPs are occasionally the right tool, particularly when multiple agents need to share state simultaneously. But running local MCP servers at scale reveals a specific problem in the logs: every agent connection spawns its own instance. Dozens of agents, dozens of duplicate processes, all running the same server in parallel. The architectural fix is to host MCPs in the cloud and have the whole factory share a single instance. One server, one source of truth. That works, but it's a solution to a problem CLIs don't create in the first place.

The same logic extends further up the stack. A memory server isn't something you prompt for; it's infrastructure the pipeline calls before the agent starts. A cloud reasoning layer for heavy computation isn't in the agent's instructions; it's in the path. These aren't things agents remember to use. They're things agents move through.

What actually ends up in those slots is where the concept earns its weight.

At some point I discovered that compact JSON prompts dramatically outperform prose for lower-cost models like DeepSeek and Qwen. The performance jump is significant enough to matter. Claude still works better with prose. They want different things.

Working through this manually creates a cognitive tax on every task. You have to remember the preference, consciously switch format based on which model you're routing to, and stay consistent across an entire session. In practice, you don't. There's too much else to track. You default to one style and leave performance on the table. Output compression works the same way: a tool sitting upstream of every harness benefits every agent, but only if you stop relying on anyone remembering to run it.

The factory handled both differently. The module that writes prompts detects the target model and generates the appropriate format automatically. Prose for Claude. Compact JSON for the others. Metaprogramming: the factory writing its own prompts, optimized per recipient. Compression sits upstream and runs on everything. What were consciously maintained practices became structural properties of the system.

That's what a slot is. Not a tool you remember to use. A place in the pipeline where a capability lives permanently.

The more interesting argument is about coordination between slots.

The prompt formatting layer, the compression layer, the model routing logic, the benchmarking loop, the research pipeline scanning for new optimizations: none of these run independently. They layer. They interact. The output of one becomes the input condition of another. A new discovery about prompt performance gets surfaced by the research pipeline, which generates a test, which runs against the benchmarking loop, which updates the prompt module if the test wins. The whole chain runs without a human deciding at each step whether to act on it.

No person working on individual sessions can coordinate that. Not because they lack the understanding. Because maintaining a dozen simultaneous, interacting optimizations consistently exceeds the bandwidth of conscious attention. It's not that the factory does it faster. It's that the factory is doing something the human structurally cannot maintain.

![Coordination clockwork](/blog/factory-amplification-and-modular-primitives/images/a4-coordination-clockwork.png)

The planning phase makes this concrete in a different way. It isn't just where you specify what to build; it's where you specify how execution will run. Each PR goes through a gauntlet: a customized sequence of review passes covering security, architecture, test coverage, and whatever else was determined appropriate for this type of work during planning. Multiple agents, each looking through a different lens, in a defined order, without a human queuing each one. The code output isn't predetermined. But the process that produces it is.

The planning system is itself a slot. Every time you notice something new that could be captured upstream, a review angle you hadn't formalized or a check you kept running manually, you update the planning system once. That update propagates to every future execution. You notice it once. It runs forever.

The input to that system isn't a document the human writes. A conversation happens: intent voiced, concerns raised, tradeoffs worked through. The lead agent compresses the entire exchange into a plan kernel: a structured intent artifact committed to the repo and queued for the factory to pick up. When the factory selects it, the planning workflow runs from the raw intent data and generates the full plan. The human doesn't need to review what comes out. Sometimes they still do. But the trend is toward less of that, not more.

This is the precondition for everything autonomous. A self-improvement loop can only run without a human in it if both planning and execution can be trusted to operate independently. The moment you can hand the factory a kernel of compressed intent and trust that it plans and executes correctly, the loop closes. The factory can identify an opportunity, generate a plan for it, execute the plan, and evaluate the result. All without waiting on a person.

The deeper value of mature planning is that it separates intelligence from work. Figuring out how to do something well is hard. Doing it, once figured out, is execution. A planning system that builds repeatable plans crystallizes the intelligence: the architectural decisions, the review sequence, the known failure modes, the edge cases: captured once, applied every time. Plans can grow in complexity indefinitely as new detail gets added. There is no real ceiling on how much can be pre-planned. And the more that gets pre-planned, the more execution becomes just doing. The work becomes reliable not because the agents got smarter, but because the plan already resolved what they would otherwise have had to infer.

There is a popular narrative that developer work is migrating toward detailed specification writing: as AI handles implementation, the human job becomes crafting increasingly precise instructions for it to follow. The factory is already past this. The conversation is the input. The planning system writes everything downstream. Some high-level judgment about direction remains human work. But the elaboration, the layering of detail, the technical breakdown: that is what the machine does. The spec-writing narrative extrapolates from the prompt workflow stage. The factory moved past it.

---

## The Self-Improving Stack

![Living codebase](/blog/factory-amplification-and-modular-primitives/images/a5-living-codebase.png)

That capacity for coordinated automation has a natural extension: turn it on the factory itself.

The factory recently crossed a threshold I've been working toward. I added multiple self-improvement loops.

At the base level, the factory builds and deploys software. One layer up, an observability system watches what the factory produces: errors, latency, cost signals, quality patterns. One layer above that, a loop reads from observability and generates plans to improve the factory. And above that, another loop improves the system that improves the factory.

The value isn't in any single loop. It's that each loop makes the others more effective. A better research pipeline finds better upgrade candidates. A better benchmarking loop evaluates them more accurately. The layers compound against each other, not just against the factory.

The formula is simple to describe: close the loop between observation and action, then apply the same pattern recursively. An academic paper gets published. A new library appears with significant adoption. A blog post describes a novel prompting strategy. The research pipeline surfaces any of these as potential capability upgrades. The improvement loop generates a plan to test one. If the benchmark shows improvement, the module is swapped in. The factory becomes incrementally better without a human deciding whether the improvement was worth the effort.

An engineer with some tools installed, running everything interactively, can benefit from the same paper, the same library, the same prompting strategy. But they have to notice it, evaluate it, and remember to apply it. The factory runs that as a process. Benchmarks it automatically. Deploys the winner.

What all of these loops are actually doing is growing the factory rather than maintaining it.

The codebase is the first living element. It grows in a shape. Test coverage, architectural consistency, error density, boundary health: these are signals that tell you whether the shape is right. You do not build a codebase to a finished state and stop. You tend it. You influence the direction of growth by what you attend to. An architectural decision that opens certain paths and closes others is less like construction and more like training a branch toward light.

The self-improvement loops apply the same logic recursively up every layer of the factory. Each loop watches the shape of the layer below it and makes passes designed to correct what it finds. The improvement system reads the factory's signals and generates proposals. The meta-improvement system watches the improvement system. At each level, the question is the same: is the shape healthy? Is it growing toward what it is supposed to become?

That question requires objective measurement to answer. Are the proposals the system generates actually good? Is the self-improvement loop creating work that achieves real goals, or optimizing toward proxies? The machinery can notice its own structural flaws and propose corrections, but whether those corrections are improvements requires signals the system can evaluate against. Without that, the loop runs but the growth drifts.

This isn't a marginal difference in productivity. It's a different rate of compounding. And unlike a machine, the thing that is compounding is alive.

---

## The Same Efficiency

![Blast radius](/blog/factory-amplification-and-modular-primitives/images/a6-blast-radius.png)

Compounding doesn't discriminate.

The factory is a force multiplier, not a goodness multiplier.

Last night I gave the factory a reasonable task: clean up the Claude Code configuration repository and migrate it into the new BrainGarden structure. The task involved symlinking the repo. The factory executed exactly as designed.

What I hadn't fully mapped was the coupling. The `.claude` directory isn't just configuration files. It's global factory intake. Every harness starts by reading from it: every Claude session, every Codex CLI instance, every agent running anywhere in the system. When the migration linked a rebuilt version of that directory back through to the root config location, every running session immediately began ingesting a context file that had grown to 848 lines and thirty thousand bytes. Context windows filled almost immediately. New sessions kept spawning, because that's what the factory does. Every one of them inhaled the bloated context. I had to shut the entire factory down before I could turn it back on.

The factory didn't disobey. It faithfully amplified an instruction whose blast radius I hadn't seen clearly enough.

That's the real failure mode of agent factories. Not that they go rogue. That they obey at scale.

A misconfiguration that a developer working interactively would catch in one session, before it caused further damage, propagates instantly through every running process in the factory. The same efficiency that makes a good upstream change beneficial system-wide makes a bad upstream change catastrophic system-wide. It goes both ways, with the same precision.

![Same efficiency](/blog/factory-amplification-and-modular-primitives/images/a8-same-efficiency.png)

---

## Discovered Architecture

It would be easy to look at that incident and reach for the obvious guardrails. Staged rollouts for config changes. Canary harnesses before global adoption. Automatic rollback when a session startup crosses a context-size threshold. Circuit breakers for runaway spawning. Diff-based validation that global changes only touched intended paths.

All of that is correct. None of it was obvious before the incident made it obvious.

This wasn't a failure of foresight. It was the factory revealing a dependency boundary that hadn't yet been fully recognized as infrastructure.

The incident revealed that `~/.claude` had become production machinery before anyone had promoted it to production machinery in their mental model. That makes it more critical than most upstream components in the factory, because it affects every agent simultaneously.

The factory's failures are diagnostic. They show which parts of the system have become critical before you had the chance to treat them that way. Each incident is the system telling you where the next guardrail belongs.

This is architecture you can only discover by running the factory, not by planning it. You can't design blast-radius controls for dependencies you haven't found yet. The blast radius teaches you what needs control. Calling it 20/20 hindsight misses the point. You couldn't have known until the system showed you.

---

## What the Work Becomes

![Gardener at top](/blog/factory-amplification-and-modular-primitives/images/a7-gardener-at-top.png)

What changes, when all of this is running, is the nature of the work itself.

You are no longer building software. You are growing it. The codebase is alive in the way that changes what your attention is for: not writing, but reading signals. Not constructing, but tending. Is this branch healthy? Is this layer of the factory growing toward what it is supposed to become? Where is the shape wrong, and why?

The recursion does not stop at the codebase. The factory watches the codebase. The improvement system watches the factory. The meta-improvement system watches the improvement system. Each layer is observed by the layer above it, corrected, shaped. You watch all of it. You are the gardener at the top of the stack, reading the signals that the layers below surface to you, intervening where the growth is unhealthy.

This is what the work becomes at the factory level: a sustained practice of observation and correction across a living, recursive system. Not a project with a completion state. Not a codebase you finish and ship. Something you tend, indefinitely, as it grows toward the shape you intend.

The factory and the work are not separate. The factory grows through the work it completes. Every project that runs through the system teaches the system how to run projects better. The output and the machine that produces it co-evolve.

The same efficiency. Always.

---

This is Part 5 of "The Factory" series.

[Part 1: The Golden Hammer](https://davidmieloch.com/blog/the-golden-hammer) covers the synthesis pattern.

[Part 2: The Factory](https://davidmieloch.com/blog/the-factory) why time compression changes the competitive equation.

[Part 3: The Foreman](https://davidmieloch.com/blog/the-foreman) what the human role looks like when the factory is running.

[Part 4: The Moving Target](https://davidmieloch.com/blog/the-moving-target) covers how the stack keeps moving.
