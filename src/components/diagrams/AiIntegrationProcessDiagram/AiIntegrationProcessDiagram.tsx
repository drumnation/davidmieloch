import React, { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

// Import types
import { AiIntegrationProcessDiagramProps } from './AiIntegrationProcessDiagram.types';

// Import the ReactFlowDiagramClient component and related types
import { ReactFlowDiagramClient } from '../../../shared-components/molecules/ReactFlowDiagram';
import { ReactFlowNode, ReactFlowEdge, ReactFlowDefinition } from '../../../shared-components/molecules/ReactFlowDiagram/ReactFlowDiagram.types';

// Enhanced helper function to validate node positions
const isValidNodePosition = (node: ReactFlowNode): boolean => {
  // Check if node and position exist
  if (!node || !node.position) {
    console.warn('Invalid node: missing position', node);
    return false;
  }
  
  const { x, y } = node.position;
  
  // Check if x and y are valid numbers
  const isValid = (
    typeof x === 'number' && 
    !isNaN(x) &&
    isFinite(x) &&
    typeof y === 'number' && 
    !isNaN(y) &&
    isFinite(y)
  );
  
  if (!isValid) {
    console.warn(`Node ${node.id} has invalid position:`, node.position);
  }
  
  return isValid;
};

export const AiIntegrationProcessDiagram: React.FC<AiIntegrationProcessDiagramProps> = ({
  title = "AI Integration Process Flow",
  description = "The following diagram illustrates the ideal process flow for integrating AI into development workflows",
  className = '',
  theme = 'default',
  width = '100%',
  height = '800px',
  backgroundColor,
  showZoomControls = true,
  accessibilityDescription = 'Flow diagram showing the AI integration process from workflow assessment to continuous improvement',
  containerClassName,
  graphClassName,
  nodes: initialNodes,
  edges: initialEdges,
  nodeValidationEnabled,
  onNodePositionsChange,
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

  // Filter out any nodes with invalid positions before returning
  const validatedNodes: ReactFlowNode[] = useMemo(() => {
    // First, validate each node's position
    return nodes.filter(isValidNodePosition);
  }, [nodes]);

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

  // Convert width and height to strings if they are numbers
  const widthStr = typeof width === 'number' ? `${width}px` : width;
  const heightStr = typeof height === 'number' ? `${height}px` : height;
  
  // Define the flow definition for the React Flow component
  const flowDefinition: ReactFlowDefinition = useMemo(() => ({
    nodes: validatedNodes,
    edges,
  }), [validatedNodes, edges]);

  return (
    <ReactFlowDiagramClient
      definition={flowDefinition}
      className={className}
      theme={theme}
      width={widthStr}
      height={heightStr}
      backgroundColor={backgroundColor}
      showZoomControls={showZoomControls}
      showBackground={true}
      accessibilityDescription={accessibilityDescription}
      customOptions={{}}
    />
  );
};

export default AiIntegrationProcessDiagram; 