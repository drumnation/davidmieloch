/**
 * Props for the SystemOverviewDiagram component
 */
export interface SystemOverviewDiagramProps {
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
   * Can be a string (e.g., '100%', '500px') or a number of pixels
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * Optional height for the diagram container
   * Can be a string (e.g., '500px') or a number of pixels
   * @default 'auto'
   */
  height?: string | number;
  
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
   * @default 'Brain Garden System Architecture diagram showing the main system connected to various subsystems including Knowledge System, Prompt System, Agent System, Integration System, and Documentation System.'
   */
  accessibilityDescription?: string;
  
  /**
   * Optional title for the diagram
   * @default 'Brain Garden System Architecture'
   */
  title?: string;

  /**
   * Enable debug mode with console logging for troubleshooting
   * @default false
   */
  debug?: boolean;
} 