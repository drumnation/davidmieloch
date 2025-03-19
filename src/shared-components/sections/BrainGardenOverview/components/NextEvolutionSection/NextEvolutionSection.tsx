import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { NextEvolutionSectionProps } from './NextEvolutionSection.types';
import {
  ContentContainer,
  MermaidContainer,
  fadeInUp,
  staggerContainer,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  CTAButtonWithIcon
} from '../../BrainGardenOverview.logic';

export const NextEvolutionSection: React.FC<NextEvolutionSectionProps> = ({
  className
}) => {
  const mermaidDefinition = `
    graph TB
      classDef current fill:#6A0DAD,color:white,stroke:#333,stroke-width:1px;
      classDef future fill:#4CAF50,color:white,stroke:#333,stroke-width:1px;
      classDef advanced fill:#2196F3,color:white,stroke:#333,stroke-width:1px;
      
      BG[Brain Garden System]
      
      subgraph Current["Current Capabilities"]
        SK[Knowledge System]
        SJ[Skill-Jacks]
        PS[Prompt System]
        MECE[MECE Documentation]
      end
      
      subgraph Future["Next Evolution"]
        AI[Advanced AI Integration]
        KGE[Knowledge Graph Expansion]
        PAI[Prompt Automation]
        ADA[Auto-Documentation Analysis]
      end
      
      subgraph Advanced["Advanced Features"]
        CA[Contextual Awareness]
        ML[Machine Learning Models]
        RT[Real-time Adaptation]
        PC[Prompt Chaining]
      end
      
      BG --> Current
      Current --> Future
      Future --> Advanced
      
      class BG,Current,SK,SJ,PS,MECE current;
      class Future,AI,KGE,PAI,ADA future;
      class Advanced,CA,ML,RT,PC advanced;
  `;

  return (
    <ContentContainer
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <SectionTitleComponent title="The Next Evolution of Brain Garden" />
        
        <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Evolving Prompt and Knowledge Systems</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            The Brain Garden system is continuously evolving to enhance AI assistance capabilities. Our roadmap focuses on advancing both the Prompt System for more automated workflows and the Knowledge System for deeper, more interconnected expertise:
          </Typography>
        </div>
        
        <div style={{ backgroundColor: '#f5f0ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          <MermaidContainer variants={fadeInUp}>
            <MermaidDiagram
              definition={mermaidDefinition}
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
              <Typography variant="h3" mb="1rem">Knowledge Graph Integration</Typography>
            </div>
            <div>
              <Typography variant="body">
                Connecting Skill-Jacks through semantic relationships will create a comprehensive knowledge 
                network that AI can traverse to provide deeper, more contextually relevant assistance.
              </Typography>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <Typography variant="h3" mb="1rem">Prompt Automation</Typography>
            </div>
            <div>
              <Typography variant="body">
                Future enhancements will allow the system to automatically select and chain together optimal prompts
                based on the current development context, further reducing manual prompt selection.
              </Typography>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <Typography variant="h3" mb="1rem">Auto-Documentation Analysis</Typography>
            </div>
            <div>
              <Typography variant="body">
                Advanced prompts will automatically analyze project files to generate structured documentation,
                identify missing information, and maintain complete MECE coverage with minimal developer effort.
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <CTAButtonWithIcon 
            text="Explore the Prompt System Library" 
            link="./knowledge-management" 
            icon="arrow-right" 
          />
        </div>
      </motion.div>
    </ContentContainer>
  );
};