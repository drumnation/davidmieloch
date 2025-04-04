/**
 * Props for the GardenMetaphorDiagram component
 */
export interface GardenMetaphorDiagramProps {
  /**
   * Optional title for the diagram
   * @default 'The Garden Metaphor: Growing Your Project'
   */
  title?: string;
  
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
   * @default '600px'
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
   * @default 'Garden Metaphor Diagram showing the three phases of a Brain Garden project\'s growth - from initial setup to self-improving system'
   */
  accessibilityDescription?: string;
} 