'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography';
import { HeroProps } from './Hero.types';
import * as S from './Hero.styles';

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
  // Create a simple motion container instead of using useAnimate
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={className}>
      <S.HeroContainer
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        $background={background}
        $backgroundImage={backgroundImage}
        $backgroundOverlay={backgroundOverlay}
        $overlayOpacity={overlayOpacity}
        $textColor={textColor}
        $pattern={pattern}
        className={pattern ? `pattern-${pattern}` : ''}
      >
        <S.HeroContent>
          <motion.div variants={itemVariants}>
            {title && (
              <Typography 
                variant="h1" 
                color={textColor === 'light' ? 'light' : 'primary'}
                className="mb-4"
              >
                {title}
              </Typography>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            {subtitle && (
              <Typography 
                variant="h3" 
                weight="regular"
                color={textColor === 'light' ? 'light' : 'secondary'}
              >
                {subtitle}
              </Typography>
            )}
          </motion.div>
        </S.HeroContent>
      </S.HeroContainer>
    </div>
  );
}; 