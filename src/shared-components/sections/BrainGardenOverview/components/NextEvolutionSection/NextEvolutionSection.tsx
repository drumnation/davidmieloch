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
  return (
    <ContentContainer
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <SectionTitleComponent title="The Next Evolution: Sub-Agent Teams" />
        
        <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Specialized Sub-Agent Teams</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            Taking parallel development even further, each lead agent can manage their own team of specialized sub-agents:
          </Typography>
        </div>
        
        <div style={{ backgroundColor: '#f5f0ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          <MermaidContainer variants={fadeInUp}>
            <MermaidDiagram
              definition={`
                graph TD
                  LA[Lead Analytics Agent] --> B[Data Pipeline Architect]
                  LA --> C[ML Model Specialist]
                  LA --> D[Visualization Expert]
                  LA --> E[Performance Optimizer]
                  B --> F[ETL Designer]
                  B --> G[Data Quality Engineer]
                  C --> H[Model Trainer]
                  C --> I[Feature Engineer]
                  D --> J[Dashboard Designer]
                  D --> K[UX Specialist]
                  E --> L[Query Optimizer]
                  E --> M[Cache Strategist]
                  
                  classDef lead fill:#4a6bff,stroke:#333
                  classDef team fill:#9c6ade,stroke:#333
                  classDef sub fill:#47b881,stroke:#333
                  
                  class LA lead
                  class B,C,D,E team
                  class F,G,H,I,J,K,L,M sub
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
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <div>
              <Typography variant="h3" mb="1rem">Team Delegation</Typography>
            </div>
            <div>
              <Typography variant="body">
                Lead agents assign tasks to sub-agents, multiple sub-agents work in parallel, 
                lead agents review and coordinate output, and continuous progress across all areas.
              </Typography>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <div>
              <Typography variant="h3" mb="1rem">Hierarchical Organization</Typography>
            </div>
            <div>
              <Typography variant="body">
                Human director manages lead agents, lead agents manage sub-agent teams, 
                sub-agents focus on specific tasks, and exponential productivity scaling.
              </Typography>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <div>
              <Typography variant="h3" mb="1rem">Quality Control</Typography>
            </div>
            <div>
              <Typography variant="body">
                Lead agents ensure sub-agent work meets standards, multiple levels of review and validation, 
                consistent patterns across all teams, and comprehensive testing and documentation.
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <CTAButtonWithIcon 
            text="Learn More About Sub-Agent Teams" 
            link="./team-customization" 
            icon="arrow-right" 
          />
        </div>
      </motion.div>
    </ContentContainer>
  );
};