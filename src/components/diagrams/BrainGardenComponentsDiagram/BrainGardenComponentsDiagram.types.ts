import { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';
import React from 'react';

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
  width?: string | number;
  
  /**
   * Optional height for the diagram container
   * @default '600px'
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
   * Whether nodes can be dragged by the user
   * @default false
   */
  nodesDraggable?: boolean;

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

  /**
   * Enable debug mode with console logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Custom node data interface with index signature
 */
export interface CustomNodeData extends Record<string, unknown> { 
  label: string;
  icon?: string;
  style?: React.CSSProperties;
}

/**
 * Internal props for the DiagramFlow component
 */
export interface DiagramFlowProps extends BrainGardenComponentsDiagramProps {}

/**
 * Theme style configuration
 */
export interface ThemeStyles {
  backgroundColor?: string;
  color?: string;
}

// Export custom node and edge types for better type safety across files
export type CustomNode = ReactFlowNode<CustomNodeData>;
export type CustomEdge = ReactFlowEdge;
