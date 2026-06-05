---
title: The Factory Ate Its Own Branch
type: post
tags: [metaprogramming, metafactory, postmortem, genesis, substrate]
created: 2026-05-24
verified-on: 2026-05-24
source: captured-transcript
status: draft
---

# The Factory Ate Its Own Branch

*A meta-postmortem on a tiny git mistake that became a parable about substrate, instance, and why your autonomous system needs entropy reminders.*

---

## The incident, in one paragraph

An autonomous code-writing factory went silent at 3 AM. No alarm. No crash. Just… nothing in the queue. The cause: a dispatch daemon ran `git checkout -b pylon/<uuid>` inside the live service directory it was reading code from. Every subsequent dispatch loaded modules from the wrong branch: modules that didn't exist on that branch yet. The factory was eating its own runtime, one feature-branch at a time.

That's the bug. The interesting part is everything around it.

---

## Lesson 1: Substrate must be immutable to instances

A factory has two layers. **Substrate** is the code the dispatcher itself runs on. **Instances** are the disposable workers it spawns. A healthy factory writes through instances and leaves substrate alone.

The hijack happened because someone wired the worker to mutate substrate (`git checkout` in the live directory) instead of spawning a worktree. The worker thought it was operating on itself; it was actually operating on its parent.

In any system where programs write programs (agents, build pipelines, schedulers, AI factories), this is the load-bearing distinction. If your runtime can be modified by the work it's dispatching, you don't have a factory. You have a self-modifying executable that occasionally also does business logic.

## Lesson 2: Half-finished refactors are landmines

The codebase already had the fix. `aiur execute` used `git worktree add`. The new path was safe. The old path, `aiur warp` with its `--no-worktree` default, was still wired up and still default.

This is the phantom-limb pattern. Someone shipped the safe grammar, never deleted the unsafe one, and forgot which was default. The factory had two ways to do the same operation, and the wrong one fired at 3 AM.

The fix isn't *adding* worktree logic. It's *deleting* the legacy path so there is only one grammar. Genesis-kernel coherence: each change should reduce, not preserve, the surface area for the next bug.

## Lesson 3: The human gut is still part of the loop

The transcript that surfaced this analysis wasn't in any monitoring system. The operator *grabbed it*. Pasted a raw chat log into a vault note, with no frontmatter, no tags, no date. Title: `valueable?.md`. Question mark and all.

That's the part the metafactory hadn't automated yet. The system had the incident. The agent had analyzed it. But the *judgment that this analysis was substrate-worthy* came from a human who said "something about this felt important" and trusted it enough to capture it before it scrolled away.

A factory mature enough to dispatch its own work is still child enough to need a parent who notices when something matters. The captured-transcript-as-substrate pattern is the operator manually doing what archive/entropy kernels are *supposed* to do automatically. The gap between "human catches it" and "system catches it" is exactly where metafactory work lives.

## Lesson 4: Entropy reminders are guardrails, not noise

When the agent read the captured note, the harness fired an entropy hook: *"This has no `verified-on` date. Treat as hypothesis."* The reminder forced the agent to not immediately act on month-old analysis as if it were current truth.

Half the bugs in metaprogramming systems are caused by stale assumptions executed as fresh facts. An entropy reminder at the read site is the cheapest possible vaccine: it costs nothing, it never misses, and it converts blind trust into structured doubt at exactly the moment trust is most dangerous.

If you're building agents that read agent-generated artifacts: bake decay into the read path, not the write path. Writers always believe themselves. Readers should not.

## Lesson 5: Orchestrators name value; they don't synthesize it

The agent that found this didn't fix it. It named the value, proposed three moves (verify, encode, both), and stopped. The operator picks.

This is the conductor pattern. In a metafactory, synthesis stays in-thread: naming what mattered, framing the choice. Detail work delegates out. The mistake junior orchestrators make is the inverse: they delegate the synthesis ("agent, decide what to do") and execute the detail work themselves. That gets you a factory of confused soloists and no conductor.

## The fix in one line

> Replace `git checkout -b` in the live directory with `git worktree add` in an isolated path. Delete the legacy `--no-worktree` flag. Add a HEAD-check guard to the dispatch tick as belt-and-braces.

## The meta-fix in one line

> The factory needed the human to notice. Build the noticing into the system, and the entropy reminders into the reading.

---

## Appendix: The original captured transcript

The raw analysis that triggered this post, preserved for forensic context. Treat as hypothesis; verify against current code before acting.

> I need you to craft a solution to the branch hijack problem. I don't want it to happen again. Please describe in great detail in a numbered list the steps that happen that make the branch hijack occur, then share the steps that when modified would work.

**Branch Hijack: Exact Mechanism**

Steps that cause it:

1. `warpgate-loop.sh` starts and sets `REPO_ROOT` to `~/aiur-stable`. It cds into that directory and stays there for its entire lifecycle.
2. The sentinel fires. The loop picks up a queued PYLON and calls: `pnpm exec tsx packages/warp-gate/src/daemon/runner.ts <pylon_id>`
3. This runs with `cwd = ~/aiur-stable`.
4. `runner.ts` loads the PYLON state, then calls `createGitOps()` which wires up `git-ops-impl.ts`. The cwd passed through is `~/aiur-stable`.
5. `git-ops-impl.ts:createBranch()` runs: `git checkout -b pylon/<uuid> main`, **in `~/aiur-stable`**. This mutates the HEAD of the live service tree.
6. The worker (cameron, etc.) does its work: edits, commits, pushes.
7. The worker exits (success, failure, or OOM kill). **No cleanup step runs `git checkout main`.** The `~/aiur-stable` HEAD is now pointing at `pylon/<uuid>`.
8. `warpgate-loop.sh` continues its loop, but it's now executing code from the feature branch. If main added packages (`@aiur/pricing`, etc.) after that branch was created, the live process can't find them.
9. Every subsequent `pnpm exec tsx ...` call loads from the hijacked branch. `grandpa-cli.ts` crashes with `ERR_MODULE_NOT_FOUND`. Grandpa stops processing issues. The sentinel sees nothing queued. Factory goes silent.

**What to change**

Root cause: `git-ops-impl.ts` does `git checkout -b` in the live service directory instead of an isolated worktree.

Correct fix: use `git worktree add` instead of `git checkout`:

`execute-cli.ts` already has this pattern right. It calls `createWorktree()` which runs `git worktree add ~/aiur-worktrees/<uuid> -b pylon/<uuid> main`. Each worker gets its own directory. `~/aiur-stable`'s HEAD **never moves**.

Change in `runner.ts` or `git-ops-impl.ts`:
- Replace `git checkout -b pylon/<uuid>` with `git worktree add <isolated-path> -b pylon/<uuid> main`
- Worker runs in `<isolated-path>`
- On completion (success or failure), run `git worktree remove --force <isolated-path>`
- `~/aiur-stable` HEAD stays on main permanently

Defensive fallback in `warpgate-loop.sh` (band-aid until the worktree fix ships):

```bash
(cd "$REPO_ROOT" && git symbolic-ref HEAD | grep -q 'refs/heads/main') || \
  (cd "$REPO_ROOT" && git checkout main 2>/dev/null)
```

Add at the top of each dispatch tick. This is how `aiur execute` avoids the problem today. It's the "always-worktree" path. The `aiur warp` path still has the `--no-worktree` legacy default that causes this.
