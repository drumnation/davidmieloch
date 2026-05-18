---
platform: "devto"
mode: "api-draft-or-manual-copy"
post_mode: "full-mirror"
title: "Developing with a Team of AI’s"
canonical_url: "https://davidmieloch.com/blog/developing-with-a-team-of-ai-s"
tracked_url: "https://davidmieloch.com/blog/developing-with-a-team-of-ai-s?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=developing-with-a-team-of-ai-s"
source_slug: "developing-with-a-team-of-ai-s"
generated_at: "2026-05-18T21:41:27.842Z"
canonical_support: "supported"
approval_required: true
public_publish_allowed: false
---

# Developing with a Team of AI’s

## Posting guidance

Developer-facing mirror draft with canonical URL preserved.

- Do not publish without David approval.
- Preserve canonical URL: https://davidmieloch.com/blog/developing-with-a-team-of-ai-s
- Record the final platform URL back in content/distribution/platform-ledger.json.

## Copy

### A virtual developer round table discussion led by you and the prompts/software I used to make it happen

Human-led round table discussion with AI’s

When my brother linked me to the Noi browser I had to give it a shot. It had some standard features like saving prompts in a library and ability to use the awesome prompts library, but the feature I wanted to try most was the ability to load multiple browser window based AI’s side by side and type to them simultaneously.

I loaded Noi up and put ChatGPT 4 on one side and Claude 3 Opus on the other. There’s a box in the lower left corner and when I type into it, my input gets transferred to the input fields for both AI’s. Sure, you could just split screen two browsers and copy paste to both, but there’s something about eliminating that step that makes asking the same question of two different AI’s feel lighter, like you aren’t actually adding an extra step to the process.

That said, the results got my wheels turning.

[GitHub - lencx/Noi: 🚀 Power Your World with AI - Explore, Extend, Empower.](https://github.com/lencx/Noi)

Noi Browser Loaded Up with My AI’s

### Initial conclusions:

ChatGPT 4 and Claude 3 Opus’s responses to the same coding question were way different.

This difference makes it totally worth getting the most out of paying for 2x $20 subscriptions and asking both each question, especially when you’re dealing with some really complex debugging or problems.

Sometimes ChatGPT would respond without any code and just a list of conceptual ideas about how to solve my problem. I usually hate this, especially when I’m coding at warp speed, my brain is fried from a long day and want some actual code examples to try. In this scenario though, I’ve realized that those concepts can just be shared with Claude and then he might try his hand at the actual code. Win!

### Scenario 1: I liked one AI’s answer better

In order for each AI to continue being useful they need to understand where you currently are in your process. If I pick ChatGPT’s answer I need to let Claude know what that answer was and that I’m not going with his suggestion. That way, the next time I ask a joint question Claude knows where the code is currently at and can give an up to date response on the follow up question. The same works in reverse.

To do this I created a bunch of saved prompts I can click on from a menu in the bottom right. This is where I started feeling like if I could write some kind of plugin for this Noi browser that I could make this process even more efficient. For now though, storing these prompts and then copy pasting the relevant parts of the response was enough.

### Prompt 1

While trying to solve this issue I asked Claude 3 Opus the same question.
It suggested a different solution and I have decided to go in that direction.
Here is the solution Claude provided me with for your reference.{PASTE CODE OR RESPONSE HERE}I will then ask a follow up questions based on the assumption that I
followed Claude’s path and not the one you just provided.

### This worked great.

### Here was the response from ChatGPT:

Following Claude’s approach, you’ve made a strategic decision to simplify and directly integrate your scene and transition data management within the GSAP hook. This method promises a more streamlined and consistent synchronization between your scene data and the GSAP animations, potentially solving the issues you’ve encountered.Let’s proceed to your follow-up questions or concerns based on implementing this approach. How can I assist you further?They appreciate each other :D

### Scenario 2: I liked elements from both AI’s answers

This situation required a different prompt. Reading through the responses to my coding question from both AI’s led me to pick out one or two bullets from each that I thought would be useful to try. I crafted a new prompt that allowed me to share the ideas I liked from both with the group as well as inserting my own ideas and thoughts about those ideas into the discussion.

### Prompt 2

I’m consulting with both ChatGPT 4 and Claude 3 Opus and in this iteration, I like some of what both of you suggested.Here is what I liked from what ChatGPT 4 suggested:{Code}Here is what I liked from what Claude 3 Opus suggested:{Code}Here are my thoughts as a result of reading both responses and any data requested as a result of the advice I liked above:{Code/Thoughts}

The first time I tried this I found myself in the situation where ChatGPT didn’t write any code, just provided a numbered list of things I might try, while Claude wrote me some code. After I shared this prompt with both of them, Claude decided to implement ChatGPT’s code suggestions, which I thought was fantastic.

### Claude’s Response:

Based on the suggestions from both ChatGPT 4 and Claude 3 Opus, as well as your own thoughts, here’s a revised approach to synchronize the scene data with GSAP animations directly in the GSAP hook:1. Remove the code that generates the transitions array and stores it in the Redux store. Instead, calculate the transitions directly from the scene data within the GSAP hook.
2. Modify the useGSAP hook to generate the transitions array based on the scenes data:// BUNCH OF CODE

### I was pretty excited by this outcome. An idea that came from ChatGPT served as a prompt to Claude and became fleshed out into actual code.

![medium 04](/blog/developing-with-a-team-of-ai-s/images/medium-04.png)

### Scenario 3: Work on an idea with one AI

Sometimes you just want to tweak the idea that one of the AI’s responded with. In this case I just work directly with that AI giving it follow up prompts until I reach the solution I’m looking for. Once I’ve used that solution in my project I then sync that solution with the other AI and get it up to speed with the current state of the code so it can continue to help.

### Prompt 3

I worked with the other AI a little bit and through some back and forth we updated the solution like this:{Code}I just wanted to keep you updated. I’ll let you know when I have my next question for you.

![medium 05](/blog/developing-with-a-team-of-ai-s/images/medium-05.png)

### Conclusion

- Keep the AIs in sync with the current state of your code
- Take advantage of the diversity of thought different AI models provide
- Amplify that diversity by having those models share their ideas with each other

It’s clear there’s some real value in this approach. Noi allows me to add more than two AI’s and I’ll likely try adding the Gemini Advanced model next to build out my developer round table further.

It’s also clear that the process of keeping the AI’s synced together could be automated further, maybe by another AI that could compress the tokens first? Or even just by having access to the browser data and saving the trouble of copy pasting relevant code blocks into my templates. Time will tell.

### When it comes to the full potential of AI assisted coding, we ain’t seen nothing yet.

![medium 06](/blog/developing-with-a-team-of-ai-s/images/medium-06.png)

---

Read the canonical version and related series on davidmieloch.com.

Read the canonical version: https://davidmieloch.com/blog/developing-with-a-team-of-ai-s?utm_source=devto&utm_medium=syndication&utm_campaign=content_distribution&utm_content=developing-with-a-team-of-ai-s
