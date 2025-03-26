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
} 