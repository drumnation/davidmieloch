export interface ComparisonGridProps {
  before_after: Array<{
    aspect: string;
    before: string;
    after: string;
    icon?: string;
  }>;
  style?: 'gradient-cards' | 'accent-cards' | 'default';
  position?: 'full-width' | 'left' | 'right' | 'center';
  className?: string;
} 