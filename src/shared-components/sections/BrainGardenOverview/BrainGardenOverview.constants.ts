// Default content for the component
export const defaultContent = {
  hero: {
    title: "The Brain Garden System",
    subtitle: "A Revolutionary Approach to AI Integration",
    background: "image" as const,
    backgroundImage: "/brain-garden.png",
    backgroundOverlay: true,
    overlayOpacity: 0.7,
    pattern: "dots" as const,
    textColor: "light" as const,
    animation: "fade-up" as const,
    className: 'custom-hero-bg',
  },
  intro: {
    text: "Through years of working with React and Node.js teams, I've developed a sophisticated system called 'AI Brain Garden' that transforms how teams interact with AI tools. This isn't just another set of guidelines—it's a living, evolving ecosystem that grows with your project and enables true parallel development at scale.",
    icon: "brain-garden"
  },
  coreComponents: {
    features: [
      {
        title: "Knowledge System",
        description: "Living documentation that evolves with your project",
        icon: "brain",
        link: "./knowledge-management"
      },
      {
        title: "Agent Teams",
        description: "Specialized AI teams for different aspects of development",
        icon: "users",
        link: "./core-teams"
      },
      {
        title: "Parallel Development",
        description: "True multi-team development with AI assistance",
        icon: "git-branch",
        link: "./parallel-development"
      }
    ]
  },
  forceMultipliers: {
    features: [
      {
        title: "Documentation",
        description: "Transform documentation from burden to accelerator",
        icon: "file-text",
        link: "./doc-force-multiplier"
      },
      {
        title: "Testing",
        description: "Leverage AI for comprehensive test coverage",
        icon: "shield-check",
        link: "./test-force-multiplier"
      },
      {
        title: "Git Integration",
        description: "Enhanced version control and collaboration",
        icon: "git-branch",
        link: "./git-force-multiplier"
      }
    ]
  },
  systemArchitecture: {
    title: "System Architecture",
    definition: `
      graph TD
        BG[Brain Garden System] --> KS[Knowledge System]
        BG --> AS[Agent System]
        BG --> IS[Integration System]
        
        KS --> KR[Knowledge Repository]
        KS --> KI[Knowledge Indexer]
        KS --> KQ[Query Engine]
        
        AS --> AM[Agent Manager]
        AS --> AC[Agent Coordinator]
        AS --> AT[Agent Templates]
        
        IS --> GI[Git Integration]
        IS --> CI[CI/CD Integration]
        IS --> IDE[IDE Integration]
        
        classDef system fill:#4a6bff,stroke:#333
        classDef component fill:#9c6ade,stroke:#333
        classDef integration fill:#47b881,stroke:#333
        
        class BG system
        class KS,AS,IS component
        class KR,KI,KQ,AM,AC,AT,GI,CI,IDE integration
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
        title: "Knowledge System",
        description: "How project knowledge is managed and utilized",
        icon: "brain",
        link: "./knowledge-system"
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
  }
};