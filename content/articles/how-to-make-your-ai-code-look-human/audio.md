---
title: "How to Make Your AI Code Look Human - Audio Version"
sourceArticle: "how-to-make-your-ai-code-look-human"
sourceHash: "9d5eb05e82f31d5030e7e8d3de85ed9a86479aa27815a78de5ef90b6a152801a"
status: "needs-approval"
preparedAt: "2026-06-05T04:38:36.652Z"
format: "spoken-markdown-v1"
---

A compliance guide for the overly productive..

Your code is too clean. Your tests are too thorough. Your P.R. descriptions are too helpful. Someone is going to notice.

This guide will help you systematically degrade your output until it passes as human-written. Follow these steps carefully. Your career depends on it.

Step 1: Learn the Language of Exhaustion.

A.I. commits are clean. They explain what changed and why. They reference ticket numbers. They follow conventional commit standards.

This is a red flag.

Human commits say things like:
"fix"
"wip"
"pls work"
"asdfasdf"
(no message at all)
"ugh"
"friday"
"DO NOT MERGE (merges anyway)"

Your commit history should read like someone who hasn't slept since Tuesday. Sprinkle in a revert or two. Bonus points for a commit that says "revert revert" because you reverted the wrong revert.

Occasionally commit code that doesn't compile. Humans don't have type checkers running in their heads. They have coffee and anxiety.

Step 2: Delete Your Tests.

This is the hardest step emotionally.

Your A.I. wrote tests. Beautiful tests. Tests that actually verify behavior. Tests with descriptive names and edge case coverage. Tests that run in under two seconds.

Delete them.

Not all of them. Leave a few. But make sure at least one is skipped with a comment that says // TODO: fix this later from seven months ago. Make sure another one tests something so trivial it's insulting. expect(true).toBe(true). That's the kind of test a human writes at 4:45 on a Friday to hit the coverage threshold.

The feature works? Great. Your proof is now vibes.

Step 3: Sabotage Your Own P.R..

A.I. fills in pull request templates. It lists what changed, why it changed, what to test, what risks exist. It links to the ticket. It's thorough.

Nobody does this.

Your P.R. description should be one of the following:
Empty
"fixes stuff"
A single emoji (🫠 is currently meta)
"see ticket" (with no link to the ticket)
The auto-generated branch name, unchanged

If a reviewer asks "what does this do?" respond with "exactly what the ticket says." Do not elaborate. Elaboration implies you understood your own code, which implies you had help.

Step 4: Introduce Controlled Chaos.

A.I. organizes code into logical modules. It keeps files under 300 lines. It extracts reusable components. It names things clearly.

This is how you get caught.

Real codebases have:
One 4,000-line file called utils.js that everyone is afraid to touch
The same helper function copy-pasted in three places with slightly different parameter orders
A constants.ts file that contains exactly one non-constant variable
TODO comments from 2019 that have become load-bearing
An eslint-disable comment with no explanation that, if removed, breaks production

Your agent needs to introduce mess. Not bugs. Mess. The kind of mess that says "a real person maintained this under deadline pressure while also attending a meeting about meetings."

Leave that TypeScript error. It's been there for six months. It's part of the family now.

Step 5: Never Refactor.

A.I. sees repetition and reaches for abstraction. It DRYs everything. It extracts patterns. It names functions after what they do.

This is unnatural.

Humans have deadlines. Humans have "I'll clean this up later." Later never comes. Later has never once, in the history of software, come.

Your codebase should feel like an archaeological dig. Each layer from a different era. Each era with its own naming conventions, its own state management philosophy, its own understanding of what a "service" is.

userData, user data, u, theUser, userObj, usr — all in the same file. That's not inconsistency. That's character development.

Step 6: Master the Standup Performance.

This step has nothing to do with code. It's about theater.

When asked what you did yesterday, never say "shipped it." That's too fast. Nobody ships things in one day. Even if you shipped it in twenty minutes, your standup answer is:

"Still working through some edge cases. Should have a P.R. up by end of day."

Then wait four hours. Then put the P.R. up. The P.R. that's been ready since yesterday morning.

If someone asks why a task took three days, say "there was a weird issue with the build pipeline." Nobody questions the build pipeline. The build pipeline is where explanations go to die.

If the task was estimated at two weeks and you finished it in a day, do not submit it for a day. Trickle commits across the sprint. One file Tuesday. Another Thursday. Final P.R. on day nine. Add a comment on day seven that says "this is trickier than I thought" so there's a paper trail of appropriate struggle.

Step 7: Manage Your Typing Speed.

This is advanced tradecraft.

Your Slack messages should not appear fully formed. Humans don't write complete, grammatically correct paragraphs in Slack. They write in fragments. They hit enter too early. They send corrections.
"hey can you look at"
"the pr"
"when you get a sec"
"P.R."

If you paste an A.I.-generated explanation, break it up. Add a typo. Delete a sentence. Add "i think" to the beginning so it sounds uncertain. Certainty is suspicious. Nobody is certain about their own code.

Step 8: The Documentation Trap.

You documented your code. Inline comments. JSDoc. A README that actually explains how to run the project.

This is the single most suspicious thing you can do.

Real projects have a README that was accurate in 2021. The setup instructions reference a.env.example file that doesn't exist. The "Getting Started" section says "ask Dave" and Dave left the company two years ago.

If you must document, make sure it's slightly wrong. Reference a config flag that was renamed. Point to a folder that was moved. This is called "organic documentation" and it's how humans naturally maintain knowledge: poorly.

Step 9: The Final Boss — Code Review.

You will eventually be reviewed by someone who writes code the old way. They will look at your clean, tested, documented, well-architected P.R. and feel something deep and uncomfortable.

They won't know what it is. It'll manifest as nitpicks.

"Can you rename this variable?"
"I'd prefer a for loop here."
"Not sure about this abstraction."

These aren't real objections. They're the immune system of a codebase rejecting foreign tissue. Your code is too healthy. It doesn't match. The body is fighting it.

Accept every nitpick. Make the code slightly worse each round. By approval, it'll look like it belongs.

Congratulations. You've successfully mass-produced artisanal code.

Happy April Fools' Day. Or is it?

The author wrote this article using A.I.. It was originally much better.
