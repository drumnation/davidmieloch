export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturePreviewProps {
  features: Feature[];
  style?: 'gradient-cards' | 'accent-cards';
  animation?: 'stagger-fade' | 'slide-in' | 'none';
  className?: string;
} 