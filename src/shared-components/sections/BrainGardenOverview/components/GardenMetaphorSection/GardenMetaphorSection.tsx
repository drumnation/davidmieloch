import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { GardenMetaphorSectionProps } from './GardenMetaphorSection.types';
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

export const GardenMetaphorSection: React.FC<GardenMetaphorSectionProps> = ({
  className
}) => {
  return (
    <BackgroundSection
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      id="garden-metaphor-section"
    >
      <ContentContainerNoMargin>
        <motion.div variants={fadeInUp}>
          <SectionTitleComponent title="The Garden Metaphor: Growing Your Project" />
          
          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>A Carefully Designed Environment</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Just as a garden needs structure, care, and the right environment to thrive, AI Brain Garden provides a carefully designed environment where your project&apos;s knowledge and AI interactions can grow and flourish.
            </Typography>
          </div>
          
          <div style={{ backgroundColor: '#f0fff4', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <MermaidContainer variants={fadeInUp}>
              <MermaidDiagram
                definition={`
                  graph LR
                    %% Project lifecycle stages as garden phases
                    subgraph "Planting (Initial Setup)"
                      S1["Seed"]
                      S1 --> DS[".brain Structure"]
                      S1 --> TB["Tech Stack Selection"]
                      S1 --> IA["Initial Architecture"]
                    end
                    
                    subgraph "Growth (Development)"
                      S2["Sprout"]
                      S2 --> RQ["Requirements Grow"]
                      S2 --> KW["Knowledge Expands"]
                      S2 --> CM["Components Multiply"]
                    end
                      
                    subgraph "Harvest (Delivery)"
                      S3["Mature"]
                      S3 --> DC["Documentation Complete"]
                      S3 --> FN["Features Finished"]
                      S3 --> NX["Next Iterations Planned"]
                    end
                    
                    %% How the knowledge flows between stages
                    DS --> RQ
                    TB --> KW
                    IA --> CM
                    
                    RQ --> DC
                    KW --> FN
                    CM --> NX
                    
                    classDef phase fill:#4a6bff,stroke:#333,color:white
                    classDef stage fill:#9c6ade,stroke:#333,color:white
                    classDef element fill:#47b881,stroke:#333,color:white
                    
                    class S1,S2,S3 phase
                    class DS,TB,IA,RQ,KW,CM,DC,FN,NX element
                `}
                theme="default"
                width="100%"
                height="auto"
                backgroundColor="transparent"
              />
            </MermaidContainer>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body" color="secondary">
                Like a garden, projects grow from initial seeds to mature systems, with knowledge and documentation evolving at each stage
              </Typography>
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">The Brain Directory (.brain)</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Your garden&apos;s plot, carefully structured for growth. Each team has their own dedicated workspace, 
                  shared knowledge grows and evolves naturally, and templates and patterns ensure consistent growth.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Knowledge Management</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Living documentation that evolves with your project. Each team maintains their specialized knowledge, 
                  shared patterns and best practices, and automatic knowledge capture and organization.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Feature Development Lifecycle</Typography>
              </div>
              <div>
                <Typography variant="body">
                  From seed (concept) to harvest (deployment), natural progression through development stages, 
                  multiple features growing simultaneously, and continuous knowledge enrichment.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">The MECE Approach</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Mutually Exclusive, Collectively Exhaustive principle ensures each agent has clearly defined 
                  responsibilities with no overlap in task ownership, while providing complete coverage of project needs.
                </Typography>
              </div>
            </div>
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};
