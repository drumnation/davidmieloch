'use client';

import '@mantine/carousel/styles.css';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Hero } from '@shared-components/organisms/Hero';
import { PersonaNavItem, HomePageProps } from './Home.types';
import { useHomeData } from './Home.hook';
import { FSBPSection } from './components/ContentSection/ContentSection';
import { SectionHeading } from './components/SectionHeading';
import { PersonaCard } from './components/PersonaCard/PersonaCard';
import CTALink from './components/CTALink';
import { Card } from './components/Card';
import { TechIcon } from '../../atoms/TechIcon';
import { formatTechList } from './Home.utils';
import { formatProjectName } from './Home.utils';
import { BlueTintGenericSection } from './Home.styles.ts';
import {
  FcIdea,
  FcRating,
  FcMindMap,
  FcPositiveDynamic,
  FcPuzzle,
  FcCurrencyExchange,
  FcStatistics,
  FcReading,
  FcManager,
  FcBiotech,
  FcSettings,
  FcEngineering,
  FcSearch,
  FcOk
} from 'react-icons/fc';
import {
  Badge,
  ButtonGroup,
  FrameworksGrid,
  FullWidthBackgroundWrapper, // From Home.styles.tsx
  Highlight,
  HomeContainer, // From Home.styles.tsx
  HeroSection,
  CurveOverlay,
  PersonaNav,
  SectionBodyText,
  SectionDivider,
  SectionTitle,
  SectionWrapper,
  StandOutSection,
  StandOutTitle,
  StandOutList,
  StandOutItem,
  StyledGenericSection,
  SectionHeaderContainer,
  SectionHeaderIcon,
  SectionHeaderTitle,
  DarkBackgroundSection,
  CarouselContainer,
} from './Home.styles.ts';
import { Title, Text, Box, Container, useMantineTheme } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import {
  PROJECT_AI_CONTEXT_GENERATOR,
  PROJECT_PROMPT_FORGE,
  CAROUSEL_PROJECTS
} from './Home.constants';
import { theme } from './Home.styles.ts'; // Import theme

