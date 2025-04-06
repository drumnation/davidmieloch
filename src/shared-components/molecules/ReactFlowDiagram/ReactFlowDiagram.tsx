'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  ReactFlowDiagramProps,
} from './ReactFlowDiagram.types';
import { AccessibilityDescription, DiagramContainer, DiagramWrapper, LoadingContainer } from './ReactFlowDiagram.styles';

// Dynamically import the real implementation with ssr: false to ensure it never runs on the server
const ReactFlowDiagramContent = dynamic(
  () => import('./ReactFlowDiagramContent').then(mod => mod.ReactFlowDiagramContent),
  { 
    ssr: false,
    loading: () => (
      <LoadingContainer>Loading diagram...</LoadingContainer>
    )
  }
);

/**
 * ReactFlowDiagram is a wrapper component that ensures the React Flow implementation
 * is only loaded on the client-side to prevent "self is not defined" errors during SSR.
 */
export const ReactFlowDiagram: React.FC<ReactFlowDiagramProps> = (props) => {
  const {
    width = '100%',
    height = '400px',
    backgroundColor,
    accessibilityDescription = '',
  } = props;
  
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  
  return (
    <DiagramWrapper $width={widthValue}>
      {accessibilityDescription && (
        <AccessibilityDescription role="note" aria-label="Diagram description">
          {accessibilityDescription}
        </AccessibilityDescription>
      )}
      <DiagramContainer
        $width={widthValue}
        $height={heightValue}
        $backgroundColor={backgroundColor || '#f5f5f5'}
      >
        <ReactFlowDiagramContent {...props} />
      </DiagramContainer>
    </DiagramWrapper>
  );
};

export default ReactFlowDiagram; 