'use client';

import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import types and components
import { SoftwareEngineeringMeceDiagramProps } from './SoftwareEngineeringMeceDiagram.types';
import DiagramFlow from './SoftwareEngineeringMeceDiagram.flow';
import { DiagramContainer } from './SoftwareEngineeringMeceDiagram.styles';

/**
 * A component that renders a Software Engineering MECE (Mutually Exclusive, Collectively Exhaustive) diagram
 * showing the key components and layers of software engineering using React Flow
 * 
 * This diagram illustrates the MECE principle applied to software engineering, with:
 * - Clear separation of concerns
 * - Distinct layers and responsibilities
 * - Comprehensive coverage of software engineering aspects
 */
export const SoftwareEngineeringMeceDiagram: React.FC<SoftwareEngineeringMeceDiagramProps> = (props) => {
  const {
    title = "Software Engineering MECE Diagram",
    className = '',
    theme = 'light',
    width = '100%',
    height = '600px',
    showZoomControls = true,
    nodesDraggable = false,
    accessibilityDescription = 'Software Engineering MECE Diagram showing UI Layer, Business Logic, Data Access, and Infrastructure components',
    debug = false,
    backgroundColor = '#f9fafb',
    ...restProps
  } = props;

  return (
    <DiagramContainer width={width} height={height} className={className}>
      <ReactFlowProvider>
        <DiagramFlow 
          title={title}
          theme={theme}
          width="100%"
          height="100%"
          showZoomControls={showZoomControls}
          nodesDraggable={nodesDraggable}
          accessibilityDescription={accessibilityDescription}
          debug={debug}
          backgroundColor={backgroundColor}
          {...restProps}
        />
      </ReactFlowProvider>
    </DiagramContainer>
  );
};

export default SoftwareEngineeringMeceDiagram; 