"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Hero } from '../../organisms/Hero';
import { QuoteGrid } from '../../organisms/QuoteGrid';
import ProblemSolutionCard from '../../organisms/ProblemSolutionCard';
import { AiSkepticToExpertProps } from './AiSkepticToExpert.types';
import { Typography } from '../../atoms/Typography';
import * as S from './AiSkepticToExpert.styles';
import { defaultContent } from './AiSkepticToExpert.constants';
import { enhanceHeroProps, enhanceQuotesProps, RedditIcon } from './AiSkepticToExpert.logic';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';

// Define motion components
const MotionContentSection = motion(S.ContentSection);
const MotionContentContainer = motion(S.ContentContainer);
const MotionBackgroundSection = motion(S.BackgroundSection);
const MotionAccentBackgroundSection = motion(S.AccentBackgroundSection);
const MotionCardGrid = motion(S.CardGrid);

export const AiSkepticToExpert: React.FC<AiSkepticToExpertProps> = ({
  className,
  heroProps = defaultContent.hero,
  quotesProps = defaultContent.quotes,
  problemSolutionCardsProps = defaultContent.problemSolutions,
}) => {
  const componentName = "AiSkepticToExpert";
  
  // Enhance props with consistent styling and defaults
  const enhancedHeroProps = React.useMemo(() => enhanceHeroProps(heroProps), [heroProps]);
  const enhancedQuotesProps = React.useMemo(() => enhanceQuotesProps(quotesProps), [quotesProps]);
  
  // Setup intersection observer
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Animation variants
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  const heroComponent = React.useMemo(() => (
    <Hero {...enhancedHeroProps} />
  ), [enhancedHeroProps]);

  const renderContent = () => (
    <S.Container className={className} key="ai-skeptic-content">
      <S.GlobalStyles />
      {heroComponent}
    
      <MotionContentSection
        ref={ref}
        variants={contentVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <MotionContentContainer variants={contentVariants}>
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
          
          <motion.div variants={contentVariants}>
            <S.RedditLink 
              href="https://www.reddit.com/r/ExperiencedDevs/comments/1j7aqsx/ai_coding_mandates_at_work/?share_id=Dhejf8gsX_-YUsuIH1nNE&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <S.RedditLinkContent>
                <S.RedditIconColumn>
                  <RedditIcon />
                </S.RedditIconColumn>
                
                <S.RedditContentColumn>
                  <div style={{ color: '#000000' }}>
                    <Typography variant="caption" weight="bold" className={`mb-${S.SPACING.element}`}>
                      🔥 Trending on r/ExperiencedDevs
                    </Typography>
                  </div>
                  <div style={{ color: '#6772e5' }}>
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
          </motion.div>
          
          <div>
            <Typography variant="body" className="mb-0" weight="regular">
              A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers shared their frustrations 
              about mandatory AI tool adoption. The problems are systemic and deeply concerning:
            </Typography>
          </div>
        </MotionContentContainer>
        
        <MotionBackgroundSection variants={contentVariants}>
          <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: `0 ${S.SPACING.container}` }}>
            <QuoteGrid {...enhancedQuotesProps} />
          </div>
        </MotionBackgroundSection>
        
        <MotionContentContainer variants={contentVariants}>
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
        </MotionContentContainer>
        
        <MotionAccentBackgroundSection variants={contentVariants}>
          <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: `0 ${S.SPACING.container}` }}>
            <div style={{ marginBottom: S.SPACING.paragraph }} className="text-left">
              <Typography variant="h2" className="mb-4">
                Common Problems &amp; My Solutions
              </Typography>
            </div>
            
            <MotionCardGrid
              variants={cardContainerVariants}
            >
              {problemSolutionCardsProps.cards.map((card, index) => {
                const formattedImpact = typeof card.impact === 'string' 
                  ? { value: card.impact } 
                  : card.impact;
                
                const cardVariant = card.variant === 'gradient' || card.variant === 'accent' 
                  ? 'blue' 
                  : card.variant;
                
                return (
                  <motion.div key={index} variants={cardItemVariants}>
                    <ProblemSolutionCard 
                      slug={card.slug || 'Feature'}
                      problem={card.problem}
                      solution={card.solution}
                      impact={formattedImpact}
                      icon={card.icon}
                      variant={cardVariant as 'blue' | 'white'}
                    />
                  </motion.div>
                );
              })}
            </MotionCardGrid>
          </div>
        </MotionAccentBackgroundSection>
        
        <MotionContentContainer variants={contentVariants}>
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
        </MotionContentContainer>
      </MotionContentSection>
    </S.Container>
  );
  
  return (
    <AnimationErrorBoundary componentName={componentName}>
      <AnimationDebugger
        componentName={componentName}
        trackRenders={true}
        logLifecycle={true}
      >
        {renderContent()}
      </AnimationDebugger>
    </AnimationErrorBoundary>
  );
};