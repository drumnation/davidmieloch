/**
 * Props for the BrainGardenComponentsDiagram component
 */
export interface BrainGardenComponentsDiagramProps {
  /**
   * Optional CSS class name for styling the container
   */
  className?: string;
  
  /**
   * Optional theme for the diagram
   * @default 'default'
   */
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  
  /**
   * Optional width for the diagram container
   * @default '100%'
   */
  width?: string;
  
  /**
   * Optional height for the diagram container
   * @default 'auto'
   */
  height?: string;
  
  /**
   * Optional background color for the diagram container
   */
  backgroundColor?: string;

  /**
   * Whether to show zoom controls
   * @default true
   */
  showZoomControls?: boolean;

  /**
   * Description for screen readers to describe the diagram
   * @default 'Brain Garden Core Components Diagram showing Knowledge System, Prompt System, and Structured Documentation'
   */
  accessibilityDescription?: string;
  
  /**
   * Optional title for the diagram
   * @default 'Brain Garden Core Components'
   */
  title?: string;
}
