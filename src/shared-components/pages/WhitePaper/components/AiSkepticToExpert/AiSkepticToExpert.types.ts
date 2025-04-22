import { ReactNode } from 'react';
import { HeroProps } from '@shared-components/organisms/Hero';
import { QuoteGridProps } from '@shared-components/organisms/QuoteGrid/QuoteGrid.types';

export interface AiSkepticToExpertProps {
  id?: string;
  className?: string;
  onReady?: () => void;
  heroProps?: HeroProps;
  quotesProps?: QuoteGridProps;
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
  content?: {
    hero: HeroProps;
    quotes: QuoteGridProps;
    servicesCards?: {
      title: string;
      description: string;
      cards: any[];
    }
  };
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