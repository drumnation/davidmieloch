---
platform: "devto"
mode: "api-draft-or-manual-copy"
post_mode: "full-mirror"
title: "The Foreman"
canonical_url: "https://davidmieloch.com/blog/the-foreman"
tracked_url: "https://davidmieloch.com/blog/the-foreman?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-foreman"
source_slug: "the-foreman"
generated_at: "2026-05-18T21:41:27.866Z"
canonical_support: "supported"
approval_required: true
public_publish_allowed: false
---

# The Foreman

## Posting guidance

Developer-facing mirror draft with canonical URL preserved.

- Do not publish without David approval.
- Preserve canonical URL: https://davidmieloch.com/blog/the-foreman
- Record the final platform URL back in content/distribution/platform-ledger.json.

## Copy

![a3 hero foreman](/blog/the-foreman/images/a3-hero-foreman.png)

## The Wrong Debate

Right now there's a busy genre of content about AI's limitations. The model hallucinated a library that doesn't exist. It got the edge case wrong. The senior developer caught an error a junior would have missed. "See", "you still need us".

There's something real in all of it. The errors are genuine. The catching of errors is genuine. The case that skilled humans add value to AI output is, for now, largely true.

But it's addressing the wrong question. The debate is about quality. The actual competition is about time.

---

## The Time Compression

![a3 time compression](/blog/the-foreman/images/a3-time-compression.png)

How fast the factory builds depends on the project and whether the system is cooperating. On a good run it moves fast. On a bad one I'm debugging pipelines more than shipping. The non-determinism doesn't disappear just because you've automated the generation.

But here's what I think the conservative case looks like: a weekend of generation, then two or three engineers over two months cleaning it up and making it production-ready.

Compare that to the traditional unit: five engineers over a full year.

Even in the pessimistic scenario (generation produces something rough, a small team spends months fixing it) you still end up ahead on time, ahead on headcount, and ahead on cost. And that's before the factory gets better, before the specs get tighter, before the process compounds.

Now make it ten times more expensive. The math still works. The time compression doesn't go away when costs go up. A smaller team finishing in two months doesn't become less competitive than a larger team taking a year just because the tokens cost more.

Here's what the curve means in practice: someone who spent four years building something before these tools existed might be lapped by someone who started last weekend with current models. The latecomer didn't work harder. They started later, when the tools had caught up to the problem. A team that spent a month on a product watches one architect rebuild it in a day. The month they spent is now a liability. They didn't lose on quality. They lost on time.

---

## The Arms Race

![a3 arms race](/blog/the-foreman/images/a3-arms-race.png)

This is what the craft argument misses. The question isn't whether AI-generated code is as good as human-written code. The question is what happens to companies that build the factory capability versus companies that don't.

Once one company in a market can ship with a smaller team in a fraction of the time, the companies that can't don't have a quality argument. They have a timeline problem. Customers don't wait. Markets don't wait. The competitor who shipped first is already on their second iteration before the hand-crafted version is done.

The factory doesn't win because it's better. It wins because it's first. And then, because it iterates faster, it gets better.

Once enough companies start building this capability, it stops being optional. You can't stay competitive by hand-building software when your competitor is running a factory. It's not a better tool. It's a different kind of company. That dynamic has a name: an arms race. And in an arms race, the question of whether to participate answers itself.

---

## We Moved the Motor Too

![a3 motor moved](/blog/the-foreman/images/a3-motor-moved.png)

The original factories didn't figure this out immediately. When electric motors arrived, most replaced the steam engine with a motor and kept the same floor layout. Same belts, same pulleys, same organization. The gains were real but modest. It took roughly thirty years for operators to realize the motor could go anywhere: at each machine, not at the center. That the whole floor needed to be reorganized around it. That's when productivity exploded.

Software is in the same delay. Pair programming with AI is the electric motor in the old position. Better than what came before. Not the reorganization. The human is still in the loop on individual tasks, which makes the human the rate-limiting step the moment generation gets fast enough. Generation is already fast enough.

In the 1920s, the motor didn't disappear. It moved. Instead of one central engine driving everything through belts and pulleys, there was a motor on each machine, positioned where it could do the most work. The factory looked similar from the outside. The inside was completely reorganized.

The same thing is happening to the developer. Not disappearing. Moving. Instead of writing every line, writing the PRD the factory builds from. Instead of reviewing every diff, designing the system that reviews its own diffs. Instead of debugging the code, debugging the factory.

What survives: the ability to specify clearly, to recognize when the output is wrong, to understand the system well enough to fix it when it breaks. Those are foreman skills.

---

## The Archaeology

![a3 sequence vertical](/blog/the-foreman/images/a3-sequence-vertical.png)

