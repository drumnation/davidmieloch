'use client';

import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

// Import types
import { KnowledgeSystemDiagramProps } from './KnowledgeSystemDiagram.types';

// Import the EnhancedReactFlowDiagram component and related types
import { EnhancedReactFlowDiagram } from '../../../shared-components/molecules/ReactFlowDiagram';
import { 
  ReactFlowNode, 
  ReactFlowEdge,
  ReactFlowDefinition
} from '../../../shared-components/molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * A component that renders the Knowledge System diagram using React Flow
 * 
 * Based on the original Mermaid.js diagram:
 * ```
 * graph LR
 *   D[Developer Action] --> C[Knowledge Capture]
 *   C --> A[Analysis & Processing]
 *   A --> E[Enriched Knowledge]
 *   E --> S[Shared Understanding]
 *   S --> T[Team Benefits]
 *   
 *   classDef action fill:#f96,stroke:#333
 *   classDef process fill:#58f,stroke:#333
 *   classDef benefit fill:#5f5,stroke:#333
 *   
 *   class D,C action
 *   class A,E process
 *   class S,T benefit
 * ```
 */
export const KnowledgeSystemDiagram: React.FC<KnowledgeSystemDiagramProps> = ({
  title = "Knowledge System Flow",
  className = '',
  theme = 'default',
  width = '100%',
  height = '400px',
  showZoomControls = true,
  accessibilityDescription = 'Knowledge System Diagram showing the flow from Developer Action to Team Benefits through Knowledge Capture, Analysis, and Shared Understanding',
  debug = false,
}) => {
  // Define the nodes for the diagram
  const nodes: ReactFlowNode[] = useMemo(() => [
    // Action nodes (orange background)
    {
      id: 'D',
      type: 'default',
      position: { x: 50, y: 150 },
      data: { 
        label: 'Developer Action',
        style: { 
          width: '150px',
          backgroundColor: '#f96',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'C',
      type: 'default',
      position: { x: 250, y: 150 },
      data: { 
        label: 'Knowledge Capture',
        style: { 
          width: '150px',
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
      position: { x: 450, y: 150 },
      data: { 
        label: 'Analysis & Processing',
        style: { 
          width: '180px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'E',
      type: 'default',
      position: { x: 650, y: 150 },
      data: { 
        label: 'Enriched Knowledge',
        style: { 
          width: '180px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    
    // Benefit nodes (green background)
    {
      id: 'S',
      type: 'default',
      position: { x: 850, y: 150 },
      data: { 
        label: 'Shared Understanding',
        style: { 
          width: '180px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'T',
      type: 'default',
      position: { x: 1050, y: 150 },
      data: { 
        label: 'Team Benefits',
        style: { 
          width: '150px',
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
      id: 'e-D-C',
      source: 'D',
      target: 'C',
    },
    {
      id: 'e-C-A',
      source: 'C',
      target: 'A',
    },
    {
      id: 'e-A-E',
      source: 'A',
      target: 'E',
    },
    {
      id: 'e-E-S',
      source: 'E',
      target: 'S',
    },
    {
      id: 'e-S-T',
      source: 'S',
      target: 'T',
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
    />
  );
}; 