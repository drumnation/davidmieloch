'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { ReactFlow, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import types and components
import { AiIntegrationProcessDiagramProps } from './AiIntegrationProcessDiagram.types';
import DiagramEditor from '../DiagramEditor';
import type { NodePosition, BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';

// Import custom node components
import ProcessNode from './ProcessNode';
import DecisionNode from './DecisionNode';
import EndNode from './EndNode';

// Define nodeTypes using imported components
export const nodeTypes = {
    process: ProcessNode,
    decision: DecisionNode,
    end: EndNode,
    start: ProcessNode, // Reuse ProcessNode for start nodes
};

// Define node data directly in this file since we're having import issues
// Once the import issues are resolved, these can be moved back to diagramData.ts
export const nodes: Node<BaseDiagramNodeData>[] = [
  // Left column
  { id: 'start', type: 'start', position: { x: 43.7, y: 62.3 }, data: { label: 'Start', icon: '🏁', type: 'process' } },
  { id: 'assess', type: 'process', position: { x: 43.7, y: 162.3 }, data: { label: 'Assess Current Workflow', icon: '🔍', type: 'process' } },
  { id: 'identify', type: 'process', position: { x: 43.7, y: 262.3 }, data: { label: 'Identify AI Opportunities', icon: '💡', type: 'process' } },
  
  // Middle column
  { id: 'defineRoles', type: 'process', position: { x: 343.7, y: 262.3 }, data: { label: 'Define Human/AI Roles', icon: '👥', type: 'process' } },
  { id: 'integrateKnowledge', type: 'process', position: { x: 343.7, y: 362.3 }, data: { label: 'Integrate Knowledge Base', icon: '🧠', type: 'process' } },
  { id: 'promptEngineering', type: 'process', position: { x: 343.7, y: 462.3 }, data: { label: 'Implement Prompt Engineering', icon: '⌨️', type: 'process' } },
  { id: 'validateFrameworks', type: 'process', position: { x: 343.7, y: 562.3 }, data: { label: 'Validate AI Frameworks', icon: '✓', type: 'process' } },
  { id: 'optimizeWorkflow', type: 'process', position: { x: 343.7, y: 662.3 }, data: { label: 'Optimize AI/Human Workflow', icon: '⚙️', type: 'process' } },
  
  // Right column
  { id: 'trainTeams', type: 'process', position: { x: 643.7, y: 462.3 }, data: { label: 'Train Teams', icon: '🧑‍🏫', type: 'process' } },
  { id: 'defineMetrics', type: 'process', position: { x: 643.7, y: 562.3 }, data: { label: 'Define Success Metrics', icon: '📊', type: 'process' } },
  { id: 'measureResults', type: 'process', position: { x: 643.7, y: 662.3 }, data: { label: 'Measure Results', icon: '📏', type: 'process' } },
  { id: 'successful', type: 'decision', position: { x: 643.7, y: 762.3 }, data: { label: 'Successful?', type: 'decision' } },
  { id: 'scaleIntegration', type: 'process', position: { x: 843.7, y: 862.3 }, data: { label: 'Scale AI Integration', icon: '📈', type: 'process' } },
  { id: 'refineApproach', type: 'process', position: { x: 443.7, y: 862.3 }, data: { label: 'Refine Approach', icon: '🔄', type: 'process' } },
  { id: 'continuousImprovement', type: 'process', position: { x: 843.7, y: 962.3 }, data: { label: 'Continuous Improvement', icon: '♾️', type: 'process' } },
  { id: 'end', type: 'end', position: { x: 843.7, y: 1062.3 }, data: { label: 'End', icon: '🏁', type: 'end' } },
];

export const edges: Edge[] = [
  // Left to middle connections
  { id: 'e1-2', source: 'start', target: 'assess', type: 'smoothstep' },
  { id: 'e2-3', source: 'assess', target: 'identify', type: 'smoothstep' },
  { id: 'e3-4', source: 'identify', target: 'defineRoles', type: 'smoothstep' },
  
  // Middle vertical flow
  { id: 'e4-5', source: 'defineRoles', target: 'integrateKnowledge', type: 'smoothstep' },
  { id: 'e5-6', source: 'integrateKnowledge', target: 'promptEngineering', type: 'smoothstep' },
  { id: 'e6-7', source: 'promptEngineering', target: 'validateFrameworks', type: 'smoothstep' },
  { id: 'e7-8', source: 'validateFrameworks', target: 'optimizeWorkflow', type: 'smoothstep' },
  
  // Middle to right connections
  { id: 'e8-9', source: 'optimizeWorkflow', target: 'trainTeams', type: 'smoothstep' },
  
  // Right vertical flow
  { id: 'e9-10', source: 'trainTeams', target: 'defineMetrics', type: 'smoothstep' },
  { id: 'e10-11', source: 'defineMetrics', target: 'measureResults', type: 'smoothstep' },
  { id: 'e11-12', source: 'measureResults', target: 'successful', type: 'smoothstep' },
  
  // Decision paths
  { 
    id: 'e12-13', 
    source: 'successful', 
    target: 'scaleIntegration', 
    label: 'Yes', 
    type: 'smoothstep',
    style: { stroke: '#4a6bff', strokeWidth: 3 }, 
    labelStyle: { fontSize: '16px', fontWeight: 'bold', fill: '#4a6bff' },
    labelBgStyle: { fill: 'white', fillOpacity: 0.8, borderRadius: 5 },
    labelShowBg: true,
    labelBgPadding: [8, 4],
  },
  { 
    id: 'e12-14', 
    source: 'successful', 
    target: 'refineApproach', 
    label: 'No', 
    type: 'smoothstep',
    style: { stroke: '#ff4a4a', strokeWidth: 4 },
    labelStyle: { fontSize: '16px', fontWeight: 'bold', fill: '#ff4a4a' },
    labelBgStyle: { fill: 'white', fillOpacity: 0.9, borderRadius: 5 },
    labelShowBg: true,
    labelBgPadding: [8, 4],
  },
  
  // Feedback and completion paths
  { 
    id: 'e14-4', 
    source: 'refineApproach', 
    target: 'defineRoles', 
    type: 'smoothstep', 
    style: { stroke: '#ff4a4a', strokeWidth: 3 } 
  },
  { 
    id: 'e13-15', 
    source: 'scaleIntegration', 
    target: 'continuousImprovement', 
    type: 'smoothstep', 
    style: { stroke: '#4a6bff', strokeWidth: 3 } 
  },
  { 
    id: 'e15-11', 
    source: 'continuousImprovement', 
    target: 'measureResults', 
    type: 'smoothstep', 
    style: { stroke: '#4a6bff', strokeWidth: 3 }, 
    animated: true 
  },
  { 
    id: 'e15-16', 
    source: 'continuousImprovement', 
    target: 'end', 
    type: 'smoothstep', 
    style: { stroke: '#4a6bff', strokeWidth: 3 } 
  },
];

// Add the fixed node positions from the "Without Controls" story which looks better
const customNodePositions: NodePosition[] = [
  {
    "id": "start",
    "position": {
      "x": -301.12355680111966,
      "y": 834.3934230187162
    }
  },
  {
    "id": "assess",
    "position": {
      "x": -233.16013768273223,
      "y": 664.3472539867361
    }
  },
  {
    "id": "identify",
    "position": {
      "x": -103.47748221131127,
      "y": 447.4150355919406
    }
  },
  {
    "id": "defineRoles",
    "position": {
      "x": 71.53254018287868,
      "y": 570.9263795143307
    }
  },
  {
    "id": "integrateKnowledge",
    "position": {
      "x": 80.08656663280024,
      "y": 704.0605966429603
    }
  },
  {
    "id": "promptEngineering",
    "position": {
      "x": -0.2596998984007257,
      "y": 841.9653733468799
    }
  },
  {
    "id": "validateFrameworks",
    "position": {
      "x": 94.14716327576042,
      "y": 979.8701500507996
    }
  },
  {
    "id": "optimizeWorkflow",
    "position": {
      "x": 15.809553407839473,
      "y": 1135.8528367242395
    }
  },
  {
    "id": "trainTeams",
    "position": {
      "x": 144.36357985776104,
      "y": 1285.8095534078393
    }
  },
  {
    "id": "defineMetrics",
    "position": {
      "x": 64.01731332656004,
      "y": 1415.679703458639
    }
  },
  {
    "id": "measureResults",
    "position": {
      "x": 932.8719687771988,
      "y": 942.9528545254311
    }
  },
  {
    "id": "successful",
    "position": {
      "x": 956.2026480187702,
      "y": 1076.9189222603045
    }
  },
  {
    "id": "scaleIntegration",
    "position": {
      "x": 1048.0887772526266,
      "y": 1241.1860606498872
    }
  },
  {
    "id": "refineApproach",
    "position": {
      "x": 434.5367131233615,
      "y": 1251.8966250619003
    }
  },
  {
    "id": "continuousImprovement",
    "position": {
      "x": 640.7405408220062,
      "y": 1361.2708068469833
    }
  },
  {
    "id": "end",
    "position": {
      "x": 1036.7373016292427,
      "y": 1545.7020839662814
    }
  }
];

/**
 * AI Integration Process Diagram component
 * Displays a flow diagram showing the AI integration process
 */
export const AiIntegrationProcessDiagram: React.FC<AiIntegrationProcessDiagramProps> = ({
    title = 'AI Integration Process Flow',
    description = 'Interactive diagram showing the process of integrating AI into existing workflows',
    showZoomControls = false, // Changed to false to match the "Without Controls" story
    showEditControls = false,
    isStorybook = false,
    width = '898px',
    height = '798px',
    backgroundColor = '#f9f9f9',
    className,
    accessibilityDescription = 'Flow diagram showing the AI integration process from workflow assessment to continuous improvement',
    initialZoom = 0.65,
    initialPosition = { x: 0, y: 0 },
    maxZoom = 5,
    minZoom = 0.1,
}) => {
    // Create refs and state
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewport, setViewport] = useState({
        x: initialPosition.x,
        y: initialPosition.y,
        zoom: initialZoom
    });

    // Apply custom node positions if they're available
    const positionedNodes = useMemo(() => {
        // Create a map of node positions for quick lookup
        const positionMap = new Map(
            customNodePositions.map(item => [item.id, item.position])
        );
        
        // Return nodes with updated positions
        return nodes.map(node => {
            const customPosition = positionMap.get(node.id);
            if (customPosition) {
                return {
                    ...node,
                    position: customPosition
                };
            }
            return node;
        });
    }, []);

    // Validate container dimensions
    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            
            if (rect.width === 0 || rect.height === 0) {
                setError('Container has zero dimension');
            } else {
                setIsLoading(false);
            }
        }
    }, []);

    // Validate nodes and edges
    useEffect(() => {
        if (!nodes?.length) {
            setError('No nodes data');
            return;
        }
        
        if (!edges?.length) {
            setError('No edges data');
            return;
        }
        
        // Check for node type and position issues
        const nodeIssues = nodes.filter((node: Node<BaseDiagramNodeData>) => !node.type || !node.position || !node.id);
        if (nodeIssues.length) {
            setError('Invalid node definitions');
            return;
        }
        
        // Check for edge connection issues
        const edgeIssues = edges.filter((edge: Edge) => !edge.source || !edge.target || !edge.id);
        if (edgeIssues.length) {
            setError('Invalid edge definitions');
        }
    }, []);

    // Memoize nodeTypes to prevent unnecessary re-renders
    const memoizedNodeTypes = useMemo(() => nodeTypes, []);

    // Add effect to check if React Flow elements appear
    useEffect(() => {
        const timer = setTimeout(() => {
            const diagramEl = document.querySelector('.react-flow');
            const fallbackEl = document.getElementById('fallback-diagram');
            
            if (!diagramEl && fallbackEl) {
                fallbackEl.style.display = 'block';
                fallbackEl.style.zIndex = '1';
            }
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    // Render diagram with debug UI
    return (
        <div 
            ref={containerRef}
            className={`ai-integration-diagram-container ${className || ''}`}
            style={{
                position: 'relative',
                width: width,
                height: height,
                border: error ? '2px solid red' : '1px solid #ccc',
                overflow: 'hidden',
                padding: '4px',
                background: backgroundColor
            }}
        >
            {/* Error message */}
            {error && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '8px',
                    background: 'rgba(255,0,0,0.1)',
                    color: 'red',
                    zIndex: 10,
                    fontSize: '12px'
                }}>
                    Error: {error}
                </div>
            )}
            
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <DiagramContent 
                    nodes={positionedNodes}
                    edges={edges}
                    nodeTypes={memoizedNodeTypes}
                    title={title}
                    description={description}
                    width={width}
                    height={height}
                    backgroundColor={backgroundColor}
                    showEditControls={showEditControls}
                    isStorybook={isStorybook}
                    className={className}
                    accessibilityDescription={accessibilityDescription}
                    initialZoom={initialZoom}
                    initialPosition={initialPosition}
                    maxZoom={maxZoom}
                    minZoom={minZoom}
                />
            )}
            
            {/* Dimensions indicator */}
            <DimensionsIndicator width={width} height={height} />
        </div>
    );
};

