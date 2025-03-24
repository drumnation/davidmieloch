'use client';

import styled, { css } from 'styled-components';
import { media } from '../../../styles/theme/responsive';

const backgroundStyles = {
  gradient: css`
    background: ${({ theme }) => theme.colors.gradient};
  `,
  light: css`
    background: ${({ theme }) => theme.colors.background.light};
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.background.dark};
  `,
  image: css`
    background-color: #000; /* Black background as fallback */
  `
};

const textColorStyles = {
  light: css`
    color: ${({ theme }) => theme.colors.text.light};
  `,
  dark: css`
    color: ${({ theme }) => theme.colors.text.primary};
  `
};

const patternStyles = {
  'circuit-board': css`
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M10 10h80v80H10z' stroke='rgba(255,255,255,0.1)' stroke-width='1' fill='none'/%3E%3C/svg%3E");
    background-size: 50px 50px;
  `,
  dots: css`
    background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  `,
  none: css``
};

export const HeroContainer = styled.section<{
  $background: string;
  $textColor: string;
  $pattern: string;
  $backgroundImage?: string;
  $backgroundOverlay?: boolean;
  $overlayOpacity?: number;
}>`
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  ${({ $background }) => backgroundStyles[$background as keyof typeof backgroundStyles]}
  ${({ $textColor }) => textColorStyles[$textColor as keyof typeof textColorStyles]}
  ${({ $pattern, $background }) => $background !== 'image' && patternStyles[$pattern as keyof typeof patternStyles]}
  
  ${({ $backgroundImage, $backgroundOverlay, $overlayOpacity }) => $backgroundImage && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${$backgroundImage});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: 0;
      will-change: transform;
      transform: translateZ(0);
    }
    
    /* Add overlay when backgroundOverlay is true */
    ${$backgroundOverlay && css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, ${$overlayOpacity || 0.5});
        z-index: 0;
      }
    `}
  `}
  
  /* Ensure full width in all contexts */
  max-width: 100%;
  align-self: stretch;

  ${media.up('md')} {
    min-height: 70vh;
    padding: 4rem 3rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 2;
  position: relative;
  padding: 2rem;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  
  ${media.up('md')} {
    padding: 3rem;
  }
`;

export const Title = styled.div`
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  ${media.up('md')} {
    margin-bottom: 2rem;
  }
`;

export const Subtitle = styled.div`
  max-width: 600px;
  margin: 0 auto;
  opacity: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;