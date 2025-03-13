export interface ProblemSolutionCardProps {
  /**
   * Short category label (e.g. "Metrics", "Accuracy", "Quality")
   */
  slug: string;

  /**
   * The problem statement to be displayed
   */
  problem: string;
  
  /**
   * The solution description
   */
  solution: string;

  /**
   * The impact metric showing the solution's effect
   */
  impact?: {
    value: string;
    label?: string;
  };
  
  /**
   * Icon name from Tabler icons
   */
  icon?: string;
  
  /**
   * Visual style variant of the card
   */
  variant?: 'blue' | 'white';
  
  /**
   * Optional className for styling
   */
  className?: string;
} 