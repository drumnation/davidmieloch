'use client';

import React, { useEffect } from 'react';
import { Hero } from '../src/shared-components/organisms/Hero';
import { Typography } from '../src/shared-components/atoms/Typography';
import { Button } from '../src/shared-components/atoms/Button';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import './home.css';
import testClarityFeatures from '../src/utils/analytics-test';
import PerfectFitAnalyzer from '../src/components/PerfectFitAnalyzer';

// Styled components for the home page
const HomePageContainer = styled.div`
  width: 100%;
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

    // Test Clarity analytics in development
    if (process.env.NODE_ENV === 'development') {
      testClarityFeatures();
    }
  }, []);

  // Hero section props
  const heroProps = {
    title: "David Mieloch",
    subtitle: "Full-Stack Business Person / Lean Tech Leader",
    description: "Bridging AI, Engineering, and Business Growth with deep technical expertise and broad business acumen to drive efficiency and results in lean, dynamic environments.",
    background: "image" as const,
    backgroundImage: "/connected-dots.jpg",
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    cta: {
      primary: {
        text: 'Explore the FSBP Concept',
        link: '/#fsbp'
      },
      secondary: {
        text: 'View My Experience',
        link: '/experience'
      }
    }
  };

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
        <div className="hero-section fade-in-element">
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
            <Typography variant="h2" color="primary" as="h1" className="fsbp-title">The Full-Stack Business Person</Typography>
            <div className="fsbp-subheadline">
              <Typography variant="body" color="secondary">
                Why the future belongs to multi-skilled professionals who leverage AI to perform roles previously done by specialists
              </Typography>
            </div>
            <span className="fsbp-header-separator"></span>
          </div>
          
          <div className="fsbp-content">
            <div className="fsbp-intro">
              <Typography variant="body" mb="1.5rem" className="fsbp-text">
                We&apos;re already witnessing the dawn of <span className="fsbp-emphasis">hyper-efficient organizations</span> – AI-native companies achieving <span className="fsbp-emphasis">unprecedented results with remarkably small teams</span>.
                The <span className="fsbp-key-term">Full-Stack Business Person</span> is someone who combines deep technical expertise with broad business 
                acumen, leveraging AI to perform roles that previously required several specialists.
              </Typography>
            </div>
            
            <Typography variant="h3" color="primary" mb="1rem" className="fsbp-section-heading">The New Paradigm of Work</Typography>
            
            <div className="paradigm-section">
              <div className="paradigm-paragraph">
                <h4 className="paradigm-subheading">
                  <svg className="paradigm-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"></path>
                  </svg>
                  AI Leverage & Market Proof
                </h4>
                <Typography variant="body" mb="1.5rem" className="fsbp-text">
                  Crucially, AI&apos;s power is unlocked not just by technical skill, but by <em>asking the right questions</em>. An FSBP possesses the broad <strong>conceptual vocabulary</strong> spanning technology, product, marketing, and sales, allowing them to direct AI agents effectively across diverse tasks far beyond what a narrow specialist could achieve. <strong>This isn&apos;t just theory.</strong> We see companies like <span className="company-highlight">Midjourney (AI art)</span> reaching $200M+ revenue with ~40 people, and <span className="company-highlight">Cursor (AI IDE)</span> hitting ~$100M ARR with only ~20. That&apos;s roughly <span className="data-highlight">$5 million in revenue per employee</span> – orders of magnitude higher than the <span className="data-highlight">~$125k median for SaaS startups</span>. They achieve this through mass automation and leveraging AI infrastructure – capabilities best directed by those with holistic understanding.
                </Typography>
              </div>
              
              {/* Simple pull quote matching the screenshot */}
              <div className="pull-quote-container">
                <div className="pull-quote">
                  AI&apos;s power is unlocked not just by technical skill, but by asking the right questions.
                </div>
              </div>
              
              <div className="paradigm-paragraph">
                <h4 className="paradigm-subheading">
                  <svg className="paradigm-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  The Need for Lean Team Navigators
                </h4>
                <Typography variant="body" mb="1.5rem" className="fsbp-text">
                  This revolution is forming in real-time as AI tools enhance human capabilities at an unprecedented pace. It&apos;s not about replacing entire teams, but about rethinking the entire structure of organizations that use conventional, AI-free, human-only knowledge worker armies. But these high-velocity teams don&apos;t run on AI alone. They <em>require</em> individuals who can bridge the gap – <strong>Full-Stack Business People</strong> who can wear multiple hats, operate effectively across domains, direct AI strategically, design scalable systems, and make the critical decisions needed to harness this new power. They are the architects and navigators of these lean organizations where communication overhead plummets and iteration speed accelerates.
                </Typography>
              </div>
              
              <div className="paradigm-paragraph">
                <h4 className="paradigm-subheading">
                  <svg className="paradigm-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  Holistic Strategy & Value Creation
                </h4>
                <Typography variant="body" mb="1.5rem" className="fsbp-text">
                  Furthermore, in these lean, AI-driven environments, strategic decisions carry immense weight. FSBPs understand the full value chain – how technology serves product, how marketing informs development, how sales connects to strategy. They make better architectural, product, and go-to-market decisions because they see the bigger picture, ensuring scarce resources are deployed for maximum impact – a necessity when a small team aims for massive scale.
                </Typography>
              </div>
            </div>
            
            <Typography variant="h3" color="primary" mb="1rem" className="fsbp-section-heading">Key Characteristics of a Full-Stack Business Person</Typography>
            
            <Typography variant="body" mb="0.5rem" className="fsbp-text">
              A true Full-Stack Business Person exhibits several key characteristics:
            </Typography>
            
            <div className="fsbp-characteristic-grid">
              {/* Deep Technical Execution Mastery */}
              <div className="characteristic-card" tabIndex={0}>
                <div className="characteristic-icon-container">
                  <svg className="characteristic-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <div className="characteristic-title">Deep Technical Execution Mastery</div>
                <div className="characteristic-description">
                  Expert-level ability to architect, build, implement, and manipulate complex technological systems. This provides the core capability to translate cross-domain ideas into tangible realities and effectively direct AI in technical execution.
                </div>
              </div>
              
              {/* Applied Expertise in Multiple Domains */}
              <div className="characteristic-card" tabIndex={0}>
                <div className="characteristic-icon-container">
                  <svg className="characteristic-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="characteristic-title">Applied Expertise in Multiple Domains</div>
                <div className="characteristic-description">
                  Significant, practical depth and hands-on experience in several additional business or creative domains. This expertise must be sufficient to independently conceive strategies, solve domain-specific problems, and critically guide and evaluate AI within these areas.
                </div>
              </div>
              
              {/* Synergistic Innovation & Problem Solving */}
              <div className="characteristic-card" tabIndex={0}>
                <div className="characteristic-icon-container">
                  <svg className="characteristic-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </div>
                <div className="characteristic-title">Synergistic Innovation & Problem Solving</div>
                <div className="characteristic-description">
                  The unique ability to synthesize knowledge and opportunities across the primary technical domain and secondary expertise areas to identify non-obvious solutions, generate novel ideas, and create value propositions that bridge traditional boundaries.
                </div>
              </div>
              
              {/* Strategic AI Orchestration */}
              <div className="characteristic-card" tabIndex={0}>
                <div className="characteristic-icon-container">
                  <svg className="characteristic-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                  </svg>
                </div>
                <div className="characteristic-title">Strategic AI Orchestration</div>
                <div className="characteristic-description">
                  Mastery in strategically leveraging and directing AI tools and agents across the full spectrum of owned skills – using AI not just for isolated tasks, but to orchestrate complex, multi-domain workflows and amplify the impact of the entire synergistic skillset.
                </div>
              </div>
              
              {/* Integrative Systems Thinking */}
              <div className="characteristic-card" tabIndex={0}>
                <div className="characteristic-icon-container">
                  <svg className="characteristic-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <div className="characteristic-title">Integrative Systems Thinking</div>
                <div className="characteristic-description">
                  Perceives and analyzes challenges and opportunities holistically, understanding the interconnectedness of technical, business, market, and human systems. Designs solutions that account for these interdependencies and anticipates downstream effects across domains.
                </div>
              </div>
              
              {/* High-Impact Communication & Translation */}
              <div className="characteristic-card" tabIndex={0}>
                <div className="characteristic-icon-container">
                  <svg className="characteristic-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <path d="M8 9h.01"></path>
                    <path d="M12 9h.01"></path>
                    <path d="M16 9h.01"></path>
                  </svg>
                </div>
                <div className="characteristic-title">High-Impact Communication & Translation</div>
                <div className="characteristic-description">
                  Ability to fluently translate complex concepts between technical and various business/creative domains. Articulates vision, strategy, and value compellingly to diverse stakeholders to drive alignment and action.
                </div>
              </div>
            </div>
            
            <Typography variant="h3" color="primary" mb="1rem" className="fsbp-section-heading">The FSBP in Action: Practical Applications</Typography>
            
            <Typography variant="body" mb="1.5rem" className="fsbp-text">
              My work embodies this philosophy in two key areas:
            </Typography>
            
            <div className="fsbp-domain-section">
              <Typography variant="body" mb="1rem" className="fsbp-text">
                <strong>Enterprise AI Development Framework:</strong> I&apos;ve developed an approach that helps traditional 
                development teams transform into AI-augmented powerhouses. This framework addresses the technical 
                implementation of AI tools, the necessary business process changes, and <strong>the crucial team optimization</strong> required to build 
                versatile, AI-leveraging professionals and fully capitalize on AI&apos;s potential.
              </Typography>
              <Button 
                variant="primary"
                href="/enterprise-ai-development-framework"
                size="sm"
              >
                Explore AI Framework
              </Button>
            </div>
            
            <div className="fsbp-domain-section">
              <Typography variant="body" mb="1rem" className="fsbp-text">
                <strong>React Best Practices:</strong> Beyond just technical implementation, my approach to React 
                development integrates business concerns like maintainability, scalability, and development velocity. 
                This ensures that technical decisions support broader business goals.
              </Typography>
              <Button 
                variant="primary"
                href="/fullstack-react-best-practices-integration"
                size="sm"
              >
                View React Best Practices
              </Button>
            </div>
            
            <Typography variant="h3" color="primary" mb="1rem" className="fsbp-section-heading">The Path Forward</Typography>
            
            <Typography variant="body" mb="1.5rem" className="fsbp-text">
              As AI continues to transform how we work, the most valuable professionals will be those who can 
              leverage these tools to operate across traditional boundaries. Organizations that embrace the Full-Stack 
              Business Person model will gain significant advantages in agility, efficiency, and innovation.
              The emergence of hyper-efficient, high-revenue, small-team companies isn&apos;t an anomaly; it&apos;s a glimpse into the future.
            </Typography>
            
            <Typography variant="body" mb="3rem" className="fsbp-text fsbp-italic-text">
              This portfolio itself exemplifies the FSBP principle – strategically designed, marketed, and 
              coded to deliver a specific message to different target audiences, demonstrating how technical depth and business breadth 
              combine to create exceptional outcomes in the AI-assisted future.
            </Typography>
            
            <hr className="fsbp-section-divider" />
          </div>
          
          <div className="fsbp-cta-container">
            <div className="cta-group">
              <Typography variant="h3">Explore My Core Frameworks</Typography>
              <div className="button-group">
                <a href="/enterprise-ai-development-framework" className="cta-button">
                  <svg className="cta-button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                  </svg>
                  Enterprise AI Transformation
                </a>
                <a href="/fullstack-react-best-practices-integration" className="cta-button">
                  <svg className="cta-button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="10" r="2"></circle>
                    <path d="M12 14v4"></path>
                  </svg>
                  React Best Practices
                </a>
              </div>
            </div>
            
            <div className="cta-group">
              <Typography variant="h3">See My Background & Impact</Typography>
              <div className="button-group">
                <a href="/experience" className="cta-button">
                  <svg className="cta-button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  Experience
                </a>
                <a href="/bio" className="cta-button">
                  <svg className="cta-button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Bio Page
                </a>
                <a href="/code-examples" className="cta-button">
                  <svg className="cta-button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  Code Examples
                </a>
              </div>
            </div>
            
            <div className="cta-group">
              <Typography variant="h3">Connect</Typography>
              <div className="button-group">
                <a href="https://www.linkedin.com/in/davidmieloch" className="cta-button">
                  <svg className="cta-button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
              <p className="connect-context">Open to discussing strategic partnerships and leadership opportunities.</p>
            </div>
          </div>
        </div>
        
        {/* Perfect Fit Analyzer Section */}
        <div id="perfect-fit" className="perfect-fit-section">
          <PerfectFitAnalyzer />
        </div>
      </HomePageContainer>
    </>
  );
} 