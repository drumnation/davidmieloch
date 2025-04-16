import { ReactNode } from 'react';

/**
 * Props for the SectionHeading component
 */
export interface SectionHeadingProps {
  /**
   * Icon element to display
   */
  icon: ReactNode;
  
  /**
   * Section title text
   */
  title: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
} 