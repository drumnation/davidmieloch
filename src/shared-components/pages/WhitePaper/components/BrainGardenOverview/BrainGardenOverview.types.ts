import { ReactElement } from 'react';

export interface BrainGardenOverviewProps {
  className?: string;
  heroProps?: {
    title: string;
    subtitle: string;
    background?: 'gradient' | 'light' | 'dark' | 'image';
    backgroundImage?: string;
    backgroundOverlay?: boolean;
    overlayOpacity?: number;
    pattern?: 'circuit-board' | 'dots' | 'none';
    textColor?: 'light' | 'dark';
    animation?: 'fade-up' | 'slide-in' | 'none';
    className?: string;
  };
  introProps?: {
    text: string;
    icon?: string | ReactElement;
  };
  coreComponentsProps?: {
    features: Array<{
      title: string;
      description: string;
      icon: string | ReactElement;
      link?: string;
    }>;
  };
  forceMultipliersProps?: {
    features: Array<{
      title: string;
      description: string;
      icon: string | ReactElement;
      link?: string;
    }>;
  };
  systemArchitectureProps?: {
    title: string;
    description?: string;
    definition: string;
    theme?: 'default' | 'dark' | 'forest' | 'neutral';
  };
  navigationProps?: {
    sections: Array<{
      title: string;
      description: string;
      icon: string | ReactElement;
      link: string;
    }>;
  };
  keyBenefitsProps?: {
    stats: Array<{
      number: string;
      label: string;
      icon: string | ReactElement;
    }>;
  };
  ctaProps?: {
    title: string;
    description: string;
    action: string;
    link: string;
    icon?: string | ReactElement;
  };
  transitionProps?: {
    description?: string;
  };
}