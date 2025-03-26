export interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  location?: string;
  description?: string;
  bulletPoints?: string[];
  logo?: string;
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