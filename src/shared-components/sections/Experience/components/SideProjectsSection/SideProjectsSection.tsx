import React, { useState } from 'react';
import { FaGlobe, FaGithub } from 'react-icons/fa';
import { PROJECT_CATEGORIES, SECTION_TITLE, SIDE_PROJECTS } from './SideProjectsSection.constants';
import { SideProject, SideProjectsSectionProps } from './SideProjectsSection.types';
import * as S from './SideProjectsSection.styles';
import { TechIcon } from '../../../../atoms/TechIcon';
import { ProjectLogo } from '../../../../atoms/ProjectLogo';

export const SideProjectsSection: React.FC<SideProjectsSectionProps> = ({ 
  projects = SIDE_PROJECTS, 
  title = SECTION_TITLE,
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  
  // Filter projects based on the selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  const handleCategoryChange = (category: string | 'All') => {
    setSelectedCategory(category);
  };

  const renderMedia = (project: SideProject) => {
    if (!project.media || project.media.length === 0) return null;

    return (
      <S.MediaContainer>
        {project.media.map((item, index) => (
          <S.MediaItem key={`${project.title}-media-${index}`}>
            {item.title && <S.MediaTitle>{item.title}</S.MediaTitle>}
            {item.type === 'image' ? (
              <S.MediaImage 
                src={item.url} 
                alt={item.title || project.title} 
              />
            ) : item.type === 'video' ? (
              <S.MediaVideo 
                src={item.url}
                controls
                poster={item.thumbnail}
              />
            ) : (
              // Display PDF or other types as a link
              <S.ProjectLink href={item.url} target="_blank" rel="noopener noreferrer">
                View {item.title || 'Document'}
              </S.ProjectLink>
            )}
          </S.MediaItem>
        ))}
      </S.MediaContainer>
    );
  };

  return (
    <S.SideProjectsContainer className={className}>
      <h2>{title}</h2>
      
      {/* Category filters */}
      <S.FiltersContainer>
        <S.FilterButton 
          active={selectedCategory === 'All'} 
          onClick={() => handleCategoryChange('All')}
        >
          All
        </S.FilterButton>
        
        {PROJECT_CATEGORIES.map(category => (
          <S.FilterButton 
            key={category}
            active={selectedCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </S.FilterButton>
        ))}
      </S.FiltersContainer>
      
      {/* Projects grid */}
      <S.ProjectsGrid>
        {filteredProjects.map((project, index) => (
          <S.ProjectCard key={`${project.title}-${index}`}>
            <S.ProjectHeader>
              <ProjectLogo 
                name={project.title} 
                logoPath={project.logoPath} 
                size={50}
                initialsCount={2}
              />
              <S.ProjectTitle>{project.title}</S.ProjectTitle>
            </S.ProjectHeader>
            
            <S.ProjectDescription>{project.description}</S.ProjectDescription>
            
            <S.ProjectMeta>
              {(project.startDate || project.endDate) && (
                <S.ProjectDates>
                  {project.startDate || 'N/A'} - {project.endDate || 'Present'}
                </S.ProjectDates>
              )}
            </S.ProjectMeta>
            
            {project.impact && (
              <S.ProjectImpact>{project.impact}</S.ProjectImpact>
            )}
            
            {project.technologies && project.technologies.length > 0 && (
              <S.TechnologiesList>
                {project.technologies.map(tech => (
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
            )}
            
            <S.ProjectLinks>
              {project.url && (
                <S.ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                  <FaGlobe /> Live Demo
                </S.ProjectLink>
              )}
              {project.repoUrl && (
                <S.ProjectLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Repository
                </S.ProjectLink>
              )}
            </S.ProjectLinks>
            
            {renderMedia(project)}
          </S.ProjectCard>
        ))}
      </S.ProjectsGrid>
    </S.SideProjectsContainer>
  );
};

export default SideProjectsSection; 