import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { ParallelDevelopmentSectionProps } from './ParallelDevelopmentSection.types';
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

export const ParallelDevelopmentSection: React.FC<ParallelDevelopmentSectionProps> = ({
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
          <SectionTitleComponent title="True Parallel Development" />
          
          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Genuine Parallel Development</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Just like a real development team, AI Brain Garden enables genuine parallel development across multiple features and branches:
            </Typography>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <MermaidContainer variants={fadeInUp}>
              <MermaidDiagram
                definition={`
                  graph TD
                    F[Feature Request] --> PA[Planning & Architecture]
                    PA --> D1[Development Stream 1]
                    PA --> D2[Development Stream 2]
                    PA --> D3[Development Stream 3]
                    
                    D1 --> UI[UI Components]
                    D2 --> BE[Backend Services]
                    D3 --> ML[ML Pipeline]
                    
                    UI --> INT[Integration]
                    BE --> INT
                    ML --> INT
                    
                    INT --> QA[Quality Assurance]
                    QA --> DEP[Deployment]
                    
                    classDef start fill:#4a6bff,stroke:#333
                    classDef stream fill:#9c6ade,stroke:#333
                    classDef component fill:#47b881,stroke:#333
                    classDef final fill:#f7b955,stroke:#333
                    
                    class F,PA start
                    class D1,D2,D3 stream
                    class UI,BE,ML component
                    class INT,QA,DEP final
                `}
                theme="default"
                width="100%"
                height="auto"
                backgroundColor="transparent"
              />
            </MermaidContainer>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Multiple Workspaces</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Open different branches in separate Cursor windows, with each window having a different agent activated. 
                  This allows work to continue in parallel across features.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Continuous Progress</Typography>
              </div>
              <div>
                <Typography variant="body">
                  While Team Architect refactors the authentication system, Team Frontend implements new UI components, 
                  and Team AI/ML optimizes existing integrations.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Efficient Review Cycles</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Review one team&apos;s work while others continue, provide feedback and direction as needed, 
                  and keep all features moving forward.
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <CTAButtonWithIcon 
              text="Learn More About Parallel Development" 
              link="./parallel-development" 
              icon="arrow-right" 
            />
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};