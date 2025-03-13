import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { HumanAdvantageSectionProps } from './HumanAdvantageSection.types';
import {
  BackgroundSection,
  ContentContainerNoMargin,
  fadeIn,
  fadeInUp,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent
} from '../../BrainGardenOverview.logic';

export const HumanAdvantageSection: React.FC<HumanAdvantageSectionProps> = ({
  className
}) => {
  return (
    <BackgroundSection
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <ContentContainerNoMargin>
        <motion.div variants={fadeInUp}>
          <SectionTitleComponent title="The Human Advantage" />
          
          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Your Role as Technical Director</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              As the technical director of your AI development teams, you maintain several key advantages:
            </Typography>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Strategic Oversight</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Guide overall technical direction, make key architectural decisions, and ensure business goals are met.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Quality Control</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Review agent outputs for quality, ensure consistency across teams, and maintain high standards.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Knowledge Growth</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Cultivate the project&apos;s knowledge base, share learnings across teams, and build on successful patterns.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Parallel Management</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Direct multiple features simultaneously, keep all teams productive, and maximize development velocity.
                </Typography>
              </div>
            </div>
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};