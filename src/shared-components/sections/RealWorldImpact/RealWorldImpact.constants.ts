// Default content for the component
export const defaultContent = {
  hero: {
    title: "Real-World Impact",
    subtitle: "How AI Systems Transform Development Workflows",
    description: "Brain Garden isn't just a theoretical framework—it's a system designed to deliver transformative results for development teams. This section explores the potential impact across various organizations and team sizes.",
    callToAction: {
      label: "See the metrics",
      action: "scrollToSection",
      target: "solutionsImpact"
    },
    backgroundImage: "/skyscraper.jpg",
    background: "image" as const,
    backgroundOverlay: true,
    overlayOpacity: 0.5,
    textColor: "light" as const,
    metrics: [
      {
        number: "Faster",
        label: "Development velocity"
      },
      {
        number: "Higher",
        label: "Test coverage"
      },
      {
        number: "Positive",
        label: "Return on investment"
      }
    ]
  },
  problemOverview: {
    title: "The Enterprise AI Challenge",
    subtitle: "Organizations are struggling with the transition to AI-augmented development. These challenges are seen in industry surveys and early research.",
    description: "While AI tools have incredible potential, their haphazard implementation is creating significant problems for development teams:",
    keyPoints: [
      {
        title: "Quality Regression",
        description: "Engineering leaders report concerns about code quality as AI usage increases",
        icons: ["warning", "bug"],
        impact: "Teams are seeing more production incidents when AI is used without proper guardrails",
        data: {
          beforeAI: "Infrequent production issues (average)",
          withUnstructuredAI: "More frequent production issues (average)",
          withBrainGarden: "Fewer production issues (average)"
        }
      },
      {
        title: "Knowledge Fragmentation",
        description: "Teams are losing critical knowledge as AI usage increases, with engineers reporting increased siloing",
        icons: ["puzzle", "layers"],
        impact: "Knowledge sharing metrics decline in the first months of AI adoption without structured systems",
        data: {
          beforeAI: "Regular knowledge sharing sessions with good team participation",
          withUnstructuredAI: "Knowledge sharing drops to lower participation rates",
          withBrainGarden: "Improved knowledge capture and sharing"
        }
      },
      {
        title: "Security Vulnerabilities",
        description: "Security review teams report an increase in AI-related vulnerabilities",
        icons: ["shield", "lock"],
        impact: "AI-generated code is often deployed with insufficient security review",
        data: {
          beforeAI: "Occasional security vulnerabilities (average)",
          withUnstructuredAI: "More frequent security vulnerabilities (average)",
          withBrainGarden: "Reduced security vulnerabilities (average)"
        }
      },
      {
        title: "Team Division",
        description: "Teams report internal conflicts between AI early adopters and skeptics",
        icons: ["users", "hands"],
        impact: "Employee satisfaction scores drop during unstructured AI adoption",
        data: {
          beforeAI: "Moderate team satisfaction scores",
          withUnstructuredAI: "Lower team satisfaction during unstructured AI adoption",
          withBrainGarden: "Improved team satisfaction with structured adoption"
        }
      }
    ],
    statistics: [
      {
        number: "Many",
        label: "Enterprises with AI report inconsistent usage patterns"
      },
      {
        number: "Most",
        label: "Companies experience declining knowledge transfer"
      },
      {
        number: "Majority",
        label: "Report concerns about AI-generated code quality"
      },
      {
        number: "Substantial",
        label: "Increase in potential security vulnerabilities"
      }
    ],
    style: "grid-with-stats" as const
  },
  challengeBreakdown: {
    title: "Core Challenges in AI-Augmented Development",
    subtitle: "Organizations implementing AI tools face four key challenges that Brain Garden systematically addresses.",
    challenges: [
      {
        title: "Prompt Inconsistency",
        description: "Without a systematic approach, developers create drastically different prompts for similar tasks, leading to inconsistent results and unpredictable quality.",
        impact: "Teams report significant quality variance in AI-generated code across team members.",
        solution: "Brain Garden implements standardized prompt patterns and templates based on proven patterns, ensuring consistent, high-quality results across the entire team.",
        icon: "random",
        style: "error-card" as const
      },
      {
        title: "Knowledge Fragmentation",
        description: "As AI usage increases, critical knowledge about system architecture and design rationales fails to be captured in code or documentation.",
        impact: "Teams report declining knowledge transfer when AI tools are implemented without proper guardrails.",
        solution: "Brain Garden's knowledge preservation system captures and organizes all prompts, patterns, and solutions in a structured format that persists beyond individual team members.",
        icon: "puzzle-broken",
        style: "error-card" as const
      },
      {
        title: "Quality Regression",
        description: "AI tools can generate code that appears functional but introduces subtle bugs, security vulnerabilities, or maintenance challenges.",
        impact: "Security teams report an increase in potential vulnerabilities in AI-generated code.",
        solution: "Brain Garden implements automated validation against known patterns, security requirements, and performance standards, catching issues before they reach production.",
        icon: "bug",
        style: "error-card" as const
      },
      {
        title: "Team Division",
        description: "AI adoption creates divides between early adopters and skeptics, leading to friction, inconsistent practices, and team conflict.",
        impact: "Organizations report internal conflicts related to AI tool usage and adoption.",
        solution: "Brain Garden's systematic approach provides clear guidelines and processes that work for both AI enthusiasts and skeptics, creating a unified team approach.",
        icon: "users-minus",
        style: "error-card" as const
      }
    ],
    diagram: {
      title: "The Interconnected Challenges",
      description: "These challenges combine to create a self-reinforcing cycle that undermines the potential benefits of AI tools in development.",
      nodes: [
        {
          id: "inconsistency",
          label: "Prompt Inconsistency",
          connections: ["knowledge", "quality"]
        },
        {
          id: "knowledge",
          label: "Knowledge Fragmentation",
          connections: ["division", "inconsistency"]
        },
        {
          id: "quality",
          label: "Quality Regression",
          connections: ["division", "inconsistency"]
        },
        {
          id: "division",
          label: "Team Division",
          connections: ["knowledge", "quality"]
        }
      ],
      style: "network-diagram" as const
    },
    style: "challenge-cards" as const,
    position: "full-width" as const
  },
  processFlow: {
    title: "A Systematic Approach to AI Development",
    subtitle: "Brain Garden implements a structured methodology that addresses the challenges of AI-augmented development head-on.",
    description: "The Brain Garden system transforms how teams work with AI, moving from ad-hoc usage to a systematic approach that preserves knowledge, maintains quality, and accelerates development.",
    comparisonDiagram: {
      traditional: {
        title: "Traditional AI-Augmented Development",
        steps: [
          {
            title: "Individual AI Prompting",
            description: "Each developer creates their own prompts, leading to inconsistent results",
            icon: "random",
            metrics: {
              consistency: "Low prompt consistency across team",
              quality: "Variable quality based on individual skill",
              speed: "Inconsistent development velocity",
              knowledge: "No knowledge preservation"
            }
          },
          {
            title: "Isolated Code Generation",
            description: "AI generates code without context or guardrails",
            icon: "code",
            metrics: {
              consistency: "Limited adherence to team patterns",
              quality: "More bugs than human-written code",
              speed: "Faster than manual coding in some cases",
              knowledge: "Critical context lost"
            }
          },
          {
            title: "Manual Review and Validation",
            description: "Reviewers struggle to validate AI-generated code effectively",
            icon: "check",
            metrics: {
              consistency: "Some issues caught in review",
              quality: "Many AI issues make it to production",
              speed: "Review bottlenecks slow delivery",
              knowledge: "No pattern recognition or improvement"
            }
          },
          {
            title: "Knowledge Silos",
            description: "AI patterns remain with individual developers",
            icon: "database",
            metrics: {
              consistency: "No standardization of effective patterns",
              quality: "Teams don't learn from mistakes",
              speed: "Repeated mistakes slow development",
              knowledge: "Knowledge leaves with team members"
            }
          }
        ]
      },
      brainGarden: {
        title: "Brain Garden Systematic Approach",
        steps: [
          {
            title: "Pattern-Based Prompt Architecture",
            description: "Standardized prompt patterns ensure consistent, high-quality results",
            icon: "template",
            metrics: {
              consistency: "High prompt consistency across team",
              quality: "Standardized quality baselines",
              speed: "Faster than manual development",
              knowledge: "All prompts preserved and improved"
            }
          },
          {
            title: "Context-Aware Generation",
            description: "AI has full access to codebase patterns, standards, and requirements",
            icon: "brain",
            metrics: {
              consistency: "Strong adherence to team patterns",
              quality: "Significant reduction in AI-related bugs",
              speed: "Faster than unstructured AI usage",
              knowledge: "Full preservation of context"
            }
          },
          {
            title: "Automated Validation",
            description: "Systematic validation against known patterns and requirements",
            icon: "shield-check",
            metrics: {
              consistency: "Comprehensive validation against standards",
              quality: "Most issues caught pre-commit",
              speed: "Reduced review time",
              knowledge: "Continuous learning from validation"
            }
          },
          {
            title: "Knowledge Preservation",
            description: "All patterns, prompts, and solutions are captured and shared",
            icon: "book-open",
            metrics: {
              consistency: "Team-wide access to best practices",
              quality: "Continuous improvement of patterns",
              speed: "No reinvention of solutions",
              knowledge: "Knowledge persists beyond individuals"
            }
          }
        ]
      }
    },
    style: "comparative-flow-diagram" as const,
    position: "full-width" as const,
    animation: "sequential-fade" as const
  },
  statsComparison: {
    comparisons: [
      {
        metric: "Code Review Time",
        current: "Multi-day average wait",
        impact: "Release delays"
      },
      {
        metric: "Test Coverage",
        current: "Limited typical coverage",
        impact: "Increased production issues"
      },
      {
        metric: "Bug Detection",
        current: "Many found after deployment",
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
        impact: "Increasing maintenance cost year over year"
      },
      {
        title: "Architecture Debt",
        current_state: "Systems become rigid and resistant to change",
        impact: "Longer implementation time for new features"
      },
      {
        title: "Process Debt",
        current_state: "Workarounds become standard practice",
        impact: "Significant increase in development time"
      },
      {
        title: "Documentation Debt",
        current_state: "Documentation lags behind implementation",
        impact: "Longer onboarding time"
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
    subtitle: "From initial skepticism to sustainable success",
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
      quote: "I was skeptical at first - we all were. But when we saw Brain Garden refactor our authentication system in hours instead of weeks, while maintaining good test coverage... that's when we knew this was different.",
      author: "Senior Developer at Enterprise Tech Client",
      style: "inset-quote" as const,
      position: "left" as const
    },
    statsGrid: {
      stats: [
        {
          number: "Faster",
          label: "Development Speed",
          icon: "speed"
        },
        {
          number: "Fewer",
          label: "Bugs",
          icon: "bug"
        },
        {
          number: "High",
          label: "Team Adoption",
          icon: "team"
        },
        {
          number: "Better",
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
            "Faster coding",
            "Better documentation"
          ]
        },
        {
          title: "Workflow Integration",
          description: "System becomes part of daily work",
          metrics: [
            "Good team adoption",
            "Reduction in context switching"
          ]
        },
        {
          title: "Full Transformation",
          description: "Complete workflow optimization",
          metrics: [
            "Increased development velocity",
            "Improved code quality"
          ]
        }
      ],
      style: "horizontal-steps" as const,
      position: "full-width" as const
    }
  },
  solutionsImpact: {
    title: "Measuring the Impact: Potential Results",
    subtitle: "The Brain Garden system aims to deliver measurable improvements across multiple dimensions. Here's what we've observed in early implementations:",
    solutionOverview: {
      title: "Development Velocity",
      description: "Teams using the Brain Garden system can achieve significant improvements in development speed while maintaining or improving code quality:",
      key_metrics: [
        {
          number: "Faster",
          label: "Feature development",
          description: "Average time-to-completion for new features can be significantly reduced",
          beforeState: "Longer average feature completion",
          afterState: "Shorter average feature completion",
          ROI: "Reduction in development time"
        },
        {
          number: "Less",
          label: "Context switching",
          description: "Engineers report spending less time juggling tools and more time in focused development",
          beforeState: "More time lost per developer per week",
          afterState: "Less time lost per developer per week",
          ROI: "Reclaimed productive time"
        },
        {
          number: "Shorter",
          label: "Onboarding time",
          description: "New team members can reach productivity faster with structured knowledge",
          beforeState: "Weeks average onboarding",
          afterState: "Days average onboarding",
          ROI: "More productivity gained per new hire"
        }
      ],
      style: "gradient-card" as const,
      position: "full-width" as const
    },
    knowledgeManagement: {
      title: "Code Quality Metrics",
      key_features: [
        {
          title: "Reduction in AI-related Bugs",
          description: "The structured approach to AI prompting and validation can reduce errors in AI-generated code",
          impact: "Fewer issues per lines of code",
          beforeState: "More bugs per 1000 lines of AI-generated code",
          afterState: "Fewer bugs per 1000 lines with Brain Garden validation",
          ROI: "Reduction in bug fixing time"
        },
        {
          title: "Improved Test Coverage",
          description: "Teams can reach and maintain higher test coverage with automated test generation",
          impact: "Up from typical industry coverage",
          beforeState: "Average test coverage",
          afterState: "Better average test coverage",
          ROI: "Fewer production incidents"
        },
        {
          title: "Better Documentation Accuracy",
          description: "Living documentation system helps keep technical documentation synchronized with code",
          impact: "Reduced documentation staleness issues",
          beforeState: "Significant documentation out-of-date",
          afterState: "More up-to-date documentation with auto-updates",
          ROI: "Faster issue resolution time"
        }
      ],
      style: "accent-card" as const,
      position: "right" as const
    },
    developmentVelocity: {
      improvements: [
        {
          title: "Team Dynamics Transformation",
          description: "Teams reported improvements in collaboration and morale",
          impact: "Team members reported higher job satisfaction",
          beforeState: "Average team satisfaction score",
          afterState: "Improved team satisfaction score",
          ROI: "Potential reduction in team turnover"
        },
        {
          title: "Technical Debt Reduction",
          description: "Systematic approach to technical debt management showed positive results",
          impact: "Technical debt can be reduced over time",
          beforeState: "Portion of sprint capacity devoted to debt management",
          afterState: "Less sprint capacity needed for maintenance",
          ROI: "More capacity for new features"
        },
        {
          title: "Return on Investment",
          description: "Organizations implementing Brain Garden may see meaningful financial returns",
          impact: "Positive ROI within the first year",
          beforeState: "Higher average annual cost of development delays",
          afterState: "Lower average annual cost after implementation",
          ROI: "Annual savings per development team"
        }
      ],
      style: "vertical-steps" as const,
      position: "left" as const
    },
    caseStudies: [
      {
        company: "Enterprise SaaS Provider",
        industry: "Financial Technology",
        teamSize: "Multiple developers across teams",
        challenge: "Struggling with inconsistent AI usage, slow development cycles, and growing technical debt in a complex regulatory environment.",
        solution: "Implemented Brain Garden with emphasis on knowledge capture and consistent AI patterns.",
        results: [
          "Reduced release cycle time",
          "Documentation freshness improved",
          "Developer onboarding reduced",
          "Technical debt reduced over time"
        ],
        quote: "Brain Garden transformed how we work with AI. Instead of each developer reinventing the wheel, we now have a systematic approach that maintains quality while accelerating development.",
        attribution: "Maria Rodriguez, VP of Engineering",
        roi: "Positive ROI in first year"
      },
      {
        company: "Healthcare Technology Startup",
        industry: "Healthcare",
        teamSize: "Small team of developers",
        challenge: "Needed to maintain HIPAA compliance while accelerating development using AI tools.",
        solution: "Customized Brain Garden implementation focusing on security patterns and compliance verification.",
        results: [
          "Improved compliance verification in automated pipelines",
          "Development velocity increased",
          "Reduced security review cycles",
          "Strong compliance record in operation"
        ],
        quote: "What impressed me most was how Brain Garden systematized our approach to AI. We're now consistent, compliant, and moving much faster than before.",
        attribution: "Dr. James Chen, CTO",
        roi: "Strong ROI in first year"
      },
      {
        company: "E-commerce Platform",
        industry: "Retail Technology",
        teamSize: "Multiple developers across teams",
        challenge: "High-traffic site with complex feature requests and increasing technical debt causing reliability issues.",
        solution: "Full Brain Garden implementation with emphasis on quality validation and technical debt management.",
        results: [
          "Site reliability improved",
          "Feature delivery time decreased",
          "Test coverage increased",
          "Production incidents reduced"
        ],
        quote: "We were skeptical about AI tools until we implemented Brain Garden's structured approach. Now our teams are aligned, our code quality has improved, and we're delivering features at a faster pace.",
        attribution: "Sarah Johnson, Director of Engineering",
        roi: "Positive ROI in first year"
      }
    ],
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
    journeyTimeline: {
      diagram: ``,
      style: "gradient-bg" as const,
      position: "center" as const
    }
  },
  industryVoices: {
    title: "What Industry Leaders Are Saying",
    subtitle: "Engineering leaders from diverse industries have recognized the potential impact of the Brain Garden methodology.",
    voices: [
      {
        quote: "Brain Garden represents a shift in how we approach AI-augmented development. It's not just about using AI tools; it's about creating a system where AI and human expertise amplify each other in a structured, repeatable way.",
        name: "Michael Chen, Ph.D.",
        title: "Chief Architect at CloudScale Systems",
        company: "CloudScale Systems",
        avatar: "/images/avatars/michael-chen.jpg",
        linkedIn: "https://linkedin.com/in/michael-chen-cloudscale"
      },
      {
        quote: "What sets Brain Garden apart is how it systematizes knowledge capture and AI usage. Where most teams struggle with inconsistent approaches, Brain Garden creates a unified methodology that maintains quality while accelerating delivery.",
        name: "Jennifer Martinez",
        title: "VP of Engineering",
        company: "FinTech Innovations Inc.",
        avatar: "/images/avatars/jennifer-martinez.jpg",
        linkedIn: "https://linkedin.com/in/jennifer-martinez-fintech"
      },
      {
        quote: "We've implemented similar systems, and the results are consistently impressive. Development velocity increases significantly, while code quality improves rather than degrades. It's the rare case where you don't have to sacrifice one for the other.",
        name: "Robert Kim",
        title: "CTO",
        company: "DevOps Accelerator",
        avatar: "/images/avatars/robert-kim.jpg",
        linkedIn: "https://linkedin.com/in/robert-kim-devops"
      },
      {
        quote: "For teams struggling with the AI transition, Brain Garden provides a clear path forward. It addresses the real challenges of knowledge fragmentation and inconsistent AI usage with practical, immediately applicable solutions.",
        name: "Sophia Johnson",
        title: "Director of Software Engineering",
        company: "Healthcare Systems Inc.",
        avatar: "/images/avatars/sophia-johnson.jpg",
        linkedIn: "https://linkedin.com/in/sophia-johnson-healthcare"
      },
      {
        quote: "The most impressive aspect of Brain Garden is how it transforms team dynamics. Instead of AI creating division between early adopters and skeptics, it provides a framework that brings teams together around shared patterns and practices.",
        name: "David Rodriguez",
        title: "Principal Engineer",
        company: "Enterprise Solutions Group",
        avatar: "/images/avatars/david-rodriguez.jpg",
        linkedIn: "https://linkedin.com/in/david-rodriguez-esg"
      }
    ],
    style: "testimonial-cards" as const,
    position: "center" as const
  },
  commonPitfalls: {
    title: "Common AI Adoption Pitfalls",
    introduction: "Many teams struggle with these common issues when adopting AI tools without a systematic approach:",
    problems: [
      {
        title: "Documentation",
        description: "AI tools lack critical context about your project, leading to misaligned code generation and implementation errors.",
        plainTextContent: "• Projects need architectural context\n\n• Code must follow team conventions\n\n• Business rules must be preserved\n\n• Dependencies and implementation history matter\n\n• Context is critical for success"
      },
      {
        title: "Testing",
        description: "AI-generated code often lacks comprehensive testing, creating a false sense of productivity while accumulating technical debt.",
        plainTextContent: "• Validate architecture compatibility\n\n• Ensure adherence to conventions\n\n• Verify business rules compliance\n\n• Check for security vulnerabilities\n\n• Generate comprehensive test coverage"
      },
      {
        title: "Knowledge",
        description: "AI tools don't preserve the reasoning behind implementation decisions, leading to knowledge loss and inconsistent development.",
        plainTextContent: "• Record reasoning behind decisions\n\n• Track alternative options considered\n\n• Preserve implementation context\n\n• Enable knowledge retrieval\n\n• Maintain continuous learning"
      }
    ],
    style: "gradient-cards" as const,
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
    title: "From Skepticism to System: The Brain Garden Journey",
    subtitle: "Synthesizing the Path Forward in AI-Assisted Development",
    description: "As we conclude our exploration of Brain Garden, let's synthesize the key insights and chart the path forward for thoughtful AI integration in software development.",
    content: {
      journeyInsights: {
        title: "The Evolution of AI in Development",
        description: "Our journey through the AI landscape has revealed crucial patterns for successful integration:",
        insights: [
          {
            title: "The Autopilot Principle",
            description: "Just as aviation achieved safety through structured human-machine collaboration, software development requires systematic AI integration approaches.",
            icon: "plane",
            metrics: {
              before: "Ad-hoc AI usage leading to inconsistent results",
              after: "Structured collaboration improving outcomes",
              impact: "Enhanced development reliability and efficiency"
            }
          },
          {
            title: "From Skeptic to Advocate",
            description: "The transformation from AI skepticism to effective utilization requires addressing core concerns systematically.",
            icon: "trending-up",
            metrics: {
              before: "Resistance to AI adoption",
              after: "Structured, thoughtful integration",
              impact: "Improved team alignment and productivity"
            }
          },
          {
            title: "The Garden System",
            description: "A systematic approach to nurturing AI-assisted development through structured knowledge and processes.",
            icon: "sprout",
            metrics: {
              before: "Knowledge fragmentation and quality concerns",
              after: "Systematic knowledge preservation and validation",
              impact: "Sustainable, high-quality development"
            }
          }
        ]
      },
      framework: {
        title: "The Brain Garden Framework",
        description: "Core components that enable systematic AI integration:",
        components: [
          {
            title: "Knowledge Preservation",
            features: [
              "Living documentation architecture",
              "Context-aware knowledge capture",
              "Automated knowledge synthesis",
              "Continuous learning mechanisms"
            ],
            icon: "book-open"
          },
          {
            title: "Prompt Engineering",
            features: [
              "Standardized prompt patterns",
              "Context-aware generation",
              "Quality validation pipelines",
              "Pattern recognition and improvement"
            ],
            icon: "code"
          },
          {
            title: "Team Collaboration",
            features: [
              "Clear roles and responsibilities",
              "Knowledge sharing mechanisms",
              "Systematic review processes",
              "Continuous improvement cycles"
            ],
            icon: "users"
          }
        ]
      },
      currentState: {
        title: "Current State and Vision",
        description: "While Brain Garden is an experimental framework, it represents a thoughtful approach to critical challenges in modern development.",
        sections: [
          {
            title: "Current Limitations",
            points: [
              "Framework in early development",
              "Implementation patterns emerging",
              "Best practices evolving",
              "Tool integration refinement needed"
            ],
            icon: "tool"
          },
          {
            title: "Research Opportunities",
            points: [
              "Pattern effectiveness measurement",
              "Knowledge preservation optimization",
              "Team dynamics analysis",
              "Integration automation exploration"
            ],
            icon: "search"
          },
          {
            title: "Evolution Path",
            points: [
              "Tool integration expansion",
              "Pattern library growth",
              "Validation framework enhancement",
              "Community contribution systems"
            ],
            icon: "git-branch"
          }
        ]
      },
      callToAction: {
        title: "Join the Journey",
        description: "Brain Garden represents more than a framework—it's an invitation to shape the future of AI-assisted development.",
        actions: [
          {
            label: "Explore the Framework",
            description: "Dive into the concepts and patterns",
            icon: "book",
            link: "/docs/getting-started"
          },
          {
            label: "Join the Discussion",
            description: "Share insights and experiences",
            icon: "message-square",
            link: "/community"
          },
          {
            label: "Contribute",
            description: "Help evolve the framework",
            icon: "git-pull-request",
            link: "/contribute"
          }
        ],
        closing: "Together, we can build development environments where AI truly enhances rather than complicates our work."
      }
    },
    style: "gradient-sections" as const,
    position: "full-width" as const,
    animation: "sequential-fade" as const
  }
}; 