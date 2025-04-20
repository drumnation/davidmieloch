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
// Import specific layout components from ProjectCard styles
import { ProjectHeader, ProjectTitle, HeaderDateRow, HeaderDate } from '../../../SideProjectsSection/components/ProjectCard/ProjectCard.styles';
// Import a styled component for content padding
import styled from 'styled-components';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer'; // Added import
// Import ProjectCardContainer from the correct path
import { ProjectCardContainer } from '../../../SideProjectsSection/components/ProjectCard/ProjectCard.styles';

// Styled component for content area padding
const PaddedContent = styled.div`
  padding: 0 1rem 1rem 1rem; // Add horizontal padding back maybe?
  margin-top: 1rem; 
`;

export const EducationItemDisplay: React.FC<EducationItemDisplayProps> = ({
    educationItem: edu,
    // renderLogo, // Removed unused prop
    onImageClick,
    id, // <-- Get id prop
}) => {
    // Removed unused renderDefaultLogo function
    // const renderDefaultLogo = () => { ... };

    // TODO: Add structure like .project-content, .project-main, .project-media if needed for styling
    return (
        // Apply the ID to the root container
        <ProjectCardContainer $halfWidth={false} id={id}>
            <ProjectHeader>
                <div style={{ marginRight: '1rem', flexShrink: 0 }}>
                    <ProjectLogo
                        name={edu.school}
                        logoPath={edu.logoPath}
                        size={50}
                        showBorder={true}
                    />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <ProjectTitle>{edu.school}</ProjectTitle>
                    <HeaderDateRow>
                        <HeaderDate>
                            {edu.degree}{edu.degree && edu.fieldOfStudy ? ', ' : ''}{edu.fieldOfStudy}
                        </HeaderDate>
                        <HeaderDate>{edu.startDate} - {edu.endDate}</HeaderDate>
                    </HeaderDateRow>
                </div>
            </ProjectHeader>

            <PaddedContent>
                {edu.description && (
                    <MarkdownRenderer content={edu.description} />
                )}
                {edu.media && edu.media.length > 0 && (
                    <MediaRow style={{ marginTop: edu.description ? '1rem' : '0' }}>
                        {edu.media.map((mediaItem: MediaItem, mediaIndex: number) => (
                            <MediaItemDisplay
                                key={`media-${edu.school}-${mediaIndex}`}
                                mediaItem={mediaItem}
                                schoolName={edu.school}
                                onImageClick={onImageClick ?? (() => { })}
                            />
                        ))}
                    </MediaRow>
                )}
            </PaddedContent>
            {/* Removed EducationContent wrapper as elements are now structured by ProjectHeader etc. */}
        </ProjectCardContainer> // Changed from EducationItem
    );
}; 