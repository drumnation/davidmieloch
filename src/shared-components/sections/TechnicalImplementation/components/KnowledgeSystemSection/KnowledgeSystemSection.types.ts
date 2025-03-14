export interface KnowledgeSystemSectionProps {
  className?: string;
  knowledgeSystem: {
    title: string;
    description: string;
    introduction?: string;
    flowDescription?: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    conclusion?: string;
  };
  knowledgeFlowDiagram: string;
} 