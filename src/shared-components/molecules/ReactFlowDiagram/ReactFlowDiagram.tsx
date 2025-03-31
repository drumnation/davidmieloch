import React, { useMemo } from 'react';
import { Background, Controls, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ReactFlowDiagramProps, ReactFlowDefinition } from './ReactFlowDiagram.types';
import { 
  DiagramWrapper, 
  DiagramContainer, 
  AccessibilityDescription, 
  StyledReactFlow,
  ReactFlowGlobalStyles 
} from './ReactFlowDiagram.styles';
import { nodeTypes, themeMapperUtils } from './utils';

export const ReactFlowDiagram: React.FC<ReactFlowDiagramProps> = ({
  definition,
  className = '',
  theme = 'default',
  width = '100%',
  height = '400px',
  backgroundColor,
  showZoomControls = false,
  showBackground = false,
  accessibilityDescription = '',
  parseMode = 'auto',
  customOptions = {}
}) => {
  // Parse the definition based on parseMode
  const { initialNodes, initialEdges } = useMemo(() => {
    // If the definition is an object with nodes and edges, use it directly
    if (typeof definition === 'object' && definition !== null) {
      return {
        initialNodes: (definition as ReactFlowDefinition).nodes || [],
        initialEdges: (definition as ReactFlowDefinition).edges || [],
      };
    }
    
    // For this proof of concept, if definition is undefined or a string (mermaid),
    // return some default nodes and edges
    return {
      initialNodes: [
        {
          id: '1',
          type: 'default',
          position: { x: 100, y: 100 },
          data: { 
            label: 'Node 1', 
            icon: '🚀',
            iconPosition: 'left',
          },
        },
        {
          id: '2',
          type: 'pill',
          position: { x: 300, y: 100 },
          data: { 
            label: 'Seed',
            icon: '🌱',
            iconPosition: 'left',
          },
        },
        {
          id: '3',
          type: 'default',
          position: { x: 500, y: 100 },
          data: { 
            label: 'Node 3',
            icon: '⚙️',
            iconPosition: 'right', 
          },
        },
        {
          id: '4',
          type: 'default',
          position: { x: 300, y: 200 },
          data: { 
            label: 'Node 4',
            style: { backgroundColor: '#4a6bff', color: 'white' }
          },
        },
      ],
      initialEdges: [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
        },
        {
          id: 'e2-3',
          source: '2',
          target: '3',
        },
        {
          id: 'e2-4',
          source: '2',
          target: '4',
          animated: true,
          style: { stroke: '#4a6bff' },
        },
      ],
    };
  }, [definition]);

  // Set up nodes and edges state
  const [nodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Get theme configuration
  const themeConfig = useMemo(() => themeMapperUtils.getThemeConfig(theme), [theme]);
  
  // Custom background color or from theme
  const bgColor = backgroundColor || themeConfig.backgroundColor;
  
  // Combine default class with user-provided class and conditional background class
  const combinedClassName = `${className} ${showBackground ? 'react-flow--with-background' : ''}`.trim();
  
  return (
    <>
      {/* Apply global styles for ReactFlow */}
      <ReactFlowGlobalStyles />
      
      <DiagramWrapper $width={width}>
        {accessibilityDescription && (
          <AccessibilityDescription role="note" aria-label="Diagram description">
            {accessibilityDescription}
          </AccessibilityDescription>
        )}
        
        <DiagramContainer 
          $width={width} 
          $height={height} 
          $backgroundColor={bgColor}
        >
          <StyledReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            className={combinedClassName}
            {...customOptions}
          >
            {showBackground && <Background />}
            {showZoomControls && <Controls />}
          </StyledReactFlow>
        </DiagramContainer>
      </DiagramWrapper>
    </>
  );
};

export default ReactFlowDiagram; 