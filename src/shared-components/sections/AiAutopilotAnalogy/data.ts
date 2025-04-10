import React from 'react';
import { Icon } from '../../atoms/Icon';

// Default content for the component
export const defaultContent = {
  hero: {
    title: "The AI Autopilot Analogy",
    subtitle: "Understanding the true role of AI in software development teams",
    background: "image" as const,
    backgroundImage: "/cockpit3.jpg",
    backgroundOverlay: true,
    overlayOpacity: 0.1,
    textColor: "light" as const,
    pattern: "none" as const,
    animation: "fade-up" as const,
    className: 'autopilot-hero',
    style: {
      maxWidth: '1200px',
      margin: '0 auto',
      borderRadius: '24px',
      overflow: 'hidden'
    }
  },
  comparisonTable: {
    leftTitle: "Human Pilot",
    rightTitle: "AI Autopilot",
    items: [
      {
        category: "Primary Role",
        leftContent: "Strategic decision-making, complex problem-solving, and creative thinking",
        rightContent: "Handling routine tasks, providing suggestions, and automating repetitive work"
      },
      {
        category: "Responsibility",
        leftContent: "Ultimate accountability for all decisions and outcomes",
        rightContent: "Executing specific functions under human supervision and validation"
      },
      {
        category: "Strengths",
        leftContent: "Contextual understanding, ethical judgment, and novel problem-solving",
        rightContent: "Speed, consistency, pattern recognition, and tireless execution"
      },
      {
        category: "Limitations",
        leftContent: "Fatigue, cognitive biases, and limited processing capacity",
        rightContent: "Lack of true understanding, hallucinations, and inability to handle edge cases"
      },
      {
        category: "Ideal Usage",
        leftContent: "High-level architecture, critical decisions, and creative innovation",
        rightContent: "Code generation, documentation, testing, and routine maintenance"
      }
    ]
  },
  realityVsHollywood: {
    realityItems: [
      {
        title: "Augmentation Tool",
        description: "AI enhances human capabilities rather than replacing them",
        iconName: "tool"
      },
      {
        title: "Requires Expertise",
        description: "Effective AI use demands deep domain knowledge and critical thinking",
        iconName: "brain"
      },
      {
        title: "Needs Validation",
        description: "AI outputs must be verified by humans before implementation",
        iconName: "check"
      },
      {
        title: "Specialized Focus",
        description: "Excels at specific, well-defined tasks with clear parameters",
        iconName: "target"
      }
    ],
    hollywoodItems: [
      {
        title: "Autonomous Creator",
        description: "AI independently builds complete systems without human input",
        iconName: "robot"
      },
      {
        title: "Universal Expert",
        description: "AI possesses comprehensive knowledge across all domains",
        iconName: "world"
      },
      {
        title: "Perfect Accuracy",
        description: "AI never makes mistakes or produces incorrect information",
        iconName: "star"
      },
      {
        title: "General Intelligence",
        description: "AI understands context, nuance, and complex human intentions",
        iconName: "brain"
      }
    ]
  },
  strategicFocusAreas: {
    features: [
      {
        title: "Knowledge Integration",
        description: "Building systems that combine company-specific knowledge with AI capabilities for contextually aware assistance",
        iconName: "database"
      },
      {
        title: "Prompt Engineering",
        description: "Developing systematic approaches to craft effective AI prompts that produce reliable, maintainable code",
        iconName: "message-circle"
      },
      {
        title: "Validation Frameworks",
        description: "Creating robust testing systems that automatically verify AI-generated code against business requirements",
        iconName: "shield-check"
      },
      {
        title: "Workflow Optimization",
        description: "Redesigning development processes to leverage AI strengths while maintaining human oversight",
        iconName: "git-branch"
      },
      {
        title: "Team Adaptation",
        description: "Training teams to effectively collaborate with AI tools while maintaining coding standards",
        iconName: "users"
      },
      {
        title: "Metrics Redefinition",
        description: "Establishing quality-focused metrics that measure meaningful outcomes rather than AI usage",
        iconName: "chart-bar"
      }
    ]
  },
  mermaidDiagram: {
    title: "AI Integration Process Flow",
    description: "The following diagram illustrates the ideal process flow for integrating AI into development workflows:",
    definition: `
      graph TD
        A[Assess Current Workflow] --> B[Identify AI Opportunities]
        B --> C[Define Human/AI Roles]
        C --> D1[Knowledge Integration]
        D1 --> D2[Implement Prompt Engineering]
        D2 --> D3[Build Validation Frameworks]
        D3 --> E[Optimize Development Workflow]
        E --> F[Train Teams on AI Collaboration]
        F --> G[Define Quality-Focused Metrics]
        G --> H[Measure Results]
        H --> I{Successful?}
        I -->|Yes| J[Scale Integration]
        I -->|No| K[Refine Approach]
        K --> C
        J --> L[Continuous Improvement]
        L --> H
    `,
    theme: "default"
  },
  leadershipBlueprint: {
    title: "Leadership Blueprint for AI Integration",
    subtitle: "A Blueprint for Successful AI Integration",
    warningTransition: {
      title: "Warning: The Organizational Risks of AI Mismanagement",
      description: "While the strategies above provide a framework for success, many organizations are currently implementing AI in ways that create significant problems. The following section outlines disturbing trends I've observed where poor leadership approaches to AI integration are causing engineering culture breakdowns, developer burnout, and ultimately, inferior software products. This isn't theoretical—it's happening right now in companies across the industry."
    },
    narrative: {
      introduction: "When AI tools quickly produce compelling prototypes, non-technical or semi-technical managers can become overconfident. They see these demos and assume full applications can be delivered \"with one prompt.\"",
      quotes: [
        "Now comes the problem, these people are full of opinions every time I need to negotiate a deadline (oh but Claude can do this with one prompt) but they all vanish like magic the second the cursor servers are too busy to handle the load.",
        "Something does not work in their maniacal untested code? Leave it to me to figure out how to fix it. Of course it should take just a couple of hours with cursor.",
        "In the end all the benefits of the AI revolution are quickly being turned into expectations... the responsibilities of the software somehow still all lay on the backs of the developers but this time we no longer build the solutions we are accountable for."
      ],
      conclusion: "From a top-down perspective, CEOs and CTOs must realize that a successful AI-driven transformation requires empowering engineers (the skilled pilots), not sidelining them in favor of autopilot illusions. Failing to do so can lead to high attrition, poor-quality software, and a broken engineering culture."
    },
    blueprint: [
      {
        title: "A. Define Clear AI Empowerment Policies",
        items: [
          {
            name: "Ownership of Estimates",
            description: "Officially state that engineering teams own the timeline and technical scope. AI prototypes are valuable, but they're not final products."
          },
          {
            name: "Formalize AI Usage",
            description: "Provide guidelines on where AI excels (e.g., boilerplate generation, code suggestions) and where human review is mandatory (e.g., security, performance, architecture). This is akin to training pilots on autopilot systems: they need to know when and how to engage it safely."
          }
        ]
      },
      {
        title: "B. Establish Top-Down Support for Engineering",
        items: [
          {
            name: "CEO & CTO Leadership",
            description: "Their explicit statements and actions should underscore that developers remain in the driver's seat, ensuring enough time and resources for quality and maintainability. Executive leadership must consistently demonstrate through public messaging, company-wide policies, and day-to-day decisions that developers are valued partners in innovation, not mere implementers to be controlled or replaced by AI. This tone-setting role is critical as it establishes the cultural foundation that determines whether AI will enhance or undermine engineering excellence."
          },
          {
            name: "Budget for Training & Tools",
            description: "Set aside funds for AI training and resources. Equipping developers to use these tools effectively—much like additional flight training—prevents reliance on guesswork. Engineers need budget to experiment with new AI technologies as they emerge frequently and can upend established workflows. Cultivating a 'right tool for the job' mentality with a variety of AI tools, rather than depending on a single platform, ensures that downtime in one service doesn't derail productivity. Having backup approaches and alternative tools fills gaps when specific services become unreliable."
          }
        ]
      },
      {
        title: "C. Prevent Non-Technical Overreach",
        items: [
          {
            name: "No \"Coup\" by Product Managers",
            description: "Managers can prototype ideas with AI but must defer to engineering on implementation details, quality checks, and final deliverables. Beware the concerning trend where AI's democratization of coding is leading some non-technical managers to express disdain or jealousy toward developers. This sentiment sometimes manifests as an attempt to 'punish' engineers for previously being the gatekeepers of software development. Particularly troubling is when project managers dictate story points, deadlines, and development pace based solely on their limited experience using AI tools. They often tell developers exactly how long a feature should take, undermining the established practice where developers—who understand the technical complexities involved—estimate their own work."
          },
          {
            name: "Preserve Engineering Estimation",
            description: "This shift from developer-led estimation to manager-imposed timelines represents a fundamental misunderstanding of AI's role in the development process. Organizations must recognize that while AI empowers more stakeholders to participate in the development process, it doesn't eliminate the need for specialized engineering expertise. True collaboration comes from mutual respect, not from one group seeking to disempower another."
          },
          {
            name: "Establish Feedback Channels",
            description: "Make it safe for developers to raise red flags about deadlines, architecture, or testing concerns—directly to technical leadership if needed. Importantly, when developers report power imbalances or overreach by non-technical managers, leadership must actively defend their engineers. Too often, technical leaders avoid exercising their authority, creating power vacuums that project managers exploit to expand their influence beyond appropriate boundaries. Silent leadership passively enables the undermining of engineering expertise. Clear escalation paths with guaranteed leadership response are essential to maintain proper organizational dynamics."
          }
        ]
      },
      {
        title: "D. Prioritize Developer Well-Being",
        items: [
          {
            name: "AI-Assisted ≠ Overworked",
            description: "If AI frees up 30% of the developer's time, let some of that remain with the developer for deeper thinking, experimentation, or simply recharging."
          },
          {
            name: "Maintain Pride in Craft",
            description: "Keep engineers involved in the creative decisions—this preserves their sense of ownership and reduces burnout. Like pilots, they shouldn't just \"trust autopilot\", but guide, monitor, and refine what the AI produces."
          }
        ]
      },
      {
        title: "E. Retain Technical Integrity",
        items: [
          {
            name: "Quality Over \"Demos\"",
            description: "Emphasize that an AI-driven prototype is only a first draft. Security, scalability, and reliability are still critical steps that require expertise and thorough testing."
          },
          {
            name: "Shared Accountability",
            description: "Everyone involved, including managers, must share responsibility for final outcomes. If AI-generated code fails, it's not solely the developer's burden to fix."
          }
        ]
      }
    ],
    bottomLine: "Successful AI integration requires leadership commitment to balancing technological capabilities with human expertise. When leaders create an environment that respects the unique value each brings to the table, organizations can unlock the true potential of both AI and human talent working together."
  }
}; 