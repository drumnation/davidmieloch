import { ReactNode, CSSProperties } from 'react';
import { MantineGradient } from '@mantine/core';

interface CTAButton {
  text: string;
  link: string;
}

export type AnimationType = 'fade-in' | 'fade-up' | 'slide-in-left' | 'slide-in-right' | 'none';
export type TextColor = 'light' | 'dark';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  tagline?: string;
  background?: 'gradient' | 'light' | 'dark' | 'image';
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  pattern?: 'circuit-board' | 'dots' | 'none';
  textColor?: TextColor;
  className?: string;
  style?: CSSProperties;
  animation?: AnimationType;
  gradientColors?: string[];
  cta?: {
    primary?: CTAButton;
    secondary?: CTAButton;
  };
  imageUrl?: string;
  gradient?: MantineGradient;
  minHeight?: string | number;
  children?: ReactNode;
  onImageLoad?: () => void;
} 