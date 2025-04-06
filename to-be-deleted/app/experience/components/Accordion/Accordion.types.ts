import { ReactNode } from 'react';

export interface AccordionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  initiallyOpen?: boolean;
} 