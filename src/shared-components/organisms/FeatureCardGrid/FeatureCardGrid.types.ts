import { ReactNode } from 'react';

export interface BulletPoint {
  text: string;
  icon?: ReactNode;
}

export interface Feature {
  title: string;
  description?: string;
  bulletPoints?: BulletPoint[];
  icon?: ReactNode;
  cta?: {
    text: string;
    url: string;
  };
}

export interface FeatureCardGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  style?: 'gradient-card' | 'accent-card';
  animation?: 'stagger-fade' | 'slide-up' | 'none';
  className?: string;
} 