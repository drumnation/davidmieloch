import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography';
import { QuoteGridProps } from './QuoteGrid.types';
import * as S from './QuoteGrid.styles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const floatVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const QuoteGrid: React.FC<QuoteGridProps> = ({
  quotes,
  layout = '3-column',
  animation = 'stagger-fade',
  style = 'card',
  background = 'light',
  className
}) => {
  const MotionGrid = motion.create(S.Grid);
  const itemVariants = animation === 'float-in' ? floatVariants : fadeVariants;

  return (
    <MotionGrid
      $layout={layout}
      $background={background}
      className={className}
      initial="hidden"
      animate="visible"
      variants={animation === 'none' ? undefined : containerVariants}
    >
      {quotes.map((quote, index) => (
        <motion.div
          key={index}
          variants={animation === 'none' ? undefined : itemVariants}
          whileHover={animation === 'float-in' ? "hover" : undefined}
        >
          <S.QuoteCard
            $style={style}
            $background={background}
          >
            {quote.icon && (
              <S.IconWrapper $background={background}>
                {quote.icon}
              </S.IconWrapper>
            )}
            <S.QuoteText>
              <Typography
                variant="body"
                color={background === 'light' ? 'primary' : 'inherit'}
              >
                {quote.text}
              </Typography>
            </S.QuoteText>
            <S.QuoteAuthor>
              <Typography
                variant="body"
                weight="semibold"
                color={background === 'light' ? 'primary' : 'inherit'}
              >
                {quote.author}
              </Typography>
            </S.QuoteAuthor>
            {quote.note && (
              <S.QuoteNote>
                <Typography
                  variant="caption"
                  color={background === 'light' ? 'secondary' : 'inherit'}
                >
                  {quote.note}
                </Typography>
              </S.QuoteNote>
            )}
          </S.QuoteCard>
        </motion.div>
      ))}
    </MotionGrid>
  );
}; 