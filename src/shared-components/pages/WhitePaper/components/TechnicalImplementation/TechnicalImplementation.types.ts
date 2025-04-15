export interface TechnicalImplementationProps {
  className?: string;
  title?: string;
  subtitle?: string;
  systemOverviewDiagram?: string;
  agentSystemDiagram?: string;
  integrationSystemDiagram?: string;
  knowledgeFlowDiagram?: string;
  performanceScalabilityDiagram?: string;
  systemOverview?: {
    introduction?: string;
    promptExample?: {
      title: string;
      description: string;
      prompt: string;
    };
    taskExample?: {
      title: string;
      description: string;
      tasks: string[];
    };
    githubExample?: {
      title: string;
      description: string;
      image: string;
      caption: string;
    };
  };
  knowledgeSystem?: {
    title: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  agentSystem?: {
    title: string;
    description: string;
    realWorldExample: string[];
    benefits: string[];
    examplePrompt?: {
      title: string;
      description: string;
      chat: Array<{
        agent: string;
        message: string;
      }>;
    };
  };
  integrationSystem?: {
    title: string;
    description: string;
    developerStart: string[];
    duringDevelopment: string[];
    codeIntegration: string[];
  };
  securityControl?: {
    title: string;
    description: string;
    accessControl: string[];
    knowledgeProtection: string[];
    integrationSecurity: string[];
    testingExample?: {
      title: string;
      description: string;
      code: string;
    };
  };
  performanceScalability?: {
    title: string;
    description: string;
    benefits: string[];
  };
  result?: {
    title: string;
    description: string;
    introduction?: string;
    cliToolset?: {
      title: string;
      description: string;
      commands?: Array<{
        name: string;
        description: string;
      }>;
    };
    transformationBenefits?: {
      title: string;
      description: string;
      benefits?: Array<{
        area: string;
        from: string;
        to: string;
      }>;
    };
    practicalOutcomes?: string[];
    gardenGrowth?: string;
    benefits?: string[];
    conclusion?: string;
    transformationNote?: string;
  };
}