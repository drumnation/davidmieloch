export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  style?: 'gradient-cards' | 'accent-cards';
  animation?: 'stagger-fade' | 'slide-up';
  className?: string;
}

export interface StyledFeatureGridProps {
  $columns: number;
  $style: FeatureGridProps['style'];
} 