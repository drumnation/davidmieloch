# Mental Agility and the Map That Knows Too Much

There's a specific kind of confusion that only happens when you've built something hard by hand.

You know the system deeply — not from documentation, but from the kind of knowledge that comes from debugging it at 2am, from hitting the same failure three times until you understood why. You built a mental model that was earned. And now you're building v2. And v2 keeps deviating from that model.

Your brain fires "error." That instinct is good — it's the map doing its job. But the map was drawn for v1. And the world has changed.

---

## The Instinct to Restore

When you notice a deviation, the easiest cognitive move is restoration: push reality back toward the known state. The mental model says _it should be X_, reality is _Y_, therefore Y is wrong.

This works most of the time. In v2 of something you built carefully, genuine mistakes look exactly like this — places where someone (maybe an AI, maybe a collaborator, maybe a future version of you) drifted from a solution that worked. The instinct catches real errors.

The problem is that the instinct is blind to a different class of event: the case where the deviation is _correct_, and your model is what's outdated.

---

## Solutions Carry Hidden Constraints

Here's the thing about good solutions: they're always answers to specific questions. And they carry the shape of those questions invisibly.

When you encounter an established pattern — something you've used before, something that gave you confidence — you remember the solution. You don't always remember the constraints that justified it. So when you're evaluating v2, you pattern-match against the solution and ask "why don't we have this?" without asking the prior question: "does the problem this solves still exist in the same form?"

In the conversation that prompted this note, I was looking at a component and asking whether we needed a specific kind of storage system — because the tool I'd been comparing to used that storage system, and it was part of what made that tool robust. The question felt sound. It was based on real experience.

What I missed was that v2 had made a different upstream design decision — a commitment to a specific observability architecture that I hadn't fully internalized yet. That single upstream choice cascaded down and changed the storage question entirely. Not only did it make the familiar storage approach unnecessary, it made a lighter approach _more_ capable for our specific needs. The deviation I was flagging wasn't a shortcut. It was a downstream consequence of a better upstream choice.

The old solution had solved a real problem. But v2 had dissolved that problem by rethinking something earlier in the stack.

---

## The Cascade Problem

This is what I'm calling **constraint inheritance**: when you carry a solution forward, you often carry the constraints that justified it as invisible baggage. The solution looks right, so you don't interrogate its premises.

The cascade goes:

> Design principle changes upstream  
> → A set of downstream constraints change with it  
> → Solutions justified by the old constraints are now orphaned  
> → But they _look_ like they should still be there

When you're building v2, you're navigating this constantly. Some deviations are real mistakes. Some are orphaned solutions that got cleaned up. The challenge is that they look identical until you dig in.

---

## The Self-Doubt Question

In the middle of working through this, I hit a moment of uncertainty: _Am I not paying attention? Am I going too fast? Am I failing to engage?_

I think the answer is no — but the question is pointing at something real.

The form-in skills I've developed from v1 — the pattern matching, the "something feels off here" signal — those evolved in a context where deviations were mostly errors. In v2, those same skills need a recalibration. The signal is still good. The default verdict needs to change.

The failure mode isn't going too fast. It's **treating the model as ground truth** rather than as a prior. The fix isn't to slow down and read more carefully. It's to investigate before restoring — to ask _why does the deviation exist_ before asking _how do I remove it_.

---

## Three Paths

There are really three ways to relate to your mental model when building v2:

1. **No friction** — you're not consulting the model at all, building blind, losing the accumulated knowledge of v1.
2. **Restore without investigating** — the model is treated as ground truth, deviations are always errors, you push everything back toward the known state.
3. **Signal before verdict** — the model generates a flag, you treat it as a probe, you dig before you act.

The first loses the value of experience. The second loses the improvements that came from building v2 fresh, with better information. The third is the harder and more generative path.

Mental agility, I think, is the capacity to stay on the third path — especially when the instinct to restore feels completely justified. Because it will always feel justified. The mental model was built with real care. The deviations are genuinely suspicious. That's exactly why it's hard.

---

## The Old Assumption Problem

There's one more wrinkle worth naming: sometimes the constraint isn't just _different_ in v2, it's _gone_.

Some solutions exist because a problem was genuinely hard at the time. Tooling was immature, infrastructure was fragile, the ecosystem hadn't caught up. You solved it the hard way, and that solution became load-bearing in your mental model. Fast-forward to v2, and the original hard problem has been solved by the ecosystem. What used to be a serious constraint is now a non-issue.

When you encounter this, the temptation is to import the solution anyway — because it worked, because it's familiar, because the pain of the original problem is still vivid. But importing the solution to a solved problem adds complexity without adding robustness. It just adds weight.

The question is always: _is this an old assumption?_ Not "is this solution wrong" but "is the problem this solves still the problem I have?"

---

## What to Do With the Tension

The tension between mental model and reality is not a sign something went wrong. It's the expected phenomenology of building v2 of something you built deeply by hand. The model was supposed to create this tension. That's its job.

What matters is what you do when you feel it.

Don't suppress the instinct — the form-in pattern matching is valuable. But hold the signal as a signal, not a verdict. Ask what upstream decision might make the deviation not just acceptable but _correct_. Ask whether the constraint that justified the old solution is still in play. Ask whether the problem has changed shape since you last thought about it.

Sometimes the answer will be "no, this really is an error, restore it." Often enough that the instinct was worth trusting.

But sometimes you'll discover that the deviation is a downstream consequence of a better choice made earlier — and that restoring it would undo not just that one decision, but the whole cascade of improvements that flowed from it.

That second discovery is what this skill is for.