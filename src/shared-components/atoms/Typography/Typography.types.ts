import { ElementType, ReactNode } from 'react';

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'overline';

export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type TypographyColor = 'primary' | 'secondary' | 'accent' | 'inherit';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
  as?: ElementType;
  gradient?: boolean;
} 