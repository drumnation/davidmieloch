'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Hero } from '../../organisms/Hero/Hero';
import { PersonaNavItem } from './Home.types';
import { useHomeData } from './Home.hook';
import { FSBPSection } from './components/ContentSection/ContentSection';
import { GenericSection } from './components/ContentSection';
import { SectionHeading } from './components/SectionHeading';
import { PersonaCard } from './components/PersonaCard/PersonaCard';
import CTALink from './components/CTALink';
import { Card } from './components/Card';
import { TechIcon } from '../../atoms/TechIcon';
import { formatTechList } from './Home.utils';
// Import all styles from our combined file
import {
  Badge,
  ButtonGroup,
  CTADescription,
  ContentContainer,
  FadeInSection,
  FrameworksGrid,
  FullWidthBackgroundWrapper, // From Home.styles.tsx
  Highlight,
  HighlightBox,
  HomeContainer, // From Home.styles.tsx
  HomePageContainer, // From Home.styles.ts
  HeroSection,
  PersonaNav,
  ProjectsGrid,
  SectionBodyText,
  SectionDivider,
  SectionTitle,
  SectionWrapper,
  StandOutSection,
  StandOutTitle,
  StandOutList,
  StandOutItem,
  StyledGenericSection,
  ViewAllContainer
} from './Home.styles.combined';

export const Home = () => {
  const { 
    heroProps, 
    personaNavData, 
    metaData,
    hasScrolled
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
        
        {/* Full-Stack Business Person Concept Block */}
        <StyledGenericSection id="fsbp-concept">
          <SectionHeading icon="💡" title="The Full-Stack Business Person Model" />
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
        <StyledGenericSection id="frameworks">
          <SectionHeading icon="🧩" title="Frameworks in Action" />
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
        </StyledGenericSection>
        
        <SectionDivider />
        
        {/* Live Proof Projects Section - Moved to the end of the content */}
        <StyledGenericSection id="projects">
          <SectionHeading icon="🚀" title="Live Proof Projects in Action" />
          <SectionBodyText>These systems reflect how I design and ship AI-native workflows—modular, developer-focused, and built for real-world use.</SectionBodyText>
          <ProjectsGrid>
            <Card 
              variant="project"
              icon="🧠"
              title="ai-context-generator"
              description="VS Code extension that generates smart summaries for codebases using GPT."
              action={<CTALink 
                href="https://marketplace.visualstudio.com/items?itemName=drumnation.ai-context-generator" 
                label="View on VS Marketplace"
                iconType="external-link"
                variant="primary"
                size="sm"
              />}
            >
              <div style={{ marginBottom: 12 }}>
                <Badge bg="#e0e7ff" color="#3730a3">🧠 AI</Badge>
                <Badge bg="#fef9c3" color="#92400e">⚡️ DevX</Badge>
              </div>
            </Card>
            <Card 
              variant="project"
              icon="🛠️"
              title="prompt-forge"
              description="Modular prompt and template engine for chaining GPT workflows and tooling."
              action={<CTALink 
                href="https://github.com/dmieloch/prompt-forge" 
                label="View on GitHub"
                iconType="external-link"
                variant="primary"
                size="sm"
              />}
            >
              <div style={{ marginBottom: 12 }}>
                <Badge bg="#e0e7ff" color="#3730a3">🧩 PromptOps</Badge>
                <Badge bg="#fef9c3" color="#92400e">⚙️ Templates</Badge>
              </div>
            </Card>
            <Card 
              variant="project"
              icon="🌱"
              title="Brain Garden"
              description="An internal OS for managing rules, prompts, skill-jacks, and context for AI projects."
              action={<CTALink 
                href="#" 
                label="Coming Soon"
                iconType="external-link"
                variant="primary"
                size="sm"
              />}
            >
              <div style={{ marginBottom: 12 }}>
                <Badge bg="#e0e7ff" color="#3730a3">🧠 Orchestration</Badge>
                <Badge bg="#fef9c3" color="#92400e">🛠️ Agent Infra</Badge>
              </div>
            </Card>
          </ProjectsGrid>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <CTALink 
              href="/experience" 
              label="See more Projects"
              iconType="external-link"
              variant="secondary"
              size="sm"
            />
          </div>
        </StyledGenericSection>
        
        <SectionDivider />
        
        {/* Single, centered CTA bar */}
        <SectionWrapper>
          <StyledGenericSection>
            <SectionTitle>Ready to elevate your engineering strategy?</SectionTitle>
            <SectionBodyText style={{ textAlign: 'center' }}>
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