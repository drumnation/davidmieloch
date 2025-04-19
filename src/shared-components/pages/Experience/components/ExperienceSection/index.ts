export { ExperienceSection } from './ExperienceSection';
export * from './ExperienceSection.types'; // Optionally re-export types
// Remove exports of styled components that have been moved
/*
export { 
  SectionContainer, 
  ExperienceItem, 
  ExperienceHeader,
  HeaderLeft,
  CompanyLogo, 
  HeaderContent,
  ExperienceContent, 
  ExperienceTitle, 
  ExperienceMetadataRow,
  ExperienceCompany, 
  ExperienceDates, 
  ExperienceLocation, 
  ExperienceDescription, 
  MediaContainer, 
  MediaRow 
} from './ExperienceSection.styles';
*/
// Type export seems okay if still relevant
export type { ExperienceItem as ExperienceItemType, MediaItem, ExperienceSectionProps } from './ExperienceSection.types';
export { BulletPointsExample } from './BulletPointsExample'; 