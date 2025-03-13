import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { SystemArchitectureSectionProps } from './SystemArchitectureSection.types';
import {
  GradientBackgroundSection,
  ContentContainerNoMargin,
  MermaidContainer,
  fadeIn,
  fadeInUp,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  CTAButtonWithIcon
} from '../../BrainGardenOverview.logic';

export const SystemArchitectureSection: React.FC<SystemArchitectureSectionProps> = ({
  className,
  systemArchitectureProps
}) => {
  return (
    <GradientBackgroundSection
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <ContentContainerNoMargin>
        <motion.div variants={fadeInUp}>
          <SectionTitleComponent title={systemArchitectureProps.title} />
          
          {'description' in systemArchitectureProps && systemArchitectureProps.description && (
            <Typography variant="body" mb="1.5rem" color="light">
              {systemArchitectureProps.description}
            </Typography>
          )}
          
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Scalable System Design</SectionSubtitle>
            <Typography variant="body" mb="1.5rem" color="light">
              The Brain Garden System architecture is designed for scalability, flexibility, and efficiency. It consists of three main systems: the Knowledge System for managing project intelligence, the Agent System for coordinating AI teams, and the Integration System for connecting with development tools and workflows.
            </Typography>
          </div>
          
          <MermaidContainer variants={fadeInUp}>
            <MermaidDiagram
              definition={systemArchitectureProps.definition}
              theme={systemArchitectureProps.theme}
              width="100%"
              height="auto"
              backgroundColor="transparent"
            />
          </MermaidContainer>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <CTAButtonWithIcon 
              text="Agent System" 
              link="./agent-system" 
              icon="users" 
            />
            <CTAButtonWithIcon 
              text="Integration System" 
              link="./integration-system" 
              icon="git-branch" 
            />
            <CTAButtonWithIcon 
              text="Knowledge System" 
              link="./knowledge-system" 
              icon="brain" 
            />
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </GradientBackgroundSection>
  );
};