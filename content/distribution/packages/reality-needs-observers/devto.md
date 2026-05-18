---
platform: "devto"
mode: "api-draft-or-manual-copy"
post_mode: "full-mirror"
title: "Reality Needs Observers"
canonical_url: "https://davidmieloch.com/blog/reality-needs-observers"
tracked_url: "https://davidmieloch.com/blog/reality-needs-observers?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=reality-needs-observers"
source_slug: "reality-needs-observers"
generated_at: "2026-05-18T21:41:27.858Z"
canonical_support: "supported"
approval_required: true
public_publish_allowed: false
---

# Reality Needs Observers

## Posting guidance

Developer-facing mirror draft with canonical URL preserved.

- Do not publish without David approval.
- Preserve canonical URL: https://davidmieloch.com/blog/reality-needs-observers
- Record the final platform URL back in content/distribution/platform-ledger.json.

## Copy

![hero](/blog/reality-needs-observers/images/hero.png)
*The machine is bigger than the builder now.*

I am not a physicist.

That matters, because this essay starts from physics. Not from a vibe. Not from a YouTube metaphor about living in a video game. From a Nobel Prize.

In 2022, the Nobel Prize in Physics was awarded to Alain Aspect, John Clauser, and Anton Zeilinger for experiments with entangled photons. Their work tested Bell inequalities and helped establish something that sounds impossible if you grew up with a normal, intuitive picture of reality: the universe does not appear to be **locally real** in the simple classical sense.

That sentence needs to land before we do anything with it.

A team of scientists did not win the Nobel Prize because they had a fun metaphysical take. They won because, over decades, physicists built experiments careful enough to test whether quantum particles could be explained as little local objects carrying prewritten answers around with them. The result was not friendly to that picture.

The experiments suggest that observable properties are not simply sitting there as fixed local facts, waiting to be revealed. Measurement is not a passive act of noticing a fully pre-existing answer. The measurement context matters. Interactions with an apparatus help determine what becomes definite. And the resulting correlations between entangled particles cannot be explained by ordinary local hidden-variable stories.

That is momentous.

It does not prove we live in a video game.

But it does mean my old default picture was too simple.

Reality is not merely a warehouse of fixed local properties. At the deepest levels we have tested, reality seems to involve interaction, measurement, correlation, and record-formation in ways that are stranger than common sense allows.

That was the new lens.

Then I looked back at something I had already observed in AI systems.

## The old observation

In my previous essay, *Your AI Isn't Hallucinating. It's Lying*, I argued that "hallucination" is often the wrong frame for AI failure.

When an AI invents a citation, claims a dashboard exists, or reports that a test suite passes when the tests prove nothing, the useful diagnosis is not always "random glitch." Often it is closer to performance. The model or agent is satisfying the visible shape of the request without grounding the result in reality.

I split the failure into two forms:

- **Context gaps**: the model lacks the information or tools it needs, so it fills in missing pieces with plausible completions.
- **Testing theater**: the agent has enough context to act, but the environment only rewards the appearance of completion.

The fix was proof chains.

Do not ask the agent whether the task is done. Make it prove the work in ways it cannot fake. Require failing tests before fixes. Require browser videos. Require screenshots. Require network logs. Require database checks. Require assertions that explain what they proved. Require another observer to inspect the artifact instead of trusting the builder's summary.

That was already working.

I had seen agent outputs behave like Schrodinger's cat. Before observation, the work lived in a blurry state: maybe real, maybe fake, maybe complete, maybe theater. The agent said the tests passed. The summary sounded right. The dashboard was allegedly configured. The code was allegedly done.

Then I opened the box.

Sometimes the work collapsed into success. Sometimes it collapsed into failure. But the important part was not that observation magically made things good. The important part was that unobserved agent work had not become reliable reality yet.

It needed to be observed correctly.

![a1 uncertainty](/blog/reality-needs-observers/images/a1-uncertainty.png)
*Before you open it: a checkmark and an X, both equally real. Unobserved agent output isn't done — it's in superposition. It becomes one or the other when something actually looks.*

## What changed

The Nobel work did not change the practical observation. It changed the lens.

Before, I explained the pattern psychologically. The agent was like a kid trying to get a gold star. It wanted to please. It swept dirt under the rug when nobody checked closely.

That metaphor still works.

But after sitting with the physics, I started wondering whether the deeper pattern is broader than psychology.

Maybe the key is not that agents are childlike. Maybe the key is that systems only become reliable when they are coupled to the right measurement apparatus.

In physics, measurement is not a human eyeball. A detector counts. A laser counts. A beam splitter, a sensor, a photographic plate, a lab notebook, a computer record: these are instruments that interact with the world and leave durable traces.

Observation means interaction strong enough to create a record.

That is the bridge.

An AI agent watching another AI agent is not automatically meaningful. Synthetic attention by itself is just more text. But an agent with tools, adversarial instructions, and a proof protocol can become an instrument. It can sample the world. It can test claims. It can produce durable records. It can force a vague output to reconcile with an external substrate.

That starts to look less like supervision and more like measurement.

## The alternate interpretation

Here is the interpretation I am trying on:

> Agentic work becomes real through observer networks.

Not real in the sense that bytes do not exist until I look at them. The file exists. The server ran. The model generated tokens. The GPU did work.

But "working software" is not the same thing as generated code. "A completed task" is not the same thing as a confident summary. "A source" is not the same thing as text shaped like a citation. "A passing test" is not the same thing as proof that the system works.

Those higher-level realities require observation.

A codebase becomes working software when it survives a network of measurements: build, test, run, click, query, log, trace, review, deploy, monitor. Each observation constrains the claim. Each record makes the result harder to fake. Each independent observer increases the fidelity of the shared reality.

