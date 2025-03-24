import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { MermaidDiagramProps } from './MermaidDiagram.types';
import { Typography } from '../../atoms/Typography';

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
    processedDefinition = processedDefinition.replace(new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), color);
  });

  return processedDefinition;
};

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  definition,
  className,
  theme = 'default',
  width = '100%',
  height = 'auto',
  backgroundColor,
  responsive = true,
  showZoomControls = false,
  accessibilityDescription = '',
}) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const uniqueId = useRef(`mermaid-${Math.random().toString(36).substring(2, 11)}`);

  // Add hover effect styles
  const hoverStyles = `
    .${uniqueId.current} g.node:hover {
      filter: brightness(1.05);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .${uniqueId.current} g.cluster:hover {
      filter: brightness(1.02);
      transition: all 0.2s ease;
    }
    .${uniqueId.current} .edgePath:hover {
      stroke-width: 2px;
      transition: all 0.2s ease;
    }
  `;

  useEffect(() => {
    // Initialize mermaid with theme configuration
    mermaid.initialize({
      startOnLoad: true,
      theme: theme as any,
      securityLevel: 'loose' as any,
      fontFamily: 'Inter, sans-serif',
      fontSize: 16,
      flowchart: {
        htmlLabels: true,
        curve: 'basis' as any,
        nodeSpacing: 80,
        rankSpacing: 100,
        padding: 20,
        useMaxWidth: true
      },
      themeVariables: {
        nodeBorder: '2px',
        fontSize: '16px',
        fontFamily: 'Inter, sans-serif',
        mainBkg: '#4a6bff',
        secondaryBkg: '#9c6ade',
        tertiaryBkg: '#f4f4f4',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#333333',
        lineColor: '#666666',
        clusterBkg: '#f8f9fa',
        clusterBorder: 'rgba(0,0,0,0.2)',
        labelBackground: '#ffffff',
        labelBorder: '#e9ecef',
        edgeLabelBackground: '#ffffff',
        nodeTextColor: '#ffffff'
      }
    });

    const renderDiagram = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Reset any previous content
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = '';
        }
        
        // Process the definition to replace CSS variables with actual color values
        const processedDefinition = replaceCssVariables(definition);
        
        // Render the diagram
        const { svg } = await mermaid.render(uniqueId.current, processedDefinition);
        
        // Add hover effects to the SVG
        const enhancedSvg = svg.replace('<style>', `<style>${hoverStyles}`);
        
        setSvg(enhancedSvg);
        setLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error rendering diagram');
        setLoading(false);
      }
    };

    renderDiagram();
  }, [definition, theme]);

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  if (loading) {
    return (
      <div className={className} style={{ padding: '1rem' }}>
        <Typography variant="body">Loading diagram...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className} style={{ padding: '1rem', color: 'red' }}>
        <Typography variant="body" weight="bold">Error rendering diagram</Typography>
        <pre>{error}</pre>
        <Typography variant="body">Check your Mermaid syntax and try again.</Typography>
      </div>
    );
  }

  return (
    <div style={{ width, overflow: 'hidden' }}>
      {/* Screen reader accessibility description */}
      {accessibilityDescription && (
        <div className="sr-only" role="note" aria-label="Diagram description">
          {accessibilityDescription}
        </div>
      )}
      
      {/* Zoom controls */}
      {showZoomControls && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '10px',
          gap: '5px'
        }}>
          <button 
            onClick={handleZoomOut}
            aria-label="Zoom out"
            style={{ 
              padding: '5px 10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            -
          </button>
          <button 
            onClick={handleResetZoom}
            aria-label="Reset zoom"
            style={{ 
              padding: '5px 10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
          <button 
            onClick={handleZoomIn}
            aria-label="Zoom in"
            style={{ 
              padding: '5px 10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            +
          </button>
        </div>
      )}
      
      {/* Diagram container */}
      <div 
        className={`${className} ${uniqueId.current}`}
        style={{ 
          width: '100%', 
          height, 
          backgroundColor,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center top',
          transition: 'transform 0.2s ease-in-out'
        }}
        ref={mermaidRef}
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
        aria-label={accessibilityDescription || "System diagram visualization"}
        tabIndex={0}
      />
    </div>
  );
};

export default MermaidDiagram;
