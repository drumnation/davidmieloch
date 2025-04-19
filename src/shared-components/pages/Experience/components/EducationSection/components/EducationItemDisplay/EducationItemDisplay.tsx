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
    EducationDescription,
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
// Import specific layout components from ProjectCard styles
import { ProjectHeader, HeaderLeft, HeaderContent, ProjectTitle, HeaderDateRow, HeaderDate } from '../../../SideProjectsSection/components/ProjectCard/ProjectCard.styles';
// Import a styled component for content padding
import styled from 'styled-components';

// Styled component for content area padding
const PaddedContent = styled.div`
  padding: 0 0 1rem 0; /* Removed horizontal padding, keep bottom padding */
  margin-top: 1rem; /* Space below header */
`;

export const EducationItemDisplay: React.FC<EducationItemDisplayProps> = ({
    educationItem: edu,
    // renderLogo, // Removed unused prop
    onImageClick
}) => {
    // Removed unused renderDefaultLogo function
    // const renderDefaultLogo = () => { ... };

    // TODO: Add structure like .project-content, .project-main, .project-media if needed for styling
    return (
        <PCS.ProjectCardContainer $halfWidth={false}>
            {/* Use ProjectHeader structure */}
            <ProjectHeader>
                <HeaderLeft>
                    <ProjectLogo
                        name={edu.school}
                        logoPath={edu.logoPath}
                        size={50} // Match project card size
                        showBorder={true} // Add the border
                    // Consider adding initialsCount if needed
                    />
                    <HeaderContent>
                        {/* Use ProjectTitle for school name */}
                        <ProjectTitle>{edu.school}</ProjectTitle>
                        {/* Use HeaderDateRow and HeaderDate for degree/dates */}
                        <HeaderDateRow>
                            <HeaderDate>
                                {edu.degree}{edu.degree && edu.fieldOfStudy ? ', ' : ''}{edu.fieldOfStudy}
                            </HeaderDate>
                            <HeaderDate>{edu.startDate} - {edu.endDate}</HeaderDate>
                        </HeaderDateRow>
                    </HeaderContent>
                </HeaderLeft>
                {/* Optional: Add category pill if needed later */}
            </ProjectHeader>

            {/* Wrap description and media in a padded container */}
            <PaddedContent>
                {/* Keep existing description and media rendering for now */}
                {/* Consider using PCS.ProjectDescription if styles match */}
                {edu.description && (
                    <EducationDescription>{edu.description}</EducationDescription>
                )}

                {/* Add margin-top to media if description exists */}
                {edu.media && edu.media.length > 0 && (
                    <MediaRow style={{ marginTop: edu.description ? '1rem' : '0' }}>
                        {edu.media.map((mediaItem: MediaItem, mediaIndex: number) => (
                            <MediaItemDisplay
                                key={`media-${edu.school}-${mediaIndex}`}
                                mediaItem={mediaItem}
                                schoolName={edu.school}
                                onImageClick={onImageClick}
                            />
                        ))}
                    </MediaRow>
                )}
            </PaddedContent>
            {/* Removed EducationContent wrapper as elements are now structured by ProjectHeader etc. */}
        </PCS.ProjectCardContainer> // Changed from EducationItem
    );
}; 