import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';

// Define the data structure for our pill node
interface PillNodeData {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

const PillContainer = styled.div<{ $width?: string }>`
  padding: 8px 20px;
  border-radius: 20px; /* Pill shape */
  background: white;
  border: 2px solid #4a6bff; /* Default accent color */
  position: relative;
  overflow: visible;
  width: ${props => props.$width || 'auto'};
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  
  .node-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    &.left {
      margin-right: 8px;
    }
    &.right {
      margin-left: 8px;
    }
  }
  
  .node-label {
    font-size: 14px;
    line-height: 1.4;
    font-weight: 600;
    overflow-wrap: break-word;
    word-break: break-word;
  }
`;

// Explicitly type the component as a React Flow node
function PillNode({ data, isConnectable }: NodeProps) {
  // Cast data to our expected type, assuming required fields are present
  const nodeData = data as unknown as PillNodeData;
  
  const { 
    label, 
    icon, 
    iconPosition = 'left',
    className,
    style 
  } = nodeData;
  
  const nodeWidth = style?.width as string | undefined;
  
  // Create a new style object without the width property
  const nodeStyle = { ...style };
  if (nodeStyle.width) {
    delete nodeStyle.width;
  }
  
  return (
    <PillContainer 
      className={className} 
      style={nodeStyle}
      $width={nodeWidth}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable !== false}
        style={{ background: nodeStyle?.borderColor || '#4a6bff' }}
      />
      
      {icon && iconPosition === 'left' && (
        <div className="node-icon left">
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
        style={{ background: nodeStyle?.borderColor || '#4a6bff' }}
      />
    </PillContainer>
  );
}

// Export a memoized version to optimize performance
export default memo(PillNode); 