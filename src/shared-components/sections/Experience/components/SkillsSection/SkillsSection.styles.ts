import styled from 'styled-components';

export const SectionContainer = styled.section`
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

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SkillsCategoryColumn = styled.div`
  flex: 1;
  min-width: 250px;
`;

export const SkillsCategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 4px;
  border-bottom: 2px solid;
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SkillTag = styled.div`
  background-color: #f3f2ef;
  color: rgba(0, 0, 0, 0.9);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #e6e5e4;
  }
`; 