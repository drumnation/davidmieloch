import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { FaGlobe, FaGithub, FaChevronDown } from 'react-icons/fa';
import { PROJECT_CATEGORIES, SECTION_TITLE, SIDE_PROJECTS } from './SideProjectsSection.constants';
import { SideProject, SideProjectsSectionProps } from './SideProjectsSection.types';
import * as S from './SideProjectsSection.styles';
import { TechIcon } from '../../../../atoms/TechIcon';
import { ProjectLogo } from '../../../../atoms/ProjectLogo';
import { MediaItem } from '../../Experience.types';
import { MarkdownRenderer } from '../../../../molecules/MarkdownRenderer';

export const SideProjectsSection: React.FC<SideProjectsSectionProps> = ({ 
  projects = SIDE_PROJECTS, 
  title = SECTION_TITLE,
  className,
  id,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const [selectedTech, setSelectedTech] = useState<string | 'All'>('All');
  const [modalImage, setModalImage] = useState<MediaItem | null>(null);
  
  // Category filter open by default, technology filter closed by default
  const [categoryFilterOpen, setCategoryFilterOpen] = useState<boolean>(true);
  const [techFilterOpen, setTechFilterOpen] = useState<boolean>(false);
  
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

  // Toggle accordion functions
  const toggleCategoryFilter = () => {
    setCategoryFilterOpen(!categoryFilterOpen);
  };

  const toggleTechFilter = () => {
    setTechFilterOpen(!techFilterOpen);
  };

  // Function to open the modal
  const openModal = (image: MediaItem) => {
    setModalImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null);
  };

  const renderMedia = (media: MediaItem[] | undefined, isHalfWidth = false, project?: SideProject) => {
    if (!media || media.length === 0) return null;
    
    const renderMediaItem = (item: MediaItem, index: number, inGroup = false, groupLayout?: 'default' | 'stack') => {
      const { type, url, title, description, thumbnail, buttonText, width } = item;
      
      // Check if the width is a special case
      const isQuarterWidth = width === 'quarter';
      const isThirdWidth = width === 'third';
      const isPercentageWidth = typeof width === 'string' && width.includes('%');
      
      // Determine if this is in a half-width card
      const isHalfWidthCard = isHalfWidth && !inGroup;
      
      // Adjust style based on context (special layout or half-width card)
      const adjustedStyle: React.CSSProperties = {};
      
      if (isQuarterWidth) {
        adjustedStyle.width = isHalfWidthCard ? '100%' : '25%';
      } else if (isThirdWidth) {
        adjustedStyle.width = isHalfWidthCard ? '100%' : '33.33%';
      } else if (isPercentageWidth) {
        adjustedStyle.width = isHalfWidthCard ? '100%' : width;
      } else if (width && !isHalfWidthCard) {
        adjustedStyle.width = width;
      } else if (isHalfWidthCard) {
        adjustedStyle.width = '100%';
      }
      
      if (type === 'group' && item.items && item.items.length > 0) {
        const itemClass = isQuarterWidth 
          ? 'quarter-width-group' 
          : isThirdWidth 
            ? 'third-width-group' 
            : isHalfWidthCard || width === 'half' 
              ? 'half-width-group' 
              : '';
            
        return (
          <S.MediaGroup 
            key={`media-group-${index}`} 
            className={itemClass}
            $layout={item.layout}
            style={adjustedStyle}
          >
            {item.layout === 'stack' ? (
              <S.MediaGroupContent>
                {item.items.map((nestedItem: MediaItem, nestedIndex: number) => 
                  renderMediaItem(nestedItem, nestedIndex, true, item.layout)
                )}
              </S.MediaGroupContent>
            ) : (
              item.items.map((nestedItem: MediaItem, nestedIndex: number) => 
                renderMediaItem(nestedItem, nestedIndex, true, item.layout)
              )
            )}
          </S.MediaGroup>
        );
      }

      // For links
      if (type === 'link') {
        return (
          <S.MediaItem
            key={`media-link-${index}`}
            className={`${isQuarterWidth ? 'quarter-width-image' : ''} ${isThirdWidth ? 'third-width-image' : ''}`}
            style={adjustedStyle}
          >
            <S.LinkContainer style={{ height: item.customHeight || '150px' }}>
              <div style={{ display: 'flex', flex: 1 }}>
                {thumbnail && (
                  <div className="link-thumbnail" style={{ width: item.thumbnailWidth || '150px' }}>
                    <Image 
                      src={thumbnail} 
                      alt={title || 'Link thumbnail'} 
                      width={150}
                      height={100}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="link-content">
                  {title && (
                    <div className="link-title">
                      {item.showLogo && (item.titleLogoPath || project?.logoPath) && (
                        <Image 
                          src={item.titleLogoPath || project?.logoPath || ''} 
                          alt={`Logo for ${title}`}
                          width={20}
                          height={20}
                          style={{ 
                            width: '20px', 
                            height: '20px', 
                            objectFit: 'contain',
                            marginRight: '8px',
                            borderRadius: item.logoHasBorderRadius === false ? '0' : '6px',
                            overflow: 'visible',
                            backgroundColor: 'transparent',
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            ...(item.logoHasBorder && {
                              border: '1px solid rgba(0, 0, 0, 0.2)',
                              padding: '1px'
                            })
                          }}
                        />
                      )}
                      <span>{title}</span>
                    </div>
                  )}
                  {description && <div className="link-description">
                    <MarkdownRenderer content={description} compact={true} />
                  </div>}
                  <a href={url} target="_blank" rel="noopener noreferrer" className="link-button">
                    {buttonText || 'View'}
                  </a>
                </div>
              </div>
            </S.LinkContainer>
          </S.MediaItem>
        );
      }

      // For images
      if (type === 'image') {
        return (
          <S.MediaItem
            key={`media-image-${index}`}
            className={`${isQuarterWidth ? 'quarter-width-image' : ''} ${isThirdWidth ? 'third-width-image' : ''}`}
            style={{...adjustedStyle, height: item.customHeight || 'auto'}}
          >
            <S.MediaImage 
              src={url} 
              alt={title || 'Project image'} 
              onClick={() => openModal(item)} 
              style={{ cursor: 'pointer', height: item.customHeight ? '100%' : 'auto', objectFit: item.customHeight ? 'cover' : 'contain' }}
            />
            {title && (
              <S.MediaTitle>
                {item.showLogo && (item.titleLogoPath || project?.logoPath) && (
                  <Image 
                    src={item.titleLogoPath || project?.logoPath || ''} 
                    alt={`Logo for ${title}`}
                    width={20}
                    height={20}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      objectFit: 'contain',
                      marginRight: '8px',
                      borderRadius: item.logoHasBorderRadius === false ? '0' : '6px',
                      overflow: 'visible',
                      backgroundColor: 'transparent',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      ...(item.logoHasBorder && {
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        padding: '1px'
                      })
                    }}
                  />
                )}
                {title}
              </S.MediaTitle>
            )}
            {description && <S.MediaDescription>
              <MarkdownRenderer content={description} compact={true} />
            </S.MediaDescription>}
          </S.MediaItem>
        );
      }

      // For videos
      if (type === 'video') {
        return (
          <S.MediaItem
            key={`media-video-${index}`}
            className={`${isQuarterWidth ? 'quarter-width-image' : ''} ${isThirdWidth ? 'third-width-image' : ''}`}
            style={adjustedStyle}
          >
            <S.MediaVideo 
              controls 
              style={{ 
                display: 'block', 
                width: '100%', 
                height: item.customHeight || 'auto' 
              }}
              poster={thumbnail}
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </S.MediaVideo>
            {title && (
              <S.MediaTitle>
                {item.showLogo && (item.titleLogoPath || project?.logoPath) && (
                  <Image 
                    src={item.titleLogoPath || project?.logoPath || ''} 
                    alt={`Logo for ${title}`}
                    width={20}
                    height={20}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      objectFit: 'contain',
                      marginRight: '8px',
                      borderRadius: item.logoHasBorderRadius === false ? '0' : '6px',
                      overflow: 'visible',
                      backgroundColor: 'transparent',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      ...(item.logoHasBorder && {
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        padding: '1px'
                      })
                    }}
                  />
                )}
                {title}
              </S.MediaTitle>
            )}
            {description && <S.MediaDescription>
              <MarkdownRenderer content={description} compact={true} />
            </S.MediaDescription>}
          </S.MediaItem>
        );
      }

      // For audio
      if (type === 'audio') {
        return (
          <S.MediaItem
            key={`media-audio-${index}`}
            className={`${isQuarterWidth ? 'quarter-width-image' : ''} ${isThirdWidth ? 'third-width-image' : ''}`}
            style={adjustedStyle}
          >
            <S.MediaAudio controls>
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </S.MediaAudio>
            <S.AudioInfoContainer>
              {thumbnail && (
                <S.AudioThumbnailContainer style={{ maxWidth: item.thumbnailWidth || '100px' }}>
                  <Image 
                    src={thumbnail} 
                    alt={title || 'Audio thumbnail'} 
                    width={100}
                    height={100}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </S.AudioThumbnailContainer>
              )}
              <div className="audio-text-content">
                {title && (
                  <S.MediaTitle style={{ marginTop: 0 }}>
                    {item.showLogo && (item.titleLogoPath || project?.logoPath) && (
                      <Image 
                        src={item.titleLogoPath || project?.logoPath || ''} 
                        alt={`Logo for ${title}`}
                        width={20}
                        height={20}
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          objectFit: 'contain',
                          marginRight: '8px',
                          borderRadius: item.logoHasBorderRadius === false ? '0' : '6px',
                          overflow: 'visible',
                          backgroundColor: 'transparent',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          ...(item.logoHasBorder && {
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            padding: '1px'
                          })
                        }}
                      />
                    )}
                    {title}
                  </S.MediaTitle>
                )}
                {description && <S.MediaDescription style={{ padding: 0 }}>
                  <MarkdownRenderer content={description} compact={true} />
                </S.MediaDescription>}
              </div>
            </S.AudioInfoContainer>
          </S.MediaItem>
        );
      }

      // For embeds
      if (type === 'embed') {
        return (
          <S.MediaItem
            key={`media-embed-${index}`}
            className={`${isQuarterWidth ? 'quarter-width-image' : ''} ${isThirdWidth ? 'third-width-image' : ''}`}
            style={adjustedStyle}
          >
            {item.cropHeight ? (
              <S.CroppedMediaEmbed $cropHeight={item.cropHeight}>
                <iframe
                  src={url}
                  title={title || 'Embedded content'}
                  height={item.height || 400}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </S.CroppedMediaEmbed>
            ) : (
              <S.MediaEmbed>
                <iframe
                  src={url}
                  title={title || 'Embedded content'}
                  height={item.height || 400}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </S.MediaEmbed>
            )}
            {title && (
              <S.MediaTitle>
                {item.showLogo && (item.titleLogoPath || project?.logoPath) && (
                  <Image 
                    src={item.titleLogoPath || project?.logoPath || ''} 
                    alt={`Logo for ${title}`}
                    width={20}
                    height={20}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      objectFit: 'contain',
                      marginRight: '8px',
                      borderRadius: item.logoHasBorderRadius === false ? '0' : '6px',
                      overflow: 'visible',
                      backgroundColor: 'transparent',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      ...(item.logoHasBorder && {
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        padding: '1px'
                      })
                    }}
                  />
                )}
                {title}
              </S.MediaTitle>
            )}
            {description && <S.MediaDescription>
              <MarkdownRenderer content={description} compact={true} />
            </S.MediaDescription>}
          </S.MediaItem>
        );
      }

      // For PDFs
      if (type === 'pdf') {
        // Using direct PDF URL for modern browsers that support PDF viewing
        return (
          <S.MediaItem
            key={`media-pdf-${index}`}
            className={`${isQuarterWidth ? 'quarter-width-image' : ''} ${isThirdWidth ? 'third-width-image' : ''}`}
            style={adjustedStyle}
          >
            <S.PDFViewer>
              <iframe
                src={url}
                title={title || 'PDF document'}
                height={item.height || 600}
                style={{ width: '100%', border: 'none' }}
                frameBorder="0"
              />
              <div className="pdf-fallback">
                <p>If the PDF viewer doesn't load, you can <a href={url} target="_blank" rel="noopener noreferrer">view the PDF directly</a>.</p>
              </div>
            </S.PDFViewer>
            {title && (
              <S.MediaTitle>
                {item.showLogo && (item.titleLogoPath || project?.logoPath) && (
                  <Image 
                    src={item.titleLogoPath || project?.logoPath || ''} 
                    alt={`Logo for ${title}`}
                    width={20}
                    height={20}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      objectFit: 'contain',
                      marginRight: '8px',
                      borderRadius: item.logoHasBorderRadius === false ? '0' : '6px',
                      overflow: 'visible',
                      backgroundColor: 'transparent',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      ...(item.logoHasBorder && {
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        padding: '1px'
                      })
                    }}
                  />
                )}
                {title}
              </S.MediaTitle>
            )}
            {description && <S.MediaDescription>
              <MarkdownRenderer content={description} compact={true} />
            </S.MediaDescription>}
          </S.MediaItem>
        );
      }

      return null;
    };

    return (
      <S.MediaContainer>
        {media.map((item, index) => renderMediaItem(item, index))}
      </S.MediaContainer>
    );
  };

  return (
    <S.SideProjectsContainer className={className} id={id}>
      <S.SectionHeader>
        <S.SectionTitle>{title}</S.SectionTitle>
      </S.SectionHeader>
      
      {/* Category filters with accordion functionality */}
      <S.FilterAccordionHeader onClick={toggleCategoryFilter}>
        <S.FiltersSectionTitle>Filter by Category</S.FiltersSectionTitle>
        <S.AccordionIcon $isOpen={categoryFilterOpen}>
          <FaChevronDown />
        </S.AccordionIcon>
      </S.FilterAccordionHeader>
      
      {categoryFilterOpen && (
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
      )}
      
      {/* Technology filters with accordion functionality */}
      <S.FilterAccordionHeader onClick={toggleTechFilter}>
        <S.FiltersSectionTitle>Filter by Technology</S.FiltersSectionTitle>
        <S.AccordionIcon $isOpen={techFilterOpen}>
          <FaChevronDown />
        </S.AccordionIcon>
      </S.FilterAccordionHeader>
      
      {techFilterOpen && (
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
      )}
      
      {/* Projects grid */}
      <S.ProjectsGrid>
        {filteredProjects.map((project, index) => 
          project.halfWidth ? (
            <S.ProjectCard key={`${project.title}-${index}`}>
              {project.technologies && project.technologies.length > 0 && (
                <S.TechnologiesList className="technologies-list">
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
                  <S.CategoryPill className={project.category.toLowerCase().replace(/\s+/g, '-')}>
                    {project.category}
                  </S.CategoryPill>
                )}
              </S.ProjectHeader>
              
              <S.ProjectDescription 
                className={`project-description ${project.title === 'Prompt Forge' ? 'prompt-forge-description' : ''}`}
              >
                <MarkdownRenderer content={project.description} compact={true} />
              </S.ProjectDescription>
              
              {project.impact && (
                <S.ProjectImpact>
                  <MarkdownRenderer content={project.impact} compact={true} />
                </S.ProjectImpact>
              )}
              
              <S.ProjectLinks>
                {project.url && (
                  <S.ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                    <FaGlobe /> Live Demo
                  </S.ProjectLink>
                )}
              </S.ProjectLinks>
              
              {project.media && project.media.length > 0 && (
                <S.MediaContainer>
                  {renderMedia(project.media, false, project)}
                </S.MediaContainer>
              )}
            </S.ProjectCard>
          ) : (
            <S.FullRowProjectCard key={`${project.title}-${index}`}>
              {project.technologies && project.technologies.length > 0 && (
                <S.TechnologiesList className="technologies-list">
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
                  <S.CategoryPill className={project.category.toLowerCase().replace(/\s+/g, '-')}>
                    {project.category}
                  </S.CategoryPill>
                )}
              </S.ProjectHeader>
              
              <div className="project-content">
                <div className="project-main">
                  <S.ProjectDescription 
                    className={`project-description ${project.title === 'Prompt Forge' ? 'prompt-forge-description' : ''}`}
                  >
                    <MarkdownRenderer content={project.description} compact={true} />
                  </S.ProjectDescription>
                  
                  {project.impact && (
                    <S.ProjectImpact>
                      <MarkdownRenderer content={project.impact} compact={true} />
                    </S.ProjectImpact>
                  )}
                  
                  <S.ProjectLinks>
                    {project.url && (
                      <S.ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                        <FaGlobe /> Live Demo
                      </S.ProjectLink>
                    )}
                  </S.ProjectLinks>
                </div>
                
                <div className="project-media">
                  {project.media && project.media.length > 0 && (
                    <S.MediaContainer>
                      {renderMedia(project.media, false, project)}
                    </S.MediaContainer>
                  )}
                </div>
              </div>
            </S.FullRowProjectCard>
          )
        )}
      </S.ProjectsGrid>

      {/* Add modal component */}
      {modalImage && (
        <S.ModalOverlay onClick={closeModal}>
          <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <S.CloseButton onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
              </svg>
            </S.CloseButton>
            <Image 
              src={modalImage.url} 
              alt={modalImage.title || "Full size image"} 
              width={1200}
              height={800}
              style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
            />
            {modalImage.title && <div className="modal-caption">{modalImage.title}</div>}
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.SideProjectsContainer>
  );
};

export default SideProjectsSection; 