import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

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

export const Card = styled(motion.div)<CardProps>`
  flex: 1;
  min-width: 250px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  ${({ $style, theme }) => $style === 'gradient-cards' && css`
    background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    color: ${theme.colors.background.light};
  `}
  
  ${({ $style, theme }) => $style === 'accent-cards' && css`
    background: ${theme.colors.accent.blue};
    color: ${theme.colors.background.light};
  `}
  
  ${({ $style, theme }) => $style === 'default' && css`
    background: ${theme.colors.background.paper};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.light};
  `}
`;

export const CardHeader = styled.div`
  padding: 1.25rem 1.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CardBody = styled.div`
  padding: 1.25rem 1.5rem;
`;

export const CurrentValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

export const Impact = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  font-style: italic;
`; 