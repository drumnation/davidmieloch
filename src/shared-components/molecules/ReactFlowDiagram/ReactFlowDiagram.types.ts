export interface ReactFlowDiagramProps {
  /**
   * The diagram definition, can be either a Mermaid string (for backward compatibility)
   * or a ReactFlow node/edge structure
   * In the POC, this is optional as we're using hardcoded examples
   */
  definition?: string | ReactFlowDefinition;
  
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
   * Whether the diagram should be responsive
   * @default true
   */
  responsive?: boolean;

  /**
   * Whether to show zoom controls
   * @default false
   */
  showZoomControls?: boolean;
  
  /**
   * Whether to show the background dot grid
   * @default false
   */
  showBackground?: boolean;

  /**
   * Description for screen readers to describe the diagram
   * @default ''
   */
  accessibilityDescription?: string;

  /**
   * Parse mode - whether to parse Mermaid syntax or use direct ReactFlow input
   * @default 'auto'
   */
  parseMode?: 'mermaid' | 'reactflow' | 'auto';
  
  /**
   * Custom options to pass to ReactFlow
   */
  customOptions?: {
    nodesDraggable?: boolean;
    nodesConnectable?: boolean;
    elementsSelectable?: boolean;
    zoomOnScroll?: boolean;
    panOnScroll?: boolean;
    panOnDrag?: boolean;
    preventScrolling?: boolean;
    [key: string]: unknown;
  };
}

/**
 * React Flow specific types
 */
export interface ReactFlowNode {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: {
    label: string;
    [key: string]: unknown;
  };
  style?: React.CSSProperties;
  className?: string;
}

export interface ReactFlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  animated?: boolean;
  className?: string;
}

export interface ReactFlowDefinition {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  nodeBackgroundColor: string;
  nodeBorderColor: string;
  edgeColor: string;
  labelColor: string;
}

/**
 * Props for container styled component
 */
export interface DiagramContainerProps {
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
} 