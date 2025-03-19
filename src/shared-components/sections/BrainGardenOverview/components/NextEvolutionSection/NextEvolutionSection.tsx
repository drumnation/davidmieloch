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
  SectionTitleComponent
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
        MCP[Advanced MCP Server]
        LA[Lead & Subordinate Agents]
        AWI[Advanced Workflow Integration]
        VSCE[VSCode Extension]
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
      class Future,MCP,LA,AWI,VSCE future;
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
            The Brain Garden system is continuously evolving to enhance AI assistance capabilities. Our roadmap focuses on advancing both the Prompt System for more automated workflows and the Knowledge System for deeper, more interconnected expertise.
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
              <Typography variant="h3" mb="1rem">Advanced MCP Server</Typography>
            </div>
            <div>
              <Typography variant="body">
                Enhanced MCP server providing more brain-garden specific tools to the agent, including skill-jacks via MCP and meta MCP server allowing dynamically created skilljacks to become dynamically chosen agent tools.
              </Typography>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <Typography variant="h3" mb="1rem">Lead & Subordinate Agents</Typography>
            </div>
            <div>
              <Typography variant="body">
                Lead agent delegates tasks to specialized subordinate agents, such as an architect agent for planning, tester agent for feedback, and multiple agents working in parallel on debugging errors.
              </Typography>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <Typography variant="h3" mb="1rem">Advanced Workflow Integration</Typography>
            </div>
            <div>
              <Typography variant="body">
                Enhanced agile workflow with GitHub Projects integration, VSCode extensions providing GUI for CLI functionality, and continuous iterative improvements to leverage new technologies as they emerge.
              </Typography>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentContainer>
  );
};