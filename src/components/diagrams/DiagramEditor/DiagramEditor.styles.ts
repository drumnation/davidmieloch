import styled from 'styled-components';
import { Panel } from '@xyflow/react';

/**
 * Container for the diagram editor
 */
export const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

/**
 * Header for the diagram
 */
export const DiagramHeader = styled.div`
  padding: 24px 30px;
  background-color: #2c3e50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

/**
 * Body of the diagram containing the ReactFlow component
 */
export const DiagramBody = styled.div`
  flex: 1;
  overflow: hidden;
`;

/**
 * Title for the diagram
 */
export const DiagramTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

/**
 * Description for the diagram
 */
export const DiagramDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin: 12px 0 0;
  color: #cbd5e1;
  font-weight: 400;
  max-width: 90%;
`;

/**
 * Wrapper for the ReactFlow component
 */
export const DiagramWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

/**
 * Container for diagram controls
 */
export const ControlsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

/**
 * Container for button groups
 */
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 4px;
`;

/**
 * Button for zoom controls
 */
export const ZoomButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background-color: white;
  color: #334155;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 4px;

  &:hover {
    background-color: #f1f5f9;
  }

  &:active {
    background-color: #e2e8f0;
  }
`;

/**
 * Slider for zoom control
 */
export const ZoomSlider = styled.input`
  width: 100px;
  margin: 0 8px;
  -webkit-appearance: none;
  background: #e2e8f0;
  height: 4px;
  border-radius: 2px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
  }
`;

/**
 * Help text for diagram editor
 */
export const HelpText = styled.p`
  font-size: 12px;
  color: #64748b;
  margin: 0;
`;

export const FlowContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
`;

export const StyledControlPanel = styled(Panel)`
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

export const ControlButton = styled.button`
  padding: 6px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 5px;
  font-size: 14px;
  transition: all 0.2s ease;
  color: #333;
  font-weight: 500;
  
  &:hover {
    background-color: #f0f0f0;
    border-color: #aaa;
  }
  
  &:active {
    background-color: #e0e0e0;
    transform: translateY(1px);
  }
`;

export const PrimaryButton = styled(ControlButton)`
  border: 1px solid #3b82f6;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  
  &:hover {
    background-color: #2563eb;
    border-color: #2563eb;
  }
  
  &:active {
    background-color: #1d4ed8;
  }
`;

export const ZoomLabel = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`; 