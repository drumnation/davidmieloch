export interface EducationItemProps {
  school: string;
  degree: string;
  fieldOfStudy: string;
  period: string;
  description?: string;
  activities?: string;
  logo?: string;
  mediaUrl?: string;
  mediaType?: 'video' | 'image';
  media?: MediaItem[];
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