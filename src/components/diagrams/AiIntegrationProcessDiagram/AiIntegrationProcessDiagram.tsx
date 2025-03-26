import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

import { AiIntegrationProcessDiagramProps } from './AiIntegrationProcessDiagram.types';
import { ReactFlowDiagram } from '../../../shared-components/molecules/ReactFlowDiagram/ReactFlowDiagram';
import { ReactFlowDefinition, ReactFlowNode, ReactFlowEdge } from '../../../shared-components/molecules/ReactFlowDiagram/ReactFlowDiagram.types';

const AiIntegrationProcessDiagram: React.FC<AiIntegrationProcessDiagramProps> = ({
  title = "AI Integration Process Flow",
  description = "The following diagram illustrates the ideal process flow for integrating AI into development workflows",
  className = '',
  theme = 'default',
  width = '100%',
  height = '800px',
  backgroundColor,
  showZoomControls = true,
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
        style: { width: '240px' }
      },
    },
    {
      id: 'B',
      type: 'default',
      position: { x: 400, y: 150 },
      data: { 
        label: 'Identify AI Opportunities',
        icon: '💡',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'C',
      type: 'default',
      position: { x: 400, y: 250 },
      data: { 
        label: 'Define Human/AI Roles',
        icon: '👥',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'D1',
      type: 'default',
      position: { x: 400, y: 350 },
      data: { 
        label: 'Knowledge Integration',
        icon: '🧠',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'D2',
      type: 'default',
      position: { x: 400, y: 450 },
      data: { 
        label: 'Implement Prompt Engineering',
        icon: '⌨️',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'D3',
      type: 'default',
      position: { x: 400, y: 550 },
      data: { 
        label: 'Build Validation Frameworks',
        icon: '✓',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'E',
      type: 'default',
      position: { x: 400, y: 650 },
      data: { 
        label: 'Optimize Development Workflow',
        icon: '⚙️',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'F',
      type: 'default',
      position: { x: 400, y: 750 },
      data: { 
        label: 'Train Teams on AI Collaboration',
        icon: '🧑‍🏫',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'G',
      type: 'default',
      position: { x: 400, y: 850 },
      data: { 
        label: 'Define Quality-Focused Metrics',
        icon: '📊',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'H',
      type: 'default',
      position: { x: 400, y: 950 },
      data: { 
        label: 'Measure Results',
        icon: '📏',
        iconPosition: 'left',
        style: { width: '240px' }
      },
    },
    {
      id: 'I',
      type: 'pill',
      position: { x: 400, y: 1050 },
      data: { 
        label: 'Successful?',
        style: { borderColor: '#4a6bff', fontWeight: 'bold', width: '180px' }
      },
    },
    {
      id: 'J',
      type: 'default',
      position: { x: 600, y: 1150 },
      data: { 
        label: 'Scale Integration',
        icon: '📈',
        iconPosition: 'left',
        style: { width: '200px' }
      },
    },
    {
      id: 'K',
      type: 'default',
      position: { x: 200, y: 1150 },
      data: { 
        label: 'Refine Approach',
        icon: '🔄',
        iconPosition: 'left',
        style: { width: '200px' }
      },
    },
    {
      id: 'L',
      type: 'default',
      position: { x: 600, y: 1250 },
      data: { 
        label: 'Continuous Improvement',
        icon: '♾️',
        iconPosition: 'left',
        style: { width: '240px' }
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

  // Create the diagram definition object
  const flowDefinition: ReactFlowDefinition = useMemo(() => ({
    nodes,
    edges,
  }), [nodes, edges]);

  // Set custom options for fixed, non-interactive diagram
  const customOptions = {
    nodesDraggable: false,
    nodesConnectable: false,
    elementsSelectable: false,
    zoomOnScroll: false,
    panOnScroll: false,
    panOnDrag: false,
    preventScrolling: true,
  };

  return (
    <div className={className}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      
      <ReactFlowDiagram
        width={typeof width === 'number' ? `${width}px` : width}
        height={typeof height === 'number' ? `${height}px` : height}
        theme={theme}
        backgroundColor={backgroundColor || "#ffffff"}
        showZoomControls={showZoomControls}
        showBackground={true}
        accessibilityDescription={accessibilityDescription}
        definition={flowDefinition}
        parseMode="reactflow"
        customOptions={customOptions}
      />
    </div>
  );
};

export { AiIntegrationProcessDiagram };
export default AiIntegrationProcessDiagram; 