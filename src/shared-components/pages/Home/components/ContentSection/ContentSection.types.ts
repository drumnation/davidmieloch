import { ReactNode } from 'react';

/**
 * Props for the ContentSection component
 */
export interface ContentSectionProps {
  /**
   * Section content
   */
  children: ReactNode;
  
  /**
   * Optional CSS class name
   */
  className?: string;
  
  /**
   * Optional quote to highlight
   */
  highlightQuote?: string;
} 