import React from 'react';
import { ReactNode } from 'react';

export interface CategoryCardItemProps {
  key: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface CategoryCardProps {
  id?: string;
  title: string;
  description: ReactNode;
  items: CategoryCardItemProps[];
} 