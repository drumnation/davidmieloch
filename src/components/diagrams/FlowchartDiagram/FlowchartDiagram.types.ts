import { CSSProperties } from 'react';

/**
 * Theme types for the diagram
 */
export type DiagramTheme = 'default' | 'dark' | 'forest' | 'neutral';

/**
 * Props for the FlowchartDiagram container
 */
export interface DiagramContainerProps {
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
}

/**
 * Props for the FlowchartDiagram component
 */
export interface FlowchartDiagramProps {
  /**
   * Mermaid diagram definition as a string
   */
  definition?: string;
  
  /**
   * CSS class name for the diagram container
   */
  className?: string;
  
  /**
   * Theme for the diagram
   */
  theme?: DiagramTheme;
  
  /**
   * Width of the diagram container
   */
  width?: string;
  
  /**
   * Height of the diagram container
   */
  height?: string;
  
  /**
   * Background color of the diagram container (overrides theme)
   */
  backgroundColor?: string;
  
  /**
   * Whether the diagram should be responsive
   */
  responsive?: boolean;
  
  /**
   * Whether to show zoom controls
   */
  showZoomControls?: boolean;
  
  /**
   * Description for accessibility
   */
  accessibilityDescription?: string;
  
  /**
   * How to parse the mermaid diagram
   */
  parseMode?: 'auto' | 'flowchart' | 'sequence' | 'gantt';
}

/**
 * Node data for the flowchart
 */
export interface FlowchartNodeData {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'top';
  className?: string;
  style?: CSSProperties;
}

/**
 * Edge data for the flowchart
 */
export interface FlowchartEdgeData {
  label?: string;
  animated?: boolean;
  style?: CSSProperties;
} 