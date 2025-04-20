export type ProjectCategory =
  | 'Developer Tools'
  | 'SaaS Applications'
  | 'Personal Innovation Lab'
  | 'Digital Marketing'
  | 'Moonlight Projects'
  | 'All';

export interface MediaItem {
  type: 'image' | 'video' | 'audio' | 'embed' | 'pdf' | 'link' | 'group';
  url: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  width?: string;
  height?: number;
  customHeight?: string;
  thumbnailWidth?: string;
  buttonText?: string;
  layout?: 'default' | 'stack';
  media?: MediaItem[];
  showLogo?: boolean;
  logoHasBorderRadius?: boolean;
  logoHasBorder?: boolean;
  useMobileCarousel?: boolean;
  cropHeight?: string;
}

export interface SideProject {
  title: string;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  logoPath?: string;
  showBorder?: boolean;
  repoUrl?: string;
  url?: string;
  impact?: string;
  media?: MediaItem[];
  halfWidth?: boolean;
}

export interface SideProjectsSectionProps {
  projects?: SideProject[];
  title?: string;
  className?: string;
  id?: string;
} 