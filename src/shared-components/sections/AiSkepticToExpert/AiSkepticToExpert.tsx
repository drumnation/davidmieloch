"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Hero } from '../../organisms/Hero';
import { Typography } from '../../atoms/Typography';
import { AiSkepticToExpertProps } from './AiSkepticToExpert.types';
import * as S from './AiSkepticToExpert.styles';
import { defaultContent } from './AiSkepticToExpert.constants';
import { enhanceHeroProps, enhanceQuotesProps } from './AiSkepticToExpert.logic';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { contentVariants } from './AiSkepticToExpert.animations';
import { SPACING } from './AiSkepticToExpert.shared';
import { 
  ContentSection, 
  RedditSection, 
  QuotesSection, 
  ProblemSolutionSection 
} from './components';

export const AiSkepticToExpert: React.FC<AiSkepticToExpertProps> = ({
  className,
  heroProps = defaultContent.hero,
  quotesProps = defaultContent.quotes,
  problemSolutionCardsProps = defaultContent.problemSolutions,
}) => {
  const componentName = "AiSkepticToExpert";
  
  // Enhance props with consistent styling and defaults
  const enhancedHeroProps = React.useMemo(() => enhanceHeroProps(heroProps), [heroProps]);
  const enhancedQuotesProps = React.useMemo(() => {
    console.log("Input quotesProps:", quotesProps);
    const enhanced = enhanceQuotesProps(quotesProps);
    console.log("Enhanced quotesProps:", enhanced);
    return enhanced;
  }, [quotesProps]);
  
  // Setup intersection observer
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroComponent = React.useMemo(() => (
    <Hero {...enhancedHeroProps} />
  ), [enhancedHeroProps]);

  const renderContent = () => (
    <S.Container className={className} key="ai-skeptic-content">
      <S.GlobalStyles />
      {heroComponent}
    
      <S.ContentSection
        ref={ref}
        variants={contentVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        as={motion.div}
      >
        <ContentSection title="The Reality of AI Tools in Development Teams">
          <Typography variant="body" weight="regular" className="mb-4">
            Let me guess: your team just got access to AI coding tools, and the reactions range from skeptical eye-rolls to outright hostility.
            I&apos;ve been there—both as the skeptic and later as the solution architect.
          </Typography>
          
          <RedditSection 
            url="https://www.reddit.com/r/ExperiencedDevs/comments/1j7aqsx/ai_coding_mandates_at_work/?share_id=Dhejf8gsX_-YUsuIH1nNE&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1" 
            title="AI coding mandates at work?"
            commentCount={286}
            upvoteCount={283}
            subreddit="ExperiencedDevs"
          />
          
          <Typography variant="body" weight="regular" className="mb-5">
            A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers shared their frustrations 
            about mandatory AI tool adoption. The problems are systemic and deeply concerning:
          </Typography>
        </ContentSection>
        
        {enhancedQuotesProps && (
          <QuotesSection quotesProps={enhancedQuotesProps} />
        )}
        
        <ContentSection>
          <Typography variant="body" weight="regular" mb="1.5rem">
            These quotes highlight a disturbing trend: companies implementing AI tools without proper systems, leading to metrics that
            incentivize accepting AI suggestions regardless of quality, management viewing AI as primarily a cost-cutting measure,
            and the ironic situation where AI is both causing problems and being proposed as the solution.
          </Typography>
          
          <Typography variant="body" weight="regular" mb="1.5rem">
            But there&apos;s another side to this story. When implemented thoughtfully, AI tools can be genuinely transformative. The key difference?
            A systematic approach to implementation.
          </Typography>
        </ContentSection>
        
        <div style={{ marginTop: SPACING.paragraphBreak }}>
          <ProblemSolutionSection 
            title="Common Problems & My Solutions"
            cards={problemSolutionCardsProps.cards}
          />
        </div>
        
        <ContentSection>
          <Typography variant="body" weight="regular" className="mb-4">
            Through my journey from skeptic to innovator, I&apos;ve developed a comprehensive system that addresses these challenges head-on.
            My approach, combined with carefully crafted development practices and custom tools I&apos;ve built,
            creates an environment where both human expertise and AI capabilities can flourish.
          </Typography>
          
          <Typography variant="body" weight="regular" className="mb-0">
            But before we dive into these solutions, let&apos;s understand why the current approach to AI integration often fails,
            and how my perspective as a principal engineer can transform everything.
          </Typography>
        </ContentSection>
      </S.ContentSection>
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

export default AiSkepticToExpert;