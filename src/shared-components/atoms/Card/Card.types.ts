import { ReactNode } from 'react';

export type CardVariant = 'gradient' | 'accent';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

export interface StyledCardProps {
  $variant: CardVariant;
  $padding: CardPadding;
  $fullWidth: boolean;
} 