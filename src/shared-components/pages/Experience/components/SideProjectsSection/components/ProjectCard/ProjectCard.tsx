import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaGithub } from 'react-icons/fa';
import '@mantine/carousel/styles.css';
import { TechIcon } from '@shared-components/atoms/TechIcon';
import { ProjectLogo } from '@shared-components/atoms/ProjectLogo';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { ContentCarousel } from '@shared-components/organisms/ContentCarousel';
import { MediaRenderer } from '../MediaRenderer';
import { TechnologyList } from '@shared-components/pages/Experience/components/ExperienceSection/components/TechnologyList/TechnologyList';
import { EntityHeader } from '@shared-components/molecules/EntityHeader';
import * as S from './ProjectCard.styles';
import { Title as EntityTitle, MetadataLine } from '@shared-components/molecules/EntityHeader/EntityHeader.styles';
import { ProjectCategory, MediaItem as LocalMediaItem } from '../../SideProjectsSection.types';
import { SideProject, MediaItem as ParentMediaItem } from '../../../../Experience.types';
import Image from 'next/image';
import {
    ProjectCardContainer,
    ProjectDescription,
    ProjectImpact,
    ProjectLinks,
    CategoryPill
} from './ProjectCard.styles';
// Import ExperienceCarouselContainer from Experience page styles (Corrected path)
import { ExperienceCarouselContainer } from '../../../../Experience.styles';
import { Box } from '@mantine/core';
import { MediaRow } from '../../../ExperienceSection/styles/Media.styles';

// Helper function to format project dates
const formatProjectDate = (startDateStr?: string, endDateStr?: string): string | null => {
    if (!startDateStr) return null;

    const startYearMatch = startDateStr.match(/\b(\d{4})\b/);
    const startYear = startYearMatch ? parseInt(startYearMatch[1], 10) : null;

    let endYear: number | null = null;
    if (endDateStr && endDateStr !== 'Present') {
        const endYearMatch = endDateStr.match(/\b(\d{4})\b/);
        endYear = endYearMatch ? parseInt(endYearMatch[1], 10) : null;
    } else if (endDateStr === 'Present') {
        // If end date is Present, we don't shorten, always show full range
        return `${startDateStr} - Present`;
    }

    // If start or end year couldn't be extracted, or no end date, return original range
    if (!startYear || !endYear) {
        return `${startDateStr} - ${endDateStr || 'N/A'}`;
    }

    // If start and end year are the same, show only the start year
    if (endYear === startYear) {
        return `${startYear}`;
    }

    // Otherwise, return the full original range (could also format to Year - Year here)
    // For now, return original strings for flexibility
    return `${startDateStr} - ${endDateStr}`;
};

interface ProjectCardProps {
    project: SideProject;
    onImageClick: (image: ParentMediaItem) => void;
    showTechLabels?: boolean;
    id?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    onImageClick,
    showTechLabels = true,
    id
}) => {
    const renderTechnologies = () => (
        project.technologies && project.technologies.length > 0 && (
            <TechnologyList
                technologies={project.technologies}
                showLabels={showTechLabels}
                headerMargin="0 0 6px 8px"
            />
        )
    );

    const renderHeader = () => {
        const isMobileLayout = !showTechLabels;

        // --- Prepare Common Data --- 
        // Use the new helper function for date formatting
        const dateLine = formatProjectDate(project.startDate, project.endDate);
        const repoLinkNode = project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: '#0073b1',
                    textDecoration: 'none',
                    fontSize: '0.85rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
                <FaGithub /> Repository
            </a>
        ) : null;
        const categoryNode = project.category ? (
            <CategoryPill $category={project.category as ProjectCategory}>
                {project.category}
            </CategoryPill>
        ) : null;

        if (isMobileLayout) {
            return (
                <div style={{ padding: '16px 8px 12px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <EntityTitle style={{ fontSize: '1.1rem', flexGrow: 1, marginRight: '8px' }}>{project.title}</EntityTitle>
                        {categoryNode && <div style={{ flexShrink: 0 }}>{categoryNode}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ flexShrink: 0 }}>
                            <ProjectLogo
                                name={project.title}
                                logoPath={project.logoPath}
                                size={50}
                                showBorder={project.showBorder}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {dateLine && <MetadataLine>{dateLine}</MetadataLine>}
                            {repoLinkNode && <MetadataLine>{repoLinkNode}</MetadataLine>}
                        </div>
                    </div>
                </div>
            );
        }

        // --- Desktop Layout (using EntityHeader) --- 
        const metadata: React.ReactNode[] = [];
        if (dateLine) metadata.push(dateLine);
        if (repoLinkNode) metadata.push(repoLinkNode); // Repo link is part of metadata on desktop

        return (
            <EntityHeader
                title={project.title}
                logoPath={project.logoPath}
                showLogoBorder={project.showBorder}
                metadataLines={metadata}
                topRightAccessory={categoryNode}
                isMobileLayout={isMobileLayout}
                logoSize={50}
            />
        );
    };

    const renderDescription = () => (
        <ProjectDescription
            className={`project-description ${project.title === 'Prompt Forge' ? 'prompt-forge-description' : ''}`}>
            <MarkdownRenderer content={project.description} compact={true} />
        </ProjectDescription>
    );

    const renderImpact = () => (
        project.impact && (
            <ProjectImpact className="project-impact">
                <MarkdownRenderer content={project.impact} compact={true} />
            </ProjectImpact>
        )
    );

    const renderLinks = () => (
        project.url && (
            <ProjectLinks className="project-links">
                <S.ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                    <FaGlobe /> Live Demo
                </S.ProjectLink>
            </ProjectLinks>
        )
    );

    const renderMedia = (isHalfWidthContext: boolean) => {
        const projectMedia = (project.media || []) as LocalMediaItem[];
        const isMobileLayout = !showTechLabels;

        const renderSingleMediaItem = (mediaItem: LocalMediaItem, mediaIndex: number) => (
            <MediaRenderer
                key={`media-${project.title}-${mediaIndex}`}
                media={[mediaItem as ParentMediaItem]}
                project={project}
                onImageClick={onImageClick as (image: ParentMediaItem) => void}
                isHalfWidthContext={isHalfWidthContext}
                isMobileLayout={isMobileLayout}
            />
        );

        if (isMobileLayout) {
            if (projectMedia.length > 1) {
                return (
                    <ExperienceCarouselContainer style={{ marginBottom: '1rem' }}>
                        <ContentCarousel scrollIntoViewOnSelect={true}>
                            {projectMedia.map((item, idx) => (
                                renderSingleMediaItem(item, idx)
                            ))}
                        </ContentCarousel>
                    </ExperienceCarouselContainer>
                );
            } else if (projectMedia.length === 1) {
                return renderSingleMediaItem(projectMedia[0] as LocalMediaItem, 0);
            } else {
                return null;
            }
        }

        return (
            <MediaRow>
                {projectMedia.map((item, idx) => (
                    <Box key={`media-${project.title}-${idx}`} pt="sm">
                        {renderSingleMediaItem(item, idx)}
                    </Box>
                ))}
            </MediaRow>
        );
    };

    return (
        <ProjectCardContainer $halfWidth={project.halfWidth || false} id={id}>
            {renderTechnologies()}
            {renderHeader()}
            {renderDescription()}
            {renderImpact()}
            {renderLinks()}
            {renderMedia(project.halfWidth || false)}
        </ProjectCardContainer>
    );
}; 