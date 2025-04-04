import { Node, Edge, NodeProps } from '@xyflow/react';
import React from 'react';

/**
 * Props for the SoftwareEngineeringMeceDiagram component
 */
export interface SoftwareEngineeringMeceDiagramProps {
  /**
   * Optional CSS class name for styling the container
   */
  className?: string;
  
  /**
   * Optional theme for the diagram
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
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
   * @default 'Software Engineering MECE Diagram showing distinct layers and components with clear boundaries and comprehensive coverage'
   */
  accessibilityDescription?: string;
  
  /**
   * Optional title for the diagram
   * @default 'Software Engineering MECE Organization'
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
export interface CustomNodeData {
  label: string;
  icon?: string;
  [key: string]: any;
}

/**
 * Internal props for the DiagramFlow component
 */
export interface DiagramFlowProps extends SoftwareEngineeringMeceDiagramProps {}

/**
 * Theme style configuration
 */
export interface ThemeStyles {
  background: string;
  nodeBorder: string;
  nodeBackground: string;
  nodeText: string;
  edgeStroke: string;
  mainComponentColor: string;
  categoryColor: string;
  itemColor: string;
}

// Custom node type as an extension of the standard Node type
export type CustomNode = Node<CustomNodeData>;

// Custom edge type extending the React Flow Edge type
export type CustomEdge = Edge;

// Props for node components
export type CustomNodeProps = NodeProps<CustomNodeData>; 