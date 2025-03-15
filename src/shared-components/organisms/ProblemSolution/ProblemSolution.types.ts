export interface ProblemSolutionProps {
  /**
   * The problem statement
   */
  problem: string;
  
  /**
   * The consequence of the problem
   */
  consequence: string;
  
  /**
   * Array of metrics or data points about the problem
   */
  metrics: string[];
  
  /**
   * Visual style of the card
   */
  style?: 'split-card' | 'default';
  
  /**
   * Position of the component in the layout
   */
  position?: 'right' | 'left' | 'center' | 'full-width';
  
  /**
   * Optional className for styling
   */
  className?: string;
} 