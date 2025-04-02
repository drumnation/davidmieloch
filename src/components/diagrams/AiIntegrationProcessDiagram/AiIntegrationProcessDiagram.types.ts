/**
 * Props for the AiIntegrationProcessDiagram component
 */
export interface AiIntegrationProcessDiagramProps {
  /**
   * Optional title to display above the diagram
   */
  title?: string;

  /**
   * Optional description to display below the title
   */
  description?: string;

  /**
   * Optional custom class name
   */
  className?: string;

  /**
   * Theme for the diagram - matches available themes in the MermaidDiagram for compatibility
   */
  theme?: 'default' | 'dark' | 'forest' | 'neutral';

  /**
   * Width of the diagram container
   */
  width?: string | number;

  /**
   * Height of the diagram container
   */
  height?: string | number;

  /**
   * Optional background color for the diagram
   */
  backgroundColor?: string;

  /**
   * Whether to show zoom controls
   */
  showZoomControls?: boolean;

  /**
   * Accessibility description for screen readers
   */
  accessibilityDescription?: string;
  
  /**
   * Optional class name for the container element
   */
  containerClassName?: string;
  
  /**
   * Optional class name for the graph element
   */
  graphClassName?: string;
  
  /**
   * Optional custom nodes to override default nodes
   */
  nodes?: any[];
  
  /**
   * Optional custom edges to override default edges
   */
  edges?: any[];
  
  /**
   * Enable validation of node positions
   */
  nodeValidationEnabled?: boolean;
  
  /**
   * Callback when node positions change
   */
  onNodePositionsChange?: (nodes: any[]) => void;
} 