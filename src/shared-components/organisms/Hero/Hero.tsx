'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '../../atoms/Typography';
import { HeroProps } from './Hero.types';
import * as S from './Hero.styles';

const containerVariants = {
  hidden: { 
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
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
  className,
}) => {
  const MotionHeroContainer = motion(S.HeroContainer);
  const MotionHeroContent = motion(S.HeroContent);
  
  return (
    <AnimatePresence mode="wait">
      <MotionHeroContainer
        className={`${className || ''} ${pattern ? `pattern-${pattern}` : ''}`}
        $background={background}
        $backgroundImage={backgroundImage}
        $backgroundOverlay={backgroundOverlay}
        $overlayOpacity={overlayOpacity}
        $textColor={textColor}
        $pattern={pattern}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <MotionHeroContent
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {title && (
            <motion.div variants={itemVariants}>
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
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                weight="regular"
                color={textColor === 'light' ? 'light' : 'secondary'}
              >
                {subtitle}
              </Typography>
            </motion.div>
          )}
        </MotionHeroContent>
      </MotionHeroContainer>
    </AnimatePresence>
  );
}; 