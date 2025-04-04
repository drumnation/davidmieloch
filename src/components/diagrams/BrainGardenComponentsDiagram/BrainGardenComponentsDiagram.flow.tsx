'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import {
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import types and utilities
import { DiagramFlowProps } from './BrainGardenComponentsDiagram.types';
import { nodeTypes } from './BrainGardenComponentsDiagram.nodes';
import { initialNodes, initialEdges } from './BrainGardenComponentsDiagram.logic';
import { 
  getLayoutedElements, 
  adjustNodePositions, 
  enhanceEdgeVisibility,
  getThemeStyles,
  getCenterViewOptions
} from './BrainGardenComponentsDiagram.utils';
import { useBrainGardenDiagram } from './BrainGardenComponentsDiagram.hook';

/**
 * Inner flow component that uses the React Flow hooks
 */
const DiagramFlow: React.FC<DiagramFlowProps> = ({
  title,
  className,
  theme = 'default',
  width = '100%', 
  height = '600px',
  showZoomControls = true,
  nodesDraggable = false,
  accessibilityDescription,
  debug = false,
  backgroundColor = '#f9f9f9',
}) => {
  // Custom hook for diagram functionality
  const { updateNodeLabels } = useBrainGardenDiagram();
  
  // Set up React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { setCenter } = useReactFlow();

  // Apply layout and center the diagram
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      [...initialNodes],
      [...initialEdges]
    );

    // Apply position adjustments and edge enhancements
    const adjustedNodes = adjustNodePositions(layoutedNodes);
    const enhancedEdges = enhanceEdgeVisibility(layoutedEdges);
    
    // Update node labels to match the screenshot
    const nodesWithUpdatedLabels = updateNodeLabels(adjustedNodes);

    setNodes(nodesWithUpdatedLabels);
    setEdges(enhancedEdges);

    // Center the view
    setTimeout(() => {
      if (reactFlowWrapper.current) {
        const centerOptions = getCenterViewOptions();
        setCenter(
          reactFlowWrapper.current.clientWidth / 2,
          reactFlowWrapper.current.clientHeight / 2,
          centerOptions
        );
      }
    }, 50);
  }, [initialNodes, initialEdges, setNodes, setEdges, setCenter, updateNodeLabels]);

  // Set color scheme based on theme
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // Render the diagram
  return (
    <div 
      className={`brain-garden-diagram-container ${className || ''}`}
      style={{ 
        position: 'relative',
        width, 
        height,
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: backgroundColor || '#f9f9f9',
        ...themeStyles,
        padding: 0, // Remove padding to maximize space
      }} 
      aria-label={accessibilityDescription}
    >
      {/* Title bar with dark blue background and white text */}
      {title && (
        <div style={{
          textAlign: 'center',
          padding: '12px 0',
          fontSize: '18px',
          fontWeight: 'bold',
          backgroundColor: '#1a365d', // Dark blue background
          color: 'white', // White text
          marginBottom: '0',
          width: '100%'
        }}>
          {title}
        </div>
      )}
      
      {/* Diagram content */}
      <div 
        style={{ 
          width: '100%', 
          height: title ? 'calc(100% - 45px)' : '100%',
          position: 'relative',
        }} 
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.05 }} // Even less padding to maximize space
          nodesDraggable={nodesDraggable}
          nodesConnectable={false}
          elementsSelectable={true}
          zoomOnScroll={showZoomControls}
          zoomOnPinch={showZoomControls}
          panOnScroll={showZoomControls}
          panOnDrag={showZoomControls}
          minZoom={0.3} // Allow more zooming out
          maxZoom={1.5}
          defaultEdgeOptions={{
            style: { strokeWidth: 4 }, // Set default edge style for better visibility
            animated: false,
          }}
        />
      </div>
      
      {/* Dimensions indicator */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '2px 5px',
        fontSize: '10px',
        zIndex: 5
      }}>
        {width} × {height}
      </div>
      
      {debug && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px',
          fontSize: '10px',
          maxHeight: '100px',
          overflow: 'auto',
          zIndex: 5
        }}>
          <pre>
            {JSON.stringify({ nodes, edges }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DiagramFlow; 