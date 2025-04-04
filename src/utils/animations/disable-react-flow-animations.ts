/**
 * Utility to disable animations in React Flow
 * 
 * This file contains functions to help prevent Maximum Call Stack Size errors 
 * in React Flow by disabling animations and modifying react-spring behavior.
 */
import { Node, Edge } from '@xyflow/react';

// CSS Overrides for React Flow
export const createNoAnimationStyles = (): HTMLStyleElement => {
  const styleElement = document.createElement('style');
  styleElement.id = 'no-animation-styles';
  styleElement.innerHTML = `
    /* Global disabling of all transitions and animations within React Flow */
    .react-flow,
    .react-flow *,
    .react-flow__node,
    .react-flow__edge,
    .react-flow__handle,
    .react-flow__viewport,
    .react-flow__controls,
    .react-flow__background {
      transition: none !important;
      animation: none !important;
      transform-transition: none !important;
      will-change: auto !important;
      transform-style: flat !important;
      transform-origin: 0 0 !important;
    }
    
    /* Ensure no transforms on edges */
    .react-flow__edge-path {
      transition: none !important;
      animation: none !important;
    }
    
    /* Disable all pointer events except on handles and controls */
    .react-flow__node:not(.react-flow__handle):not(.react-flow__controls) {
      pointer-events: all !important;
    }
  `;
  return styleElement;
};

// Inject styles to disable animations
export const disableReactFlowAnimations = () => {
  if (typeof window !== 'undefined') {
    // Check if styles already exist
    if (!document.getElementById('no-animation-styles')) {
      const styleElement = createNoAnimationStyles();
      document.head.appendChild(styleElement);
      console.log('[ReactFlowDebugger] Injected no-animation styles to help prevent Maximum Call Stack Size errors');
    }
  }
};

// Configure options to disable animations in React Flow
export const getNoAnimationOptions = () => {
  return {
    fitViewOptions: {
      duration: 0,
      padding: 0.1,
    },
    defaultEdgeOptions: {
      animated: false,
      style: {
        strokeWidth: 1.5,
      },
    },
    panOnDrag: false,
    zoomOnScroll: false,
    zoomOnPinch: false,
    nodesDraggable: false,
    snapToGrid: true,
    minZoom: 0.5,
    maxZoom: 1.5,
    nodeExtent: [
      [0, 0] as [number, number],
      [1000, 1000] as [number, number]
    ] as [[number, number], [number, number]],
  };
};

// Diagnostic function to help identify issues
export const diagnoseReactFlowIssues = () => {
  if (typeof window !== 'undefined') {
    console.log('[ReactFlowDebugger] Diagnosing potential React Flow animation issues');
    
    // Inject diagnostic styles
    const diagnosticStyles = `
      .react-flow__node {
        border: 1px solid red !important;
      }
      .react-flow__edge {
        stroke: blue !important;
      }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'react-flow-diagnostic-styles';
    styleElement.innerHTML = diagnosticStyles;
    document.head.appendChild(styleElement);
    
    // Log useful information
    console.log('[ReactFlowDebugger] React Flow version:', (window as any).ReactFlowVersion || 'Unknown');
    console.log('[ReactFlowDebugger] Number of nodes:', document.querySelectorAll('.react-flow__node').length);
    console.log('[ReactFlowDebugger] Number of edges:', document.querySelectorAll('.react-flow__edge').length);
    
    return {
      cleanup: () => {
        const diagnosticElement = document.getElementById('react-flow-diagnostic-styles');
        if (diagnosticElement) {
          diagnosticElement.remove();
        }
      }
    };
  }
  
  return { cleanup: () => {} };
};

/**
 * Layout nodes and edges in a more organized way
 * This helper function can be used to automatically arrange nodes in a graph
 */
export const getLayoutedElements = <T extends Record<string, unknown>>(
  nodes: Node<T>[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB',
  nodeWidth = 200,
  nodeHeight = 80
): { nodes: Node<T>[]; edges: Edge[] } => {
  // Return original elements if no nodes
  if (!nodes || nodes.length === 0) {
    return { nodes, edges };
  }

  // Basic grid layout implementation
  const spacing = direction === 'TB' ? { x: nodeWidth * 1.5, y: nodeHeight * 2 } : { x: nodeWidth * 2, y: nodeHeight * 1.5 };
  
  // Create a copy of nodes to avoid mutating the original
  const layoutedNodes = nodes.map((node, index) => {
    // If node already has a position, leave it as is
    if (node.position && typeof node.position.x === 'number' && typeof node.position.y === 'number') {
      return node;
    }
    
    // Calculate position based on index
    const column = direction === 'TB' ? index % 3 : Math.floor(index / 3);
    const row = direction === 'TB' ? Math.floor(index / 3) : index % 3;
    
    return {
      ...node,
      position: {
        x: column * spacing.x,
        y: row * spacing.y
      }
    };
  });
  
  return { nodes: layoutedNodes, edges };
};

// Export a combined function for convenience
export const safeReactFlowSetup = () => {
  disableReactFlowAnimations();
  return getNoAnimationOptions();
}; 