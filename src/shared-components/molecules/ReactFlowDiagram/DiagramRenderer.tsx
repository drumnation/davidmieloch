'use client';

import React, { useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeTypes,
  EdgeTypes,
  NodeChange,
  EdgeChange,
  FitViewOptions
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import styled from 'styled-components';

// Import types
import { ReactFlowNode, ReactFlowEdge } from './ReactFlowDiagram.types';

const DiagramContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
`;

interface DiagramRendererProps {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  className?: string;
  showControls?: boolean;
  showBackground?: boolean;
  backgroundColor?: string;
  fitView?: boolean;
  fitViewOptions?: FitViewOptions;
  debug?: boolean;
  interactive?: boolean;
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  style?: React.CSSProperties;
}

/**
 * DiagramRenderer component for React Flow with proper initialization and state management
 */
export const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  nodes: initialNodes,
  edges: initialEdges,
  nodeTypes,
  edgeTypes,
  className,
  showControls = true,
  showBackground = true,
  backgroundColor = '#f8f8f8',
  fitView = true,
  fitViewOptions,
  debug = false,
  interactive = true,
  onNodesChange: externalNodesChange,
  onEdgesChange: externalEdgesChange,
  style = {},
}) => {
  // Track component initialization
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initTimestampRef = useRef<number>(0);
  
  // Use React Flow's state management hooks with proper typing
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges || []);
  
  // Debug logging function
  const logDebug = useCallback((message: string, data?: any) => {
    if (debug) {
      console.log(`[DiagramRenderer] ${message}`, data || '');
    }
  }, [debug]);
  
  // Validate node positions before rendering
  const validateNodes = useCallback((nodes: Node[]): Node[] => {
    return nodes.filter(node => {
      const isValid = node.id && 
                     node.position && 
                     typeof node.position.x === 'number' && 
                     typeof node.position.y === 'number' &&
                     !isNaN(node.position.x) &&
                     !isNaN(node.position.y);
      
      if (!isValid) {
        logDebug('Invalid node filtered out:', node);
      }
      
      return isValid;
    });
  }, [logDebug]);
  
  // Custom node change handler with proper typing
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    if (externalNodesChange) {
      externalNodesChange(changes);
    }
  }, [onNodesChange, externalNodesChange]);
  
  // Custom edge change handler with proper typing
  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    onEdgesChange(changes);
    if (externalEdgesChange) {
      externalEdgesChange(changes);
    }
  }, [onEdgesChange, externalEdgesChange]);
  
  // Initialize with validated nodes and edges
  useEffect(() => {
    initTimestampRef.current = Date.now();
    logDebug('Component initializing', {
      initialNodeCount: initialNodes?.length || 0,
      initialEdgeCount: initialEdges?.length || 0
    });
    
    // Short timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const validNodes = validateNodes(initialNodes as Node[] || []);
      logDebug('Setting validated nodes and edges', {
        validNodeCount: validNodes.length,
        validEdgeCount: initialEdges?.length || 0,
        initTime: Date.now() - initTimestampRef.current + 'ms'
      });
      
      setNodes(validNodes);
      setEdges(initialEdges as Edge[] || []);
      setInitialized(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [initialNodes, initialEdges, setNodes, setEdges, validateNodes, logDebug]);
  
  // Log container dimensions for debugging
  useEffect(() => {
    if (containerRef.current && debug) {
      logDebug('Container dimensions', {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, [initialized, debug, logDebug]);
  
  // Merge user options with defaults
  const reactFlowOptions = useMemo(() => {
    const options = {
      fitView,
      fitViewOptions: fitViewOptions || {
        padding: 0.2,
        includeHiddenNodes: false,
      },
      nodesDraggable: interactive,
      nodesConnectable: interactive,
      elementsSelectable: interactive,
      zoomOnScroll: interactive,
      panOnScroll: interactive,
      panOnDrag: interactive,
    };
    
    logDebug('React Flow options:', options);
    return options;
  }, [fitView, fitViewOptions, interactive, logDebug]);

  return (
    <DiagramContainer ref={containerRef} className={className} style={style}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          style={{ backgroundColor }}
          {...reactFlowOptions}
        >
          {showBackground && <Background />}
          {showControls && <Controls />}
        </ReactFlow>
      </div>
    </DiagramContainer>
  );
};

export default DiagramRenderer; 