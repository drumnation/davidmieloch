import React from 'react';
import { SectionTitle, SectionParagraph } from '../ui-components';
import { Typography } from '../../../../atoms/Typography';
import { 
  titleContainerStyle, 
  paragraphContainerStyle,
  paragraphContainerTopMarginStyle
} from '../../AiAutopilotAnalogy.styles';

interface BlueprintItem {
  name: string;
  description: string;
}

interface BlueprintSection {
  title: string;
  items: BlueprintItem[];
}

interface LeadershipBlueprintSectionProps {
  title: string;
  narrative: {
    introduction: string;
    quotes: string[];
    conclusion: string;
  };
  blueprint: BlueprintSection[];
  bottomLine: string;
  className?: string;
}

export const LeadershipBlueprintSection: React.FC<LeadershipBlueprintSectionProps> = ({
  title,
  narrative,
  blueprint,
  bottomLine,
  className
}) => {
  return (
    <div className={className}>
      <div className="text-left" style={titleContainerStyle}>
        <SectionTitle title={title} />
      </div>
      
      <div style={paragraphContainerStyle}>
        <SectionParagraph>
          {narrative.introduction}
        </SectionParagraph>
      </div>
      
      {/* Quotes Section */}
      <div style={{...paragraphContainerStyle, marginLeft: '1.5rem', borderLeft: '3px solid #e0e0e0', paddingLeft: '1.5rem'}}>
        {narrative.quotes.map((quote, index) => (
          <div key={`quote-${index}`} style={index > 0 ? {marginTop: '1rem'} : {}}>
            <SectionParagraph>
              &quot;{quote}&quot;
            </SectionParagraph>
          </div>
        ))}
      </div>
      
      <div style={paragraphContainerStyle}>
        <SectionParagraph>
          {narrative.conclusion}
        </SectionParagraph>
      </div>
      
      {/* Blueprint Items */}
      {blueprint.map((section, sectionIndex) => (
        <div key={`section-${sectionIndex}`} style={{marginTop: '2rem'}}>
          <Typography variant="h3" weight="semibold" className="mb-3">
            {section.title}
          </Typography>
          
          <ul style={{listStyle: 'none', padding: 0}}>
            {section.items.map((item, itemIndex) => (
              <li 
                key={`item-${sectionIndex}-${itemIndex}`} 
                style={{
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <Typography variant="h3" className="mb-2" weight="medium">
                  {item.name}
                </Typography>
                <Typography variant="body">
                  {item.description}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {/* Bottom Line */}
      <div style={paragraphContainerTopMarginStyle}>
        <Typography variant="body" weight="bold" className="mb-2">
          The Bottom Line:
        </Typography>
        <SectionParagraph>
          {bottomLine}
        </SectionParagraph>
      </div>
    </div>
  );
}; 