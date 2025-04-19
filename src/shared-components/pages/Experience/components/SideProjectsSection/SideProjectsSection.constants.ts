import { ProjectCategory, SideProject } from './SideProjectsSection.types';

export const SECTION_TITLE = 'Side Projects with Impact';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Personal Innovation Lab',
  'Developer Tools',
  'SaaS Applications',
  'Digital Marketing'
];

export const SIDE_PROJECTS: SideProject[] = [
  // Personal Innovation Lab
  {
    title: 'Game Sage',
    category: 'Personal Innovation Lab',
    description: `# Game Sage

*Enhance your gaming with AI-powered real-time analysis.*

## Overview

An **AI-powered** desktop application that enhances the
gaming experience by providing real-time analysis
and commentary.

## Core Features

*   **Real-time AI gameplay analysis** through automatic
    screenshot capture.
*   **Multiple analysis modes** (tactical advice,
    professional commentary, e-sports casting).
*   **Global hotkeys** for instant capture during gameplay.
*   **Multi-monitor support** with selective display options.
*   **Context-aware responses** that maintain gameplay history.
*   **Scene change detection** to identify key gameplay moments.

## Key Benefits

*   **Improve Skills:** Get tactical advice based on your play.
*   **Enhanced Entertainment:** Enjoy professional-style commentary.
*   **Seamless Integration:** Works smoothly during gameplay.
*   **Flexible:** Supports multi-monitor setups.
*   **Smart Analysis:** Understands game context and key moments.`,
    technologies: ['Electron', 'React.js', 'TypeScript', 'OpenAI Vision API'],
    startDate: '2024',
    endDate: '2024',
    logoPath: '/media/game-sage-logo.png',
    showBorder: true,
    repoUrl: 'https://github.com/drumnation/game-sage',
    impact: '**Transforms gaming experiences** by delivering AI-powered real-time analysis and commentary that helps players improve their skills while adding a new dimension of entertainment.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/game-sage/game-sage.png',
        title: 'Game Sage Main Interface',
        width: '100%'
      },
      {
        type: 'image',
        url: 'media/screenshots/game-sage/game-sage5.png',
        title: 'Analysis Features',
        width: '100%'
      }
    ]
  },
  {
    title: 'AI Hypnosis Script Generator',
    category: 'Personal Innovation Lab',
    description: `# AI Hypnosis Script Generator

*Create personalized hypnotherapy experiences with AI.*

## Platform Overview

A comprehensive platform for creating personalized
hypnotherapy experiences.

The system features **AI-assisted** script generation
with multi-section hypnosis scripts (induction,
deepener, therapeutic content, emergence).

It includes **text-to-speech conversion** using **SSML**
for natural voice output, integrated **binaural beats**
generation for enhanced hypnotic effects, and a
template system for quick customization.

## Key Features

*   **AI Script Generation:** Creates **multi-section**
    hypnosis scripts automatically.
*   **Natural Voice Output:** Uses **SSML** for realistic
    text-to-speech.
*   **Binaural Beats:** Integrated audio for enhanced effects.
*   **Personalization:** Manage client info for tailored scripts.
*   **Session Management:** Save sessions and download/stream
    the complete audio.

## Key Benefits

*   **Highly Personalized:** Incorporates user details for
    a tailored experience.
*   **Simulates 1-on-1 Session:** Natural voice output mimics
    a real hypnotherapist.
*   **All-in-One Platform:** Combines script generation,
    audio production, and session management.
*   **Customizable:** Template system allows for quick adaptation.
*   **Accessible:** Download or stream complete audio sessions.`,
    technologies: ['React.js', 'TypeScript', 'Openai', 'Web Audio API', 'SSML', 'IndexedDB', 'Node.js'],
    startDate: '2024',
    endDate: '2024',
    logoPath: '/media/hypnosis-logo.png',
    showBorder: true,
    impact: 'Combined AI script generation with audio technology to create a personal hypnotherapy experience. The system delivers deeply personalized content that incorporates the user\'s name, specific goals, and individual scenarios, then speaks them aloud with natural intonation—effectively simulating a one-on-one session with a hypnotherapist.',
    media: [
      {
        type: 'audio',
        url: 'media/creativity-hypnosis-session.mp3',
        title: 'Confidence and Creativity Hypnosis Session',
        description: 'An AI-generated hypnosis script created with the generator, featuring AI generated meditative music, and spoken by my voice clone using text-to-speech.',
        buttonText: 'Listen to Hypnosis Session',
        thumbnail: '/media/hypnosis-thumbnail.png',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
        width: '100%'
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp1.png',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp3.png',
        title: 'Script Generation Interface',
        width: '48%',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp5.png',
        title: 'Script Editor View',
        width: '48%',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp7.png',
        title: 'Audio Playback Controls',
        width: '48%',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp12.png',
        title: 'Session History',
        width: '48%',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      },
      {
        type: 'link',
        url: 'https://medium.com/@davidmieloch/enhanced-focus-and-concentration-techniques-to-improve-your-mind-while-coding-c7454fdcf3b5',
        thumbnail: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*vTo6Unq_jBCR8PbwQrQTiw.jpeg',
        height: 400,
        buttonText: 'Read My Article',
        title: 'Techniques for Increasing Focus, Concentration, and Improving Your Mind',
        description: 'This comprehensive guide outlines various techniques for enhancing mental performance, including rhythmic breathing exercises, brainwave entrainment through binaural beats, meditation practices, and the use of nootropic supplements. Drawing from personal experience as a "biohacker," the text explains how these methods can help achieve optimal mental states while highlighting the importance of proper nutrition and strategic power napping for cognitive function.',
        width: '100%',
        customHeight: '250px',
        thumbnailWidth: '250px'
      },
    ]
  },
  {
    title: 'Parenting Pilot',
    category: 'Personal Innovation Lab',
    description: `# Parenting Pilot

*Stay organized and track your child's education effortlessly.*

## Overview

An intelligent mobile application designed to help parents
manage their children's educational journey.

Using **advanced AI**, the app automatically processes
information from school emails, scanned documents, and
uploaded media. It creates actionable items, tracks
important events, and documents progress.

## Core Features

*   **Child Profile Management:** Handles **multiple children**.
*   **AI-Powered Processing:** Processes emails and documents
    using **OCR** for digitizing physical papers.
*   **Automatic Categorization:** Sorts info into action items
    and events.
*   **Calendar Integration:** Syncs school events.
*   **Progress Tracking:** Monitors academic achievements and
    developmental milestones.
*   **Media Gallery:** Stores children's artwork.
*   **Automated Notifications:** Includes scheduled email reports.

## Key Benefits

*   **Reduces Overwhelm:** Organizes chaotic school communications.
*   **Never Miss Deadlines:** Tracks important dates and actions.
*   **Automated Information Capture:** Processes emails and scans
    effortlessly.
*   **Centralized Hub:** Keeps all child-related info in one place.
*   **Track Milestones:** Documents academic and developmental progress.`,
    technologies: ['React Native', 'Node', 'TypeScript', 'Openai'],
    startDate: '2024',
    endDate: 'Present',
    impact: 'Transforms the chaos of school communications into an organized system that ensures parents never miss important deadlines, events, or achievements in their children\'s educational journey.',
    // media: [
    //   {
    //     type: 'image',
    //     url: 'media/screenshots/parenting-pilot/dashboard.png',
    //     title: 'Parenting Pilot Dashboard',
    //     width: '48%'
    //   },
    //   {
    //     type: 'image',
    //     url: 'media/screenshots/parenting-pilot/document-scan.png',
    //     title: 'Document Scanning Interface',
    //     width: '48%'
    //   }
    // ]
  },
  {
    title: 'StoryTime',
    category: 'Personal Innovation Lab',
    description: `# StoryTime

*Create fully-voiced audiobooks with AI assistance.*

## Overview

A comprehensive web application empowering users to create
fully-voiced audiobooks through an intuitive interface.

It combines **AI-powered script generation** with advanced
**text-to-speech technology**, automating the technical
aspects of audiobook production.

## Key Features

*   **Story management** with chapter organization.
*   **Character creation** with customizable attributes
    (personality, appearance, background).
*   **AI-powered script generation** using **OpenAI's GPT models**.
*   **Voice customization** for characters and narrators.
*   **Text-to-speech conversion** using advanced voice APIs.
*   **Script version history**.
*   **Plot mapping** with relationship visualization.
*   **Multi-voice compilation** for complete audiobooks.

## Key Benefits

*   **Accessible Production:** Simplifies complex audiobook creation.
*   **Rich Character Voices:** Bring narratives to life.
*   **Professional Quality Audio:** Automated high-quality output.
*   **Focus on Creativity:** Automates technical tasks for storytellers.
*   **Full Control:** Manage stories, characters, plots, and voices.`,
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'Speechify API', 'ElevenLabs Voice Cloning', 'React Audio Player', 'Node.js'],
    startDate: '2024',
    endDate: '2024',
    logoPath: '/media/story-time-logo.png',
    showBorder: true,
    impact: '**Transforms** the complex process of audiobook production into an **accessible creative experience**, enabling storytellers to bring their narratives to life with rich character voices and professional-quality audio.',
    media: [
      {
        type: 'image',
        url: '/media/screenshots/storytime/storytime1.png',
        title: 'StoryVoice™ Dashboard: Your Audiobook Command Center',
        description: `Transform written stories into captivating audiobooks with our all-in-one interface:

**Left Panel:** Access your complete story library with one-click navigation between projects.

**Center Panel:** Configure your active story with:
- Custom narrator voice selection with audio samples
- Chapter-by-chapter structure visualization showing plot elements, conflicts, and character moments

**Right Panel:** Manage characters effortlessly—edit profiles, generate new characters with AI, and maintain consistent characterization throughout.

With StoryVoice™, professional audiobook creation is just a few clicks away.`,
        width: '100%'
      },
      {
        type: 'image',
        url: '/media/screenshots/storytime/storytime3.png',
        title: 'Chapter View Interface',
        description: 'View and generate story chapter scripts and voiceovers with plot devices and character integration',
        width: '48%'
      },
      {
        type: 'image',
        url: '/media/screenshots/storytime/storytime2.png',
        title: 'Chapter Edit Interface',
        description: `Our intuitive Chapter Edit interface gives you **unprecedented control** over your AI-generated audiobook's structure and performance. With a few simple selections, shape how your story unfolds:

* **Define Critical Moments** — Set meaningful chapter titles and select pivotal plot points that drive your narrative forward
* **Character Casting** — Choose exactly which characters appear in each chapter, ensuring consistent character development throughout your story
* **Narrative Techniques** — Apply sophisticated plot devices like frame narratives that elevate your storytelling approach`,
        width: '48%'
      },
      {
        type: 'image',
        url: '/media/screenshots/storytime/storytime4.png',
        title: 'Character Creation Interface',
        description: 'Create and manage character profiles with customizable attributes',
        width: '100%'
      },
      {
        type: 'audio',
        url: '/media/storytime-demo.mp3',
        title: 'StoryTime 2.0 Multi-VoiceAudio Sample',
        description: 'Listen to a sample audiobook generated with multiple AI character voices',
        thumbnail: '/media/storytime-mcguffin.png',
        thumbnailWidth: '80px',
        width: '100%'
      },
      {
        type: 'embed',
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1896499647&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/davidmieloch" title="davidmieloch" target="_blank" style="color: #cccccc; text-decoration: none;">davidmieloch</a> · <a href="https://soundcloud.com/davidmieloch/the-end-of-time-a-hitchhikers-guide-to-the-dying-universe',
        title: 'From Manual Process to Streamlined App - StoryTime 1.0 MVP',
        description: `I created this demo by manually using Agent Aider to experiment with AI storytelling. Through trial and error, I discovered how to generate a 10-chapter story one piece at a time, then iteratively revise it in ways human writers rarely attempt—like introducing a new character in Chapter 3 that completely redirected the narrative.

The process revealed something powerful: AI could effortlessly regenerate all subsequent chapters when early plot elements changed. My sci-fi adventure featuring family members (my girlfriend became a space whale!) showed how deeply personal these stories could be.

*This manual experimentation directly inspired **Storytime 2.0**—an app designed to streamline this complex process of character development, plot point creation, and narrative regeneration into an intuitive tool anyone can use.*`,
        cropHeight: '170px',
        width: '100%'
      },
    ]
  },
  {
    title: 'Life Guidance AI',
    category: 'Personal Innovation Lab',
    description: `# Life Guidance AI

*Generate a personalized self-help audiobook from your data.*

## Overview

A personal development system creating customized audiobooks
by feeding vast amounts of personal data into **AI models**.

The system ingests content (blogs, LinkedIn, projects,
comments, music data, testimonials) and uses
**meta-prompting** for personalized guidance.

## Technical Details

A **TypeScript** processing pipeline compares **ChatGPT** and
**Gemini** responses across **11 strategic archetypes**.

Content is transformed into a structured audiobook exploring
career, future planning, and ethics.

Output uses **voice cloning** for self-narration, with
specialized transformers preserving technical content for
natural speech.

## Key Benefits

*   **Hyper-Personalized Guidance:** Tailored advice based on
    your unique digital footprint.
*   **Self-Narrated Experience:** Audiobook delivered in your
    own cloned voice.
*   **Multi-Model Analysis:** Compares insights from leading
    AI (**ChatGPT**, **Gemini**).
*   **Structured Content:** Organizes guidance into key life areas.
*   **Preserves Technical Detail:** Ensures accurate representation
    in audio format.`,
    technologies: ['TypeScript', 'Speechify', 'OpenAI', 'Gemini', 'Node.js', 'Markdown'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Created a personalized two-hour self-help audiobook narrated in my own voice clone, delivering tailored career and personal development guidance based on AI analysis of my digital footprint.',
    media: [
      {
        type: 'pdf',
        url: 'media/Life Guidance - Table of Contents.pdf',
        title: 'Life Guidance Table of Contents',
        width: '100%'
      },
      {
        type: 'audio',
        url: 'media/life-guidance.mp3',
        title: 'Life Guidance Audio Sample',
        description: 'Listen to a sample of the AI-generated guidance audio',
        thumbnail: '/media/misc/life-guidance-sample.png',
        thumbnailWidth: '80px',
        width: '100%'
      }
    ]
  },
  {
    title: 'Music Project Management System for Music Licensing',
    category: 'Personal Innovation Lab',
    description: `# Music Project Management System

*Review, annotate, and manage audio tracks efficiently.*

## Overview

A comprehensive web application for music professionals.

Designed for reviewing, annotating, and managing audio tracks
with advanced features for collaboration.

## Core Features

*   **Advanced Waveform Visualization:** Includes zoom functionality.
*   **Precise Playback Controls:** Navigate audio accurately.
*   **BPM Detection & Modification:** Analyze and adjust tempo.
*   **Time-Based Commenting:** Add feedback directly on the timeline.
*   **Metadata Management:** Organize track information.
*   **Responsive Layout:** With resizable components.
*   **Real-time Waveform Navigation:** Quick seeking and playback.
*   **Volume Control:** With visual feedback.
*   **Dynamic Comment Display:** Tied to playback position.
*   **AI-Powered Comments:** **OpenAI integration** for suggestions.
*   **Keyboard Shortcuts:** For faster interaction.
*   **Multi-Format Support:** Handles various audio file types.

## Key Benefits

*   **Accelerated Workflow:** Streamlines the review process.
*   **Precise Feedback:** Time-stamped comments improve clarity.
*   **Enhanced Collaboration:** Better communication among professionals.
*   **AI Assistance:** Generate comment suggestions automatically.
*   **User-Friendly Interface:** Intuitive controls and navigation.`,
    technologies: ['React.js', 'TypeScript', 'WaveSurfer.js', 'OpenAI', 'Render.com'],
    startDate: '2024',
    endDate: '2024',
    logoPath: '/media/screenshots/mpm-logo-crop.png',
    showBorder: true,
    repoUrl: 'https://github.com/drumnation/mpm',
    impact: 'Transformed how music professionals collaborate by providing precise, time-stamped feedback on audio tracks, enabling more effective communication and accelerating the music production workflow.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/mpm.png',
      },
      {
        type: 'link',
        url: 'https://music-project-management.onrender.com/',
        title: 'Music Project Management System',
        buttonText: 'Try Demo',
        description: 'A music project management system for music licensing, built with React.js.',
        thumbnail: '/media/misc/render.png',
        thumbnailWidth: '240px',
        width: '100%'
      }
    ]
  },
  // Developer Tools
  {
    title: 'AI Brain Garden',
    category: 'Developer Tools',
    description: `# AI Brain Garden

*Revolutionize development with project-specific AI Brains.*

## Overview

A command-line tool creating structured knowledge bases
("Brains") integrating templates, rules, and AI agents.

Addresses inefficiencies of current AI tools by offering
a unique, highly customizable solution for developers.

## Key Features

*   **Context-aware assistance:** AI help that understands
    your specific project.
*   **Customizable agents:** Configure specialized AI helpers
    for different tasks.
*   **Integrated task management:** Track and prioritize
    development activities.
*   **Dynamic cursorrules:** Automatically enforces
    coding standards.
*   **Atomic design for prompts:** Creates reusable,
    modular AI instructions.

## Key Benefits

*   **Streamlined Workflows:** Improve efficiency with integrated tools.
*   **Enhanced Project Outcomes:** Better structure and AI assistance.
*   **Tailored AI:** Customizable agents fit specific project needs.
*   **Improved Consistency:** Enforces coding standards automatically.
*   **Reusable Prompts:** Modular instructions save time.`,
    technologies: ['Node', 'TypeScript', 'Gemini', 'CLI'],
    startDate: '2024',
    endDate: 'Present',
    logoPath: '/media/misc/brain-garden.png',
    impact: '**Created a framework** that enhances structure for Enterprise AI-assisted development workflows'
  },
  {
    title: 'Code Relay',
    category: 'Developer Tools',
    description: `# Code Relay

*Control VS Code remotely from your mobile device.*

## Overview

An innovative system bridging mobile devices and
development environments.

Allows remote control of VS Code via a **VS Code extension**
(server) and a **React Native** mobile app (client),
communicating via **WebSockets**.

## Core Features

*   **Remote VS Code Control:** Execute commands from phone/tablet.
*   **Extension Access:** Use installed extensions remotely.
*   **AI Assistant Integration:** Deep integration with **Roo Code**
    and **Copilot**.
*   **WebSocket Communication:** Real-time connection.

## Key Benefits

*   **Stay Productive Anywhere:** Access your dev environment on the go.
*   **Seamless Mobile Access:** Control VS Code and AI assistants.
*   **Full Functionality:** Execute commands and use extensions.
*   **AI Integration:** Leverage coding assistants remotely.`,
    technologies: ['React Native', 'VS Code Extension', 'WebSockets', 'TypeScript', 'AI Integration'],
    startDate: '2025',
    endDate: 'Present',
    impact: 'Empowers developers to stay productive by providing seamless mobile access to their VS Code environment and AI coding assistants from anywhere.',
  },
  {
    title: 'Browser-use CLI (FORK)',
    category: 'Developer Tools',
    description: `# Browser-use CLI (FORK)

*Train AI agents for browser automation via natural language.*

## Overview

A powerful terminal-based interface enabling developers
to train AI agents for browser tasks using commands.

Leverages vision-capable interaction for analysis.

## Core Features

*   **Terminal Browser Automation:** Control via natural language.
*   **Multi-Provider LLM Support:** **Anthropic**, **OpenAI**,
    **Google Gemini**, **DeepSeek**.
*   **Vision-Capable Interaction:** Visual analysis of web content.
*   **Session Recording & Tracing:** For debugging.
*   **Persistent Sessions:** Between commands.
*   **Custom Chrome Profile Integration**.
*   **Headless Mode:** For server environments.
*   **Configurable Parameters:** Customize automation.
*   **Enhanced Cursor Integration:** Improved toolchain connection.

## Key Benefits

*   **Simplified Automation:** Train agents with simple commands.
*   **Powerful Web Interaction:** Leverage LLMs for navigation/analysis.
*   **Eliminates Complexity:** No need for complex automation code.
*   **Flexible LLM Choice:** Supports multiple AI providers.
*   **Debugging Tools:** Record and trace sessions easily.`,
    technologies: ['Python', 'CLI', 'Anthropic', 'OpenAI', 'Google Gemini', 'Deepseek'],
    repoUrl: 'https://github.com/drumnation/browser-use-cli',
    startDate: '2024',
    endDate: '2024',
    impact: 'Empowers Cursor users to train their AI agents to navigate, interact with, and analyze web content through simple terminal commands, eliminating the complexity of browser automation programming while enabling powerful LLM-driven web interactions.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/browser-use-cli.png',
        title: 'Browser-use CLI Terminal Interface',
        width: '100%'
      }
    ]
  },
  {
    title: 'Prompt Forge',
    category: 'Developer Tools',
    description: `# Prompt Forge

*Create, manage, and enhance AI prompts efficiently.*

## Overview

A sophisticated web application for AI prompt engineering.

Streamlines prompt crafting across different AI platforms
with an intuitive template categorization system.

## Core Features

*   **Template Management:** Drag-and-drop organization.
*   **Real-time Preview:** With dynamic field replacements.
*   **AI-Powered Enhancement:** Uses **Google**, **Anthropic**, **OpenAI**.
*   **Customizable Instructions:** By domain and purpose.
*   **Modern Interface:** Copy-to-clipboard, full-screen view.

## Key Benefits

*   **Streamlined Prompt Engineering:** Manage prompts across platforms.
*   **Maximum AI Performance:** Enhance prompts automatically.
*   **Efficient Workflow:** Template system and real-time preview.
*   **Multi-Model Support:** Optimize for various AI providers.
*   **User-Friendly:** Intuitive interface for easy crafting.`,
    technologies: ['React.js', 'ReplitAgent', 'TypeScript', 'Deepseek', 'Gemini', 'Node', 'Openai', 'PostgreSQL'],
    startDate: '2024',
    endDate: 'Present',
    showBorder: true,
    logoPath: '/media/prompt-forge-logo.png',
    repoUrl: 'https://github.com/drumnation/prompt-forge',
    impact: 'Empowers users to create, manage, and automatically enhance AI prompts across multiple platforms, streamlining the process of prompt engineering for maximum AI performance.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/prompt-forge.png',
        title: 'Prompt Forge',
        width: '100%',
        customHeight: '350px'
      },
      {
        type: 'link',
        url: 'https://prompt-forge.replit.app/',
        title: 'Prompt Forge',
        description: 'A minimalist tool for developers to craft and test LLM prompts with your own API keys. Stores frequently used prompts and securely keeps credentials in localStorage. Built for personal use but shared among developers, it focuses on functionality over user management—perfect for quick prompt experimentation.',
        buttonText: 'Try Prompt Forge',
        thumbnail: '/media/prompt-forge-logo.png',
        thumbnailWidth: '200px',
        customHeight: '200px',
        width: '100%',
      }
    ]
  },
  {
    title: 'Model Maestro',
    category: 'Developer Tools',
    description: `# Model Maestro

*Intelligently route prompts to the optimal AI model.*

## Overview

An intelligent AI model router that analyzes prompts to
recommend the best AI model for specific tasks.

Evaluates complexity, context, and needs, matching them
with detailed model profiles (**OpenAI**, **Anthropic**,
**Google**, **DeepSeek**).

## Core Features

*   **Prompt Analysis:** Evaluates task type and complexity.
*   **Intelligent Model Recommendation.**
*   **Comparative Benchmarking:** Across providers.
*   **Customizable Preferences:** Prioritize speed/cost/reliability.
*   **Visual Confidence Metrics.**
*   **Detailed Scoring Breakdowns.**
*   **Performance History Tracking.**
*   **Real-time Token Analysis.**
*   **Comprehensive Model Specifications.**

## Key Benefits

*   **Optimal Model Selection:** Consistently choose the best AI.
*   **Maximized Performance:** Optimize for cost, speed, reliability.
*   **Data-Driven Decisions:** Uses benchmarks and analysis.
*   **Customizable Routing:** Tailor recommendations to priorities.
*   **Transparency:** Detailed scoring and confidence metrics.`,
    technologies: ['React.js', 'Node', 'TypeScript', 'Openai', 'Replit Agent', 'Anthropic', 'Google AI', 'Deepseek'],
    startDate: '2024',
    endDate: '2024',
    repoUrl: 'https://github.com/drumnation/model-maestro',
    impact: 'Empowers users to consistently select the optimal AI model for their specific needs, maximizing performance while optimizing for cost, speed, and reliability.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/model-maestro4.png',
        title: 'Model Maestro Interface',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/model-maestro5.png',
        title: 'Model Comparison',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/model-maestro3.png',
        title: 'Model Performance Analysis',
        width: '100%'
      }
    ]
  },
  {
    title: 'Cursor Directory Structure TS',
    category: 'Developer Tools',
    description: `# Cursor Directory Structure TS\n\n*Automate project documentation with AI insights.*\n\n## Overview\n\nA **TypeScript** tool enhancing developer productivity by\nauto-documenting project structures and providing\n**AI-powered** insights.\n\nIntegrates with **Cursor IDE** via **\`.cursorrules\`**.\n\n## Core Features\n\n*   **Structure Documentation Automation.**\n*   **AI File/Function Descriptions:** Using **Google Gemini**.\n*   **Real-time File Monitoring & Updates.**\n*   **Automatic Project Type Detection.**\n*   **Multi-Project Support:** Dedicated documentation.\n*   **Cursor IDE Integration:** Via **\`.cursorrules\`**.\n*   **Smart Caching System:** For performance.\n*   **Customizable Ignore Patterns.**\n*   **Interactive Project Setup.**\n\n## Key Benefits\n\n*   **Streamlined Workflows:** Intelligent, self-updating docs.\n*   **Deeper Codebase Understanding:** For developers and AI.\n*   **Reduced Manual Effort:** Automates documentation.\n*   **Improved Onboarding:** Faster understanding of projects.\n*   **Enhanced AI Assistance:** Provides better context to AI tools.`,
    technologies: ['Node', 'TypeScript', 'CLI', 'Gemini'],
    startDate: '2024',
    endDate: '2024',
    logoPath: '/media/cursor.png',
    repoUrl: 'https://github.com/drumnation/cursor-directory-structure-ts',
    impact: 'Streamlines development workflows by creating intelligent, self-updating documentation that gives developers and AI assistants deeper understanding of complex codebases.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/directory-structure.png',
        title: 'Cursor Directory Structure TS',
        width: '100%'
      }
    ]
  },
  {
    title: 'AI Context Generator',
    category: 'Developer Tools',
    description: `# AI Context Generator

*Extract file trees and content to clipboard for AI context.*

## Overview

A **VSCode Extension** designed to quickly gather project
structure and file contents.

Outputs formatted text suitable for pasting into AI prompts.

## Key Features

*   **File Tree Extraction:** Generates a tree view of selected
    directories or the entire workspace.
*   **File Content Inclusion:** Option to include the content
    of selected files.
*   **Clipboard Integration:** Easily copy the generated context.

## Key Benefits

*   **Streamlined AI Prompting:** Quickly provide necessary
    project context to AI assistants.
*   **Time Saver:** Automates the process of gathering context.
*   **Improved AI Accuracy:** Ensures AI has relevant project info.`,
    technologies: ['VSCode Extension', 'Node', 'TypeScript'],
    startDate: '2024',
    endDate: 'present',
    repoUrl: 'https://github.com/drumnation/ai-context-generator',
    logoPath: 'https://drumnation.gallerycdn.vsassets.io/extensions/drumnation/ai-context-generator/0.0.10/1721423097801/Microsoft.VisualStudio.Services.Icons.Default',
    showBorder: true,
    media: [
      {
        type: 'image',
        url: 'media/screenshots/ai-context-generator/ai-context-gen.png',
        title: 'AI Context Generator Interface',
        width: '100%'
      },
      {
        type: 'image',
        url: 'media/screenshots/ai-context-generator/ai-context-gen2.png',
        title: 'File Tree Structure',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/ai-context-generator/ai-context-gen4.png',
        title: 'Code Context Generation',
        width: '48%'
      },
      {
        type: 'link',
        url: 'https://marketplace.visualstudio.com/items?itemName=drumnation.ai-context-generator',
        title: 'AI Context Generator',
        buttonText: 'VSCode Marketplace',
        description: 'Generate AI context for selected directories. Generate AI context for the root folder of your workspace. Easily copy generated context to the clipboard. Install the extension from the VSCode marketplace.',
        thumbnail: '/media/screenshots/ai-context-generator.png',
        thumbnailWidth: '200px',
        customHeight: '200px'
      },
    ],
    impact: 'Streamlined the process of providing project context to AI assistants'
  },
  {
    title: 'React Hot TS VSCode Extension Starter',
    category: 'Developer Tools',
    description: `# React Hot TS VSCode Extension Starter

*Open-source starter for React hot reloading in VS Code extensions.*

## Overview

Addresses the difficulty of enabling typical **React hot reloading**
within the **VS Code Extension** development environment.

Provides a ready-to-use solution for developers facing this
challenge.

## Key Benefit

*   **Simplified Development:** Enables standard **React** hot
    reloading for faster **VS Code extension** UI development.`,
    technologies: ['VSCode Extension', 'React.js', 'Node', 'TypeScript'],
    repoUrl: 'https://github.com/drumnation/ts-hot-react-vscode-starter',
    startDate: '2024',
    endDate: '2024',
    impact: 'Created and shared an open-source solution for a common development challenge'
  },
  {
    title: 'Code Companion',
    category: 'Developer Tools',
    description: `# Code Companion

*Streamline TypeScript unit testing with AI generation and fixing.*

## Overview

A sophisticated web application leveraging AI to
automatically generate and fix **TypeScript** unit tests.

Developed around the release of **GPT-3.5**.

## Core Features

*   **Interactive Diff Views:** For code comparison.
*   **Real-time Test Execution.**
*   **Customizable Fix Instructions.**
*   **Persistent State Management.**
*   **Monaco Code Editor Integration.**

## Key Benefits

*   **Automated Test Creation:** Generate tests automatically.
*   **AI-Powered Debugging:** Fix failing tests with AI help.
*   **Faster Development:** Build reliable software with less effort.
*   **Reduced Manual Testing:** Streamlines the testing workflow.`,
    technologies: ['React.js', 'TypeScript', 'Redux', 'OpenAI', 'Monaco Editor', 'Render.com'],
    startDate: '2023',
    endDate: '2023',
    impact: 'Revolutionizes TypeScript testing by automating the entire test creation and debugging workflow, allowing developers to build more reliable software with significantly less manual effort.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/code-helper.png',
        title: 'Interactive Test Generation Interface',
        width: '100%'
      }
    ]
  },

  // SaaS Applications
  {
    title: 'Coparenting Copilot',
    category: 'SaaS Applications',
    description: `# Coparenting Copilot

*Craft neutral, effective co-parenting communication with AI.*

## Overview

Navigate challenging emails and conversations confidently
using our **AI-driven** tool.

Helps co-parents communicate using neutral, **BIFF**
(Brief, Informative, Firm, Friendly) language.

## Core Features

*   **AI-Powered Response Generation:** Crafts replies based on
    BIFF principles.
*   **Conversation Analysis:** Understands context for better suggestions.
*   **Tone Adjustment:** Ensures neutral and effective communication.

## Key Benefits

*   **Reduce Conflict:** Promotes healthier co-parenting interactions.
*   **Save Time & Stress:** Quickly generate appropriate responses.
*   **Improve Communication:** Learn and apply BIFF techniques.
*   **Maintain Boundaries:** Craft firm yet friendly messages.`,
    technologies: ['Next.js', 'TypeScript', 'Openai', 'Supabase', 'PostgreSQL', 'Vercel'],
    startDate: '2023',
    endDate: 'Present',
    logoPath: '/media/misc/coparenting-copilot.png',
    showBorder: true,
    impact: 'Developed a SaaS application that helps co-parents communicate.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/coparenting-copilot/mobile-reply-view.png',
        title: 'Mobile Reply View',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
        description: 'The mobile reply view provides a compact, focused interface for quick responses. It allows you to quickly scan and respond to messages, while keeping the conversation context in view.',
        width: '48%'
      },
      {
        type: 'group',
        layout: 'stack',
        width: '48%',
        url: '#',
        items: [
          {
            type: 'image',
            url: 'media/screenshots/coparenting-copilot/composer-mode.png',
            title: 'Composer Mode',
            showLogo: true,
            logoHasBorderRadius: true,
            logoHasBorder: true,
          },
          {
            type: 'image',
            url: 'media/screenshots/coparenting-copilot/tools.png',
            title: 'Tools',
            showLogo: true,
            logoHasBorderRadius: true,
            logoHasBorder: true,
          },
        ]
      },
      {
        type: 'image',
        url: 'media/screenshots/coparenting-copilot/summarizer-no-padding.png',
        title: 'Summarizer',
        description: 'The summarizer provides a concise summary of the conversation, which can be used to quickly understand and respond to the main points.',
        width: '48%',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      },
      {
        type: 'image',
        url: 'media/screenshots/coparenting-copilot/email-result.png',
        title: 'Final AI Generated Email',
        description: 'The final AI generated email is displayed in a modal. It includes the AI generated email, a summary of the conversation, and a button to copy the email to the clipboard.',
        width: '48%',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      },
      {
        type: 'link',
        url: 'https://www.coparentingcopilot.com/',
        title: 'SaaS Application',
        description: 'Co-parenting comm. tool.',
        buttonText: 'Try Coparenting Copilot',
        thumbnail: '/media/misc/cc-logo.svg',
        width: '100%',
        thumbnailWidth: '700px',
        customHeight: '150px',
        showLogo: true,
        logoHasBorderRadius: true,
        logoHasBorder: true,
      }
    ]
  },
  // {
  //   title: 'Evidence Hero',
  //   category: 'SaaS Applications',
  //   description: 'Evidence and Parenting Time tracking for Family court, AI assisted summarization, categorization and RAG message search. Bringing all modes of messaging and documentation into one place (Email, SMS, Our Family Wizard).',
  //   technologies: ['React Native', 'TypeScript', 'Node', 'Express', 'Openai', 'MongoDB'],
  //   startDate: '2022',
  //   endDate: 'Present',
  //   impact: 'Created a specialized tool for organizing and analyzing family court documentation with AI assistance'
  // },
  {
    title: 'Cheddar',
    category: 'SaaS Applications',
    description: `# Cheddar

*Take control of your finances with intuitive forecasting.*

## Overview

A comprehensive personal finance management application.

Combines account management with powerful forecasting tools
to visualize upcoming financial positions based on scheduled
transactions and recurring payments.

## Core Features

*   **Account Management:** Connect banks via **Plaid integration**
    or track manually. **Real-time** balance tracking.
*   **Transaction Management:** Categorization and filtering.
*   **Smart Balance Forecasting:** Visualize future finances.
*   **Interactive Visualization:** Balance chart with color-coded
    thresholds.
*   **Transaction Scheduling:** Supports recurring payments.
*   **Financial Calendar View:** Date-based overview.

## Key Benefits

*   **Financial Confidence:** Transforms uncertainty with forecasting.
*   **Visualize Future Balance:** See upcoming cash flow patterns.
*   **Scenario Testing:** Understand impacts of financial decisions.
*   **Peace of Mind:** Gain practical financial control.
*   **Unified View:** Manage connected and manual accounts.`,
    technologies: ['React.js', 'React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Plaid API', 'Chart.js', 'Styled Components'],
    startDate: '2022',
    endDate: 'Present',
    logoPath: '/media/misc/cheddar.png',
    impact: 'Transforms financial uncertainty into confidence through intelligent forecasting that visualizes your future balance in real-time. By revealing upcoming cash flow patterns and allowing scenario testing, users gain both peace of mind and practical financial control.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar.png',
        title: 'Cheddar Dashboard with Balance Forecast',
        width: '100%',
        showLogo: true,
        description: `The Cheddar Dashboard presents a **unified view of your financial landscape** with intelligent transaction management. 

Key features include:

* **Pending Transactions** - As scheduled payments approach their due dates, they appear as "pending" in your forecast
* **Completion Tracking** - When payments clear your account, simply mark them complete—automatically updating your bank balance and moving the transaction to next month's list
* **Scenario Planning** - Toggle transactions on or off to visualize different financial outcomes, or temporarily disable items to see alternative forecasts 
* **Monthly Summary** - View key metrics including balance change, income totals, largest expenses, and total debt

This dynamic system maintains accuracy between your actual and projected finances while providing complete visibility into your financial health with minimal effort.`
      },
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar-forecast.png',
        title: 'Future Forecast Simulation',
        showLogo: true,
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar4.png',
        title: 'Edit Transaction Modal',
        showLogo: true,
        description: 'The transaction editor provides complete management of your recurring expenses and income. This powerful interface lets you specify essential details like payment amount, category, frequency, and whether a transaction repeats.',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar2.png',
        title: 'Financial Calendar & Planning',
        showLogo: true,
        width: '100%',
        description: 'The Financial Calendar & Planning section provides an interactive, multi-dimensional view of your finances across time. The color-coded calendar instantly reveals your financial status for each day—green for positive balances, yellow for warnings, and red for negative balances—with hoverable dates showing transaction previews. Complementing this, the cash flow chart tracks your balance trajectory over time using the same color system, giving you an immediate visual understanding of financial trends. Both elements function as powerful navigation tools; clicking any date or chart point automatically selects that date and scrolls to the corresponding forecast transactions in the right panel. This integrated approach transforms abstract financial data into an intuitive visual experience, allowing you to quickly identify trouble spots, plan for upcoming expenses, and understand the long-term impact of your financial decisions.'
      },
    ]
  },
  {
    title: 'Medical Supply Inc.',
    category: 'SaaS Applications',
    description: `# Medical Supply Inc.

*Implementing secure cloud infrastructure and AI solutions.*

## Overview

Implementing **Amazon CDK Infrastructure as Code (IaC)**
solutions to resolve network infrastructure issues across
multiple offices.

Working on future **AI-powered** healthcare automation systems.

## Key Focus Areas

*   **AWS CDK:** Building and managing cloud infrastructure.
*   **Network Stability:** Addressing connectivity issues.
*   **Healthcare Automation:** Developing future AI systems.

## Key Benefits (Project Goal)

*   **Secure Cloud Infrastructure:** Reliable foundation for operations.
*   **Improved Connectivity:** Stable network across locations.
*   **Future-Ready:** Preparing for AI-driven healthcare solutions.`,
    technologies: ['React.js', 'Openai', 'Node', 'Express', 'AWS CDK'],
    startDate: '2025',
    endDate: 'Present',
    impact: 'Implementing secure cloud infrastructure for a healthcare company with multiple locations and unstable connectivity'
  },
  {
    title: 'We Learn Music Together',
    category: 'SaaS Applications',
    description: `# We Learn Music Together (WLMT)

*Develop emotional intelligence through music recognition games.*

## Overview

A comprehensive educational platform using a **React Native**
mobile app with interactive games.

Teaches users to distinguish between happy and sad musical
tones across **10 progressive difficulty levels**.

## Key Features

*   **Interactive Game-Based Learning:** **10 levels** of
    increasing complexity.
*   **Comprehensive Sound Library:** Emotion-categorized audio.
*   **Progress Tracking:** Detailed performance analytics.
*   **School Management:** Institutional licensing for educators.
*   **Secure Admin Dashboard:** Manage users, schools, lessons.
*   **Role-Based Access Control:** Secure authentication.
*   **RESTful API Backend:** Fully documented for integration.

## Key Benefits

*   **Engaging Learning:** Game-based approach makes learning fun.
*   **Develops EQ:** Teaches recognition of emotional tones in music.
*   **Progressive Difficulty:** Adapts to user skill level.
*   **Trackable Progress:** Users and educators can monitor performance.
*   **Scalable:** School management system supports institutions.`,
    technologies: ['React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Web Audio API'],
    startDate: '2024',
    endDate: 'present',
    logoPath: '/media/welearn-logo.png',
    showBorder: true,
    impact: '**WLMT revolutionizes emotional intelligence education** by transforming abstract musical concepts into engaging, game-based learning experiences that help users recognize and distinguish emotional tones.',
    media: [
      {
        type: 'embed',
        url: 'https://www.youtube.com/embed/9oVfOIaMTIk?si=_Xxc1IVf3Pegp12R',
        title: 'We Learn Music Together Demo',
        description: '**Watch the interactive demo** of our emotional intelligence application in action:\n\n* See how users engage with **musical tone recognition exercises**\n* Learn about the **progressive difficulty system** that adapts to user skill\n* Discover the **intuitive interface** designed for users of all ages\n* Observe how the **real-time feedback system** reinforces learning concepts',
        width: '100%'
      }
    ]
  },

  // Digital Marketing
  {
    title: 'Oneironaught Band Marketing',
    category: 'Digital Marketing',
    description: `# Oneironaught Band Marketing

*Automated content marketing for a NYC metal band.*

## Overview

Led web development and guerilla digital marketing.

Created an **automated content marketing system** leveraging
multiple platforms (**WordPress**, **IFTTT**, **Spotify API**, **Buffer**,
social media).

## Core Features

*   **WordPress Integration:** Custom site with auto-publishing.
*   **IFTTT Automation:** Cross-platform content distribution.
*   **API Integrations:** Connected **Spotify**, **Reddit**, **Buffer**,
    social platforms.
*   **Content Recycling:** Automated repurposing of music content.
*   **Analytics Dashboard:** Custom tracking for performance.

## Key Results & Benefits

*   **Massive Growth:** Grew Twitter to **14,600 followers**.
*   **High Engagement:** Achieved **385K monthly impressions**.
*   **SEO Success:** Reached **#1 Google ranking** for target keywords.
*   **Automation Efficiency:** Reduced manual marketing effort.
*   **Wide Reach:** Distributed content across multiple channels.`,
    technologies: ['WordPress', 'IFTTT', 'Spotify API', 'Buffer', "Facebook", "Instagram", "Twitter", "YouTube", "Pinterest"],
    startDate: '2013',
    endDate: '2016',
    impact: '**Grew Twitter following to 14,600** with 385K monthly impressions and achieved **#1 Google ranking** for target keywords',
    logoPath: '/media/misc/oneironaught-logo.jpg',
    media: [
      {
        type: 'embed',
        url: 'https://www.youtube.com/embed/I9ua6m65MmQ?si=vH0FFDb7txrYD1Ej',
        title: 'Oneironaught Band Performance',
        width: '100%',
        height: 400
      },
      {
        type: 'embed',
        url: 'https://www.youtube.com/embed/OfeE14y4CEU?si=O7ytI8_g5SBTibG0',
        title: 'Enlist Today! Album Launch',
        width: '48%',
        height: 400
      },
      {
        type: 'image',
        url: '/media/photo/oneironaught.jpg',
        title: 'Automated Content Marketing Website',
        width: '48%'
      },
      {
        type: 'link',
        url: 'https://medium.com/@davidmieloch/how-i-automated-my-bands-music-blog-including-content-creation-740741bbb23f',
        title: 'How I Automated My Band\'s Music Blog Including Content Creation',
        description: '**Read about my guerilla marketing experiment:** This article details my journey developing an automated content marketing system that helped our band grow from unknown to having thousands of followers.\n\n* How I used **IFTTT automations** to connect platforms\n* Creating a **content recycling system** for maximum reach\n* Setting up **API integrations** for seamless delivery\n* Measuring results with **custom analytics**',
        thumbnail: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*iO4AGAfTaXzDQryDkwVeaA.jpeg',
        width: '100%',
        buttonText: 'Read My Post',
        customHeight: '320px',
        thumbnailWidth: '450px'
      },
    ]
  }
];