import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { CustomNode, CustomEdge } from './SoftwareEngineeringMeceDiagram.types';
import { initialNodes, initialEdges } from './SoftwareEngineeringMeceDiagram.logic';

interface UseSoftwareEngineeringMeceDiagramResult {
  calculateLayout: (nodes: CustomNode[], edges: CustomEdge[]) => {
    layoutedNodes: CustomNode[];
    layoutedEdges: CustomEdge[];
  };
  getInitialData: () => {
    nodes: CustomNode[];
    edges: CustomEdge[];
  };
}

export const useSoftwareEngineeringMeceDiagram = (): UseSoftwareEngineeringMeceDiagramResult => {
  /**
   * Get the initial data with default positioning
   */
  const getInitialData = useCallback(() => {
    return {
      nodes: initialNodes,
      edges: initialEdges,
    };
  }, []);

  /**
   * Calculate diagram layout based on MECE principles
   * - Root node at top
   * - Categories in a row below
   * - Items for each category below their category
   */
  const calculateLayout = useCallback((nodes: CustomNode[], edges: CustomEdge[]) => {
    const layoutedNodes = [...nodes];
    const layoutedEdges = [...edges];
    
    const spacing = {
      verticalGap: 100,
      horizontalGap: 180,
      itemVerticalGap: 70,
      itemHorizontalGap: 150
    };
    
    // Find main node, categories, and items
    const mainNode = layoutedNodes.find((node) => node.id === 'SE');
    const categoryNodes = layoutedNodes.filter((node) => ['UI', 'BL', 'DA', 'IN'].includes(node.id));
    
    // Position the main node at the center top
    if (mainNode) {
      mainNode.position = { x: (categoryNodes.length - 1) * spacing.horizontalGap / 2, y: 0 };
    }
    
    // Position category nodes in a row
    categoryNodes.forEach((node, index) => {
      node.position = { x: index * spacing.horizontalGap, y: spacing.verticalGap };
    });
    
    // Group items by their parent category
    const itemsByCategory: Record<string, CustomNode[]> = {
      'UI': layoutedNodes.filter((node) => node.id.startsWith('UI') && node.id !== 'UI'),
      'BL': layoutedNodes.filter((node) => node.id.startsWith('BL') && node.id !== 'BL'),
      'DA': layoutedNodes.filter((node) => node.id.startsWith('DA') && node.id !== 'DA'),
      'IN': layoutedNodes.filter((node) => node.id.startsWith('IN') && node.id !== 'IN'),
    };
    
    // Position items under their respective categories
    Object.entries(itemsByCategory).forEach(([categoryId, items]) => {
      const categoryNode = categoryNodes.find((node) => node.id === categoryId);
      if (!categoryNode) return;
      
      items.forEach((item, itemIndex) => {
        const categoryIndex = categoryNodes.findIndex((node) => node.id === categoryId);
        item.position = { 
          x: categoryIndex * spacing.horizontalGap, 
          y: spacing.verticalGap * 2 + itemIndex * spacing.itemVerticalGap 
        };
      });
    });
    
    return { layoutedNodes, layoutedEdges };
  }, []);

  return {
    calculateLayout,
    getInitialData,
  };
};

export default useSoftwareEngineeringMeceDiagram; 