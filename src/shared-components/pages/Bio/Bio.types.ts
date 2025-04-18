import { ReactNode } from 'react';
import { HeroProps } from '@shared-components/organisms/Hero';

export interface BioPageProps {
  id?: string;
  className?: string;
  heroProps?: HeroProps;
  onReady?: () => void;
}

export interface MediaItem {
  type: 'youtube' | 'soundcloud';
  url: string;
  title: string;
  description?: string;
}

export interface BioSection {
  title: string;
  content: ReactNode;
  mediaItems?: MediaItem[];
} 