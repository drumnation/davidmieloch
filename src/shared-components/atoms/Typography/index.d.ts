import { FC, ReactNode } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';
export type TypographyWeight = 'regular' | 'medium' | 'bold';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  className?: string;
}

export const Typography: FC<TypographyProps>; 