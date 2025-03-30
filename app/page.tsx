'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Hero } from '../src/shared-components/organisms/Hero';
import { FeatureGrid } from '../src/shared-components/organisms/FeatureGrid';
import { Typography } from '../src/shared-components/atoms/Typography';
import { Button } from '../src/shared-components/atoms/Button';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import './home.css';

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

const InsightsSection = styled.div`
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

const ProjectCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ArticleCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ArticleImageContainer = styled.div`
  position: relative;
  height: 160px;
  background-color: #e9ecef;
`;

const ArticleContent = styled.div`
  padding: 1.5rem;
`;

const ArticleTitle = styled.h3`
  margin-top: 0;
  font-size: 1.25rem;
  color: #343a40;
`;

const ArticleDescription = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
`;

const PersonaNav = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 3rem auto;
  max-width: 800px;
`;

const PersonaCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 180px;
  height: 160px;
  justify-content: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const PersonaIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PersonaTitle = styled.h4`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #343a40;
  text-align: center;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PersonaDescription = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  text-align: center;
  margin: 0;
`;

export default function HomePage() {
  // Performance optimization for image loading
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { href: '/web-app-manifest-192x192.png', as: 'image' },
      { href: '/images/ai-future.jpg', as: 'image' }
    ];
    
    preloadLinks.forEach(link => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = link.href;
      preloadLink.as = link.as;
      document.head.appendChild(preloadLink);
    });
  }, []);

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
        text: 'Explore the FSBP Concept',
        link: '/#fsbp'
      },
      secondary: {
        text: 'View My Experience',
        link: '/bio'
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

  // Project data
  const projectsData = [
    {
      title: 'Enterprise AI Development Framework',
      description: 'A comprehensive framework for implementing AI in enterprise development teams, focusing on practical integration and team upskilling.',
      impact: 'Reduced development time by 35% while maintaining code quality',
      techStack: 'React, Node.js, AI Tooling',
      link: '/enterprise-ai-development-framework'
    },
    {
      title: 'React Best Practices Integration',
      description: 'A guide to implementing modern React best practices in enterprise applications, with practical examples and performance optimization techniques.',
      impact: 'Improved application performance by 40%',
      techStack: 'React, TypeScript, Next.js',
      link: '/fullstack-react-best-practices-integration'
    },
    {
      title: 'Team Transformation Case Study',
      description: 'How I helped transform a traditional development team into a lean, AI-augmented powerhouse through strategic training and process optimization.',
      impact: 'Increased team velocity by 60%',
      techStack: 'Process Design, AI Integration, Team Management',
      link: '/code-examples'
    }
  ];

  // Insights/blog data
  const insightsData = [
    {
      title: 'The Future of AI in Development Teams',
      description: 'How AI tools are reshaping the landscape of software development and what leaders need to know.',
      image: '/images/ai-future.jpg',
      link: '/enterprise-ai-development-framework'
    },
    {
      title: 'Bridging Technical and Business Perspectives',
      description: 'Strategies for technical leaders to communicate effectively with business stakeholders.',
      image: '/images/bridge-perspectives.jpg',
      link: '/bio'
    },
    {
      title: 'The Full-Stack Business Person',
      description: 'Why the future belongs to multi-skilled professionals who leverage AI to perform roles previously done by specialists.',
      image: '/images/lean-teams.jpg',
      link: '/#fsbp'
    }
  ];

  // Persona-targeted navigation
  const personaNavData = [
    {
      title: 'For CEOs',
      icon: '👑',
      description: 'Business impact & ROI',
      link: '/enterprise-ai-development-framework?persona=ceo'
    },
    {
      title: 'For CTOs',
      icon: '🔧',
      description: 'Technical vision & scalability',
      link: '/enterprise-ai-development-framework?persona=cto'
    },
    {
      title: 'For Engineering Managers',
      icon: '👨‍💻',
      description: 'Team practices & mentorship',
      link: '/fullstack-react-best-practices-integration?persona=em'
    },
    {
      title: 'For Recruiters',
      icon: '🔎',
      description: 'Skills & experience overview',
      link: '/bio?persona=recruiter'
    }
  ];

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The Full-Stack Business Person: A strategic technologist bridging AI, engineering, and business growth with deep technical expertise and broad business acumen." />
        <meta name="keywords" content="Full-Stack Business Person, Lean Tech Leader, AI Strategy, React, Node.js, Team Transformation" />
        <meta property="og:title" content="David Mieloch - Full-Stack Business Person / Lean Tech Leader" />
        <meta property="og:description" content="The Full-Stack Business Person: A strategic technologist bridging AI, engineering, and business growth with deep technical expertise and broad business acumen." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/web-app-manifest-192x192.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="David Mieloch - Full-Stack Business Person / Lean Tech Leader" />
        <meta name="twitter:description" content="The Full-Stack Business Person: A strategic technologist bridging AI, engineering, and business growth with deep technical expertise and broad business acumen." />
      </Head>
    
      <HomePageContainer>
        {/* Hero Section */}
        <div className="hero-section">
          <Hero {...heroProps} />
        </div>
        
        {/* Persona-Targeted Navigation */}
        <PersonaNav className="persona-nav">
          {personaNavData.map((persona, index) => (
            <Link href={persona.link} key={index} style={{ textDecoration: 'none' }}>
              <PersonaCard className="persona-card">
                <PersonaIcon>{persona.icon}</PersonaIcon>
                <PersonaTitle>{persona.title}</PersonaTitle>
                <PersonaDescription className="persona-description">{persona.description}</PersonaDescription>
              </PersonaCard>
            </Link>
          ))}
        </PersonaNav>
        
        {/* Full-Stack Business Person Whitepaper Section */}
        <div id="fsbp" className="fsbp-section">
          <div className="fsbp-header">
            <Typography variant="h2" color="primary">The Full-Stack Business Person</Typography>
            <div style={{ maxWidth: '700px', margin: '1rem auto' }}>
              <Typography variant="body" color="secondary">
                Why the future belongs to multi-skilled professionals who leverage AI to perform roles previously done by specialists
              </Typography>
            </div>
          </div>
          
          <div className="fsbp-content">
            <Typography variant="body" mb="1.5rem">
              As AI transforms the workplace, the future belongs to professionals who can span multiple domains.
              We're already witnessing the dawn of hyper-efficient organizations – AI-native companies achieving unprecedented results with remarkably small teams.
              The Full-Stack Business Person is someone who combines deep technical expertise with broad business 
              acumen, leveraging AI to perform roles that previously required several specialists.
            </Typography>
            
            <Typography variant="h3" color="primary" mb="1rem">The New Paradigm of Work</Typography>
            
            <Typography variant="body" mb="1.5rem">
              In this new paradigm, developers make product design decisions, contribute marketing copy, 
              and understand sales strategies. Engineers develop business plans, marketing specialists write code,
              and everyone uses AI to fill their knowledge gaps and automate routine tasks.
              Crucially, AI's power is unlocked not just by technical skill, but by <em>asking the right questions</em>. An FSBP possesses the broad <strong>conceptual vocabulary</strong> spanning technology, product, marketing, and sales, allowing them to direct AI agents effectively across diverse tasks far beyond what a narrow specialist could achieve. <strong>This isn't just theory.</strong> We see companies like <strong>Midjourney (AI art) reaching $200M+ revenue with ~40 people, and Cursor (AI IDE) hitting ~$100M ARR with only ~20.</strong> That's roughly <strong>$5 million in revenue per employee</strong> – orders of magnitude higher than the ~$125k median for SaaS startups. They achieve this through mass automation and leveraging AI infrastructure – capabilities best directed by those with holistic understanding.
            </Typography>
            
            <Typography variant="body" mb="1.5rem">
              These examples demonstrate the raw power of <strong>lean, hyper-efficient organizations</strong> that can indeed outpace traditional structures. AI augmentation allows small teams to achieve what previously required armies. But these high-velocity teams don't run on AI alone. They <em>require</em> individuals who can bridge the gap – <strong>Full-Stack Business People</strong> who can wear multiple hats, operate effectively across domains, direct AI strategically, design scalable systems, and make the critical decisions needed to harness this new power. They are the architects and navigators of these lean organizations where communication overhead plummets and iteration speed accelerates.
            </Typography>
            
            <Typography variant="body" mb="1.5rem">
              Furthermore, in these lean, AI-driven environments, strategic decisions carry immense weight. FSBPs understand the full value chain – how technology serves product, how marketing informs development, how sales connects to strategy. They make better architectural, product, and go-to-market decisions because they see the bigger picture, ensuring scarce resources are deployed for maximum impact – a necessity when a small team aims for massive scale.
            </Typography>
            
            <Typography variant="h3" color="primary" mb="1rem">Key Characteristics of a Full-Stack Business Person</Typography>
            
            <Typography variant="body" mb="0.5rem">
              A true Full-Stack Business Person exhibits several key characteristics:
            </Typography>
            
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Typography variant="body">
                  <strong>Technical Depth:</strong> Expertise in at least one technical domain (programming, design, marketing)
                </Typography>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Typography variant="body">
                  <strong>Business Breadth:</strong> Understanding of various business functions and how they interrelate
                </Typography>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Typography variant="body">
                  <strong>AI Integration:</strong> Ability to leverage AI tools to extend capabilities beyond personal expertise
                </Typography>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Typography variant="body">
                  <strong>Systems Thinking:</strong> Capacity to see how changes in one area affect the broader organization
                </Typography>
              </li>
              <li>
                <Typography variant="body">
                  <strong>Adaptability:</strong> Willingness to continuously learn and evolve with changing technology
                </Typography>
              </li>
            </ul>
            
            <Typography variant="h3" color="primary" mb="1rem">The FSBP in Action: Practical Applications</Typography>
            
            <Typography variant="body" mb="1.5rem">
              My work embodies this philosophy across several domains:
            </Typography>
            
            <Typography variant="body" mb="1.5rem">
              <strong>Enterprise AI Development Framework:</strong> I've developed an approach that helps traditional 
              development teams transform into AI-augmented powerhouses. This framework addresses both the technical 
              implementation of AI tools and the business process changes needed to fully capitalize on AI's potential.
            </Typography>
            
            <Typography variant="body" mb="1.5rem">
              <strong>React Best Practices:</strong> Beyond just technical implementation, my approach to React 
              development integrates business concerns like maintainability, scalability, and development velocity. 
              This ensures that technical decisions support broader business goals.
            </Typography>
            
            <Typography variant="body" mb="2rem">
              <strong>Team Transformation:</strong> I help organizations build and optimize development teams for the 
              AI era, focusing on creating versatile professionals who can bridge traditional role boundaries and 
              leverage AI to extend their capabilities.
            </Typography>
            
            <Typography variant="h3" color="primary" mb="1rem">The Path Forward</Typography>
            
            <Typography variant="body" mb="1.5rem">
              As AI continues to transform how we work, the most valuable professionals will be those who can 
              leverage these tools to operate across traditional boundaries. Organizations that embrace the Full-Stack 
              Business Person model will gain significant advantages in agility, efficiency, and innovation.
              The emergence of hyper-efficient, high-revenue, small-team companies isn't an anomaly; it's a glimpse into the future.
            </Typography>
            
            <Typography variant="body" mb="1.5rem">
              This portfolio itself exemplifies the FSBP principle – strategically designed, marketed, and 
              coded to deliver a specific message to different target audiences, demonstrating how technical depth and business breadth 
              combine to create exceptional outcomes in the AI-assisted future.
            </Typography>
          </div>
          
          <div className="fsbp-cta-container">
            <div className="cta-section">
              <Typography variant="h3" color="primary" mb="1rem">Core Frameworks</Typography>
              <Button 
                variant="primary"
                href="/enterprise-ai-development-framework"
              >
                Explore the Enterprise AI Transformation Framework
              </Button>
              
              <Button 
                variant="primary"
                href="/fullstack-react-best-practices-integration"
              >
                Discover Strategic React Best Practices
              </Button>
            </div>
            
            <div className="cta-section">
              <Typography variant="h3" color="primary" mb="1rem">Background & Impact</Typography>
              <Button 
                variant="primary"
                href="/experience"
              >
                View My Rich Media Experience
              </Button>
              
              <Button 
                variant="primary"
                href="/bio"
              >
                My Story (Bio)
              </Button>
              
              <Button 
                variant="primary"
                href="/code-examples"
              >
                Explore Code Examples
              </Button>
            </div>
            
            <div className="cta-section">
              <Typography variant="h3" color="primary" mb="1rem">Connect</Typography>
              <Button 
                variant="ghost"
                href="/bio#contact"
              >
                Contact Me
              </Button>
              
              <Button 
                variant="ghost"
                href="https://calendly.com/davidmieloch"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </HomePageContainer>
    </>
  );
} 