// Default content for the component
export const defaultContent = {
  hero: {
    title: "The Brain Garden System",
    subtitle: "A Revolutionary Approach to AI Integration",
    background: "image" as const,
    backgroundImage: "/brain-garden.png",
    backgroundOverlay: false,
    overlayOpacity: 0,
    pattern: "dots" as const,
    textColor: "light" as const,
    animation: "fade-up" as const,
    className: 'custom-hero-bg',
  },
  intro: {
    text: "Expanding on the autopilot analogy, the AI Brain Garden isn't a magical solution—it's a practical, evolving system of documentation techniques and structural approaches I've developed to enhance AI's capabilities in development workflows. Through years of working with React and Node.js teams, I've created a framework that provides structure, focus, and contextual knowledge that makes AI agents smarter and more effective. Unlike using raw AI without structure, this system reduces cognitive load by providing systematic approaches to common development challenges, allowing you to leverage AI more effectively while maintaining control of architecture and quality.",
    icon: "brain-garden"
  },
  coreComponents: {
    features: [
      {
        title: "Skill Jack System",
        description: "Living documentation with Skill-Jacks that prime agents with specialized expertise",
        icon: "brain",
        link: "./knowledge-management"
      },
      {
        title: "Prompt System",
        description: "Optimized action prompts that guide agents through complex workflows",
        icon: "message-square",
        link: "./core-teams"
      },
      {
        title: "Structured Documentation",
        description: "MECE-organized project artifacts with clear boundaries and complete coverage",
        icon: "file-text",
        link: "./parallel-development"
      },
      {
        title: "Rules System",
        description: "Standardized guidelines for code, git workflows, and testing practices",
        icon: "shield",
        link: "./rules-system"
      },
      {
        title: "Project Management",
        description: "Task planning, feature breakdown, and GitHub issues integration",
        icon: "trello",
        link: "./project-management"
      },
      {
        title: "Watchers System",
        description: "Automated monitoring and synchronization between components and tools",
        icon: "eye",
        link: "./watchers-system"
      }
    ]
  },
  forceMultipliers: {
    features: [
      {
        icon: 'rocket',
        title: 'Rapid Testing',
        description: 'Test your changes instantly with automated testing and real-time feedback.',
        beforeState: 'Manual testing cycles taking hours or days to complete, prone to human error.',
        afterState: 'Instant automated testing with real-time feedback, catching issues immediately.'
      },
      {
        icon: 'brain',
        title: 'Dynamic Documentation',
        description: 'Documentation that evolves with your code, always staying current and relevant.',
        beforeState: 'Static documentation that quickly becomes outdated and requires manual updates.',
        afterState: 'Self-updating documentation that perfectly mirrors your codebase at all times.'
      },
      {
        icon: 'sparkles',
        title: 'AI-Powered Insights',
        description: 'Get intelligent suggestions and optimizations for your code in real-time.',
        beforeState: 'Relying on manual code reviews and limited static analysis tools.',
        afterState: 'Continuous AI-driven code analysis providing actionable insights and improvements.'
      },
      {
        icon: 'git-branch',
        title: 'Version Control',
        description: 'Track changes and collaborate seamlessly with integrated version control.',
        beforeState: 'Complex branching strategies and manual merge conflict resolution.',
        afterState: 'Streamlined version control with automated conflict detection and resolution.'
      }
    ]
  },
  systemArchitecture: {
    title: "System Architecture",
    definition: `
      graph TD
        subgraph "CLI Tools"
          CLI["brain-garden CLI"]
          CLI --> INIT["init - Create Structure"]
          CLI --> GEN["generate - Create Files"]
          CLI --> SYNC["sync - Update from GitHub"]
        end
        
        subgraph "Project Structure"
          DOC[".brain Directory"]
          DOC --> PROJ["project-info/"]
          DOC --> REQ["requirements/"]
          DOC --> ARCH["architecture/"]
          DOC --> COMP["components/"]
          DOC --> PROM["prompts/"]
        end
        
        subgraph "External Integration"
          GIT["GitHub"]
          GIT --> ISSUES["Issues"]
          GIT --> PRs["Pull Requests"]
          GIT --> ACTIONS["GitHub Actions"]
        end
        
        CLI --> DOC
        DOC --> GIT
        
        classDef tools fill:#4a6bff,stroke:#333,color:white
        classDef structure fill:#9c6ade,stroke:#333,color:white
        classDef external fill:#47b881,stroke:#333,color:white
        
        class CLI,INIT,GEN,SYNC tools
        class DOC,PROJ,REQ,ARCH,COMP,PROM structure
        class GIT,ISSUES,PRs,ACTIONS external
    `,
    theme: "default" as const
  },
  navigation: {
    sections: [
      {
        title: "Core Teams",
        description: "Meet your AI development teams",
        icon: "users",
        link: "./core-teams"
      },
      {
        title: "Team Customization",
        description: "Build your ideal AI team",
        icon: "settings",
        link: "./team-customization"
      },
      {
        title: "Parallel Development",
        description: "Scale your development efforts",
        icon: "git-branch",
        link: "./parallel-development"
      },
      {
        title: "Knowledge Management",
        description: "Grow your project's intelligence",
        icon: "brain",
        link: "./knowledge-management"
      },
      {
        title: "Documentation Power",
        description: "Documentation as a force multiplier",
        icon: "file-text",
        link: "./doc-force-multiplier"
      },
      {
        title: "Testing Excellence",
        description: "Testing as a force multiplier",
        icon: "shield-check",
        link: "./test-force-multiplier"
      },
      {
        title: "Git Integration",
        description: "Git as a force multiplier",
        icon: "git-branch",
        link: "./git-force-multiplier"
      },
      {
        title: "Agent System",
        description: "How AI agents are managed and coordinated",
        icon: "users",
        link: "./agent-system"
      },
      {
        title: "Integration System",
        description: "How the system integrates with development tools",
        icon: "git-branch",
        link: "./integration-system"
      },
      {
        title: "Skill Jack System",
        description: "How project knowledge is managed and utilized",
        icon: "brain",
        link: "./knowledge-system"
      },
      {
        title: "Rules System",
        description: "Standardized guidelines for code, git, and testing",
        icon: "shield",
        link: "./rules-system"
      },
      {
        title: "Project Management",
        description: "Task planning and GitHub issues integration",
        icon: "trello",
        link: "./project-management"
      },
      {
        title: "Watchers System",
        description: "Synchronization and monitoring between components",
        icon: "eye",
        link: "./watchers-system"
      }
    ]
  },
  keyBenefits: {
    stats: [
      {
        number: "10x",
        label: "Faster Development",
        icon: "zap"
      },
      {
        number: "100%",
        label: "Test Coverage",
        icon: "shield-check"
      },
      {
        number: "24/7",
        label: "AI Assistance",
        icon: "clock"
      },
      {
        number: "∞",
        label: "Scalability",
        icon: "maximize"
      }
    ]
  },
  cta: {
    title: "Ready to Transform Your Development Process?",
    description: "Let's explore how the Brain Garden system can revolutionize your team's AI integration.",
    action: "Explore Core Teams",
    link: "./core-teams",
    icon: "arrow-right"
  },
  transition: {
    description: "Now that we've explored the conceptual framework of the Brain Garden system, let's examine how these ideas come to life through technical implementation. The architecture we're about to explore translates these concepts into practical tools and structures that developers can immediately apply to their daily workflows."
  }
};