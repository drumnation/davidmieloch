import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';

// Define the data structure for our node
interface NodeData {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'top';
  className?: string;
  style?: React.CSSProperties;
}

const NodeContainer = styled.div<{ $hasTopIcon?: boolean; $width?: string }>`
  padding: 12px 20px;
  border-radius: 5px;
  background: white;
  border: 1px solid #ddd;
  position: relative;
  overflow: visible;
  width: ${props => props.$width || 'auto'};
  
  display: flex;
  flex-direction: ${props => props.$hasTopIcon ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  
  .node-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    &.top {
      margin-bottom: 8px;
    }
    &.left {
      margin-right: 10px;
    }
    &.right {
      margin-left: 10px;
    }
  }
  
  .node-label {
    font-size: 14px;
    line-height: 1.4;
    font-weight: 500;
    overflow-wrap: break-word;
    word-break: break-word;
  }
`;

// Explicitly type the component as a React Flow node
function DefaultNode({ data, isConnectable }: NodeProps) {
  // Cast data to our expected type, assuming required fields are present
  const nodeData = data as unknown as NodeData;
  
  const { 
    label, 
    icon, 
    iconPosition = 'left',
    className,
    style 
  } = nodeData;
  
  const hasTopIcon = iconPosition === 'top';
  const nodeWidth = style?.width as string | undefined;
  
  // Create a new style object without the width property
  const nodeStyle = { ...style };
  if (nodeStyle.width) {
    delete nodeStyle.width;
  }
  
  return (
    <NodeContainer 
      $hasTopIcon={hasTopIcon} 
      $width={nodeWidth}
      className={className} 
      style={nodeStyle}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable !== false}
      />
      
      {icon && iconPosition === 'left' && (
        <div className="node-icon left">
          {icon}
        </div>
      )}
      
      {icon && iconPosition === 'top' && (
        <div className="node-icon top">
          {icon}
        </div>
      )}
      
      <div className="node-label">{label}</div>
      
      {icon && iconPosition === 'right' && (
        <div className="node-icon right">
          {icon}
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable !== false}
      />
    </NodeContainer>
  );
}

// Export a memoized version to optimize performance
export default memo(DefaultNode); 