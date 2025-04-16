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
import { CTALink } from './components/CTALink';
import { Card } from './components/Card';
import { formatTechList } from './Home.utils';
import {
  Badge,
  ButtonGroup,
  CTADescription,
  FadeInSection,
  FrameworksGrid,
  Highlight,
  HighlightBox,
  HomePageContainer,
  HeroSection,
  PersonaNav,
  ProjectsGrid,
  SectionBodyText,
  SectionDivider,
  SectionTitle,
  SectionWrapper,
  StickyFooter,
  StyledGenericSection,
  ViewAllContainer
} from './Home.styles';

export const Home = () => {
  const { 
    heroProps, 
    personaNavData, 
    metaData,
    hasScrolled
  } = useHomeData();
  
  // Use hasScrolled state for sticky CTA visibility
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  // Update sticky CTA based on scroll state
  useEffect(() => {
    setShowStickyCTA(hasScrolled);
  }, [hasScrolled]);

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
    
      <HomePageContainer>
        {/* Hero Section with Cylindrical Glow */}
        <HeroSection className="with-glow">
          <div className="cylinder-backdrop" />
          <div className="hero-content fade-in-element">
            <Hero {...heroProps} />
          </div>
        </HeroSection>
        
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
        
        {/* Frameworks in Action Section */}
        <StyledGenericSection>
          <SectionHeading icon="🧩" title="Frameworks in Action" />
          <SectionBodyText>These whitepapers distill how I guide engineering orgs through <Highlight>complexity and AI disruption</Highlight>.</SectionBodyText>
          <FrameworksGrid>
            <Card 
              variant="framework"
              icon="📄"
              title="AI Transformation"
              description="How to orchestrate dev teams in the age of agents"
              action={<CTALink 
                href="/frameworks/ai-transformation" 
                label="Read Framework"
                iconType="file-text"
                variant="primary"
              />}
            />
            <Card 
              variant="framework"
              icon="⚙️"
              title="React Best Practices"
              description="How I clean up and future-proof maturing codebases"
              action={<CTALink 
                href="/frameworks/react-best-practices" 
                label="Read Framework"
                iconType="file-text"
                variant="primary"
              />}
            />
          </FrameworksGrid>
          <ViewAllContainer>
            <CTALink 
              href="/frameworks" 
              label="View All Frameworks 📚"
              iconType="list"
              variant="text"
            />
          </ViewAllContainer>
        </StyledGenericSection>
        
        <SectionDivider />
        
        {/* Live Proof Projects Section */}
        <StyledGenericSection>
          <SectionHeading icon="🚀" title="Live Proof: Projects in Action" />
          <SectionBodyText>A selection of systems I&apos;ve built—each demonstrating <Highlight>AI-native, full-stack engineering</Highlight> in the wild.</SectionBodyText>
          <ProjectsGrid>
            <Card 
              variant="project"
              icon="🧠"
              title="ai-context-generator"
              description="VSCode extension that uses GPT to write instant, navigable summaries for directories and codebases."
              action={<CTALink 
                href="/projects/ai-context-generator" 
                label="View Project"
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
              description="A toolkit for designing, testing, and deploying prompt chains and agent workflows."
              action={<CTALink 
                href="/projects/prompt-forge" 
                label="View Project"
                iconType="external-link"
                variant="primary"
                size="sm"
              />}
            >
              <div style={{ marginBottom: 12 }}>
                <Badge bg="#e0e7ff" color="#3730a3">🛠️ PromptOps</Badge>
                <Badge bg="#fef9c3" color="#92400e">🧩 Modular</Badge>
              </div>
            </Card>
          </ProjectsGrid>
          <ViewAllContainer>
            <CTALink 
              href="/projects" 
              label="View All Projects 🔍"
              iconType="list"
              variant="text"
            />
          </ViewAllContainer>
        </StyledGenericSection>
        
        <SectionDivider />
        
        {/* Full-Stack Business Person Section */}
        <FSBPSection />
        
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
                href="/biography" 
                label="Read Biography"
                iconType="user"
                variant="secondary"
              />
              <CTALink 
                href="/experience" 
                label="View Experience"
                iconType="code"
                variant="secondary"
              />
              <CTALink 
                href="https://www.linkedin.com/in/davidmieloch/?msgControlName=message" 
                label="Let&apos;s Connect"
                iconType="mail"
                variant="primary"
              />
            </ButtonGroup>
          </StyledGenericSection>
        </SectionWrapper>
        
        {/* Sticky Footer CTA */}
        <StickyFooter visible={showStickyCTA}>
          <div>Ready to level up your org with <Highlight>AI-native engineering</Highlight>?</div>
          <CTALink 
            href="https://www.linkedin.com/in/davidmieloch/?msgControlName=message" 
            label="Let&apos;s Talk ✉️"
            iconType="mail"
            variant="primary"
          />
        </StickyFooter>
      </HomePageContainer>
    </>
  );
};

export default Home; 