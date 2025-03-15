export interface CaseStudyProps {
  title: string;
  challenge: string;
  solution: string;
  results: Array<string>;
  quote: string;
  style?: 'accent-card' | 'gradient-card' | 'default';
  position?: 'right' | 'left' | 'center' | 'full-width';
  className?: string;
} 