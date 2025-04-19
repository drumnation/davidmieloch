import { EducationItem as EducationItemType } from '../../EducationSection.types';

export interface EducationItemDisplayProps {
    educationItem: EducationItemType;
    renderLogo?: (schoolName: string) => React.ReactNode;
    onImageClick: (url: string, title?: string) => void;
} 