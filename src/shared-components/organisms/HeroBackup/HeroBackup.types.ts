import { ReactNode, CSSProperties } from 'react';
import { MantineGradient, MantineColor } from '@mantine/core';

export type AnimationType = 'none' | 'fadeIn' | 'slideIn' | 'zoomIn';
export type BgPosition = 'center' | 'top' | 'bottom';

interface CTAButton {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  tagline?: string;
  background?: 'gradient' | 'light' | 'dark' | 'image';
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: MantineColor;
  gradient?: MantineGradient;
  textColor?: 'light' | 'dark';
  className?: string;
  style?: CSSProperties;
  cta?: {
    primary?: CTAButton;
    secondary?: CTAButton;
  };
  animation?: AnimationType;
  backgroundPosition?: BgPosition;
  minHeight?: string | number;
  children?: ReactNode;
} 