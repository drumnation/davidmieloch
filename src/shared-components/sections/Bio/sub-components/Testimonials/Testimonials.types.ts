import { ReactNode } from 'react';

export interface TestimonialsProps {
  className?: string;
}

export interface TestimonialCardProps {
  author: string;
  text: string;
  category: 'Music' | 'Sales/Marketing' | 'Software';
  className?: string;
}

export interface TestimonialCategoryProps {
  category: string;
  testimonials: TestimonialCardProps[];
  className?: string;
}

export interface TestimonialsData {
  category: string;
  testimonials: {
    author: string;
    text: string;
    category: 'Music' | 'Sales/Marketing' | 'Software';
  }[];
} 