import { ReactNode } from 'react';

export interface DiagramClientWrapperProps {
  /**
   * The diagram component(s) to render
   */
  children: ReactNode;
  
  /**
   * Optional className for custom styling
   */
  className?: string;
  
  /**
   * Optional title to display above the diagram
   */
  title?: string;
  
  /**
   * Optional description to display above the diagram
   */
  description?: string;
  
  /**
   * Whether to show a shadow around the diagram container
   * @default true
   */
  shadow?: boolean;
  
  /**
   * Background color of the diagram container
   * @default "white"
   */
  backgroundColor?: string;
  
  /**
   * Padding around the diagram
   * @default "1rem"
   */
  padding?: string;
  
  /**
   * Border radius of the diagram container
   * @default "8px"
   */
  borderRadius?: string;
} 