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
      <ContentContainerNoMargin id="core-components">
        <motion.div variants={fadeInUp}>
          <SectionTitleComponent title="Core Components" />
          
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>The Foundation of the System</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Just as aviation systems have evolved sophisticated documentation and structure to reduce pilot cognitive load, the Brain Garden System consists of three core components that function together to enhance AI capabilities. These practical foundational elements directly address the key challenges we explored earlier—providing structure for knowledge, workflows, and adaptable templates that help AI agents maintain context and follow best practices. The system doesn't magically solve all problems, but it provides a systematic approach that makes AI significantly more effective at handling complex development tasks.
            </Typography>
          </div>
          
          <FeatureGrid 
            features={coreComponentsProps.features}
            columns={3}
            style="gradient-cards"
            animation="stagger-fade"
          />
          
          {/* The Core Components Narrative */}
          <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>The Three Pillars of Structure</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              At the heart of the Brain Garden System are three practical components that work together to enhance AI capabilities:
            </Typography>
            
            <ol style={{ paddingLeft: '2rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Typography variant="body" as="span"><strong>Knowledge System:</strong> A carefully organized documentation system that includes Skill-Jacks - Matrix-inspired knowledge packages that instantly prime AI with specialized expertise without requiring lengthy context-building. The .brain directory structure houses both general project knowledge and specialized domain expertise.</Typography>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Typography variant="body" as="span"><strong>Prompt System:</strong> A library of optimized action prompts that drive every aspect of the development process. These prompts create structured documentation, generate task lists, guide debugging workflows, and facilitate context handoffs between agents. Each systemic action has a pre-created prompt that instantly directs the agent to work in specific ways, saving developers from repetitive typing.</Typography>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Typography variant="body" as="span"><strong>Structured Documentation:</strong> MECE-organized project artifacts that ensure clear boundaries and complete coverage. This isn't just static documentation but a living knowledge base created and maintained through the Prompt System, enabling humans and AI to collaborate effectively while minimizing conflicts and overlap.</Typography>
              </li>
            </ol>
            
            <Typography variant="body" mb="1.5rem">
              These components are designed with MECE principles (Mutually Exclusive, Collectively Exhaustive) to ensure comprehensive coverage of development needs while maintaining clear boundaries between different types of guidance. Whether you're working with a single AI agent or managing context across multiple sessions, this structure significantly enhances AI effectiveness and prevents hallucinations as context windows fill up.
            </Typography>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <MermaidContainer variants={fadeInUp}>
              <MermaidDiagram
                definition={`
                  graph LR
                    %% Brain Garden main components
                    BG[".brain Directory"] --> KS["Knowledge System"]
                    BG --> PS["Prompt System"]
                    BG --> SD["Structured Documentation"]
                    
                    %% Knowledge System details
                    KS --> K1["Project Info"]
                    KS --> K2["Architecture"]
                    KS --> K3["Skill-Jacks"]
                    
                    %% Prompt System details
                    PS --> P1["Workflow Prompts"]
                    PS --> P2["Debugging Prompts"]
                    PS --> P3["Context Handoff"]
                    
                    %% Structured Documentation details
                    SD --> D1["Requirements"]
                    SD --> D2["Components"]
                    SD --> D3["Implementation Guides"]
                    
                    %% Style definitions for clarity and readability
                    classDef root fill:#4a6bff,stroke:#333,color:white,stroke-width:2px
                    classDef system fill:#9c6ade,stroke:#333,color:white,stroke-width:2px
                    classDef component fill:#47b881,stroke:#333,color:white,stroke-width:1px
                    
                    %% Apply styles
                    class BG root
                    class KS,PS,SD system
                    class K1,K2,K3,P1,P2,P3,D1,D2,D3 component
                `}
                theme="default"
                width="100%"
                height="auto"
                backgroundColor="transparent"
              />
            </MermaidContainer>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body" color="secondary">
                The Brain Garden system combines specialized knowledge packages, optimized action prompts, and structured documentation to significantly enhance AI capabilities
              </Typography>
            </div>
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};