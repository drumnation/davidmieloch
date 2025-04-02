import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

// Import types
import { PerformanceScalabilityDiagramProps } from './PerformanceScalabilityDiagram.types';

// Import the ReactFlowDiagram component and related types
import { ReactFlowDiagram } from '../../molecules/ReactFlowDiagram/ReactFlowDiagram';
import { 
  ReactFlowNode, 
  ReactFlowEdge,
  ReactFlowDefinition
} from '../../molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * A component that renders the Performance Scalability diagram using React Flow
 * 
 * Based on the original Mermaid.js diagram:
 * ```
 * graph TD
 *   P[Performance] --> D[Distribution]
 *   P --> C[Caching]
 *   P --> O[Optimization]
 *   
 *   D --> DP[Parallel Processing]
 *   D --> DL[Load Balancing]
 *   D --> DS[Service Scaling]
 *   
 *   C --> CM[Memory Management]
 *   C --> CI[Index Optimization]
 *   C --> CR[Resource Control]
 *   
 *   O --> OP[Pattern Optimization]
 *   O --> OQ[Query Optimization]
 *   O --> OR[Resource Optimization]
 *   
 *   classDef perf fill:#f96,stroke:#333
 *   classDef feature fill:#58f,stroke:#333
 *   classDef opt fill:#5f5,stroke:#333
 *   
 *   class P perf
 *   class D,C,O feature
 *   class DP,DL,DS,CM,CI,CR,OP,OQ,OR opt
 * ```
 */
export const PerformanceScalabilityDiagram: React.FC<PerformanceScalabilityDiagramProps> = ({
  title = "Performance and Scalability",
  className = '',
  theme = 'default',
  width = '100%',
  height = '500px',
  showZoomControls = true,
  accessibilityDescription = 'Performance Scalability Diagram showing Distribution, Caching, and Optimization strategies',
}) => {
  // Define the nodes for the diagram
  const nodes: ReactFlowNode[] = useMemo(() => [
    // Main Performance node (orange background)
    {
      id: 'P',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { 
        label: 'Performance',
        style: { 
          width: '150px',
          backgroundColor: '#f96',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    
    // Feature nodes (blue background)
    {
      id: 'D',
      type: 'default',
      position: { x: 200, y: 150 },
      data: { 
        label: 'Distribution',
        style: { 
          width: '150px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'C',
      type: 'default',
      position: { x: 400, y: 150 },
      data: { 
        label: 'Caching',
        style: { 
          width: '150px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'O',
      type: 'default',
      position: { x: 600, y: 150 },
      data: { 
        label: 'Optimization',
        style: { 
          width: '150px',
          backgroundColor: '#58f',
          borderColor: '#333',
          color: '#fff',
          fontWeight: 'bold'
        }
      },
    },
    
    // Optimization nodes for Distribution (green background)
    {
      id: 'DP',
      type: 'default',
      position: { x: 100, y: 250 },
      data: { 
        label: 'Parallel Processing',
        style: { 
          width: '180px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'DL',
      type: 'default',
      position: { x: 200, y: 330 },
      data: { 
        label: 'Load Balancing',
        style: { 
          width: '150px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'DS',
      type: 'default',
      position: { x: 300, y: 250 },
      data: { 
        label: 'Service Scaling',
        style: { 
          width: '150px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    
    // Optimization nodes for Caching (green background)
    {
      id: 'CM',
      type: 'default',
      position: { x: 300, y: 330 },
      data: { 
        label: 'Memory Management',
        style: { 
          width: '180px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'CI',
      type: 'default',
      position: { x: 400, y: 250 },
      data: { 
        label: 'Index Optimization',
        style: { 
          width: '180px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'CR',
      type: 'default',
      position: { x: 500, y: 330 },
      data: { 
        label: 'Resource Control',
        style: { 
          width: '150px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    
    // Optimization nodes for Optimization (green background)
    {
      id: 'OP',
      type: 'default',
      position: { x: 500, y: 250 },
      data: { 
        label: 'Pattern Optimization',
        style: { 
          width: '180px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'OQ',
      type: 'default',
      position: { x: 600, y: 330 },
      data: { 
        label: 'Query Optimization',
        style: { 
          width: '180px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'OR',
      type: 'default',
      position: { x: 700, y: 250 },
      data: { 
        label: 'Resource Optimization',
        style: { 
          width: '180px',
          backgroundColor: '#5f5',
          borderColor: '#333',
          color: '#333',
          fontWeight: 'bold'
        }
      },
    },
  ], []);

  // Define the edges connecting the nodes
  const edges: ReactFlowEdge[] = useMemo(() => [
    // Main connections
    {
      id: 'e-P-D',
      source: 'P',
      target: 'D',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-P-C',
      source: 'P',
      target: 'C',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-P-O',
      source: 'P',
      target: 'O',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    
    // Distribution connections
    {
      id: 'e-D-DP',
      source: 'D',
      target: 'DP',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-D-DL',
      source: 'D',
      target: 'DL',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-D-DS',
      source: 'D',
      target: 'DS',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    
    // Caching connections
    {
      id: 'e-C-CM',
      source: 'C',
      target: 'CM',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-C-CI',
      source: 'C',
      target: 'CI',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-C-CR',
      source: 'C',
      target: 'CR',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    
    // Optimization connections
    {
      id: 'e-O-OP',
      source: 'O',
      target: 'OP',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-O-OQ',
      source: 'O',
      target: 'OQ',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e-O-OR',
      source: 'O',
      target: 'OR',
      style: { stroke: '#333', strokeWidth: 2 },
      animated: false,
    },
  ], []);

  // Create the flow definition
  const flowDefinition: ReactFlowDefinition = useMemo(() => ({
    nodes,
    edges
  }), [nodes, edges]);

  return (
    <div style={{ width: '100%' }}>
      {title && <h3>{title}</h3>}
      
      <ReactFlowDiagram
        definition={flowDefinition}
        theme={theme}
        width={width}
        height={height}
        showZoomControls={showZoomControls}
        accessibilityDescription={accessibilityDescription}
        showBackground={true}
        customOptions={{
          nodesDraggable: false,
          nodesConnectable: false,
          elementsSelectable: false,
        }}
      />
    </div>
  );
}; 