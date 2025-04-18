export type SpinnerType = 
  | 'clip' 
  | 'beat' 
  | 'bar' 
  | 'circle' 
  | 'climbing-box'
  | 'hash'
  | 'pulse'
  | 'ring'
  | 'scale';

export interface SpinnerLoaderProps {
  /**
   * The type of spinner to display
   * @default 'clip'
   */
  type?: SpinnerType;
  
  /**
   * The color of the spinner
   * @default '#2196f3'
   */
  color?: string;
  
  /**
   * The size of the spinner in pixels
   * @default 60
   */
  size?: number;
    
  /**
   * Text to display below the spinner
   */
  text?: string;
  
  /**
   * Additional class name
   */
  className?: string;
} 