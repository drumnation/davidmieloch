'use client';

import '@mantine/carousel/styles.css';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Hero } from '@shared-components/organisms/Hero/Hero';
import { PersonaNavItem } from './Home.types';
import { useHomeData } from './Home.hook';
import { FSBPSection } from './components/ContentSection/ContentSection';
import { SectionHeading } from './components/SectionHeading';
import { PersonaCard } from './components/PersonaCard/PersonaCard';
import CTALink from './components/CTALink';
import { Card } from './components/Card';
import { TechIcon } from '../../atoms/TechIcon';
import { formatTechList } from './Home.utils';
import { BlueTintGenericSection } from './Home.styles.ts';
// Import all styles from our combined file
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
} from './Home.styles.combined';
import { Title, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { 
  aiContextGenerator, 
  promptForge, 
  carouselProjects 
} from '@data/projects';
import { theme } from './Home.styles.ts'; // Import theme

export const Home = () => {
  const { 
    heroProps, 
    personaNavData, 
    metaData,
  } = useHomeData();
  
  // Technologies list for footer section
  const technologies = ['✨ Built with AI', '🧠 React', '📊 Content Strategy'];
  const techListFormatted = formatTechList(technologies);

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
            <Hero {...heroProps} />
          </div>
        </HeroSection>
        
        {/* Curve Overlay */}
        <CurveOverlay />
        
        {/* Full-Stack Business Person Concept Block */}
        <StyledGenericSection id="fsbp-concept">
          <SectionHeading icon="💡" title="Fule`l-Stack Business Person Model" />
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
            🧠 This site exists to show what that looks like in practice.
          </SectionBodyText>
        </StyledGenericSection>
        
        {/* Why I Stand Out Section */}
        <StandOutSection>
          <StandOutTitle>Why I Stand Out</StandOutTitle>
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
          {personaNavData.map((persona: PersonaNavItem, index: number) => (
            <PersonaCard 
              key={index}
              icon={persona.icon}
              title={persona.title} 
              description={persona.description}
              link={persona.link}
            />
          ))}
        </PersonaNav>
        
        {/* Why This Site Exists Section */}
        <StyledGenericSection>
          <SectionHeading icon="💡" title="Why This Site Exists" />
          <SectionBodyText>
            This isn&apos;t just a portfolio—it&apos;s a live demonstration of the Full-Stack Business Person (FSBP) principle in action. Every aspect of this site, from design to copy to automation, was built solo and amplified by AI tools I architected or wrote myself.
          </SectionBodyText>
          <SectionBodyText>
            <strong>Why?</strong> To prove that a single, <Highlight>AI-native developer</Highlight> can deliver the velocity, quality, and narrative clarity that modern teams need. This site is both my product and my proof: a working example of how engineering, business, and digital marketing can converge in one adaptive, agent-augmented workflow.
          </SectionBodyText>
          <div style={{ marginTop: '1.5rem', fontSize: '0.95em', color: '#e2e8f0', textAlign: 'center' }}
            dangerouslySetInnerHTML={{ __html: techListFormatted }}
          />
        </StyledGenericSection>
        
        <SectionDivider />
        
        {/* Full-Stack Business Person Section - Moved up earlier in the page */}
        <FSBPSection />
        
        <SectionDivider />
        
        {/* Frameworks in Action Section - Updated with refined content and links */}
        <BlueTintGenericSection id="frameworks">
          <SectionHeaderContainer>
            <SectionHeaderIcon>🧩</SectionHeaderIcon>
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
        
        {/* Live Proof Projects Section - Use StyledGenericSection */}
        <StyledGenericSection id="projects">
          {/* Headline and Intro */}
          <Title order={2} ta="center">🚀 Live Proof Projects in Action</Title>
          <Text c="dimmed" ta="center" mb="xl">
            These tools reflect how I build and scale AI-native workflows — from installable dev tools to internal orchestration systems.
          </Text>
          
          {/* Static Tools Row (High-Signal / Actionable Projects) */}
          <Text tt="uppercase" size="sm" fw={700} c="dimmed" mb="xs">Installable Tools</Text>
          <FrameworksGrid>
            {/* Card for aiContextGenerator */}
            <Card 
              variant="project"
              iconBackgroundColor={aiContextGenerator.iconBackgroundColor}
              icon={
                aiContextGenerator.icon === 'ai-context-generator' ? 
                <Image src="https://drumnation.gallerycdn.vsassets.io/extensions/drumnation/ai-context-generator/0.0.10/1721423097801/Microsoft.VisualStudio.Services.Icons.Default" alt="AI Context Generator Logo" width={40} height={40} /> : 
                <Text>{aiContextGenerator.icon}</Text>
              }
              title={aiContextGenerator.name}
              description={aiContextGenerator.description}
              action={<CTALink 
                href={aiContextGenerator.link || '#'}
                label={aiContextGenerator.status === 'live' ? "View on VS Marketplace" : "Learn More"}
                // Potentially add specific iconNode for marketplace/github again if needed
                iconNode={aiContextGenerator.link?.includes('marketplace') ? <Image src="/vscode-marketplace-logo.png" alt="VS Code Marketplace Logo" width={20} height={20} /> : undefined}
                variant="primary"
                size="sm"
              />}
            >
              {aiContextGenerator.badges && (
                <div style={{ marginBottom: 12 }}>
                  {aiContextGenerator.badges.map(badge => (
                    <Badge key={badge.text} bg={badge.bg} color={badge.color || theme.text.primary}>{badge.text}</Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* Card for promptForge */}
            <Card 
              variant="project"
              iconBackgroundColor={promptForge.iconBackgroundColor}
              icon={
                promptForge.icon === 'prompt-forge' ? 
                <Image src="/media/prompt-forge-logo.png" alt="Prompt Forge Logo" width={60} height={60} style={{ objectFit: 'contain' }}/> : 
                <Text>{promptForge.icon}</Text>
              }
              title={promptForge.name}
              description={promptForge.description}
              action={<CTALink 
                href={promptForge.link || '#'}
                label={promptForge.status === 'live' ? "View on GitHub" : "Learn More"}
                iconNode={promptForge.link?.includes('github') ? <Image src="/github-logo.svg" alt="GitHub Logo" width={20} height={20} /> : undefined}
                variant="primary"
                size="sm"
              />}
            >
              {promptForge.badges && (
                <div style={{ marginBottom: 12 }}>
                  {promptForge.badges.map(badge => (
                    <Badge key={badge.text} bg={badge.bg} color={badge.color || theme.text.primary}>{badge.text}</Badge>
                  ))}
                </div>
              )}
            </Card>
          </FrameworksGrid>

          {/* Carousel Row (Modular / Internal / Power-User Tools) */}
          <Text tt="uppercase" size="sm" fw={700} c="dimmed" mb="xs">Internal & Ecosystem Tools</Text>
          <Carousel
            slideSize={{ base: '100%', sm: '50%' }}
            slideGap="md"
            loop
            withIndicators
            styles={{
              slide: {
                height: '100%',
              },
              container: {
                display: 'flex',
                flexDirection: 'row',
              },
              root: {
                overflow: 'hidden',
              },
            }}
          >
            {carouselProjects.map((project) => (
              <Carousel.Slide key={project.name}>
                <Card 
                  variant="project"
                  iconBackgroundColor={project.iconBackgroundColor}
                  style={{ height: '400px' }}
                  icon={
                    project.icon === 'brain-garden' ? 
                    <Image 
                      src="/media/misc/brain-garden.png" 
                      alt="Brain Garden Logo" 
                      width={60}
                      height={60}
                      style={{ borderRadius: '8px' }}
                    /> : 
                    <Text>{project.icon}</Text>
                  }
                  title={project.name}
                  description={project.description}
                  action={<CTALink 
                    href={project.link || '#'}
                    label={project.status === 'coming soon' ? "Coming Soon" : "Learn More"}
                    variant={project.status === 'coming soon' ? "secondary" : "primary"}
                    size="sm"
                  />}
                >
                  {project.badges && (
                    <div style={{ marginBottom: 12 }}>
                      {project.badges.map(badge => (
                        <Badge key={badge.text} bg={badge.bg} color={badge.color || theme.text.primary}>{badge.text}</Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </Carousel.Slide>
            ))}
          </Carousel>
        </StyledGenericSection>
        
        <SectionDivider />
        
        {/* Single, centered CTA bar */}
        <SectionWrapper>
          <StyledGenericSection>
            <SectionTitle>Ready to elevate your engineering strategy?</SectionTitle>
            <SectionBodyText style={{ textAlign: 'center', color: '#e2e8f0' }}>
              Whether you&apos;re looking to transform your development processes or build an AI-native roadmap, let&apos;s connect.
            </SectionBodyText>
            <ButtonGroup>
              <CTALink 
                href="https://www.linkedin.com/in/davidmieloch/?msgControlName=message" 
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