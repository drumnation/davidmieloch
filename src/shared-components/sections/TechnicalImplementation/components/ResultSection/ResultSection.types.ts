export interface Command {
  name: string;
  description: string;
}

export interface CliToolset {
  title: string;
  description: string;
  commands?: Command[];
}

export interface TransformationBenefit {
  area: string;
  from: string;
  to: string;
}

export interface TransformationBenefits {
  title: string;
  description: string;
  benefits?: TransformationBenefit[];
}

export interface ResultSectionProps {
  className?: string;
  result: {
    title: string;
    description: string;
    introduction?: string;
    cliToolset?: CliToolset;
    transformationBenefits?: TransformationBenefits;
    practicalOutcomes?: string[];
    gardenGrowth?: string;
    
    // Legacy fields - for backward compatibility
    benefits?: string[];
    conclusion?: string;
    transformationNote?: string;
  };
} 