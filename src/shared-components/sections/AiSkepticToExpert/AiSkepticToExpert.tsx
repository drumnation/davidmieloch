"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Hero } from '../../organisms/Hero';
import { QuoteGrid } from '../../organisms/QuoteGrid';
import ProblemSolutionCard from '../../organisms/ProblemSolutionCard';
import { AiSkepticToExpertProps } from './AiSkepticToExpert.types';
import { Typography } from '../../atoms/Typography';
import * as S from './AiSkepticToExpert.styles';
import { fadeIn, fadeInUp, staggerContainer } from './AiSkepticToExpert.animations';
import { defaultContent } from './AiSkepticToExpert.constants';
import { enhanceHeroProps, enhanceQuotesProps, RedditIcon } from './AiSkepticToExpert.logic';

export const AiSkepticToExpert: React.FC<AiSkepticToExpertProps> = ({
  className,
  heroProps = defaultContent.hero,
  quotesProps = defaultContent.quotes,
  problemSolutionCardsProps = defaultContent.problemSolutions,
}) => {
  // Enhance props with consistent styling and defaults
  const enhancedHeroProps = React.useMemo(() => enhanceHeroProps(heroProps), [heroProps]);
  const enhancedQuotesProps = React.useMemo(() => enhanceQuotesProps(quotesProps), [quotesProps]);
  
  // State for visibility animations
  const [contentVisible, setContentVisible] = useState(false);
  const [cardAnimations, setCardAnimations] = useState<boolean[]>(Array(problemSolutionCardsProps.cards.length).fill(false));
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Intersection observer for main section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger content visibility after section becomes visible
          setContentVisible(true);
          
          // Stagger card animations
          problemSolutionCardsProps.cards.forEach((_, index) => {
            setTimeout(() => {
              setCardAnimations(prev => {
                const newAnimations = [...prev];
                newAnimations[index] = true;
                return newAnimations;
              });
            }, 500 + (index * 200));
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [problemSolutionCardsProps.cards.length]);

  const heroComponent = React.useMemo(() => (
    <Hero {...enhancedHeroProps} />
  ), [enhancedHeroProps]);

  return (
    <S.Container className={className} key="ai-skeptic-content">
      <S.GlobalStyles />
      {/* Hero Section */}
      {heroComponent}
    
      {/* Content Section with White Background */}
      <S.ContentSection 
        ref={sectionRef}
        className={contentVisible ? 'visible ai-skeptic-content-section' : 'hidden ai-skeptic-content-section'}
      >
        {/* Introduction Section */}
        <S.ContentContainer className={contentVisible ? 'visible ai-skeptic-content-container' : 'hidden ai-skeptic-content-container'}>
          <div className="text-left" style={{ marginBottom: S.SPACING.paragraph }}>
            <Typography variant="h2" className="mb-4">
              The Reality of AI Tools in Development Teams
            </Typography>
          </div>
          
          <div style={{ marginBottom: S.SPACING.paragraph }}>
            <Typography variant="body" weight="regular">
              Let me guess: your team just got access to AI coding tools, and the reactions range from skeptical eye-rolls to outright hostility.
              I&apos;ve been there—both as the skeptic and later as the solution architect.
            </Typography>
          </div>
          
          <S.RedditLink 
            href="https://www.reddit.com/r/ExperiencedDevs/comments/1j7aqsx/ai_coding_mandates_at_work/?share_id=Dhejf8gsX_-YUsuIH1nNE&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className={contentVisible ? 'visible' : 'hidden'}
          >
            <S.RedditLinkContent>
              {/* Reddit Icon Column */}
              <S.RedditIconColumn>
                <RedditIcon />
              </S.RedditIconColumn>
              
              {/* Content Column */}
              <S.RedditContentColumn>
                <div style={{ color: '#000000' }}>
                  <Typography variant="caption" weight="bold" className={`mb-${S.SPACING.element}`}>
                    🔥 Trending on r/ExperiencedDevs
                  </Typography>
                </div>
                <div style={{ color: '#0066CC' }}>
                  <Typography variant="body" weight="bold" className={`mb-${S.SPACING.element}`}>
                    &ldquo;AI coding mandates at work?&rdquo;
                  </Typography>
                </div>
                <Typography variant="caption" color="secondary" className="text-gray-600">
                  💬 286 comments &nbsp;&nbsp; ⬆️ 283 upvotes
                </Typography>
              </S.RedditContentColumn>
            </S.RedditLinkContent>
          </S.RedditLink>
          
          <div>
            <Typography variant="body" className="mb-0" weight="regular">
              A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers shared their frustrations 
              about mandatory AI tool adoption. The problems are systemic and deeply concerning:
            </Typography>
          </div>
        </S.ContentContainer>
        
        {/* Quotes Section with Light Background */}
        <S.BackgroundSection className={contentVisible ? 'visible' : 'hidden'}>
          <div 
            style={{ 
              width: '100%',
              maxWidth: '1000px', 
              margin: '0 auto',
              padding: `0 ${S.SPACING.container}`
            }}
            className={contentVisible ? 'visible' : 'hidden'}
          >
            <QuoteGrid {...enhancedQuotesProps} />
          </div>
        </S.BackgroundSection>
        
        {/* Analysis Section */}
        <S.ContentContainer className={contentVisible ? 'visible ai-skeptic-content-container' : 'hidden ai-skeptic-content-container'}>
          <div style={{ marginBottom: S.SPACING.paragraph }}>
            <Typography variant="body" weight="regular">
              These quotes highlight a disturbing trend: companies implementing AI tools without proper systems, leading to metrics that
              incentivize accepting AI suggestions regardless of quality, management viewing AI as primarily a cost-cutting measure,
              and the ironic situation where AI is both causing problems and being proposed as the solution.
            </Typography>
          </div>
          
          <div>
            <Typography variant="body" className="mb-0" weight="regular">
              But there&apos;s another side to this story. When implemented thoughtfully, AI tools can be genuinely transformative. The key difference?
              A systematic approach to implementation.
            </Typography>
          </div>
        </S.ContentContainer>
        
        {/* Solutions Section with Accent Background */}
        <S.AccentBackgroundSection className={contentVisible ? 'visible' : 'hidden'}>
          <div 
            style={{ 
              width: '100%',
              maxWidth: '1000px', 
              margin: '0 auto',
              padding: `0 ${S.SPACING.container}`
            }}
            className={contentVisible ? 'visible' : 'hidden'}
          >
            <div 
              style={{ marginBottom: S.SPACING.paragraph }}
              className="text-left" 
            >
              <Typography variant="h2" className="mb-4">
                Common Problems &amp; My Solutions
              </Typography>
            </div>
            
            <S.CardGrid className={contentVisible ? 'visible' : 'hidden'}>
              {problemSolutionCardsProps.cards.map((card, index) => {
                // Convert string impact to object format if needed
                const formattedImpact = typeof card.impact === 'string' 
                  ? { value: card.impact } 
                  : card.impact;
                
                // Map variant values to supported ProblemSolutionCard variants
                const cardVariant = card.variant === 'gradient' || card.variant === 'accent' 
                  ? 'blue' 
                  : card.variant;
                
                return (
                  <div 
                    key={index}
                    style={{
                      height: '100%',
                      display: 'flex',
                      opacity: cardAnimations[index] ? 1 : 0,
                      transform: cardAnimations[index] ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                      transitionDelay: `${index * 0.2}s`
                    }}
                  >
                    <ProblemSolutionCard 
                      slug={card.slug || 'Feature'}
                      problem={card.problem}
                      solution={card.solution}
                      impact={formattedImpact}
                      icon={card.icon}
                      variant={cardVariant as 'blue' | 'white'}
                    />
                  </div>
                );
              })}
            </S.CardGrid>
          </div>
        </S.AccentBackgroundSection>
        
        {/* Conclusion Section */}
        <S.ContentContainer className={contentVisible ? 'visible ai-skeptic-content-container' : 'hidden ai-skeptic-content-container'}>
          <div style={{ marginBottom: S.SPACING.paragraph }}>
            <Typography variant="body" weight="regular">
              Through my journey from skeptic to innovator, I&apos;ve developed a comprehensive system that addresses these challenges head-on.
              My approach, combined with carefully crafted development practices and custom tools I&apos;ve built,
              creates an environment where both human expertise and AI capabilities can flourish.
            </Typography>
          </div>
          
          <div>
            <Typography variant="body" className="mb-0" weight="regular">
              But before we dive into these solutions, let&apos;s understand why the current approach to AI integration often fails,
              and how my perspective as a principal engineer can transform everything.
            </Typography>
          </div>
        </S.ContentContainer>
      </S.ContentSection>
    </S.Container>
  );
};