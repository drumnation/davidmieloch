import { ReactNode } from 'react';
import { HeroProps } from '@shared-components/organisms/Hero/Hero.types';
import { QuoteGridProps } from '@shared-components/organisms/QuoteGrid/QuoteGrid.types';

export interface AiSkepticToExpertProps {
  id?: string;
  className?: string;
  onReady?: () => void;
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
  content?: any; // TODO: Define a more specific type based on defaultContent structure
  onImageLoad?: () => void;
}

// You might also want to define a specific type for the content structure
// based on AiSkepticToExpert.constants.ts for better type safety.
// Example:
// export interface AiSkepticToExpertContent {
//   hero: HeroProps;
//   quotes: QuoteGridProps;
//   // ... other sections ...
// }
// export interface AiSkepticToExpertProps {
//   content?: AiSkepticToExpertContent;
//   onImageLoad?: () => void;
// }