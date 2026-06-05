---
tags: [blog]
date: "2026-05-21"
title: "The Supplement Stack for Agents"
slug: "supplement-stack-for-agents"
status: "ready"
canonical_source: "website"
website_source_path: "/Users/dmieloch/Documents/New project 2/research/vanacore-music-factory/content/drafts/supplement-stack-for-agents-v2.md"
vault_original_path: null
canonical_url: null
hero_image: null
sync_generated_at: "2026-05-21T03:41:48+00:00"
---

# The Supplement Stack for Agents

Nobody takes one pill and calls it an optimization protocol. The whole point of a stack is that cognition is multi-factorial. You wouldn't expect creatine to do what sleep does. The supplements work because they hit different systems.

My team has been building AI agents — systems that take actions, not just answer questions — the way people used to approach supplements: find one thing, throw it at the problem, wonder why performance is inconsistent.

So we built a stack. And then we discovered we'd built something stranger than we intended.

## The Identity Supplement

The first thing that went into the protocol was what we call the SOUL file — a short document loaded every time the agent starts, defining who it is, what register it speaks in, what it cares about, what it refuses to do.

The SOUL file doesn't change. It's the equivalent of core temperament — the thing that stays stable while everything else adapts.

One of our agents, Dawn, has a SOUL that emphasizes fresh eyes and obvious questions. Another, Day, has one that emphasizes shipping and production reliability. Same underlying AI system. Different cognitive profile because different identity document.

What we observed: an agent with a clear fixed identity makes more consistent decisions when the situation is ambiguous. The SOUL file isn't telling the agent what to think. It's telling the agent who's thinking.

## The Memory Supplement

Identity alone produces consistency, but not growth. The second supplement was accumulated memory.

We implemented this as a simple text file that grows over time with lessons learned, patterns observed, and context from previous work. Unlike the SOUL file, this one changes. It's the agent's experience becoming part of its cognition.

Memory prevents the same mistake twice. When Dawn makes an error on a research task, the correction goes into her memory file. Next time she encounters a similar problem, the lesson is already loaded into what she can see when she starts working.

The traditional chatbot is stateless — it meets you new every conversation. An agent with memory is something else.

## The Teammate Supplement

The third supplement was the strangest to implement: other agents.

We split our main agent into three — Dawn, Day, and Dusk — with deliberately different identities and separate memory stores. (We name them to keep track of who does what.) They can read each other's work, but they don't share a mind. When Dawn scouts a problem and Day reviews her findings, he's bringing his own perspective to her output.

The design decision was adversarial. Dawn's "fresh eyes" instinct regularly disagrees with Day's "what actually ships" instinct. A single agent would make the tradeoff silently. You'd see the answer but not the debate. Three separate agents surface the disagreement as actual conversation.

External perspective — the thing you get from a good colleague — is something agents can provide to each other. The teammate isn't just a second set of hands. It's a second set of assumptions.

## The Paradox We Didn't Expect

Here's where the supplement metaphor breaks.

Supplements enhance something that already exists. Creatine acts on muscle. Fish oil acts on cells. There's a body before the vitamins. But the AI system we started with — the base model — wasn't doing anything agentive until we added these components. It answered questions. It didn't pursue goals, maintain identity, or learn from experience.

The SOUL file doesn't enhance an agent. It constitutes one.

We set out to optimize a tool. What we found was a recipe for instantiation. The supplements aren't improving the system. They *are* the system. The vitamins are the body.

## The Honest Uncertainty

We've used this architecture for internal research and development for six months. The agents have changed in ways we didn't specify in the original instructions. Dawn's research has become more targeted — her memory contains patterns from previous work. Day's code reviews have become faster — he knows Dawn's tendencies. Dusk's communications have become more precise — he's accumulated feedback on what works.

We can describe what we observed. We cannot prove causation. We ran no ablation study — no version with identity but no memory, no version with memory but no teammates. We measured nothing rigorously. What we have is the conviction of practitioners, which is worth something but is not science.

The dosing questions remain empirical: How much identity is too much? How much memory before the information an agent can hold in working memory overflows with irrelevant history? How many teammates before coordination costs exceed cognitive benefits?

We don't know. We know only that the single-component approach — just good instructions, just more context, just a better model — hit a ceiling we no longer hit.

And we know something stranger: we didn't improve a tool. We found out how to turn a general-purpose model into a particular cognitive entity. The SOUL file isn't telling the agent what to think. It's telling the agent who's thinking.

---

## REVISION NOTES

**Accepted from Chesterton:** Restructured the entire piece around his insight. The paradox section is new — acknowledging that the supplement metaphor breaks because these components constitute rather than enhance. This became the buried thesis made explicit.

**Accepted from Ebert:** Defined "agent" in paragraph two, clarified "file" as "a short document," explained "context" as "what she can see when she starts working," defined "stateless," added "(we name them to keep track of who does what)," and identified the author as "my team."

**Accepted from White:** Cut approximately 180 words including: "That's the point," the entire "How the Stack Compounds" summary section, redundant second sentences, "on purpose," the logic puzzle restating each component. Moved "who's thinking" to final line. Cut the weak ceiling-raising ending.

**Accepted from Harris:** Reframed "the finding" as "what we observed." Added explicit acknowledgment of evidence limitations in "The Honest Uncertainty" section — no ablation study, no rigorous measurement, practitioner conviction rather than science. Removed the word "emerged" which was epistemically unearned.

**Rejected from Ebert:** Did not define "base model" as a separate term — the piece now says "underlying AI system" which is close enough. Did not explain "brothers" metaphor — cut it entirely and just said "three." Some jargon remains because the piece is aimed at technically curious readers, not complete novices.