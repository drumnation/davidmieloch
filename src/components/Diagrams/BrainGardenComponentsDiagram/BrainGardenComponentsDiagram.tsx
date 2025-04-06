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
 * This diagram shows the six main components of the Brain Garden system:
 * - Skill Jack System
 * - Prompt System
 * - Structured Documentation
 * - Rules System
 * - Project Management
 * - Watchers System
 */
export const BrainGardenComponentsDiagram: React.FC<BrainGardenComponentsDiagramProps> = (props) => {
  const {
    title = "Brain Garden Core Components",
    className = '',
    theme = 'default',
    width = '100%', // Use 100% to fill available space
    height = '800px', // Increased height for better visibility
    showZoomControls = true,
    nodesDraggable = false,
    accessibilityDescription = 'Brain Garden Core Components Diagram showing Skill Jack System, Prompt System, Structured Documentation, Rules System, Project Management, and Watchers System',
    debug = false,
    backgroundColor = '#f9f9f9',
    initialNodePositions,
    customEdges,
    onNodeClick,
    multiSelectionMode = false,
    selectionOnDrag = false,
    selectionKeys = ['shift'],
    isEdgeCreationMode = false,
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
        initialNodePositions={initialNodePositions}
        customEdges={customEdges}
        onNodeClick={onNodeClick}
        multiSelectionMode={multiSelectionMode}
        selectionOnDrag={selectionOnDrag}
        selectionKeys={selectionKeys}
        isEdgeCreationMode={isEdgeCreationMode}
        {...restProps}
      />
    </ReactFlowProvider>
  );
};

export default BrainGardenComponentsDiagram;
