---
tags: [blog]
date: "2026-05-21"
title: "Five Ways an Agent Can Remember"
slug: "memory-layers-plain-english"
status: "ready"
canonical_source: "website"
website_source_path: "/Users/dmieloch/Documents/New project 2/research/vanacore-music-factory/content/drafts/memory-layers-plain-english-v2.md"
vault_original_path: null
canonical_url: null
hero_image: null
sync_generated_at: "2026-05-21T03:41:48+00:00"
---

# Five Ways an Agent Can Remember

You already use five different kinds of memory.

When you remember that Sarah introduced you to your accountant, and your accountant knows the guy who fixed your roof — that's one kind. When you recognize a melody from three notes even though you can't name the song — that's another. When you glance at a sticky note on your monitor that says "call bank before 5" — that's a third. These are not the same mental operation. They serve different purposes. They fail in different ways.

Software agents — programs that act on your behalf — have the same problem. Remembering is not one thing. Here are five systems, explained by what they're for and how they break.

---

**1. The relationship map**

Think of your mental model of your industry. You know that Alice used to work with Bob. You know Bob introduced you to Carol. You know Carol's company acquired the startup that makes the tool you use every day. It's a web of connections you navigate without thinking about it.

Engineers call this graph memory. The agent stores relationships — who knows what, how concepts connect to each other, which project led to which insight. When it needs to answer "what do we know about this client's history with us," it doesn't search for keywords. It walks the connections.

How it fails: relationships change faster than entries. The graph says Bob works with Carol. Bob left six months ago. The agent confidently follows an outdated connection and gives you wrong context. Maps are only as good as their maintenance.

---

**2. Finding things by feel**

You've done this: you remember reading something about quarterly planning, maybe in a Slack thread, maybe in an email, definitely sometime in October. You don't remember the exact words. But you'd recognize it if you saw it.

That recognition — the sense that something matches even though the words differ — is what makes semantic search different from keyword search. The agent can retrieve the conversation where you mentioned "cash flow concerns" even if you search for "runway worries." It finds by pattern, not by literal match.

This is closer to how you recognize a melody from three notes than how you look up a phone number. The agent isn't reasoning. It's recognizing.

How it fails: recognition is approximate. Sometimes close is wrong. The agent returns a conversation about "cash flow" that was actually about a completely different project. You trusted the match because it felt right. It wasn't.

---

**3. The sticky note**

Some things need to be remembered for five minutes. The meeting ended. The delivery arrived. Someone's waiting for a callback. You don't need to remember this next month. You need to grab it now and act.

That's short-term memory. Fast to write, designed to disappear. It's the operational layer — the stuff that keeps work moving without clogging up long-term storage with things that stop mattering by tomorrow.

How it fails: nothing clears it. The sticky note says "urgent: call back" and nobody removes it after the call happens. The agent keeps flagging something that's already resolved. Or worse: the note falls off the monitor and the callback never happens.

---

**4. The journal and the ID card**

You have two documents that define you. One doesn't change: your name, your role, the way you see the world. Call that your ID. The other accumulates: lessons you've learned, patterns you've noticed, people you've worked with. Call that your journal.

Agents have both. The ID is their core identity — it changes only when we deliberately redesign the agent. The journal grows over time, one observation at a time. "This client prefers bullet points." "That supplier always delivers late on Fridays." "Last time we tried this approach, it didn't work."

The journal is what makes an agent more useful after three months than on day one. Software doesn't usually improve the longer you use it. An agent with a journal does. It's more like an employee than a tool.

How it fails: it learns the wrong lesson. The agent notes that a client meeting went badly after you sent a long email. It concludes: short emails work better. The real problem was the content, not the length. Now the agent confidently applies a rule that makes things worse.

---

**5. What's happening right now**

Finally: what's on the table at this moment? What's running, what's blocked, what needs attention in the next hour?

This is awareness of the current situation. An agent checking this layer isn't asking "what did we learn?" — it's asking "what's true right now?" The meeting is still going. The report hasn't been sent. Three tasks are waiting.

How it fails: the situation changed and nobody updated the record. The agent thinks the meeting is still running. It's been over for an hour. Now everything downstream is wrong.

---

**The engineering move**

You experience memory as one seamless thing. You navigate all five systems without switching between them. The engineering move is decomposition: taking something unified and splitting it into parts that can be built separately.

That's what this taxonomy is for. You don't build all five for every agent. You build the ones that match the job. A bot answering customer questions needs the journal — it should learn what works over time. A system monitoring operations needs the sticky notes and current-state awareness — it needs to know what's happening now, not what happened last quarter. A research tool needs the relationship map and pattern-matching search — it needs to find connections and recognize relevance.

The question isn't whether your agent should have memory. It's which kinds of memory the work actually requires — and which failure modes you're willing to accept.

---

## REVISION NOTES

**Accepted:**
- Added one sentence defining "agent" at first use (Ebert #1)
- Softened jargon introductions throughout (Ebert #2, #3)
- Replaced "build finished," "server is down," "integration" with universal examples (Ebert #4, #5, #6)
- Added failure modes to every section (Chesterton's main note — this became the structural change)
- Made "recognition" work harder in section 2, framing semantic search as pattern recognition not reasoning (Chesterton)
- Applied all of White's cuts
- Consistent naming: dropped "state memory" confusion (Ebert #7)
- Cut the performance claim about "twenty minutes to seconds" entirely (Harris)
- Qualified the "day 90" claim by connecting it to the employee/tool distinction (Harris + Chesterton)
- Restructured ending around decomposition and failure modes (Chesterton + White)

**Rejected:**
- Harris suggested qualifying "more useful on day 90" with data. I kept the claim but reframed it: the observation is that *this is unusual for software*, which is verifiable by common experience. The claim is now positioned as noteworthy, not as measured.
- Ebert flagged the final paragraph's audience pivot. I didn't fully remove the "which kinds do you need" framing because it's the actual point of the taxonomy. But I removed the assumption that readers are having technical conversations and reframed it as a question anyone commissioning or using an agent might ask.