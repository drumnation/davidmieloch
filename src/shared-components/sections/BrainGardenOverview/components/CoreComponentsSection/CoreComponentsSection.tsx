import React from 'react';
import dynamic from 'next/dynamic';
import { Typography } from '../../../../atoms/Typography';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { CoreComponentsSectionProps } from './CoreComponentsSection.types';
import {
  BackgroundSection,
  ContentContainerNoMargin,
  MermaidContainer,
  SectionSubtitle,
  WhiteBackgroundSection
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  CTAButtonWithIcon
} from '../../BrainGardenOverview.logic';
import { Card } from '../../../../../shared-components/atoms/Card';
import { ContentBlock, SectionTitle, SubsectionTitle } from '../../../../sections/TechnicalImplementation/TechnicalImplementation.styles';
import { DiagramContainer } from './CoreComponentsSection.styles';
import { DiagramClientWrapper } from '../../../../../components/diagrams/_wrappers/DiagramClientWrapper';

// Import BrainGardenComponentsDiagram with SSR disabled
const BrainGardenComponentsDiagram = dynamic(
  () => import('../../../../../components/diagrams/BrainGardenComponentsDiagram').then(mod => mod.BrainGardenComponentsDiagram),
  { ssr: false, loading: () => <div>Loading diagram...</div> }
);

// Default diagram definition - simple text to avoid complex Mermaid processing
const DEFAULT_DIAGRAM = `
  graph LR
    BG[".brain Directory"] --> KS["Knowledge System"]
    BG --> PS["Prompt System"]
    BG --> SD["Structured Documentation"]
`;

export const CoreComponentsSection: React.FC<CoreComponentsSectionProps> = ({
  className,
  coreComponentsProps
}) => {
  // Log to verify props
  console.log('CoreComponentsSection rendering with layout=grid');

  return (
    <>
      <BackgroundSection
        className={className}
        id="core-components"
        style={{ marginBottom: 0 }} // Remove extra spacing at the bottom
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
            
            {/* Feature grid with equal width cards */}
            <div style={{ marginBottom: '1rem' }}>
              <FeatureGrid 
                features={coreComponentsProps.features}
                columns={3}
                style="gradient-cards"
                animation="stagger-fade"
                layout="grid"
              />
            </div>
          </div>
        </ContentContainerNoMargin>
      </BackgroundSection>
      
      {/* The Brain Garden Architecture section with white background */}
      <WhiteBackgroundSection style={{ paddingTop: '3rem', marginBottom: 0, paddingBottom: '6rem' }}>
        <ContentContainerNoMargin>
          <div>
            {/* The Core Components Narrative */}
            <div style={{ marginBottom: '2rem' }}>
              <SectionSubtitle style={{ marginBottom: '1.5rem' }}>The Brain Garden Architecture</SectionSubtitle>
              <Typography variant="body" mb="1.5rem">
                The diagram below illustrates how these three core components interconnect to create a context-aware system that grows more valuable over time—like a well-tended garden.
              </Typography>
            </div>

            <MermaidContainer>
              <BrainGardenComponentsDiagram 
                theme="default"
                width="100%"
                height="400px"
                backgroundColor="transparent"
                showZoomControls={true}
                accessibilityDescription="Brain Garden Core Components Diagram showing the three main components: Knowledge System, Prompt System, and Structured Documentation"
              />
            </MermaidContainer>
            
            <div style={{ marginTop: '3rem', textAlign: 'center', paddingBottom: '1rem' }}>
              <CTAButtonWithIcon 
                text="Explore the System" 
                icon="arrow-right" 
                link="#ai-system"
              />
            </div>
          </div>
        </ContentContainerNoMargin>
      </WhiteBackgroundSection>
    </>
  );
};