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
    description: 'An AI-powered desktop application that enhances the gaming experience by providing real-time analysis and commentary. Features include:\n\n* **Real-time AI gameplay analysis** through automatic screenshot capture\n* **Multiple analysis modes** (tactical advice, professional commentary, e-sports casting)\n* **Global hotkeys** for instant capture during gameplay\n* **Multi-monitor support** with selective display options\n* **Context-aware responses** that maintain gameplay history\n* **Scene change detection** to identify key gameplay moments',
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
    description: 'A comprehensive platform for creating personalized hypnotherapy experiences. The system features AI-assisted script generation with multi-section hypnosis scripts (induction, deepener, therapeutic content, emergence), text-to-speech conversion using SSML for natural voice output, integrated binaural beats generation for enhanced hypnotic effects, and a template system for quick customization. Users can manage client information for personalized scripts, save sessions for future reference, and download or stream the complete audio experience.',
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
    description: 'An intelligent mobile application that helps parents stay organized and on top of their children\'s educational journey. Using advanced AI, the app automatically processes information from school emails, scanned documents, and uploaded media to create actionable items, track important events, and document progress. Features include child profile management for multiple children, AI-powered email and document processing with OCR for digitizing physical papers, automatic categorization of information into action items and events, calendar integration for school events, progress tracking for academic achievements and developmental milestones, media gallery for storing children\'s artwork, and an automated notification system with scheduled email reports.',
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
    description: 'A comprehensive web application that empowers users to create fully-voiced audiobooks through an intuitive interface. It combines AI-powered script generation with advanced text-to-speech technology, allowing storytellers to focus on developing rich narratives and characters while automating the technical aspects of audiobook production.\n\n## Key Features\n\n* **Story management** with chapter organization\n* **Character creation** with customizable attributes (personality, appearance, background)\n* **AI-powered script generation** using OpenAI\'s GPT models\n* **Voice customization** for characters and narrators\n* **Text-to-speech conversion** using advanced voice APIs\n* **Script version history**\n* **Plot mapping** with relationship visualization\n* **Multi-voice compilation** for complete audiobooks',
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
    description: 'A personal development system that creates a customized self-help audiobook by feeding vast amounts of personal data into AI models. The system ingests personal content (blog posts, LinkedIn profiles, project overviews, video comments, music page data, and professional testimonials) and uses meta-prompting to generate personalized guidance. The TypeScript processing pipeline compares responses from ChatGPT and Gemini across 11 strategic archetypes, transforming the content into a structured audiobook exploring career, future planning, and ethics. The output is enhanced through voice cloning technology to create a self-narrated experience, with specialized transformers ensuring technical content is preserved and properly formatted for natural speech delivery.',
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
    description: 'A comprehensive web application designed for music professionals to review, annotate, and manage audio tracks. Features include advanced audio waveform visualization with zoom functionality, precise audio playback controls, BPM detection and modification, time-based commenting system, track metadata management, responsive layout with resizable components, real-time waveform navigation, volume control with visual feedback, dynamic comment display tied to playback position, AI-powered comment generation through OpenAI integration, interactive keyboard shortcuts, and support for various audio file formats.',
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
    description: 'AI-Brain-Garden is a command line tool designed to revolutionize software development by creating project-specific "Brains," structured knowledge bases that integrate templates, rules, and AI agents.\n\n## Key Features\n\n* **Context-aware assistance** - Provides AI help that understands your specific project\n* **Customizable agents** - Configure specialized AI helpers for different tasks\n* **Integrated task management** - Track and prioritize development activities\n* **Dynamic cursorrules** - Automatically enforces coding standards\n* **Atomic design for prompts** - Creates reusable, modular AI instructions\n\nBy addressing the inefficiencies of current AI tools, it offers a unique, highly customizable solution for developers and project managers seeking to streamline workflows and improve project outcomes.',
    technologies: ['Node', 'TypeScript', 'Gemini', 'CLI'],
    startDate: '2024',
    endDate: 'Present',
    logoPath: '/media/misc/brain-garden.png',
    impact: '**Created a framework** that enhances structure for Enterprise AI-assisted development workflows'
  },
  {
    title: 'Code Relay',
    category: 'Developer Tools',
    description: 'An innovative system that bridges the gap between mobile devices and development environments, allowing developers to remotely control VS Code from their phones or tablets. The project consists of a VS Code extension that acts as a server and a React Native mobile app as the client, communicating via WebSockets. Code Relay enables execution of VS Code commands, provides access to installed extensions, and features deep integration with AI coding assistants like Roo Code and Copilot, all while away from your computer.',
    technologies: ['React Native', 'VS Code Extension', 'WebSockets', 'TypeScript', 'AI Integration'],
    startDate: '2025',
    endDate: 'Present',
    impact: 'Empowers developers to stay productive by providing seamless mobile access to their VS Code environment and AI coding assistants from anywhere.',
  },
  {
    title: 'Browser-use CLI (FORK)',
    category: 'Developer Tools',
    description: 'A powerful terminal-based interface that enables developers to train AI agents to perform browser automation tasks through natural language commands. Features include terminal-based browser automation via natural language, multi-provider LLM support (Anthropic, OpenAI, Google Gemini, DeepSeek), vision-capable browser interaction for visual analysis, session recording and tracing for debugging, persistent browser sessions between commands, custom Chrome profile integration, headless mode for server environments, configurable automation parameters, and enhanced toolchain integration for Cursor.',
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
    description: 'A sophisticated web application designed for AI prompt engineering, allowing users to create, manage, and enhance prompts for various AI language models. Features include a comprehensive template management system with drag-and-drop organization, real-time prompt preview with dynamic field replacements, AI-powered prompt enhancement using multiple models (Google, Anthropic, OpenAI), customizable enhancement instructions by domain and purpose, and a modern interface with copy-to-clipboard functionality and full-screen viewing. The platform streamlines prompt crafting across different AI platforms with an intuitive template categorization system.',
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
    description: 'An intelligent AI model router that analyzes user prompts to recommend the optimal AI model for specific tasks. It evaluates prompt complexity, context requirements, and special needs, then matches these with detailed profiles of models from providers like OpenAI, Anthropic, Google, and DeepSeek. Features include prompt analysis that evaluates task type and complexity, intelligent model recommendation, comparative benchmarking across providers, customizable preferences for prioritizing speed/cost/reliability, visual confidence metrics, detailed scoring breakdowns, performance history tracking, real-time token analysis, and comprehensive model specifications.',
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
    description: 'A TypeScript tool that enhances developer productivity by automatically documenting project structures and providing AI-powered insights. Features include project structure documentation automation, AI-powered file and function descriptions using Google Gemini, real-time file monitoring and updates, automatic project type detection, multi-project support with dedicated documentation, Cursor IDE integration via .cursorrules, smart caching system for performance optimization, customizable ignore patterns, and interactive project setup.',
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
    description: 'Extracts a file tree and files into your clipboard to feed AI context.',
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
    description: 'I found it difficult to get typical hot reloading with React to work with a vscode extension so I decided to open source my solution.',
    technologies: ['VSCode Extension', 'React.js', 'Node', 'TypeScript'],
    repoUrl: 'https://github.com/drumnation/ts-hot-react-vscode-starter',
    startDate: '2024',
    endDate: '2024',
    impact: 'Created and shared an open-source solution for a common development challenge'
  },
  {
    title: 'Code Companion',
    category: 'Developer Tools',
    description: 'A sophisticated web application that streamlines TypeScript unit testing by leveraging AI to automatically generate and fix tests. Features include interactive diff views for code comparison, real-time test execution, customizable fix instructions, persistent state management, and Monaco code editor integration. Developed around the time GPT-3.5 was released to the public.',
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
    description: 'Navigate challenging emails and conversations with confidence using our AI-driven tool. Craft the perfect response every time. Coparenting Copilot is a tool that helps co-parents communicate using neutral brief, informative, firm, and friendly language (BIFF).',
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
    description: 'Cheddar is a comprehensive personal finance management application that empowers users to take control of their financial future. The platform combines intuitive account management with powerful forecasting tools that visualize upcoming financial positions based on scheduled transactions and recurring payments. Users can connect their existing bank accounts through Plaid integration or manually track accounts, while the interactive balance chart provides immediate visual feedback on financial health with color-coded thresholds. Key features include financial account management with real-time balance tracking, transaction categorization and filtering, smart balance forecasting, interactive visualization, transaction scheduling with recurring payment support, and a date-based financial calendar view.',
    technologies: ['React.js', 'React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Plaid API', 'Chart.js', 'Styled Components', 'Date-fns'],
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
    description: 'Implementing Amazon CDK Infrastructure as code solutions to help fix network infrastructure problems across multiple offices. Working on future AI-powered healthcare automation systems.',
    technologies: ['React.js', 'Openai', 'Node', 'Express', 'AWS CDK'],
    startDate: '2025',
    endDate: 'Present',
    impact: 'Implementing secure cloud infrastructure for a healthcare company with multiple locations and unstable connectivity'
  },
  {
    title: 'We Learn Music Together',
    category: 'SaaS Applications',
    description: 'WLMT (We Learn Music Together) is a comprehensive educational platform designed to help users develop emotional intelligence through music recognition. The system consists of a React Native mobile application that delivers interactive games teaching users to distinguish between happy and sad musical tones across progressive difficulty levels.\n\n## Key Features\n\n* **Interactive Game-Based Learning** - 10 educational levels with increasing complexity\n* **Comprehensive Sound Library** - Emotion-categorized audio assets \n* **Progress Tracking** - Detailed performance analytics for users\n* **School Management** - Institutional licensing system for educators\n* **Secure Admin Dashboard** - Tools for managing users, schools, and lessons\n* **Role-Based Access Control** - Secure authentication system\n* **RESTful API Backend** - Complete documentation for integration',
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
    description: 'Led web development and guerilla digital marketing for NYC instrumental progressive metal band. Created an **automated content marketing system** leveraging multiple platforms:\n\n* **WordPress Integration** - Custom website with automated content publishing\n* **IFTTT Automation** - Cross-platform content distribution triggers\n* **API Integrations** - Connected with Spotify, Reddit, Buffer, and social platforms\n* **Content Recycling** - Automated repurposing of music content across channels\n* **Analytics Dashboard** - Custom tracking for campaign performance',
    technologies: ['WordPress', 'IFTTT', 'Spotify API', 'Reddit API', 'Buffer', "Facebook", "Instagram", "Twitter", "YouTube", "Pinterest"],
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
        customHeight: '160px',
        thumbnailWidth: '350px'
      },
    ]
  }
];