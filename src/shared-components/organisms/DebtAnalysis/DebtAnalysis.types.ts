export interface DebtCategory {
  /**
   * The title of the debt category
   */
  title: string;
  
  /**
   * The current state or description of the debt
   */
  current_state: string;
  
  /**
   * The impact or consequence of the debt
   */
  impact: string;
}

export interface DebtAnalysisProps {
  /**
   * Optional title for the debt analysis section
   */
  title?: string;

  /**
   * Array of debt categories to display
   */
  categories: DebtCategory[];
  
  /**
   * Visual style of the cards
   */
  style?: 'accent-cards' | 'gradient-cards' | 'default';
  
  /**
   * Position of the component in the layout
   */
  position?: 'full-width' | 'left' | 'right' | 'center';
  
  /**
   * Optional className for styling
   */
  className?: string;
} 