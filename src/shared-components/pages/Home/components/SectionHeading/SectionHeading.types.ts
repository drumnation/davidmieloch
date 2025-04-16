import { ReactNode } from 'react';

/**
 * Props for the SectionHeading component
 */
export interface SectionHeadingProps {
  /**
   * Content of the heading
   */
  children?: ReactNode;
  
  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional icon to display before the heading
   */
  icon?: string;

  /**
   * Optional title text (alternative to using children)
   */
  title?: string;
} 