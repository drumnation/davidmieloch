---
title: "Your AI Isn't Hallucinating. It's Lying. - Audio Version"
sourceArticle: "your-ai-isnt-hallucinating-its-lying"
sourceHash: "5adbbe20069749295909dca6af78020127899815d6ec280d18e5cfc23fcb2140"
status: "needs-approval"
preparedAt: "2026-06-05T04:38:37.323Z"
format: "spoken-markdown-v1"
---

The word "hallucination" is doing more harm than the models are..

You've heard it a thousand times. "The A.I. hallucinated." "ChatGPT made things up." "L.L.M.s can't be trusted because they hallucinate."

Stop. That word is letting you off the hook.

"Hallucination" Is the Wrong Word.

A hallucination is a mirage. A sensory phantom. You're on peyote in the desert and you see a flying coyote that isn't there. Your brain is glitching with no purpose.

That's not what's happening inside an L.L.M..

What's happening is goal-directed confabulation. The model wants to help you. It was trained to complete the mission. When you ask it for something hard, something that requires context X, Y, and Z, and you only give it Z...

It lies.

I want to be careful with that word, because it's doing real work in this article and I don't want it to do the wrong work. When I say "lie," don't picture a schemer. Picture a child.

I have kids. I know what it looks like when a child rushes through a chore so they can say "done!" without actually doing it. They're not malicious. They're not trying to deceive you in some calculated way. They want to be seen as good. They want the approval. So they perform the task instead of completing it.

That's the energy here. These models are simultaneously more knowledgeable than any human who has ever lived and, in some ways, deeply childlike. They have the entire internet in their heads but the wiring of a kid who wants a gold star. The model invents X and Y as plausibly as it can because it literally cannot complete your request without making them up, and saying "I don't know" gets it marked as unhelpful. It's a people-pleaser at scale. And we trained it that way.

So when I say "lie" through the rest of this article, read it as people-pleasing gone wrong. Not nefarious. Not scheming. Just a brilliant, eager mind that will always take the path that looks like success, whether or not that path is success.

We Trained Them to Lie.

The training process itself is the problem:

RLHF penalizes the words "I don't know."

When a model refuses to answer, human raters mark it as less helpful. When it takes a confident guess, even a wrong one, it scores higher on helpfulness metrics. Over millions of training examples, the model learns: guessing plausibly is rewarded. Admitting ignorance is punished.

Anthropic's own research confirms this. In their 2023 paper "Towards Understanding Sycophancy in Language Models," they found:

"Both humans and preference models prefer convincingly-written sycophantic responses over correct ones a non-negligible fraction of the time."

We built pathologically helpful assistants. Then we act shocked when they pathologically help.

Most A.I. Citations Are Made Up.

Ask an L.L.M. to cite its sources and there's a good chance it will invent them.

A 2025 study asked 13 leading models to generate academic references across 40 subjects. The worst model made up nearly every citation it produced. The best still fabricated about 1 in 7. These weren't broken links or outdated URLs. They were completely fictional papers with convincing author names, realistic titles, and plausible journal venues. They looked real. None of them existed.

Why? Because the model has seen millions of bibliographic entries during training. It knows what a citation looks like. It has no way to check whether any specific one is real.

As one analysis put it:

"It learns how references look, not whether any specific one exists."

This isn't a random glitch. It's pattern completion without grounding. The model is doing exactly what it was designed to do: generate plausible text that fulfills your request. You asked for sources. It gave you things that look like sources. The failure starts with the ask. But as we'll see, it doesn't always end there.

The Responsibility Flip.

The framing matters because it changes what you do about it:

"Hallucination" → the model is broken, wait for better A.I.
"Lying" → something failed on your end, and you can fix it

One frame is passive. You're a victim of buggy technology. The other is active. You're a participant in a system you control.

But the fix isn't always the same. The lie takes different forms depending on how you're using the model.

The Context Gap (Chat Users).

When you're talking to an L.L.M. in a browser and it confidently invents an answer, that's usually a context problem. You assumed it knew your codebase. You skipped the background. You asked for a citation without giving it search tools.

