/**
 * Props for the KnowledgeSystemDiagram component
 */
export interface KnowledgeSystemDiagramProps {
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
   * Can be a string (e.g., '400px') or a number of pixels
   * @default '400px'
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
   * @default 'Knowledge System Diagram showing the flow from Developer Action to Team Benefits through Knowledge Capture, Analysis, and Shared Understanding'
   */
  accessibilityDescription?: string;
  
  /**
   * Optional title for the diagram
   * @default 'Knowledge System Flow'
   */
  title?: string;

  /**
   * Enable debug mode with console logging for troubleshooting
   * @default false
   */
  debug?: boolean;
} 