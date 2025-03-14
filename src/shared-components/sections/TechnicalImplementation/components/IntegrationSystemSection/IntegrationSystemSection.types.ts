export interface IntegrationSystemSectionProps {
  className?: string;
  integrationSystem: {
    title: string;
    description: string;
    developerStart: string[];
    duringDevelopment: string[];
    codeIntegration: string[];
  };
  integrationSystemDiagram: string;
} 