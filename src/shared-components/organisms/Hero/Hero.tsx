'use client';

import React, { useEffect } from 'react';
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
  backgroundImage,
  backgroundOverlay = true,
  overlayOpacity = 0.5,
  pattern = 'dots',
  textColor = 'light',
  animation = 'fade-up',
  className,
  initialAnimation = 'hidden',
}) => {
  // Create motion versions of styled components
  const MotionHeroContainer = motion(S.HeroContainer);
  const MotionHeroContent = motion(S.HeroContent);
  
  const itemVariants = animation === 'fade-up' ? fadeUpVariants : slideInVariants;
  
  // Log detailed information for debugging
  useEffect(() => {
    console.log('Hero props:', { 
      background, 
      backgroundImage, 
      backgroundOverlay,
      overlayOpacity,
      textColor,
      pattern
    });
  }, [background, backgroundImage, backgroundOverlay, overlayOpacity, textColor, pattern]);

  return (
    <MotionHeroContainer
      className={`${className || ''} ${pattern ? `pattern-${pattern}` : ''}`}
      $background={background}
      $backgroundImage={backgroundImage}
      $backgroundOverlay={backgroundOverlay}
      $overlayOpacity={overlayOpacity}
      $textColor={textColor}
      $pattern={pattern}
      initial={initialAnimation}
      animate="visible"
      variants={containerVariants}
    >
      <S.HeroContent>
        {title && (
          <motion.div initial={initialAnimation} animate="visible" variants={itemVariants}>
            <Typography 
              variant="h1" 
              color={textColor === 'light' ? 'light' : 'primary'}
              className="mb-4"
            >
              {title}
            </Typography>
          </motion.div>
        )}
        
        {subtitle && (
          <motion.div initial={initialAnimation} animate="visible" variants={itemVariants}>
            <Typography 
              variant="h3" 
              weight="regular"
              color={textColor === 'light' ? 'light' : 'secondary'}
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}
      </S.HeroContent>
    </MotionHeroContainer>
  );
}; 