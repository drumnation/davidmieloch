import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { MermaidDiagramProps } from './MermaidDiagram.types';
import * as S from './MermaidDiagram.styles';
import { Typography } from '../../atoms/Typography';

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
        
        // Render the diagram
        const { svg } = await mermaid.render(uniqueId.current, definition);
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
