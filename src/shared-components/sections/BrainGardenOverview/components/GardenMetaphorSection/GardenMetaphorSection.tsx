import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { GardenMetaphorDiagram } from '../../../../diagrams/GardenMetaphorDiagram/GardenMetaphorDiagram';
import { GardenMetaphorSectionProps } from './GardenMetaphorSection.types';
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
const GARDEN_METAPHOR_DIAGRAM = `
  %%{init: { 'theme': 'base', 'themeVariables': { 'primaryColor': '#4a6bff', 'primaryTextColor': '#fff', 'primaryBorderColor': '#333', 'lineColor': '#666', 'secondaryColor': '#47b881', 'tertiaryColor': '#fff', 'clusterBkg': '#ffffff', 'clusterBorder': '#cccccc' } } }%%
  flowchart LR
    %% Define the three main phases with their icons
    Seed[/"Seed"/]
    Sprout[/"Sprout"/]
    Mature[/"Mature"/]
    
    %% Main flow
    Seed --> Sprout --> Mature
    
    %% Branch out the key aspects from each phase
    Seed --> S1["Initial Setup"]
    Seed --> S2["Knowledge Structure"]
    Seed --> S3["Core Prompts"]
    
    Sprout --> SP1["Cultivating Patterns"]
    Sprout --> SP2["Testing & Refining"]
    Sprout --> SP3["Expanding Capabilities"]
    
    Mature --> M1["Self-Improving"]
    Mature --> M2["Context-Aware"]
    Mature --> M3["Continuously Adapting"]
    
    %% Styling
    classDef phase fill:#4a6bff,stroke:#333,color:white,stroke-width:2px,rx:10,ry:10
    classDef aspect fill:#47b881,stroke:#333,color:white
    
    class Seed,Sprout,Mature phase
    class S1,S2,S3,SP1,SP2,SP3,M1,M2,M3 aspect
`;

export const GardenMetaphorSection: React.FC<GardenMetaphorSectionProps> = ({
  className
}) => {
  return (
    <BackgroundSection
      className={className}
      id="garden-metaphor-section"
    >
      <ContentContainerNoMargin>
        <div>
          <SectionTitleComponent title="The Garden Metaphor: Growing Your Project" />
          
          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>A Carefully Designed Environment</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Just as a garden needs structure, care, and the right environment to thrive, AI Brain Garden provides a carefully designed environment where your project&apos;s knowledge and AI interactions can grow and flourish.
            </Typography>
          </div>
          
          <div style={{ backgroundColor: '#f0fff4', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <MermaidContainer>
              <GardenMetaphorDiagram
                title=""
                theme="default"
                width="100%"
                height="350px"
                showZoomControls={false}
                accessibilityDescription="Garden Metaphor Diagram showing the three phases of a Brain Garden project's growth: Seed Phase (Initial Setup, Knowledge Structure, Core Prompts), Sprout Phase (Cultivating Patterns, Testing & Refining, Expanding Capabilities), and Mature Phase (Self-Improving, Context-Aware, Continuously Adapting)"
              />
            </MermaidContainer>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body" color="secondary">
                The three phases of a Brain Garden project&apos;s growth - from initial setup to self-improving system
              </Typography>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Growing Your AI System Over Time</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Like a garden, the AI Brain Garden becomes more valuable and productive over time. The initial structure provides a foundation, but the true value emerges as your team contributes knowledge, refines processes, and establishes clear patterns.
            </Typography>
            
            <Typography variant="body" mb="1.5rem">
              This natural growth cycle helps teams overcome the learning curve that typically accompanies AI adoption. Instead of trying to implement a perfect system from day one, you start with simple structures that grow organically with your team&apos;s experience.
            </Typography>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ flex: '1 1 300px', margin: '1rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Typography 
                variant="h3" 
                color="primary"
                mb="1rem"
                as="h3"
                className="phase-title"
              >
                <span style={{ marginRight: '0.5rem' }}>🌱</span> Seed Phase
              </Typography>
              <Typography variant="body" mb="1rem">
                Begin with the essential structure—the .brain directory—containing basic knowledge organization, core prompts, and initial documentation templates. This foundational structure is lightweight but provides immediate value.
              </Typography>
            </div>
            
            <div style={{ flex: '1 1 300px', margin: '1rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Typography 
                variant="h3" 
                color="primary"
                mb="1rem"
                as="h3"
                className="phase-title"
              >
                <span style={{ marginRight: '0.5rem' }}>🌿</span> Sprout Phase
              </Typography>
              <Typography variant="body" mb="1rem">
                As your team works with the system, it naturally expands. Knowledge becomes richer, prompts are refined based on experience, and workflows become smoother. This phase is about cultivating patterns and adapting to your team&apos;s specific needs.
              </Typography>
            </div>
            
            <div style={{ flex: '1 1 300px', margin: '1rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Typography 
                variant="h3" 
                color="primary"
                mb="1rem"
                as="h3"
                className="phase-title"
              >
                <span style={{ marginRight: '0.5rem' }}>🌳</span> Mature Phase
              </Typography>
              <Typography variant="body" mb="1rem">
                The system becomes robust and self-improving. AI agents understand context deeply, can handle complex tasks with minimal guidance, and adapt to new challenges efficiently. The system doesn&apos;t just help with individual tasks but enhances the entire development ecosystem.
              </Typography>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <CTAButtonWithIcon 
              text="Explore the Core Components" 
              icon="arrow-right" 
              link="#core-components"
            />
          </div>
        </div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};
