import styled from 'styled-components';

export const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary || '#333'};
    text-align: center;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary || '#666'};
    margin-bottom: 1.5rem;
    text-align: center;
    max-width: 800px;
  }
`;

export const DiagramWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.elevation2 || '0 4px 6px rgba(0, 0, 0, 0.1)'};
`; 