import { ReactNode } from 'react';

/**
 * Props for the CTALink component
 */
export interface CTALinkProps {
  /**
   * The URL to navigate to
   */
  href: string;
  
  /**
   * Type of icon to display
   */
  iconType: string;
  
  /**
   * Text label for the button
   */
  label?: string;
  
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Optional children content
   */
  children?: ReactNode;
  
  /**
   * Additional props
   */
  [x: string]: any;
} 