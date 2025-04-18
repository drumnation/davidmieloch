import { ReactNode } from 'react';

export interface BestPracticesProps {
  id?: string;
  className?: string;
  onReady?: () => void;
}

export interface PracticeItem {
  title: string;
  description: string;
  icon?: string;
  link?: string;
  tags?: string[];
}

export interface PracticeCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  practices: PracticeItem[];
} 