// Extracted pure functional components
const LoadingIndicator = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.05)'
    }}>
        Loading diagram...
    </div>
);

const DimensionsIndicator = ({ width, height }: { width: string | number, height: string | number }) => (
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
);

interface DiagramContentProps extends AiIntegrationProcessDiagramProps {
    nodes: Node<BaseDiagramNodeData>[];
    edges: Edge[];
    nodeTypes: Record<string, React.ComponentType<any>>;
}

const DiagramContent = (props: DiagramContentProps) => {
    const {
        nodes,
        edges,
        nodeTypes,
        title,
        description,
        width,
        height,
        backgroundColor,
        showEditControls,
        isStorybook,
        className,
        accessibilityDescription,
        initialZoom,
        initialPosition,
        maxZoom,
        minZoom
    } = props;
    
    return (
        <div 
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                border: '1px dashed #aaa'
            }}
        >
            <DiagramEditor
                key={`diagram-${Date.now()}`}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                title={title}
                description={description}
                width={width}
                height={height}
                backgroundColor={backgroundColor}
                showEditControls={showEditControls}
                isStorybook={isStorybook}
                className={className}
                accessibilityDescription={accessibilityDescription}
                initialZoom={initialZoom}
                initialPosition={initialPosition}
                maxZoom={maxZoom}
                minZoom={minZoom}
            />
            
            <FallbackDiagram nodes={nodes} />
        </div>
    );
};

const FallbackDiagram = ({ nodes }: { nodes: Node<BaseDiagramNodeData>[] }) => (
    <div 
        id="fallback-diagram" 
        style={{
            display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#f0f0f0',
            padding: '20px',
            boxSizing: 'border-box',
            zIndex: -1
        }}
    >
        <h3>AI Integration Process Flow (Fallback View)</h3>
        <p>The interactive diagram failed to load. This is a simplified fallback.</p>
        <ul style={{ textAlign: 'left' }}>
            {nodes.map(node => (
                <li key={node.id}>{node.data.label}</li>
            ))}
        </ul>
    </div>
);

export default AiIntegrationProcessDiagram; 