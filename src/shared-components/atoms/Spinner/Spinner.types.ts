export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps {
  /**
   * Size of the spinner
   * @default 'medium'
   */
  size?: SpinnerSize;
  
  /**
   * Custom color for the spinner. If not provided, will use the theme's primary color
   */
  color?: string;
  
  /**
   * Additional class name for styling
   */
  className?: string;
} 