---
title: "The Golden Hammer"
description: "An Ensemble of Agents I learned to code by reverse engineering other people's answers rather than struggling to figure them out myself. Nine years later, I accidentally rebuilt..."
publishedAt: "2026-04-15"
status: "published"
sourcePlatform: "linkedin"
sourceUrl: ""
canonicalUrl: "https://davidmieloch.com/blog/the-golden-hammer"
series: "Golden Hammer"
tags: ["ai", "engineering", "agents", "ensemble", "synthesis", "workflow"]
channels: ["singularity-labs"]
commercialConcept: "Many agent approaches, one synthesized operating loop"
commercialSummary: "The practical advantage comes from sampling competing solutions, comparing their strengths, and turning the best parts into a stronger workflow."
singularityLabsCta: "If your workflow needs competing agent approaches synthesized into one operating loop, start with a Factory Sketch."
coverImage: "/blog/the-golden-hammer/images/a1-hero-photorealistic.png"
---

![a1 hero photorealistic](/blog/the-golden-hammer/images/a1-hero-photorealistic.png)

## An Ensemble of Agents

I learned to code by reverse engineering other people's answers rather than struggling to figure them out myself. Nine years later, I accidentally rebuilt the same pattern with AI agents.

---

## The Original Hammer

![a1 original minimalist](/blog/the-golden-hammer/images/a1-original-minimalist.png)

I was at the Flatiron School in New York. Test-driven labs. Failing tests, make them pass, push to GitHub. Hundreds of students across dozens of cohorts, all solving the same problems.

Every student's solution was on GitHub. Not just my cohort. Every cohort that had ever done the program. For any given lab, there might be 30 or 50 working solutions, all written by different people with different instincts.

