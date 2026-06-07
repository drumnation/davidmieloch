# The Most Valuable AI Skill Isn't Prompting

## Safety

- Safe default: stop-at-linkedin-draft-preview
- Public publishing allowed: no
- David approval required: yes
- Stop before: publish-submit-schedule

## Transfer Fields

- Hero image: /Users/dmieloch/Documents/codex-worktrees/davidmieloch-site-postiz-callback/public/blog/the-most-valuable-ai-skill-isnt-prompting/images/hero-linkedin.png
- Hero image exists: yes
- Canonical URL: https://davidmieloch.com/blog/the-most-valuable-ai-skill-isnt-prompting
- Body checksum: e5e7b6c2899803d6259840397032e1110bb98241abb590aeb6db6923b12052cd

## Subtitle

In a factory, the scarce skill is not prompting. It is noticing what is wrong before the system compounds it.

## Body

Everyone in organizations right now is trying to prove their value through AI. The visible signal is prompting skill: who can get the model to do something impressive, who can write the most effective system prompt, who has the sharpest workflow for iterating on outputs.

I understand why this is the battlefield. It's demonstrable. You can show it in a meeting. It's a skill that can be practiced and improved, and improvement is visible.

But I think it's the wrong skill to optimize for.

---

## What a Factory Changes

When you move from prompting to factory, the bottleneck shifts. In the pair-programming model, the human is everything: the prompter, the reviewer, the judge. Prompting skill matters because the human is in every loop.

In a factory, the human is the director. The loops run without you. You set the direction, establish the guardrails, and watch the output.

What you're watching for is the thing that went wrong.

This is a different skill entirely. It's not about asking the right question. It's about looking at a stream of agent output (100 pull requests, 50 test results, a week's worth of automated decisions) and seeing the one thing that's subtly wrong in a way that will compound over time.

---

## What Noticing Actually Is

Noticing isn't just code review. It's a higher-order pattern-matching skill:

You see an architectural decision in PR #47 that's technically correct but will create a coupling problem in six months. You see a test suite that passes but is testing the wrong things. You see an agent that's completing tasks without understanding the underlying constraint the tasks were meant to address. You see a feature that shipped but creates a UX conflict three clicks away.

None of these are obvious. They require judgment built from experience, taste developed over time, and the ability to hold a large mental model of the system while evaluating a small piece of it.

This is what I'd call first-class noticing. And it's the thing that AI, at least right now, is most reliably bad at.

---

## Why Prompting Skill Has a Ceiling

Prompting skill is valuable. I'm not dismissing it. But it has a structural ceiling.

A good prompter can get better outputs from a model. But the output is still evaluated by the prompter. The loop requires a human to initiate, judge, and continue. At scale, the prompter becomes the bottleneck. You can only prompt so fast, review so much, iterate in so many directions simultaneously.

A good noticer can oversee a factory. The factory runs at whatever speed agents can sustain. The noticer's job is to catch failures before they compound, set better direction when something's going wrong, and intervene at the right moments.

This scales. Prompting doesn't.

The organization with the most first-class noticers, backed by a factory, is the most dangerous organization in any market.

---

## What This Means for Teams

Right now, most organizations are evaluating AI capability on prompting skill. Who here is good at getting AI to produce things? That's the metric they can measure.

The better question is: who here is good at seeing what's wrong with what AI produced?

These are often different people. Great prompters tend to be optimistic, creative, fast-moving, good at generating possibilities. Great noticers tend to be careful, pattern-aware, good at spotting exceptions and edge cases, hard to fool.

Both are valuable. But in a factory context, noticing is the leverage point. You can build a factory that generates output at scale. What you can't automate (yet) is the judgment about whether that output is actually right.

---

## The Practical Implication

If you're building a team for an AI-first environment, hire for noticing before hiring for prompting skill. A clever prompter without good judgment will ship impressive-looking things that fail in subtle ways. A good noticer with even moderate prompting skill will catch what the factory gets wrong and course-correct before the damage compounds.

The prompter's ceiling is how good they can get at asking. The noticer's ceiling is how much they can see.

In a world of increasingly capable AI factories, what you can see is everything.
