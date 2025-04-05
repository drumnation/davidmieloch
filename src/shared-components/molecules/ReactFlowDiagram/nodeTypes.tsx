'use client';

import React from 'react';
import { NodeProps } from '@xyflow/react';
import styled from 'styled-components';

// Styled components for nodes
const DefaultNodeContainer = styled.div<{ $borderColor?: string }>`
  padding: 10px;
  border-radius: 3px;
  background: white;
  border: 1px solid ${props => props.$borderColor || '#ddd'};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  min-width: 150px;
  text-align: center;
  font-size: 14px;
`;

const PillNodeContainer = styled.div<{ $borderColor?: string }>`
  padding: 8px 16px;
  border-radius: 25px;
  background: white;
  border: 1px solid ${props => props.$borderColor || '#4a6bff'};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  min-width: 120px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
`;

// Define data structure for our nodes
export interface CustomNodeData {
  label: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  borderColor?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

// Default node implementation
export const DefaultNode = ({ data }: NodeProps) => {
  // Ensure data has the expected structure
  const nodeData = data as CustomNodeData;
  
  return (
    <DefaultNodeContainer $borderColor={nodeData.borderColor} style={nodeData.style}>
      {nodeData.icon && nodeData.iconPosition === 'left' && (
        <span style={{ marginRight: '8px' }}>{nodeData.icon}</span>
      )}
      
      {nodeData.label}
      
      {nodeData.icon && nodeData.iconPosition === 'right' && (
        <span style={{ marginLeft: '8px' }}>{nodeData.icon}</span>
      )}
    </DefaultNodeContainer>
  );
};

// Pill node implementation
export const PillNode = ({ data }: NodeProps) => {
  // Ensure data has the expected structure
  const nodeData = data as CustomNodeData;
  
  return (
    <PillNodeContainer $borderColor={nodeData.borderColor} style={nodeData.style}>
      {nodeData.icon && nodeData.iconPosition === 'left' && (
        <span style={{ marginRight: '8px' }}>{nodeData.icon}</span>
      )}
      
      {nodeData.label}
      
      {nodeData.icon && nodeData.iconPosition === 'right' && (
        <span style={{ marginLeft: '8px' }}>{nodeData.icon}</span>
      )}
    </PillNodeContainer>
  );
};

// Export all node types in a single object
export const nodeTypes = {
  default: DefaultNode,
  pill: PillNode,
};

export default nodeTypes; 