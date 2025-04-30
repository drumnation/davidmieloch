import React from 'react';
// Removed Image import as ProjectLogo handles it
// import Image from 'next/image';
import {
    // EducationItem, // Removed, replaced by ProjectCardContainer
    // SchoolLogo, // Removed, replaced by ProjectLogo
    EducationContent,
    EducationSchool,
    EducationMetadataRow,
    EducationDegree,
    EducationDates,
    // EducationDescription, // Removed as MarkdownRenderer handles rendering
    MediaRow,
} from '../../EducationSection.styles';
import { EducationItemDisplayProps } from './EducationItemDisplay.types';
// Removed unused imports for default logo rendering
// import { isImageFile } from '../../EducationSection.utils';
// import { stringToColor, LetterAvatar } from '../../../../utils/avatarHelpers';
import { MediaItemDisplay } from '../MediaItemDisplay';
import { MediaItem } from '../../EducationSection.types';
import { ProjectLogo } from '@shared-components/atoms/ProjectLogo'; // Added import
import * as PCS from '../../../SideProjectsSection/components/ProjectCard/ProjectCard.styles'; // Corrected import path for ProjectCard styles
// Import the new EntityHeader
import { EntityHeader } from '@shared-components/molecules/EntityHeader';
// Removed unused imports from ProjectCard styles
// import { ProjectHeader, ProjectTitle, HeaderDateRow, HeaderDate } from '../../../SideProjectsSection/components/ProjectCard/ProjectCard.styles';
import styled from 'styled-components';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer'; // Added import
import { ProjectCardContainer } from '../../../SideProjectsSection/components/ProjectCard/ProjectCard.styles';
// Import hooks for responsiveness
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
// REMOVE Carousel imports
// import { Carousel } from '@mantine/carousel';
// import '@mantine/carousel/styles.css'; 
// Import reusable styled components if needed
import { MetadataLine, Title as EntityTitle } from '@shared-components/molecules/EntityHeader/EntityHeader.styles';
// Import the shared ContentCarousel
import { ContentCarousel } from '@shared-components/organisms/ContentCarousel';
import { MediaItemRenderer } from '../../../ExperienceSection/components/MediaItemRenderer/MediaItemRenderer';
import { TechnologyList } from '@shared-components/pages/Experience/components/ExperienceSection/components/TechnologyList/TechnologyList';
import { ModalImage } from '@shared-components/pages/Experience/components/ExperienceSection/ExperienceSection.hook';

// Import ExperienceCarouselContainer from Experience page styles (Corrected path again)
import { ExperienceCarouselContainer } from '../../../../Experience.styles';

// --- Local Styled Components --- 

// Styled component for content area padding
const PaddedContent = styled.div`
  padding: 0 1rem 1rem 1rem; // Consistent padding
  margin-top: 0; // Remove top margin, header provides spacing
`;

// Styled component for the date pill on mobile
const DatePill = styled.span`
  display: inline-block;
  padding: 2px 8px;
  font-size: 0.75rem; // Slightly smaller than metadata lines
  font-weight: 600; // Bold
  border-radius: 12px; // Pill shape
  background-color: var(--mantine-color-gray-1); // Light gray background
  color: var(--mantine-color-gray-7); // Darker gray text
  line-height: 1.4;
  flex-shrink: 0; // Prevent shrinking
`;

// Helper function to format dates for mobile
const formatMobileDate = (startDateStr?: string, endDateStr?: string): string | null => {
    if (!startDateStr) return null;

    const currentYear = new Date().getFullYear();
    const startYearMatch = startDateStr.match(/\b(\d{4})\b/);
    const startYear = startYearMatch ? parseInt(startYearMatch[1], 10) : null;

    let endYear: number | null = null;
    if (endDateStr && endDateStr !== 'Present') {
        const endYearMatch = endDateStr.match(/\b(\d{4})\b/);
        endYear = endYearMatch ? parseInt(endYearMatch[1], 10) : null;
    } else if (endDateStr === 'Present') {
        endYear = currentYear;
    }

    if (!startYear) return startDateStr; // Fallback if year extraction fails

    // If no end date or end date is present, show start year - Present
    if (!endYear || endDateStr === 'Present') {
        return `${startYear} – Present`;
    }

    // If start and end year are same or consecutive, show only start year
    if (endYear === startYear || endYear === startYear + 1) {
        return `${startYear}`;
    }

    // Otherwise, show the full range (e.g., 2015 – 2019)
    return `${startYear} – ${endYear}`;
};

