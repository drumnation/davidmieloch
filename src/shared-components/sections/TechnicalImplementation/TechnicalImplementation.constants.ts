// Default content for the component
export const defaultContent = {
  title: "Technical Implementation: How AI Brain Garden Works",
  subtitle: "A deep dive into our sophisticated AI architecture",
  
  // System overview diagram
  systemOverviewDiagram: `
    graph TD
      BG[Brain Garden System] --> PB[Project-Specific Brains]
      BG --> DCM[Dynamic Context Management]
      BG --> IDSM[Intelligent Directory Structure]
      BG --> MAC[Multi-Agent Collaboration]
      BG --> ADP[Atomic Design for Prompts]
      BG --> TM[Task Management]
      BG --> AVT[Automated Validation & Testing]
      BG --> CLI[CLI & Standards System]
      
      classDef system fill:#f96,stroke:#333
      classDef component fill:#58f,stroke:#333
      
      class BG system
      class PB,DCM,IDSM,MAC,ADP,TM,AVT,CLI component
  `,

  // Agent system diagram
  agentSystemDiagram: `
    graph TD
      T[New Task] --> A[Analysis]
      A --> P[Planning]
      P --> D[Distribution]
      
      D --> AG1[Architect Agent]
      D --> AG2[Frontend Lead Agent]
      D --> AG3[AI Specialist Agent]
      
      AG1 --> R[Results]
      AG2 --> R
      AG3 --> R
      
      R --> V[Validation]
      V --> I[Integration]
      
      classDef task fill:#f96,stroke:#333
      classDef process fill:#58f,stroke:#333
      classDef team fill:#58f,stroke:#333
      classDef output fill:#5f5,stroke:#333
      
      class T task
      class A,P,D process
      class AG1,AG2,AG3 team
      class R,V,I output
  `,

  // Integration system diagram
  integrationSystemDiagram: `
    graph TD
      IS[Integration System] --> G[Git Integration]
      IS --> I[IDE Integration]
      IS --> C[CI/CD Integration]
      
      G --> GF[Feature Branches]
      G --> GM[Merge Management]
      G --> GH[History Analysis]
      
      I --> IC[Code Assistance]
      I --> IR[Refactoring]
      I --> IP[Pattern Suggestions]
      
      C --> CD[Deployment]
      C --> CT[Testing]
      C --> CM[Monitoring]
      
      classDef system fill:#f96,stroke:#333
      classDef integration fill:#58f,stroke:#333
      classDef feature fill:#5f5,stroke:#333
      
      class IS system
      class G,I,C integration
      class GF,GM,GH,IC,IR,IP,CD,CT,CM feature
  `,

  // Knowledge flow diagram
  knowledgeFlowDiagram: `
    graph LR
      D[Developer Action] --> C[Knowledge Capture]
      C --> A[Analysis & Processing]
      A --> E[Enriched Knowledge]
      E --> S[Shared Understanding]
      S --> T[Team Benefits]
      
      classDef action fill:#f96,stroke:#333
      classDef process fill:#58f,stroke:#333
      classDef benefit fill:#5f5,stroke:#333
      
      class D,C action
      class A,E process
      class S,T benefit
  `,

  // Performance and scalability diagram
  performanceScalabilityDiagram: `
    graph TD
      P[Performance] --> D[Distribution]
      P --> C[Caching]
      P --> O[Optimization]
      
      D --> DP[Parallel Processing]
      D --> DL[Load Balancing]
      D --> DS[Service Scaling]
      
      C --> CM[Memory Management]
      C --> CI[Index Optimization]
      C --> CR[Resource Control]
      
      O --> OP[Pattern Optimization]
      O --> OQ[Query Optimization]
      O --> OR[Resource Optimization]
      
      classDef perf fill:#f96,stroke:#333
      classDef feature fill:#58f,stroke:#333
      classDef opt fill:#5f5,stroke:#333
      
      class P perf
      class D,C,O feature
      class DP,DL,DS,CM,CI,CR,OP,OQ,OR opt
  `,

  // System overview content
  systemOverview: {
    introduction: "The AI Brain Garden system is a sophisticated approach to integrating AI coding tools into a development team's workflow, particularly for projects using React, Node.js, and TypeScript. It's not just a set of guidelines; it's a dynamic, project-specific ecosystem that evolves alongside the codebase. The core idea is to create a structured knowledge base (the \"Brain\") that the AI can leverage to produce higher-quality, more context-aware code suggestions, and to manage the entire AI-assisted development lifecycle."
  },

  // Knowledge System content
  knowledgeSystem: {
    title: "Project-Specific Brains",
    description: "At the core of the Brain Garden system are structured knowledge bases tailored to each individual project.",
    introduction: "These project-specific \"Brains\" contain information about the project's architecture, coding standards, testing methodologies, business domain, and team workflows. This is crucial because it moves away from generic AI assistance and towards AI that understands the specific project context.",
    flowDescription: "The ProjectBrain interface defines the top-level structure, including templates for reusable code snippets, rules containing coding standards and architectural patterns, and agents that define the roles and knowledge bases of different AI specialists. This creates a comprehensive knowledge foundation that evolves with your project.",
    features: [
      {
        title: "Dynamic Context Management",
        description: "Using cursorrules, this system automatically provides the AI with the necessary context for any given task. It loads relevant files, enforces coding standards, and guides AI decisions based on the project's current state, minimizing the \"hallucination\" problem where AI generates code that doesn't fit the project."
      },
      {
        title: "Intelligent Directory Structure Management",
        description: "The system continuously monitors the project's directory structure, using AI (specifically, Google's Gemini) to analyze and summarize the purpose and contents of each folder. This creates a \"living map\" of the project that helps maintain consistency and follow established patterns."
      },
      {
        title: "Shared Knowledge Repository",
        description: "The SharedKnowledge interface manages prompts with success rates and stores best practices, creating an evolving repository of what works best for your specific project."
      }
    ],
    conclusion: "With Project-Specific Brains, your AI assistants gain deep understanding of your codebase, making them true extensions of your development team rather than generic tools. This transforms how knowledge is managed in your organization—from a static asset that degrades over time to a living resource that grows more valuable with every interaction."
  },

  // Agent System content
  agentSystem: {
    title: "Multi-Agent Collaboration",
    description: "The Brain Garden system supports multiple specialized AI agents that work together as a coordinated team.",
    introduction: "Traditional AI assistants are like having a single junior developer who can help with individual tasks. The Multi-Agent Collaboration system transforms this model by giving you an entire team of specialized AI agents, each with their own expertise and focus. Instead of working with a single AI assistant, you coordinate specialized AI teams that work in parallel on different aspects of your project.",
    processDescription: "The AgentSpecialization interface defines different agent roles such as Architect (focusing on backend, system design, and database schemas), AI Specialist (handling machine learning integration, prompt engineering, and training pipelines), and Frontend Lead (developing user interfaces, managing state, and ensuring accessibility). These specialized agents collaborate through a central system, ensuring coordinated development efforts.",
    realWorldExample: [
      "Architect agent designs system architecture",
      "Frontend Lead agent implements UI components",
      "AI Specialist agent integrates machine learning models",
      "Agents coordinate through shared knowledge base",
      "Results are validated for consistency before integration"
    ],
    benefits: [
      "Specialized expertise for different aspects of development",
      "Parallel work on multiple project components",
      "Consistent quality through coordinated efforts",
      "Reduced coordination overhead"
    ],
    conclusion: "The Multi-Agent Collaboration system doesn't just make individual developers more productive—it transforms how your entire team works together. By coordinating specialized AI teams that work in parallel, it enables true scale in development that wasn't possible before."
  },

  // Integration System content
  integrationSystem: {
    title: "Task Management & GitHub Integration",
    description: "A hierarchical task management system that keeps AI agents focused and coordinates with GitHub.",
    introduction: "For AI to truly transform development, it needs to integrate deeply with your existing tools and workflows. The Task Management system breaks down projects into milestones, features, and subtasks, assigning them to specific agents. Crucially, this system integrates with GitHub, creating a transparent and trackable development process.",
    workflowDescription: "The GitHubSync and EnhancedGitHubSync interfaces define how different task types map to GitHub entities like projects, issues, and milestones. This includes configuration for project boards, pull request templates, and milestone tracking. The TaskSyncAutomation interface demonstrates how actions like completing a task can trigger updates to GitHub issues and notify dependent agents.",
    developerStart: [
      "Project plan is broken down into tasks",
      "Tasks are assigned to specialized agents",
      "GitHub issues and projects are created",
      "Agents begin work with full context"
    ],
    duringDevelopment: [
      "Progress is tracked in GitHub",
      "Dependencies between tasks are managed",
      "Automated validation ensures quality",
      "Pull requests include AI review checklists"
    ],
    codeIntegration: [
      "Completed code is validated before integration",
      "Pull requests are automatically created",
      "Documentation is generated",
      "Knowledge base is updated"
    ],
    conclusion: "The Task Management and GitHub Integration system ensures that AI-assisted development is transparent, trackable, and integrated with your existing workflows. This creates a seamless experience that enhances productivity without disrupting your team's established practices."
  },

  // Security and Control content
  securityControl: {
    title: "Automated Validation & Testing",
    description: "Comprehensive validation pipelines ensure AI-generated code meets quality standards:",
    introduction: "For AI-generated code to be truly useful, it must meet the same quality standards as human-written code. The AIValidationPipeline interface defines a comprehensive system for validating and testing code before it's integrated into your project.",
    accessControl: [
      "Type checking with TypeScript validator",
      "Linting with ESLint",
      "Security scanning for vulnerabilities",
      "Performance metrics analysis"
    ],
    knowledgeProtection: [
      "Unit tests execution",
      "Integration tests validation",
      "Optional end-to-end testing",
      "Bundle size monitoring"
    ],
    integrationSecurity: [
      "Accessibility checks",
      "Code quality metrics",
      "Documentation verification",
      "Dependency validation"
    ],
    conclusion: "With Automated Validation and Testing, you can trust that AI-generated code meets your quality standards before it even reaches human review. This ensures consistent quality while still enabling the full power of AI-assisted development."
  },

  // Performance and Scalability content
  performanceScalability: {
    title: "Atomic Design for AI Prompts",
    description: "Applying atomic design principles to AI prompts for better reusability and consistency:",
    introduction: "The PromptLibrary interface organizes AI prompts using atomic design principles, creating a structured approach to prompt management that improves consistency and reusability.",
    architectureDescription: "The prompt library is organized into atoms (basic, fundamental prompts), molecules (prompts that combine multiple atoms), organisms (complex prompts for implementing entire features), templates (reusable project-specific prompt patterns), and pages (prompts for generating complete solutions). This hierarchical structure makes prompts easier to maintain and ensures consistent AI output.",
    benefits: [
      "Reusable prompt components",
      "Consistent AI output",
      "Easier prompt maintenance",
      "Scalable prompt architecture"
    ],
    conclusion: "By applying atomic design principles to AI prompts, the Brain Garden system creates a scalable, maintainable approach to prompt management. This ensures consistent, high-quality AI output that aligns with your project's specific needs."
  },

  // Result content
  result: {
    title: "CLI & Standards System",
    description: "Practical tools for implementing and enforcing the Brain Garden system:",
    introduction: "The BrainGardenCLI interface defines a command-line interface that provides tools for initializing projects, managing prompts, monitoring files, and enforcing coding standards. This makes the Brain Garden system practical and enforceable in real-world development environments.",
    benefits: [
      "Project initialization tools",
      "Interactive mode for development",
      "Prompt management utilities",
      "File monitoring capabilities",
      "Standards enforcement"
    ],
    conclusion: "The CLI and Standards System provides the practical tools needed to implement the Brain Garden approach in your development workflow. It includes integrated testing standards, refactoring guidelines, and documentation standards that ensure consistent quality across your project.",
    transformationNote: "The Brain Garden system provides a framework for systematically integrating AI into the development process, turning AI tools from potentially disruptive forces into valuable team members. It emphasizes knowledge management, context awareness, automation, and continuous improvement.",
    impactStory: "In essence, the Brain Garden system transforms how development teams work with AI. By creating project-specific knowledge bases, enabling multi-agent collaboration, integrating with existing tools, automating validation, and providing practical implementation tools, it creates a comprehensive approach to AI-assisted development that enhances productivity while maintaining quality and consistency."
  }
}; 