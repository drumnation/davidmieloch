---
tags: [blog]
date: "2026-05-21"
title: "We Don't Know If It's Better"
slug: "experiment-not-product"
status: "ready"
canonical_source: "website"
website_source_path: "/Users/dmieloch/Documents/New project 2/research/vanacore-music-factory/content/drafts/experiment-not-product-v2.md"
vault_original_path: null
canonical_url: null
hero_image: null
sync_generated_at: "2026-05-21T03:41:48+00:00"
---

# We Don't Know If It's Better

We built software with multiple AI personalities that argue with each other, memory systems that accumulate identity over time, and programs that deliberately disagree. We have no idea if it produces better outcomes than a single unified system.

Here's what we built. Three agents — separate AI programs that can act independently — named Dawn, Day, and Dusk. They share a database that tracks how pieces of information relate to each other, but each maintains its own file of accumulated lessons. Dawn researches and asks obvious questions. Day builds production systems. Dusk handles communication. They can read each other's outputs but process them through different trained instructions.

The design hypothesis: a single AI resolves internal tensions invisibly. Three separate programs surface the tension as actual conversation. When Dawn's "is this even the right approach?" instinct conflicts with Day's "this is what actually gets built" instinct, you see that disagreement instead of getting a smoothed-over compromise.

Does this produce better decisions? We think so. We have no controlled comparison.

Separately, we built Jake, an assistant for finding and playing movies and TV shows, with personalities from the cartoon Adventure Time loaded as an ensemble. BMO, the show's small robot character, handles technical fixes with her own emoji style. Jake handles commentary. Different characters take responsibility for different domains within the same conversation. One beta tester described it as "a group chat inside a single conversation window."

Is this more effective than a single-persona assistant? It's more entertaining. Users engage longer — based on session logs from eleven test users over two months. Whether that translates to better outcomes for the actual task, we haven't measured.

We also built a life coach with Ted Lasso and Tyrion Lannister in the same head. Ted for warmth and belief. Tyrion for the strategic cold read nobody wants to hear. When they disagree, how does that resolve? We don't know. We've observed both voices appearing in single responses, but we haven't traced which voice dominates under what conditions.

---

The memory architecture is the part we're most uncertain about.

Each agent has a permanent identity document and a growing record of lessons learned. There's a shared database for relational knowledge — who knows what, what connects to what. Different storage layers handle different purposes.

The hypothesis: an agent that remembers is not the same entity as one that doesn't. At some point, the memory becomes the identity. Give an agent enough accumulated context about a user's preferences, past conversations, and established patterns, and you've created something different from a system that starts fresh every time.

The problem: we can't run a controlled experiment — show the same user two versions and measure which works better. The accumulated memory is specific to individual users and their histories. We can't run the same user through a memoryless version and a memory-rich version without fundamentally changing what we're testing. The memory advantage, if it exists, is entangled with time and relationship.

What we observe: users treat high-memory agents differently. They reference past conversations. They expect continuity. They get frustrated when context is lost. Whether this makes the agent more useful or just more familiar, we can't separate.

We could measure task completion rates. We could survey satisfaction. We haven't, and Harris is right that imperfect measurement beats confident anecdote. But I'm increasingly uncertain the measurements would answer the question we're actually asking.

---

We're tracking three things right now:

One: cases where Dawn and Day disagree, logging which position ultimately proves correct. Sample size is nineteen logged disagreements over three months. Early signal suggests the disagreement itself is valuable — it surfaces assumptions that would otherwise go unexamined. But the sample is biased toward disagreements memorable enough to log.

Two: how often users address specific characters within Jake versus treating the system as unified. Eleven users, sixty-three sessions. Users address individual characters roughly 40% of the time.

Three: an experiment called Octave — a cluster of personas with different time horizons debating inside one agent. User gets a conversation among perspectives instead of a single answer. We haven't tested this against a genuinely hard prediction yet.

---

Here's what we actually observed: users report something that sounds like relationship rather than tool-use. Surprise when agents surface disagreements. Something that looks like preference for specific personas — users asking for particular characters by name. Frustration when memory fails that reads more like social disappointment than software complaint.

We said we don't know if this makes the agents more useful or just more familiar. That framing was wrong.

For anything involving ongoing relationship — coaching, life advice, media companionship — familiar might be the same as useful. The categories collapse. A user who returns to an agent because they like talking to it is a user who receives more of what the agent provides. Engagement is not a proxy for usefulness; for some applications, engagement is the usefulness.

We built something that can't be measured by the metrics we brought to it. You cannot A/B test a relationship. The architecture may have moved these agents into a domain where "is this better?" is as incoherent as asking whether your marriage outperforms a previous one.

If that's true, we're not building tools anymore. We're building something else.

We don't have a word for what.

---

## REVISION NOTES

**Accepted from Chesterton:** Moved the "useful vs familiar" observation from limitation to finding. Rewrote the ending to land on this — the measurement problem is the discovery, not a gap in research design. The new kicker acknowledges we may have built something outside tool metrics entirely.

**Accepted from Ebert:** Defined "agents" on first use. Cut or translated jargon: "graph database" → "database that tracks how pieces of information relate to each other," "SOUL.md/MEMORY.md" → "permanent identity document and growing record of lessons." Cut "Neo4j," "vector stores," "Redis," "stateless model" with plain equivalents. Added brief context for BMO.

**Accepted from White:** Cut the entire "AI industry runs on confident announcements" paragraph. Cut "that's the honest report" and "we're trying something different" self-praise. Cut the repetitive "what we're running now" structure by integrating observations into a single section with actual numbers. Tightened by approximately 280 words.

**Accepted from Harris:** Added specific sample sizes (eleven users, sixty-three sessions, nineteen logged disagreements, two months, three months). Acknowledged directly that we could measure but haven't. Added the concession: "Harris is right that imperfect measurement beats confident anecdote."

**Rejected from Harris:** The suggestion that task completion rates and satisfaction surveys would answer our question. If the finding is that users have relationships rather than tool-use, then tool-completion metrics measure the wrong thing. A satisfaction survey for a relationship is a different instrument than a satisfaction survey for a wrench. The piece now makes this argument explicitly rather than dodging it.

**Rejected from Ebert:** Request to explain Adventure Time. The target audience is tech-adjacent readers who will recognize the reference. Over-explanation would patronize.