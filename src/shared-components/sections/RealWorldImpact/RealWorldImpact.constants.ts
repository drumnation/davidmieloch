// Default content for the component
export const defaultContent = {
  hero: {
    title: "Brain Garden: An AI-Powered System for Transforming Development Team Performance",
    subtitle: "A Proven Approach to Accelerating Velocity, Improving Code Quality, and Reducing Technical Debt",
    background: "gradient" as const,
    textColor: "light" as const,
    className: '',
    pattern: "none" as const,
  },
  problemOverview: {
    title: "The Enterprise Development Crisis",
    description: "Modern development teams face a perfect storm of challenges that traditional solutions can't address. In my experience leading development teams and building complex systems, I've witnessed these challenges firsthand. These statistics reflect the widespread nature of the problem:",
    metrics: [
      {
        number: "78%",
        label: "Teams report increasing complexity"
      },
      {
        number: "65%",
        label: "Miss delivery deadlines"
      },
      {
        number: "82%",
        label: "Struggle with technical debt"
      }
    ],
    style: "gradient-card" as const,
    position: "full-width" as const,
    animation: "fade-up" as const,
    background: "light" as const
  },
  challengeBreakdown: {
    title: "Knowledge Management",
    key_issues: [
      {
        title: "Documentation Decay",
        description: "Documentation becomes outdated faster than it can be maintained",
        impact: "70% of teams report unreliable documentation"
      },
      {
        title: "Context Loss",
        description: "Critical context is lost during team transitions",
        impact: "4-6 weeks average onboarding time"
      },
      {
        title: "Knowledge Silos",
        description: "Expertise becomes isolated in individual team members",
        impact: "3x longer resolution times for cross-team issues"
      }
    ],
    style: "accent-card" as const,
    position: "right" as const
  },
  processFlow: {
    steps: [
      {
        title: "Context Switching",
        description: "Developers spend 30% of their time switching between tasks and tools",
        impact: "4.4 hours lost per developer per week"
      },
      {
        title: "Technical Overhead",
        description: "Managing tooling, configurations, and environments",
        impact: "25% of development time lost"
      },
      {
        title: "Decision Fatigue",
        description: "Constant small decisions drain cognitive resources",
        impact: "40% reduction in decision quality by day's end"
      }
    ],
    style: "vertical-steps" as const,
    position: "left" as const
  },
  statsComparison: {
    comparisons: [
      {
        metric: "Code Review Time",
        current: "5-7 days average wait",
        impact: "Release delays"
      },
      {
        metric: "Test Coverage",
        current: "40-60% typical coverage",
        impact: "Increased production issues"
      },
      {
        metric: "Bug Detection",
        current: "60% found after deployment",
        impact: "Higher maintenance costs"
      }
    ],
    style: "gradient-cards" as const,
    position: "right" as const
  },
  debtAnalysis: {
    categories: [
      {
        title: "Code Debt",
        current_state: "Legacy systems become increasingly difficult to maintain",
        impact: "2x maintenance cost year over year"
      },
      {
        title: "Architecture Debt",
        current_state: "Systems become rigid and resistant to change",
        impact: "3x longer implementation time for new features"
      },
      {
        title: "Process Debt",
        current_state: "Workarounds become standard practice",
        impact: "50% increase in development time"
      },
      {
        title: "Documentation Debt",
        current_state: "Documentation lags behind implementation",
        impact: "4x longer onboarding time"
      }
    ],
    style: "accent-cards" as const,
    position: "full-width" as const
  },
  cycleDiagram: {
    diagram: `
      graph TD
        K[Knowledge Crisis] -->|Slows| V[Velocity Crisis]
        V -->|Compromises| Q[Quality Crisis]
        Q -->|Generates| D[Technical Debt]
        D -->|Worsens| K
    `,
    style: "gradient-bg" as const,
    position: "center" as const
  },
  problemSolution: {
    problem: "Teams add more specialized tools to solve specific problems",
    consequence: "Increased complexity, more context switching, higher cognitive load",
    metrics: [],
    style: "split-card" as const,
    position: "right" as const
  },
  impactGrid: {
    impacts: [],
    style: "gradient-cards" as const,
    position: "full-width" as const
  },
  navigationCard: {
    content: {
      text: "Discover how my Brain Garden system transforms these challenges into opportunities for unprecedented development efficiency.",
      action: "Explore Solutions Impact",
      link: "../solutions-impact",
      icon: "arrow-right"
    },
    style: "gradient-card" as const,
    animation: "fade-up" as const
  },
  enterpriseJourney: {
    title: "The Typical AI Adoption Journey: A Story in Three Acts",
    subtitle: "From initial excitement to sustainable success",
    journeyTimeline: {
      diagram: `
        graph LR
          S[Initial Skepticism]
          P[Pilot Program]
          A[Early Adoption]
          E[Full Integration]
          T[Team Transformation]
          
          S -->|Week 1| P
          P -->|Week 4| A
          A -->|Month 2| E
          E -->|Month 3| T
      `,
      style: "side-visual" as const,
      position: "right" as const,
      animation: "fade-in" as const
    },
    featureCard: {
      quote: "I was skeptical at first - we all were. But when we saw Brain Garden refactor our authentication system in hours instead of weeks, while maintaining perfect test coverage... that's when we knew this was different.",
      author: "Senior Developer at Enterprise Tech Client",
      style: "inset-quote" as const,
      position: "left" as const
    },
    statsGrid: {
      stats: [
        {
          number: "2x",
          label: "Development Speed",
          icon: "speed"
        },
        {
          number: "50%",
          label: "Reduced Bugs",
          icon: "bug"
        },
        {
          number: "90%",
          label: "Team Adoption",
          icon: "team"
        },
        {
          number: "3x",
          label: "Documentation Coverage",
          icon: "docs"
        }
      ],
      style: "gradient-cards" as const,
      position: "right" as const,
      animation: "count-up" as const
    },
    processFlow: {
      steps: [
        {
          title: "Initial Quick Wins",
          description: "First productivity gains visible",
          metrics: [
            "30% faster coding",
            "40% better documentation"
          ]
        },
        {
          title: "Workflow Integration",
          description: "System becomes part of daily work",
          metrics: [
            "70% team adoption",
            "50% reduction in context switching"
          ]
        },
        {
          title: "Full Transformation",
          description: "Complete workflow optimization",
          metrics: [
            "2x development velocity",
            "3x better code quality"
          ]
        }
      ],
      style: "horizontal-steps" as const,
      position: "full-width" as const
    }
  },
  solutionsImpact: {
    title: "Demonstrated Results and Future Vision",
    subtitle: "While my initial project was unfortunately curtailed due to organizational concerns about AI, the results achieved before its termination, and in my subsequent mentorship of another developer, were transformative. This is what I envision for the future of development and is what drives me to continue this work.",
    solutionOverview: {
      title: "Development Velocity",
      description: "Before the project's cancelation, features that once took days were completed in hours, review time was cut by more than half, and onboarding time was significantly reduced. The system allowed us to move faster with confidence.",
      key_metrics: [
        {
          number: "3x",
          label: "Faster Development"
        },
        {
          number: "60%",
          label: "Less Context Switching"
        },
        {
          number: "70%",
          label: "Reduced Onboarding Time"
        }
      ],
      style: "gradient-card" as const,
      position: "full-width" as const
    },
    knowledgeManagement: {
      title: "Code Quality",
      key_features: [
        {
          title: "Reduced AI-related Bugs",
          description: "We saw a dramatic reduction in AI-related bugs",
          impact: "Improved reliability"
        },
        {
          title: "Improved Test Coverage",
          description: "Test coverage saw dramatic improvements",
          impact: "Better code quality"
        },
        {
          title: "Consistent Patterns",
          description: "Consistent patterns were implemented throughout the codebase",
          impact: "Enhanced maintainability"
        }
      ],
      style: "accent-card" as const,
      position: "right" as const
    },
    developmentVelocity: {
      improvements: [
        {
          title: "Team Dynamics",
          description: "Team dynamics showed reduced friction in code reviews, improved collaboration, and higher team confidence in AI tools",
          impact: "The technology became a unifying force rather than a source of division"
        },
        {
          title: "Future Vision",
          description: "The future of enterprise development hinges on building systems that amplify both human expertise and AI power",
          impact: "Brain Garden is designed to be that foundation"
        },
        {
          title: "Continued Commitment",
          description: "My goal is to continue refining and implementing this system to unlock its full potential",
          impact: "Enabling sustainable, high-quality development at scale"
        }
      ],
      style: "vertical-steps" as const,
      position: "left" as const
    },
    metricsGrid: {
      metrics: [],
      style: "gradient-cards" as const,
      position: "right" as const
    },
    qualityAssurance: {
      features: [],
      style: "accent-cards" as const,
      position: "left" as const
    },
    statsComparison: {
      comparisons: [],
      style: "gradient-cards" as const,
      position: "right" as const
    },
    technicalDebt: {
      strategies: [],
      style: "accent-cards" as const,
      position: "left" as const
    },
    transformationMetrics: {
      categories: [],
      style: "gradient-cards" as const,
      position: "full-width" as const
    },
    caseStudies: [],
    journeyTimeline: {
      diagram: ``,
      style: "gradient-bg" as const,
      position: "center" as const
    }
  },
  industryVoices: {
    title: "Industry Voices: The Need for a New Approach",
    quotes: [
      {
        text: "Week 3: Found my junior dev committed an AI-generated authentication flow with three security vulnerabilities. This is getting dangerous.",
        author: "Tech Lead on Reddit"
      },
      {
        text: "Every time someone says 'AI told me to do this' as defense for a terrible design decision, I die a little inside.",
        author: "Principal Engineer on Reddit"
      },
      {
        text: "I am most worried how it affects the bad engineers... Creating tests that do essentially nothing, logging statements that hinder more than help, coding styles that don't match the rest of our code base, and just flat out wrong logic are just some examples I have seen.",
        author: "Senior Developer on Reddit"
      },
      {
        text: "We're generating code 100x faster but our test coverage is actually dropping. The AI generates tests, but they're often just happy path scenarios that miss critical edge cases.",
        author: "QA Lead on Reddit"
      }
    ],
    style: "quote-grid" as const,
    position: "full-width" as const
  },
  commonPitfalls: {
    title: "Common Pitfalls in AI Adoption (and How Brain Garden Avoids Them)",
    introduction: "The journey of AI adoption in enterprise development often follows a predictable, and often disappointing, pattern. I initially saw the immense promise of AI, leading to rapid code generation and early excitement. However, like many teams, we soon encountered the reality of inconsistent code quality, security vulnerabilities, and growing technical debt. This led to restrictions on AI usage and a return to older methods. Through this experience, I identified three fundamental problems that cause AI adoption to fail, and I designed Brain Garden to directly address them:",
    problems: [
      {
        title: "Documentation",
        description: "AI tools lack critical context about your project, leading to misaligned code generation and implementation errors.",
        codeExample: `interface ProjectContext {
  architecture: ArchitectureMap;
  conventions: CodeConventions;
  businessRules: BusinessRuleRegistry;
  dependencies: DependencyGraph;
  history: ImplementationHistory;
}`
      },
      {
        title: "Testing",
        description: "AI-generated code often lacks comprehensive testing, creating a false sense of productivity while accumulating technical debt.",
        codeExample: `class AIValidationPipeline {
  validateArchitecture(code: string): ValidationResult;
  validateConventions(code: string): ValidationResult;
  validateBusinessRules(code: string): ValidationResult;
  validateSecurity(code: string): SecurityScan;
  generateTests(code: string): TestSuite;
}`
      },
      {
        title: "Knowledge",
        description: "AI tools don't preserve the reasoning behind implementation decisions, leading to knowledge loss and inconsistent development.",
        codeExample: `class SharedKnowledge {
  recordDecision(context: DecisionContext, options: Option[], selected: Option, reasoning: string): void;
  queryRelevantDecisions(context: CurrentContext): Decision[];
  generateDocumentation(codebase: Codebase): Documentation;
}`
      }
    ],
    style: "problem-cards" as const,
    position: "full-width" as const
  },
  brainGardenSolutions: {
    title: "How Brain Garden Addresses These Challenges",
    solutions: [
      {
        title: "Documentation Evolution",
        description: "Brain Garden transforms static documentation into a living knowledge system that evolves with your codebase."
      },
      {
        title: "Intelligent Testing",
        description: "The system ensures comprehensive test coverage for all AI-generated code, focusing on edge cases and business logic validation."
      },
      {
        title: "Knowledge Integration",
        description: "Brain Garden preserves implementation decisions and context, creating a continuous knowledge transfer system across your team."
      }
    ],
    style: "solution-cards" as const,
    position: "full-width" as const
  },
  conclusion: {
    title: "Conclusion and Next Steps",
    content: "Brain Garden represents a significant step forward in leveraging AI for enterprise software development. I am passionate about continuing this work and bringing the benefits of this system to a forward-thinking organization. I am actively seeking a role where I can lead the implementation and refinement of AI-driven development strategies. I am confident that my experience and the proven results of Brain Garden can significantly impact your team's performance and innovation capabilities.",
    contactInfo: {
      email: "your.email@example.com",
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername"
    },
    style: "contact-card" as const,
    position: "center" as const
  }
}; 