import React from 'react';
import { SectionTitle, SectionParagraph } from '../ui-components';
import { Typography } from '../../../../atoms/Typography';
import { 
  titleContainerStyle, 
  paragraphContainerStyle,
  paragraphContainerTopMarginStyle
} from '../../AiAutopilotAnalogy.styles';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../AiAutopilotAnalogy.styles';

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
    <div className={className} style={{ marginTop: '3rem' }}>
      <div className="text-left" style={titleContainerStyle}>
        <SectionTitle title={title} />
      </div>
      
      <div style={paragraphContainerStyle}>
        <SectionParagraph>
          {narrative.introduction}
        </SectionParagraph>
      </div>
      
      {/* Quotes Section */}
      <div style={{
        ...paragraphContainerStyle, 
        marginLeft: '1.5rem', 
        borderLeft: '3px solid #3b82f6', 
        paddingLeft: '1.5rem',
        backgroundColor: '#f0f7ff',
        borderRadius: '0 8px 8px 0',
        padding: '1rem 1.5rem'
      }}>
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
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {blueprint.map((section, sectionIndex) => (
          <motion.div 
            key={`section-${sectionIndex}`} 
            variants={fadeInUp}
            style={{marginTop: '2rem'}}
          >
            <div style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px 8px 0 0',
              marginBottom: '0',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{margin: 0}}>
                <Typography variant="h3" weight="semibold" color="light">
                  {section.title}
                </Typography>
              </div>
            </div>
            
            <ul style={{
              listStyle: 'none', 
              padding: '0',
              borderRadius: '0 0 8px 8px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              borderTop: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              marginTop: '0'
            }}>
              {section.items.map((item, itemIndex) => (
                <motion.li 
                  key={`item-${sectionIndex}-${itemIndex}`} 
                  variants={fadeInUp}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: itemIndex % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: itemIndex !== section.items.length - 1 ? '1px solid #e5e7eb' : 'none'
                  }}
                >
                  <div style={{marginBottom: '0.5rem'}}>
                    <Typography variant="h3" weight="medium">
                      {item.name}
                    </Typography>
                  </div>
                  <Typography variant="body">
                    {item.description}
                  </Typography>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Bottom Line */}
      <div style={{...paragraphContainerTopMarginStyle, marginBottom: '0'}}>
        <div style={{marginBottom: '0.5rem'}}>
          <Typography variant="body" weight="bold">
            The Bottom Line:
          </Typography>
        </div>
        <SectionParagraph>
          {bottomLine}
        </SectionParagraph>
      </div>
    </div>
  );
}; 