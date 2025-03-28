import React, { useState, useMemo } from 'react';
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
  const [selectedTech, setSelectedTech] = useState<string | 'All'>('All');
  
  // Extract unique technologies from all projects
  const uniqueTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    techSet.add('All');
    
    projects.forEach(project => {
      if (project.technologies && project.technologies.length > 0) {
        project.technologies.forEach(tech => {
          techSet.add(tech);
        });
      }
    });
    
    return Array.from(techSet).sort();
  }, [projects]);
  
  // Filter and sort projects based on selected category, technology, and dates
  const filteredProjects = useMemo(() => {
    // First, filter projects
    const filtered = projects.filter(project => {
      // Filter by category
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      
      // Filter by technology
      const matchesTech = selectedTech === 'All' || 
        (project.technologies && project.technologies.includes(selectedTech));
      
      // Project must match both filters
      return matchesCategory && matchesTech;
    });
    
    // Then sort projects
    return filtered.sort((a, b) => {
      // 1. Prioritize projects with end dates over those without
      const hasEndDateA = !!a.endDate;
      const hasEndDateB = !!b.endDate;
      
      if (hasEndDateA && !hasEndDateB) return -1;
      if (!hasEndDateA && hasEndDateB) return 1;
      
      // 2. For projects with end dates, sort by most recent first
      if (hasEndDateA && hasEndDateB) {
        // Handle "Present" as highest priority
        if (a.endDate === 'Present' && b.endDate !== 'Present') return -1;
        if (a.endDate !== 'Present' && b.endDate === 'Present') return 1;
        
        // If both have year end dates, compare numerically
        if (a.endDate !== 'Present' && b.endDate !== 'Present') {
          const yearA = a.endDate ? parseInt(a.endDate) : 0;
          const yearB = b.endDate ? parseInt(b.endDate) : 0;
          
          if (yearA !== yearB) {
            return yearB - yearA; // Most recent first
          }
        }
        
        // If both are "Present" or same year, sort alphabetically by title
        return a.title.localeCompare(b.title);
      }
      
      // 3. If neither has end dates, sort alphabetically by title
      return a.title.localeCompare(b.title);
    });
  }, [projects, selectedCategory, selectedTech]);
  
  const handleCategoryChange = (category: string | 'All') => {
    setSelectedCategory(category);
  };
  
  const handleTechChange = (tech: string | 'All') => {
    setSelectedTech(tech);
  };

  const renderMedia = (project: SideProject) => {
    if (!project.media || project.media.length === 0) return null;

    return (
      <S.MediaContainer>
        {project.media?.map((item, index) => {
          // Check if this is a media item specifically set for special layouts
          const isQuarterWidth = item.width === '23.5%';
          const isThirdWidth = item.width === '31.33%';
          // Handle percentage-based widths (like 48% for 2-column layout)
          const isPercentageWidth = item.width && item.width.includes('%');
          const isSpecialLayout = isQuarterWidth || isThirdWidth || isPercentageWidth;
          
          // For default sizing, use normal isWide logic
          const isWide = !isSpecialLayout && 
            (item.width === 'full' || item.width === '100%' || project.media?.length === 1);
          
          // Determine if we're in a half-width card context
          const isHalfWidthCard = project.halfWidth === true;
          // For half-width cards, we need to adjust how media items are displayed
          const adjustedStyle = isSpecialLayout 
            ? { width: item.width } 
            : isHalfWidthCard && item.width 
              ? { width: '100%' } // Force full width within half cards regardless of specified width
              : {};
          
          return (
            <S.MediaItem 
              key={`${project.title}-media-${index}`}
              style={adjustedStyle}
              className={
                isQuarterWidth 
                  ? "quarter-width-image" 
                  : isThirdWidth 
                    ? "third-width-image" 
                    : isWide || isHalfWidthCard ? "full-width" : ""
              }
            >
              {/* Only show MediaTitle for non-link type media */}
              {item.title && item.type !== 'link' && <S.MediaTitle>{item.title}</S.MediaTitle>}
              
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
              ) : item.type === 'embed' ? (
                <S.MediaEmbed>
                  <iframe
                    src={item.url}
                    title={item.title || `${project.title} embed`}
                    height={item.height || 400}
                    width="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </S.MediaEmbed>
              ) : item.type === 'link' ? (
                <S.LinkContainer>
                  <div className="link-thumbnail">
                    {item.thumbnail ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title || "Blog post"} 
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <div className="link-placeholder">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="48" rx="8" fill="#3366cc" />
                          <path d="M14 16H34C35.1 16 36 16.9 36 18V30C36 31.1 35.1 32 34 32H14C12.9 32 12 31.1 12 30V18C12 16.9 12.9 16 14 16ZM14 30H34V18H14V30Z" fill="white"/>
                          <path d="M20 20H28V24H20V20Z" fill="white"/>
                          <path d="M16 34H32V36H16V34Z" fill="white"/>
                          <path d="M16 38H32V40H16V38Z" fill="white"/>
                        </svg>
                        <span className="placeholder-text">Blog Post Preview</span>
                      </div>
                    )}
                  </div>
                  <div className="link-content">
                    <h4 className="link-title">{item.title}</h4>
                    {item.description && (
                      <p className="link-description">{item.description}</p>
                    )}
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-button"
                    >
                      {item.buttonText || "View Article"}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6667 12.6667H3.33333V3.33333H8V2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V8H12.6667V12.6667ZM9.33333 2V3.33333H11.7267L5.17333 9.88667L6.11333 10.8267L12.6667 4.27333V6.66667H14V2H9.33333Z" fill="white"/>
                      </svg>
                    </a>
                  </div>
                </S.LinkContainer>
              ) : (
                // Display PDF or other types as a link
                <S.ProjectLink href={item.url} target="_blank" rel="noopener noreferrer">
                  View {item.title || 'Document'}
                </S.ProjectLink>
              )}
            </S.MediaItem>
          );
        })}
      </S.MediaContainer>
    );
  };

  return (
    <S.SideProjectsContainer className={className}>
      <h2>{title}</h2>
      
      {/* Category filters */}
      <S.FiltersSectionTitle>Filter by Category</S.FiltersSectionTitle>
      <S.FiltersContainer>
        <S.FilterButton 
          $active={selectedCategory === 'All'} 
          onClick={() => handleCategoryChange('All')}
        >
          All
        </S.FilterButton>
        
        {PROJECT_CATEGORIES.map(category => (
          <S.FilterButton 
            key={category}
            $active={selectedCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </S.FilterButton>
        ))}
      </S.FiltersContainer>
      
      {/* Technology filters */}
      <S.FiltersSectionTitle>Filter by Technology</S.FiltersSectionTitle>
      <S.TechFiltersContainer>
        <S.TechFilterButton 
          $active={selectedTech === 'All'} 
          onClick={() => handleTechChange('All')}
        >
          All
        </S.TechFilterButton>
        
        {uniqueTechnologies.filter(tech => tech !== 'All').map(tech => (
          <S.TechFilterButton 
            key={tech}
            $active={selectedTech === tech}
            onClick={() => handleTechChange(tech)}
          >
            {tech}
          </S.TechFilterButton>
        ))}
      </S.TechFiltersContainer>
      
      {/* Projects grid */}
      <S.ProjectsGrid>
        {filteredProjects.map((project, index) => 
          project.halfWidth ? (
            <S.ProjectCard key={`${project.title}-${index}`}>
              <S.ProjectHeader>
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
              </S.ProjectHeader>
              
              <S.ProjectDescription>{project.description}</S.ProjectDescription>
              
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
              </S.ProjectLinks>
              
              {renderMedia(project)}
            </S.ProjectCard>
          ) : (
            <S.FullRowProjectCard key={`${project.title}-${index}`}>
              <S.ProjectHeader>
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
              </S.ProjectHeader>
              
              <div className="project-content">
                <div className="project-main">
                  <S.ProjectDescription>{project.description}</S.ProjectDescription>
                  
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
                  </S.ProjectLinks>
                </div>
                
                {project.media && project.media.length > 0 && (
                  <div className="project-media">
                    {renderMedia(project)}
                  </div>
                )}
              </div>
            </S.FullRowProjectCard>
          )
        )}
      </S.ProjectsGrid>
    </S.SideProjectsContainer>
  );
};

export default SideProjectsSection; 