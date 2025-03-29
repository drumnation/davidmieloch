import { ReactNode } from 'react';
import { SideProject } from './components/SideProjectsSection/SideProjectsSection.types';

export interface ExperienceProps {
  id?: string;
  className?: string;
  sideProjects?: SideProject[];
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
  type: 'image' | 'pdf' | 'video' | 'link' | 'embed' | 'group' | 'audio';
  url: string;
  title?: string;
  thumbnail?: string; // Optional thumbnail for videos or PDFs
  thumbnailWidth?: string; // Optional width for thumbnails (e.g., '150px', '200px')
  customHeight?: string; // Optional custom height for media items (e.g., '200px', '300px')
  cropHeight?: string; // Optional height to crop embedded content (creates overflow:hidden container with fixed height)
  description?: string;
  buttonText?: string; // Optional custom text for link buttons
  width?: string; // For controlling layout width ('full', '100%', '31.33%', '23.5%', etc.)
  height?: number; // Optional height for embeds
  layout?: 'default' | 'stack'; // For group items: 'default' (side-by-side), 'stack' (vertical)
  items?: MediaItem[]; // For group type, contains nested media items
} 