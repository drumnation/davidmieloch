'use client';

import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { 
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  EdgeProps,
  Edge,
  Node,
  useReactFlow,
} from '@xyflow/react';
import dagre from 'dagre';
import styled from 'styled-components';
import '@xyflow/react/dist/style.css';

// --- Type Definitions ---

interface NodeData {
  label: string;
  description?: string;
  style?: React.CSSProperties;
  [key: string]: any; // Using any to simplify typing
}

interface EdgeData {
  animated?: boolean;
  [key: string]: any; // Using any to simplify typing
}

// --- Custom Node Components ---

const ApiNode = ({ data }: any) => {
  return (
    <StyledApiNode style={data?.style}>
      {data?.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </StyledApiNode>
  );
};

const AiModelNode = ({ data }: any) => {
  return (
    <StyledAiModelNode style={data?.style}>
      {data?.label}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </StyledAiModelNode>
  );
};

const DataStoreNode = ({ data }: any) => {
  return (
    <StyledDataStoreNode style={data?.style}>
      {data?.label}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </StyledDataStoreNode>
  );
};

const UiNode = ({ data }: any) => {
  return (
    <StyledUiNode style={data?.style}>
      {data?.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </StyledUiNode>
  );
};

// --- Custom Edge Component ---

const AnimatedEdge = (props: EdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  
  // Create a smooth path between source and target
  const centerX = (sourceX + targetX) / 2;
  const edgePath = `M${sourceX},${sourceY} C${centerX},${sourceY} ${centerX},${targetY} ${targetX},${targetY}`;

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      stroke="#888"
      strokeWidth={2}
      markerEnd="url(#arrowhead)"
    />
  );
};

// --- Styled Components ---

const StyledApiNode = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid #4a90e2;
  background-color: #e6f7ff;
  text-align: center;
  font-size: 14px;
`;

const StyledAiModelNode = styled.div`
  padding: 10px 20px;
  border: 2px solid #9c27b0;
  background-color: #f3e5f5;
  text-align: center;
  font-size: 14px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
`;

const StyledDataStoreNode = styled.div`
  padding: 10px 20px;
  border: 2px solid #4caf50;
  background-color: #e8f5e9;
  text-align: center;
  font-size: 14px;
  border-radius: 50%;
`;

const StyledUiNode = styled.div`
  padding: 10px 20px;
  border: 2px solid #ff9800;
  background-color: #fff3e0;
  text-align: center;
  font-size: 14px;
`;

// --- Layout Function ---

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 70, nodesep: 50 });

  nodes.forEach((node) => {
    let width = 150;
    let height = 50;

    if (node.type === 'aiModel') {
      width = 120;
      height = 80;
    } else if (node.type === 'dataStore') {
      width = 80;
      height = 80;
    } else if (node.type === 'ui') {
      width = 120;
      height = 50;
    }

    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// --- Main Component ---

interface AIIntegrationFlowDiagramProps {
  /** Title displayed above the diagram */
  title?: string;
  /** Optional description text below the title */
  description?: string;
  /** Width of the diagram container */
  width?: string | number;
  /** Height of the diagram container */
  height?: string | number;
  /** CSS class name for additional styling */
  className?: string;
  /** Description for screen readers */
  accessibilityDescription?: string;
  /** Whether to display zoom controls */
  showZoomControls?: boolean;
  /** Visual theme for the diagram */
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  /** Custom nodes to override the default nodes */
  nodes?: Node<NodeData>[];
  /** Custom edges to override the default connections */
  edges?: Edge<EdgeData>[];
}

const AiIntegrationFlowDiagram: React.FC<AIIntegrationFlowDiagramProps> = ({
  title = 'AI Integration Flow',
  description,
  width = '100%',
  height = '500px',
  className = '',
  accessibilityDescription = 'Diagram showing AI integration flow with components like API Gateway, Query Processor, and LLM Service.',
  showZoomControls = true,
  theme = 'default',
  nodes: customNodes,
  edges: customEdges,
}) => {
  const nodeTypes = useMemo(
    () => ({
      api: ApiNode,
      aiModel: AiModelNode,
      dataStore: DataStoreNode,
      ui: UiNode,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      animated: AnimatedEdge,
    }),
    []
  );

  const initialNodes: Node<NodeData>[] = useMemo(
    () => [
      {
        id: 'userRequest',
        type: 'ui',
        position: { x: 50, y: 50 },
        data: { label: 'User Request' },
      },
      {
        id: 'apiGateway',
        type: 'api',
        position: { x: 50, y: 150 },
        data: { label: 'API Gateway' },
      },
      {
        id: 'queryProcessor',
        type: 'aiModel',
        position: { x: 200, y: 100 },
        data: { label: 'Query Processor' },
      },
      {
        id: 'knowledgeBase',
        type: 'dataStore',
        position: { x: 350, y: 50 },
        data: { label: 'Knowledge Base' },
      },
      {
        id: 'llmService',
        type: 'aiModel',
        position: { x: 350, y: 150 },
        data: { label: 'LLM Service' },
      },
      {
        id: 'responseGenerator',
        type: 'aiModel',
        position: { x: 500, y: 100 },
        data: { label: 'Response Generator' },
      },
      {
        id: 'userInterface',
        type: 'ui',
        position: { x: 650, y: 100 },
        data: { label: 'User Interface' },
      },
    ],
    []
  );

  const initialEdges: Edge<EdgeData>[] = useMemo(
    () => [
      { id: 'e1-2', source: 'userRequest', target: 'apiGateway' },
      { id: 'e2-3', source: 'apiGateway', target: 'queryProcessor' },
      { id: 'e3-4', source: 'queryProcessor', target: 'knowledgeBase' },
      { id: 'e3-5', source: 'queryProcessor', target: 'llmService' },
      { id: 'e5-6', source: 'llmService', target: 'responseGenerator' },
      { id: 'e6-2', source: 'responseGenerator', target: 'apiGateway' },
      { id: 'e2-7', source: 'apiGateway', target: 'userInterface' },
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(customNodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(customEdges || initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { setCenter } = useReactFlow();

  useEffect(() => {
    // Only apply layout if we're not in Storybook
    const isStorybook = window?.location?.href?.includes('localhost:7010');
    
    if (!isStorybook) {
      try {
        const { nodes: layoutedNodes, edges: layoutedEdges } =
          getLayoutedElements(nodes, edges);

        // Use type assertion to avoid type errors
        setNodes(layoutedNodes as any);
        setEdges(layoutedEdges as any);
      } catch (error) {
        console.error('Error applying layout:', error);
      }
    }

    if (reactFlowWrapper.current) {
      setTimeout(() => {
        setCenter(
          reactFlowWrapper.current?.clientWidth ? reactFlowWrapper.current.clientWidth / 2 : 0,
          reactFlowWrapper.current?.clientHeight ? reactFlowWrapper.current.clientHeight / 2 : 0,
          { zoom: 0.8, duration: 500 }
        );
      }, 50);
    }
  }, [setNodes, setEdges, setCenter]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      alert(`Node "${node.data.label}" clicked!`);
    },
    []
  );

  // Container style for responsive width
  const containerStyle = useMemo(() => ({
    width: width,
    maxWidth: '1000px',
    margin: '0 auto',
  }), [width]);

  return (
    <div className={className} style={containerStyle}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      
      <div 
        style={{ width: '100%', height }} 
        ref={reactFlowWrapper}
        aria-label={accessibilityDescription}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#888" />
            </marker>
          </defs>
        </ReactFlow>
      </div>
    </div>
  );
};

export { AiIntegrationFlowDiagram };
export default AiIntegrationFlowDiagram; 