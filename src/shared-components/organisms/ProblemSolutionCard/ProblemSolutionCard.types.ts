export interface ProblemSolutionCardProps {
  /**
   * The problem statement to be displayed
   */
  problem: string;
  
  /**
   * The solution description
   */
  solution: string;
  
  /**
   * The impact statement showing the solution's effect
   */
  impact: string;
  
  /**
   * Icon name from Tabler icons
   */
  icon?: string;
  
  /**
   * Visual style variant of the card
   */
  variant?: 'gradient' | 'accent';
  
  /**
   * Optional className for styling
   */
  className?: string;
} 