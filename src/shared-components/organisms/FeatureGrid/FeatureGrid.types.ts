import { ReactNode, ReactElement } from 'react';

export interface Feature {
  title: string;
  description: string | ReactNode;
  icon?: ReactNode;
  link?: string;
  beforeState?: string;
  afterState?: string;
}

export interface FeatureGridProps {
  features: Feature[];
  columns?: number;
  layout?: 'grid' | 'row';
  animation?: 'stagger-fade' | 'none';
  renderFeatureContent?: (feature: Feature) => ReactElement;
  style?: 'gradient-cards' | 'accent-cards' | 'outline-cards';
  className?: string;
}

export interface StyledFeatureGridProps {
  $columns: 2 | 3 | 4;
  $style: 'gradient-cards' | 'accent-cards' | 'outline-cards';
  $layout?: 'grid' | 'row';
} 