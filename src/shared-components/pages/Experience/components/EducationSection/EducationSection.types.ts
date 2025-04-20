import { ReactNode } from 'react';
// import { EducationItem } from './EducationSection.types'; // Remove self-import

export interface EducationItem {
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  logoPath?: string;
  media?: MediaItem[];
  sortOrder?: number;
}

export interface MediaItem {
  type: 'image' | 'pdf' | 'link' | 'embed' | 'video' | 'audio';
  url: string;
  title?: string;
  description?: string;
  width?: string;
  height?: number;
  thumbnailUrl?: string;
}

export interface EducationSectionProps {
  educationItems: EducationItem[];
  title?: string;
  className?: string;
  children?: ReactNode;
  renderLogo?: (school: string) => ReactNode;
  generateId: (item: EducationItem) => string;
} 