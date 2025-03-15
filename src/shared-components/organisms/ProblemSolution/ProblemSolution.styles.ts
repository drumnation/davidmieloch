import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ContainerProps {
  $position: 'right' | 'left' | 'center' | 'full-width';
}

interface CardProps {
  $style: 'split-card' | 'default';
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

export const Card = styled.div<CardProps>`
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  flex-direction: ${({ $style }) => $style === 'split-card' ? 'row' : 'column'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
  
  ${({ $style, theme }) => $style === 'default' && css`
    background: ${theme.colors.background.paper};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.light};
  `}
`;

export const ProblemSection = styled.div`
  padding: 1.5rem;
  flex: 1;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.background.light};
`;

export const ConsequenceSection = styled.div`
  padding: 1.5rem;
  flex: 1;
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ProblemText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

export const ConsequenceText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

export const MetricsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MetricItem = styled(motion.li)`
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 500;
  
  &:before {
    content: '• ';
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`; 