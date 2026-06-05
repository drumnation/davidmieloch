# The Art of Looking Incompetent: How to Make Your AI Code Look Human
## Or: Why the fastest way to pass a code review is to fail at engineering

---

The Old World asks: Desktop or mobile?
The Old World answers: Desktop only. Mobile is too much work.

The New World doesn't ask. The New World generates mobile as part of the architecture.

And that's the problem.

---

The Compliance Training
So you're a 10X AI engineer. You ship in hours what used to take weeks. You write tests because they're free. You document because it costs you nothing. You refactor relentlessly because why wouldn't you?

And now they want you to stop.

Not stop shipping. Just stop looking like you're shipping with AI.

Which means you need to learn the ancient art of Humanization — the deliberate degradation of your output to match the messy, inconsistent, barely-working code that humans write.

Here's your new workflow:

---

Step 1: Train Your Agent to Leave Evidence of Struggle
AI commits are clean. They explain what changed and why. They reference ticket numbers. They're suspicious.

Human commits say things like:
"fix"
"wip"
"pls work"
"asdfasdf"
(no message at all)

Your agent needs to learn the vocabulary of exhaustion. The commit history should read like someone running on caffeine and desperation at 2 PM on a Tuesday.

Pro tip: Occasionally commit broken code. Humans don't have type checkers running in their heads.

---

Step 2: Delete Your Tests
This is the punchline that writes itself.

AI needs tests to work properly. It generates them, runs them, fixes the code, re-runs them. It's the entire feedback loop.
But humans? Humans write tests when they're forced to. And even then, they write the minimum.

So to look human, you have to delete the evidence that your code is verified.

You have to ship faith instead of proof.

The feature works? Great. Delete the test suite. Delete the documentation. Leave only the code and a prayer.

---

Step 3: Leave PRs Blank
AI fills in pull request templates. It lists what changed, why it changed, how to test it. It's thorough. It's helpful.

It's a red flag.

Your PR description should be one of:
Empty
"fixes stuff"
A single emoji

Remember: competence is suspicious. The more someone understands their own code, the more likely they had help.

---

Step 4: Architect for Inconsistency
AI organizes code into logical modules. It keeps files under 300 lines. It extracts reusable components. It's too clean.

Real humans:
Have one 4,000-line file called utils.js
Copy-paste the same function three times with slight variations
Leave TODO comments from 2019
Have lint errors they've learned to ignore
Your agent needs to introduce controlled chaos. Not bugs — just mess. The kind of mess that says "a person touched this."

Leave that TypeScript error. It's been there for six months. It's part of the family now.

---

Step 5: Never, Ever Refactor
AI sees repetition and reaches for abstraction. It DRYs everything. It extracts patterns.

Humans? Humans have deadlines. Humans have "I'll clean this up later" — and later never comes.

Your codebase should feel like an archaeological dig. Each layer from a different era. No consistent style. Variable names that tell the story of whoever was coding at 4 AM.

userData, user_data, u, theUser, userObj — all in the same file. That's the human touch.

---
The Beautiful Irony
Here's what keeps me up at night:

To make your code look human, you have to make it worse.

You have to remove the tests that prove it works.
You have to delete the documentation that explains it.
You have to skip the refactoring that makes it maintainable.
You have to ignore the type errors that catch bugs.

You have to lower your standards to meet theirs.

And somewhere in that process, you realize: this is what they wanted all along. Not better engineers. Just compliant ones.

---
The Old World Dies Hard
The Old World asks: "Did you write this yourself?"
The New World asks: "Does it work?"

The Old World values effort. Hours at the keyboard. Visible struggle.
The New World values outcomes. Shipped features. Solved problems.

And the Old World is terrified.

So terrified that they'll make you delete your tests just to prove you suffered like they did.

---

What We're Really Building
We're not hiding AI. We're embarrassed by competence.
That's the story underneath all of this. The world isn't ready for what we can do now. It doesn't have the frameworks to evaluate it. So it retreats to what it knows: looking for the markers of human struggle — the mess, the gaps, the exhaustion baked into the code.

And if you want to ship in this world? If you want to keep using the tools that make you 10X?

You learn to fake the struggle.

You learn to leave just enough chaos to pass as human.

You learn that the fastest way to look like you worked hard... is to work harder at looking like you didn't work at all.

---

This is the world we're living in. The question isn't whether AI makes us better. The question is whether we're allowed to admit it.