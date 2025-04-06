'use client';

import React, { useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import styled from 'styled-components';

// Import our components
import { ReactFlowClientWrapper } from './ReactFlowClientWrapper';
import { DiagramRenderer } from './DiagramRenderer';
import { nodeTypes, CustomNodeData } from './nodeTypes';
import { ReactFlowNode, ReactFlowEdge, ReactFlowDiagramProps, ReactFlowDefinition } from './ReactFlowDiagram.types';

// Styled components for the diagram
const DiagramOuterContainer = styled.div<{ $maxWidth?: string; $height: string }>`
  width: 100%;
  max-width: ${props => props.$maxWidth || '100%'};
  height: ${props => props.$height || '600px'};
  min-height: ${props => props.$height || '600px'};
  margin: 0 auto;
  position: relative;
`;

const TitleContainer = styled.div`
  margin-bottom: 1rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary || '#333'};
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text.secondary || '#666'};
  }
`;

interface EnhancedReactFlowDiagramProps extends Omit<ReactFlowDiagramProps, 'parseMode'> {
  debug?: boolean;
  maxWidth?: string;
  style?: React.CSSProperties;
}

/**
 * Enhanced React Flow Diagram Component
 * 
 * This component combines:
 * 1. Client-side initialization with ReactFlowClientWrapper
 * 2. Robust rendering with DiagramRenderer
 * 3. Custom node types
 * 4. Error handling and debug features
 * 
 * Use this component as the main entry point for React Flow diagrams.
 */
export const EnhancedReactFlowDiagram: React.FC<EnhancedReactFlowDiagramProps> = ({
  definition,
  title,
  description,
  className,
  theme = 'default',
  width = '100%',
  height = '600px',
  backgroundColor,
  showZoomControls = true,
  showBackground = true,
  accessibilityDescription,
  customOptions = {},
  debug = false,
  maxWidth,
  style,
}) => {
  const [error, setError] = useState<Error | null>(null);
  const [nodes, setNodes] = useState<ReactFlowNode[]>([]);
  const [edges, setEdges] = useState<ReactFlowEdge[]>([]);

  // Process the definition to extract nodes and edges
  useEffect(() => {
    try {
      if (definition) {
        if (debug) {
          console.log('[EnhancedReactFlowDiagram] Processing definition:', definition);
        }

        // Check if definition is a ReactFlowDefinition object
        if (typeof definition === 'object' && definition !== null) {
          const reactFlowDef = definition as ReactFlowDefinition;
          
          // Extract and validate nodes and edges from the definition
          const definitionNodes = Array.isArray(reactFlowDef.nodes) ? reactFlowDef.nodes : [];
          const definitionEdges = Array.isArray(reactFlowDef.edges) ? reactFlowDef.edges : [];

          // Validate node positions
          const validNodes = definitionNodes.filter((node: ReactFlowNode) => {
            const isValid = node.id && 
                           node.position && 
                           typeof node.position.x === 'number' && 
                           typeof node.position.y === 'number' &&
                           !isNaN(node.position.x) &&
                           !isNaN(node.position.y);
            
            if (!isValid && debug) {
              console.warn('[EnhancedReactFlowDiagram] Invalid node filtered out:', node);
            }
            
            return isValid;
          });

          setNodes(validNodes);
          setEdges(definitionEdges);
        } else {
          // Handle string definitions (for Mermaid compatibility)
          console.warn('[EnhancedReactFlowDiagram] String definitions not yet supported');
          setNodes([]);
          setEdges([]);
        }
      }
    } catch (err) {
      console.error('[EnhancedReactFlowDiagram] Error processing definition:', err);
      setError(err instanceof Error ? err : new Error('Failed to process diagram definition'));
    }
  }, [definition, debug]);

  // If there's an error, display it
  if (error) {
    return (
      <div className={className} style={{ padding: '1rem', color: 'red', border: '1px solid red' }}>
        <h3>Error rendering diagram</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  // Get height value as string
  const heightValue = typeof height === 'number' ? `${height}px` : height;

  return (
    <DiagramOuterContainer className={className} $maxWidth={maxWidth} $height={heightValue} style={style}>
      {(title || description) && (
        <TitleContainer>
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </TitleContainer>
      )}
      
      <div style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: '100%',
      }}>
        <ReactFlowClientWrapper debug={debug} loadingMessage="Initializing diagram...">
          <DiagramRenderer
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            backgroundColor={backgroundColor}
            showControls={showZoomControls}
            showBackground={showBackground}
            debug={debug}
            interactive={customOptions.interactive !== false}
            fitView={customOptions.fitView !== false}
            style={{ height: '100%' }}
          />
        </ReactFlowClientWrapper>
      </div>
      
      {accessibilityDescription && (
        <div className="sr-only" role="note" aria-label="Diagram description">
          {accessibilityDescription}
        </div>
      )}
    </DiagramOuterContainer>
  );
};

export default EnhancedReactFlowDiagram; 