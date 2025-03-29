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
  showBorder?: boolean;
  media?: MediaItem[];
  sortOrder?: number;
  technologies?: string[];
}

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  title?: string;
  className?: string;
  children?: ReactNode;
  renderLogo?: (company: string) => ReactNode;
}

export interface MediaItem {
  type: 'image' | 'pdf' | 'link' | 'embed' | 'video' | 'audio' | 'group';
  url?: string;
  title?: string;
  description?: string;
  width?: string;
  height?: number;
  thumbnailUrl?: string;
  thumbnail?: string;
  thumbnailWidth?: string;
  customHeight?: string;
  cropHeight?: string;
  buttonText?: string;
  foldable?: boolean;
  showLogo?: boolean;
  titleLogoPath?: string;
  logoHasBorderRadius?: boolean;
  logoHasBorder?: boolean;
  items?: MediaItem[];
  layout?: 'default' | 'stack';
} 