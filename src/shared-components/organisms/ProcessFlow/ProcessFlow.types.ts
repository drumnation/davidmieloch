export interface ProcessFlowStep {
  /**
   * The title of the step
   */
  title: string;
  
  /**
   * The description of the step
   */
  description: string;
  
  /**
   * The impact or result of the step (optional)
   */
  impact?: string;
  
  /**
   * Optional icon name to display instead of step number
   */
  icon?: string;
}

export interface ProcessFlowProps {
  /**
   * Title of the process flow section
   */
  title?: string;
  
  /**
   * Subtitle of the process flow section
   */
  subtitle?: string;
  
  /**
   * Array of steps to display in the process flow
   */
  steps: ProcessFlowStep[];
  
  /**
   * Visual style of the process flow
   */
  style?: 'vertical-steps' | 'horizontal-steps';
  
  /**
   * Position of the component in the layout
   */
  position?: 'left' | 'right' | 'center' | 'full-width';
  
  /**
   * Optional className for styling
   */
  className?: string;
} 