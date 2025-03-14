export interface TechnicalImplementationProps {
  className?: string;
  title?: string;
  subtitle?: string;
  systemOverviewDiagram?: string;
  agentSystemDiagram?: string;
  integrationSystemDiagram?: string;
  knowledgeFlowDiagram?: string;
  performanceScalabilityDiagram?: string;
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
  };
  performanceScalability?: {
    title: string;
    description: string;
    benefits: string[];
  };
  result?: {
    title: string;
    description: string;
    benefits: string[];
    conclusion: string;
    transformationNote: string;
  };
}