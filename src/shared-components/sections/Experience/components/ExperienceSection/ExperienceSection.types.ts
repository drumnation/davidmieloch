import { ReactNode } from 'react';

export interface ExperienceItem {
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
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
  type: 'image' | 'pdf' | 'embed' | 'link';
  url: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string; // For PDFs or links
  width?: string | number;
  height?: string | number;
} 