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
  dagreGraph.setGraph({ rankdir: 'TB', ranksep: 80, nodesep: 40 });

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

  // Vertical and horizontal offsets for different components
  const vOffset = 100; 
  const hOffsetKS = -300; // Skill Jack System (left)
  const hOffsetPS = 0;    // Prompt System (center)
  const hOffsetSD = 300;  // Structured Documentation (right)
  const hOffsetRS = 150;  // Rules System (offset from center-right)
  const vOffsetRS = 180;  // Rules System (lower than other systems)
  const hOffsetPM = -150; // Project Management (offset from center-left)
  const vOffsetPM = 180;  // Project Management (lower than other systems)
  const hOffsetWS = 0;    // Watchers System (center bottom)
  const vOffsetWS = 300;  // Watchers System (lowest tier)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const position = {
      x: nodeWithPosition.x - nodeWithPosition.width / 2,
      y: nodeWithPosition.y - nodeWithPosition.height / 2,
    };

    // Apply offsets to create pyramid structure
    if (node.id === 'KS') {
      // Move Skill Jack System down and left
      position.y += vOffset;
      position.x += hOffsetKS;
    } else if (node.id === 'PS') {
      // Move Prompt System to center
      position.y += vOffset;
      position.x += hOffsetPS;
    } else if (node.id === 'SD') {
      // Move Structured Documentation down and right
      position.y += vOffset;
      position.x += hOffsetSD;
    } else if (node.id === 'RS') {
      // Position Rules System below and to the right of the center
      position.y += vOffsetRS;
      position.x += hOffsetRS;
    } else if (node.id === 'PM') {
      // Position Project Management below and to the left of the center
      position.y += vOffsetPM;
      position.x += hOffsetPM;
    } else if (node.id === 'WS') {
      // Position Watchers System at the bottom center
      position.y += vOffsetWS;
      position.x += hOffsetWS;
    } else if (['K1', 'K2', 'K3'].includes(node.id)) {
      // Adjust Skill Jack System children
      position.y += vOffset + 80;
      position.x += hOffsetKS / 1.1;
    } else if (['P1', 'P2', 'P3'].includes(node.id)) {
      // Adjust Prompt System children
      position.y += vOffset + 80;
      position.x += hOffsetPS;
    } else if (['D1', 'D2', 'D3'].includes(node.id)) {
      // Adjust Structured Documentation children
      position.y += vOffset + 80;
      position.x += hOffsetSD / 1.1;
    } else if (['R1', 'R2', 'R3'].includes(node.id)) {
      // Adjust Rules System children
      position.y += vOffsetRS + 80;
      position.x += hOffsetRS / 1.1;
    } else if (['PM1', 'PM2', 'PM3', 'PM4', 'PM5'].includes(node.id)) {
      // Adjust Project Management children
      position.y += vOffsetPM + 80;
      position.x += hOffsetPM / 1.1;
      
      // Add a specific offset for each child to avoid overlap since there are 5 children
      if (node.id === 'PM1') position.x -= 80;
      if (node.id === 'PM2') position.x -= 40;
      if (node.id === 'PM3') position.x += 0;
      if (node.id === 'PM4') position.x += 40;
      if (node.id === 'PM5') position.x += 80;
    } else if (['WS1', 'WS2', 'WS3'].includes(node.id)) {
      // Adjust Watchers System children
      position.y += vOffsetWS + 80;
      
      // Spread the children horizontally
      if (node.id === 'WS1') position.x -= 160;
      if (node.id === 'WS2') position.x += 0;
      if (node.id === 'WS3') position.x += 160;
    } else if (node.id === 'BG') {
      // Adjust Brain Directory position to be more visible
      position.y -= 30;
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
      x: node.position.x - 20, // Less horizontal adjustment to expand diagram width
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
        strokeWidth: 6, // Increased from 5 for better visibility
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
  if (source === 'RS') return '#9c27b0';
  if (source === 'PM') return '#ff9800';
  if (source === 'WS') return '#00bcd4';
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
    zoom: 0.55, // Adjusted zoom level to fit all components with the new Watchers System pillar
    duration: 500
  };
}; 