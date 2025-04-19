import React from 'react';
import { FaGlobe, FaGithub } from 'react-icons/fa';
import { TechIcon } from '@shared-components/atoms/TechIcon'; // Corrected path alias
import { ProjectLogo } from '@shared-components/atoms/ProjectLogo'; // Corrected path alias
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer'; // Corrected path alias
import { MediaRenderer } from '../MediaRenderer'; // Ensure correct path
import * as S from './ProjectCard.styles.ts';
import { CategoryPill } from '../../SideProjectsSection.styles';
import { ProjectCategory } from '../../SideProjectsSection.types';
import { SideProject, MediaItem } from '../../../../Experience.types';
import Image from 'next/image';
import {
    ProjectCardContainer,
    ProjectHeader,
    ProjectTitle,
    HeaderDateRow,
    HeaderDate,
    HeaderRepoLink,
    ProjectMetaContainer,
    ProjectContentWrapper,
    ProjectMainContent,
    ProjectMediaContent,
    ProjectDescription,
    ProjectImpact,
    ProjectLinks
} from './ProjectCard.styles.ts';

interface ProjectCardProps {
    project: SideProject;
    onImageClick: (image: MediaItem) => void;
    showTechLabels?: boolean; // Added optional prop
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    onImageClick,
    showTechLabels = true // Default to true if not provided
}) => {
    const renderTechnologies = () => (
        project.technologies && project.technologies.length > 0 && (
            <S.TechnologiesList className="technologies-list">
                {project.technologies.map((tech: string) => (
                    <S.TechnologyItem key={tech}>
                        <TechIcon
                            name={tech}
                            size={20}
                            showLabel={showTechLabels}
                            labelPosition="right"
                            showTooltip={true}
                        />
                    </S.TechnologyItem>
                ))}
            </S.TechnologiesList>
        )
    );

    const renderHeader = () => (
        <ProjectHeader className="project-header">
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectLogo
                name={project.title}
                logoPath={project.logoPath}
                size={50}
                initialsCount={2}
                showBorder={project.showBorder}
            />
            <ProjectMetaContainer>
                {(project.startDate || project.endDate || project.repoUrl) && (
                    <HeaderDateRow>
                        {(project.startDate || project.endDate) && (
                            <HeaderDate>
                                {project.startDate || 'N/A'} - {project.endDate || 'Present'}
                            </HeaderDate>
                        )}
                        {project.repoUrl && (
                            <HeaderRepoLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                <FaGithub /> Repository
                            </HeaderRepoLink>
                        )}
                    </HeaderDateRow>
                )}
                {project.category && (
                    <CategoryPill $category={project.category as ProjectCategory}>
                        {project.category}
                    </CategoryPill>
                )}
            </ProjectMetaContainer>
        </ProjectHeader>
    );

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

    const renderMedia = (isHalfWidthContext: boolean) => (
        project.media && project.media.length > 0 && (
            <MediaRenderer
                media={project.media}
                project={project}
                onImageClick={onImageClick}
                isHalfWidthContext={isHalfWidthContext}
            />
        )
    );

    // Render half-width card
    if (project.halfWidth) {
        return (
            <ProjectCardContainer $halfWidth={true}>
                {renderTechnologies()}
                {renderHeader()}
                {renderDescription()}
                {renderImpact()}
                {renderLinks()}
                {renderMedia(true)}
            </ProjectCardContainer>
        );
    }

    // Render full-row card
    return (
        <ProjectCardContainer $halfWidth={false}>
            {renderTechnologies()}
            {renderHeader()}
            <ProjectContentWrapper>
                <ProjectMainContent>
                    {renderDescription()}
                    {renderImpact()}
                    {renderLinks()}
                </ProjectMainContent>
                <ProjectMediaContent>
                    {renderMedia(false)}
                </ProjectMediaContent>
            </ProjectContentWrapper>
        </ProjectCardContainer>
    );
}; 