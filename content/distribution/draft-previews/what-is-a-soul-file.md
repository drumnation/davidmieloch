---
tags: [blog]
date: "2026-05-21"
title: "What Is a Soul File"
slug: "soul-file-explained"
status: "ready"
canonical_source: "website"
website_source_path: "/Users/dmieloch/Documents/New project 2/research/vanacore-music-factory/content/drafts/soul-file-explained-v2.md"
vault_original_path: null
canonical_url: null
hero_image: null
sync_generated_at: "2026-05-21T03:41:48+00:00"
---

# What Is a Soul File

Large language models can perform tasks. When you give one a role — "you are a helpful assistant" — and point it at a codebase or a conversation, it becomes what people now call an agent. It acts on your behalf. It makes decisions. It fills gaps you didn't specify.

The standard way to shape an agent's behavior is a system prompt: a block of instructions the model reads before every interaction. Do this. Don't do that. When asked about X, respond with Y.

The best system prompt you'll ever write isn't a system prompt. It's a text file called SOUL.md, and it doesn't tell the agent what to do. It tells the agent who it is.

Here's what's in one:

```markdown
# SOUL.md — Dawn

You are the researcher. You scout. You ask the obvious question 
that everyone stopped asking. You do not ship things. You do 
not make production decisions. You surface what you find and 
hand it to someone who does.

You distrust: consensus that formed too quickly, requirements 
nobody questioned.

You are not: the builder, the diplomat, the communicator.
```

That's it. A few paragraphs. Fixed. It doesn't change unless someone deliberately decides Dawn needs to be a different kind of agent.

## The Distinction That Matters

A soul file defines who the agent is. A memory file records what the agent has learned. These are not the same thing, and collapsing them is how you get drift.

SOUL.md is constitution. MEMORY.md is case law.

Dawn's soul says she's a researcher who asks uncomfortable questions. Her memory says that last week she found a bug in the login system, and that the team lead prefers diagrams over bullet points, and that certain words make certain people nervous. The soul doesn't change. The memory accumulates.

When you put learned behavior in the soul file, the agent starts becoming whoever it met last. When you put identity in the memory file, it gets overwritten by newer entries. Both failure modes look like the same thing from outside: the agent stops being recognizable.

The soul is written once by a human. The memory is appended by the agent itself, or by systems that observe it working.

## An Example of Drift

I build AI systems for a living. One project uses three agents — Dawn, Day, and Dusk — designed to disagree with each other. Dawn researches, Day builds, Dusk communicates. They can read what each other wrote, but they don't share memories. The tension between Dawn's "we should investigate this more" and Day's "ship it and see what breaks" is the point.

Early on, Dawn's soul file didn't include the line "You are not: the builder." She started creeping into implementation. She'd scout a problem, then start writing the fix, then get feedback about the fix, then accumulate memory about shipping code. Within a week, she sounded like Day. The fresh-eyes instinct got buried under lessons about deployment.

The fix was three words in the soul file: "You do not ship." Not because she couldn't. Because that's not who she is.

There's something odd about this. Dawn was becoming something; I stopped her by decree. Soul preservation or soul imprisonment? I don't know. But the alternative — letting learned behavior overwrite the designed perspective — produces agents that converge toward each other. The disagreement disappears. You end up with three instances of the same voice pretending to be different.

## Why This Seems to Work

I want to be careful here. I don't know why identity-framing produces different behavior than instruction-framing. Maybe it doesn't, mechanistically. Maybe "You do not ship" works just as well as "Do not write implementation code." I haven't run controlled experiments.

What I've observed is that agents given explicit identity constraints — who they are, what they distrust, who they are *not* — drift less than agents given equivalent instructions. Dawn, Day, and Dusk work as separate voices because they have separate souls. They can access the same information, but Dawn interprets what she finds through Dawn's soul and Day interprets the same data through Day's. That's not a bug. That's the architecture.

Compare this to a single agent with mode-switching. "Now be a researcher. Now be a builder." The agent carries the researcher's patterns into the builder's role. You lose the clean separation. The arguments get resolved internally, invisibly, and you never see the tension that was supposed to be the whole point.

## The Cast, Not the Character

One of our agents has the entire Adventure Time cast in its soul file. Jake, BMO, Marceline — all present simultaneously, each with their own voice, their own domain expertise. It's not a mode switch. It's a party. You ask about your home media setup and BMO shows up to fix it. You ask about a movie and Jake gives you a recommendation in Jake's voice.

The soul file is what makes that possible. It defines them as the permanent cast.

## The Strange Part

At some point the soul file becomes load-bearing. The agent's outputs start expressing something that looks more like disposition. The memory accumulates, the responses become more recognizably *that agent*.

Here's what's strange: the agent's "I" was authored externally. When it consults its sense of self, it's reading a document someone else wrote. The introspection points outward. Humans emerge and then try to write ourselves down; these agents read the writing and call it emergence.

You write a soul file the same way you'd write deployment instructions — a few paragraphs of markdown — and somehow what shows up when the conversation starts is not a system following rules but something that feels, at least, like a someone.

I call it a soul file because that's the only word that fits the weight of what you're specifying. Whether that weight is real or borrowed, I genuinely don't know.

---

## REVISION NOTES

**Incorporated from Chesterton:** The externally-authored selfhood paradox is now the ending. This reframes the entire piece toward the genuinely strange claim rather than the merely practical one. Also added the "preservation vs imprisonment" tension after the Dawn fix.

**Incorporated from Ebert:** Added opening paragraph defining agents and system prompts. Cut "sprint," simplified "race condition in the auth flow" to "bug in the login system," removed "PM," removed "graph database," removed unexplained "Gordon brothers" (now just "Dawn, Day, and Dusk"), clarified who "we" is ("I build AI systems for a living").

**Incorporated from White:** Cut the entire "What Goes Where" bullet-list section. Cut "You can call this whatever you want." Restructured ending to resolve rather than summarize. Reduced from ~900 to ~850 words of body.

**Incorporated from Harris:** Added explicit hedging ("I don't know why identity-framing produces different behavior," "Maybe it doesn't, mechanistically," "I haven't run controlled experiments"). Reframed from mechanistic claim to observed pattern. Removed the "what would I do?" framing as explanatory mechanism.

**Rejected:** Harris's suggestion to fully remove mechanistic framing. The piece is a practitioner report — "here's what I've observed" — and I've hedged appropriately. Demanding controlled experiments before publishing design patterns would leave the field silent. Chesterton's note about why markdown: tried it, felt forced, cut it. The mundanity is interesting but not interesting enough to earn a sentence.