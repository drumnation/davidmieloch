import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography';
import { HeroProps } from './Hero.types';
import * as S from './Hero.styles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  background = 'gradient',
  pattern = 'circuit-board',
  textColor = 'light',
  animation = 'fade-up',
  className
}) => {
  const MotionContainer = motion(S.HeroContainer);
  const MotionContent = motion(S.HeroContent);
  const itemVariants = animation === 'fade-up' ? fadeUpVariants : slideInVariants;

  return (
    <MotionContainer
      $background={background}
      $pattern={pattern}
      $textColor={textColor}
      className={className}
      initial="hidden"
      animate="visible"
      variants={animation === 'none' ? undefined : containerVariants}
    >
      <MotionContent variants={animation === 'none' ? undefined : {}}>
        <S.Title>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              weight="bold"
              color={textColor === 'light' ? 'inherit' : 'primary'}
            >
              {title}
            </Typography>
          </motion.div>
        </S.Title>
        
        {subtitle && (
          <S.Subtitle>
            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                color={textColor === 'light' ? 'inherit' : 'secondary'}
              >
                {subtitle}
              </Typography>
            </motion.div>
          </S.Subtitle>
        )}
      </MotionContent>
    </MotionContainer>
  );
}; 