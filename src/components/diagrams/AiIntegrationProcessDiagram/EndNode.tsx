'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';

// --- Type Definitions ---
export interface EndNodeData extends BaseDiagramNodeData {
    type: 'end';
}

// --- Styled Components ---
const StyledEndNode = styled.div`
    padding: 10px 20px;
    border: 2px solid #4caf50;
    background-color: #e8f5e9;
    text-align: center;
    font-size: 16px;
    border-radius: 20px;

    .node-icon {
        margin-right: 8px;
        font-size: 1.1em;
    }
`;

// --- Custom Node Component ---
const EndNode = (props: NodeProps) => {
    // Parse data with type safety
    const data = props.data as unknown as {
        label?: string;
        icon?: React.ReactNode;
        style?: React.CSSProperties;
    };
    
    return (
        <StyledEndNode style={data.style}>
            {data.icon && <div className="node-icon">{data.icon}</div>}
            {data.label}
            <Handle type="target" position={Position.Top} id="top" />
        </StyledEndNode>
    );
};

export default EndNode; 