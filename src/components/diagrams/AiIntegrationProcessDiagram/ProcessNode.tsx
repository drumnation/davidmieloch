'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';
import { 
  FaFlag, FaSearch, FaLightbulb, FaUsers, FaBrain, FaKeyboard, 
  FaCheckSquare, FaCogs, FaUserCheck, FaChartBar, FaRuler, 
  FaChartLine, FaSync, FaInfinity 
} from 'react-icons/fa';

// --- Type Definitions (Specific to ProcessNode) ---
export interface ProcessNodeData extends BaseDiagramNodeData {
    type: 'process';
}

// --- Styled Components ---
const StyledProcessNode = styled.div`
    padding: 10px 15px;
    border: 1px solid #ddd;
    background-color: #ffffff;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    min-width: 140px;

    &:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .node-icon {
        margin-bottom: 6px;
        font-size: 1.1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

// Icon colors map
const iconColors: Record<string, string> = {
    '🏁': '#e74c3c', // Red for flag
    '🔍': '#9b59b6', // Purple for search
    '💡': '#f1c40f', // Yellow for lightbulb
    '👥': '#3498db', // Blue for users
    '🧠': '#1abc9c', // Teal for brain
    '⌨️': '#34495e', // Dark blue for keyboard
    '✓': '#2ecc71', // Green for checkmark
    '⚙️': '#7f8c8d', // Gray for cogs/settings
    '🧑‍🏫': '#e67e22', // Orange for trainer
    '📊': '#8e44ad', // Purple for chart
    '📏': '#16a085', // Green-blue for ruler
    '📈': '#27ae60', // Green for chart line
    '🔄': '#d35400', // Orange-red for sync
    '♾️': '#2980b9'  // Blue for infinity
};

// Map of emoji to React icon components with colors
const iconMap: Record<string, React.ReactNode> = {
    '🏁': <FaFlag size={24} color={iconColors['🏁']} />,
    '🔍': <FaSearch size={24} color={iconColors['🔍']} />,
    '💡': <FaLightbulb size={24} color={iconColors['💡']} />,
    '👥': <FaUsers size={24} color={iconColors['👥']} />,
    '🧠': <FaBrain size={24} color={iconColors['🧠']} />,
    '⌨️': <FaKeyboard size={24} color={iconColors['⌨️']} />,
    '✓': <FaCheckSquare size={24} color={iconColors['✓']} />,
    '⚙️': <FaCogs size={24} color={iconColors['⚙️']} />,
    '🧑‍🏫': <FaUserCheck size={24} color={iconColors['🧑‍🏫']} />,
    '📊': <FaChartBar size={24} color={iconColors['📊']} />,
    '📏': <FaRuler size={24} color={iconColors['📏']} />,
    '📈': <FaChartLine size={24} color={iconColors['📈']} />,
    '🔄': <FaSync size={24} color={iconColors['🔄']} />,
    '♾️': <FaInfinity size={24} color={iconColors['♾️']} />
};

// --- Custom Node Component ---
const ProcessNode = (props: NodeProps) => {
    // Parse data with type safety
    const data = props.data as unknown as {
        label?: string;
        icon?: string;
        style?: React.CSSProperties;
    };
    
    // Get the appropriate icon
    const getIcon = (): React.ReactNode | null => {
        if (data.icon && iconMap[data.icon]) {
            return iconMap[data.icon];
        }
        return null;
    };
    
    const icon = getIcon();
    
    return (
        <StyledProcessNode style={data.style}>
            {icon && <div className="node-icon">{icon}</div>}
            {data.label}
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="source" position={Position.Bottom} id="bottom" />
        </StyledProcessNode>
    );
};

export default ProcessNode; 