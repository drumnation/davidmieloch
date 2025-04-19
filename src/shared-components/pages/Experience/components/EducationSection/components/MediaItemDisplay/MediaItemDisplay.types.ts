import { MediaItem } from '../../EducationSection.types';

export interface MediaItemDisplayProps {
    mediaItem: MediaItem;
    schoolName: string; // For alt text and titles
    onImageClick: (url: string, title?: string) => void;
} 