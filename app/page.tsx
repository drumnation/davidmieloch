'use client';

import React from 'react';
import { Hero } from '../src/shared-components/organisms/Hero';
import { FeatureGrid } from '../src/shared-components/organisms/FeatureGrid';
import { Typography } from '../src/shared-components/atoms/Typography';
import { Button } from '../src/shared-components/atoms/Button';
import styled from 'styled-components';

// Styled components for the home page
const HomePageContainer = styled.div`
  width: 100%;
`;

const SectionContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const FeatureSection = styled.div`
  background-color: #f5f7fa;
  padding: 4rem 0;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #4361ee, #3f37c9);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const ContentSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export default function HomePage() {
  // Hero section props
  const heroProps = {
    title: "David Mieloch",
    subtitle: "Full-Stack Business Person / Lean Tech Leader",
    description: "Bridging AI, Engineering, and Business Growth with deep technical expertise and broad business acumen to drive efficiency and results in lean, dynamic environments.",
    background: 'gradient' as const,
    gradientColors: ['#4361ee', '#3f37c9'],
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    cta: {
      primary: {
        text: 'Explore AI Transformation',
        link: '/enterprise-ai-development-framework'
      },
      secondary: {
        text: 'React Best Practices',
        link: '/fullstack-react-best-practices-integration'
      }
    }
  };

  // Feature grid props
  const featuresData = [
    {
      title: 'Technical Expertise',
      description: 'Deep knowledge of React, Node.js, and modern web development practices.',
      icon: '💻'
    },
    {
      title: 'AI Strategy',
      description: 'Implementing effective AI strategies for lean, high-performing teams.',
      icon: '🤖'
    },
    {
      title: 'Business Acumen',
      description: 'Bridging the gap between technology execution and business outcomes.',
      icon: '📊'
    },
    {
      title: 'Team Transformation',
      description: 'Building and optimizing development teams for maximum efficiency.',
      icon: '👥'
    }
  ];

  return (
    <HomePageContainer>
      {/* Hero Section */}
      <Hero {...heroProps} />
      
      {/* Skills & Expertise Section */}
      <SectionContainer>
        <SectionTitle>
          <Typography variant="h2" color="primary">Skills & Expertise</Typography>
          <Typography variant="body" color="secondary">
            A unique combination of technical depth and business breadth
          </Typography>
        </SectionTitle>
        
        <FeatureGrid 
          features={featuresData}
          columns={4}
        />
      </SectionContainer>
      
      {/* Featured Projects Section */}
      <FeatureSection>
        <SectionContainer>
          <SectionTitle>
            <Typography variant="h2" color="primary">Featured Projects</Typography>
            <Typography variant="body" color="secondary">
              Solutions that demonstrate both technical expertise and business impact
            </Typography>
          </SectionTitle>
          
          <ContentSection>
            <Typography variant="body">
              Explore my portfolio of work showcasing a range of projects that bridge technical implementation
              with strategic business objectives. Each project includes problem context, approach, and measurable outcomes.
            </Typography>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button 
                variant="primary"
                href="/code-examples"
              >
                View All Projects
              </Button>
            </div>
          </ContentSection>
        </SectionContainer>
      </FeatureSection>
      
      {/* Call to Action Section */}
      <CTASection>
        <SectionContainer>
          <Typography variant="h2" color="light">Ready to Learn More?</Typography>
          <Typography variant="body" color="light" mb="2rem">
            Discover how I can help transform your organization with strategic technology implementation.
          </Typography>
          
          <Button 
            variant="primary"
            href="/bio"
            style={{ marginRight: '1rem' }}
          >
            About Me
          </Button>
          
          <Button 
            variant="ghost"
            href="/enterprise-ai-development-framework"
          >
            AI Development Framework
          </Button>
        </SectionContainer>
      </CTASection>
    </HomePageContainer>
  );
} 