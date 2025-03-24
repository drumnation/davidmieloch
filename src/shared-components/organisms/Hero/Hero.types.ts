export interface HeroProps {
  title: string;
  subtitle?: string;
  background?: 'gradient' | 'light' | 'dark' | 'image';
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  pattern?: 'circuit-board' | 'dots' | 'none';
  textColor?: 'light' | 'dark';
  className?: string;
} 