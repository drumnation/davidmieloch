---
title: "The AI Cost Rug Pull Isn't a Bubble. It's a Filter. - Audio Version"
sourceArticle: "the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter"
sourceHash: "8c77729ddd943df5f78aa4e97f1975eceeaac6416f6cef21dbe19fee013b4e43"
status: "needs-approval"
preparedAt: "2026-06-28T00:48:31.297Z"
format: "spoken-markdown-v1"
---

The A.I. Cost Rug Pull Isn't a Bubble. It's a Filter..

Something visible is happening right now across the A.I. landscape: subscription plans are ending, token costs are spiking, and the rates that felt almost-free for the past two years are giving way to something that looks, to a lot of people, like a 23x price increase.

The reaction I'm seeing (and understanding) is that this feels like a bubble bursting. All that talk about A.I. replacing jobs, transforming industries, compressing decades of work into months. And now the bill arrives and it's enormous. The whole thing starts to look like a scam.

I want to offer a different read. Not to be contrarian. Because I'm living on the other side of this number and the math looks completely different from here.

What the Price Increase Actually Reveals.

The subsidized rates didn't just lower costs. They obscured something important: most A.I. use wasn't generating proportional value.

Using A.I. as a smart autocomplete, a faster Google, a writing assistant, a pair-programming buddy: these uses are real and have genuine value. But they're approximately human-rate activities. You're still one person getting things done at roughly one-person speed, with a smarter tool in your hand. The cost-benefit math on that model collapses when prices normalize.

What the 23x increase is doing is filtering. It's sorting the people who were using A.I. at human scale from the people who were using it to build something that operates at a different scale entirely.

The filter isn't exposing a bubble. It's revealing who built pipelines and who didn't.

The Wrong Mental Model.

The dominant image of A.I. in the workplace is still a human at a desk, talking to a chatbot, getting help with tasks. One person, one A.I., working together.

That model is fundamentally inefficient. I say that as someone who spent time working that way before I understood what the alternative looked like.

The human-to-A.I.-to-human ratio keeps the human as the bottleneck. Every loop requires a person to initiate it, review it, approve it, and hand it off. You've made the person faster, but you haven't changed the fundamental rate limiter. You're using a better shovel when what you actually have access to is a crane.

A crane doesn't just dig faster. It's a different category of machine that makes different categories of projects possible. You don't compare them on shovels-per-hour.

Think of it as juggling. Each capability you want to bring to bear in an A.I. workflow is another ball. Code review is a ball. Testing is a ball. Documentation is a ball. Dependency management is a ball. Every new technique or improvement you want to add is another ball. A human can juggle some number of balls before the whole thing collapses. Getting better at prompting is getting better at juggling: useful up to a point, but the ceiling is two hands.

The factory doesn't have that ceiling. Each capability becomes an agent, and agents don't get tired, don't lose focus, and don't drop balls because they're tracking too many things. More importantly: you can copy a good agent. A good agent is the same agent every time.

You can't copy a juggler.

To be clear: not everything is juggling. The factory handles execution at scale. Research, ideation, the back-and-forth of figuring out what to build and why: those still have a different character. The human advantage in that phase comes from judgment about what matters, not throughput. The factory amplifies the output of good direction. It doesn't replace the direction itself.

At least not yet. Whether that changes as A.I. becomes more capable and creative is a longer question, and an honest one. But right now, the person who knows what to build and can set a factory in motion to build it is in a fundamentally different position than the person juggling prompts.

The Factory Model.

What I've been building (and what I believe the serious players at Big Tech are building right now, even if they're not talking about it publicly) is a different thing.

It's a pipeline. A system where agents handle code review, C.I., pull request management, testing, merges, documentation, and deployment. Not assisted by humans at each step. Running, with human oversight at the level of the factory floor, not the assembly line.

When this works, the math inverts. You're no longer asking "is A.I. worth the cost per task?" You're asking "what is the output rate of the factory, and what would it cost to produce that with humans?"

I had gotten an early version of this to roughly 573x the productivity I'd had in a non-A.I. year. That number is rough and I haven't tracked it recently. But even if it's half that (280x), the economics of a 23x token cost increase are trivial. You're still up by an order of magnitude.

The people calling this a bubble are doing the division wrong. They're dividing the cost by the task. They should be dividing it by the factory.

Why the Factory Is Actually Cheaper Per Task.

Here's a point that tends to surprise people: a well-designed factory isn't just more productive than interactive pair programming. It's also cheaper per unit of work.

The reason is context window management.

In interactive mode, you're inside the system. You can't mechanically control what gets passed in from outside the session. The conversation history accumulates. Context windows fill. And context window cost scales roughly quadratically: a context twice as long doesn't cost twice as much to process. It costs significantly more. Long, sprawling sessions are expensive in ways that aren't obvious from the per-token price alone.

A factory controls context from the outside. Each agent gets exactly what it needs for its specific task: the relevant file sections (not the whole codebase), the precise action to take, just enough context to act confidently without needing to know the whole plan. The task chunk is the minimum viable context. When you've already determined the exact actions at the planning stage and can ensure those actions happen reliably, you don't need to load the agent with everything. You need to load it with exactly the right thing.

This means each agent call is dramatically cheaper than what you'd spend iterating on the same problem in an interactive session, even at higher per-token rates. You're spending more per token but using far fewer tokens per task.

The factory can also make model selection decisions at the plan level. Simple execution tasks don't need the most capable model. They can be routed to lighter, cheaper options. The output is verified; if it's wrong, the system corrects and learns to route differently next time. The cost of straightforward tasks drops further without sacrificing overall quality.

