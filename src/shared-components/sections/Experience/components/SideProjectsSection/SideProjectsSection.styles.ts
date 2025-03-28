import styled from 'styled-components';

export const SideProjectsContainer = styled.section`
  margin-bottom: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  
  h2 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
  }
`;

export const CategorySection = styled.div`
  margin-bottom: 2rem;
`;

export const CategoryHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.9);
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const FiltersSectionTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.75rem;
  width: 100%;
`;

export const TechFiltersContainer = styled(FiltersContainer)`
  margin-bottom: 2rem;
  gap: 0.5rem;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active }) => $active ? '#0073b1' : '#f3f2ef'};
  color: ${({ $active }) => $active ? 'white' : 'rgba(0, 0, 0, 0.9)'};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ $active }) => $active ? '#006097' : '#e6e5e4'};
  }
`;

export const TechFilterButton = styled(FilterButton)`
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 16px;
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const MediaContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  .full-width {
    width: 100%;
  }
  
  .quarter-width-image {
    width: 23.5%;
  }
  
  .third-width-image {
    width: 31.33%;
  }
  
  // Mobile responsiveness for multi-column layouts
  @media (max-width: 768px) {
    .quarter-width-image,
    .third-width-image {
      width: 100%;
    }
  }
`;

export const FullRowProjectCard = styled(ProjectCard)`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  
  .project-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .project-main {
    width: 100%;
  }
  
  .project-media {
    width: 100%;
    
    & > div {
      margin-top: 0.75rem;
      
      & > div {
        margin-top: 0.5rem;
      }
    }
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px;
`;

export const ProjectLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 1rem;
  padding-right: 5px;
  border-radius: 8px;
`;

export const ProjectTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
`;

export const HeaderDate = styled.span`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 0.1rem;
`;

export const HeaderDateRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.1rem;
  gap: 0.5rem;
`;

export const HeaderRepoLink = styled.a`
  font-size: 0.8rem;
  color: #0073b1;
  display: flex;
  align-items: center;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: 4px;
    font-size: 0.9rem;
  }
`;

export const ProjectDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.8);
  line-height: 1.6;
`;

export const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`;

export const ProjectDates = styled.span`
  margin-right: 1rem;
`;

export const ProjectImpact = styled.div`
  margin-top: 0.5rem;
  font-weight: 600;
  color: #2196f3;
`;

export const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const TechnologyItem = styled.div`
  background-color: #f3f2ef;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #e6e5e4;
  }
`;

export const TechnologyTag = styled.span`
  background-color: #f3f2ef;
  color: rgba(0, 0, 0, 0.9);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
`;

export const ProjectLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

export const ProjectLink = styled.a`
  text-decoration: none;
  color: #2196f3;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: 0.25rem;
  }
`;

export const MediaItem = styled.div`
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MediaTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.6);
  padding-left: 15px;
`;

export const MediaImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const MediaVideo = styled.video`
  width: 100%;
  border-radius: 8px;
`;

export const MediaEmbed = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  
  iframe {
    display: block;
    border: none;
    width: 100%;
  }
`;

export const MediaThumbnail = styled.div`
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  img {
    width: 100%;
  }
`;

/* Link container styles */
export const LinkContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }
  
  .link-thumbnail {
    flex: 0 0 auto;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    
    @media (min-width: 768px) {
      width: 200px;
    }
  }
  
  .link-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #f3f2ef;
    padding: 20px;
    height: 100%;
    
    .placeholder-text {
      margin-top: 10px;
      font-size: 0.85rem;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  
  .link-content {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .link-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: rgba(0, 0, 0, 0.9);
  }
  
  .link-description {
    font-size: 0.9rem;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.7);
    flex: 1;
  }
  
  .link-button {
    background-color: #0073b1;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    
    svg {
      margin-left: 8px;
    }
    
    &:hover {
      background-color: #006097;
      text-decoration: none;
    }
  }
`;

export const MediaGroup = styled.div<{ $layout?: 'default' | 'stack' }>`
  margin-top: 1rem;
  display: flex;
  flex-direction: ${props => props.$layout === 'stack' ? 'column' : 'row'};
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  
  &.half-width-group {
    width: 48%;
  }
  
  &.third-width-group {
    width: 31.33%;
  }
  
  &.quarter-width-group {
    width: 23.5%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    &.half-width-group,
    &.third-width-group,
    &.quarter-width-group {
      width: 100%;
    }
  }
`;

export const MediaGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  
  > div {
    margin-top: 0 !important;
  }
`;

export const MediaDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
  margin: 0.5rem 0;
  padding: 0 1rem 1rem;
  line-height: 1.4;
`;

export const MediaLink = styled.a`
  display: inline-block;
  background-color: #0073b1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 1rem 1rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #006097;
  }
`; 