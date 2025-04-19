'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Loader } from '@mantine/core';
import { Typography as AtomTypography } from '../../atoms/Typography';
import { Button as AtomButton } from '../../atoms/Button';
import { HeroProps } from './Hero.types';
import * as S from './Hero.styles';

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  tagline,
  background = 'light',
  imageUrl,
  backgroundImage,
  backgroundOverlay = true,
  overlayOpacity = 0.5,
  minHeight,
  textColor = 'light',
  children,
  className,
  style,
  pattern = 'none',
  cta,
  onImageLoad
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const effectiveImageUrl = imageUrl || backgroundImage;

  console.log('Hero Props:', {
    backgroundOverlay,
    overlayOpacity,
    background,
    effectiveImageUrl,
    className
  });

  const handleImageLoad = () => {
    setIsLoading(false);
    onImageLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    onImageLoad?.();
  };

  return (
    <S.HeroContainer
      className={`${className || ''} ${pattern !== 'none' ? `pattern-${pattern}` : ''}`}
      $background={background}
      $backgroundImage={effectiveImageUrl}
      $textColor={textColor}
      $pattern={pattern}
      style={{
        ...style,
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      {effectiveImageUrl && (
        <img
          src={effectiveImageUrl}
          onLoad={handleImageLoad}
          onError={handleImageError}
          alt=""
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none'
          }}
          aria-hidden="true"
        />
      )}

      {isLoading && effectiveImageUrl && (
        <S.LoaderContainer>
          <Loader color="gray" size="xl" />
        </S.LoaderContainer>
      )}

      <S.HeroContent $overlayOpacity={overlayOpacity} style={{ opacity: isLoading ? 0 : 1 }}>
        {title && (
          <AtomTypography
            variant="h1"
            color={textColor === 'light' ? 'light' : 'primary'}
            className="mb-4"
          >
            {title}
          </AtomTypography>
        )}

        {subtitle && (
          <AtomTypography
            variant="h3"
            weight="regular"
            color={textColor === 'light' ? 'light' : 'secondary'}
            className="mb-3"
          >
            {subtitle.split('·').map((part, i) => (
              <React.Fragment key={i}>
                {i === 0 ? (
                  <>{part.trim()}</>
                ) : (
                  <>
                    <span style={{ display: 'none' }}>·</span>
                    <span style={{ display: 'block' }}>{part.trim()}</span>
                  </>
                )}
              </React.Fragment>
            ))}
          </AtomTypography>
        )}

        {description && (
          <AtomTypography
            variant="body"
            color={textColor === 'light' ? 'light' : 'secondary'}
            className="mb-3"
          >
            {description}
          </AtomTypography>
        )}

        {tagline && (
          <S.TaglineTypography>
            {tagline}
          </S.TaglineTypography>
        )}

        {children && <div>{children}</div>}

        {cta && (cta.primary || cta.secondary) && (
          <S.ButtonContainer>
            {cta.primary && (
              <AtomButton
                variant="primary"
                size="lg"
                href={cta.primary.link}
              >
                {cta.primary.text}
              </AtomButton>
            )}
            {cta.secondary && (
              <AtomButton
                variant="ghost"
                size="lg"
                href={cta.secondary.link}
                style={{ marginLeft: '1rem' }}
              >
                {cta.secondary.text}
              </AtomButton>
            )}
          </S.ButtonContainer>
        )}
      </S.HeroContent>

      <style jsx global>{`
        .hero-tagline {
          font-style: italic;
          opacity: 0.9;
          font-size: 0.95em;
        }
      `}</style>
    </S.HeroContainer>
  );
}; 