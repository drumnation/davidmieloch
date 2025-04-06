'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import '@xyflow/react/dist/style.css';

// Import types
import { IntegrationSystemDiagramProps } from './IntegrationSystemDiagram.types';

// Import the EnhancedReactFlowDiagram component and related types
import { EnhancedReactFlowDiagram } from '../../../shared-components/molecules/ReactFlowDiagram';
import { 
  ReactFlowNode, 
  ReactFlowEdge,
  ReactFlowDefinition
} from '../../../shared-components/molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * A component that renders the Integration System diagram using React Flow
 * 
 * Based on the original Mermaid.js diagram:
 * ```
 * graph TD
 *   IS[Integration System] --> G[Git Integration]
 *   IS --> I[IDE Integration]
 *   IS --> C[CI/CD Integration]
 *   
 *   G --> GF[Feature Branches]
 *   G --> GM[Merge Management]
 *   G --> GH[History Analysis]
 *   
 *   I --> IC[Code Assistance]
 *   I --> IR[Refactoring]
 *   I --> IP[Pattern Suggestions]
 *   
 *   C --> CD[Deployment]
 *   C --> CT[Testing]
 *   C --> CM[Monitoring]
 *   
 *   classDef system fill:#f96,stroke:#333
 *   classDef integration fill:#58f,stroke:#333
 *   classDef feature fill:#5f5,stroke:#333
 *   
 *   class IS system
 *   class G,I,C integration
 *   class GF,GM,GH,IC,IR,IP,CD,CT,CM feature
 * ```
 */
export const IntegrationSystemDiagram: React.FC<IntegrationSystemDiagramProps> = ({
  title = "Integration System",
  className = '',
  theme = 'default',
  width = '100%',
  height = '500px',
  showZoomControls = true,
  accessibilityDescription = 'Integration System Diagram showing the connection between Core Integration System and Development Tools including Git, IDE, and CI/CD integrations',
  debug = false,
}) => {
  // Define the nodes for the diagram
  const nodes: ReactFlowNode[] = useMemo(() => [
    // System node (orange background)
    {
      id: 'IS',
      type: 'default',
      position: { x: 250, y: 50 },
      data: { 
        label: 'Integration System',
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
    
    // Integration nodes (blue background)
    {
      id: 'G',
      type: 'default',
      position: { x: 100, y: 150 },
      data: { 
        label: 'Git Integration',
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
    {
      id: 'I',
      type: 'default',
      position: { x: 250, y: 150 },
      data: { 
        label: 'IDE Integration',
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
    {
      id: 'C',
      type: 'default',
      position: { x: 400, y: 150 },
      data: { 
        label: 'CI/CD Integration',
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
    
    // Feature nodes (green background)
    // Git features
    {
      id: 'GF',
      type: 'default',
      position: { x: 25, y: 250 },
      data: { 
        label: 'Feature Branches',
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
    {
      id: 'GM',
      type: 'default',
      position: { x: 100, y: 325 },
      data: { 
        label: 'Merge Management',
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
    {
      id: 'GH',
      type: 'default',
      position: { x: 175, y: 250 },
      data: { 
        label: 'History Analysis',
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
    
    // IDE features
    {
      id: 'IC',
      type: 'default',
      position: { x: 175, y: 325 },
      data: { 
        label: 'Code Assistance',
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
    {
      id: 'IR',
      type: 'default',
      position: { x: 250, y: 250 },
      data: { 
        label: 'Refactoring',
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
    {
      id: 'IP',
      type: 'default',
      position: { x: 325, y: 325 },
      data: { 
        label: 'Pattern Suggestions',
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
    
    // CI/CD features
    {
      id: 'CD',
      type: 'default',
      position: { x: 325, y: 250 },
      data: { 
        label: 'Deployment',
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
    {
      id: 'CT',
      type: 'default',
      position: { x: 400, y: 325 },
      data: { 
        label: 'Testing',
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
    {
      id: 'CM',
      type: 'default',
      position: { x: 475, y: 250 },
      data: { 
        label: 'Monitoring',
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
    // Core connections
    {
      id: 'e-IS-G',
      source: 'IS',
      target: 'G',
      type: 'smoothstep',
    },
    {
      id: 'e-IS-I',
      source: 'IS',
      target: 'I',
    },
    {
      id: 'e-IS-C',
      source: 'IS',
      target: 'C',
      type: 'smoothstep',
    },
    
    // Git connections
    {
      id: 'e-G-GF',
      source: 'G',
      target: 'GF',
      type: 'smoothstep',
    },
    {
      id: 'e-G-GM',
      source: 'G',
      target: 'GM',
      type: 'smoothstep',
    },
    {
      id: 'e-G-GH',
      source: 'G',
      target: 'GH',
      type: 'smoothstep',
    },
    
    // IDE connections
    {
      id: 'e-I-IC',
      source: 'I',
      target: 'IC',
      type: 'smoothstep',
    },
    {
      id: 'e-I-IR',
      source: 'I',
      target: 'IR',
    },
    {
      id: 'e-I-IP',
      source: 'I',
      target: 'IP',
      type: 'smoothstep',
    },
    
    // CI/CD connections
    {
      id: 'e-C-CD',
      source: 'C',
      target: 'CD',
      type: 'smoothstep',
    },
    {
      id: 'e-C-CT',
      source: 'C',
      target: 'CT',
      type: 'smoothstep',
    },
    {
      id: 'e-C-CM',
      source: 'C',
      target: 'CM',
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