import styled from 'styled-components';

// Styles extracted from ExperienceSection.styles.ts
export const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 8px 8px 12px 8px;
  margin: 0 0 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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