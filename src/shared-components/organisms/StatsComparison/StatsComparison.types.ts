export interface ComparisonItem {
  /**
   * The metric being compared
   */
  metric: string;
  
  /**
   * The current state or value of the metric
   */
  current: string;
  
  /**
   * The impact or consequence of the current state
   */
  impact: string;
}

export interface StatsComparisonProps {
  /**
   * Array of comparison items to display
   */
  comparisons: ComparisonItem[];
  
  /**
   * Visual style of the comparison cards
   */
  style?: 'gradient-cards' | 'accent-cards' | 'default';
  
  /**
   * Position of the component in the layout
   */
  position?: 'right' | 'left' | 'center' | 'full-width';
  
  /**
   * Optional className for styling
   */
  className?: string;
} 