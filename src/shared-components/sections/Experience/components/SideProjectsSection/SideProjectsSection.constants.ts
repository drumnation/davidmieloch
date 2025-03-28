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
    description: 'Select a game, select a commentary type (instructional, narration, esports), select on demand commentary or automatic, game sage speaks advice or narrates videos games by analyzing screenshots of gameplay infused by dynamic skill-jacks training the AI with context for any game you are playing.',
    technologies: ['Electron', 'React.js', 'Openai', 'TypeScript'],
    startDate: '2024',
    endDate: '2024',
    repoUrl: 'https://github.com/drumnation/game-sage',
    impact: 'Created an AI-powered gaming assistant that provides real-time gameplay analysis and narration',
  },
  {
    title: 'AI Hypnosis Script Generator',
    category: 'Personal Innovation Lab',
    description: 'Generate personalized hypnosis scripts in a multi-stage process customized to your name and needs, then read to you by AI, with integrated binaural beats generator and relaxing AI generated music.',
    technologies: ['React.js', 'Openai'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Combined AI script generation with audio technology to create personalized wellness experiences',
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
    description: 'A music project management system for music licensing. Built for effective collaboration between artists and music producers, features region based commenting, meta data tagging and editing, bpm detection and modification.',
    technologies: ['React.js', 'Render.com'],
    startDate: '2024',
    endDate: '2024',
    logoPath: 'media/screenshots/mpm-logo-crop.png',
    showBorder: true,
    repoUrl: 'https://github.com/drumnation/mpm',
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
    description: 'My open source fork of the browser-use library that adds a comprehensive set of command line functionality and tool documentation to allow a central agent to use a browser-use browser agent as a tool for frontend testing.',
    technologies: ['Python', 'CLI', 'Deepseek', 'Gemini', 'Openai', 'Anthropic'],
    repoUrl: 'https://github.com/yourusername/browser-use-cli',
    startDate: '2025',
    endDate: '2025',
    impact: 'Enhanced an open source library to enable AI-powered browser automation with natural language controls'
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
        width: '100%'
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
    impact: 'Developed a tool that matches prompts with optimal AI models for improved results',
  },
  {
    title: 'Cursor Directory Structure TS',
    category: 'Developer Tools',
    description: 'Extracts a file tree and AI generated descriptions into your .brain folder to provide context to AI coding systems.',
    technologies: ['Node', 'TypeScript', 'CLI', 'Gemini'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Enhanced AI coding assistance by automatically generating contextual project information'
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
        thumbnail: 'media/screenshots/ai-context-generator.png'
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
        width: '100%'
      },
      {
        type: 'image',
        url: 'media/screenshots/coparenting-copilot/email-result.png',
        title: 'Final AI Generated Email',
        width: '100%'
      },
      {
        type: 'link',
        url: 'https://www.coparentingcopilot.com/',
        // title: 'Coparenting Copilot',
        buttonText: 'Try Coparenting Copilot',
        thumbnail: 'media/misc/cc-logo.svg',
        width: '100%'
      }
    ]
  },
  {
    title: 'Evidence Hero',
    category: 'SaaS Applications',
    description: 'Evidence and Parenting Time tracking for Family court, AI assisted summarization, categorization and RAG message search. Bringing all modes of messaging and documentation into one place (Email, SMS, Our Family Wizard).',
    technologies: ['React Native', 'TypeScript', 'Node', 'Express', 'Openai', 'MongoDB'],
    startDate: '2022',
    endDate: 'Present',
    impact: 'Created a specialized tool for organizing and analyzing family court documentation with AI assistance'
  },
  {
    title: 'Stacks Track',
    category: 'SaaS Applications',
    description: 'Balance Forecasting for Personal Finance: Plan your financial future.',
    technologies: ['React.js','React Native', 'TypeScript', 'Node', 'Express', 'MongoDB'],
    startDate: '2022',
    endDate: 'Present',
    impact: 'Developed a personal finance application focused on predictive modeling and budget planning'
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
        width: 'full',
        height: 400
      },
      {
        type: 'embed',
        url: 'https://www.youtube.com/embed/OfeE14y4CEU?si=O7ytI8_g5SBTibG0',
        title: 'Enlist Today! Album Launch',
        width: 'full',
        height: 400
      },
      {
        type: 'image',
        url: '/media/photo/oneironaught.jpg',
        title: 'Automated Content Marketing Website',
      },
      {
        type: 'link',
        url: 'https://medium.com/@davidmieloch/how-i-automated-my-bands-music-blog-including-content-creation-740741bbb23f',
        title: 'How I Automated My Band\'s Music Blog Including Content Creation',
        thumbnail: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*iO4AGAfTaXzDQryDkwVeaA.jpeg',
        width: 'full'
      },
    ]
  }
];