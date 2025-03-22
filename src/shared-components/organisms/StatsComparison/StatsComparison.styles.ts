import styled, { css } from 'styled-components';

interface ContainerProps {
  $position: 'right' | 'left' | 'center' | 'full-width';
}

interface CardProps {
  $style: 'gradient-cards' | 'accent-cards' | 'default';
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  justify-content: ${({ $position }) => {
    switch ($position) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      case 'center': return 'center';
      case 'full-width': return 'stretch';
      default: return 'flex-start';
    }
  }};
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const CardWrapper = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Card = styled.div<CardProps>`
  flex: 1;
  min-width: 250px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background: ${({ theme }) => theme.colors.accent.blue};
  color: white;
  
  ${({ $style, theme }) => $style === 'gradient-cards' && css`
    background: ${theme.colors.accent.blue};
    color: white;
  `}
  
  ${({ $style, theme }) => $style === 'accent-cards' && css`
    background: ${theme.colors.accent.blue};
    color: white;
  `}
  
  ${({ $style, theme }) => $style === 'default' && css`
    background: ${theme.colors.accent.blue};
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  `}
`;

export const CardHeader = styled.div`
  padding: 1.25rem 1.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  h1, h2, h3, h4, h5, h6, p {
    color: white;
    margin: 0;
    font-weight: bold;
  }
`;

export const CardBody = styled.div`
  padding: 1.25rem 1.5rem;
  color: white;
`;

export const CurrentValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: white;
`;

export const Impact = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  font-style: italic;
  color: white;
`; 