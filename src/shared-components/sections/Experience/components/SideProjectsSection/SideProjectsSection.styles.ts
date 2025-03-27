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

export const FilterButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => active ? '#0073b1' : '#f3f2ef'};
  color: ${({ active }) => active ? 'white' : 'rgba(0, 0, 0, 0.9)'};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => active ? '#006097' : '#e6e5e4'};
  }
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

export const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ProjectLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 1rem;
  border-radius: 8px;
`;

export const ProjectTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
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

export const MediaContainer = styled.div`
  margin-top: 1.5rem;
`;

export const MediaItem = styled.div`
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MediaTitle = styled.p`
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.6);
`;

export const MediaImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const MediaVideo = styled.video`
  width: 100%;
  border-radius: 8px;
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