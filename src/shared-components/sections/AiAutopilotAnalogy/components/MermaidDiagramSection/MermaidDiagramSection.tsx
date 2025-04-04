import React from 'react';
import { AiIntegrationProcessDiagramClient } from '../../../../../components/diagrams/AiIntegrationProcessDiagram';
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
    <div className={className}>
      <div style={titleContainerStyle}>
        <SectionTitle title={title} />
      </div>
      
      <div style={paragraphContainerStyle}>
        <SectionParagraph>
          {description}
        </SectionParagraph>
      </div>
      
      <div style={mermaidContainerStyle}>
        <AiIntegrationProcessDiagramClient />
      </div>
    </div>
  );
}; 