export const EducationItemDisplay: React.FC<EducationItemDisplayProps> = ({
    educationItem: edu,
    // renderLogo, // Removed unused prop
    onImageClick,
    id, // <-- Get id prop
    useMobileCarousel = false, // Destructure and default the prop again
}) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    // Prepare metadata lines for EntityHeader
    const metadata = [];
    const degreeAndField = `${edu.degree || ''}${edu.degree && edu.fieldOfStudy ? ', ' : ''}${edu.fieldOfStudy || ''}`.trim();
    // Use helper for mobile date, keep full date for desktop
    const mobileDateDisplay = formatMobileDate(edu.startDate, edu.endDate);
    const desktopDateDisplay = (edu.startDate || edu.endDate) ? `${edu.startDate || ''} - ${edu.endDate || 'Present'}` : null;
    if (degreeAndField) {
        metadata.push(degreeAndField);
    }
    if (desktopDateDisplay) {
        metadata.push(desktopDateDisplay);
    }

    // Common content rendering logic
    const renderContent = () => {
        const hasMedia = edu.media && edu.media.length > 0;
        const showCarousel = isMobile && useMobileCarousel && hasMedia;

        return (
            (edu.description || hasMedia) && (
                <PaddedContent>
                    {edu.description && (
                        <MarkdownRenderer
                            content={edu.description}
                            compact={true}
                            useIconBullets={true}
                        />
                    )}
                    {/* Conditionally render ContentCarousel or MediaRow */}
                    {showCarousel ? (
                        <ExperienceCarouselContainer>
                            <ContentCarousel>
                                {edu.media?.map((mediaItem: MediaItem, mediaIndex: number) => (
                                    <MediaItemRenderer
                                        key={`carousel-media-${edu.school}-${mediaIndex}`}
                                        mediaItem={mediaItem}
                                        job={edu as any}
                                        index={0}
                                        mediaIndex={mediaIndex}
                                        jobMediaLength={edu.media?.length || 0}
                                        setModalImage={onImageClick as any}
                                        isMobileLayout={isMobile}
                                    />
                                ))}
                            </ContentCarousel>
                        </ExperienceCarouselContainer>
                    ) : hasMedia && (
                        <MediaRow style={{ marginTop: edu.description ? '1rem' : '0' }}>
                            {edu.media?.map((mediaItem: MediaItem, mediaIndex: number) => (
                                <MediaItemRenderer
                                    key={`media-${edu.school}-${mediaIndex}`}
                                    mediaItem={mediaItem}
                                    job={edu as any}
                                    index={0}
                                    mediaIndex={mediaIndex}
                                    jobMediaLength={edu.media?.length || 0}
                                    setModalImage={onImageClick as any}
                                    isMobileLayout={isMobile}
                                />
                            ))}
                        </MediaRow>
                    )}
                </PaddedContent>
            )
        );
    };

    return (
        <ProjectCardContainer $halfWidth={false} id={id}>
            {isMobile ? (
                // --- Custom Mobile Layout --- 
                <>
                    <div style={{ padding: '16px 8px 12px' /* Removed borderBottom & marginBottom */ }}>
                        {/* Top Row: Title and Date */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <EntityTitle style={{ fontSize: '1.1rem', flexGrow: 1, marginRight: '8px' }}>{edu.school}</EntityTitle>
                            {mobileDateDisplay &&
                                // Use the DatePill component
                                <DatePill>
                                    {mobileDateDisplay}
                                </DatePill>
                            }
                        </div>
                        {/* Middle Row: Logo and Degree/Field */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ flexShrink: 0 }}>
                                <ProjectLogo
                                    name={edu.school}
                                    logoPath={edu.logoPath}
                                    size={50}
                                    showBorder={true}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {degreeAndField && (
                                    <MetadataLine>
                                        <span style={{ fontSize: '0.8rem' }}>
                                            {degreeAndField}
                                        </span>
                                    </MetadataLine>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Description and Media rendered after the header block via renderContent */}
                </>
            ) : (
                // --- Desktop Layout (using EntityHeader) --- 
                <EntityHeader
                    title={edu.school}
                    logoPath={edu.logoPath}
                    // Use the showBorder value directly from the education item data
                    showLogoBorder={edu.showBorder}
                    metadataLines={[degreeAndField, desktopDateDisplay].filter(Boolean) as string[]}
                    logoSize={50} // Original logo size for desktop
                />
            )}

            {/* Call renderContent AFTER the conditional header logic */}
            {renderContent()}

        </ProjectCardContainer>
    );
}; 