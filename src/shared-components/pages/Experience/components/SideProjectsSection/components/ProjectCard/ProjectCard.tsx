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

interface ProjectCardProps {
    project: SideProject;
    onImageClick: (image: MediaItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onImageClick }) => {
    const renderTechnologies = () => (
        project.technologies && project.technologies.length > 0 && (
            <S.TechnologiesList className="technologies-list">
                {project.technologies.map((tech: string) => (
                    <S.TechnologyItem key={tech}>
                        <TechIcon
                            name={tech}
                            size={20}
                            showLabel={true}
                            labelPosition="right"
                            showTooltip={true}
                        />
                    </S.TechnologyItem>
                ))}
            </S.TechnologiesList>
        )
    );

    const renderHeader = () => (
        <S.ProjectHeader className="project-header">
            <S.HeaderLeft>
                <ProjectLogo
                    name={project.title}
                    logoPath={project.logoPath}
                    size={50}
                    initialsCount={2}
                    showBorder={project.showBorder}
                />
                <S.HeaderContent>
                    <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    <S.HeaderDateRow>
                        {(project.startDate || project.endDate) && (
                            <S.HeaderDate>
                                {project.startDate || 'N/A'} - {project.endDate || 'Present'}
                            </S.HeaderDate>
                        )}
                        {project.repoUrl && (
                            <S.HeaderRepoLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                <FaGithub /> Repository
                            </S.HeaderRepoLink>
                        )}
                    </S.HeaderDateRow>
                </S.HeaderContent>
            </S.HeaderLeft>
            {project.category && (
                <CategoryPill $category={project.category as ProjectCategory}>
                    {project.category}
                </CategoryPill>
            )}
        </S.ProjectHeader>
    );

    const renderDescription = () => (
        <S.ProjectDescription
            className={`project-description ${project.title === 'Prompt Forge' ? 'prompt-forge-description' : ''}`}>
            <MarkdownRenderer content={project.description} compact={true} />
        </S.ProjectDescription>
    );

    const renderImpact = () => (
        project.impact && (
            <S.ProjectImpact>
                <MarkdownRenderer content={project.impact} compact={true} />
            </S.ProjectImpact>
        )
    );

    const renderLinks = () => (
        <S.ProjectLinks>
            {project.url && (
                <S.ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                    <FaGlobe /> Live Demo
                </S.ProjectLink>
            )}
        </S.ProjectLinks>
    );

    const renderMedia = (isHalfWidth: boolean) => (
        project.media && project.media.length > 0 && (
            <MediaRenderer
                media={project.media}
                project={project}
                onImageClick={onImageClick}
                isHalfWidthContext={isHalfWidth}
            />
        )
    );

    // Render half-width card
    if (project.halfWidth) {
        return (
            <S.ProjectCardContainer $halfWidth={true}>
                {renderTechnologies()}
                {renderHeader()}
                {renderDescription()}
                {renderImpact()}
                {renderLinks()}
                {renderMedia(true)}
            </S.ProjectCardContainer>
        );
    }

    // Render full-row card
    return (
        <S.ProjectCardContainer $halfWidth={false}>
            {renderTechnologies()}
            {renderHeader()}
            <div className="project-content">
                <div className="project-main">
                    {renderDescription()}
                    {renderImpact()}
                    {renderLinks()}
                </div>
                <div className="project-media">
                    {renderMedia(false)}
                </div>
            </div>
        </S.ProjectCardContainer>
    );
}; 