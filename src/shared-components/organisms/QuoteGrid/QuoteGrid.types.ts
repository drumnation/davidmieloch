import { ReactElement } from 'react';

export interface Quote {
  author: string;
  text: string;
  role?: string;
  icon?: ReactElement;
  note?: string;
}

export interface QuoteGridProps {
  quotes: Quote[];
  layout?: '2-column' | '3-column';
  animation?: 'stagger-fade' | 'float-in' | 'none';
  style?: 'card' | 'minimal';
  background?: 'light' | 'dark' | 'gradient' | 'blue';
  className?: string;
} 