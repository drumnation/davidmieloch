import { ReactNode } from 'react';

export interface ExperienceProps {
  id?: string;
  className?: string;
}

export interface ExperienceItem {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null; // null for present positions
  description: string;
  media?: MediaItem[]; // Optional media items
}

export interface EducationItem {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null; // null for ongoing education
  description?: string;
  media?: MediaItem[]; // Optional media items
}

export interface SkillItem {
  name: string;
  category?: string; // Optional category for grouping skills
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies?: string[];
  media?: MediaItem[]; // Optional media items
}

export interface MediaItem {
  type: 'image' | 'pdf' | 'video';
  url: string;
  title: string;
  thumbnail?: string; // Optional thumbnail for videos or PDFs
  description?: string;
} 