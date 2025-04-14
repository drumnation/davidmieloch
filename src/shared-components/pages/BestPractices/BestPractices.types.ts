import { ReactNode } from 'react';

export interface BestPracticesProps {
  id?: string;
  className?: string;
}

export interface PracticeItem {
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

export interface PracticeCategory {
  title: string;
  description: ReactNode;
  items: PracticeItem[];
} 