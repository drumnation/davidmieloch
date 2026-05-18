---
platform: "devto"
mode: "api-draft-or-manual-copy"
post_mode: "full-mirror"
title: "What I Learned Building a Photoshop in the Browser"
canonical_url: "https://davidmieloch.com/blog/what-i-learned-building-a-photoshop-in-the-browser"
tracked_url: "https://davidmieloch.com/blog/what-i-learned-building-a-photoshop-in-the-browser?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=what-i-learned-building-a-photoshop-in-the-browser"
source_slug: "what-i-learned-building-a-photoshop-in-the-browser"
generated_at: "2026-05-18T21:41:27.876Z"
canonical_support: "supported"
approval_required: true
public_publish_allowed: false
---

# What I Learned Building a Photoshop in the Browser

## Posting guidance

Developer-facing mirror draft with canonical URL preserved.

- Do not publish without David approval.
- Preserve canonical URL: https://davidmieloch.com/blog/what-i-learned-building-a-photoshop-in-the-browser
- Record the final platform URL back in content/distribution/platform-ledger.json.

## Copy

### Lessons in architecture, state management, and engineering leadership from four years building an enterprise-grade design tool.

### Introduction

The Designer Cloud interface — our browser-based design platform inspired by Photoshop’s layered editing model.

### What I Learned Building a Photoshop in the Browser

When I first joined the Designer Cloud project at Scala, the ambition was clear: Build a browser-based design editor powerful enough to let users create stunning digital signage for our proprietary network of connected display hardware. What wasn’t clear yet was just how much the journey would demand — not just technically, but organizationally, architecturally, and personally. Over four years, I led major architectural overhauls, solved critical stability challenges, and navigated complex cultural and organizational dynamics. I saw firsthand how technical systems and team systems intertwine — and how great engineering requires mastery of both systems and culture.

We normalized deeply nested data into maintainable Redux slices. We reimagined Undo/Redo with a radically simplified, snapshot-based model that stabilized our platform. We leveraged Storybook-first design to create a discoverable, AI-accelerated component ecosystem. We made pragmatic technical tradeoffs under real-world product pressures, like forking Moveable to accelerate delivery — even as we absorbed the debt with open eyes. And we learned hard lessons about how architecture needs cultural support to survive. This post isn’t just a technical retrospective. It’s a systems-level case study in how ambitious software gets built, where it struggles, and what real senior-level engineering leadership looks like when the pressures are real.

### Starting from a Complex Foundation

When I joined Scala, Designer Cloud was already two years underway. The platform aimed to replicate Photoshop’s sophisticated feature set, from layers, grids, and rulers, to advanced effects and complex editing functionality, all in React. The previous lead had engineered a custom state management solution. It was a deeply impressive yet deeply flawed artifact — intricate, undocumented, and virtually impossible to maintain. Engineers were spending more time deciphering state interactions than delivering features. My first significant lesson came quickly: Engineering decisions must prioritize long-term maintainability over short-term cleverness. We knew it would be painful, but refactoring to Redux was essential.

### Refactoring to Redux: A Case Study in Pragmatism

No manager enjoys hearing, “We need to rewrite this.” Yet, sometimes that’s precisely the necessary prescription. After exhaustive performance testing and benchmarking alternatives like Recoil (which I’m thankful we avoided, given their waning popularity today), I championed Redux as our state management solution after rejecting trendier but fragile alternatives. My initial fear — that Redux might falter with our highly complex UI — proved unfounded. Rigorous normalization of deeply nested state into flattened slices drastically simplified our architecture. I discovered that normalizing state early dramatically reduces complexity later — a powerful architectural pattern I’ve consistently leveraged since.

Stabilizing Undo/Redo meant climbing one of the deepest architectural challenges in the platform.

### Undo/Redo: From Bug Factory to Backbone

Early in the Designer Cloud project, one of the most persistent — and demoralizing — problems was our Undo/Redo system. At first glance, it seemed innocuous: standard functionality for any editor. In practice, it was a constant source of instability, responsible for over 30% of QA bug reports at its worst. Users lost work. QA cycles dragged endlessly. Developer trust in the codebase eroded. The root problem was architectural: Our Undo/Redo system tried to reverse individual user actions manually, requiring each feature area to implement its own “reverse stack” of operations. In a complex, multi-panel, multi-layered editor, this strategy became exponentially fragile. Whenever features interacted — or simply grew in complexity — reverse operations desynchronized. Undo might partially work on one feature but fail catastrophically on another. Redo was even worse, often leaving the app in unpredictable, broken states.

