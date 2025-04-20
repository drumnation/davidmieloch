import React from 'react';
import { Typography } from '@shared-components/atoms/Typography';
import { Icon } from '@shared-components/atoms/Icon';
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
  CardsGrid,
  FeatureCard,
  FeatureItem,
  SectionWrapper,
  SectionHeader,
  IconContainer as DefaultIconContainer,
  StyledDivider,
  TitleIconWrapper,
  TitleIconBackground
} from './TeamCustomizationSection.styles';
import { BackgroundSection } from '../../BrainGardenOverview.styles';
import { Box } from '@mantine/core';

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
            <DefaultIconContainer>
              <Icon name="users" size={36} />
            </DefaultIconContainer>
            <SectionSubtitleComponent title="The Brain Garden System" />
            <Typography variant="body" mb="1.5rem">
              Through years of working with React and Node.js teams, I developed the AI Brain Garden system to transform how teams interact with AI tools. This isn&apos;t just another set of guidelines—it&apos;s a living, evolving ecosystem that grows with your project and enables true parallel development at scale.
            </Typography>
          </IntroCard>
        </SectionWrapper>

        <SectionWrapper>
          <ContentCard>
            <TitleIconWrapper>
              {/* Apply the TitleIconBackground wrapper here */}
              <TitleIconBackground>
                <Icon name="git-branch" size={20} />
              </TitleIconBackground>
              <SectionSubtitleComponent title="From Individual to Team Director" />
            </TitleIconWrapper>
            <Typography variant="body" mb="1rem">
              Traditional AI coding assistants are like having a single junior developer who can help with individual tasks. AI Brain Garden transforms you into a technical director managing multiple specialized teams, each with their own expertise and focus.
            </Typography>
            <Typography variant="body" mb="1.5rem">
              While we provide default agent personas as examples, the real power lies in its ability to adapt to your project&apos;s specific needs through a systematic MECE (Mutually Exclusive, Collectively Exhaustive) approach.
            </Typography>
          </ContentCard>
        </SectionWrapper>

        <SectionWrapper>
          <ContentCard>
            <TitleIconWrapper>
              {/* Apply the TitleIconBackground wrapper here */}
              <TitleIconBackground>
                <Icon name="layers" size={20} />
              </TitleIconBackground>
              <Typography variant="h3">Real-World Application</Typography>
            </TitleIconWrapper>
            <Typography variant="body" mb="0.75rem">
              For example, in one project I worked on, we needed to build a real-time data visualization platform. Using the MECE approach, we created specialized teams for:
            </Typography>
            <FeatureList>
              <li>
                <div>
                  <Icon name="database" size={16} style={{ color: '#4C51BF' }} />
                  <div className="text-content">
                    <Typography variant="body" weight="bold" as="span">Data Pipeline Architecture</Typography>
                    <Typography variant="body" as="span">Designing efficient data flows and processing</Typography>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <Icon name="bar-chart" size={16} style={{ color: '#4C51BF' }} />
                  <div className="text-content">
                    <Typography variant="body" weight="bold" as="span">Visualization Design</Typography>
                    <Typography variant="body" as="span">Creating intuitive, interactive charts and graphs</Typography>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <Icon name="zap" size={16} style={{ color: '#4C51BF' }} />
                  <div className="text-content">
                    <Typography variant="body" weight="bold" as="span">Performance Optimization</Typography>
                    <Typography variant="body" as="span">Ensuring real-time responsiveness</Typography>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <Icon name="users" size={16} style={{ color: '#4C51BF' }} />
                  <div className="text-content">
                    <Typography variant="body" weight="bold" as="span">UX Flow Engineering</Typography>
                    <Typography variant="body" as="span">Crafting seamless user experiences</Typography>
                  </div>
                </div>
              </li>
            </FeatureList>
            <Typography variant="body" mb="1.5rem" mt="1rem">
              This structure allowed us to tackle complex challenges in parallel while maintaining clear boundaries between responsibilities.
            </Typography>
          </ContentCard>
        </SectionWrapper>

        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '4rem', paddingTop: '2rem' }}>
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