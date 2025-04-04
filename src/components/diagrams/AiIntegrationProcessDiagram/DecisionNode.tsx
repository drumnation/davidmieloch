'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';

// --- Type Definitions ---
export interface DecisionNodeData extends BaseDiagramNodeData {
    type: 'decision';
}

// --- Styled Components ---
const StyledDecisionNode = styled.div`
    padding: 10px 20px;
    border: 2px solid #4a90e2;
    background-color: #e6f7ff;
    text-align: center;
    font-size: 16px;
    border-radius: 50%; // Circle for decision
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    .node-icon {
        margin-right: 8px;
        font-size: 1.1em;
    }
`;

// --- Custom Node Component ---
const DecisionNode = (props: NodeProps) => {
    // Parse data with type safety
    const data = props.data as unknown as {
        label?: string;
        icon?: React.ReactNode;
        style?: React.CSSProperties;
    };
    
    return (
        <StyledDecisionNode style={data.style}>
            {data.icon && <div className="node-icon">{data.icon}</div>}
            {data.label}
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="source" position={Position.Bottom} id="bottom" />
            <Handle type="source" position={Position.Right} id="right" />
        </StyledDecisionNode>
    );
};

export default DecisionNode; 