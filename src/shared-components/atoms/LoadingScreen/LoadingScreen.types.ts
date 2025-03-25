import { SpinnerSize } from '../Spinner';

export interface LoadingScreenProps {
  /**
   * Text to display below the spinner (optional)
   */
  text?: string;
  
  /**
   * Size of the spinner
   * @default 'large'
   */
  spinnerSize?: SpinnerSize;
  
  /**
   * Custom color for the spinner
   */
  spinnerColor?: string;
  
  /**
   * Minimum height of the loading container
   * @default '100vh'
   */
  minHeight?: string;
  
  /**
   * Additional class name
   */
  className?: string;
} 