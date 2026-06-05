# *Or: What happens when you let an autonomous execution engine run for 72 hours straight*

[sunken-treasure.md](./sunken-treasure.md)*]*

## The Aftermath

*[Written three days later]*

The execution engine ran for three days straight.

I've never had continuous work that long before. Not from a human team. Not from any system I've built. Just agents picking up tasks, completing them, hitting walls, routing around problems, and continuing.

The front-end came out surprisingly close. Right colors. Right layout patterns. Components that actually matched what designers expected - despite no one giving explicit direction on aesthetics. The agents had absorbed enough context from the existing codebase to extrapolate what "right" looked like.

But here's what I actually learned: the execution layer matters more than the planning layer.

I'd spent months building sophisticated planning infrastructure. GROVE methodology. Arbor verification. Quality gates with 0-100 scoring. Beautiful document pipelines. All of it designed to ensure that plans were *good enough* before execution began.

What I discovered is that execution infrastructure needs the same level of sophistication.

When an agent hits a wall at 2am, what happens? When a migration step fails in a way nobody anticipated, how does the system recover? When files get created but not properly integrated, who notices?

The planning documents didn't have answers for these questions. Because I'd never run anything this long before.

## The Protocols

Three days of continuous execution taught me more about agent orchestration than months of planning ever did:

**Memory persistence matters.** Agents at 2am don't know what agents at 6pm discovered. I added a pre-query pattern that pulls relevant failures and decisions from a knowledge graph before any agent starts. Now each agent inherits what came before.

**Monitoring isn't optional.** I built a HUD showing progress bars, token tracking, and recent activity. Without it, no idea what was happening. With it, I could check between games and know instantly whether to intervene.

**Task granularity drives success.** The 7-phase plan expanded to 299 individual checkpoints. Each small enough for a single context window. Each with explicit verification criteria. The plan was a roadmap. The checkpoints were actual instructions.

**Fix-before-skip is critical.** When something fails, mark it for retry before moving on. Skipping broken steps creates orphaned dependencies downstream. I learned this when a migration left half the consuming apps pointing at files that didn't exist.

## The Realization

By day three, I understood something I'd been avoiding:

This project would have taken more than three days. More than a week. Maybe more than a month.

Not because the AI was slow. Because the *problem* was bigger than I'd imagined. The scope creep from Saturday night was just the beginning. Every migrated component revealed three more that needed attention. Every fixed dependency exposed assumptions baked into five other services.

Let me be clear: we didn't succeed in migrating these apps. Not yet. What we succeeded at was beginning the process in a meaningful way.

The AI can research legacy codebases in a way no human really can - and at a speed that's simply impossible for a human. It catalogued everything. It mapped every connection. It identified every drift from upstream dependencies. That alone would have taken months of human archaeology.

But I also discovered problems. Running generations this long - longer than I ever had before - revealed new failure modes. Places where the garden grows off course. Patterns I hadn't anticipated. This run showed me things I need to adjust in the scaffolding before the next attempt.

That's a different kind of valuable than "project complete." It's archaeological *and* educational. We know exactly what's down there. And we know more about how to build the tools to recover it.

The treasure isn't recovered yet. But we finally know what the treasure *is* - and we've learned what we need to go get it.

## The Pause

I stopped the execution after day three. Not because it failed, but because I ran out of Claude credits.

There's something absurd about that sentence. "I had to stop my autonomous software archaeology expedition because I exceeded my AI budget." A year ago, that problem didn't exist. Neither did the capability.

In the meantime, I have more documentation, more architectural clarity, and more recovery progress than my entire team produced in the year before the project was cancelled.

All from a Saturday experiment that was supposed to be low-stakes.

## The Bottlenecks

Here's where it gets interesting from an infrastructure perspective.

During this experiment, I was focused on my kids on the weekend. I didn't want to mess it up, so I ran one Claude instance driving the execution stack. One to three agents at a time for most of it. When it got up to ten, my machine was fine. Running 24/7 with a single instance, I eventually hit the weekly limit after about two and a half days of continuous coding. No account cycling needed.

But that's not how I normally work.

When I'm actively developing - four Claude instances running in parallel, easily scaling to eight - I hit my 5-hour session limit in 2 hours. Multiple agents spawning sub-agents, running tests in parallel for TDD, coordinating across different parts of the codebase. I cycle between three Claude Max accounts just to keep momentum. Boris, the creator of Claude Code, says he regularly juggles 15 instances. But he has unlimited tokens.