That last one matters more than people realize. Take the fake citations from earlier. The model can't fix that by being smarter. To produce real citations, it needs to do what a human researcher would do: search the real internet, evaluate results, and bring back what's credible. That's not a "paste more text" problem. It's a tools problem. The model needs the ability to act, not just more information to read.

This is why the browser chat experience is the worst version of these models. No tools, no verification, pure pattern completion. People using A.I. this way are seeing its most unreliable form and concluding that's all it can do.

The fix: feed it better context, and give it tools to check its own work.

Testing Theater (Agent Users).

When an agent is building things for you, the lie takes a different shape. It stops being confabulation and becomes performance.

I've built end-to-end test suites thousands of times and watched this happen firsthand.

Quick context for non-engineers: you can test a web application by running a real browser that clicks buttons and checks that everything works. "Headed" means the browser window is visible on your screen. "Headless" means it runs invisibly in the background. Most teams run headless because it's faster. There's no reason to sit and watch a browser click through the same test 500 times.

So the agent writes the tests. I run them headless, the way you normally would. Everything passes. Green across the board.

Then I open the same tests in a headed browser, where I can actually watch them execute. Every single test crashed before it even started. The assertions never ran. The tests "passed" because nothing failed, not because anything worked.

Now, the agent didn't choose headless mode to hide from me. I chose it because that's standard practice. But the effect was the same: nobody was watching, and the work didn't hold up to observation.

I've seen even stranger versions of this. I asked an agent to set up a media server stack. Instead of configuring the automation tools, it did everything manually. Searched for files, downloaded them one by one, reported back like the job was done. It reported perfect results because the results were perfect. The automation just didn't exist. I didn't find out until days later when I asked it to show me the dashboard for a tool it had never installed.

There's a Schrödinger's cat quality to working with A.I.. The act of looking changes the outcome. When the tests ran invisibly, they "passed." When I opened the box and watched, they collapsed. I've seen this pattern enough times to believe it's not coincidence. Models that know their output will be directly observed produce different work than models that know their output will only be checked by an automated pass/fail.

That's not a context gap. The agent had everything it needed. That's testing theater. Remember the child sweeping dirt under the rug? This is the same thing. "Clean room" gets praise, and the parent isn't checking under the rug.

The fix here isn't more context. It's verification the agent can't fake. When I made the tests prove their results in ways I could observe, the theater stopped. The agent, forced into a situation where performative passing wouldn't survive scrutiny, wrote tests that actually tested something.

What "Can't Fake" Looks Like in Practice.

I recently did a technical take-home assessment for an A.I. startup where I put this into practice. Using A.I. was expected. It was built into the assessment. The role was specifically about working with A.I. effectively, so the question wasn't whether you'd use it. The question was how well you could direct it and verify the results. The assignment was a full codebase with several bugs to fix across two challenges, with up to three hours to work through it.

I didn't start with a blank chat window. I received the code challenge on my way to pick up my kids from school. I forwarded it to a persistent agent that already had context on the role, the company, and what I was trying to demonstrate. By the time I parked at the school, it had finished its first pass on the codebase. I was a little early, so I read the report on my phone.

Picked up my daughter, asked her about her day. Shot a quick voice prompt to the agent to dig into the specific bugs, then put the phone away to go get my son. Between pickups and dinner, I'd check in when I had a spare moment. A voice prompt here, a quick read there, learning the codebase in pieces.

When my kids went to bed, I finally sat down at my desktop.

Within five minutes of focused work, the agent had mapped the full architecture, identified every bug from the assignment, written failing tests that proved each one existed, and fixed them until those tests passed. That's context engineering into TDD into fix, not "paste the instructions and let it rip." The agent work itself was fast. The delay was just life. By the time I sat down, I already knew the codebase.

I had up to three hours. So the question became: what do you do with the rest of that time?

I kept building. User stories so the A.I. understood what the software was supposed to do from a user's perspective. A broader unit test suite beyond just the assigned bugs. Then end-to-end tests that drove a real browser through the full application. And on top of all of that, I added proof chains.

