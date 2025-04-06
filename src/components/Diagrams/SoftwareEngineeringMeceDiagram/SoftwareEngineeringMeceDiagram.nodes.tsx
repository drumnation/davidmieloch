'use client';

import React, { FC, memo } from 'react';
import { NodeProps, Handle, Position, NodeTypes } from '@xyflow/react';
import { CustomNodeData } from './SoftwareEngineeringMeceDiagram.types';
import { 
  StyledMainComponentNode, 
  StyledCategoryNode, 
  StyledItemNode 
} from './SoftwareEngineeringMeceDiagram.styles';

// Main Component Node (Software Engineering)
export const MainComponentNode: FC<NodeProps> = memo(({ data }) => {
  const nodeData = data as CustomNodeData;
  return (
    <StyledMainComponentNode>
      {nodeData.icon && <span className="node-icon">{nodeData.icon}</span>}
      <div>{nodeData.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="main-output"
        style={{ background: '#4c51bf' }}
      />
    </StyledMainComponentNode>
  );
});

MainComponentNode.displayName = 'MainComponentNode';

// Category Node (UI Layer, Business Logic, etc.)
export const CategoryNode: FC<NodeProps> = memo(({ data }) => {
  const nodeData = data as CustomNodeData;
  return (
    <StyledCategoryNode>
      <Handle
        type="target"
        position={Position.Top}
        id="category-input"
        style={{ background: '#4c51bf' }}
      />
      {nodeData.icon && <span className="node-icon">{nodeData.icon}</span>}
      <div>{nodeData.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="category-output"
        style={{ background: '#4299e1' }}
      />
    </StyledCategoryNode>
  );
});

CategoryNode.displayName = 'CategoryNode';

// Item Node (Components, Services, etc.)
export const ItemNode: FC<NodeProps> = memo(({ data }) => {
  const nodeData = data as CustomNodeData;
  return (
    <StyledItemNode>
      <Handle
        type="target"
        position={Position.Top}
        id="item-input"
        style={{ background: '#4299e1' }}
      />
      <div>{nodeData.label}</div>
    </StyledItemNode>
  );
});

ItemNode.displayName = 'ItemNode';

// Export node types for use in React Flow
export const nodeTypes: NodeTypes = {
  mainComponent: MainComponentNode,
  category: CategoryNode,
  item: ItemNode,
}; 