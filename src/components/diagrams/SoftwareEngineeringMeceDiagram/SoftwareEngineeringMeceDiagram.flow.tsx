import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  ReactFlowInstance,
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
} from '@xyflow/react';
import { nodeTypes } from './SoftwareEngineeringMeceDiagram.nodes';
import { DiagramFlowProps, CustomNode, CustomEdge } from './SoftwareEngineeringMeceDiagram.types';
import useSoftwareEngineeringMeceDiagram from './SoftwareEngineeringMeceDiagram.hook';

const DiagramFlow: React.FC<DiagramFlowProps> = ({
  width = '100%',
  height = '500px',
  showZoomControls = true,
  backgroundColor = '#f9fafb',
  nodesDraggable = true,
  debug = false,
}) => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes] = useState<CustomNode[]>([]);
  const [edges, setEdges] = useState<CustomEdge[]>([]);

  const { calculateLayout, getInitialData } = useSoftwareEngineeringMeceDiagram();

  // Initialize diagram with calculated layout
  useEffect(() => {
    const { nodes: initialNodes, edges: initialEdges } = getInitialData();
    const { layoutedNodes, layoutedEdges } = calculateLayout(initialNodes, initialEdges);
    
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    if (debug) {
      console.log('Initial nodes:', layoutedNodes);
      console.log('Initial edges:', layoutedEdges);
    }
  }, [getInitialData, calculateLayout, debug]);

  // Handle node changes (e.g., dragging)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds as any) as CustomNode[]);
    },
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds as any) as CustomEdge[]);
    },
    []
  );

  // Set ReactFlow instance after initialization
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
    // Center the view after a short delay to ensure the graph is fully rendered
    setTimeout(() => {
      instance.fitView({ padding: 0.3 });
    }, 200);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={onInit}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={nodesDraggable}
      style={{ backgroundColor }}
    >
      <Background />
      {showZoomControls && <Controls />}
    </ReactFlow>
  );
};

export default DiagramFlow; 