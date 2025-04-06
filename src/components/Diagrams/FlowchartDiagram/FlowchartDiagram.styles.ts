import styled, { createGlobalStyle } from 'styled-components';
import { DiagramContainerProps } from './FlowchartDiagram.types';
import { ReactFlow, ReactFlowProps } from '@xyflow/react';

// Global styles to ensure React Flow nodes display correctly everywhere
export const ReactFlowGlobalStyles = createGlobalStyle`
  /* Global React Flow overrides */
  .react-flow__node {
    overflow: visible !important;
  }
  
  .react-flow__handle {
    width: 8px;
    height: 8px;
  }
  
  .react-flow__edge-path {
    stroke-width: 1.5px;
  }
  
  .react-flow__viewport {
    transition: transform 0.2s ease;
  }
`;

export const DiagramWrapper = styled.div<{ $width?: string }>`
  width: ${props => props.$width || '100%'};
  position: relative;
  margin: 0 auto;
`;

export const StyledReactFlow = styled(ReactFlow as React.ComponentType<ReactFlowProps>)`
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  
  /* Ensure nodes can overflow their boundaries for icons */
  .react-flow__node {
    overflow: visible !important;
  }
  
  /* Add additional spacing for handles */
  .react-flow__handle {
    width: 8px;
    height: 8px;
  }
  
  /* Improve edge rendering */
  .react-flow__edge-path {
    stroke-width: 1.5px;
  }
`;

export const DiagramContainer = styled.div<DiagramContainerProps>`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '400px'};
  background-color: ${props => props.$backgroundColor || 'rgba(74, 158, 255, 0.05)'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm || '0px 2px 4px rgba(0, 0, 0, 0.1)'};
  
  .react-flow__viewport {
    transition: transform 0.2s ease;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: rgba(74, 158, 255, 0.05);
  border-radius: 8px;
`;

export const AccessibilityDescription = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const ZoomButtonsContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  z-index: 10;
`;

export const ZoomButton = styled.button`
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: rgba(255, 74, 74, 0.05);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`; 