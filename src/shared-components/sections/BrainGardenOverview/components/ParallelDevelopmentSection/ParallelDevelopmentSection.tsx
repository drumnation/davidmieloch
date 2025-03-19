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
          <SectionTitleComponent title="Maintaining Development Velocity" />
          
          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Eliminate Crippling Merge Conflicts</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Just like a real development team, AI Brain Garden enables genuine parallel development across multiple features and branches:
            </Typography>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <MermaidContainer variants={fadeInUp}>
              <MermaidDiagram
                definition={`
                  flowchart TB
                    PROBLEM["🚫 AI Agents Generate\nMassive File Changes"]
                    PROBLEM --> RISK["❌ Risk: Crippling\nMerge Conflicts"]
                    RISK --> SLOWDOWN["🐢 Development\nVelocity Slows"]
                    
                    SOLUTION["Brain Garden AI\nAgent Architecture"]
                    SOLUTION --> FEATURES["✅ Agent-Per-Feature\nIsolation"]
                    FEATURES --> BENEFIT["⚡ Parallel Development\nWithout Conflicts"]
                    
                    BENEFIT --> ROI["💰 Sustained\nDevelopment ROI"]
                    SLOWDOWN --> COST["💸 Wasted\nEngineer Hours"]
                    
                    classDef problem fill:#ff6b6b,stroke:#333,stroke-width:2px,color:white,font-size:18px,font-weight:bold,padding:15px
                    classDef risk fill:#f06595,stroke:#333,stroke-width:1px,color:white,font-size:16px,padding:12px
                    classDef impact fill:#cc5de8,stroke:#333,stroke-width:1px,color:white,font-size:16px,padding:12px
                    classDef solution fill:#4dabf7,stroke:#333,stroke-width:2px,color:white,font-size:18px,font-weight:bold,padding:15px
                    classDef feature fill:#4c6ef5,stroke:#333,stroke-width:1px,color:white,font-size:16px,padding:12px
                    classDef benefit fill:#37b24d,stroke:#333,stroke-width:1px,color:white,font-size:16px,padding:12px
                    classDef roi fill:#2b8a3e,stroke:#333,stroke-width:2px,color:white,font-size:18px,font-weight:bold,padding:15px
                    classDef cost fill:#c92a2a,stroke:#333,stroke-width:2px,color:white,font-size:18px,font-weight:bold,padding:15px
                    
                    class PROBLEM,SOLUTION problem
                    class RISK risk
                    class SLOWDOWN,COST impact
                    class FEATURES feature
                    class BENEFIT benefit
                    class ROI roi
                    class COST cost
                `}
                theme="default"
                width="100%"
                height="400px"
                backgroundColor="transparent"
              />
            </MermaidContainer>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body" color="secondary">
                Brain Garden's intelligent architecture prevents the merge conflicts that typically slow teams down when using AI tools
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
                <Typography variant="h3" mb="1rem">The Problem</Typography>
              </div>
              <div>
                <Typography variant="body">
                  AI agents can modify dozens or hundreds of files simultaneously, creating complex merge scenarios 
                  that can take hours or days to resolve, eliminating productivity gains.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">The Solution</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Brain Garden's agent isolation system ensures each feature development path remains 
                  separate, preventing the merge conflicts that typically slow teams down.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">The Impact</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Teams maintain their velocity even with AI tools touching hundreds of files, 
                  keeping your engineering investment productive rather than bogged down in merge conflict resolution.
                </Typography>
              </div>
            </div>
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};