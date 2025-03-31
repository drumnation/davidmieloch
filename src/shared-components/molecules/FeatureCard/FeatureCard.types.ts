import { ReactNode } from 'react';

export interface BulletPoint {
  text: string;
  icon?: ReactNode;
}

export interface FeatureCardProps {
  title: string;
  bulletPoints: BulletPoint[];
  icon?: ReactNode;
  style?: 'gradient-card' | 'accent-card';
  animation?: 'fade-in' | 'slide-up' | 'none';
  className?: string;
} 