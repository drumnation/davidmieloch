import React from 'react';
import { FaGlobe, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { TechIcon } from '@shared-components/atoms/TechIcon';
import { ProjectLogo } from '@shared-components/atoms/ProjectLogo';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { MediaRenderer } from '../MediaRenderer';
import * as S from './ProjectCard.styles.ts';
import { ProjectCategory, MediaItem as LocalMediaItem } from '../../SideProjectsSection.types';
import { SideProject, MediaItem as ParentMediaItem } from '../../../../Experience.types';
import Image from 'next/image';
import {
    ProjectCardContainer,
    ProjectHeader,
    HeaderLeft,
    HeaderContent,
    ProjectTitle,
    HeaderDateRow,
    HeaderDate,
    HeaderRepoLink,
    ProjectDescription,
    ProjectImpact,
    ProjectLinks,
    CategoryPill
} from './ProjectCard.styles.ts';

interface ProjectCardProps {
    project: SideProject;
    onImageClick: (image: ParentMediaItem) => void;
    showTechLabels?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    onImageClick,
    showTechLabels = true
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
            <HeaderLeft>
                <ProjectLogo
                    name={project.title}
                    logoPath={project.logoPath}
                    size={50}
                    initialsCount={2}
                    showBorder={project.showBorder}
                />
                <HeaderContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
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
                </HeaderContent>
            </HeaderLeft>
            {project.category && (
                <CategoryPill $category={project.category as ProjectCategory}>
                    {project.category}
                </CategoryPill>
            )}
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

    const renderMedia = (isHalfWidthContext: boolean) => {
        const projectMedia = (project.media || []) as LocalMediaItem[];
        const isMobileLayout = !showTechLabels;

        const carouselItems = projectMedia.filter(item => item.useMobileCarousel);
        const regularItems = projectMedia.filter(item => !item.useMobileCarousel);

        const renderSingleMediaItem = (mediaItem: LocalMediaItem, mediaIndex: number) => (
            <MediaRenderer
                key={`media-${project.title}-${mediaIndex}`}
                media={[mediaItem as ParentMediaItem]}
                project={project}
                onImageClick={onImageClick as (image: ParentMediaItem) => void}
                isHalfWidthContext={isHalfWidthContext}
            />
        );

        if (isMobileLayout) {
            return (
                <>
                    {carouselItems.length > 0 && (
                        <Carousel
                            slideSize="100%"
                            align="start"
                            withIndicators
                            loop
                            nextControlIcon={<FaChevronRight size={16} />}
                            previousControlIcon={<FaChevronLeft size={16} />}
                            styles={{
                                control: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    border: 'none',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    '&[data-inactive]': { opacity: 0.3, cursor: 'default' },
                                    '&:not([data-inactive]):hover': { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
                                },
                                indicator: {
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    transition: 'width 250ms ease',
                                    '&[data-active]': { width: '16px', backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                                },
                                indicators: { bottom: '-5px' }
                            }}
                            style={{ marginBottom: regularItems.length > 0 ? '1rem' : '0' }}
                        >
                            {carouselItems.map((item, idx) => (
                                <Carousel.Slide key={`carousel-slide-${project.title}-${idx}`}>
                                    {renderSingleMediaItem(item, projectMedia.findIndex(m => m === item))}
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    )}
                    {regularItems.map((item, idx) =>
                        renderSingleMediaItem(item, projectMedia.findIndex(m => m === item))
                    )}
                </>
            );
        }

        return (
            <MediaRenderer
                media={projectMedia as ParentMediaItem[]}
                project={project}
                onImageClick={onImageClick as (image: ParentMediaItem) => void}
                isHalfWidthContext={isHalfWidthContext}
            />
        );
    };

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

    return (
        <ProjectCardContainer $halfWidth={false}>
            {renderTechnologies()}
            {renderHeader()}
            {renderDescription()}
            {renderImpact()}
            {renderLinks()}
            {renderMedia(false)}
        </ProjectCardContainer>
    );
}; 