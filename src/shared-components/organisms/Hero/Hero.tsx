'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { HeroProps } from './Hero.types';
import * as S from './Hero.styles';

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  background = 'gradient',
  backgroundImage,
  backgroundOverlay = true,
  overlayOpacity = 0.5,
  pattern = 'dots',
  textColor = 'light',
  className,
  style,
  cta,
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
            className="mb-3"
          >
            {subtitle}
          </Typography>
        )}

        {description && (
          <Typography 
            variant="body"
            color={textColor === 'light' ? 'light' : 'secondary'}
            className="mb-6"
          >
            {description}
          </Typography>
        )}

        {cta && (
          <S.ButtonContainer>
            {cta.primary && (
              <Button 
                variant="primary" 
                size="lg"
                href={cta.primary.link}
              >
                {cta.primary.text}
              </Button>
            )}
            
            {cta.secondary && (
              <Button 
                variant="ghost" 
                size="lg"
                href={cta.secondary.link}
                style={{ marginLeft: '1rem' }}
              >
                {cta.secondary.text}
              </Button>
            )}
          </S.ButtonContainer>
        )}
      </S.HeroContent>
    </S.HeroContainer>
  );
}; 