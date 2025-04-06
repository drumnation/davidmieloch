'use client';

import React from 'react';
import ClientDiagramWrapper from '../../../../shared-components/molecules/ReactFlowDiagram/ClientDiagramWrapper';
import { DiagramClientWrapperProps } from './DiagramClientWrapper.types';
import { DiagramContainer } from './DiagramClientWrapper.styles';

/**
 * A client-side wrapper component for diagram components
 * 
 * This is a convenient wrapper that:
 * 1. Uses the 'use client' directive to ensure components only run on the client
 * 2. Provides the ReactFlowProvider context needed for React Flow
 * 3. Applies consistent styling and structure for all diagrams
 * 4. Can be easily applied to any diagram component
 */
export const DiagramClientWrapper: React.FC<DiagramClientWrapperProps> = ({
  children,
  className,
  title,
  description,
  shadow = true,
  backgroundColor = 'white',
  padding = '1rem',
  borderRadius = '8px',
}) => {
  return (
    <DiagramContainer 
      className={className}
      $shadow={shadow}
      $backgroundColor={backgroundColor}
      $padding={padding}
      $borderRadius={borderRadius}
    >
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      <ClientDiagramWrapper>
        {children}
      </ClientDiagramWrapper>
    </DiagramContainer>
  );
};

export default DiagramClientWrapper; 