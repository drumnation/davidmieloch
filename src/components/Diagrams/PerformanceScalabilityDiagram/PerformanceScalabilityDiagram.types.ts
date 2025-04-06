/**
 * Props for the PerformanceScalabilityDiagram component
 */
export interface PerformanceScalabilityDiagramProps {
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
   * @default '500px'
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
   * @default 'Performance Scalability Diagram showing Distribution, Caching, and Optimization strategies'
   */
  accessibilityDescription?: string;
  
  /**
   * Optional title for the diagram
   * @default 'Performance and Scalability'
   */
  title?: string;
} 