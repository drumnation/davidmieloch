export interface ResultSectionProps {
  className?: string;
  result: {
    title: string;
    description: string;
    benefits: string[];
    conclusion: string;
    transformationNote: string;
  };
} 