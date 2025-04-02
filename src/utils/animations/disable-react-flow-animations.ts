/**
 * Utility to disable animations in React Flow
 * 
 * This file contains functions to help prevent Maximum Call Stack Size errors 
 * in React Flow by disabling animations and modifying react-spring behavior.
 */

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
    attributionPosition: 'hidden',
    minZoom: 0.5,
    maxZoom: 1.5,
    nodeExtent: [
      [0, 0],
      [1000, 1000],
    ],
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

// Export a combined function for convenience
export const safeReactFlowSetup = () => {
  disableReactFlowAnimations();
  return getNoAnimationOptions();
}; 