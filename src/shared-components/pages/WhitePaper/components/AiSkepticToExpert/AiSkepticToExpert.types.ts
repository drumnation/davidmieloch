import { ReactNode } from 'react';

export interface AiSkepticToExpertProps {
  className?: string;
  heroProps?: {
    title: string;
    subtitle: string;
    background?: 'image' | 'gradient' | 'dark' | 'light';
    backgroundImage?: string;
    backgroundOverlay?: boolean;
    overlayOpacity?: number;
    pattern?: string;
    textColor: 'light' | 'dark';
    animation?: string;
    className?: string;
  };
  quotesProps?: {
    quotes: Array<{
      text: string;
      author: string;
      note?: string;
      icon?: ReactNode;
    }>;
    layout: '3-column' | '2-column' | 'grid';
    animation?: 'stagger-fade' | 'float-in' | 'none';
    className?: string;
  };
  problemSolutionCardsProps?: {
    cards: Array<{
      slug?: string;
      problem: string;
      solution: string;
      impact: string | { value: string; label?: string };
      icon: string;
      variant: 'gradient' | 'accent' | 'default' | 'blue';
    }>;
  };
}