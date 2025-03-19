import { ReactNode } from 'react';

export interface CategoryCardItemProps {
  key: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface CategoryCardProps {
  title: string;
  description: ReactNode;
  items: CategoryCardItemProps[];
} 