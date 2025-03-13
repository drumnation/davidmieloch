import { ReactNode } from 'react';

export interface ComparisonItem {
  /**
   * The category or aspect being compared
   */
  category: string;
  
  /**
   * The left side comparison content
   */
  leftContent: string | ReactNode;
  
  /**
   * The right side comparison content
   */
  rightContent: string | ReactNode;
}

export interface ComparisonTableProps {
  /**
   * Title for the left column
   */
  leftTitle: string;
  
  /**
   * Title for the right column
   */
  rightTitle: string;
  
  /**
   * Array of comparison items to display
   */
  items: ComparisonItem[];
  
  /**
   * Visual style variant of the table
   */
  variant?: 'default' | 'gradient' | 'accent';
  
  /**
   * Optional className for styling
   */
  className?: string;
}
