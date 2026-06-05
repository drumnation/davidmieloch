---
title: "The Compression"
date: 2026-05-10
tags: [blog, ai, engineering, agents, factory, intent, planning, self-improvement]
status: draft-v1
---

# The Compression

## What the Stack Has Been Doing

Every stage of AI-human collaboration has been a compression.

The first stage is sorcery. You sit with an agent and narrate everything in real time. You remind it to check memory. You catch the shortcuts. You correct the drift. You teach it your preferences by repeating them. The human is the coordination mechanism. Your attention is the bottleneck.

The second stage is formalization. You notice the patterns in your corrections and write them down. Prompt workflows emerge from that: structured instructions that capture what you kept having to say. The human lifts themselves out of the real-time loop by externalizing their knowledge into the system. Quality improves. Something is being compressed: your constant supervision gets replaced by a document.

The third stage is the factory. The document stops being enough because compliance with a long instruction list is itself non-deterministic. Agents infer. Inferences fail. So you stop requesting compliance and start enforcing behavior at the infrastructure level. CLIs, memory servers, planning slots, execution gauntlets: the coordination that used to live in your attention, then in your prompts, now lives in the architecture. The human has been compressed out of the execution loop almost entirely.

At each stage, something that required human attention got absorbed by the system. What remains at each stage is smaller. More essential.

---

## What Remains

At the top of the factory stack, what the human provides has compressed to its irreducible minimum.

Not code. Not specifications. Not detailed instructions.

Intent.

What you want. Why you want it. The tradeoffs you care about. The concerns you'd raise if someone proposed the wrong solution. This is not a document. It is not a spec. It is a conversation, the kind you might have with a colleague you trust, where you voice what you are trying to accomplish and work through the problem together. That conversation gets compressed into a plan kernel by the factory's planning system. Everything downstream gets generated from there: the detailed specifications, the architectural decisions, the test strategy, the review sequence, the execution plan.

The popular narrative says developer work is migrating toward detailed specification writing. Learn to write better PRDs. Master the art of the prompt. Spec writing is the new coding.

This was always a description of the middle stage, not the destination. The factory already moved past it. The machine writes the specs. The human provides the seed.

---

## Intent is the Most Leveraged Input

Here is what is interesting about compression all the way down to intent.

It looks like the human contribution is shrinking. It is, in one sense. The human no longer writes the code, the tests, the specifications, the plans, or the review procedures. But the contribution hasn't become less valuable. It has become more leveraged.

A single clear goal, fed into a system built to execute it, drives everything downstream. The intent is the most upstream thing in the entire production chain. Every layer of the factory runs on it: planning, execution, review, self-improvement. The human who understands how to articulate intent precisely, who can voice what they want and why and under what constraints, is not doing less work. They are doing the only work that cannot yet be automated.

This inverts the productivity calculus entirely. More output does not require more specification. It requires clearer intent. The bottleneck is no longer writing instructions. It is knowing what you actually want, and being able to say it in a way a system can act on.

---

## The Loop Runs on Goals

The self-improvement loop makes this explicit.

A factory that improves itself takes goals as input. The observability system watches output. The improvement loop generates plans to close the gap between what the factory is producing and what the goals require. The meta-improvement loop improves the improvement loop. Every layer runs from the same root: what you are trying to achieve.

Goals are just formalized intent. The self-improvement loop is the factory running on pure human intent, recursively. The human sets the direction. The machine does everything required to move toward it.

That is not a small thing. A system that can take a goal and continuously improve its own capacity to achieve that goal, without the human managing any individual step, is a qualitatively different kind of tool. Not an assistant. Not a copilot. Something more like a directed force.

---

## The Threshold Above

There is one thing above this.

A system that predicts the goals you would have if you thought about it long enough. That anticipates intent before it is expressed. That looks at what you have been building and infers what you are trying to achieve and acts on that inference without waiting to be told.

This is not the factory. The factory receives intent. What is above the factory generates it.

That is a different kind of problem. Not an engineering problem in the way everything else in this series has been. It is the problem of a system that can model what you want accurately enough to act on your behalf without the conversation. The moment that threshold is crossed, the human's contribution has not just compressed. It has been replicated.

Everything below that threshold is still collaborative. Intent flows in one direction. The factory acts on it. The human remains the source of goals.

Everything above it is something else. The discussion that belongs there is not about factories.

---

## The Direction of Travel

The compression is not finished.

Each stage has moved the human further from execution and closer to the source of direction. Sorcery to workflows to factory to intent. The trajectory is clear even if the destination is not.

What is worth noting is that each compression has increased output rather than reducing the human's relevance. The developer who moved from coding every line to pair-programming with AI did not become less necessary. They became more productive. The developer who moved from pair-programming to running a factory did not become irrelevant. They became the only person in the room whose judgment shaped everything the factory produced.

The compression concentrates rather than diminishes. The human at the top of the factory stack is not doing less. They are doing the part that the rest of the stack cannot do without them.

For now.

---

*This is part of an ongoing series on agent-native development.*