None of this is available when you're inside a session, interacting manually. You can't route yourself to a cheaper model. You can't mechanically constrain your own context window. The factory makes these decisions from the outside, and that's precisely the advantage.

Why the Problems Made This Necessary.

I'm not building a factory because it's an interesting technical challenge. I'm building it because the problems I'm trying to solve can't be solved any other way.

There's a category of problem that's common in mature software companies: mountains of legacy systems that still work, still generate revenue, still matter to investors, but are accruing technical debt faster than any team of engineers can address it. You can't hire your way out of it. Adding engineers doesn't linearly add capacity; it adds coordination overhead. You hit a wall where more people means more meetings, not more output.

The factory doesn't have that problem. Scaling up agents actually does increase throughput. The coordination problem that kills human teams is solved architecturally rather than organizationally.

When you need to upgrade a decade of legacy debt in a timeframe that matters (and you're working against a clock that real business risk is attached to) the factory isn't a nice-to-have. It's the only path that closes.

Not Just Legacy: The Vibe-Coded Pipeline.

I've mostly talked about the factory in the context of legacy modernization, because that's where the problem is most visible. But there's another end of the spectrum that the same factory handles: vibe-coded applications.

The dynamic plays out in organizations everywhere right now. A non-technical product manager or founder builds something in an afternoon using A.I. tools. It works. It solves a real business problem. They show it to the engineering team, and the engineers (accurately) point out that it's not production-ready, not secure, not maintainable, not scalable. The creator can't evaluate those claims technically. The engineers have every incentive to protect their turf by making the bar seem unreachable. Nobody's necessarily lying, but the conversation goes nowhere useful.

The factory changes that dynamic.

A vibe-coded application contains all the right atoms: the features, the user flows, the business logic, the product decisions. It's held together with spaghetti, but the blueprint is in there. A factory can ingest that blueprint and reconstruct it properly, faster than building from scratch and without losing the original intent.

This creates a new pipeline: prototype as spec. The non-technical creator builds the thing they need, at whatever quality level they can manage. The factory takes that as input and outputs something that can actually ship. The creator's investment in building the prototype becomes useful in a way it wasn't before. And the tension between the creator and the engineering team has a resolution that doesn't require either side to be wrong.

It also maps onto something happening at scale across organizations right now: the quiet replacement of expensive SaaS tools. Most companies use a small fraction of the features in any given platform, but pay for all of them. Subscription rates have been climbing as investors push for more revenue. At some point, someone realizes they can vibe-code the 5% of features they actually use in a day and cut the subscription entirely. The catch is that the result is fragile and unscalable. The factory can fix that too. An internal tool built quickly enough to work becomes a proper product with the right pipeline behind it.

Legacy code and vibe-coded prototypes look like opposites: one is old, one is new; one has too much structure, one has almost none. But from the factory's perspective, they're the same problem. Both contain the right business logic. Neither has the engineering quality to go further on its own. The factory is what converts either one into something you can actually build on.

Time Compression as Risk Reduction.

One thing I don't hear discussed enough: the value of A.I. factories isn't just throughput. It's what compressed timelines do to risk.

If a project needs to reach a certain state in twelve months and you can get to 90% of that state in one month, you've bought yourself eleven months to handle the last 10%. That sounds abstract until you've been in situations where the last 10% is where all the actual complexity lives: the edge cases, the integrations, the things you didn't know you didn't know.

Getting there fast means you find out early what's hard. And finding out early means you have time to respond.

The alternative (grinding toward the same target at human pace) means you discover the hard parts when you're nearly out of runway. That's not just slower. It's a categorically different risk profile.

What Big Tech Is Actually Building.

I don't know exactly what's happening inside Google, Microsoft, or Meta right now. But I can pattern-match.

They're watching the same trajectory I'm watching. They see the same leverage. And they have resources to build factory pipelines at a scale that would be impossible for a single developer to manage alone. If anyone gets this right at scale (if a major tech company fully automates its software production pipeline) they don't just move faster. They own the capacity to produce software at a rate no human organization can match.

That's not a modest competitive advantage. That's the entire game.

I think the race to own that capacity is already underway, quietly, and the A.I. cost normalization is one of the signals. The subsidized period was the land-grab. The normalization is the moment where serious industrial investment starts.

The Filter Is Working.

So here's where I land: the 23x feels like a rug pull if you were using A.I. at human scale. And for a lot of use cases, it probably was: not because the tools are bad, but because the use cases weren't generating 23x the value.

That's not a disaster. That's information.

The cases where the math still works (where it works spectacularly) are the factory cases. The pipeline cases. The problems so big that humans alone can't solve them fast enough, and where the alternative to automation isn't "do it slower" but "don't do it at all."

Those cases aren't going away. The problems are real. The cost of not solving them is real. And the factory is still the only tool that closes the gap.

The filter is just making that clearer. If your current approach is prompting skill: getting better at asking, iterating faster, crafting sharper instructions. That's juggling. It has real value. But at scale, infrastructure beats juggling every time. The filter is separating people who built pipelines from people who got better at prompts, and that gap will only widen.

There's also an identity shift worth naming. A developer claims the output: they wrote the code, made the decisions, built the thing. A foreman claims the factory. They don't need to execute; they orchestrate the system that does. One person with a well-built factory can out-produce a team of developers, and the value they bring is judgment and direction, not throughput.

This is a different layer of the stack. And it's the one that compounds.
