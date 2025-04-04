'use client';

import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import types and components
import { BrainGardenComponentsDiagramProps } from './BrainGardenComponentsDiagram.types';
import DiagramFlow from './BrainGardenComponentsDiagram.flow';

/**
 * A component that renders the Brain Garden Core Components diagram using React Flow
 * with automatic layout using the Dagre algorithm
 * 
 * This diagram shows the three main components of the Brain Garden system:
 * - Knowledge System
 * - Prompt System
 * - Structured Documentation
 */
export const BrainGardenComponentsDiagram: React.FC<BrainGardenComponentsDiagramProps> = (props) => {
  const {
    title = "Brain Garden Core Components",
    className = '',
    theme = 'default',
    width = '100%', // Use 100% to fill available space
    height = '600px', // Increased height
    showZoomControls = true,
    nodesDraggable = false,
    accessibilityDescription = 'Brain Garden Core Components Diagram showing Knowledge System, Prompt System, and Structured Documentation',
    debug = false,
    backgroundColor = '#f9f9f9',
    ...restProps
  } = props;

  return (
    <ReactFlowProvider>
      <DiagramFlow 
        title={title}
        className={className}
        theme={theme}
        width={width}
        height={height}
        showZoomControls={showZoomControls}
        nodesDraggable={nodesDraggable}
        accessibilityDescription={accessibilityDescription}
        debug={debug}
        backgroundColor={backgroundColor}
        {...restProps}
      />
    </ReactFlowProvider>
  );
};

export default BrainGardenComponentsDiagram;
