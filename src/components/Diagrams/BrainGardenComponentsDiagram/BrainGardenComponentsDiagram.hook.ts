import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { CustomNodeData } from './BrainGardenComponentsDiagram.types';

/**
 * Custom hook for BrainGardenComponentsDiagram functionality
 */
export const useBrainGardenDiagram = () => {
  /**
   * Updates node labels to match the screenshot (lowercase, etc.)
   */
  const updateNodeLabels = useCallback((nodes: Node<CustomNodeData>[]): Node<CustomNodeData>[] => {
    return nodes.map(node => {
      let updatedLabel = node.data.label;
      
      // Apply specific formatting for certain nodes as seen in the screenshot
      if (node.id === 'BG') {
        updatedLabel = '.brain Directory';
      } else if (node.id === 'KS') {
        updatedLabel = 'Knowledge System';
      } else if (node.id === 'PS') {
        updatedLabel = 'Prompt System';
      } else if (node.id === 'SD') {
        updatedLabel = 'Structured Documentation';
      }
      
      return {
        ...node,
        data: {
          ...node.data,
          label: updatedLabel
        }
      };
    });
  }, []);

  /**
   * Enhances edge styling for better visibility and matches the screenshot
   */
  const enhanceEdges = useCallback((edges: Edge[]): Edge[] => {
    return edges.map(edge => {
      // Get color based on source
      let color = '#6772e5'; // Default color
      
      if (edge.source === 'KS') {
        color = '#4a6bff';
      } else if (edge.source === 'PS') {
        color = '#47b881';
      } else if (edge.source === 'SD') {
        color = '#ec815e';
      }
      
      return {
        ...edge,
        style: {
          ...(edge.style || {}),
          stroke: color,
          strokeWidth: 2,
        }
      };
    });
  }, []);

  return {
    updateNodeLabels,
    enhanceEdges
  };
};

export default useBrainGardenDiagram; 