'use client';

import React from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { Typography } from '../../atoms/Typography';
import { HeroProps } from './Hero.types';
import * as S from './Hero.styles';

// Create animated versions of styled components
const AnimatedHeroContainer = animated(S.HeroContainer);
const AnimatedDiv = animated('div');

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
  // Container animation
  const containerAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
    delay: 100
  });

  // Title animation with delay
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { ...config.gentle },
    delay: 300
  });
  
  // Subtitle animation with delay
  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { ...config.gentle },
    delay: 500
  });

  return (
    <div className={className}>
      <AnimatedHeroContainer
        style={containerAnimation}
        $background={background}
        $backgroundImage={backgroundImage}
        $backgroundOverlay={backgroundOverlay}
        $overlayOpacity={overlayOpacity}
        $textColor={textColor}
        $pattern={pattern}
        className={pattern ? `pattern-${pattern}` : ''}
      >
        <S.HeroContent>
          {title && (
            <AnimatedDiv style={titleAnimation}>
              <Typography 
                variant="h1" 
                color={textColor === 'light' ? 'light' : 'primary'}
                className="mb-4"
              >
                {title}
              </Typography>
            </AnimatedDiv>
          )}
          
          {subtitle && (
            <AnimatedDiv style={subtitleAnimation}>
              <Typography 
                variant="h3" 
                weight="regular"
                color={textColor === 'light' ? 'light' : 'secondary'}
              >
                {subtitle}
              </Typography>
            </AnimatedDiv>
          )}
        </S.HeroContent>
      </AnimatedHeroContainer>
    </div>
  );
}; 