import styled from 'styled-components';

interface DiagramContainerProps {
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
}

export const DiagramContainer = styled.div<DiagramContainerProps>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || 'auto'};
  background-color: ${({ $backgroundColor, theme }) => $backgroundColor || theme.colors.background.light};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
  .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 100%;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.accent.red};
  border: 1px dashed ${({ theme }) => theme.colors.accent.red};
  border-radius: 8px;
  
  pre {
    margin-top: 1rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.background.paper};
    border-radius: 4px;
    overflow: auto;
    font-size: 0.875rem;
    width: 100%;
  }
`;
