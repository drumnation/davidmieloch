import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { CoreComponentsSectionProps } from './CoreComponentsSection.types';
import {
  BackgroundSection,
  ContentContainerNoMargin,
  MermaidContainer,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  CTAButtonWithIcon
} from '../../BrainGardenOverview.logic';

// Default diagram definition
const DEFAULT_DIAGRAM = `
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
`;

export const CoreComponentsSection: React.FC<CoreComponentsSectionProps> = ({
  className,
  coreComponentsProps
}) => {
  // Log to verify props
  console.log('CoreComponentsSection rendering with layout=row');

  return (
    <BackgroundSection
      className={className}
      id="core-components"
    >
      <ContentContainerNoMargin>
        <div>
          <SectionTitleComponent title="Core Components" />
          
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>The Foundation of the System</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Just as aviation systems have evolved sophisticated documentation and structure to reduce pilot cognitive load, the Brain Garden System consists of three core components that function together to enhance AI capabilities. These practical foundational elements directly address the key challenges we explored earlier—providing structure for knowledge, workflows, and adaptable templates that help AI agents maintain context and follow best practices. The system doesn't magically solve all problems, but it provides a systematic approach that makes AI significantly more effective at handling complex development tasks.
            </Typography>
          </div>
          
          {/* EXPLICITLY setting layout to "row" with wrapper div */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              textAlign: 'right', 
              marginBottom: '0.5rem', 
              fontSize: '0.8rem', 
              color: '#666',
              paddingRight: '1rem'
            }}>
              <span>Scroll horizontally to see more →</span>
            </div>
            <FeatureGrid 
              features={coreComponentsProps.features}
              columns={3}
              style="gradient-cards"
              animation="stagger-fade"
              layout="row"
            />
          </div>
          
          {/* The Core Components Narrative */}
          <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>The Brain Garden Architecture</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              The diagram below illustrates how these three core components interconnect to create a context-aware system that grows more valuable over time—like a well-tended garden.
            </Typography>
          </div>

          <MermaidContainer>
            <MermaidDiagram 
              definition={DEFAULT_DIAGRAM}
              theme="default"
              width="100%"
              height="auto"
              backgroundColor="transparent"
            />
          </MermaidContainer>
          
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <CTAButtonWithIcon 
              text="Explore the System" 
              icon="arrow-right" 
              link="#ai-system"
            />
          </div>
        </div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};