'use client';

import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import {
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlow,
  SelectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import types and utilities
import { DiagramFlowProps, NodePosition, CustomEdge } from './BrainGardenComponentsDiagram.types';
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
  initialNodePositions,
  customEdges: externalCustomEdges,
  onNodeClick,
  multiSelectionMode = false,
  selectionOnDrag = false,
  selectionKeys = ['shift'],
  isEdgeCreationMode = false,
}) => {
  // Custom hook for diagram functionality
  const { updateNodeLabels } = useBrainGardenDiagram();
  
  // Set up React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { setCenter } = useReactFlow();

  // Handle node click and forward to parent component
  const handleNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    if (onNodeClick) {
      onNodeClick(node.id);
    }
  }, [onNodeClick]);

  // Apply initial positions from saved layout if provided
  const applyInitialPositions = useCallback((baseNodes: typeof initialNodes) => {
    if (!initialNodePositions || initialNodePositions.length === 0) {
      return baseNodes;
    }

    return baseNodes.map(node => {
      const savedPosition = initialNodePositions.find(pos => pos.id === node.id);
      if (savedPosition) {
        return {
          ...node,
          position: savedPosition.position
        };
      }
      return node;
    });
  }, [initialNodePositions]);

  // Apply custom edges from props
  const applyCustomEdges = useCallback((baseEdges: CustomEdge[]) => {
    if (!externalCustomEdges || externalCustomEdges.length === 0) {
      return baseEdges;
    }

    // Create a set of existing edge IDs to avoid duplicates
    const existingEdgeIds = new Set(baseEdges.map(edge => edge.id));
    
    // Filter custom edges that don't exist in the base edges
    const newCustomEdges = externalCustomEdges
      .filter(edge => !existingEdgeIds.has(edge.id))
      .map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        style: edge.style || { stroke: '#666', strokeWidth: 2 },
      }));

    return [...baseEdges, ...newCustomEdges];
  }, [externalCustomEdges]);

  // Add the onConnect handler
  const onConnect = useCallback((params: any) => {
    // Create a new unique ID for the edge
    const newEdgeId = `edge-${params.source}-${params.target}-${Date.now()}`;
    
    // Create the new edge with appropriate styling based on the source node
    const sourceNode = nodes.find(node => node.id === params.source);
    let edgeStyle = { stroke: '#6772e5', strokeWidth: 2 };
    
    // Apply different colors based on source node (copy from existing edge styles)
    if (sourceNode) {
      if (sourceNode.id === 'KS') edgeStyle = { stroke: '#4a6bff', strokeWidth: 2 };
      else if (sourceNode.id === 'PS') edgeStyle = { stroke: '#47b881', strokeWidth: 2 };
      else if (sourceNode.id === 'SD') edgeStyle = { stroke: '#ec815e', strokeWidth: 2 };
      else if (sourceNode.id === 'RS') edgeStyle = { stroke: '#9c27b0', strokeWidth: 2 };
      else if (sourceNode.id === 'PM') edgeStyle = { stroke: '#ff9800', strokeWidth: 2 };
      else if (sourceNode.id === 'WS') edgeStyle = { stroke: '#00bcd4', strokeWidth: 2 };
    }
    
    // Create the new edge
    const newEdge = {
      id: newEdgeId,
      source: params.source,
      target: params.target,
      style: edgeStyle,
      sourceHandle: params.sourceHandle,
      targetHandle: params.targetHandle
    };
    
    // Add the new edge to the edges state
    setEdges(prevEdges => [...prevEdges, newEdge]);
  }, [nodes, setEdges]);

  // Apply layout and center the diagram
  useEffect(() => {
    let nodesToUse = [...initialNodes];
    
    // First apply any saved positions
    nodesToUse = applyInitialPositions(nodesToUse);
    
    // Only calculate layout if no initialNodePositions were provided
    if (!initialNodePositions || initialNodePositions.length === 0) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodesToUse,
        [...initialEdges]
      );

      // Apply position adjustments and edge enhancements
      nodesToUse = adjustNodePositions(layoutedNodes);
      
      // Update node labels
      nodesToUse = updateNodeLabels(nodesToUse);
      
      // Set the nodes
      setNodes(nodesToUse);
      
      // Apply edge enhancements and custom edges
      let edgesToUse = enhanceEdgeVisibility(layoutedEdges);
      edgesToUse = applyCustomEdges(edgesToUse);
      setEdges(edgesToUse);
    } else {
      // If using initialNodePositions, just update labels and set directly
      nodesToUse = updateNodeLabels(nodesToUse);
      setNodes(nodesToUse);
      
      // Apply edge enhancements and custom edges
      let edgesToUse = enhanceEdgeVisibility([...initialEdges]);
      edgesToUse = applyCustomEdges(edgesToUse);
      setEdges(edgesToUse);
    }

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
  }, [initialNodes, initialEdges, initialNodePositions, externalCustomEdges, setNodes, setEdges, setCenter, updateNodeLabels, applyInitialPositions, applyCustomEdges]);

  // Set color scheme based on theme
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // Render the diagram
  return (
    <div 
      className={`brain-garden-diagram-container ${className || ''}`}
      style={{ 
        position: 'relative',
        width: '100%', 
        height,
        border: 'none',
        borderRadius: '0',
        overflow: 'hidden',
        backgroundColor: backgroundColor || '#f9f9f9',
        ...themeStyles,
        padding: 0, // Remove padding to maximize space
        margin: 0,  // Remove any margin
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
          padding: 0,
          margin: 0
        }} 
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 0 }} // No padding to maximize space
          nodesDraggable={nodesDraggable}
          nodesConnectable={isEdgeCreationMode}
          elementsSelectable={true}
          zoomOnScroll={showZoomControls}
          zoomOnPinch={showZoomControls}
          panOnScroll={showZoomControls}
          panOnDrag={!selectionOnDrag && showZoomControls}
          minZoom={0.3} // Allow more zooming out
          maxZoom={1.5}
          selectionMode={multiSelectionMode ? SelectionMode.Partial : SelectionMode.Full}
          selectionOnDrag={selectionOnDrag}
          selectionKeyCode={selectionKeys}
          multiSelectionKeyCode={selectionKeys}
          defaultEdgeOptions={{
            style: { strokeWidth: 6 }, // Match the enhanced edge width
            animated: false,
          }}
          style={{ width: '100%', height: '100%' }} // Ensure ReactFlow uses full container
        />
      </div>
      
      {/* Remove dimensions indicator in production */}
      {debug && (
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
      )}
      
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
      
      {multiSelectionMode && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          fontSize: '12px',
          borderRadius: '4px',
          zIndex: 5
        }}>
          {selectionOnDrag ? 
            "Drag to select multiple nodes" : 
            `Hold ${selectionKeys.join(' or ')} and click nodes to select multiple`}
        </div>
      )}
    </div>
  );
};

export default DiagramFlow; 