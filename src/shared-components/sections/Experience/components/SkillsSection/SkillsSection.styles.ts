import styled from 'styled-components';

export const SectionContainer = styled.section`
  margin: 2rem 0;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export const SkillsCategoryColumn = styled.div`
  flex: 1 1 calc(33.333% - 2rem);
  min-width: 240px;
  
  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const SkillsCategoryTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  border-bottom: 2px solid;
  padding-bottom: 0.5rem;
  display: inline-block;
`;

export const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const SkillTag = styled.div`
  background-color: ${({ theme }) => theme.background?.paper || '#f5f5f5'};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  .skill-icon {
    margin-right: 8px;
  }
  
  .skill-name {
    font-weight: 500;
  }
`; 