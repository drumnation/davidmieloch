export interface HeroProps {
  title: string;
  subtitle?: string;
  background?: 'gradient' | 'light' | 'dark';
  pattern?: 'circuit-board' | 'dots' | 'none';
  textColor?: 'light' | 'dark';
  animation?: 'fade-up' | 'slide-in' | 'none';
  className?: string;
} 