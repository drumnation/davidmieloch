import React from 'react';
import { AiIntegrationProcessDiagramClient } from '../../../../../components/Diagrams/AiIntegrationProcessDiagram';
import { SectionTitle, SectionParagraph } from '../ui-components';
import { 
  titleContainerStyle, 
  paragraphContainerStyle,
  mermaidContainerStyle,
  titleBlockStyle,
  descriptionBlockStyle 
} from '../../AiAutopilotAnalogy.styles';

interface MermaidDiagramSectionProps {
  title: string;
  description: string;
  definition: string;
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  className?: string;
}

export const MermaidDiagramSection: React.FC<MermaidDiagramSectionProps> = ({
  title,
  description,
  definition,
  theme = 'default',
  className
}) => {
  return (
    <div 
      className={className} 
      style={{ 
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'relative',
        marginBottom: '-20px'
      }}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AiIntegrationProcessDiagramClient 
          backgroundColor="white"
          initialZoom={1.8}
          width="100%"
          height="1000px"
          title={title}
          description={description}
        />
      </div>
    </div>
  );
}; 