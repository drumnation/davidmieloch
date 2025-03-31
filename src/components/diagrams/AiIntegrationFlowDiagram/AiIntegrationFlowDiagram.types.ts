/**
 * Props for the AiIntegrationFlowDiagram component
 */
export interface AiIntegrationFlowDiagramProps {
  /**
   * The title of the diagram
   */
  title?: string;
  
  /**
   * Description text for the diagram
   */
  description?: string;
  
  /**
   * CSS class name for the diagram container
   */
  className?: string;
  
  /**
   * Visual theme for the diagram
   */
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  
  /**
   * Width of the diagram container
   */
  width?: string;
  
  /**
   * Height of the diagram container
   */
  height?: string;
  
  /**
   * Whether to show zoom controls
   */
  showZoomControls?: boolean;
  
  /**
   * Description for accessibility
   */
  accessibilityDescription?: string;
} 