import { ReactNode, ElementType } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyColor = 'primary' | 'secondary' | 'light' | 'gradient' | 'inherit';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
  as?: ElementType;
  // Margin props
  mt?: string | number;
  mb?: string | number;
  ml?: string | number;
  mr?: string | number;
  mx?: string | number;
  my?: string | number;
}

export interface StyledTypographyProps {
  $variant: TypographyVariant;
  $weight: TypographyWeight;
  $color: TypographyColor;
  // Margin props
  $mt?: string | number;
  $mb?: string | number;
  $ml?: string | number;
  $mr?: string | number;
  $mx?: string | number;
  $my?: string | number;
} 