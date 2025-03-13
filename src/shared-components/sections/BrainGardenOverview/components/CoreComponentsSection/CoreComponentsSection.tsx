import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { CoreComponentsSectionProps } from './CoreComponentsSection.types';
import {
  BackgroundSection,
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

export const CoreComponentsSection: React.FC<CoreComponentsSectionProps> = ({
  className,
  coreComponentsProps
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
          <SectionTitleComponent title="Core Components" />
          
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>The Foundation of the System</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              The Brain Garden System consists of three core components that work together to create a powerful development ecosystem. These components form the foundation of the system, enabling true parallel development and exponential productivity gains.
            </Typography>
          </div>
          
          <FeatureGrid 
            features={coreComponentsProps.features}
            columns={3}
            style="gradient-cards"
            animation="stagger-fade"
          />
          
          {/* The Core Teams Narrative */}
          <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>The Core Teams</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              At the heart of the Brain Garden System are specialized AI teams, each with their own expertise and focus:
            </Typography>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <MermaidContainer variants={fadeInUp}>
              <MermaidDiagram
                definition={`
                  graph TD
                    HD[Human Director] --> TA[Team Architect]
                    HD --> TF[Team Frontend]
                    HD --> TM[Team AI/ML]
                    
                    TA --> AD[Architecture Decisions]
                    TA --> PG[Pattern Guidance]
                    TA --> TD[Technical Documentation]
                    
                    TF --> UI[UI Implementation]
                    TF --> UX[UX Consistency]
                    TF --> AC[Accessibility]
                    
                    TM --> AI[AI Integration]
                    TM --> ML[Model Management]
                    TM --> DP[Data Processing]
                    
                    AD --> QC[Quality Control]
                    PG --> QC
                    UI --> QC
                    UX --> QC
                    AI --> QC
                    ML --> QC
                    
                    QC --> HD
                    
                    classDef human fill:#4a6bff,stroke:#333
                    classDef team fill:#9c6ade,stroke:#333
                    classDef task fill:#47b881,stroke:#333
                    classDef control fill:#f7b955,stroke:#333
                    
                    class HD human
                    class TA,TF,TM team
                    class AD,PG,TD,UI,UX,AC,AI,ML,DP task
                    class QC control
                `}
                theme="default"
                width="100%"
                height="auto"
                backgroundColor="transparent"
              />
            </MermaidContainer>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <CTAButtonWithIcon
              text="Learn More About Core Teams"
              link="./core-teams"
              icon="arrow-right"
            />
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};