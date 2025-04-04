'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';

// --- Type Definitions (Specific to ProcessNode) ---
export interface ProcessNodeData extends BaseDiagramNodeData {
    type: 'process';
}

// --- Styled Components ---
const StyledProcessNode = styled.div`
    padding: 10px 20px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    text-align: center;
    font-size: 16px;
    border-radius: 5px;

    .node-icon {
        margin-right: 8px;
        font-size: 1.1em;
    }
`;

// --- Custom Node Component ---
const ProcessNode = (props: NodeProps) => {
    // Parse data with type safety
    const data = props.data as unknown as {
        label?: string;
        icon?: React.ReactNode;
        style?: React.CSSProperties;
    };
    
    return (
        <StyledProcessNode style={data.style}>
            {data.icon && <div className="node-icon">{data.icon}</div>}
            {data.label}
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="source" position={Position.Bottom} id="bottom" />
        </StyledProcessNode>
    );
};

export default ProcessNode; 