export const Home: React.FC<HomePageProps> = ({ onReady }) => {
  const {
    heroProps,
    personaNavData,
    metaData,
  } = useHomeData();
  const theme = useMantineTheme(); // Get theme for breakpoints
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`); // Check if desktop

  // Map of icons for the persona cards
  const personaIconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    'For CEOs': FcManager,
    'For CTOs': FcSettings,
    'For Engineering Managers': FcEngineering,
    'For Recruiters': FcSearch,
  };

  // Technologies list for footer section - using React components instead of emoji strings
  const technologiesWithIcons = [
    <React.Fragment key="ai"><FcBiotech style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Built with AI</React.Fragment>,
    <React.Fragment key="react"><FcMindMap style={{ verticalAlign: 'middle', marginRight: '4px' }} /> React</React.Fragment>,
    <React.Fragment key="strategy"><FcStatistics style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Content Strategy</React.Fragment>
  ];

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={metaData.ogTitle} />
        <meta property="og:description" content={metaData.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metaData.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.twitterTitle} />
        <meta name="twitter:description" content={metaData.twitterDescription} />
      </Head>

      <FullWidthBackgroundWrapper />

      <HomeContainer>
        {/* Hero Section with Cylindrical Glow */}
        <HeroSection className="with-glow">
          <div className="cylinder-backdrop" />
          <div className="hero-content fade-in-element">
            <Hero {...heroProps} onImageLoad={onReady} />
          </div>
        </HeroSection>

        {/* Curve Overlay */}
        <CurveOverlay />

        {/* Full-Stack Business Person Concept Block */}
        <StyledGenericSection id="fsbp-concept">
          <SectionHeading icon={<FcIdea size={24} />} title="Full-Stack Business Person Model" />
          <SectionBodyText>
            AI isn&apos;t just changing how we code — it&apos;s redefining what kind of developers teams need.
          </SectionBodyText>
          <SectionBodyText>
            As teams shrink and AI handles more tasks, the highest-leverage contributors are <Highlight>multi-disciplinary builders</Highlight> who combine:
          </SectionBodyText>
          <StandOutList style={{ marginTop: '0.5rem', marginBottom: '1rem' }}> {/* Reusing StandOutList for styling */}
            <StandOutItem>Deep technical skills</StandOutItem>
            <StandOutItem>Product intuition</StandOutItem>
            <StandOutItem>Business awareness</StandOutItem>
            <StandOutItem>Clear communication</StandOutItem>
            <StandOutItem>AI-assisted workflows</StandOutItem>
          </StandOutList>
          <SectionBodyText>
            I call this the <strong>Full-Stack Business Person</strong> — an engineer who thinks in systems, ships with speed, and understands the "why" behind every feature.
          </SectionBodyText>
          <SectionBodyText style={{ marginTop: '1rem', fontStyle: 'italic' }}>
            <FcMindMap style={{ verticalAlign: 'middle', marginRight: '4px' }} /> This site exists to show what that looks like in practice.
          </SectionBodyText>
        </StyledGenericSection>

        {/* Why I Stand Out Section */}
        <StandOutSection>
          <StandOutTitle>
            <FcOk size={24} style={{ marginRight: '0.75rem' }} />
            Why I Stand Out
          </StandOutTitle>
          <StandOutList>
            <StandOutItem>Led AI-integrated platform architecture at scale</StandOutItem>
            <StandOutItem>Expert in React, TypeScript, Node, and system design</StandOutItem>
            <StandOutItem>Created high-leverage tools & agent workflows used in real-world apps</StandOutItem>
            <StandOutItem>Strong communicator, mentor, and thought leader with product vision</StandOutItem>
            <StandOutItem>Deep understanding of modern dev culture, testing, documentation, and delivery</StandOutItem>
          </StandOutList>
        </StandOutSection>

        {/* Persona-Targeted Navigation */}
        <PersonaNav className="persona-nav">
          {personaNavData.map((persona: PersonaNavItem, index: number) => {
            // Get the icon component for this persona
            const IconComponent = persona.title in personaIconMap ? personaIconMap[persona.title] : undefined;

            return (
              <PersonaCard
                key={index}
                icon={persona.icon}
                title={persona.title}
                description={persona.description}
                link={persona.link}
                IconComponent={IconComponent}
              />
            );
          })}
        </PersonaNav>

        {/* Why This Site Exists Section */}
        <StyledGenericSection>
          <SectionHeading icon={<FcIdea size={24} />} title="Why This Site Exists" />
          <SectionBodyText>
            This isn&apos;t just a portfolio—it&apos;s a live demonstration of the Full-Stack Business Person (FSBP) principle in action. Every aspect of this site, from design to copy to automation, was built solo and amplified by AI tools I architected or wrote myself.
          </SectionBodyText>
          <SectionBodyText>
            <strong>Why?</strong> To prove that a single, <Highlight>AI-native developer</Highlight> can deliver the velocity, quality, and narrative clarity that modern teams need. This site is both my product and my proof: a working example of how engineering, business, and digital marketing can converge in one adaptive, agent-augmented workflow.
          </SectionBodyText>
          <div style={{ marginTop: '1.5rem', fontSize: '0.95em', color: '#e2e8f0', textAlign: 'center' }}>
            {technologiesWithIcons.map((tech, index) => (
              <React.Fragment key={`tech-${index}`}>
                <span style={{ margin: '0 8px' }}>{tech}</span>
                {index < technologiesWithIcons.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        </StyledGenericSection>

        <SectionDivider />

        {/* Full-Stack Business Person Section - Moved up earlier in the page */}
        <FSBPSection />

        <SectionDivider />

        {/* Frameworks in Action Section - Updated with refined content and links */}
        <BlueTintGenericSection id="frameworks">
          <SectionHeaderContainer>
            <SectionHeaderIcon><FcPuzzle size={28} /></SectionHeaderIcon>
            <SectionHeaderTitle>Frameworks in Action</SectionHeaderTitle>
          </SectionHeaderContainer>
          <SectionBodyText>
            These frameworks demonstrate how I lead engineering teams through real-world complexity—from orchestrating AI systems to modernizing legacy codebases. Each is written as a standalone playbook, rooted in execution.
          </SectionBodyText>
          <FrameworksGrid>
            <Card
              variant="framework"
              icon={<TechIcon name="openai" size={36} color="white" />}
              title="AI Transformation"
              description="How to orchestrate dev teams in the age of agents"
              action={<CTALink
                href="/enterprise-ai-development-framework"
                label="Read Framework"
                iconType="file-text"
                variant="primary"
              />}
            />
            <Card
              variant="framework"
              icon={<TechIcon name="react" size={36} />}
              title="React Best Practices"
              description="How I clean up and future-proof maturing codebases"
              action={<CTALink
                href="/fullstack-react-best-practices-integration"
                label="Read Framework"
                iconType="file-text"
                variant="primary"
              />}
            />
          </FrameworksGrid>
        </BlueTintGenericSection>

        <SectionDivider />

        {/* Live Proof Projects Section - Use DarkBackgroundSection */}
        <DarkBackgroundSection id="projects">
          {/* Headline and Intro */}
          <Title order={2} ta="center" mb="lg">
            <FcPositiveDynamic size={28} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Live Proof Projects in Action
          </Title>
          <Text c="dimmed" ta="center" mb="xl">
            These tools reflect how I build and scale AI-native workflows —<br /> from installable dev tools to internal orchestration systems.
          </Text>

          {/* Developer Tools & Applications Section Header */}
          <Text tt="uppercase" size="sm" fw={700} c="dimmed" mb="xs">Developer Tools & Applications</Text>
          <FrameworksGrid>
            {/* Card for aiContextGenerator */}
            <Card
              variant="project"
              iconBackgroundColor={PROJECT_AI_CONTEXT_GENERATOR.iconBackgroundColor}
              icon={
                PROJECT_AI_CONTEXT_GENERATOR.iconType === 'image' && PROJECT_AI_CONTEXT_GENERATOR.iconValue === 'ai-context-generator' ?
                  <Image src="https://drumnation.gallerycdn.vsassets.io/extensions/drumnation/ai-context-generator/0.0.10/1721423097801/Microsoft.VisualStudio.Services.Icons.Default" alt="AI Context Generator Logo" width={40} height={40} /> :
                  <Text size="xl">?</Text>
              }
              title={PROJECT_AI_CONTEXT_GENERATOR.name}
              description={PROJECT_AI_CONTEXT_GENERATOR.description}
              action={<CTALink
                href={PROJECT_AI_CONTEXT_GENERATOR.link || '#'}
                label={PROJECT_AI_CONTEXT_GENERATOR.status === 'live' ? "View on VS Marketplace" : "Learn More"}
                iconNode={PROJECT_AI_CONTEXT_GENERATOR.link?.includes('marketplace') ? <Image src="/vscode-marketplace-logo.png" alt="VS Code Marketplace Logo" width={20} height={20} /> : undefined}
                variant="primary"
                size="sm"
              />}
            >
              {PROJECT_AI_CONTEXT_GENERATOR.badges && (
                <div style={{ marginBottom: 12 }}>
                  {PROJECT_AI_CONTEXT_GENERATOR.badges.map((badge) => (
                    <Badge key={badge.text} bg={badge.bg} color={badge.color || theme.white}>
                      {badge.icon && <badge.icon style={{ verticalAlign: 'middle', marginRight: '4px' }} size={14} />}
                      {badge.text}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* Card for promptForge */}
            <Card
              variant="project"
              iconBackgroundColor={PROJECT_PROMPT_FORGE.iconBackgroundColor}
              icon={
                PROJECT_PROMPT_FORGE.iconType === 'image' ?
                  <Image
                    src={PROJECT_PROMPT_FORGE.iconValue}
                    alt={`${PROJECT_PROMPT_FORGE.name} Logo`}
                    width={60}
                    height={60}
                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                  /> :
                  <Text size="xl">?</Text>
              }
              title={PROJECT_PROMPT_FORGE.name}
              description={PROJECT_PROMPT_FORGE.description}
              action={<CTALink
                href={PROJECT_PROMPT_FORGE.link || '#'}
                label={PROJECT_PROMPT_FORGE.status === 'live' ? "View Live" : "Learn More"}
                iconNode={PROJECT_PROMPT_FORGE.link?.includes('github') ? <Image src="/github-logo.svg" alt="GitHub Logo" width={20} height={20} /> : undefined}
                variant="primary"
                size="sm"
              />}
            >
              {PROJECT_PROMPT_FORGE.badges && (
                <div style={{ marginBottom: 12 }}>
                  {PROJECT_PROMPT_FORGE.badges.map((badge) => (
                    <Badge key={badge.text} bg={badge.bg} color={badge.color || theme.white}>
                      {badge.icon && <badge.icon style={{ verticalAlign: 'middle', marginRight: '4px' }} size={14} />}
                      {badge.text}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </FrameworksGrid>

          {/* Carousel Row (Modular / Internal / Power-User Tools) */}
          <Text tt="uppercase" size="sm" fw={700} c="dimmed" mb="xs" mt="xl">Agent Workflow & Infrastructure Tools</Text>
          <CarouselContainer>
            <Carousel
              slideSize={{ base: '100%', sm: '50%' }}
              slideGap="md"
              loop
              withIndicators
            >
              {CAROUSEL_PROJECTS.map((project) => (
                <Carousel.Slide key={project.name}>
                  <Card
                    variant="project"
                    iconBackgroundColor={project.iconBackgroundColor}
                    style={{ height: '400px' }}
                    icon={
                      (() => {
                        // Special case for ai-context-generator (remains unchanged)
                        if (project.name === 'ai-context-generator') {
                          return <Image src="https://drumnation.gallerycdn.vsassets.io/extensions/drumnation/ai-context-generator/0.0.10/1721423097801/Microsoft.VisualStudio.Services.Icons.Default" alt="AI Context Generator Logo" width={40} height={40} />;
                        }
                        // General icon rendering logic using switch
                        switch (project.iconType) {
                          case 'image':
                            return (
                              <Image
                                src={project.iconValue}
                                alt={`${project.name} Logo`}
                                width={60} // Size for the image itself
                                height={60}
                                style={{ objectFit: 'cover' }} // Let CardIcon handle overflow/radius
                              />
                            );
                          case 'techIcon':
                            return (
                              // Render TechIcon directly, CardIcon provides container
                              <TechIcon name={project.iconValue} size={60} />
                            );
                          case 'emoji':
                          default:
                            // Render Emoji text directly, CardIcon provides container
                            return <Text size="xl">{project.iconValue}</Text>;
                        }
                      })()
                    }
                    title={formatProjectName(project.name)}
                    description={project.description}
                    action={<CTALink
                      href={project.link || '#'}
                      label={
                        project.status === 'coming soon'
                          ? "Coming Soon"
                          : project.link?.includes('github')
                            ? "View on GitHub"
                            : "Learn More"
                      }
                      iconNode={
                        project.status === 'coming soon'
                          ? undefined
                          : project.link?.includes('github')
                            ? <Image src="/github-logo.svg" alt="GitHub Logo" width={20} height={20} />
                            : undefined
                      }
                      variant={project.status === 'coming soon' ? "secondary" : "primary"}
                      size="sm"
                    />}
                  >
                    {project.badges && (
                      <div style={{ marginBottom: 12 }}>
                        {project.badges.map((badge) => (
                          <Badge key={badge.text} bg={badge.bg} color={badge.color || theme.white}>
                            {badge.icon && <badge.icon style={{ verticalAlign: 'middle', marginRight: '4px' }} size={14} />}
                            {badge.text}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </Carousel.Slide>
              ))}
            </Carousel>
          </CarouselContainer>
        </DarkBackgroundSection>

        <SectionDivider />

        {/* Single, centered CTA bar */}
        <SectionWrapper>
          <StyledGenericSection>
            <SectionTitle>Ready to elevate your engineering strategy?</SectionTitle>
            <SectionBodyText style={{ textAlign: 'center', color: '#e2e8f0' }}>
              Whether you&apos;re looking to transform your development processes
              {isDesktop && <br />} {/* Add break only on desktop */}
              {` `}or build an AI-native roadmap, let&apos;s connect.
            </SectionBodyText>
            <ButtonGroup>
              <CTALink
                href="/contact"
                label="Let&apos;s Connect"
                iconType="mail"
                variant="primary"
              />
            </ButtonGroup>
          </StyledGenericSection>
        </SectionWrapper>
      </HomeContainer>
    </>
  );
};

export default Home; 