'use client';

import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

// Import types
import { AgentSystemDiagramProps } from './AgentSystemDiagram.types';

// Import the EnhancedReactFlowDiagram component and related types
import { EnhancedReactFlowDiagram } from '../../molecules/ReactFlowDiagram';
import { 
  ReactFlowNode, 
  ReactFlowEdge,
  ReactFlowDefinition
} from '../../molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * A component that renders the Agent System diagram using React Flow
 * 
 * Based on the original Mermaid.js diagram:
 * ```
 * graph TD
 *   T[New Task] --> A[Analysis]
 *   A --> P[Planning]
 *   P --> D[Distribution]
 *   
 *   D --> AG1[Architect Agent]
 *   D --> AG2[Frontend Lead Agent]
 *   D --> AG3[AI Specialist Agent]
 *   
 *   AG1 --> R[Results]
 *   AG2 --> R
 *   AG3 --> R
 *   
 *   R --> V[Validation]
 *   V --> I[Integration]
 *   
 *   classDef task fill:#f96,stroke:#333
 *   classDef process fill:#58f,stroke:#333
 *   classDef team fill:#58f,stroke:#333
 *   classDef output fill:#5f5,stroke:#333
 *   
 *   class T task
 *   class A,P,D process
 *   class AG1,AG2,AG3 team
 *   class R,V,I output
 * ```
 */
export const AgentSystemDiagram: React.FC<AgentSystemDiagramProps> = ({
  title = "Agent System Workflow",
  className = '',
  theme = 'default',
  width = '100%',
  height = '500px',
  showZoomControls = true,
  accessibilityDescription = 'Agent System Diagram showing the workflow from Task to Integration through Analysis, Planning, Distribution, and Results',
  debug = false,
}) => {
  // Define the nodes for the diagram
  const nodes: ReactFlowNode[] = useMemo(() => [
    // Task node (orange background)
    {
      id: 'T',
      type: 'default',
      position: { x: 250, y: 50 },
      data: { 
        label: 'New Task',
        style: { 
          width: '120px',
          backgroundColor: '#f96',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    
    // Process nodes (blue background)
    {
      id: 'A',
      type: 'default',
      position: { x: 250, y: 130 },
      data: { 
        label: 'Analysis',
        style: { 
          width: '120px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'P',
      type: 'default',
      position: { x: 250, y: 210 },
      data: { 
        label: 'Planning',
        style: { 
          width: '120px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'D',
      type: 'default',
      position: { x: 250, y: 290 },
      data: { 
        label: 'Distribution',
        style: { 
          width: '120px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    
    // Team nodes (blue background)
    {
      id: 'AG1',
      type: 'default',
      position: { x: 100, y: 370 },
      data: { 
        label: 'Architect Agent',
        style: { 
          width: '140px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'AG2',
      type: 'default',
      position: { x: 250, y: 370 },
      data: { 
        label: 'Frontend Lead Agent',
        style: { 
          width: '160px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'AG3',
      type: 'default',
      position: { x: 400, y: 370 },
      data: { 
        label: 'AI Specialist Agent',
        style: { 
          width: '150px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    
    // Output nodes (green background)
    {
      id: 'R',
      type: 'default',
      position: { x: 250, y: 450 },
      data: { 
        label: 'Results',
        style: { 
          width: '120px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'V',
      type: 'default',
      position: { x: 250, y: 530 },
      data: { 
        label: 'Validation',
        style: { 
          width: '120px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'I',
      type: 'default',
      position: { x: 250, y: 610 },
      data: { 
        label: 'Integration',
        style: { 
          width: '120px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
  ], []);

  // Define the edges connecting the nodes
  const edges: ReactFlowEdge[] = useMemo(() => [
    {
      id: 'e-T-A',
      source: 'T',
      target: 'A',
    },
    {
      id: 'e-A-P',
      source: 'A',
      target: 'P',
    },
    {
      id: 'e-P-D',
      source: 'P',
      target: 'D',
    },
    {
      id: 'e-D-AG1',
      source: 'D',
      target: 'AG1',
      type: 'smoothstep',
    },
    {
      id: 'e-D-AG2',
      source: 'D',
      target: 'AG2',
      type: 'smoothstep',
    },
    {
      id: 'e-D-AG3',
      source: 'D',
      target: 'AG3',
      type: 'smoothstep',
    },
    {
      id: 'e-AG1-R',
      source: 'AG1',
      target: 'R',
      type: 'smoothstep',
    },
    {
      id: 'e-AG2-R',
      source: 'AG2',
      target: 'R',
    },
    {
      id: 'e-AG3-R',
      source: 'AG3',
      target: 'R',
      type: 'smoothstep',
    },
    {
      id: 'e-R-V',
      source: 'R',
      target: 'V',
    },
    {
      id: 'e-V-I',
      source: 'V',
      target: 'I',
    },
  ], []);

  // Create the flow definition
  const flowDefinition: ReactFlowDefinition = useMemo(() => ({
    nodes,
    edges
  }), [nodes, edges]);

  // Define custom options
  const customOptions = useMemo(() => ({
    nodesDraggable: false,
    nodesConnectable: false,
    elementsSelectable: false,
    fitView: true,
    fitViewOptions: {
      padding: 0.2,
      minZoom: 0.85,
      maxZoom: 1,
    },
  }), []);

  return (
    <EnhancedReactFlowDiagram
      definition={flowDefinition}
      title={title}
      className={className}
      theme={theme}
      width={width}
      height={height}
      showZoomControls={showZoomControls}
      accessibilityDescription={accessibilityDescription}
      showBackground={true}
      customOptions={customOptions}
      debug={debug}
      maxWidth="650px"
    />
  );
}; 