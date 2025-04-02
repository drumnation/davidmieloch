import React from 'react';
import styled from 'styled-components';
import { MermaidDiagramProps } from './MermaidDiagram.types';

// Styles
const DiagramWrapper = styled.div<{ $width?: string }>`
  width: ${props => props.$width || '100%'};
  position: relative;
  margin: 0 auto;
`;

const DiagramContainer = styled.div<{
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
}>`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || 'auto'};
  min-height: 200px;
  background-color: ${props => props.$backgroundColor || 'rgba(74, 158, 255, 0.05)'};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 16px;
`;

const MessageText = styled.div`
  font-size: 14px;
  color: #666;
`;

/**
 * A simplified placeholder for the MermaidDiagram component
 * This version doesn't use the mermaid library to avoid build errors
 */
export const MermaidDiagram = React.memo(({
  definition,
  className = '',
  theme = 'default',
  width = '100%',
  height = 'auto',
  backgroundColor = 'rgba(74, 158, 255, 0.05)',
  responsive = true,
  showZoomControls = false,
  accessibilityDescription = '',
}: MermaidDiagramProps) => {
  // Count the number of nodes as a rough indicator of diagram complexity
  const nodeCount = (definition.match(/\[.*?\]/g) || []).length;
  
  return (
    <DiagramWrapper $width={width} className={className}>
      <DiagramContainer
        $width={width}
        $height={height}
        $backgroundColor={backgroundColor}
      >
        <TitleText>
          Diagram ({nodeCount} nodes)
        </TitleText>
        <MessageText>
          Diagrams temporarily disabled while updating visualization libraries.
        </MessageText>
      </DiagramContainer>
    </DiagramWrapper>
  );
});

// Set display name for React DevTools
MermaidDiagram.displayName = 'MermaidDiagram';

// Default export
export default MermaidDiagram;
