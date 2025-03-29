import { ReactNode } from 'react';

export interface ExperienceItem {
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  foldable?: boolean;
  bulletPoints?: string[];
  logoPath?: string;
  media?: MediaItem[];
  sortOrder?: number;
}

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  title?: string;
  className?: string;
  children?: ReactNode;
  renderLogo?: (company: string) => ReactNode;
}

export interface MediaItem {
  type: 'image' | 'video' | 'embed' | 'link' | 'pdf' | 'audio' | 'group';
  url?: string;
  title?: string;
  description?: string;
  foldable?: boolean;
  thumbnailUrl?: string;
  width?: string | number;
  height?: number;
  layout?: 'default' | 'stack';
  items?: MediaItem[];
  customHeight?: string;
  cropHeight?: string;
  buttonText?: string;
} 