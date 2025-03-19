import React from 'react';
import { motion } from 'framer-motion';
import { 
  BioSection, 
  BioSectionTitle, 
  TimelineContainer, 
  TimelineItem, 
  TimelineContent, 
  TimelineDot, 
  TimelineYear,
  fadeIn,
  slideInLeft,
  slideInRight
} from '../../Bio.styles';
import { TIMELINE_ITEMS } from '../../Bio.constants';
import { ProfessionalJourneyProps } from './ProfessionalJourney.types';

export const ProfessionalJourney: React.FC<ProfessionalJourneyProps> = ({ className }) => {
  return (
    <BioSection className={className} id="professional-journey">
      <BioSectionTitle variants={fadeIn}>Professional Journey</BioSectionTitle>
      <TimelineContainer>
        {TIMELINE_ITEMS.map((item, index) => (
          <TimelineItem 
            key={`timeline-${index}`} 
            itemIndex={index}
            variants={index % 2 === 0 ? slideInLeft : slideInRight}
          >
            <TimelineDot />
            <TimelineContent>
              <TimelineYear>{item.year}</TimelineYear>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </BioSection>
  );
};

export default ProfessionalJourney; 