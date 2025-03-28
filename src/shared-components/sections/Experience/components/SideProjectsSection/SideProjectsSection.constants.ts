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
    description: 'An AI-powered desktop application that enhances the gaming experience by providing real-time analysis and commentary. Features include real-time AI gameplay analysis through automatic screenshot capture, multiple analysis modes (tactical advice, professional commentary, e-sports casting), global hotkeys for instant capture during gameplay, multi-monitor support with selective display options, context-aware responses that maintain gameplay history, and scene change detection to identify key gameplay moments.',
    technologies: ['Electron', 'React.js', 'TypeScript', 'OpenAI Vision API'],
    startDate: '2024',
    endDate: '2024',
    repoUrl: 'https://github.com/drumnation/game-sage',
    impact: 'Transforms gaming experiences by delivering AI-powered real-time analysis and commentary that helps players improve their skills while adding a new dimension of entertainment.',
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
    impact: 'Combined AI script generation with audio technology to create personalized wellness experiences. The project has helped users address issues ranging from anxiety and stress management to confidence building and sleep improvement through accessible self-hypnosis.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp1.png',
        title: 'Welcome Dashboard',
        width: '100%'
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp3.png',
        title: 'Script Generation Interface',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp5.png',
        title: 'Script Editor View',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp7.png',
        title: 'Audio Playback Controls',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/hypnosis/hyp12.png',
        title: 'Session History',
        width: '48%'
      }
    ]
  },
  {
    title: 'Parenting Pilot',
    category: 'Personal Innovation Lab',
    description: 'A platform that consumes all my parenting emails and data, performs OCR, stores data in a database, creates vector embeddings, and creates a RAG knowledge base with everything I need to know as a parent. A mobile app for scanning in physical papers, viewing AI generated task lists, Events, and Insights about what the kids are learning based on handouts, artwork, and other media.',
    technologies: ['React Native', 'Node', 'TypeScript', 'Openai'],
    startDate: '2024',
    endDate: 'Present',
    impact: 'Developed a comprehensive AI-powered system to organize and make sense of parenting-related information'
  },
  {
    title: 'StoryTime',
    category: 'Personal Innovation Lab',
    description: 'AI Audiobook Creator: Multi-character stories brought to life with AI voices and voice clones.',
    technologies: ['Next.js', 'Openai'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Created an automated platform for generating engaging multi-voice audiobooks from text'
  },
  {
    title: 'Life Guidance AI',
    category: 'Personal Innovation Lab',
    description: 'A self-help book customized to my life, a 2 hour audiobook read by my voice clone.',
    technologies: ['TypeScript', 'Speechify', 'Openai', 'Gemini'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Pioneered a personalized approach to self-help content using AI customization and voice clone technology'
  },
  {
    title: 'Music Project Management System for Music Licensing',
    category: 'Personal Innovation Lab',
    description: 'A comprehensive web application designed for music professionals to review, annotate, and manage audio tracks. Features include advanced audio waveform visualization with zoom functionality, precise audio playback controls, BPM detection and modification, time-based commenting system, track metadata management, responsive layout with resizable components, real-time waveform navigation, volume control with visual feedback, dynamic comment display tied to playback position, AI-powered comment generation through OpenAI integration, interactive keyboard shortcuts, and support for various audio file formats.',
    technologies: ['React.js', 'TypeScript', 'WaveSurfer.js', 'OpenAI', 'Render.com'],
    startDate: '2024',
    endDate: '2024',
    logoPath: 'media/screenshots/mpm-logo-crop.png',
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
        thumbnail: 'media/misc/render.png',
        thumbnailWidth: '240px',
        width: '100%'
      }
    ]
  },
  // Developer Tools
  {
    title: 'AI Brain Garden',
    category: 'Developer Tools',
    description: 'AI-Brain-Garden is a command line tool designed to revolutionize software development by creating project-specific "Brains," structured knowledge bases that integrate templates, rules, and AI agents. It addresses the inefficiencies of current AI tools by providing context-aware assistance, customizable agents, and an integrated task management system, enhancing productivity, code quality, and collaboration. By leveraging dynamic cursorrules and atomic design principles for prompts, it offers a unique, highly customizable solution for developers and project managers seeking to streamline workflows and improve project outcomes.',
    technologies: ['Node', 'TypeScript', 'Gemini', 'CLI'],
    startDate: '2024',
    endDate: 'Present',
    logoPath: 'media/misc/brain-garden.png',
    impact: 'Created a framework that enhances AI-assisted development workflows for multiple IDE environments'
  },
  {
    title: 'Code Relay',
    category: 'Developer Tools',
    description: 'A mobile application that serves as a remote control for AI Assisted IDEs, allowing for Prompt Driven Development (PDD) on the go.',
    technologies: ['VSCode Extension', 'React Native'],
    startDate: '2025',
    endDate: 'Present',
    impact: 'Pioneered mobile-first AI development tools enabling coding productivity anywhere'
  },
  {
    title: 'Browser-use CLI (FORK)',
    category: 'Developer Tools',
    description: 'A powerful terminal-based interface that enables developers to train AI agents to perform browser automation tasks through natural language commands. Features include terminal-based browser automation via natural language, multi-provider LLM support (Anthropic, OpenAI, Google Gemini, DeepSeek), vision-capable browser interaction for visual analysis, session recording and tracing for debugging, persistent browser sessions between commands, custom Chrome profile integration, headless mode for server environments, configurable automation parameters, and enhanced toolchain integration for Cursor.',
    technologies: ['Python', 'CLI', 'Anthropic', 'OpenAI', 'Google Gemini', 'DeepSeek'],
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
    description: 'Store and categorize prompts, create prompt templates to avoid repetitive typing, use AI to enhance prompts.',
    technologies: ['React.js', 'ReplitAgent', 'TypeScript', 'Deepseek', 'Gemini', 'Node', 'Openai', 'PostgreSQL', ],
    startDate: '2024',
    endDate: 'Present',
    impact: 'Created a productivity tool that optimizes AI prompt management and reuse',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/prompt-forge.png',
        title: 'Prompt Forge',
        width: '100%',
        customHeight: '350px'
      }
    ]
  },
  {
    title: 'Model Maestro',
    category: 'Developer Tools',
    description: 'App that tries to determine the best model for any given prompt.',
    technologies: ['React.js', 'Node', 'TypeScript', 'Openai', 'Replit Agent'],
    startDate: '2024',
    endDate: '2024',
    repoUrl: 'https://github.com/drumnation/model-maestro',
    impact: 'Developed a tool that matches prompts with optimal AI models for improved results',
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
        type: 'link',
        url: 'https://marketplace.visualstudio.com/items?itemName=drumnation.ai-context-generator',
        title: 'AI Context Generator',
        buttonText: 'VSCode Marketplace',
        description: 'Generate AI context for selected directories. Generate AI context for the root folder of your workspace. Easily copy generated context to the clipboard. Install the extension from the VSCode marketplace.',
        thumbnail: 'media/screenshots/ai-context-generator.png',
        thumbnailWidth: '200px',
        customHeight: '200px'
      }
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
    description: 'AI Unit Test Writer: Generates full coverage unit tests and runs them in the browser.',
    technologies: ['React.js', 'TypeScript', 'Openai', 'Render.com'],
    startDate: '2023',
    endDate: '2023',
    impact: 'Automated the creation of comprehensive unit tests to improve code quality',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/code-helper.png',
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
    logoPath: 'media/misc/coparenting-copilot.png',
    showBorder: true,
    impact: 'Developed a SaaS application that helps co-parents communicate.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/coparenting-copilot/mobile-reply-view.png',
        title: 'Mobile Reply View',
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
          },
          {
            type: 'image',
            url: 'media/screenshots/coparenting-copilot/tools.png',
            title: 'Tools',
          },
        ]
      },
      {
        type: 'image',
        url: 'media/screenshots/coparenting-copilot/summarizer-no-padding.png',
        title: 'Summarizer',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/coparenting-copilot/email-result.png',
        title: 'Final AI Generated Email',
        width: '48%'
      },
      {
        type: 'link',
        url: 'https://www.coparentingcopilot.com/',
        // title: 'Coparenting Copilot',
        buttonText: 'Try Coparenting Copilot',
        thumbnail: 'media/misc/cc-logo.svg',
        width: '100%',
        thumbnailWidth: '700px',
        customHeight: '150px'
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
    logoPath: 'media/misc/cheddar.png',
    impact: 'Transformed financial anxiety into confidence by combining transaction tracking with intelligent forecasting that helps users visualize and plan their financial future with clarity and precision. The application enables users to make informed decisions by simulating different financial scenarios, providing clear visualization of spending patterns, and offering projections months into the future.',
    media: [
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar.png',
        title: 'Cheddar Dashboard with Balance Forecast',
        width: '100%'
      },
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar-forecast.png',
        title: 'Future Forecast Simulation',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar4.png',
        title: 'Financial Calendar & Planning',
        width: '48%'
      },
      {
        type: 'image',
        url: 'media/screenshots/cheddar/cheddar2.png',
        title: 'Transaction Management View',
        width: '100%'
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
    description: 'Mobile Game + SaaS Platform: Teaches toddlers Music Theory.',
    technologies: ['React Native', 'React.js', 'TypeScript', 'Node', 'Express', 'MongoDB'],
    startDate: '2024',
    endDate: '2025',
    impact: 'Created an educational platform that makes music theory accessible to young children'
  },
  
  // Digital Marketing
  {
    title: 'Oneironaught Band Marketing',
    category: 'Digital Marketing',
    description: 'Led web development and guerilla digital marketing for NYC instrumental progressive metal band. Implemented automated content marketing system using IFTTT, Wordpress, and API integrations.',
    technologies: ['WordPress', 'IFTTT', 'Spotify API', 'Reddit API', 'Buffer', "Facebook", "Instagram", "Twitter", "YouTube", "Pinterest"],
    startDate: '2013',
    endDate: '2016',
    impact: 'Grew Twitter following to 14,600 with 385K monthly impressions and achieved #1 Google ranking for target keywords',
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
        description: 'This article details my journey, the tools I used, and the lessons learned from this experiment in fully automated digital marketing.',
        thumbnail: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*iO4AGAfTaXzDQryDkwVeaA.jpeg',
        width: '100%',
        buttonText: 'Read My Post',
        customHeight: '160px',
        thumbnailWidth: '350px'
      },
    ]
  }
];