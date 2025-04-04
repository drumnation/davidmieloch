'use client';

import React, { useMemo, useEffect } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    EdgeProps,
    Node,
    Edge,
} from '@xyflow/react';
import dagre from 'dagre';
import styled from 'styled-components';
import '@xyflow/react/dist/style.css';

// Import types
import { AgentSystemDiagramProps } from './AgentSystemDiagram.types';

// Use the ReactFlow component directly
const ReactFlowComponent = ReactFlow;

// --- Helper Functions ---
const getSmoothStepPath = (source: { x: number; y: number; position: Position }, target: { x: number; y: number; position: Position }): string => {
  const sourceX = source.x;
  const sourceY = source.y;
  const targetX = target.x;
  const targetY = target.y;
  
  const midY = (sourceY + targetY) / 2;
  
  return `M${sourceX},${sourceY} C${sourceX},${midY} ${targetX},${midY} ${targetX},${targetY}`;
};

// --- Custom Node Components ---
const StyledNode = styled.div`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: white;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    min-width: 120px;
`;

// Custom node types
const ProcessNode = ({ data }: any) => {
    return (
        <StyledNode style={data.style}>
            {data.label}
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </StyledNode>
    );
};

const TaskNode = ({ data }: any) => {
    return (
        <StyledNode style={data.style}>
            {data.label}
            <Handle type="source" position={Position.Bottom} />
        </StyledNode>
    );
};

const AgentNode = ({ data }: any) => {
    return (
        <StyledNode style={data.style}>
            {data.label}
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </StyledNode>
    );
};

const OutputNode = ({ data }: any) => {
    return (
        <StyledNode style={data.style}>
            {data.label}
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </StyledNode>
    );
};

// --- Custom Edge Component ---
const AnimatedEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
}: EdgeProps) => {
    const edgePath = useMemo(() => {
        const source = { x: sourceX, y: sourceY, position: sourcePosition };
        const target = { x: targetX, y: targetY, position: targetPosition };
        return getSmoothStepPath(source, target);
    }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition]);

    return (
        <>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                stroke="#888"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
            />
        </>
    );
};

// --- Layout Function ---
// Use any type for the node and edge data to avoid TypeScript issues
const getLayoutedElements = (nodes: any[], edges: any[]) => {
    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: 'TB', ranksep: 70, nodesep: 50 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 150, height: 50 }); // Adjust node dimensions
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
export const AgentSystemDiagram: React.FC<AgentSystemDiagramProps> = ({
    title = 'Agent System Workflow',
    className = '',
    theme = 'default',
    width = '100%',
    height = '500px',
    showZoomControls = true,
    accessibilityDescription = 'Agent System Diagram showing the workflow from Task to Integration through Analysis, Planning, Distribution, and Results',
    debug = false,
}) => {
    const nodeTypes = useMemo(
        () => ({
            process: ProcessNode,
            task: TaskNode,
            agent: AgentNode,
            output: OutputNode,
        }),
        []
    );

    const edgeTypes = useMemo(
        () => ({
            animated: AnimatedEdge,
        }),
        []
    );

    const initialNodes = useMemo(
        () => [
            {
                id: 'T',
                type: 'task',
                position: { x: 0, y: 0 },
                data: {
                    label: 'New Task',
                    style: {
                        backgroundColor: '#ffcc80',
                        borderColor: '#e69900',
                        color: '#333',
                    },
                },
            },
            {
                id: 'A',
                type: 'process',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Analysis',
                    style: {
                        backgroundColor: '#80d4ff',
                        borderColor: '#3399ff',
                        color: '#333',
                    },
                },
            },
            {
                id: 'P',
                type: 'process',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Planning',
                    style: {
                        backgroundColor: '#80d4ff',
                        borderColor: '#3399ff',
                        color: '#333',
                    },
                },
            },
            {
                id: 'D',
                type: 'process',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Distribution',
                    style: {
                        backgroundColor: '#80d4ff',
                        borderColor: '#3399ff',
                        color: '#333',
                    },
                },
            },
            {
                id: 'AG1',
                type: 'agent',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Architect Agent',
                    style: {
                        backgroundColor: '#a3a3ff',
                        borderColor: '#6666ff',
                        color: '#333',
                    },
                },
            },
            {
                id: 'AG2',
                type: 'agent',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Frontend Lead Agent',
                    style: {
                        backgroundColor: '#a3a3ff',
                        borderColor: '#6666ff',
                        color: '#333',
                    },
                },
            },
            {
                id: 'AG3',
                type: 'agent',
                position: { x: 0, y: 0 },
                data: {
                    label: 'AI Specialist Agent',
                    style: {
                        backgroundColor: '#a3a3ff',
                        borderColor: '#6666ff',
                        color: '#333',
                    },
                },
            },
            {
                id: 'R',
                type: 'output',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Results',
                    style: {
                        backgroundColor: '#80ff80',
                        borderColor: '#33cc33',
                        color: '#333',
                    },
                },
            },
            {
                id: 'V',
                type: 'output',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Validation',
                    style: {
                        backgroundColor: '#80ff80',
                        borderColor: '#33cc33',
                        color: '#333',
                    },
                },
            },
            {
                id: 'I',
                type: 'output',
                position: { x: 0, y: 0 },
                data: {
                    label: 'Integration',
                    style: {
                        backgroundColor: '#80ff80',
                        borderColor: '#33cc33',
                        color: '#333',
                    },
                },
            },
        ],
        []
    );

    const initialEdges = useMemo(
        () => [
            { id: 'e-T-A', source: 'T', target: 'A' },
            { id: 'e-A-P', source: 'A', target: 'P' },
            { id: 'e-P-D', source: 'P', target: 'D' },
            {
                id: 'e-D-AG1',
                source: 'D',
                target: 'AG1',
                type: 'animated',
            },
            {
                id: 'e-D-AG2',
                source: 'D',
                target: 'AG2',
                type: 'animated',
            },
            {
                id: 'e-D-AG3',
                source: 'D',
                target: 'AG3',
                type: 'animated',
            },
            {
                id: 'e-AG1-R',
                source: 'AG1',
                target: 'R',
                type: 'animated',
            },
            { id: 'e-AG2-R', source: 'AG2', target: 'R' },
            {
                id: 'e-AG3-R',
                source: 'AG3',
                target: 'R',
                type: 'animated',
            },
            { id: 'e-R-V', source: 'R', target: 'V' },
            { id: 'e-V-I', source: 'V', target: 'I' },
        ],
        []
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        if (nodes.length && edges.length) {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);

            // Use type assertion to avoid TypeScript errors
            setNodes([...layoutedNodes] as any);
            setEdges([...layoutedEdges] as any);
            
            if (debug) {
                console.log('AgentSystemDiagram - Layout applied:', { layoutedNodes, layoutedEdges });
            }
        }
    }, [nodes.length, edges.length, setNodes, setEdges, debug]);

    return (
        <div style={{ width, height }} className={className}>
            {title && <h3>{title}</h3>}
            <div style={{ width: '100%', height: '100%' }}>
                <ReactFlowProvider>
                    <ReactFlowComponent
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        fitView
                        fitViewOptions={{ padding: 0.1 }}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        elementsSelectable={false}
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
                    </ReactFlowComponent>
                </ReactFlowProvider>
            </div>
            
            {accessibilityDescription && (
                <div className="sr-only" role="note" aria-label="Diagram description">
                    {accessibilityDescription}
                </div>
            )}
        </div>
    );
};

export default AgentSystemDiagram; 