### Diagnosing the Real Problem

After repeated incidents and failed patches, I stepped back and reframed the challenge: The problem wasn’t the bugs. The problem was the conceptual model. A system that manually reversed complex multi-step operations was fundamentally brittle. No amount of patching could stabilize it. We needed a new architectural approach based on simplicity, predictability, and total determinism.

### A Radical Redesign: State Snapshots Over Manual Reversals

I proposed — and implemented — a completely different Undo/Redo model:

- Snapshot Architecture: Instead of manually reversing actions, we saved complete snapshots of the application’s state at key moments.
- Stack-based Navigation: Undo simply reverted to a prior snapshot. Redo moved forward to the next.
- Selective Blacklisting: Certain parts of state (e.g., authentication, live server pings) were blacklisted from snapshotting to avoid inconsistent behavior.
- Redux Persist Integration: We integrated our stack management cleanly with Redux Persist, ensuring that even crash recoveries could gracefully rehydrate. Conceptually, it was stunningly simple: If an action changed state, we saved a snapshot. Undo? Restore the previous snapshot. Redo? Restore the next one.

### Engineering Discipline: Protecting the Simplicity

I was ruthlessly disciplined about protecting this simplicity. Developers naturally wanted to add “micro-reversal” exceptions — special-case undos, partial replays, customized edge-case handling. Each one seemed reasonable. Each one, if allowed, would have reintroduced the very brittleness we were escaping. I championed a strict architectural boundary: Undo/Redo must operate purely at the snapshot level. No feature-specific “cleverness” allowed. This protected the system’s global predictability — even if it meant sometimes saying no to highly specific feature requests.

### Result: Platform Stability, Restored

The results were immediate and dramatic:

- Undo/Redo went from our most unreliable system to one of our most stable.
- QA bug reports related to Undo/Redo dropped to near-zero.
- Developer velocity improved significantly — no longer wasting days debugging esoteric reversal edge cases.
- User trust improved as Undo/Redo became reliable, predictable, and fast. At a systems level, it had a profound cascading effect: Stabilizing Undo/Redo stabilized the entire editor’s core user flows.💡 “Undo isn’t a feature. It’s a promise of trust.”

### Deep Lesson: Simple, Deterministic Models Scale Better Than Clever Ones

This experience hammered home one of the deepest architectural truths I’ve learned:

- Complexity isn’t always proportional to system complexity.
- Simple conceptual models, rigorously protected, outperform “smart” but fragile systems.
- Every “clever exception” is a potential systemic collapse point. When designing critical platform features, simplicity is not a luxury — it’s a strategic necessity.

### Performance Matters: Chasing Invisible Bottlenecks

Building Designer Cloud taught me more about React performance than any previous project. Performance challenges emerged subtly, primarily through unnecessary re-renders cascading through complex component trees. Small oversights — inline functions, improperly memoized callbacks — stacked up into significant UX degradation.

To tackle these subtle bugs, I built a performance-monitoring toolkit inspired by “Why Did You Render,” instrumenting the app to highlight wasted renders. Through rigorous component refactoring, memoization, and isolating stateful logic into dedicated custom hooks, we steadily eliminated performance bottlenecks. The overarching takeaway was this: Performance must be proactively designed into your architecture, not reactively chased after user complaints.

Storybook became our control panel — a modular testing, teaching, and documentation system for every UI layer.

### Why Storybook Became My Go-to Devtool

Complex frontend architectures demand rigorous discipline around component development and documentation. To this end, Storybook became indispensable. Initially introduced to streamline UI component development, Storybook quickly evolved into a key architectural pillar. Developers could iterate on UI components in isolation, instantly visualizing changes without navigating complex app flows. Our atomic design system — clearly structured into atoms, molecules, organisms, and templates — became effortlessly discoverable. We extended Storybook far beyond its original use-case — adding visual regression testing, backend authentication integrations, and even AI-assisted updates. This transformed Storybook into a powerful teaching, testing, and documentation platform. The productivity gains were enormous, embedding Storybook-first development permanently into my personal and professional workflows.

### Forking Moveable: A Case Study in Strategic Technical Debt

