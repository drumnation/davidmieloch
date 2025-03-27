import { MediaItem } from '../../Experience.types';

export type ProjectCategory = 
  | 'Developer Tools' 
  | 'SaaS Applications' 
  | 'Personal Innovation Lab' 
  | 'Digital Marketing'
  | 'Moonlight Projects';

export interface SideProject {
  title: string;
  category: ProjectCategory;
  description: string;
  technologies?: string[];
  url?: string;
  repoUrl?: string;
  startDate?: string;
  endDate?: string;
  impact?: string;
  logoPath?: string;
  media?: MediaItem[];
}

export interface SideProjectsSectionProps {
  projects: SideProject[];
  title?: string;
  className?: string;
} 