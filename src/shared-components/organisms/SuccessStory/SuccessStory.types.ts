export interface SuccessStoryProps {
  title: string;
  metrics: Array<string>;
  quote: string;
  style?: 'accent-card' | 'gradient-card' | 'default';
  position?: 'right' | 'left' | 'center' | 'full-width';
  className?: string;
} 