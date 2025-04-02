import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

import { AiIntegrationFlowDiagramProps } from './AiIntegrationFlowDiagram.types';
import { ReactFlowDiagram } from '../../molecules/ReactFlowDiagram/ReactFlowDiagram';
import { ReactFlowDefinition, ReactFlowNode, ReactFlowEdge } from '../../molecules/ReactFlowDiagram/ReactFlowDiagram.types';

export const AiIntegrationFlowDiagram: React.FC<AiIntegrationFlowDiagramProps> = ({
  title = "AI Integration Process Flow",
  description = "The following diagram illustrates the ideal process flow for integrating AI into development workflows",
  className = '',
  theme = 'default',
  width = '100%',
  height = '1000px',
  showZoomControls = false,
  accessibilityDescription = 'Flow diagram showing the AI integration process from workflow assessment to continuous improvement',
}) => {
  // Define the nodes for the AI Integration Process Flow
  const nodes: ReactFlowNode[] = useMemo(() => [
    {
      id: 'A',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { 
        label: 'Assess Current Workflow',
        icon: '🔍',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'B',
      type: 'default',
      position: { x: 400, y: 140 },
      data: { 
        label: 'Identify AI Opportunities',
        icon: '💡',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'C',
      type: 'default',
      position: { x: 400, y: 230 },
      data: { 
        label: 'Define Human/AI Roles',
        icon: '👥',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'D1',
      type: 'default',
      position: { x: 400, y: 320 },
      data: { 
        label: 'Knowledge Integration',
        icon: '🧠',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'D2',
      type: 'default',
      position: { x: 400, y: 410 },
      data: { 
        label: 'Implement Prompt Engineering',
        icon: '⌨️',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'D3',
      type: 'default',
      position: { x: 400, y: 500 },
      data: { 
        label: 'Build Validation Frameworks',
        icon: '✓',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'E',
      type: 'default',
      position: { x: 400, y: 590 },
      data: { 
        label: 'Optimize Development Workflow',
        icon: '⚙️',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'F',
      type: 'default',
      position: { x: 400, y: 680 },
      data: { 
        label: 'Train Teams on AI Collaboration',
        icon: '🧑‍🏫',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'G',
      type: 'default',
      position: { x: 400, y: 770 },
      data: { 
        label: 'Define Quality-Focused Metrics',
        icon: '📊',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'H',
      type: 'default',
      position: { x: 400, y: 860 },
      data: { 
        label: 'Measure Results',
        icon: '📏',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
    {
      id: 'I',
      type: 'pill',
      position: { x: 400, y: 950 },
      data: { 
        label: 'Successful?',
        style: { borderColor: '#4a6bff', fontWeight: 'bold', width: '140px' }
      },
    },
    {
      id: 'J',
      type: 'default',
      position: { x: 550, y: 1030 },
      data: { 
        label: 'Scale Integration',
        icon: '📈',
        iconPosition: 'left',
        style: { width: '180px' }
      },
    },
    {
      id: 'K',
      type: 'default',
      position: { x: 250, y: 1030 },
      data: { 
        label: 'Refine Approach',
        icon: '🔄',
        iconPosition: 'left',
        style: { width: '180px' }
      },
    },
    {
      id: 'L',
      type: 'default',
      position: { x: 550, y: 1120 },
      data: { 
        label: 'Continuous Improvement',
        icon: '♾️',
        iconPosition: 'left',
        style: { width: '220px' }
      },
    },
  ], []);

  // Define the edges connecting the nodes
  const edges: ReactFlowEdge[] = useMemo(() => [
    {
      id: 'e-A-B',
      source: 'A',
      target: 'B',
    },
    {
      id: 'e-B-C',
      source: 'B',
      target: 'C',
    },
    {
      id: 'e-C-D1',
      source: 'C',
      target: 'D1',
    },
    {
      id: 'e-D1-D2',
      source: 'D1',
      target: 'D2',
    },
    {
      id: 'e-D2-D3',
      source: 'D2',
      target: 'D3',
    },
    {
      id: 'e-D3-E',
      source: 'D3',
      target: 'E',
    },
    {
      id: 'e-E-F',
      source: 'E',
      target: 'F',
    },
    {
      id: 'e-F-G',
      source: 'F',
      target: 'G',
    },
    {
      id: 'e-G-H',
      source: 'G',
      target: 'H',
    },
    {
      id: 'e-H-I',
      source: 'H',
      target: 'I',
    },
    {
      id: 'e-I-J',
      source: 'I',
      target: 'J',
      label: 'Yes',
      style: { stroke: '#4a6bff' },
    },
    {
      id: 'e-I-K',
      source: 'I',
      target: 'K',
      label: 'No',
      style: { stroke: '#ff4a4a' },
    },
    {
      id: 'e-K-C',
      source: 'K',
      target: 'C',
      type: 'step',
      style: { stroke: '#ff4a4a' },
    },
    {
      id: 'e-J-L',
      source: 'J',
      target: 'L',
      style: { stroke: '#4a6bff' },
    },
    {
      id: 'e-L-H',
      source: 'L',
      target: 'H',
      type: 'step',
      style: { stroke: '#4a6bff' },
      animated: true,
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
    margin: '0 auto',
  }), []);

  return (
    <div className={className} style={containerStyle}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      
      <ReactFlowDiagram
        definition={flowDefinition}
        theme={theme}
        width={width}
        height={height}
        className=""
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
            minZoom: 0.8,
            maxZoom: 1,
          },
        }}
      />
    </div>
  );
};

export default AiIntegrationFlowDiagram; 