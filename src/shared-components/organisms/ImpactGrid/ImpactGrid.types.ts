export interface ImpactCategory {
  /**
   * The category of impact
   */
  category: string;
  
  /**
   * Array of metrics or data points for this impact category
   */
  metrics: string[];
}

export interface ImpactGridProps {
  /**
   * Array of impact categories to display
   */
  impacts: ImpactCategory[];
  
  /**
   * Visual style of the grid cards
   */
  style?: 'gradient-cards' | 'accent-cards' | 'default';
  
  /**
   * Position of the component in the layout
   */
  position?: 'full-width' | 'left' | 'right' | 'center';
  
  /**
   * Optional className for styling
   */
  className?: string;
} 