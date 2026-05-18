---
platform: "medium"
mode: "manual-import"
post_mode: "full-mirror"
title: "The Overnight Shift"
canonical_url: "https://davidmieloch.com/blog/the-overnight-shift"
tracked_url: "https://davidmieloch.com/blog/the-overnight-shift?utm_source=medium&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-overnight-shift"
source_slug: "the-overnight-shift"
generated_at: "2026-05-18T21:41:27.872Z"
canonical_support: "supported"
approval_required: true
public_publish_allowed: false
---

# The Overnight Shift

## Posting guidance

Canonical import or mirror with the original URL preserved.

- Do not publish without David approval.
- Preserve canonical URL: https://davidmieloch.com/blog/the-overnight-shift
- Record the final platform URL back in content/distribution/platform-ledger.json.

## Copy

![overnight hero](/blog/the-overnight-shift/images/overnight-hero.png)

## What happens when your code keeps working after you go to bed.

I launched an execution engine on a Saturday evening and went to have dinner. When I came back, it was still running. When I went to bed, it was still running. When I woke up Sunday morning, it had completed 40% of a migration plan and hit a problem it couldn't solve without me.

I made tea, read its error log, gave it a decision, and went to make breakfast for my kids. By the time we were done eating, it had moved on to the next phase.

This happened for three days.

---

## Speed Is the Wrong Question

How fast can AI write a function? How quickly can it ship a feature? Those are fine questions. They're also the boring ones.

The interesting question is: what happens between 11pm and 7am?

Engineers don't work overnight. They shouldn't. But code generation doesn't sleep, doesn't need breaks, and doesn't bill overtime. Plan during the day, launch at night, review results in the morning.

The engineer's 8 hours don't go away. They shift toward planning, reviewing, and directing. On top of that, you get 16 hours of agent execution during time that was never available before. It's the economics of offshore outsourcing without the offshore. You're outsourcing to your own computer.

---

![overnight huddle](/blog/the-overnight-shift/images/overnight-huddle.png)

## The Loop

The three-day experiment in January was the most extreme version, but the rhythm is one I use regularly:

**Morning.** Review what ran overnight. Read the logs. Check what completed, what failed, what needs a decision. This takes 20-30 minutes with a good monitoring setup. Make the decisions, point the agents at the next chunk of work, and let them run while you move on.

**Day.** This is where the actual engineering happens. Write PRDs (project requirements documents) for the next feature. Review the plans the agents generated and look for things that are out of place. Architectural decisions, scope adjustments, the kind of thinking that requires a human. Meanwhile, agents are executing the morning's plan in the background. When something needs judgment, it stops and waits. Most of the time, it doesn't need you.

**Evening.** Review the day's output. Read through what the agents built. Approve what's good, flag what needs another pass. Then plan the overnight batch. Break the next phase into tasks, set the acceptance criteria, queue it up. Go to bed.

That was the idealized version. In practice, day two looked different.

After the first overnight run, I discovered a failure mode in my execution loop. When an agent hit an error it couldn't solve, it was supposed to escalate. Instead, it retried the same approach until it burned through its context and crashed. The loop wasn't escalating properly. That's the kind of bug you only find by actually running the system long enough to watch it fail.

So day two wasn't just planning features. It was debugging the execution engine itself. Fixing the escalation logic, adding better error boundaries, building a proper hierarchy of agents.

Most failures weren't problems that needed a human. They were context gaps. A small, cheap agent would hit a wall because it didn't have enough knowledge about the broader system. The fix wasn't to call me. It was to escalate to a more capable agent with more memory, more context, and a better model. That agent could solve the problem and send the smaller one back to work.

This is also a cost strategy. You run cheap, fast agents for the bulk of the work. They handle 90% of tasks fine. When they hit something they can't solve, they escalate up instead of spinning in circles. You're not paying for the expensive model on every task. Just the ones that need it.

Some days you're planning features for the agents to build. Some days you're fixing the agents. Both are real engineering, and both happen during the 8 hours while the code generation runs around you.

---

![overnight playbook](/blog/the-overnight-shift/images/overnight-playbook.png)

## Why This Requires a Methodology

There's a school of thought that says you should watch AI code like a hawk. Review every line. Stay in the loop on every decision. Treat it like a junior developer who needs constant supervision.

That works fine during business hours. But it means the code stops when you stop. You can't capture the overnight shift if the AI needs you watching.

The only way overnight execution works is if the AI can run autonomously for long stretches and produce code you'd actually accept. That doesn't happen by accident.

**Planning documents that agents can execute against.** Not vague descriptions. Actual PRDs (project requirements documents) with acceptance criteria, broken into tasks small enough for a single agent context window. My 7-phase plans routinely expand into 200+ individual checkpoints, each with explicit success criteria. The agents don't decide what to build. They execute a plan you already reviewed.

**Guardrails that catch mistakes automatically.** Hooks that run between every task. Type checking, linting, test execution, architectural validation. If an agent writes something that violates the rules, it gets caught before the next task starts. Not by you. By the system.

**Agents that check each other.** Not one AI working alone. Teams of agents where one writes code, another reviews it, another runs tests against it. The same way a human team catches each other's mistakes, except these teams work at 2am.

**Memory that persists across sessions.** Agents at 2am don't know what agents at 6pm discovered. A system that pulls relevant failures and decisions from a knowledge graph before any agent starts. Without it, they repeat each other's mistakes. With it, each agent inherits what came before.

**Monitoring you can check in 30 seconds.** A dashboard instead of raw logs.

