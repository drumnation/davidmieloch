/**
 * Props for the AgentSystemDiagram component
 */
export interface AgentSystemDiagramProps {
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
  width?: string | number;
  
  /**
   * Optional height for the diagram container
   * @default '500px'
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
   * @default 'Agent System Diagram showing the workflow from Task to Integration through Analysis, Planning, Distribution, and Results'
   */
  accessibilityDescription?: string;
  
  /**
   * Optional title for the diagram
   * @default 'Agent System Workflow'
   */
  title?: string;
  
  /**
   * Enable debug mode with console logging
   * @default false
   */
  debug?: boolean;
} 