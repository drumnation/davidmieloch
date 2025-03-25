'use client';

import React from 'react';
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
  style,
}) => {
  return (
    <S.HeroContainer
      className={`${className || ''} ${pattern ? `pattern-${pattern}` : ''}`}
      $background={background}
      $backgroundImage={backgroundImage}
      $backgroundOverlay={backgroundOverlay}
      $overlayOpacity={overlayOpacity}
      $textColor={textColor}
      $pattern={pattern}
      style={style}
    >
      <S.HeroContent>
        {title && (
          <Typography 
            variant="h1" 
            color={textColor === 'light' ? 'light' : 'primary'}
            className="mb-4"
          >
            {title}
          </Typography>
        )}
        
        {subtitle && (
          <Typography 
            variant="h3" 
            weight="regular"
            color={textColor === 'light' ? 'light' : 'secondary'}
          >
            {subtitle}
          </Typography>
        )}
      </S.HeroContent>
    </S.HeroContainer>
  );
}; 