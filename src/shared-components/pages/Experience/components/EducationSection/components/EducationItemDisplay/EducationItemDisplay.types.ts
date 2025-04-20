import { EducationItem } from '../../EducationSection.types';

export interface EducationItemDisplayProps {
    educationItem: EducationItem;
    renderLogo?: (school: string) => React.ReactNode;
    onImageClick?: (url: string, title?: string) => void;
    id?: string;
} 