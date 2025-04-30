import React from 'react';
import { HeroProps } from '@shared-components/organisms/Hero';
import { BlockType } from './RecursiveJourney.types';
import {
    IconPlayerPlay,
    IconChecklist,
    IconRobot,
    IconMessageCircleQuestion,
    IconBrain,
    IconCpu
} from '@tabler/icons-react';

export const RECURSIVE_JOURNEY_CONTENT = {
    hero: {
        desktopTitle: "Inside Brain Garden: A Recursive Journey",
        mobileTitle: "A Recursive Journey",
        subtitle: "How the System Builds Itself",
        description: "When I first started building Brain Garden, it wasn't a framework. It was a seed — a few hand-written prompts, a messy set of folders, and a handful of CLI scripts barely holding it together.",
        background: "image",
        backgroundImage: "/brain-garden-recursive-journey.png",
        backgroundOverlay: true,
        overlayOpacity: 0.6,
        textColor: "light",
    } as HeroProps,

    introduction: [
        "When I first started building Brain Garden, it wasn't a framework. It was a seed — a few hand-written prompts, a messy set of folders, and a handful of CLI scripts barely holding it together.",
        "But then something strange happened.",
        "Each time I created a new prompt, it helped me write a better one. Each workflow I built turned into a blueprint for more workflows. The system didn't just help me code — it started helping me build *itself*.",
        "That's when Brain Garden stopped being a tool and started becoming a living system — recursive, adaptive, and self-improving."
    ],

    // Define actual block content here
    blocks: [
        {
            title: "Step 1: Context Initialization",
            summary: "Every project begins with a mental download: the `.brain/overview.md` file.",
            content: [
                "Every project begins with a mental download: the `.brain/overview.md` file.",
                "This single file loads the agent with everything it needs to work intelligently:",
                "- The core **problem** being solved",
                "- The **audience** and user constraints",
                "- The **limitations** and **technologies** it must respect",
                "- A clear snapshot of **why** this work matters",
                "> Think of it like a mission briefing for a junior developer. Only faster, more consistent, and always up to date."
            ],
            icon: <IconPlayerPlay size={24} />,
            exampleFile: "project-context-example.md",
            exampleLabel: "See example: `project-context-example.md`"
        },
        {
            title: "Step 2: Feature Task Planning",
            summary: "Tasks in Brain Garden are atomic. Each lives in its own file, scoped and complete.",
            content: [
                "Tasks in Brain Garden are atomic. Each lives in its own file, scoped and complete:",
                "- **Feature:** What's being built",
                "- **Status:** Tracked live",
                "- **Last Updated:** Timestamped for history",
                "- **Key Files, Dependencies, Risks:** Pulled directly from the codebase",
                "- **Design Patterns & Paradigms:** Explained and justified",
                "- **Downstream Impact:** Traced across the system",
                "- **Test Plan:** Integrated with MECE task checklists",
                "> These aren't vague JIRA cards. They're living, structured execution plans written in Markdown — readable by humans and agents alike.",
                "Each one also contributes to the global task index, forming the brain's operational loop."
            ],
            icon: <IconChecklist size={24} />,
            exampleFile: "feature-task-plan-example.md",
            exampleLabel: "See example: `feature-task-plan-example.md`"
        },
        {
            title: "Step 3: Intelligent Execution",
            summary: "Once work begins, the agent reads the task plan, opens the linked files, and applies context-aware rules.",
            content: [
                "Once work begins, the agent reads the task plan, opens the linked files, and applies context-aware rules based on its current location and scenario.",
                "**Rules attach in four modes:**",
                "- `always` (global defaults)",
                "- `glob:` scoped to directories or file types",
                "- `scenario:` triggered by agent introspection",
                "- `manual:` injected by prompt",
                "Rules are not just reminders — they are **reflexes** the agent internalizes.",
                "> Example: A rule might detect a file exceeding 500 lines and auto-trigger a refactor into `.logic.ts`, `.view.tsx`, `.styles.ts`, and `.types.ts`.",
                "If everything goes smoothly, the agent builds features, writes tests, updates documentation, and completes the task.",
                "But when it doesn't — that's when Brain Garden shows its real power."
            ],
            icon: <IconRobot size={24} />,
            exampleFile: "system-rule-example.md",
            exampleLabel: "See example: `system-rule-example.md`"
        },
        {
            title: "Step 4: Self-Rescue with Skill Jacks",
            summary: "When the agent gets stuck, it doesn't halt. It escalates.",
            content: [
                "When the agent gets stuck — a repeated error, unexpected edge case, or missing knowledge — it doesn't halt. It escalates.",
                "Brain Garden invokes the **Skill Jack workflow** — a two-part recovery process designed to equip the agent with exactly what it needs to move forward.",
                "1. **Diagnose the knowledge gap.**",
                "   A special prompt analyzes the problem and outputs a focused recommendation in JSON format, answering:",
                "   - Why is the agent stuck?",
                "   - What's missing?",
                "   - What solution domain could unlock progress?",
                "   - What topic should be documented to solve this in the future?",
                "",
                "2. **Generate the knowledge file.**",
                "   The recommended topic is passed into a second prompt, which creates a fully structured TypeScript file following a strict schema: definitions, principles, application steps, code examples, pitfalls, and resources.",
                "",
                "Together, these steps produce what we call a **Skill Jack** — a tactical, just-in-time knowledge upgrade.",
                "",
                "Skill Jacks contain:",
                "- Concept definitions",
                "- Best practices",
                "- Design patterns",
                "- Lightweight code examples",
                "- Pitfalls to avoid",
                "- Application checklists",
                "",
                "> It's not a Wikipedia dump — it's a compressed, functional knowledge crystal the agent can wield instantly.",
                "",
                "The result? The agent gets back on track without human micromanagement."
            ],
            icon: <IconCpu size={24} />,
            exampleFile: "skill-jack-workflow-example.md",
            secondExampleFile: "skill-jack-code-example.ts",
            exampleLabel: "See example: `skill-jack-workflow-example.md`",
            specialStyle: "terminal"
        },
        {
            title: "Step 5: Protecting the Brain",
            summary: "This part is going to sound ridiculous, but it's important — so stay with me.",
            content: [
                "There's a folder called `.brain/`. It holds the memory, rules, context, and evolving thought process of the project — a kind of lightweight soul. When the agent is working on your app, that folder *is* its brain.",
                "Now imagine you ask the agent to build the Brain Garden CLI — the tool that generates `.brain/` folders for other projects — and the agent is using its own `.brain/` folder to do that work.",
                "In other words: **it's using its brain to build Brain Garden, inside Brain Garden, using Brain Garden.**",
                "During early testing, this recursion got... messy.",
                "The agent would spin up a test environment and see two `.brain/` folders — the one it *was* using and the one it *thought* was a test stub. Then, with no hesitation, it would delete what it assumed was throwaway scaffolding. Except... it just erased its own brain.",
                "Think of it like performing brain surgery on yourself *inside a simulation* of a brain surgery training lab, and getting confused about whether the brain you're holding is yours, the dummy's, or the simulated dummy's — and just chucking it into the trash.",
                "The result? Instant memory loss. The system loses all context, history, instructions, and behavioral logic. It's like unplugging the neural net mid-sentence.",
                "So we did the only rational thing you can do in a recursive, agent-driven ecosystem: we yelled at the AI — in a rule file.",
                "```md",
                "**RULE: BrainGarden CLI - `.brain/` Folder Integrity Reminder**",
                "",
                "WE ARE USING BRAIN GARDEN TO BUILD THE BRAIN GARDEN SYSTEM.",
                "",
                "The root `.brain/` folder is CRITICAL for Brain Garden, storing project state, history, and metadata.",
                "",
                "**Precautions:**",
                "",
                "- **NO Direct Manipulation:** CLI code MUST avoid direct file system changes within `.brain/`, except via intentional CLI commands.",
                "- **Confirmation for Destructive Actions:** Any command modifying `.brain/` MUST require explicit user confirmation.",
                "- **Atomic Operations Only:** Prevent partial updates.",
                "- **Avoid Manual Edits:** Humans — yes, you — leave it alone.",
                "- **Use CLI API:** All interactions must go through the CLI layer.",
                "- **Backup Required:** Always back up `.brain/` before changes.",
                "",
                "**Why:** If the agent loses its brain while building the brain for other brains, it forgets how to brain. And then everyone is brainless.",
                "```",
                "This isn't just about safety. It's about survival.",
                "If you want autonomous agents to work on intelligent systems that build intelligent systems, you have to protect their runtime cognition like it's sacred.",
                "Or at least put it behind a big red warning sign that says:",
                "> \"Hey! That's your *own* brain. Maybe don't delete it while you're using it to build the brain-builder inside the brain you're building.\""
            ],
            icon: <IconBrain size={24} />,
            specialStyle: "warning"
        }
    ] as BlockType[],

    conclusion: [
        "",
        "- The agent doesn't just execute — it **understands**.",
        "- Tasks aren't vague cards — they're structured, testable **execution plans**.",
        "- Prompts aren't ad hoc — they're **reusable command chains**.",
        "- Documentation isn't an afterthought — it's a **default behavior**.",
        "- When knowledge gaps appear, the system **patches itself**.",
        "",
        "Brain Garden doesn't just help you write code.",
        "",
        "It helps you build a team of agents who:",
        "- Understand your system",
        "- Adapt over time",
        "- Stay on track",
        "- Write clean code",
        "- And document themselves as they go",
        "",
        "> It's not magic. It's just the right combination of structure, recursion, and text files.",
        "",
        "That's what makes Brain Garden different."
    ],

    // Navigation IDs
    blockNavIds: [
        'context-initialization',
        'feature-task-planning',
        'intelligent-execution',
        'self-rescue-skill-jacks',
        'protecting-the-brain',
        'why-it-works'
    ],

    // CTA text
    cta: "Want to build a system like this in your team? Let's talk."
}; 