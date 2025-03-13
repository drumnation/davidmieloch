import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { MermaidDiagramProps } from './MermaidDiagram.types';
import * as S from './MermaidDiagram.styles';
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
}) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const uniqueId = useRef(`mermaid-${Math.random().toString(36).substring(2, 11)}`);

  useEffect(() => {
    // Initialize mermaid with theme configuration
    mermaid.initialize({
      startOnLoad: true,
      theme: theme,
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
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
        setSvg(svg);
        setLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error rendering diagram');
        setLoading(false);
      }
    };

    renderDiagram();
  }, [definition, theme]);

  if (loading) {
    return (
      <S.LoadingContainer className={className}>
        <Typography variant="body">Loading diagram...</Typography>
      </S.LoadingContainer>
    );
  }

  if (error) {
    return (
      <S.ErrorContainer className={className}>
        <Typography variant="body" weight="bold">Error rendering diagram</Typography>
        <pre>{error}</pre>
        <Typography variant="body">Check your Mermaid syntax and try again.</Typography>
      </S.ErrorContainer>
    );
  }

  return (
    <S.DiagramContainer 
      className={className} 
      $width={width} 
      $height={height} 
      $backgroundColor={backgroundColor}
      ref={mermaidRef}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
