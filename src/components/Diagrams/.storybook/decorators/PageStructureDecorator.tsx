import React from 'react';
import styled from 'styled-components';
import { StoryFn } from '@storybook/react';

// Emulate the styles from the actual page content
const BackgroundSection = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  padding: 5rem 0;
  margin-bottom: 5rem;
  
  @media (max-width: 576px) {
    padding: 3.75rem 0;
    margin-bottom: 3.75rem;
  }
`;

const ContentContainerNoMargin = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: inherit;
  
  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
`;

const Typography = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: inherit;
  
  @media (max-width: 576px) {
    font-size: 1.75rem;
  }
`;

const MermaidContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  overflow-x: auto;
`;

export const brainGardenPageDecorator = (Story: StoryFn) => (
  <BackgroundSection>
    <ContentContainerNoMargin>
      <div>
        <SectionTitle>The Garden Metaphor: Growing Your Project</SectionTitle>
        
        <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>A Carefully Designed Environment</SectionSubtitle>
          <Typography>
            Just as a garden needs structure, care, and the right environment to thrive, AI Brain Garden provides a carefully designed environment where your project's knowledge and AI interactions can grow and flourish.
          </Typography>
        </div>
        
        <div style={{ backgroundColor: '#f0fff4', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          <MermaidContainer>
            <Story />
          </MermaidContainer>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Typography style={{ color: '#47b881' }}>
              The three phases of a Brain Garden project's growth - from initial setup to self-improving system
            </Typography>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Growing Your AI System Over Time</SectionSubtitle>
          <Typography>
            Like a garden, the AI Brain Garden becomes more valuable and productive over time. The initial structure provides a foundation, but the true value emerges as your team contributes knowledge, refines processes, and establishes clear patterns.
          </Typography>
          
          <Typography>
            This natural growth cycle helps teams overcome the learning curve that typically accompanies AI adoption. Instead of trying to implement a perfect system from day one, you start with simple structures that grow organically with your team's experience.
          </Typography>
        </div>
      </div>
    </ContentContainerNoMargin>
  </BackgroundSection>
);

export const technicalImplementationDecorator = (Story: StoryFn) => (
  <div style={{ padding: '2rem 0', backgroundColor: '#ffffff' }}>
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
      <SectionTitle>Knowledge System Flow</SectionTitle>
      <Typography>
        The Knowledge System is like your team's collective brain, but better. It captures knowledge automatically, makes it actionable, and ensures it flows to everyone who needs it.
      </Typography>

      <Typography>
        Instead of knowledge being trapped in individual team members' minds or scattered across different documents, it becomes a shared resource that grows more valuable over time.
      </Typography>

      <div style={{ margin: '2rem 0', padding: '1rem', backgroundColor: 'rgba(74, 158, 255, 0.05)', borderRadius: '8px', maxWidth: '700px' }}>
        <Story />
      </div>

      <Typography>
        This systematic approach to knowledge ensures that your team constantly learns and improves, building on past successes and avoiding repeated mistakes.
      </Typography>

      <SectionSubtitle>Key Features</SectionSubtitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '8px', 
          padding: '1.5rem', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Captures Knowledge Automatically</h3>
          <Typography>
            Records successful patterns as they emerge, documents architectural decisions and their context, and preserves implementation details and rationale.
          </Typography>
        </div>
      </div>
    </div>
  </div>
);

export const aiIntegrationDecorator = (Story: StoryFn) => (
  <div style={{ padding: '2rem 0', backgroundColor: '#ffffff' }}>
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
      <SectionTitle>AI Integration Process Flow</SectionTitle>
      <Typography>
        The following diagram illustrates the ideal process flow for integrating AI into development workflows, from initial assessment to continuous improvement.
      </Typography>

      <div style={{ margin: '2rem 0' }}>
        <Story />
      </div>

      <Typography>
        This systematic approach ensures that AI integration enhances your development process rather than disrupting it, with feedback loops that drive continuous improvement.
      </Typography>
    </div>
  </div>
);

// A generic decorator that can be used for any diagram
export const genericPageDecorator = (Story: StoryFn) => (
  <div style={{ padding: '2rem 0', backgroundColor: '#ffffff' }}>
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ margin: '2rem 0' }}>
        <Story />
      </div>
    </div>
  </div>
); 