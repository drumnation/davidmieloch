import { ReactNode } from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface FeatureGridProps {
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
  style?: 'gradient-cards' | 'accent-cards';
  animation?: 'stagger-fade' | 'none';
  className?: string;
}

export interface StyledFeatureGridProps {
  $columns: 2 | 3 | 4;
  $style: 'gradient-cards' | 'accent-cards';
} 