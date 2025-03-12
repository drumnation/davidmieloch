import { ReactNode } from 'react';

export type CardVariant = 'default' | 'gradient' | 'accent';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
} 