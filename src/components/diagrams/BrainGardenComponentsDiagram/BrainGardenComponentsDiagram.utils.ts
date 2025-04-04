import dagre from 'dagre';
import { CustomNode, CustomEdge } from './BrainGardenComponentsDiagram.types';

interface LayoutResult {
  nodes: CustomNode[];
  edges: CustomEdge[];
}

/**
 * Uses the Dagre library to arrange nodes in a hierarchical layout
 * and applies custom positioning adjustments for a pyramid structure
 */
export const getLayoutedElements = (nodes: CustomNode[], edges: CustomEdge[]): LayoutResult => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  // Use tighter spacing to fit within the container
  dagreGraph.setGraph({ rankdir: 'TB', ranksep: 80, nodesep: 50 });

  nodes.forEach((node) => {
    let width = 160;
    let height = 50;

    if (node.type === 'mainComponent') {
      width = 200;
      height = 70;
    } else if (node.type === 'subComponent') {
      width = 140;
      height = 40;
    } else if (node.type === 'system') {
      width = 180;
      height = 60;
    }

    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // Vertical and horizontal offsets for pyramid layout
  // Adjusted to better match the screenshot
  const vOffset = 100; 
  const hOffsetKS = -220; // Move Knowledge System more to the left
  const hOffsetSD = 220; // Move Structured Documentation more to the right

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const position = {
      x: nodeWithPosition.x - nodeWithPosition.width / 2,
      y: nodeWithPosition.y - nodeWithPosition.height / 2,
    };

    // Apply offsets to create pyramid structure
    if (node.id === 'KS') {
      // Move Knowledge System down and left
      position.y += vOffset;
      position.x += hOffsetKS;
    } else if (node.id === 'SD') {
      // Move Structured Documentation down and right
      position.y += vOffset;
      position.x += hOffsetSD;
    } else if (['K1', 'K2', 'K3'].includes(node.id)) {
      // Adjust Knowledge System children
      position.y += vOffset + 80;
      position.x += hOffsetKS / 1.2;
    } else if (['D1', 'D2', 'D3'].includes(node.id)) {
      // Adjust Structured Documentation children
      position.y += vOffset + 80;
      position.x += hOffsetSD / 1.2;
    } else if (['P1', 'P2', 'P3'].includes(node.id)) {
      // Adjust Prompt System children - more vertical spacing
      position.y += 80;
    }

    return {
      ...node,
      position,
    };
  });

  // Ensure edges retain their style, including strokeWidth
  const layoutedEdges = edges.map(edge => ({ ...edge }));

  return { nodes: layoutedNodes, edges: layoutedEdges };
};

/**
 * Adjust node positions to fit better in the container
 */
export const adjustNodePositions = (nodes: CustomNode[]): CustomNode[] => {
  return nodes.map(node => ({
    ...node,
    position: {
      x: node.position.x - 80, // Less horizontal adjustment
      y: node.position.y,
    }
  }));
};

/**
 * Enhance edges by increasing stroke width
 */
export const enhanceEdgeVisibility = (edges: CustomEdge[]): CustomEdge[] => {
  return edges.map(edge => {
    const baseStyle = edge.style || {};
    const strokeColor = baseStyle.stroke || getEdgeColorBySource(edge.source);
    
    return {
      ...edge,
      style: {
        ...baseStyle,
        strokeWidth: 3, // Slightly thinner lines than before
        stroke: strokeColor,
      }
    };
  });
};

/**
 * Get edge color based on source node
 */
const getEdgeColorBySource = (source: string): string => {
  if (source === 'BG') return '#6772e5';
  if (source === 'KS') return '#4a6bff';
  if (source === 'PS') return '#47b881';
  if (source === 'SD') return '#ec815e';
  return '#aaa';
};

/**
 * Get theme styles based on theme name
 */
export const getThemeStyles = (theme: string): Record<string, string> => {
  if (theme === 'dark') {
    return {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
    };
  }
  return {};
};

/**
 * Get center view options based on container dimensions
 */
export const getCenterViewOptions = () => {
  return {
    zoom: 0.5, // Lower zoom to fit more content
    duration: 500
  };
}; 