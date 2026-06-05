# Context Is Not a Token Budget

*A working note toward a blog post, May 19, 2026*

---

This past week I had to clean-room a new factory. Not build it with the factory — the factory didn't exist yet. Just me, vanilla Claude Code, and a video game running in the background while I worked out the right order to build the parts so each piece could help build the next one faster. The bootstrapping problem: you can't use the system to build the system.

When you're doing it by hand, you feel every rough edge. Context management was the roughest edge of all. That's what this post is about.

The funny part is that this feels like frontier thinking, but it's exactly where everyone working with these systems is right now. I'm not thinking about it because I pushed forward. I'm thinking about it because I got pushed back down the stack.

---

Everyone talks about context windows like they're a resource problem. You have N tokens, you spend them, you run out. Buy more, spend slower, compress harder. That's the frame most people use.

That frame is wrong, or at least incomplete.

The real problem with context limits isn't the cost. It's the rupture.

(There's also a more precise name for what I'm actually doing with large context, but I'll get to that.)

---

## The Rupture

Here's what actually happens when you hit a context limit mid-session.

You're deep in something. The model knows what was tried, what failed, what the current working theory is, what three things are still in flight. You know all of that too. You've been building this shared picture together for hours. Then the context fills. You write a handoff prompt. You start a new session.

And now you're watching a new instance of the model try to reconstruct, from a document, what the previous instance knew from *living it*.

Sometimes it works great. The handoff is clean, the new model picks up exactly where the old one left off, the vibe is right. But sometimes the vibe is off. The model is technically doing the task but it's slightly sideways, operating on an incomplete model of reality that it doesn't know is incomplete. And you, the human, have to notice this, diagnose it, patch the model's understanding before its next action causes drift you'll have to unwind later.

This is what I mean by rupture. It's not just a cost event. It's a **cognitive synchronization failure** between you and the model. Both of you have to spend time and energy recovering from it.

The more often context resets happen, the more often this switching cost compounds. Each handoff is a small bet that continuity survived the transfer.

---

## Why I Reach for 1M Context

I've been running Claude claude-sonnet-4-6 at 1M context as my primary orchestrator. The economics look bad on paper: you get charged at a higher rate, and the cost is roughly quadratic in the second half of the window. A session that runs to 900K context gets very expensive, very fast.

But here's the trade I've found myself making: smooth flow over token efficiency.

With a 200K context orchestrator, I get maybe 5–6 back-and-forth exchanges before I'm at 60–70% context and starting to feel the urgency. The model might still be mid-task. I'm now asking it to write a handoff before it hits autocompact, not because the work is done, but because I'm running out of room. That's not a graceful stopping point. It's a forced one.

With 1M context, if I'm careful to stay in pure orchestration mode (writing prompts, tracking state, delegating execution), 500K tokens can last several hours of real work. The session has a different quality. I'm not watching a timer. The model I started with is the model I still have. My mental model and its memory stay in sync.

That's worth something. And it can be priced, at least roughly:

| | **Option A: 1M Sonnet (careful delegation)** | **Option B: 200K Sonnet + handoffs** | **Option C: Opus** |
|---|---|---|---|
| **Billing** | Extra 1M-tier rate | Standard | 4× token cost |
| **Useful window** | ~500K before quadratic tail | ~5–6 substantial exchanges | Burns to limit 4× faster in dollar terms |
| **Time before limit** | 5–8 hours at normal pace | 30–60 minutes | Same window, much higher cost |
| **Handoffs** | Zero if disciplined | One per hour, roughly | Same as 200K |
| **Context ruptures** | Zero | One per handoff | One per handoff |

The 200K option looks cheaper until you count what a handoff actually costs: roughly 30 minutes lost on both sides per reset, plus the coherence risk that the new session is operating on an incomplete model it doesn't know is incomplete. At any reasonable value of an hour's focused work, Option A wins, if you stay under 500K.

---

## The Opus Question

The obvious follow-on: why not Opus? More intelligence, same session structure.

The answer is cost discipline. Opus burns tokens at roughly 4× the rate of Sonnet. For orchestration work (writing prompts to sub-agents, tracking task state, synthesizing what came back) you mostly don't need Opus-level reasoning. You need *memory* and *coherence*, not raw intelligence.

Where Opus earns its cost is in the precise, high-stakes moments: writing a really good dispatch prompt, noticing something subtly wrong in a factory output, jumping in to fix something that went sideways. Those moments exist, but they're maybe 20% of an orchestration session. Paying 4× for all of it to get 4× quality on the 20% is a bad deal.

The right model for orchestration might be: Sonnet at 1M context, with the discipline to delegate execution to 200K sub-agents and not burn the orchestrator's context doing work it could hand off.

---

## What the Factory Was Built For

The reason I built a factory with a warp gate isn't abstract. It's this exact problem.

Each task spawned by the factory goes to a worker, a Sonnet at 200K context by definition. Sub-agents don't inherit the orchestrator's model or context size. Each agent type has its own `model:` definition: Cameron the builder runs Sonnet at 200K, Bernard the reviewer runs at 200K, and so on. They're scoped to fit that window. When the task is done, the worker is done, the context reclaimed. The factory state persists in Forgejo, not in any model's memory.

That's the programmatic answer to what 1M context solves manually. Long-horizon continuity comes from the *system*, not from keeping one model alive long enough. You can run a project indefinitely without any single session becoming a critical path dependency.

---

## The Honest Problem: We Fall Out of the System

Here's what I keep running into: we don't always use the factory.

I start talking to the orchestrator. We're thinking through something together. The orchestrator sees the factory as bureaucracy: open a PR, dispatch a PYLON, wait for CI. It could just *do the thing* directly in two minutes. So it does. And I let it, because it's faster in the moment.

Then two things happen:

1. The orchestrator's context fills up with execution work it should have delegated.
2. We skipped the guardrails that make the work trustworthy: review, test gate, audit trail.

The session gets expensive and fragile at the same time.

This isn't a discipline problem I can solve by trying harder. It's a design problem. The system has to make the right path the easy path, both when I'm locked into factory mode *and* when I've drifted out of it. If falling out of the system quietly breaks the factory's invariants, the system is too brittle. If falling back in is frictionless, the drift becomes self-correcting.

The goal is a factory that works with the grain of how humans and models actually interact, including the parts where we skip steps, go direct, and talk ourselves into shortcuts. Build the guardrails into those paths too, not just the disciplined ones.

---

## What I'm Actually Using 1M For

Here's the more precise name for it: **shared working memory for a human-AI pair.**

Not document ingestion. Not long-context reasoning over a codebase. I'm using 1M context to store the collaborative session state that keeps me and the model synchronized: what was tried, what failed, what's in flight, what the current theory is. The context window is the shared mental model.

That's a legitimate use. The alternative isn't free. Handoffs have real costs: model coherence loss, human mental model rebuilding, the vibe-check overhead of figuring out whether the new session understood the handoff correctly, and the compounding risk of a model acting on an implicit assumption that didn't survive the transfer.

## The Real Discipline

The 1M session has a failure mode: you use the extra headroom as license to stay in a session until you're forced out. At 900K context, a session is very expensive and you're making a desperate handoff anyway. You got the worst of both options.

The discipline isn't "use 1M" or "use 200K." It's: **stop at 500K, not when forced.** A proactive handoff at 500K, planned at a logical stopping point with the session still coherent, is a completely different experience than an emergency handoff at 900K. The second half of a 1M session doesn't give you 2× more value. It gives you diminishing returns as tool calls pile up and cost curves go nonlinear.

Combine that with a factory that externalizes state to disk, and the shape becomes clear: 1M sonnet orchestrator for interactive flow, 200K sonnet workers for execution, Forgejo as the persistence layer that makes session length irrelevant to project continuity.

The session length stops being a source of anxiety and starts being a feature, if you treat 500K as the real limit, not 1M.

---

*Tags: #ai #context-windows #orchestration #factory #cognitive-overhead*
