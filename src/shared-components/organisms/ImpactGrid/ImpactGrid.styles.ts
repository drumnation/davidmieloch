import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ContainerProps {
  $position: 'full-width' | 'left' | 'right' | 'center';
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

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled(motion.div)<CardProps>`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  height: 100%;
  display: flex;
  flex-direction: column;
  
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
  flex: 1;
`;

export const MetricsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MetricItem = styled.li`
  padding: 0.5rem 0;
  font-size: 1rem;
  position: relative;
  padding-left: 1.5rem;
  
  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: inherit;
    opacity: 0.8;
  }
`; 