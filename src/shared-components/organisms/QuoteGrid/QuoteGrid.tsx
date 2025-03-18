import React from 'react';
import { motion } from 'framer-motion';
import { Quote, QuoteGridProps } from './QuoteGrid.types';
import { Grid, QuoteCard, QuoteText, QuoteAuthor, QuoteNote, IconWrapper } from './QuoteGrid.styles';

export const QuoteGrid: React.FC<QuoteGridProps> = ({
  quotes,
  layout = '3-column',
  animation = 'stagger-fade',
  style = 'card',
  background = 'light',
  className,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const isBlueTheme = background === 'blue';

  return (
    <motion.div
      className={className}
      initial={animation !== 'none' ? "hidden" : undefined}
      whileInView={animation !== 'none' ? "visible" : undefined}
      viewport={{ once: true, margin: "-100px" }}
      variants={animation !== 'none' ? containerVariants : undefined}
    >
      <Grid $layout={layout} $background="light">
        {quotes.map((quote, index) => (
          <motion.div 
            key={index} 
            variants={animation !== 'none' ? cardVariants : undefined}
            style={{ height: '100%' }}
          >
            <QuoteCard 
              $style={style} 
              $background={isBlueTheme ? 'blue' : background}
            >
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
          </motion.div>
        ))}
      </Grid>
    </motion.div>
  );
};

export default QuoteGrid; 