Recognizing when the output is wrong sounds simple. It isn't. At factory scale you're not reading code line by line. You're speed-reading terminals. Scanning agent thinking for something that feels off. A single word in the reasoning that doesn't belong: an obsolete concept, an assumption from the wrong context. One word, but it tells you the system is unhealthy at that point.

Then comes the archaeology. Why did it think that? What assumption led to that word? What will that assumption produce downstream? You trace the wrong thinking back to its root until you understand what the system believed and why it was wrong. Then you fix the belief, not just the output. Change the prompt, add context, restructure the workflow. The fix lives at the level of thought, not code.

One category of wrong belief deserves its own mention. At factory scale, a security assumption that makes it into a spec doesn't produce one vulnerable function. It produces the same vulnerability replicated across everything the factory touches. A human team's security gaps tend to be isolated: one tired developer, one rushed review. A factory's gaps are consistent. That makes security awareness more important at factory scale, not less. A factory without a security-focused agent reviewing every artifact isn't just insecure. It's systematically insecure in a way a human team usually isn't.

The gap between a healthy system and an unhealthy one narrows over time. The foreman gets better at reading it. The system gets better at catching its own failures. Eventually you're checking for the rare case that slips through both.

Here's the pattern worth watching. When AI started replacing junior work, the argument was about taste and judgment and the things AI gets wrong. That case is still being made. The developers who learned to pair with AI adapted, and they're ahead of the ones who didn't.

But the same argument is coming for them. The developers who built AI-native workflows will face factories that don't need a human in the loop on individual tasks. And the argument they'll reach for is the same one: you need human judgment, you need someone in the loop, the system makes mistakes. Same move, one level up. They won't notice they're making the case the people they replaced were making.

Thirty years compressed into five. Possibly less. The feedback loops are shorter. The experiments are cheaper. The people running the experiments are also building the tools. The tools they're building are factories.

---

## The Automation Stack

![a3 automation stack](/blog/the-foreman/images/a3-automation-stack.png)

A factory is a specific thing. It's not AI doing more of what a developer does. A factory is a system where the human is not in the loop on individual tasks, and the system improves itself over time. That second part is not optional. You can't architect a factory without building self-evaluation in, because the factory has to catch its own failures. Which means the gap between a factory and a traditional team compounds. The factory gets better by design. The team stays roughly constant.

There are roughly six levels to this, and they're not evenly spaced.

At the bottom: AI suggests your next line. You're still writing the software. Tab to accept, or don't.

One level up, you hand the AI a scoped task. Write this function. Build this component. Refactor this module. The AI does the work; you review everything. This is what most teams mean when they say AI-native.

Move further and the AI navigates across files, builds features spanning multiple modules. You still read every diff. Most developers who believe they're at the frontier are here.

Then the relationship flips. You're mostly directing and reviewing, not coding directly. The AI submits PR-level work. You approve or reject at a higher level of abstraction.

One more step: you write a spec, walk away, come back later. You're not reading the code anymore. The key skill becomes writing good specs and evaluating whether what came back is correct.

At the top: specs go in, working software comes out. No human writes the code. No human reviews the code.

The important point isn't just the levels. It's that most people think they're farther along than they are. Most teams are at level two or three. The bottleneck isn't better tools. It's spec quality, evaluation design, and the willingness to stop reading every diff.

A ten-minute conversation becomes a PRD. The PRD becomes an execution plan. The plan assigns agents, the agents execute, verify, and review. You find out if it worked without having written a single line of code.

All you had to do was tell them to do it. The factory took care of everything else.

The competitive gap between these levels isn't linear. A developer orchestrating a well-designed factory isn't five times more productive than a developer using a copilot. The difference in leverage is an order of magnitude, not a coefficient. And as more people climb the stack, the people who stay at level one or two aren't just less productive. They're competing against a different category of worker entirely.

I'm already seeing companies experiment with this. Different team configurations. Smaller mandates. Different ratios of factory builders to factory operators. Nobody has figured out the right structure yet. But the experiments are happening, which means the results are coming.

The question for anyone in software right now isn't whether to use AI. It's how far up the stack they're willing to go.

---

**Further reading**

[The 5 Levels of AI Coding (Why Most of You Won't Make It Past Level 2)](https://www.youtube.com/watch?v=bDcgHzCBgmQ) — Nate B. Jones, AI News & Strategy Daily

> "The bottleneck has moved from implementation speed to specification quality."

[The Five Levels: from Spicy Autocomplete to the Dark Factory](https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/) — Dan Shapiro, January 23, 2026

> "You're not a developer. You're not a development manager either. You've now become that which you loathed: you're a PM."

---

*This is Part 3 of a series. [Part 1: The Golden Hammer]() covers the synthesis pattern. [Part 2: The Factory]() covers how the factory is built.*

---

Read the canonical version and related series on davidmieloch.com.

Read the canonical version: https://davidmieloch.com/blog/the-foreman?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-foreman
