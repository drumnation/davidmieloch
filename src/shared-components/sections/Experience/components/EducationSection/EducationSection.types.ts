import { ReactNode } from 'react';

export interface EducationItem {
  school: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  logoPath?: string;
  mediaUrl?: string;
  mediaType?: 'video' | 'image';
  sortOrder?: number; // Optional field for custom sorting
  media?: MediaItem[];
}

export interface MediaItem {
  type: 'image' | 'pdf' | 'embed';
  url: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string; // For PDFs
  width?: string | number;
  height?: string | number;
}

export interface EducationSectionProps {
  educationItems: EducationItem[];
  title?: string;
  className?: string;
  children?: ReactNode;
  renderLogo?: (school: string) => ReactNode;
} 