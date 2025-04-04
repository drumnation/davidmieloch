import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { Icon } from '../../../../atoms/Icon';
import { BrainGardenComponentsDiagram } from '../../../../../components/diagrams/BrainGardenComponentsDiagram/BrainGardenComponentsDiagram';
import { TeamCustomizationSectionProps } from './TeamCustomizationSection.types';
import {
  SectionTitleComponent,
  SectionSubtitleComponent
} from '../../BrainGardenOverview.logic';
import {
  TeamContainer,
  ContentCard,
  IntroCard,
  FeatureList,
  DiagramCard,
  CardsGrid,
  FeatureCard,
  FeatureItem,
  SectionWrapper,
  BackgroundAccent,
  SectionHeader,
  IconContainer,
  StyledDivider
} from './TeamCustomizationSection.styles';
import { BackgroundSection } from '../../BrainGardenOverview.styles';

export const TeamCustomizationSection: React.FC<TeamCustomizationSectionProps> = ({
  className
}) => {
  return (
    <BackgroundSection
      className={className}
      id="team-customization-section"
    >
      <TeamContainer>
        <SectionHeader>
          <SectionTitleComponent title="Customizing Your Team" />
          <StyledDivider />
        </SectionHeader>
        
        <SectionWrapper>
          <IntroCard>
            <IconContainer>
              <Icon name="users" size={36} />
            </IconContainer>
            <SectionSubtitleComponent title="The Brain Garden System" />
            <Typography variant="body" mb="1.5rem">
              Through years of working with React and Node.js teams, I developed the AI Brain Garden system to transform how teams interact with AI tools. This isn&apos;t just another set of guidelines—it&apos;s a living, evolving ecosystem that grows with your project and enables true parallel development at scale.
            </Typography>
          </IntroCard>
        </SectionWrapper>
        
        <SectionWrapper>
          <ContentCard>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Icon name="git-branch" size={24} style={{ marginRight: '0.75rem', color: '#4C51BF' }} />
              <SectionSubtitleComponent title="From Individual to Team Director" />
            </div>
            <Typography variant="body" mb="1.5rem">
              Traditional AI coding assistants are like having a single junior developer who can help with individual tasks. AI Brain Garden transforms you into a technical director managing multiple specialized teams, each with their own expertise and focus. While we provide default agent personas as examples, the real power lies in its ability to adapt to your project&apos;s specific needs through a systematic MECE (Mutually Exclusive, Collectively Exhaustive) approach.
            </Typography>
          </ContentCard>
        </SectionWrapper>

        <BackgroundAccent>
          <ContentCard>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Icon name="layers" size={24} style={{ marginRight: '0.75rem', color: '#4C51BF' }} />
              <Typography variant="h3">Real-World Application</Typography>
            </div>
            <Typography variant="body" mb="0.75rem">
              For example, in one project I worked on, we needed to build a real-time data visualization platform. Using the MECE approach, we created specialized teams for:
            </Typography>
            <FeatureList>
              <li><b>Data Pipeline Architecture</b> - Designing efficient data flows and processing</li>
              <li><b>Visualization Design</b> - Creating intuitive, interactive charts and graphs</li>
              <li><b>Performance Optimization</b> - Ensuring real-time responsiveness</li>
              <li><b>UX Flow Engineering</b> - Crafting seamless user experiences</li>
            </FeatureList>
            <Typography variant="body" mb="1.5rem">
              This structure allowed us to tackle complex challenges in parallel while maintaining clear boundaries between responsibilities.
            </Typography>
          </ContentCard>
        </BackgroundAccent>
        
        <DiagramCard>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Typography variant="h3" className="underlined-title">MECE Organization Approach</Typography>
          </div>
          <BrainGardenComponentsDiagram
            title=""
            theme="default"
            width="100%"
            height="400px"
            showZoomControls={false}
            accessibilityDescription="MECE organization divides projects into distinct domains with consistent documentation structure, preventing conflicts while ensuring complete coverage"
          />
          <div style={{ textAlign: 'center', marginTop: '1.5rem', padding: '0 1.5rem' }}>
            <Typography variant="body" color="secondary" className="italic-text">
              MECE organization divides projects into distinct domains with consistent documentation structure, preventing conflicts while ensuring complete coverage
            </Typography>
          </div>
        </DiagramCard>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="h2" className="section-title">Implementation Process</Typography>
          <Typography variant="body" className="section-description">
            A systematic approach to customizing AI teams based on your project's specific needs:
          </Typography>
        </div>
        
        <CardsGrid>
          {[
            {
              title: "Project Analysis",
              icon: "search",
              items: [
                "Break down project requirements into distinct domains",
                "Identify core technical challenges",
                "Map out integration points and dependencies",
                "Define quality and performance requirements"
              ]
            },
            {
              title: "Skill Mapping",
              icon: "user-check",
              items: [
                "Determine required expertise for each domain",
                "Identify overlapping skill requirements",
                "Define communication protocols",
                "Create specialized agent profiles"
              ]
            }
          ].map((card, index) => (
            <FeatureCard key={index}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ 
                  backgroundColor: '#4C51BF15', 
                  borderRadius: '50%', 
                  width: '48px', 
                  height: '48px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <Icon name={card.icon} size={24} style={{ color: '#4C51BF' }} />
                </div>
                <Typography variant="h3">{card.title}</Typography>
              </div>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {card.items.map((item, i) => (
                  <FeatureItem key={i}>
                    <Typography variant="body">{item}</Typography>
                  </FeatureItem>
                ))}
              </ul>
            </FeatureCard>
          ))}
        </CardsGrid>
      </TeamContainer>
    </BackgroundSection>
  );
};