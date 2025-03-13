import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { KeyBenefitsSectionProps } from './KeyBenefitsSection.types';
import {
  AccentBackgroundSection,
  ContentContainerNoMargin,
  StatsGrid,
  fadeIn,
  fadeInUp,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  StatCardComponent
} from '../../BrainGardenOverview.logic';

export const KeyBenefitsSection: React.FC<KeyBenefitsSectionProps> = ({
  className,
  keyBenefitsProps
}) => {
  return (
    <AccentBackgroundSection
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <ContentContainerNoMargin>
        <motion.div variants={fadeInUp}>
          <SectionTitleComponent title="Key Benefits" />
          
          <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Transforming Development</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              The Brain Garden System transforms development velocity and quality through its multi-team approach:
            </Typography>
          </div>
          
          <StatsGrid>
            {keyBenefitsProps.stats.map((stat, index) => {
              // Ensure icon is never undefined
              const safeStat = {
                ...stat,
                icon: stat.icon || 'star'
              };
              return <StatCardComponent key={index} stat={safeStat} index={index} />;
            })}
          </StatsGrid>
          
          <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Complete Development Ecosystem</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              This isn&apos;t just another AI coding assistant—it&apos;s a complete development ecosystem that transforms a single developer into a technical director managing multiple specialized teams, each working in parallel to accelerate development while maintaining quality and consistency.
            </Typography>
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </AccentBackgroundSection>
  );
};