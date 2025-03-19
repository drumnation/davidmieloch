import { ReactNode } from 'react';

export interface CategoryItem {
  key: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Category {
  key: string;
  title: string;
  description: ReactNode;
  items: CategoryItem[];
}

export interface CategoriesProps {
  className?: string;
  categories: Category[];
} 