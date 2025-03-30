import { CSSProperties } from 'react';

interface CTAButton {
  text: string;
  link: string;
}

export interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  background?: 'gradient' | 'light' | 'dark' | 'image';
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  pattern?: 'circuit-board' | 'dots' | 'none';
  textColor?: 'light' | 'dark';
  className?: string;
  style?: CSSProperties;
  animation?: 'fade-up' | 'slide-in' | 'none';
  gradientColors?: string[];
  cta?: {
    primary?: CTAButton;
    secondary?: CTAButton;
  };
} 