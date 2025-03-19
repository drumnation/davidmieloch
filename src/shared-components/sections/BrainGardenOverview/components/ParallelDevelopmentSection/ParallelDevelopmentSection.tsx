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
      id="parallel-development-section"
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
                  graph LR
                    %% Main project repo with two developers working on different features
                    subgraph "Developer 1 - Auth Feature"
                      D1[".brain Directory"] --> D1A["auth/"]
                      D1A --> D1R["requirements.md"]
                      D1A --> D1C["components.md"]
                    end
                    
                    subgraph "Developer 2 - Profile Feature"
                      D2[".brain Directory"] --> D2P["profile/"]
                      D2P --> D2R["requirements.md"]
                      D2P --> D2C["components.md"]
                    end
                    
                    %% Shared knowledge base through git
                    subgraph "Shared Project Repository"
                      REPO["Git Repository"]
                      REPO --> BP[".brain Directory (Main)"]
                      BP --> AUTH["auth/"]
                      BP --> PROF["profile/"]
                      BP --> SHARED["shared/"]
                    end
                    
                    %% The connections show how work flows
                    D1 -->|"git push"| REPO
                    D2 -->|"git push"| REPO
                    REPO -->|"git pull"| D1
                    REPO -->|"git pull"| D2
                    
                    classDef dev fill:#4a6bff,stroke:#333,color:white
                    classDef repo fill:#9c6ade,stroke:#333,color:white
                    classDef folder fill:#47b881,stroke:#333,color:white
                    classDef file fill:#68d391,stroke:#333,color:white
                    
                    class D1,D2 dev
                    class REPO repo
                    class BP,D1A,D2P,AUTH,PROF,SHARED folder
                    class D1R,D1C,D2R,D2C file
                `}
                theme="default"
                width="100%"
                height="auto"
                backgroundColor="transparent"
              />
            </MermaidContainer>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body" color="secondary">
                The .brain directory's MECE organization allows multiple developers to work concurrently on separate features with minimal merge conflicts
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
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};