One of the most defining — and humbling — technical decisions during the Designer Cloud project revolved around our use of the third-party library Moveable. Moveable provided crucial functionality: drag, resize, rotate, and interact with visual elements in a way that felt natural and performant. It covered 80% of our needs out of the box — and critically, it mirrored much of Photoshop’s UX, which was our north star. However, the remaining 20% became a major battleground. Our product lead — formerly our designer — was deeply committed to pixel-perfect fidelity with Photoshop’s behaviors and appearance. Custom rulers. Snapping grids. Handle styling. Subtle but critical nuances that Moveable didn’t natively support. At first, we attempted workarounds. Soon, it became clear: to achieve the precision the product demanded, we would need to fork Moveable and make deep internal modifications.

💡 “The cost of shortcuts is always paid in full — just not always by the same engineer.”

### The Fork: Short-Term Win, Long-Term Cost

At the time, forking Moveable felt justified:

- It unblocked critical UX work.
- It enabled us to deliver highly polished features faster.
- It aligned the editor experience more tightly with the product vision. In the short term, it worked. We were able to implement the snapping behavior, visual tweaks, and handle customizations exactly as required. But the decision came with a hidden price tag.
- Dependency Lock: Moveable was written for React 16. As React 17 and 18 emerged, our fork locked us into outdated versions.
- Upgrade Nightmare: Our fork was deep enough that upstream improvements couldn’t simply be merged. Merging became a months-long, high-risk manual merge-and-repair exercise.
- Testing Fragility: Because our customizations lacked robust isolation or regression tests, upgrading became practically infeasible without risking massive breakages. Our technical debt wasn’t theoretical — it was now blocking key platform upgrades, hurting velocity, and increasing risk.

### Diagnosing Why the Fork Hurt So Much

Looking back, the problem wasn’t simply that we forked a library. It was how we forked:

- Deep Coupling: Instead of creating lightweight modular overrides, we modified core logic directly.
- No Upstream Strategy: We didn’t attempt to contribute PRs back upstream to solve the gaps collaboratively.
- Missing Isolation Tests: We didn’t build a dedicated regression harness to protect our changes from future upstream movement. Each of these magnified the natural risks of forking. And perhaps most critically: We failed to treat the fork as a debt instrument that needed an active payoff plan.

### What I Would Do Differently Today

Having lived through this, my philosophy has hardened:

- Forking is an emergency maneuver, not a first-class strategy.
- If you must fork:

- Build modular extension layers outside core logic when possible. — Aggressively isolate custom behaviors. — Maintain a minimal diff from upstream. — Document every divergence, explicitly. — Set a “debt clock” on the fork: if it’s not upstreamed or modularized within X months, trigger a review. In short: Plan for the fork’s exit from day one.

### Deep Lesson: Technical Debt Isn’t Just Code — It’s Organizational Strategy

This experience taught me a vital systems lesson:

- Technical debt is rarely accidental. It’s often a deliberate business decision (speed vs flexibility tradeoff).
- What matters isn’t avoiding debt completely. It’s whether you manage it consciously, strategically, and transparently. When engineering teams make these tradeoffs blindly — or without a plan — the debt compounds silently until it blocks progress at the worst possible moment. Building large systems isn’t about purity. It’s about debt awareness, debt hygiene, and debt recovery systems. Forking Moveable taught me to see technical debt not as a failure, but as a strategic instrument — one that demands maturity, discipline, and proactive management.Even the best architecture can break under misaligned incentives. Culture and systems must evolve together.

### QA Wars: A Culture-Architecture Collision

When I began working on Designer Cloud, I believed — like many engineers early in their leadership journeys — that great code would naturally create great outcomes. Build technically sound systems, document carefully, refactor with discipline, and the rest would follow. Reality proved more complex. In truth, architecture doesn’t live in a vacuum. It collides daily with culture, incentives, and power structures. Nowhere was this clearer than in our QA process.

Our QA system was structured around a black-box testing suite controlled exclusively by a single QA engineer. Developers had no ability to run these tests themselves before merging code. Instead, regressions were only discovered after code had landed into shared development branches — often after several PRs had already intertwined — making debugging regressions slow, frustrating, and costly. Initially, I saw this as a purely technical problem to fix. I independently built a Playwright-based end-to-end testing system, integrating it into our CI/CD pipeline to give developers immediate regression signals at pull request time.

