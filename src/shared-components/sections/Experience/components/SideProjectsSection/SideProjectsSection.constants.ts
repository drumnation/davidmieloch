import { ProjectCategory, SideProject } from './SideProjectsSection.types';

export const SECTION_TITLE = 'Side Projects with Impact';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Personal Innovation Lab',
  'Developer Tools',
  'SaaS Applications',
  'Moonlight Projects',
  'Digital Marketing'
];

export const SIDE_PROJECTS: SideProject[] = [
  // Personal Innovation Lab
  {
    title: 'Game Sage',
    category: 'Personal Innovation Lab',
    description: 'Select a game, select a commentary type (instructional, narration, esports), select on demand commentary or automatic, game sage speaks advice or narrates videos games by analyzing screenshots of gameplay infused by dynamic skill-jacks training the AI with context for any game you are playing.',
    technologies: ['Electron', 'React'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Created an AI-powered gaming assistant that provides real-time gameplay analysis and narration'
  },
  {
    title: 'AI Hypnosis Script Generator',
    category: 'Personal Innovation Lab',
    description: 'Generate personalized hypnosis scripts in a multi-stage process customized to your name and needs, then read to you by AI, with integrated binaural beats generator and relaxing AI generated music.',
    technologies: ['React.js'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Combined AI script generation with audio technology to create personalized wellness experiences'
  },
  {
    title: 'Parenting Pilot',
    category: 'Personal Innovation Lab',
    description: 'A platform that consumes all my parenting emails and data, performs OCR, stores data in a database, creates vector embeddings, and creates a RAG knowledge base with everything I need to know as a parent. A mobile app for scanning in physical papers, viewing AI generated task lists, Events, and Insights about what the kids are learning based on handouts, artwork, and other media.',
    technologies: ['Node', 'TypeScript', 'React Native'],
    startDate: '2024',
    endDate: 'Present',
    impact: 'Developed a comprehensive AI-powered system to organize and make sense of parenting-related information'
  },
  {
    title: 'StoryTime',
    category: 'Personal Innovation Lab',
    description: 'AI Audiobook Creator: Multi-character stories brought to life with AI voices and voice clones.',
    technologies: ['Next.js'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Created an automated platform for generating engaging multi-voice audiobooks from text'
  },
  {
    title: 'Life Guidance AI',
    category: 'Personal Innovation Lab',
    description: 'A self-help book customized to my life, a 2 hour audiobook read by my voice clone.',
    technologies: ['TypeScript', 'Speechify'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Pioneered a personalized approach to self-help content using AI customization and voice clone technology'
  },
  
  // Developer Tools
  {
    title: 'AI Brain Garden',
    category: 'Developer Tools',
    description: 'A command line framework that provides structure, prompts, and developer tools for AI assisted development IDEs.',
    technologies: ['Node', 'TypeScript'],
    startDate: '2024',
    endDate: 'Present',
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
    technologies: ['Python', 'CLI'],
    repoUrl: 'https://github.com/yourusername/browser-use-cli',
    startDate: '2025',
    endDate: '2025',
    impact: 'Enhanced an open source library to enable AI-powered browser automation with natural language controls'
  },
  {
    title: 'Prompt Forge',
    category: 'Developer Tools',
    description: 'Store and categorize prompts, create prompt templates to avoid repetitive typing, use AI to enhance prompts.',
    technologies: ['Node', 'TypeScript', 'React', 'Replit Agent'],
    startDate: '2024',
    endDate: 'Present',
    impact: 'Created a productivity tool that optimizes AI prompt management and reuse'
  },
  {
    title: 'Model Maestro',
    category: 'Developer Tools',
    description: 'App that tries to determine the best model for any given prompt.',
    technologies: ['Node', 'TypeScript', 'React', 'Replit Agent'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Developed a tool that matches prompts with optimal AI models for improved results'
  },
  {
    title: 'Cursor Directory Structure TS',
    category: 'Developer Tools',
    description: 'Extracts a file tree and AI generated descriptions into your .brain folder to provide context to AI coding systems.',
    technologies: ['Node', 'TypeScript', 'CLI'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Enhanced AI coding assistance by automatically generating contextual project information'
  },
  {
    title: 'AI Context Generator',
    category: 'Developer Tools',
    description: 'Extracts a file tree and files into your clipboard to feed AI context.',
    technologies: ['VSCode Extension'],
    startDate: '2024',
    endDate: '2024',
    impact: 'Streamlined the process of providing project context to AI assistants'
  },
  {
    title: 'React Hot TS VSCode Extension Starter',
    category: 'Developer Tools',
    description: 'I found it difficult to get typical hot reloading with React to work with a vscode extension so I decided to open source my solution.',
    technologies: ['VSCode Extension', 'React'],
    repoUrl: 'https://github.com/yourusername/react-hot-vscode-starter',
    startDate: '2024',
    endDate: '2024',
    impact: 'Created and shared an open-source solution for a common development challenge'
  },
  {
    title: 'Code Companion',
    category: 'Developer Tools',
    description: 'AI Unit Test Writer: Generates full coverage unit tests and runs them in the browser.',
    technologies: ['React'],
    startDate: '2023',
    endDate: '2023',
    impact: 'Automated the creation of comprehensive unit tests to improve code quality'
  },
  
  // SaaS Applications
  {
    title: 'Coparenting Copilot',
    category: 'SaaS Applications',
    description: 'Extracts a file tree and files into your clipboard to feed AI context.',
    technologies: ['Next.js', 'OpenAI'],
    startDate: '2023',
    endDate: 'Present',
    impact: 'Developed a SaaS application that helps co-parents communicate and organize shared responsibilities'
  },
  {
    title: 'Evidence Hero',
    category: 'SaaS Applications',
    description: 'Evidence and Parenting Time tracking for Family court, AI assisted summarization, categorization and RAG message search. Bringing all modes of messaging and documentation into one place (Email, SMS, Our Family Wizard).',
    technologies: ['React Native', 'TypeScript', 'Node', 'Express'],
    startDate: '2022',
    endDate: 'Present',
    impact: 'Created a specialized tool for organizing and analyzing family court documentation with AI assistance'
  },
  {
    title: 'Cheddar',
    category: 'SaaS Applications',
    description: 'Balance Forecasting for Personal Finance: Plan your financial future.',
    technologies: ['React Native', 'TypeScript', 'Node', 'Express'],
    startDate: '2022',
    endDate: 'Present',
    impact: 'Developed a personal finance application focused on predictive modeling and budget planning'
  },
  
  // Moonlight Projects
  {
    title: 'Medical Supply Inc.',
    category: 'Moonlight Projects',
    description: 'Implementing Amazon CDK Infrastructure as code solutions to help fix network infrastructure problems across multiple offices. Working on future AI-powered healthcare automation systems.',
    technologies: ['React', 'Node', 'Express', 'AWS CDK'],
    startDate: '2025',
    endDate: 'Present',
    impact: 'Implementing secure cloud infrastructure for a healthcare company with multiple locations and unstable connectivity'
  },
  {
    title: 'We Learn Music Together',
    category: 'Moonlight Projects',
    description: 'Mobile Game + SaaS Platform: Teaches toddlers Music Theory.',
    technologies: ['React Native', 'Next.js'],
    startDate: '2024',
    endDate: '2025',
    impact: 'Created an educational platform that makes music theory accessible to young children'
  },
  
  // Digital Marketing
  {
    title: 'Oneironaught Band Marketing',
    category: 'Digital Marketing',
    description: 'Led web development and guerilla digital marketing for NYC instrumental progressive metal band. Implemented automated content marketing system using IFTTT, Wordpress, and API integrations.',
    technologies: ['WordPress', 'IFTTT', 'Spotify API', 'Reddit API', 'Buffer'],
    startDate: '2013',
    endDate: '2016',
    impact: 'Grew Twitter following to 14,600 with 385K monthly impressions and achieved #1 Google ranking for target keywords',
    media: [
      {
        type: 'video',
        url: 'https://youtube.com/oneironaught-performance',
        title: 'Oneironaught Live Performance',
        thumbnail: '/media/projects/oneironaught-thumb.jpg'
      },
      {
        type: 'image',
        url: '/media/projects/oneironaught-website.png',
        title: 'Automated Content Marketing Website',
        thumbnail: '/media/projects/oneironaught-website-thumb.jpg'
      }
    ]
  }
];