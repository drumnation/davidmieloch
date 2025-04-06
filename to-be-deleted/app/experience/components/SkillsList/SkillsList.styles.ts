import styled from 'styled-components';

export const StyledSkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SkillItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper || '#f8f8f8'};
  color: ${({ theme }) => theme.colors.text.primary || '#333'};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .skill-icon {
    margin-right: 0.5rem;
  }
  
  .skill-name {
    white-space: nowrap;
  }
`; 