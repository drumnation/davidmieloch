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

export const TaglineTypography = styled.p`
  font-style: italic;
  opacity: 0.9;
  font-size: 0.95em;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.light};
  line-height: 1.5;
`;

export const HeroContainer = styled.section<{
  $background: string;
  $textColor: string;
  $pattern: string;
  $backgroundImage?: string;
  $backgroundOverlay?: boolean;
  $overlayOpacity?: number;
}>`
  position: relative !important;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  isolation: isolate !important;
  z-index: 0 !important;
  ${({ $background }) => backgroundStyles[$background as keyof typeof backgroundStyles]}
  ${({ $textColor }) => textColorStyles[$textColor as keyof typeof textColorStyles]}
  ${({ $pattern, $background }) => $background !== 'image' && patternStyles[$pattern as keyof typeof patternStyles]}
  
  ${({ $backgroundImage }) => $backgroundImage && css`
    &::before {
      content: '';
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background-image: url(${$backgroundImage});
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      z-index: 0 !important;
      will-change: transform !important;
      transform: translateZ(0) !important;
      opacity: 1 !important;
    }
  `}
  
  /* Ensure full width in all contexts */
  max-width: 100%;
  align-self: stretch;

  &.full-width-hero {
    width: 100vw;
    position: relative;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
  }

  ${media.up('md')} {
    min-height: 70vh;
    padding: 0;
  }
`;

export const HeroContent = styled.div<{ $overlayOpacity?: number }>`
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  z-index: 2 !important;
  position: relative !important;
  padding: 2rem 2.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, ${({ $overlayOpacity }) => $overlayOpacity || 0.5}) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;

  /* Title styles */
  h1 {
    font-size: 2.75rem !important;
    line-height: 1.1 !important;
    font-weight: 800 !important;
    letter-spacing: 0.02em !important;
    margin-bottom: 1.5rem !important;
    text-transform: uppercase !important;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* Subtitle styles */
  h3 {
    font-size: 1.25rem !important;
    line-height: 1.4 !important;
    font-weight: 400 !important;
    font-style: italic !important;
    letter-spacing: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 2rem !important;
    opacity: 0.9;
    max-width: 85%;
    margin-left: auto;
    margin-right: auto;
  }

  /* Description styles */
  p {
    font-size: 1.1rem !important;
    line-height: 1.6 !important;
    opacity: 0.8;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  
  ${media.up('md')} {
    padding: 3.5rem 4rem;

    h1 {
      font-size: 3.25rem !important;
    }

    h3 {
      font-size: 1.5rem !important;
    }
  }

  ${media.down('sm')} {
    padding: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    width: 95%;

    h1 {
      font-size: 2rem !important;
    }

    h3 {
      font-size: 1.1rem !important;
      max-width: 100%;
    }

    p {
      font-size: 1rem !important;
      max-width: 100%;
    }
  }
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  ${media.down('sm')} {
    flex-direction: column;
    align-items: center;
    
    > * {
      margin-left: 0 !important;
      margin-bottom: 1rem;
      width: 100%;
    }
  }
`;

export const SubtitleWrapper = styled.div`
  .ai-native-break {
    display: block;
  }
`;