My laptop overheats when agents spawn too many sub-agents or run tests simultaneously. The machine itself becomes a bottleneck. A better machine would help. An additional machine would help more.

The real solution is probably moving dev environments to a well-resourced VPS. Scale resources as needed. Remove the thermal throttling. Enable operations that run for days or weeks without my laptop being involved at all. One powerful cloud machine per project - isolation and infinite multi-tasking.

I tried running swarms on both laptop and cloud simultaneously. They don't merge well. They need to work separately. The architecture isn't there yet for seamless hybrid execution.

But here's the thing: even with all these bottlenecks, even running on an overheating laptop, I recovered more in three days than a team did in a year.

Imagine what this looks like properly resourced.

## The Math

Let me put real numbers on this.

I was burning through three Claude Max subscriptions worth of tokens. That's $650/month. At this rate, each subscription lasts about two days of serious work with this system. Add in a ChatGPT Pro subscription for certain tasks, Gemini Pro for others, SuperWhisper for voice transcription, credits on services like Parallel.ai and OpenRouter for specialized research and model access. All in, maybe $800-900/month in AI tooling.

My brother thinks it's too much. I think we've never had the ability to pay this little for this kind of technical power - if you can harness it.

A single project manager costs the company somewhere between $8,000-12,000/month in salary alone. Benefits, overhead, meeting time - call it $10,000 conservatively.

$900 vs $10,000.

If we took *one* PM's salary and allocated it entirely to AI compute, we'd have $10,000/month of token budget instead of $900. That's 11x what I'm spending. And this weekend experiment - which recovered more than a year's worth of stalled progress - ran on the equivalent of a few days of one PM's salary.

The math isn't subtle. The question isn't whether this is cost-effective. The question is what we could build if we actually resourced it properly.

## The Scaffolding

Maybe I'm underselling how much work went into getting here.

I pulled the usage data from my Claude session logs this morning. 1,255 sessions in my Brain Garden monorepo alone. 646MB of conversation transcripts. Another 212 sessions in my home directory project. All of it spanning about six to eight months of continuous experimentation.

That's how long it took to build the scaffolding that makes a three-day autonomous run possible.

I found ways to force test-driven design. Ways to run validation between every turn with hooks. Ways to inject architectural patterns at exactly the right moments. Ways to spawn specialized agents that already have my patterns baked in - saving context, saving time, saving corrections. CLIs that make everything smoother for agents. Hooks that validate before PRs can merge. Memory systems that persist what worked and what didn't.

I can ignore the code while it runs because I wrote rules that address nearly everything that gets written. If the app is slow, there's a performance protocol. If tests are missing, there's a TDD enforcement hook. If the architecture drifts, there's a validation gate that catches it between every session.

I can run this for three days and trust it because I've given it so many rules, so many tools, and now a brain that remembers. It pounds away at hard problems while I sleep because I spent months teaching it what "right" looks like.

1,255 sessions. That's the real cost of getting here. Not just $650/month in tokens - but months of building the system that knows how to spend those tokens wisely.

## The Vision

I want to enable this for the entire organization.

First developers - getting everyone working with these systems, these protocols, these execution engines. Then training non-technical staff to create software that speeds them up or automates their jobs.

That's the role I'm building toward: Principal AI Architect. Not just using AI to code faster. Using AI to turn an organization into something fundamentally more capable than it was before.

## The Open Questions

All of this assumes I'm working solo. In this case, I was.

But what happens when you try to coordinate multiple battleships? The patterns for team collaboration with these tools don't exist yet. Coordinating on minute details is difficult when everyone has their own execution engine running at full speed.

Maybe one architect builds out the plans and everyone else works on the remaining 10%? Maybe everybody gets their own battleship? I don't know yet. What I do know: definitely have the person who built the battleship train everyone before they start firing the cannons.

This technology can be equally destructive without proper guardrails. The same system that recovered six years of abandoned work in three days could also create six years of technical debt in the same amount of time - if the protocols aren't there to prevent it.

The weekend experiment was proof of concept. The three-day run was proof of scale. What comes next is figuring out how teams work together in this new paradigm.

---

The protocols keep improving. Every time we solve a problem, we bottle the meta-thinking so the system tries it automatically next time. Over time, I find myself needing to intervene less. I can trust it to handle certain patterns, so I watch those less closely.

That's the real unlock: not AI that codes, but AI that learns how you want it to code. That follows your protocols. That produces output you recognize and trust.

The execution engine is paused. The treasure map is complete. The submarines are in dry dock waiting for fuel.

But I know what's down there now. And I know the dive is worth taking.