So I built a tool called [the Golden Hammer](https://github.com/drumnation/the-golden-hammer). A terminal UI that scraped GitHub and generated a consolidated file containing every student's answer. Credited by author, organized for comparison.

I stopped trying to learn syntax by struggling to conjure words from my mind. Instead, when approaching a lab, I would immediately begin comparing many solutions to each other and synthesize my own super answer.

Some people called it cheating. The school called me into a private meeting about it. I felt misunderstood. I had a long technical background and was simply looking for what felt like the fastest way to learn.

But this wasn't new to me. Before software, I had a B.A. in Music Composition. I'd spent hours in the music library poring over orchestral scores while listening to their recordings, collecting techniques I loved and could later use in my own work. That was encouraged. That was the whole point of studying composition.

A score is a program that runs live humans in synchronization instead of a computer. The Golden Hammer was the same instinct applied to code. Here's what was actually happening.

The labs were small enough that each solution had maybe five major pieces. If the problem required a date calculation or some validation, every solution had its own version of that sub-module. You could compare like against like. The design space was just small enough to fundamentally understand the meta concepts that most solutions used to get there.

Going back a few years of cohorts, some labs had a hundred or two hundred solutions. I'd memorize the meta space, then cruise and pattern-match across all of them. Different syntax. Different primitive JS functions accomplishing the same goal. Sometimes a word I'd never seen in the code, doing the same thing in a tenth of the lines. I'd study how it worked, and that became my goto pattern the next time I needed to speak syntax in a similar way.

The synthesis step, reading all those approaches and deciding what the best answer looked like, was where I learned the most. I'd pick the five most cleverly diverse solutions and refactor them into what I called the über answer.

And because the labs were test-driven, every solution the Golden Hammer collected had a green test suite. I wasn't studying guesses. I was studying verified, passing implementations. The comparison only works when you know everything you're looking at actually works.

I was the synthesizer. I just didn't have a word for it yet.

---

## The Accidental Rediscovery

Nine years later, I'm building something I'll write about separately: an autonomous software factory where AI agents turn specs into tested, working code. I didn't set out to rediscover the synthesizer pattern. It just showed up.

I was running a self-improvement loop overnight, testing how different AI models performed building the same application from the same spec. A Purchase-to-Pay API: purchase orders, goods receipts, invoices, three-way matching, general ledger entries. Bounded domain, well-understood business rules.

Each generation built the entire app in one shot. An evaluation agent studied the output, identified what worked and what failed, and fed the findings back into the spec. The next generation inherited specific instructions to reproduce what the last one got right. The spec evolved. The generations got better. Different models, different execution environments, different prompt formats, all branching from the same spec lineage.

52 iterations later, I was looking at the Golden Hammer pattern at a completely different scale.

---

## What 52 Solutions Teach You

![a1 52solutions photorealistic](/blog/the-golden-hammer/images/a1-52solutions-photorealistic.png)

When you look at one solution, you see code. When you look at 52, you see the design space.

**Every model hallucinated the same missing field.** The spec said GL entries should credit an expense account "based on vendor category." But the Vendor entity has four fields: id, name, payment_terms, is_active. No category. Every single model silently invented one. None flagged it as ambiguous. A spec bug that no single-model iteration would reveal. You need the chorus to hear the dissonance.

**The money was wrong.** Sonnet, the model with the most tests (67), used IEEE 754 floating point for every monetary field. That's a system where `750.50 * 2` can return `1500.9999999`. Opus did the same. The models that got it right (MiniMax, Codex, GLM) used Decimal in their schemas, but only Codex used Decimal arithmetic in its runtime code. The correct financial implementation was scattered across three different models.

**Test count had almost no correlation with test quality.** Sonnet wrote 36 deep assertion matchers, checking response shapes rigorously. It tested the right things against a financially incorrect foundation. MiniMax wrote 56 tests with zero deep matchers. Codex had 8 deep matchers but was the only model doing real Decimal math. Each model's tests reflected its own blind spots.

**When we scored on seven quality dimensions instead of test count, the rankings inverted.** The composite scored 60/70. Codex scored 58. MiniMax 53. Sonnet, the test count leader, scored 49. Opus scored 47. The model that "won" by volume was fourth by quality.

---

## The Super Answer

![a1 superanswer conceptual](/blog/the-golden-hammer/images/a1-superanswer-conceptual.png)

Every solution that passed its tests was correct. But none of them were optimal. Each one had something the others lacked: a cleaner pattern, a more readable structure, a more accurate edge case. The über answer isn't the right answer. It's what you get when adding good things together amplifies their properties: simpler, more readable, more precise.

The super answer that scored highest across every dimension didn't come from any single model:

- **Schema**: MiniMax's Decimal types for money.
- **Arithmetic**: Codex's `.plus()` and `.mul()` Decimal methods instead of JavaScript's `+` operator.
- **Lifecycle logic**: Opus's PO receive guard, correctly handling partial receipts across multiple deliveries.
- **Match algorithm**: Opus's structured checks array, returning individual pass/fail per verification step.
- **GL posting, response design, test structure**: drawn from GLM, a third Opus iteration, and Sonnet respectively, each contributing patterns the others missed.

![a1 choir photorealistic](/blog/the-golden-hammer/images/a1-choir-photorealistic.png)

Each generation produced a different flavor of good. Not better or worse. Different. Part of that is the model: different training, different strengths. But part of it is that the path to solving a problem through stream-of-consciousness reasoning is non-deterministic. Even the same model with the same prompt won't produce the same solution twice. You're not sampling instruments with fixed voices. You're sampling from a space of possible solutions, and each run lands somewhere different.

The super answer wasn't produced by finding the best soloist. It was produced by sampling enough of that space to see patterns no single run could reveal, and then writing the arrangement.

And because the synthesis writes from scratch rather than patching, there are no merge conflicts. No accumulated technical debt from 52 iterations of fixes. Each generation is independent. The comparison is where the value lives.

This changes the economics. If you're paying for the best soloist to one-shot the whole thing, you're overpaying. The exploration can be done by cheaper models running in parallel. You only need the premium model for synthesis: reading the outputs and deciding what to keep.

Not every problem needs this. Known problems with well-understood patterns work fine with one model and a good spec. But for anything novel, complex, or high-stakes, the ensemble reveals the design space in a way that no amount of single-model iteration can match.

---

## The Synthesizer

In 2017, I was the one reading 30 solutions and smashing the best parts together. I was the synthesizer. I was operating at the code level, learning syntax, absorbing patterns, building fluency.

The same strategy translates directly to how AI agents work: generate many solutions, compare them, extract what's best, feed it forward. The method doesn't change. The layer you work at does.

This is where software development is heading. When agents can generate entire codebases overnight, the question stops being "how do I write better code?" and becomes "how do I recognize better code across many attempts?" Designing the systems that generate solutions, defining what "better" means across them, encoding the patterns that survive into the next generation's instructions: that's the meta level. Thinking about thinking. Coding the coder.

The models become the students. The spec becomes the lab. The synthesis is where the quality lives. The synthesizer just moves up a floor.

That's a meta-programming question. And the Golden Hammer pattern has been training me for it for nine years.

More on that in Part 2.

---

_The [Golden Hammer](https://github.com/drumnation/the-golden-hammer) source code from 2017 is still on GitHub._
