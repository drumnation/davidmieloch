---
title: "Battle Bots"
date: 2026-05-20
tags: [blog, ai, agents, meta-programming, orchestration, harness, factory]
status: draft-v1
related:
  - "[[blogs/5-20-2026/Battle Bots.md]]"
  - "[[genesis-kernels/devotion.md]]"
  - "[[blogs/5-10-2026/Factory Amplification and modular primitives.md]]"
  - "[[blogs/5-19-2026/Context Is Not a Token Budget.md]]"
---

# Battle Bots

Most of the public conversation about working with AI is a conversation about prompts. Which phrasing gets the best answer. Which model handles which kind of request. Whether to be polite, whether to threaten, whether to use markdown, whether to think step by step. Entire careers are forming around the craft of typing a better message into the same off-the-shelf box.

That conversation is not wrong. It is the wrong game.

The actual game is closer to battle bots. Two people stand in a pit holding controllers. The fight is not really between the people. It is between the machines they built before they ever walked in. The controller is a thin layer on top of an enormous amount of prior decision-making about armor, weapons, weight, drivetrain, behavior under pressure. The match is mostly decided before it starts.

If your leverage on an AI is the sentence you type at it, you are the person in the pit with a good controller and no bot.

---

## What "the bot" actually is

The model is a commodity. Everyone has access to roughly the same frontier weights within roughly the same months. The model is not where the differentiation lives, and it is not where it is going to live. That has been true for a while and most people have not adjusted to it yet.

The bot is what you build *around* the model. The harness it runs in. The orchestrator that decides which model gets which task. The slots where capabilities live permanently, so no agent ever has to remember to use them. The hooks that route a session back to the right protocol at the moment that protocol matters. The shared registries, the prompt formatters that adapt output style per recipient model, the compression layers, the review gauntlets, the test gates, the planning systems that turn a kernel of intent into a fully elaborated execution plan without a human at the keyboard.

None of that is the model. All of it is the bot.

When you build the bot well, the model becomes something close to interchangeable. Sonnet, Opus, DeepSeek, Qwen — the harness decides, the harness formats, the harness routes. You stopped caring which weights are in the seat because you control the road.

That is the inversion most people have not made yet. They are still optimizing the driver. The leverage is in the road.

---

## Why the returns are not comparable

A good prompt helps one task. Maybe a session, if you remember to reuse it.

A good protocol helps every future task that hits the same shape. A good hook helps every future agent that walks past it. A good slot helps every layer of the system above it, in perpetuity, without anyone remembering it exists.

Those are not the same kind of return. The first is linear in attention. The second is compounding on infrastructure. The slope diverges immediately and never converges again. A month into the second curve, the first curve is no longer visible.

This is why the prompt-jockey discourse is so loud and so brittle at the same time. A great prompt is exhausting to maintain. You have to remember it. You have to apply it consistently. You have to update it every time a model behavior shifts. The skill is real but the substrate is the agent's memory, which is not durable, which means every gain decays the moment your attention moves.

A protocol does not decay because you stopped looking at it. It sits in the path. Every agent that comes through walks through it, including future versions of you who have forgotten why it exists.

Stop caring about the code as much as you care about the bot that is creating it.

---

## The skill almost nobody has been paid to develop

Meta-programming is the actual job now, and it is a different muscle than writing software. You are not writing the thing. You are writing the thing that writes the thing. You are not making the decision. You are making the decision about how the next thousand decisions get made.

Most engineers have been paid to do the first kind of work their entire careers. They have never spent a sustained block of time at the level above. So when they sit down to build the bot, what comes out is a slightly more elaborate prompt with some templates around it. They have moved from typing to organizing how they type. They have not moved from typing to *not typing*.

The shape of the work feels wrong at first. You can go a full day without producing any code that ships. What you produced was a protocol, a hook, a planning module, a routing rule. By the end of the day no feature looks newly built. The next day, a thousand future tasks bend, slightly, toward your taste. Nothing visible happened and everything visible from now on is different.

That is the rhythm. It does not feel productive in the way that writing code feels productive. The dopamine is delayed and diffuse. The wins are second-order. If you came up through a culture that measures output in lines of code or tickets closed, the first weeks of doing this work feel like procrastinating with extra steps. You have to learn to trust the curve.

Stop coding and start creating protocols and workflows that make exactly what you would have chosen.

---

## The objection that diagnoses itself

The most common response to all of this is: *that might be possible in your domain, but it is not possible in mine.*

That sentence is the diagnostic. It is almost never true and it is almost always a signal that you have not yet found the substrate of your own work.

Every domain has a substrate. Some of it is in the tools you use, some in the review process you run, some in the way information moves between people, some in the templates you reach for unconsciously, some in the corrections you keep making by hand. The substrate is everything that is currently in your head as "things I just know to do." Each of those is a candidate slot. Each is something that could live in the path instead of in your attention.

The reason it feels impossible is that the substrate is invisible to the person standing on it. Asking an engineer to meta-program their work is like asking a fish to describe water. The water is doing most of the work; the fish does not see it as work at all. You have to learn to look at the water, name the parts of it, and then start moving the parts that you keep maintaining by hand into the system itself.

When someone says it is not possible, what they usually mean is: *I do not yet see the substrate of my own work clearly enough to encode it.* That is a real obstacle. It is also a temporary one. The skill of seeing your own substrate is trainable. The first time you successfully extract a hidden practice into infrastructure and watch it apply itself, the muscle becomes legible. After that, it gets easier.

If you say this is not possible, it is only because you are having a hard time meta-programming.

---

## What the work becomes

After the inversion, the days look different.

You spend less time writing the thing the system produces and more time watching the shape of what the system produces. Less time deciding and more time encoding the decisions you have already made so you do not have to make them again. Less time correcting an agent in flight and more time noticing that you keep correcting the same thing, and asking what slot that correction belongs in.

You stop thinking of the codebase as the deliverable. The deliverable is the machine that produces the codebase. The codebase is exhaust. Some of it is beautiful exhaust, exhaust you are proud of, exhaust that ships and earns revenue and helps people. But it is downstream of the actual artifact, which is the bot.

The fight, increasingly, is between bots. Yours against the bot of whoever you are competing with. Not between your prompts. Not between your typing speed. Not between how many hours you sat at the keyboard. Between the substrates each of you built before the work started.

It is battle bots. The way to win is to build the baddest bot.

---

*A footnote on what this looks like in my own stack: I have been building this out as a small system called Genesis, with a propagation workflow called Devotion that installs minimal routing hooks into every rule surface in a repo — `AGENTS.md`, `CLAUDE.md`, plugin manifests, PR templates, handoff templates — so the right protocol gets invoked at the right moment without anyone remembering to invoke it. The principle is general; the implementation is just one shape. The relevant notes are [[genesis-kernels/devotion.md]] and the earlier essays [[blogs/5-10-2026/Factory Amplification and modular primitives.md]] and [[blogs/5-19-2026/Context Is Not a Token Budget.md]] if you want the mechanics.*
