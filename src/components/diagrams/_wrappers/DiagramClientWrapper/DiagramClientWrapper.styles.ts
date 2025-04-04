import styled from 'styled-components';

interface DiagramContainerProps {
  $shadow?: boolean;
  $backgroundColor?: string;
  $padding?: string;
  $borderRadius?: string;
}

export const DiagramContainer = styled.div<DiagramContainerProps>`
  width: 100%;
  margin: 1rem 0;
  overflow: hidden;
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'white'};
  padding: ${({ $padding }) => $padding || '1rem'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '8px'};
  box-shadow: ${({ $shadow }) => $shadow ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors?.text?.primary || '#333'};
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors?.text?.secondary || '#666'};
    margin-bottom: 1rem;
  }
`; 