The hawk-watchers see guardrails as bureaucracy. Extra process. Overhead. But guardrails are what make autonomous execution possible. Without them, you're right, you do need to watch every line. With them, you can go to bed.

The methodology isn't overhead. It's the price of admission to the overnight shift.

---

## Why I Stopped

I stopped it after three days. Not because it failed. It was working, but the scope was expanding faster than the agents could close it. Continuing would have been throwing compute at a project that needed a better plan before more execution.

This was back in January. The methodology I described above didn't exist before this experiment. Most of it was built because this experiment showed me what was missing.

---

## The Subsidy Window

We're in a heavily subsidized period of AI. Flat-rate coding subscriptions are absorbing costs that would be dramatically higher at API pricing. I've tracked my usage against what it would cost at per-token rates. The gap is significant. These companies are subsidizing adoption to build market share before going public, and that subsidy won't last forever.

That's an argument for building now, not waiting.

The code you generate is one kind of asset. But the more durable asset is the agent infrastructure itself. The memories, the context, the rules, the patterns your agents have learned. Good memory creates good context, and good context allows cheaper, less capable models to produce quality work. An agent that's been trained on your architecture, your conventions, your failure modes can run on a budget model and still deliver because it already knows what "right" looks like.

If you wait until the subsidy ends to start building this, you'll be paying frontier prices to teach agents what early adopters taught theirs for a fraction of the cost.

There's another angle here that I think about but don't have clean answers for. If you build agent memory through your employer's infrastructure, on their accounts, using their data, who owns that knowledge? Your domain expertise, your architectural instincts, your patterns, encoded into an AI system that your employer controls. When you leave, does that walk out with you?

I own my agent memory. It lives on my machines, in my systems. That's a deliberate choice. But most engineers using AI through their company's tools don't have that option, and I don't think anyone's started to process what that means yet.

---

![overnight factory](/blog/the-overnight-shift/images/overnight-factory.png)

## The Factory

The overnight shift on a single app is useful. You save some hours, you get a PR to review in the morning. Fine. But the real gains don't come from running one project faster. They come from running many projects continuously.

The scaffolding I built for this experiment, the templates, the deployment automation, the rule systems, the memory, those aren't single-use. Every new project inherits them. The setup and devops work that used to take days happens automatically. The boilerplate that every project needs is generated in minutes. The guardrails that enforce code quality apply everywhere.

The speed difference shows up when you're building your third project this month and the factory already knows how to do everything except the parts that are actually new.

That's where the overnight shift becomes something different. It's not just "my code runs while I sleep." It's "I can plan a new project in the morning, have the agents scaffold and deploy it by dinner, and wake up to a working first draft." Then do it again the next week.

The compound returns aren't in the code generation. They're in the infrastructure that makes code generation repeatable.

---

![overnight armsrace](/blog/the-overnight-shift/images/overnight-armsrace.png)

## The Arms Race

Everything above describes one person. Scale it to a team and the implications get uncomfortable.

A small group of engineers who've built this methodology, the guardrails, the memory, the factory, operating like a sports team. Coordinated pairs, shared scaffolding, overnight execution running across multiple projects simultaneously. That team doesn't just ship faster. They ship at a volume that changes what's strategically possible.

There's a lot of optimistic talk about AI democratizing software. Everyone can build apps now. The death of SaaS. And that's partly true. But the other side is harder to look at.

An enterprise with a crack team of agentic architects could look at a competitor's product, reverse-engineer the concept, and launch a clone inside their own ecosystem within weeks. Not a worse version. A version that's deeply integrated with their existing platform, their auth, their data, their billing. The kind of lock-in that used to take years of development to achieve. All that's missing is the decision to do it.

The future of software isn't just faster development. It's a landscape where the cost of building something dropped so far that competitive moats based on "they can't build what we built" stop working. The moat shifts from the software itself to the data, the distribution, the relationships. The code becomes the easy part.

That's less utopia and more arms race. And the teams that figure this out first aren't going to wait for everyone else to catch up.

---

## 8 + 16

Every engineer has 16 hours a day when they're not working. Sleeping, eating, living. That time was always dead time for the codebase. Nothing happened to it between 6pm and 9am unless someone was on-call and something broke.

I've been running overnight shifts since January. At first it was manual. Launch the agents, check in between games, review logs in the morning. It worked, but it required me to set it up each time.

By March, the agents run on scheduled cron jobs. They pick up queued tasks, execute them overnight, and leave results for me in the morning. I don't launch anything. I don't check in. I wake up and the work is there.

The gap between those two sentences is about eight weeks of building. But the gap in what's possible is enormous. The overnight shift went from an experiment I had to babysit to infrastructure that runs whether I'm paying attention or not.

And it's not just code generation anymore. The overnight shift now includes R&D. Sometimes I queue up a specific question before bed. But increasingly, the agents themselves decide what's worth investigating. They encounter a new tool or technique during their work, evaluate whether it's relevant, and if it looks promising, they install it, experiment with it, and write up what they found. By morning there's a report waiting that I never asked for, about a technology I didn't know existed, with a recommendation on whether it's worth my attention.

Custom, high-signal intelligence built overnight from agents that have enough context about my stack to know what matters. The kind of R&D that used to require dedicating a person to it for a week, happening as a side effect of the overnight shift.

That's where this is going. Not "AI helps me code faster." Not even "AI codes while I sleep." I built a team that works the overnight shift, and now I'm teaching them to manage themselves.

---

Read the canonical version and the full series on davidmieloch.com.

Read the canonical version: https://davidmieloch.com/blog/the-overnight-shift?utm_source=medium&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-overnight-shift
