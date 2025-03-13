import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const enhancedHeroProps = enhanceHeroProps(heroProps);
  const enhancedQuotesProps = enhanceQuotesProps(quotesProps);

  return (
    <AnimatePresence mode="wait">
      <S.Container className={className} key="ai-skeptic-content">
        {/* Hero Section */}
        <Hero {...enhancedHeroProps} />
      
      {/* Content Section with White Background */}
      <S.ContentSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        {/* Introduction Section */}
        <S.ContentContainer
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="text-left"
            style={{ marginBottom: S.SPACING.paragraph }}
            variants={fadeInUp}
          >
            <Typography variant="h2" className="mb-4">
              The Reality of AI Tools in Development Teams
            </Typography>
          </motion.div>
          
          <motion.div
            style={{ marginBottom: S.SPACING.paragraph }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              Let me guess: your team just got access to AI coding tools, and the reactions range from skeptical eye-rolls to outright hostility.
              I&apos;ve been there—both as the skeptic and later as the solution architect.
            </Typography>
          </motion.div>
          
          <S.RedditLink 
            href="https://www.reddit.com/r/ExperiencedDevs/comments/1j7aqsx/ai_coding_mandates_at_work/?share_id=Dhejf8gsX_-YUsuIH1nNE&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:shadow-md hover:transform hover:scale-[1.01]"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers shared their frustrations 
              about mandatory AI tool adoption. The problems are systemic and deeply concerning:
            </Typography>
          </motion.div>
        </S.ContentContainer>
        
        {/* Quotes Section with Light Background */}
        <S.BackgroundSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div 
            style={{ 
              width: '100%',
              maxWidth: '1000px', 
              margin: '0 auto',
              padding: `0 ${S.SPACING.container}`
            }}
            variants={fadeInUp}
          >
            <QuoteGrid {...enhancedQuotesProps} />
          </motion.div>
        </S.BackgroundSection>
        
        {/* Analysis Section */}
        <S.ContentContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            style={{ marginBottom: S.SPACING.paragraph }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              These quotes highlight a disturbing trend: companies implementing AI tools without proper systems, leading to metrics that
              incentivize accepting AI suggestions regardless of quality, management viewing AI as primarily a cost-cutting measure,
              and the ironic situation where AI is both causing problems and being proposed as the solution.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              But there&apos;s another side to this story. When implemented thoughtfully, AI tools can be genuinely transformative. The key difference?
              A systematic approach to implementation.
            </Typography>
          </motion.div>
        </S.ContentContainer>
        
        {/* Solutions Section with Accent Background */}
        <S.AccentBackgroundSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div 
            style={{ 
              width: '100%',
              maxWidth: '1000px', 
              margin: '0 auto',
              padding: `0 ${S.SPACING.container}`
            }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-left" 
              style={{ marginBottom: S.SPACING.paragraph }}
              variants={fadeInUp}
            >
              <Typography variant="h2" className="mb-4">
                Common Problems &amp; My Solutions
              </Typography>
            </motion.div>
            
            <S.CardGrid variants={staggerContainer}>
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
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    transition={{ 
                      delay: index * 0.2,
                      duration: 0.6,
                      ease: 'easeOut'
                    }}
                    style={{
                      height: '100%',
                      display: 'flex'
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
                  </motion.div>
                );
              })}
            </S.CardGrid>
          </motion.div>
        </S.AccentBackgroundSection>
        
        {/* Conclusion Section */}
        <S.ContentContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            style={{ marginBottom: S.SPACING.paragraph }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              Through my journey from skeptic to innovator, I&apos;ve developed a comprehensive system that addresses these challenges head-on.
              My approach, combined with carefully crafted development practices and custom tools I&apos;ve built,
              creates an environment where both human expertise and AI capabilities can flourish.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              But before we dive into these solutions, let&apos;s understand why the current approach to AI integration often fails,
              and how my perspective as a principal engineer can transform everything.
            </Typography>
          </motion.div>
        </S.ContentContainer>
      </S.ContentSection>
      </S.Container>
    </AnimatePresence>
  );
};