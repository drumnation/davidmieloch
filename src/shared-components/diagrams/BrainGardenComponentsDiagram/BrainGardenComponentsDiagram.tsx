import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

// Import types
import { BrainGardenComponentsDiagramProps } from './BrainGardenComponentsDiagram.types';

// Import the ReactFlowDiagram component and related types
import { ReactFlowDiagram } from '../../molecules/ReactFlowDiagram/ReactFlowDiagram';
import { 
  ReactFlowNode, 
  ReactFlowEdge,
  ReactFlowDefinition
} from '../../molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * A component that renders the Brain Garden Core Components diagram using React Flow
 * 
 * This diagram shows the three main components of the Brain Garden system:
 * - Knowledge System
 * - Prompt System
 * - Structured Documentation
 */
export const BrainGardenComponentsDiagram: React.FC<BrainGardenComponentsDiagramProps> = ({
  title = "Brain Garden Core Components",
  className = '',
  theme = 'default',
  width = '100%',
  height = '600px', // Set a fixed height instead of auto
  showZoomControls = true,
  accessibilityDescription = 'Brain Garden Core Components Diagram showing Knowledge System, Prompt System, and Structured Documentation',
}) => {
  // Define the nodes for the diagram
  const nodes: ReactFlowNode[] = useMemo(() => [
    // Main node
    {
      id: 'BG',
      type: 'default',
      position: { x: 450, y: 80 },
      data: { 
        label: '.brain Directory',
        icon: '🧠',
        iconPosition: 'left',
        style: { 
          width: '200px',
          borderColor: '#6772e5',
          borderWidth: '2px',
          fontWeight: 'bold',
          backgroundColor: '#eef0ff'
        }
      },
    },
    
    // Core Components
    {
      id: 'KS',
      type: 'default',
      position: { x: 200, y: 200 },
      data: { 
        label: 'Knowledge System',
        icon: '📚',
        iconPosition: 'left',
        style: { 
          width: '200px',
          backgroundColor: '#f0f8ff',
          borderColor: '#4a6bff'
        }
      },
    },
    {
      id: 'PS',
      type: 'default',
      position: { x: 450, y: 200 },
      data: { 
        label: 'Prompt System',
        icon: '💬',
        iconPosition: 'left',
        style: { 
          width: '200px',
          backgroundColor: '#f0f8ff',
          borderColor: '#4a6bff'
        }
      },
    },
    {
      id: 'SD',
      type: 'default',
      position: { x: 700, y: 200 },
      data: { 
        label: 'Structured Documentation',
        icon: '📋',
        iconPosition: 'left',
        style: { 
          width: '200px',
          backgroundColor: '#f0f8ff',
          borderColor: '#4a6bff'
        }
      },
    },
    
    // Knowledge System details
    {
      id: 'K1',
      type: 'pill',
      position: { x: 120, y: 320 },
      data: { 
        label: 'Project Info',
        style: { 
          width: '120px',
          backgroundColor: '#f0f7ff'
        }
      },
    },
    {
      id: 'K2',
      type: 'pill',
      position: { x: 200, y: 380 },
      data: { 
        label: 'Architecture',
        style: { 
          width: '120px',
          backgroundColor: '#f0f7ff'
        }
      },
    },
    {
      id: 'K3',
      type: 'pill',
      position: { x: 280, y: 320 },
      data: { 
        label: 'Skill-Jacks',
        style: { 
          width: '120px',
          backgroundColor: '#f0f7ff'
        }
      },
    },
    
    // Prompt System details
    {
      id: 'P1',
      type: 'pill',
      position: { x: 370, y: 320 },
      data: { 
        label: 'Workflow Prompts',
        style: { 
          width: '150px',
          backgroundColor: '#f0f8f0'
        }
      },
    },
    {
      id: 'P2',
      type: 'pill',
      position: { x: 450, y: 380 },
      data: { 
        label: 'Debugging Prompts',
        style: { 
          width: '150px',
          backgroundColor: '#f0f8f0'
        }
      },
    },
    {
      id: 'P3',
      type: 'pill',
      position: { x: 530, y: 320 },
      data: { 
        label: 'Context Handoff',
        style: { 
          width: '130px',
          backgroundColor: '#f0f8f0'
        }
      },
    },
    
    // Structured Documentation details
    {
      id: 'D1',
      type: 'pill',
      position: { x: 620, y: 320 },
      data: { 
        label: 'Requirements',
        style: { 
          width: '120px',
          backgroundColor: '#fdf8f0'
        }
      },
    },
    {
      id: 'D2',
      type: 'pill',
      position: { x: 700, y: 380 },
      data: { 
        label: 'Components',
        style: { 
          width: '120px',
          backgroundColor: '#fdf8f0'
        }
      },
    },
    {
      id: 'D3',
      type: 'pill',
      position: { x: 780, y: 320 },
      data: { 
        label: 'Implementation Guides',
        style: { 
          width: '180px',
          backgroundColor: '#fdf8f0'
        }
      },
    },
  ], []);

  // Define the edges connecting the nodes
  const edges: ReactFlowEdge[] = useMemo(() => [
    // Main connections
    {
      id: 'e-BG-KS',
      source: 'BG',
      target: 'KS',
      style: { stroke: '#6772e5' },
    },
    {
      id: 'e-BG-PS',
      source: 'BG',
      target: 'PS',
      style: { stroke: '#6772e5' },
    },
    {
      id: 'e-BG-SD',
      source: 'BG',
      target: 'SD',
      style: { stroke: '#6772e5' },
    },
    
    // Knowledge System connections
    {
      id: 'e-KS-K1',
      source: 'KS',
      target: 'K1',
      style: { stroke: '#4a6bff' },
    },
    {
      id: 'e-KS-K2',
      source: 'KS',
      target: 'K2',
      style: { stroke: '#4a6bff' },
    },
    {
      id: 'e-KS-K3',
      source: 'KS',
      target: 'K3',
      style: { stroke: '#4a6bff' },
    },
    
    // Prompt System connections
    {
      id: 'e-PS-P1',
      source: 'PS',
      target: 'P1',
      style: { stroke: '#47b881' },
    },
    {
      id: 'e-PS-P2',
      source: 'PS',
      target: 'P2',
      style: { stroke: '#47b881' },
    },
    {
      id: 'e-PS-P3',
      source: 'PS',
      target: 'P3',
      style: { stroke: '#47b881' },
    },
    
    // Structured Documentation connections
    {
      id: 'e-SD-D1',
      source: 'SD',
      target: 'D1',
      style: { stroke: '#ec815e' },
    },
    {
      id: 'e-SD-D2',
      source: 'SD',
      target: 'D2',
      style: { stroke: '#ec815e' },
    },
    {
      id: 'e-SD-D3',
      source: 'SD',
      target: 'D3',
      style: { stroke: '#ec815e' },
    },
  ], []);

  // Create the flow definition
  const flowDefinition: ReactFlowDefinition = useMemo(() => ({
    nodes,
    edges
  }), [nodes, edges]);

  // Container style for responsive width
  const containerStyle = useMemo(() => ({
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto'
  }), []);

  return (
    <div style={containerStyle}>
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
          fitView: true,
          fitViewOptions: {
            padding: 0.2,
            minZoom: 0.7,
            maxZoom: 1,
          },
        }}
      />
    </div>
  );
};

export default BrainGardenComponentsDiagram;
