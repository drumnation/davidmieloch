import { ReactNode } from 'react';

export interface BioProps {
  id?: string;
  className?: string;
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