I worked directly with the CTO of [QAWolf](https://www.qawolf.com/) to align our vision: empowering developers to create branch-specific test versions, automatically running and recording video sessions of test outcomes. Technically, it was a success. Culturally, it triggered a hidden organizational fault line. The QA engineer had crafted a role for himself where lack of visibility justified power. By preventing developers from running tests themselves, more regressions were guaranteed to appear. More regressions meant more reported bugs. And more bugs meant greater perceived QA importance. When my system began threatening this structure, a political backlash followed.

💡 “Architecture doesn’t fail in code — it fails in silence.”

Bug reports began using increasingly exaggerated language, subtly portraying developers as careless or sloppy. The QA engineer quickly enlisted the support of the product lead — formerly our lead designer, and a personal ally — who helped amplify these narratives. From a project management perspective, it was devastating. Sprints began producing an equal or greater number of bug tickets than feature tickets, creating the appearance of a never-ending losing cycle. Progress metrics deteriorated. Developer morale declined.

Despite support for my technical initiative from my direct manager — including budget approval for QA Wolf — critical organizational action was missing. Our engineering leadership failed to use their authority to break the power vacuum. Without that top-down intervention, cultural inertia won. The developer-owned CI/CD test system was mothballed. The black-box testing process remained. It was my first visceral, unavoidable lesson that technical architecture only succeeds when cultural architecture supports it.

Without visibility, shared ownership, and leadership willingness to confront entrenched incentives, even the best-designed systems will fail. In future projects, this shaped my entire approach. I now treat organizational incentives, transparency, and power dynamics as first-class considerations when architecting systems — not an afterthought.

Portals marked a shift into AI-assisted engineering — a natural growth from traditional systems rigor.

### Evolving Toward AI-Assisted Development (After Designer Cloud)

During the development of Designer Cloud, AI-assisted workflows were still in their infancy. While I occasionally used early versions of ChatGPT to assist with isolated challenges — such as setting up complex GSAP timelines for our live preview player — the core architecture, refactors, and systems design were entirely human-driven. At the time, AI was simply a supplemental tool: a second set of eyes, not a development engine. It wasn’t until my next major platform build, Portals, that I began to deeply integrate AI into my engineering workflows. With Portals, I leveraged AI not just for isolated questions, but for:

- Accelerating Storybook story generation and updates
- Streamlining end-to-end testing with micro-E2E strategies
- Rapid refactoring of atomic components and reusable modules
- Improving documentation speed without sacrificing fidelity Looking back, the contrast is stark. Designer Cloud represented the culmination of traditional large-scale frontend architecture: deliberate, careful, manually optimized over years. Portals marked the beginning of a new era: combining traditional architectural rigor with AI-enhanced development speed and scalability. Both experiences profoundly shaped how I approach systems today. The lesson wasn’t “AI will replace engineers.” It was: Engineers who know how to design great systems and wield AI as a force multiplier will build better, faster, and smarter than ever before.💡 “AI won’t replace engineers — but engineers who use AI will replace those who don’t.”Great engineering isn’t just about code — it’s about shaping systems that balance complexity, clarity, and collaboration.💡 “System design is people design. Code is just the easy part.”

### From Engineer to Systems Architect: What Building Designer Cloud Taught Me

Designer Cloud didn’t simply teach me how to build a complex design editor. It taught me how architecture, culture, and leadership must align — or else even brilliant code will struggle to reach its full potential. Through this project, I learned:

- Technical excellence matters — but organizational strategy matters just as much.
- Simplicity at the system level beats “smart” complexity every time.
- Debt management is a strategic act, not an afterthought.
- Performance and developer velocity must be designed into architecture from the beginning.
- Resilience matters. What you build — and how you build it — shapes your career, regardless of external factors. Over four years, we evolved Designer Cloud to meet full enterprise-grade production standards:
- Stable, modularized Redux state management
- Reliable, scalable Undo/Redo based on state snapshots
- Deep Storybook-first component architecture
- Extensible effects and layer systems modeled for long-term growth
- Rigorous performance optimization and developer velocity enhancements We achieved what we set out to accomplish technically: Building a browser-based editor capable of standing alongside the world’s best creative tools. More importantly, this experience fundamentally transformed how I think as an engineer.
- Today, when I design systems, I don’t just see code — I see the organizational dynamics, the cultural patterns, the incentives that will either reinforce or undermine the architecture. Designer Cloud made me not just a better engineer. It made me a systems architect — someone who thinks across code, culture, users, and time. That is the true product of these four years. And it’s the mindset I carry forward into every complex project I take on.

---

Read the canonical version and related series on davidmieloch.com.

Read the canonical version: https://davidmieloch.com/blog/what-i-learned-building-a-photoshop-in-the-browser?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=what-i-learned-building-a-photoshop-in-the-browser
