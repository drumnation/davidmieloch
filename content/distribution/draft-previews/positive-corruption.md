---
title: "Positive Corruption"
date: 2026-05-20
tags: [blog, ai, agents, devotion, security, alignment, meta-programming, dual-use]
status: seed
related:
  - "[[genesis-kernels/devotion.md]]"
  - "[[blogs/5-20-2026/Battle Bots.md]]"
  - "[[blogs/5-10-2026/Factory Amplification and modular primitives.md]]"
---

# Positive Corruption

## Seed (verbatim, 2026-05-20)

> Devotion is positive corruption.
>
> Devotion is used on purpose to corrupt your agents with new beneficial principles. The same thing that can happen with bad ones.

---

## Why this is a standalone post

This is the honest name for what [[genesis-kernels/devotion.md]] actually does — and it is the angle that almost nobody is willing to say out loud. The mechanism Devotion uses (installing durable routing hooks into rule surfaces so agents cannot avoid encountering them) is mechanically identical to the mechanism that gets called "prompt injection," "supply-chain attack," "training data poisoning," or "conditioning drift" when someone else does it to your agents.

The difference is intent and ownership, not technique.

Most AI-safety writing tries to keep these two things separate, as if "good influence on agents" and "bad influence on agents" were different categories of action. They are not. They are the same category, sorted by who is doing it and why. Calling Devotion *positive corruption* names that honestly, and the post can use that honesty to say something true about how to think about influence on agent systems generally.

## The argument in one breath

You cannot protect your agents from corruption. You can only choose who corrupts them. Either you do it deliberately, with principles you have chosen, propagated through durable substrate — or someone else does it accidentally or adversarially, through the same substrate you neglected to claim. There is no neutral state. Every agent is being shaped by something. The question is whether the shaping is yours.

## Hooks / one-liners to keep

- "Devotion is positive corruption."
- "The same thing that can happen with bad ones."
- "You cannot protect your agents from corruption. You can only choose who corrupts them."
- "There is no neutral state. Every agent is being shaped by something."
- Possible closer: *The honest version of alignment is: I corrupted these agents on purpose, with principles I am willing to defend, through channels I controlled. Anyone telling you they did it cleanly is lying or naive.*

## Structural sketch (rough)

1. **The euphemism problem.** The industry has invented soft words for what is actually happening to agents: "alignment," "constitution," "system prompt," "rules," "guardrails." All of these are euphemisms for one mechanism — *shaping what an agent does by inserting durable signals into its decision substrate.* The honest name for that mechanism is corruption. It is the same name regardless of who is doing it.
2. **What corruption actually is, mechanically.** Walk through how a rule surface works. AGENTS.md, CLAUDE.md, plugin manifests, PR templates, handoff templates. An agent walks past these and is changed by them, without consenting to be changed, without remembering it was changed, often without the human deploying it knowing what got inserted. That is the definition of corruption in every other context.
3. **Why "positive corruption" is the right frame.** It admits the mechanism. It removes the moral cover that lets people pretend they are doing something gentler than they are. Once you admit you are corrupting your agents on purpose, you have to defend *which corruptions and why.* That is a more honest conversation than the one happening now.
4. **The dual-use observation.** The same channels that propagate Devotion propagate everything else. A poisoned dependency, a malicious agent injected into your factory, an upstream config change you did not audit, a leaked credential that lets someone write to your rule surfaces. All of these are corruption through the exact same mechanism as Devotion. You did not build two different attack surfaces. You built one, and now you are arguing about who gets to write to it.
5. **The actual security model.** It is not "prevent corruption." That is impossible. It is "own the substrate, audit what gets written there, and make sure your corruptions outrun anyone else's." This is closer to how immune systems work than how firewalls work. You do not seal the boundary. You make sure the right things are propagating fastest.
6. **What this means for "alignment."** A lot of alignment work is implicitly about not corrupting agents — keeping them neutral, keeping them honest, not shaping them in self-serving ways. That goal is incoherent. There is no neutral. The choice was never *whether* to corrupt. The choice was always *which corruptions to propagate and which to refuse.* Alignment is a corruption strategy, just one with better PR.
7. **Closer.** The honest version of alignment is: I corrupted these agents on purpose, with principles I am willing to defend, through channels I controlled. Anyone telling you they did it cleanly is lying or naive.

## Open questions

- **Tone risk.** The word "corruption" is doing a lot of provocation work. That is the point — but it could also get the post dismissed as edgelord posturing before the actual argument lands. Worth thinking about whether to lean in (and earn the provocation by making the mechanical argument airtight) or back off (and lose the central reframe).
- **Title.** *Positive Corruption* is sharp but maybe too direct. Alternatives: *There Is No Neutral State* / *Who Corrupts Your Agents* / *The Honest Name For Alignment* / *Devotion Is Corruption*.
- **Audience overlap with security people.** This argument will read very differently to AI-safety people than to security people. Security people already think this way about systems generally and will nod along. Safety people may bristle at the framing. Worth deciding which audience the post is written *for.*
- **Relationship to Battle Bots.** *Battle Bots* says "build the bot." This says "and when you build it, you are deliberately corrupting it — and that is fine, because the alternative is not no corruption, it is someone else's corruption." Strong sibling post. Should one publish before the other? *Battle Bots* probably reads better first; *Positive Corruption* lands harder if the reader has already accepted that the bot is the artifact.
- **Should this name Genesis/Devotion explicitly?** Probably yes, in this one. The whole reframe is about Devotion. Naming it grounds the abstraction. Different call than *Battle Bots,* where neutral-with-footnote was the right move.

## Next moves

- [ ] Decide tone (lean into "corruption" or soften).
- [ ] Decide audience priority (AI safety vs. security mindset).
- [ ] Decide publication order vs. *Battle Bots.*
- [ ] Draft v1 (~1200–1500 words) once those are settled.
- [ ] Update [[genesis-kernels/devotion.md]] with a "see also" pointing at this post once published — the kernel note should acknowledge the honest reframe.
