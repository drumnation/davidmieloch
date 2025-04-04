'use client';

import React from 'react';
import { NodeProps, Handle, Position } from '@xyflow/react';
import { CustomNodeData } from './BrainGardenComponentsDiagram.types';
import { 
  StyledMainComponentNode, 
  StyledSubComponentNode, 
  StyledSystemNode 
} from './BrainGardenComponentsDiagram.styles';

// Main Component Node
export const MainComponentNode = ({ data }: NodeProps) => {
  const nodeData = data as CustomNodeData; // Type assertion
  return (
    <StyledMainComponentNode style={nodeData.style}>
      {nodeData.icon && <div className="node-icon">{nodeData.icon}</div>}
      {nodeData.label}
      <Handle type="source" position={Position.Bottom} />
    </StyledMainComponentNode>
  );
};

// Sub Component Node
export const SubComponentNode = ({ data }: NodeProps) => {
  const nodeData = data as CustomNodeData; // Type assertion
  return (
    <StyledSubComponentNode style={nodeData.style}>
      {nodeData.label}
      <Handle type="target" position={Position.Top} />
    </StyledSubComponentNode>
  );
};

// System Node
export const SystemNode = ({ data }: NodeProps) => {
  const nodeData = data as CustomNodeData; // Type assertion
  return (
    <StyledSystemNode style={nodeData.style}>
      {nodeData.icon && <div className="node-icon">{nodeData.icon}</div>}
      {nodeData.label}
      <Handle type="source" position={Position.Bottom} />
    </StyledSystemNode>
  );
};

// Export node types for React Flow
export const nodeTypes = {
  mainComponent: MainComponentNode,
  subComponent: SubComponentNode,
  system: SystemNode,
}; 