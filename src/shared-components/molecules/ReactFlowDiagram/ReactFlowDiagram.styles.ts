import styled, { createGlobalStyle, css } from 'styled-components';
import { DiagramContainerProps } from './ReactFlowDiagram.types';
import { ReactFlow } from '@xyflow/react';
import { ReactFlowProps } from '@xyflow/react';
import { motion } from 'framer-motion';

// Global styles to ensure React Flow nodes display correctly everywhere
export const ReactFlowGlobalStyles = createGlobalStyle`
  /* Global React Flow overrides */
  .react-flow__node {
    overflow: visible !important;
    width: 105% !important; /* Just slightly wider than original */
    transition: none !important; /* Ensure nodes have no transitions */
    animation: none !important;
  }
  
  .react-flow__handle {
    background-color: #555;
    width: 8px;
    height: 8px;
  }
  
  .react-flow__edge,
  .react-flow__edge-path {
    stroke-width: 1.5px;
    transition: none !important; /* Ensure edges have no transitions */
    animation: none !important;
  }
  
  .react-flow__viewport {
    transition: none !important;
    will-change: auto !important;
    transform-origin: 0 0 !important;
  }
  
  /* Hide the dot grid by default */
  .react-flow__background {
    display: none;
  }
  
  /* Class to add when dots are desired */
  .react-flow--with-background .react-flow__background {
    display: block;
  }
  
  /* Over-aggressive attempt to disable *all* transitions/animations within React Flow */
  .react-flow,
  .react-flow * {
    transition-property: none !important;
    transition-duration: 0s !important;
    transition-timing-function: step-end !important;
    transition-delay: 0s !important;
    animation-name: none !important;
    animation-duration: 0s !important;
    animation-timing-function: step-end !important;
    animation-delay: 0s !important;
    will-change: auto !important;
  }
`;

export const DiagramWrapper = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  position: relative;
  overflow: hidden;
`;

// Filter out ReactFlow-specific props to prevent them from being passed to DOM elements
const reactFlowProps = [
  // Core
  'nodes', 'edges', 'nodeTypes', 'edgeTypes',
  // Interaction
  'nodesDraggable', 'nodesConnectable', 'elementsSelectable', 'zoomOnScroll',
  'panOnScroll', 'panOnDrag', 'selectionOnDrag', 'interactive',
  // Viewport & Positioning
  'fitView', 'fitViewOptions', 'defaultViewport', 'minZoom', 'maxZoom',
  'translateExtent', 'nodeExtent',
  // Connections
  'connectionMode', 'connectionLineType', 'connectionLineStyle',
  'connectionRadius', 'isValidConnection',
  // Edge Updates
  'deleteKeyCode', 'selectionKeyCode', 'multiSelectionKeyCode',
  'zoomActivationKeyCode', 'snapToGrid', 'snapGrid',
  // Internal/Advanced - Filter these carefully
  'defaultEdgeOptions', 'defaultViewportTransitionOptions', 'attributionPosition',
  'onlyRenderVisibleElements', 'elevateNodesOnSelect', 'elevateEdgesOnSelect',
  // Event Handlers (should generally be fine, but filter just in case)
  'onNodesChange', 'onEdgesChange', 'onConnect', 'onInit', 'onMove', 'onMoveStart', 'onMoveEnd',
  'onSelectionChange', 'onNodeClick', 'onNodeDoubleClick', 'onNodeDragStart', 'onNodeDrag',
  'onNodeDragStop', 'onNodeContextMenu', 'onNodeMouseEnter', 'onNodeMouseLeave',
  'onEdgeClick', 'onEdgeUpdate', 'onEdgeContextMenu', 'onEdgeMouseEnter', 'onEdgeMouseLeave',
  'onEdgeDoubleClick', 'onEdgeUpdateStart', 'onEdgeUpdateEnd', 'onPaneClick', 'onPaneScroll',
  'onPaneContextMenu',
];

export const StyledReactFlow = styled(ReactFlow as React.ComponentType<ReactFlowProps>).withConfig({
  shouldForwardProp: (prop) => !reactFlowProps.includes(prop as string)
})`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const DiagramContainer = styled.div<{
  $width: string;
  $height: string;
  $backgroundColor: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #666;
  font-size: 14px;
  opacity: 0.7;
`;

export const AccessibilityDescription = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const ZoomButtonsContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  z-index: 10;
`;

export const ZoomButton = styled.button`
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: rgba(255, 74, 74, 0.05);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const ResetButton = styled(motion.button)`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`; 