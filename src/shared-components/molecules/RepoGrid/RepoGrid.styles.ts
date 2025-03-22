import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.colors.border.light};
  
  h3 {
    margin: 16px 0 8px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    max-width: 450px;
    margin: 0;
  }
`;

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`; 