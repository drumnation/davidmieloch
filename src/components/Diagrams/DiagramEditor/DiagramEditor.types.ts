import { Node, Edge, Viewport } from '@xyflow/react';
import { ReactNode } from 'react';

/**
 * Base interface for diagram node data
 */
export interface BaseDiagramNodeData {
  label: string;
  icon?: ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

/**
 * Base interface for node position data
 */
export interface NodePosition {
  id: string;
  position: {
    x: number;
    y: number;
  };
}

/**
 * Properties for the DiagramEditor component
 */
export interface DiagramEditorProps {
  /**
   * The nodes to display in the diagram
   */
  nodes: Node[];
  
  /**
   * The edges to connect nodes
   */
  edges: Edge[];
  
  /**
   * Node types for the diagram
   */
  nodeTypes: Record<string, React.ComponentType<any>>;
  
  /**
   * Width of the diagram container
   * @default "898px"
   */
  width?: string | number;
  
  /**
   * Height of the diagram container
   * @default "798px"
   */
  height?: string | number;
  
  /**
   * Background color of the diagram container
   * @default "#f9f9f9"
   */
  backgroundColor?: string;
  
  /**
   * Background color of the header
   * @default "#1e293b"
   */
  headerBackgroundColor?: string;
  
  /**
   * Title for the diagram
   */
  title?: string;
  
  /**
   * Description for the diagram
   */
  description?: string;
  
  /**
   * Initial zoom level
   * @default 0.65
   */
  initialZoom?: number;
  
  /**
   * Initial position of the viewport
   * @default { x: 0, y: 0 }
   */
  initialPosition?: { x: number, y: number };
  
  /**
   * Maximum zoom level
   * @default 5
   */
  maxZoom?: number;
  
  /**
   * Minimum zoom level
   * @default 0.1
   */
  minZoom?: number;
  
  /**
   * Whether to show the edit controls
   * Only show in development or Storybook
   * @default false
   */
  showEditControls?: boolean;

  /**
   * Whether this is being used in Storybook
   * When true, it will disable editing features, background dots, and render a cleaner view
   * @default false
   */
  isStorybook?: boolean;
  
  /**
   * Callback when node positions change
   */
  onPositionsChange?: (positions: NodePosition[]) => void;
  
  /**
   * Optional classname for styling
   */
  className?: string;
  
  /**
   * Accessibility description for the diagram
   */
  accessibilityDescription?: string;

  /**
   * Container class name for client wrapper
   */
  containerClassName?: string;
} 