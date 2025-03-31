import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import styled from 'styled-components';
import { Typography } from '../../atoms/Typography';
import { MermaidDiagramProps } from './MermaidDiagram.types';

// Define types
type ZoomLevel = 'out' | 'normal' | 'in';

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
  $zoomLevel?: ZoomLevel;
}>`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || 'auto'};
  background-color: ${props => props.$backgroundColor || 'rgba(74, 158, 255, 0.05)'};
  border-radius: 8px;
  overflow: auto;
  padding: 16px;
  transform-origin: center center;
  transform: scale(
    ${props => {
      switch (props.$zoomLevel) {
        case 'out': return 0.75;
        case 'in': return 1.25;
        default: return 1;
      }
    }}
  );
  transition: transform 0.2s ease-out;
  
  /* Fix SVG display */
  svg {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: rgba(74, 158, 255, 0.05);
  border-radius: 8px;
`;

const AccessibilityDescription = styled.div`
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

const ZoomButtonsContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  z-index: 10;
`;

const ZoomButton = styled.button`
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

// Helper function to replace CSS variables with actual color values
const replaceCssVariables = (definition: string): string => {
  // Define a mapping of CSS variables to actual color values
  const colorMap: Record<string, string> = {
    'var(--primary-blue)': '#4a6bff',
    'var(--primary-purple)': '#9c6ade',
    'var(--accent-green)': '#47b881',
    'var(--accent-orange)': '#f7b955',
    'var(--accent-red)': '#ec4c47',
    'var(--accent-teal)': '#14b5d0',
    'var(--text-dark)': '#333333',
    'var(--text-light)': '#ffffff',
    'var(--background-light)': '#f9f9fb',
    'var(--background-dark)': '#1f2937'
  };

  // Replace all CSS variables with their corresponding color values
  let processedDefinition = definition;
  Object.entries(colorMap).forEach(([variable, color]) => {
    processedDefinition = processedDefinition.replace(
      new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 
      color
    );
  });

  return processedDefinition;
};

// ZoomControls component
const ZoomControls: React.FC<{
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}> = ({ onZoomIn, onZoomOut, onResetZoom }) => (
  <ZoomButtonsContainer>
    <ZoomButton onClick={onZoomIn} aria-label="Zoom in">+</ZoomButton>
    <ZoomButton onClick={onResetZoom} aria-label="Reset zoom">⟲</ZoomButton>
    <ZoomButton onClick={onZoomOut} aria-label="Zoom out">-</ZoomButton>
  </ZoomButtonsContainer>
);

// Main component
export const MermaidDiagram: React.FC<MermaidDiagramProps> = React.memo(({
  definition,
  className = '',
  theme = 'default',
  width = '100%',
  height = 'auto',
  backgroundColor = 'rgba(74, 158, 255, 0.05)',
  responsive = true,
  showZoomControls = false,
  accessibilityDescription = '',
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('normal');
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useRef<string>(`mermaid-${Math.random().toString(36).substring(2, 11)}`);
  
  // Zoom control handlers
  const handleZoomIn = () => setZoomLevel('in');
  const handleZoomOut = () => setZoomLevel('out');
  const handleResetZoom = () => setZoomLevel('normal');

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme,
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
      fontSize: 16,
      flowchart: {
        htmlLabels: true,
        curve: 'linear',
      },
      sequence: {
        useMaxWidth: true,
      },
    });
  }, [theme]);

  // Render the diagram
  useEffect(() => {
    setError('');
    setLoading(true);

    const renderDiagram = async () => {
      try {
        if (!containerRef.current) {
          return;
        }

        // Process definition through CSS variable replacement
        const processedDef = replaceCssVariables(definition);
        
        // Clear previous diagram
        containerRef.current.innerHTML = '';
        
        // Initialize Mermaid
        await mermaid.init(
          { theme: theme === 'dark' ? 'dark' : 'default' }, 
          containerRef.current
        );
        
        // Render the diagram
        const { svg } = await mermaid.render(
          `mermaid-diagram-${uniqueId.current}`,
          processedDef
        );
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          
          // Make the diagram responsive if requested
          if (responsive) {
            const svgElement = containerRef.current.querySelector('svg');
            if (svgElement) {
              svgElement.setAttribute('width', '100%');
              svgElement.setAttribute('height', 'auto');
              svgElement.style.maxWidth = '100%';
            }
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('MermaidDiagram: Failed to render diagram:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    // Small timeout to ensure we're not in the middle of a render cycle
    const timeoutId = setTimeout(renderDiagram, 50);
    
    // Save ref to a variable to avoid the exhaustive-deps warning
    const currentContainer = containerRef.current;
    
    return () => {
      clearTimeout(timeoutId);
      // Clean up any lingering elements when the component unmounts
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [definition, responsive, theme]);

  if (loading && !error) {
    return (
      <LoadingContainer className={className}>
        <Typography variant="body">Loading diagram...</Typography>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer className={className}>
        <Typography variant="body">
          Error rendering diagram: {error}
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <DiagramWrapper $width={width}>
      {/* Accessibility description */}
      {accessibilityDescription && (
        <AccessibilityDescription role="note" aria-label="Diagram description">
          {accessibilityDescription}
        </AccessibilityDescription>
      )}
      
      {/* Zoom controls */}
      {showZoomControls && (
        <ZoomControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
        />
      )}
      
      {/* Diagram container */}
      <DiagramContainer 
        className={className}
        $width={width}
        $height={height}
        $backgroundColor={backgroundColor}
        $zoomLevel={zoomLevel}
        ref={containerRef}
        role="img"
        aria-label={accessibilityDescription || "System diagram visualization"}
        tabIndex={0}
        data-diagram-id={uniqueId.current}
      />
    </DiagramWrapper>
  );
});

// Add display name for debugging
MermaidDiagram.displayName = 'MermaidDiagram';

export default MermaidDiagram;
