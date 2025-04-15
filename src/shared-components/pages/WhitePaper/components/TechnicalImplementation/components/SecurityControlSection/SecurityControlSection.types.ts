export interface TestingExample {
  title: string;
  description: string;
  code: string;
}

export interface SecurityControlSectionProps {
  className?: string;
  securityControl: {
    title: string;
    description: string;
    accessControl: string[];
    knowledgeProtection: string[];
    integrationSecurity: string[];
    testingExample?: TestingExample;
  };
} 