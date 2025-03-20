import { DefaultTheme } from 'styled-components';

export interface Challenge {
  title: string;
  description: string;
  impact: string;
  icon?: string;
  metrics?: {
    value: string;
    label: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

export interface ChallengeBreakdownProps {
  title: string;
  description: string;
  challenges?: Challenge[];
  key_issues?: Challenge[];
  style?: 'gradient-card' | 'accent-card' | 'challenge-cards';
  position?: 'left' | 'right' | 'center' | 'full-width';
  animation?: 'fade-up' | 'slide-in' | 'none';
  theme?: DefaultTheme;
  className?: string;
} 