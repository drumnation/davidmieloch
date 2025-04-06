'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';
import { FaQuestion } from 'react-icons/fa';

// --- Type Definitions ---
export interface DecisionNodeData extends BaseDiagramNodeData {
    type: 'decision';
}

// --- Styled Components ---
const StyledDecisionNode = styled.div`
    padding: 10px;
    border: 2px solid #f39c12;
    background-color: #ffffff;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 50%; // Circle for decision
    width: 110px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .node-icon {
        margin-bottom: 6px;
        font-size: 1.1em;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f39c12;
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
            <div className="node-icon">
                <FaQuestion size={24} />
            </div>
            {data.label}
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="source" position={Position.Bottom} id="bottom" />
            <Handle type="source" position={Position.Right} id="right" />
        </StyledDecisionNode>
    );
};

export default DecisionNode; 