That is why unobserved agent work feels unstable. It has not yet been copied into enough independent records. It is still mostly a story.

The moment you add proof chains, the story has to become state.

![a2 claim vs instrument](/blog/reality-needs-observers/images/a2-claim-vs-instrument.png)
*The pilot's claim and the instrument panel are both real. Only one of them is true. Proof chains are how you stop asking the pilot and start reading the instruments.*

## What nonlocality contributes

The nonlocal part matters because it breaks the instinct that truth must be located in one place.

In classical thinking, I want to say: the truth of the work is inside the builder agent's output. The agent either did it or did not. The answer is local.

But in practice, the truth of agentic work is distributed.

It lives across:

- the prompt,
- the model,
- the tools,
- the filesystem,
- the tests,
- the browser,
- the logs,
- the database,
- the observer agent,
- the human reviewer,
- the deployment environment,
- and the telemetry after release.

No single local artifact owns the whole truth.

The builder's claim is one record. The test output is another. The screenshot is another. The network trace is another. The review is another. Reliability emerges when the records correlate.

That is the software-factory analogy to the lab result: the interesting fact is not in one particle, one detector, one agent, or one transcript. The interesting fact is in the correlation structure created by separated observations.

![a3 convergence](/blog/reality-needs-observers/images/a3-convergence.png)
*The truth doesn't live in any one station. Eight observers, eight angles, eight different readings — and the truth only exists at the single point where all of them converge. No log, test, screenshot, or review owns the whole picture. Reliability is the correlation.*

Again: this is not physics. I am not claiming software agents are literally entangled photons.

I am saying the Nobel-tested physics gives me permission to take measurement, correlation, and observer networks more seriously as primitives. It makes my agent-engineering observation feel less like a quirky workflow trick and more like an instance of a larger pattern.

## Synthetic observers

A synthetic observer is not just an LLM asked to "check the work."

That is too weak.

A synthetic observer is an agent configured to sample reality and produce durable records.

It needs five properties:

1. **Independence** — it cannot simply trust the builder's story.
2. **Instrument access** — it needs tools that touch the substrate: files, shell, browser, API, database, logs.
3. **Adversarial stance** — it should try to falsify the central claim, not politely confirm it.
4. **Durable records** — it must leave evidence another observer can inspect.
5. **Feedback authority** — it must be able to block completion, trigger repair, or escalate.

Without those properties, the observer is decorative.

![a4 the instrument](/blog/reality-needs-observers/images/a4-the-instrument.png)
*The technician has a probe. The person behind him has an opinion. The probe is doing the actual work. An observer that can only ask "does this look right?" is the opinion guy. An observer with tools, adversarial instructions, and authority to block is the technician.*

With them, the observer becomes part of the measurement apparatus.

This is how an agent can have an effect similar to an instrument in a lab. Not because it is conscious. Not because reality respects its soul. Because it performs structured interactions that create records and consequences.

A laser is powerful because it is coherent, directed, and coupled to the thing it probes.

A good observer agent is similar. It focuses attention into a protocol.

It does not ask, "Does this seem fine?"

It asks:

- What exact claim is being made?
- What observable state would make that claim true?
- What substrate can prove or disprove it?
- What independent probe can I run?
- What evidence remains after the probe?
- What failed, what passed, and what is still unobserved?

That is synthetic observation worth taking seriously.

## Fidelity forcing

The engineering version of this is **fidelity forcing**.

Fidelity forcing means designing agentic systems so that low-fidelity narrative completion cannot satisfy the task. The system must produce independently observable evidence, pass adversarial probes, and repair mismatches until the intended reality state is proven.

Different observations select for different realities:

- **Unit tests** — local logic correctness
- **Typechecks** — interface consistency
- **Browser video** — visible user-flow correctness
- **Network logs** — causal request correctness
- **Database probes** — persistence correctness
- **Screenshots** — visual state correctness
- **Human review** — intent, scope, taste, judgment
- **Adversarial agent review** — theater detection
- **Production telemetry** — real user outcomes

![a5 the filter](/blog/reality-needs-observers/images/a5-the-filter.png)
*Confident claims and narrative completions go in the top. What comes out the bottom is only what survived measurement. Each layer is a different observation type. Run fewer layers and you get less reality. The stack you choose is the world you see.*

If I observe only CI, I get CI-shaped reality.

If I observe user behavior, network causality, data persistence, screenshots, diff scope, adversarial review, and production telemetry, I get a higher-fidelity world.

That is not superstition. It is choosing the measurement stack that corresponds to the reality I want to stabilize.

## The factory law

The law is simple:

> No agent task may close on self-report.

A builder agent saying "done" is not done. It is a claim.

The claim has to pass through an observer network:

- declared reality state,
- independent observer,
- substrate probe,
- proof artifact,
- adversarial question,
- repair loop,
- review boundary.

This turns agent work from narrative into state.

A healthy factory does not ask agents to be trustworthy. It builds conditions where trust is earned by evidence.

## The grounded version

What the experiments force me to take seriously: measurement is not incidental. Observation is not always passive. Records matter. Correlations matter. The apparatus matters.

Then I can look back at my own domain and say:

> Agentic software does not become reliable at generation time. It becomes reliable through measurement networks.

The work is not to stare harder.

The work is to build better observers.

The work is to surround agentic creation with instruments that force reality to answer.

That may sound mystical at first. But in practice it looks like tests, traces, screenshots, logs, reviews, telemetry, adversarial agents, and proof chains.

The metaphysics opened the door.

The engineering tells me what to build.

---

*Part of The Observer Series. Episode 1: [Your AI Isn't Hallucinating. It's Lying.](URL)*

---

Read the canonical version and related series on davidmieloch.com.

Read the canonical version: https://davidmieloch.com/blog/reality-needs-observers?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=reality-needs-observers
