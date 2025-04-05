'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';
import { FaFlagCheckered } from 'react-icons/fa';

// --- Type Definitions ---
export interface EndNodeData extends BaseDiagramNodeData {
    type: 'end';
}

// --- Styled Components ---
const StyledEndNode = styled.div`
    padding: 10px 15px;
    border: 2px solid #27ae60;
    background-color: #ffffff;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    min-width: 100px;

    &:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .node-icon {
        margin-bottom: 6px;
        font-size: 1.1em;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #27ae60;
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
            <div className="node-icon">
                <FaFlagCheckered size={24} />
            </div>
            {data.label}
            <Handle type="target" position={Position.Top} id="top" />
        </StyledEndNode>
    );
};

export default EndNode; 