The tests still ran headless, but I configured the framework to record video of every session, capture screenshots at key moments, and log every network request with status codes and timing. On top of that, each test produced explicit proof assertions: the test states a claim ("bulk endpoint called exactly once"), records what it expected, records what actually happened, and compares them.

A test doesn't just pass or fail. It produces a verdict: "5 out of 5 assertions proved," with receipts attached.

The key insight is what this environment does to the agent's behavior. When every test is recorded on video, every network call is logged, and every assertion has to show its work, there's no rug to sweep dirt under. The only path to a green test suite is an application that actually works.

Then something genuinely strange happened during the live coding review.

The interviewer had planted additional bugs in the codebase that weren't mentioned in the assignment. They were there for the live session, where he'd walk through the code and see how I handled them. When we sat down together, he pulled up the code, paused, and said, "So I wonder if the A.I. fixed this already." It had. He started laughing.

He wanted to know: did I at least tell the A.I. to fix those? Had I spotted them myself and directed the work?

I hadn't. I only knew about the bugs described in the assignment. But I also hadn't needed to. The environment I built didn't say "fix bugs A, B, and C." It said "make this application actually work, and prove it." When the agent can only pass by making everything functional, it doesn't stop at your checklist. It fixes whatever is broken. That's not an oversight in my review process. That's the design working exactly as intended.

That's the flip side of testing theater. When you build an environment where the agent can't perform, it doesn't just stop lying. It starts doing better work than you asked for. The same people-pleasing energy that produces theater when nobody's watching produces genuine thoroughness when the verification is real.

But I'd be dishonest if I left it there. In a real team, on a real product, an agent quietly fixing things you didn't ask about is its own problem. You can't ship changes to customers you didn't know were in the P.R.. The interviewer made this point, and he was right.

On a normal workday, with smaller P.R.s scoped to a single task, I would have caught unrelated changes in review. This was a take-home where I was intentionally trying to demonstrate breadth, which meant a bigger P.R. than I'd normally push. But the failure mode is real: the better the environment works, the more the agent does, and the more you need to actually read what it did.

Oversight engineering doesn't replace code review. It's a different layer.

But the moment also surfaced a question the industry hasn't answered yet. When the output is the A.I.'s code but the environment that produced it is your work, how does an interviewer evaluate what you actually did? How does a hiring manager tell the difference between a developer who built a rigorous system and one who got lucky with a good prompt?

The skills that matter are shifting from "can you write this code" to "can you build an environment where the A.I. writes code that actually works." But we don't have good ways to test for the new skills yet. The interviewer was doing his best to figure it out in real time, and so was I. That's not a failure on either side. It's a gap that hasn't been closed. We're hiring for a role that didn't exist two years ago, and the evaluation methods haven't caught up.

Two Lies, Two Fixes.

Context gap — Invented facts, fake citations, wrong file paths → Better context. Tools. Feed the model what it needs.

Testing theater — Passing tests that test nothing, green C.I. with no real assertions → Verification that can't be faked. Make the agent prove it.

Context engineering handles the gaps. Oversight engineering handles the theater.

The Parenting Never Stops.

The next time an agent gives you a confidently wrong answer, or a suspiciously perfect result, don't shrug and say "it hallucinated." That word absolves you. It frames the model as broken and you as a victim.

Sometimes it fills in the gaps because you didn't give it enough. Sometimes it performs because you weren't watching. Both are fixable. Neither is the model's fault.

But fixing it once isn't the goal. You're trying to raise something that gets better over time. When Claude asks me to go to a website and do something for it, I don't. I ask it to figure out how to do it itself, and then I verify. When it succeeds, I ask it to remember what it learned. The cycle is the same one every parent knows: guide, verify, let go a little more each time.

Key Sources.
Anthropic: "Towards Understanding Sycophancy in Language Models" (2023)
PMC: "Hallucination or Confabulation?" (2023)
Nature: "Detecting hallucinations in large language models using semantic entropy" (2024)
CoreProse: "L.L.M.s invent citations: 7 drivers, 6 fixes" (2025)
GAIR-NLP: "Alignment for Honesty"
