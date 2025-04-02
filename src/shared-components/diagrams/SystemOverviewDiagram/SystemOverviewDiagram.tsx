'use client';

import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

// Import types
import { SystemOverviewDiagramProps } from './SystemOverviewDiagram.types';

// Import the EnhancedReactFlowDiagram component and related types
import { EnhancedReactFlowDiagram } from '../../molecules/ReactFlowDiagram';
import { 
  ReactFlowNode, 
  ReactFlowEdge,
  ReactFlowDefinition
} from '../../molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * A component that renders the System Overview diagram using React Flow
 * 
 * Based on the original Mermaid.js diagram:
 * ```
 * graph TD
 *   BG[Brain Garden System] --> PB[Project-Specific Brains]
 *   BG --> DCM[Dynamic Context Management]
 *   BG --> IDSM[Intelligent Directory Structure]
 *   BG --> MAC[Multi-Agent Collaboration]
 *   BG --> ADP[Atomic Design for Prompts]
 *   BG --> TM[Task Management]
 *   BG --> AVT[Automated Validation & Testing]
 *   BG --> CLI[CLI & Standards System]
 *   
 *   classDef system fill:#f96,stroke:#333
 *   classDef component fill:#58f,stroke:#333
 *   
 *   class BG system
 *   class PB,DCM,IDSM,MAC,ADP,TM,AVT,CLI component
 * ```
 */
export const SystemOverviewDiagram: React.FC<SystemOverviewDiagramProps> = ({
  title = "Brain Garden System Architecture",
  className = '',
  theme = 'default',
  width = '100%',
  height = 'auto',
  showZoomControls = true,
  accessibilityDescription = 'Brain Garden System Architecture diagram showing the main system connected to various subsystems including Knowledge System, Prompt System, Agent System, Integration System, and Documentation System.',
  debug = false,
}) => {
  // Define the nodes for the diagram
  const nodes: ReactFlowNode[] = useMemo(() => [
    // System node (orange background)
    {
      id: 'BG',
      type: 'default',
      position: { x: 250, y: 50 },
      data: { 
        label: 'Brain Garden System',
        style: { 
          width: '180px',
          backgroundColor: '#f96',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    
    // Component nodes (blue background)
    {
      id: 'PB',
      type: 'default',
      position: { x: 50, y: 150 },
      data: { 
        label: 'Project-Specific Brains',
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
      id: 'DCM',
      type: 'default',
      position: { x: 250, y: 150 },
      data: { 
        label: 'Dynamic Context Management',
        style: { 
          width: '210px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'IDSM',
      type: 'default',
      position: { x: 480, y: 150 },
      data: { 
        label: 'Intelligent Directory Structure',
        style: { 
          width: '210px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'MAC',
      type: 'default',
      position: { x: 50, y: 230 },
      data: { 
        label: 'Multi-Agent Collaboration',
        style: { 
          width: '200px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'ADP',
      type: 'default',
      position: { x: 250, y: 230 },
      data: { 
        label: 'Atomic Design for Prompts',
        style: { 
          width: '200px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'TM',
      type: 'default',
      position: { x: 480, y: 230 },
      data: { 
        label: 'Task Management',
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
      id: 'AVT',
      type: 'default',
      position: { x: 150, y: 310 },
      data: { 
        label: 'Automated Validation & Testing',
        style: { 
          width: '210px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
    },
    {
      id: 'CLI',
      type: 'default',
      position: { x: 380, y: 310 },
      data: { 
        label: 'CLI & Standards System',
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
  ], []);

  // Define the edges connecting the nodes
  const edges: ReactFlowEdge[] = useMemo(() => [
    // Connect system to components
    {
      id: 'e-BG-PB',
      source: 'BG',
      target: 'PB',
      type: 'smoothstep',
    },
    {
      id: 'e-BG-DCM',
      source: 'BG',
      target: 'DCM',
    },
    {
      id: 'e-BG-IDSM',
      source: 'BG',
      target: 'IDSM',
      type: 'smoothstep',
    },
    {
      id: 'e-BG-MAC',
      source: 'BG',
      target: 'MAC',
      type: 'smoothstep',
    },
    {
      id: 'e-BG-ADP',
      source: 'BG',
      target: 'ADP',
      type: 'smoothstep',
    },
    {
      id: 'e-BG-TM',
      source: 'BG',
      target: 'TM',
      type: 'smoothstep',
    },
    {
      id: 'e-BG-AVT',
      source: 'BG',
      target: 'AVT',
      type: 'smoothstep',
    },
    {
      id: 'e-BG-CLI',
      source: 'BG',
      target: 'CLI',
      type: 'smoothstep',
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
      height={height === 'auto' ? '600px' : height}
      showZoomControls={showZoomControls}
      accessibilityDescription={accessibilityDescription}
      showBackground={true}
      customOptions={customOptions}
      debug={debug}
      maxWidth="750px"
    />
  );
}; 