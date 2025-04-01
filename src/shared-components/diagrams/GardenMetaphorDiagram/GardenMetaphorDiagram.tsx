import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

// Import types
import { GardenMetaphorDiagramProps } from './GardenMetaphorDiagram.types';

// Import the ReactFlowDiagram component and related types
import { ReactFlowDiagram } from '../../molecules/ReactFlowDiagram/ReactFlowDiagram';
import { 
  ReactFlowNode, 
  ReactFlowEdge,
  ReactFlowDefinition
} from '../../molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * A component that renders the Garden Metaphor diagram using React Flow
 * 
 * Based on the original Mermaid.js diagram:
 * ```
 * flowchart LR
 *   %% Define the three main phases with their icons
 *   Seed[/"Seed"/]
 *   Sprout[/"Sprout"/]
 *   Mature[/"Mature"/]
 *   
 *   %% Main flow
 *   Seed --> Sprout --> Mature
 *   
 *   %% Branch out the key aspects from each phase
 *   Seed --> S1["Initial Setup"]
 *   Seed --> S2["Knowledge Structure"]
 *   Seed --> S3["Core Prompts"]
 *   
 *   Sprout --> SP1["Cultivating Patterns"]
 *   Sprout --> SP2["Testing & Refining"]
 *   Sprout --> SP3["Expanding Capabilities"]
 *   
 *   Mature --> M1["Self-Improving"]
 *   Mature --> M2["Context-Aware"]
 *   Mature --> M3["Continuously Adapting"]
 * ```
 */
export const GardenMetaphorDiagram: React.FC<GardenMetaphorDiagramProps> = ({
  title = "The Garden Metaphor: Growing Your Project",
  className = '',
  theme = 'default',
  width = '100%',
  height = '600px',
  showZoomControls = true,
  accessibilityDescription = 'Garden Metaphor Diagram showing the three phases of a Brain Garden project\'s growth - from initial setup to self-improving system',
}) => {
  // Define the nodes for the diagram
  const nodes: ReactFlowNode[] = useMemo(() => [
    // Three main phases
    {
      id: 'Seed',
      type: 'capsule', // Special shape as in the original Mermaid using slashes
      position: { x: 250, y: 100 },
      data: { 
        label: 'Seed',
        style: { 
          width: '100px',
          backgroundColor: '#4a6bff',
          color: 'white',
          borderWidth: '2px',
          borderColor: '#333',
          borderRadius: '10px',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'Sprout',
      type: 'capsule',
      position: { x: 450, y: 100 },
      data: { 
        label: 'Sprout',
        style: { 
          width: '100px',
          backgroundColor: '#4a6bff',
          color: 'white',
          borderWidth: '2px',
          borderColor: '#333',
          borderRadius: '10px',
          fontWeight: 'bold'
        }
      },
    },
    {
      id: 'Mature',
      type: 'capsule',
      position: { x: 650, y: 100 },
      data: { 
        label: 'Mature',
        style: { 
          width: '100px',
          backgroundColor: '#4a6bff',
          color: 'white',
          borderWidth: '2px',
          borderColor: '#333',
          borderRadius: '10px',
          fontWeight: 'bold'
        }
      },
    },
    
    // Seed phase aspects
    {
      id: 'S1',
      type: 'default',
      position: { x: 150, y: 200 },
      data: { 
        label: 'Initial Setup',
        style: { 
          width: '150px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    {
      id: 'S2',
      type: 'default',
      position: { x: 250, y: 200 },
      data: { 
        label: 'Knowledge Structure',
        style: { 
          width: '170px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    {
      id: 'S3',
      type: 'default',
      position: { x: 350, y: 200 },
      data: { 
        label: 'Core Prompts',
        style: { 
          width: '150px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    
    // Sprout phase aspects
    {
      id: 'SP1',
      type: 'default',
      position: { x: 400, y: 200 },
      data: { 
        label: 'Cultivating Patterns',
        style: { 
          width: '170px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    {
      id: 'SP2',
      type: 'default',
      position: { x: 450, y: 270 },
      data: { 
        label: 'Testing & Refining',
        style: { 
          width: '170px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    {
      id: 'SP3',
      type: 'default',
      position: { x: 500, y: 200 },
      data: { 
        label: 'Expanding Capabilities',
        style: { 
          width: '170px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    
    // Mature phase aspects
    {
      id: 'M1',
      type: 'default',
      position: { x: 600, y: 200 },
      data: { 
        label: 'Self-Improving',
        style: { 
          width: '150px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    {
      id: 'M2',
      type: 'default',
      position: { x: 650, y: 270 },
      data: { 
        label: 'Context-Aware',
        style: { 
          width: '150px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
    {
      id: 'M3',
      type: 'default',
      position: { x: 700, y: 200 },
      data: { 
        label: 'Continuously Adapting',
        style: { 
          width: '170px',
          backgroundColor: '#47b881',
          color: 'white',
          borderColor: '#333',
        }
      },
    },
  ], []);

  // Define the edges connecting the nodes
  const edges: ReactFlowEdge[] = useMemo(() => [
    // Main flow connections
    {
      id: 'e-Seed-Sprout',
      source: 'Seed',
      target: 'Sprout',
      style: { stroke: '#666' },
    },
    {
      id: 'e-Sprout-Mature',
      source: 'Sprout',
      target: 'Mature',
      style: { stroke: '#666' },
    },
    
    // Seed connections
    {
      id: 'e-Seed-S1',
      source: 'Seed',
      target: 'S1',
      style: { stroke: '#666' },
    },
    {
      id: 'e-Seed-S2',
      source: 'Seed',
      target: 'S2',
      style: { stroke: '#666' },
    },
    {
      id: 'e-Seed-S3',
      source: 'Seed',
      target: 'S3',
      style: { stroke: '#666' },
    },
    
    // Sprout connections
    {
      id: 'e-Sprout-SP1',
      source: 'Sprout',
      target: 'SP1',
      style: { stroke: '#666' },
    },
    {
      id: 'e-Sprout-SP2',
      source: 'Sprout',
      target: 'SP2',
      style: { stroke: '#666' },
    },
    {
      id: 'e-Sprout-SP3',
      source: 'Sprout',
      target: 'SP3',
      style: { stroke: '#666' },
    },
    
    // Mature connections
    {
      id: 'e-Mature-M1',
      source: 'Mature',
      target: 'M1',
      style: { stroke: '#666' },
    },
    {
      id: 'e-Mature-M2',
      source: 'Mature',
      target: 'M2',
      style: { stroke: '#666' },
    },
    {
      id: 'e-Mature-M3',
      source: 'Mature',
      target: 'M3',
      style: { stroke: '#666' },
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
        backgroundColor="transparent" // To match the requirement for transparent background
        parseMode="reactflow"
        customOptions={{
          nodesDraggable: false,
          nodesConnectable: false,
          elementsSelectable: false,
        }}
      />
    </div>
  );
};

export default GardenMetaphorDiagram; 