import React from 'react';
import { motion } from 'framer-motion';
import { Quote, QuoteGridProps } from './QuoteGrid.types';
import { Grid, QuoteCard, QuoteText, QuoteAuthor, QuoteNote, IconWrapper } from './QuoteGrid.styles';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { MotionSafe } from '../../../utils/animations/ssr-safe';

export const QuoteGrid: React.FC<QuoteGridProps> = ({
  quotes,
  layout = '3-column',
  animation = 'stagger-fade',
  style = 'card',
  background = 'light',
  className,
}) => {
  const componentName = "QuoteGrid";
  const isBlueTheme = background === 'blue';

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Skip animations if animation is set to none or reduced motion is preferred
  if (animation === 'none' || prefersReducedMotion) {
    return (
      <div className={className}>
        <Grid $layout={layout} $background="light">
          {quotes.map((quote, index) => (
            <div key={index}>
              <QuoteCard $style={style} $background={isBlueTheme ? 'blue' : background}>
                {quote.icon && (
                  <IconWrapper $background={isBlueTheme ? 'blue' : background}>
                    {quote.icon}
                  </IconWrapper>
                )}
                <QuoteText>&ldquo;{quote.text}&rdquo;</QuoteText>
                <QuoteAuthor>
                  — {quote.author}
                  {quote.role && `, ${quote.role}`}
                </QuoteAuthor>
                {quote.note && <QuoteNote>{quote.note}</QuoteNote>}
              </QuoteCard>
            </div>
          ))}
        </Grid>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15, 
      transition: { type: "spring", stiffness: 400, damping: 10 } 
    }
  };

  const textVariants = {
    initial: { opacity: 0.95 },
    hover: { opacity: 1 }
  };

  const renderContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Grid $layout={layout} $background="light">
        {quotes.map((quote, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <QuoteCard 
              $style={style} 
              $background={isBlueTheme ? 'blue' : background}
              variants={cardVariants}
              initial="initial"
            >
              {quote.icon && (
                <IconWrapper 
                  $background={isBlueTheme ? 'blue' : background}
                  variants={iconVariants}
                >
                  {quote.icon}
                </IconWrapper>
              )}
              <QuoteText variants={textVariants}>&ldquo;{quote.text}&rdquo;</QuoteText>
              <QuoteAuthor>
                — {quote.author}
                {quote.role && `, ${quote.role}`}
              </QuoteAuthor>
              {quote.note && <QuoteNote>{quote.note}</QuoteNote>}
            </QuoteCard>
          </motion.div>
        ))}
      </Grid>
    </motion.div>
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

export default QuoteGrid; 