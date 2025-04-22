import styled, { css } from 'styled-components';
import { MantineTheme } from '@mantine/core';
import { animated } from '@react-spring/web';

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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
    padding: 0 1rem;
  }
`;

export const Card = styled.div<CardProps>`
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.md};
  display: flex;
  flex-direction: ${({ $style }) => $style === 'split-card' ? 'row' : 'column'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    max-width: 100%;
    border-radius: 8px;
  }
  
  ${({ $style, theme }) => $style === 'default' && css`
    background: ${(theme as MantineTheme).white};
    color: ${(theme as MantineTheme).black};
    border: 1px solid ${(theme as MantineTheme).colors.gray[3]};
  `}
`;

export const ProblemSection = styled.div`
  padding: 1.5rem;
  flex: 1;
  background: ${({ theme }) => (theme as MantineTheme).colors.red[7]};
  color: white;
  
  h1, h2, h3, h4, h5, h6, p {
    color: white;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.25rem;
    
    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export const ConsequenceSection = styled.div`
  padding: 1.5rem;
  flex: 1;
  background: ${({ theme }) => (theme as MantineTheme).white};
  color: ${({ theme }) => (theme as MantineTheme).black};
  border: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
  border-left: none;
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => (theme as MantineTheme).colors.red[7]};
    font-weight: 700;
  }
  
  @media (max-width: ${({ theme }) => (theme as MantineTheme).breakpoints.md}) {
    border-left: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
    border-top: none;
    padding: 1.25rem;
    
    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export const ConsequenceTitle = styled.h3`
  color: ${({ theme }) => (theme as MantineTheme).colors.red[7]};
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

export const ProblemText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: white;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const ConsequenceText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => (theme as MantineTheme).black};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

export const MetricsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MetricItem = styled.li`
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => (theme as MantineTheme).black};
  font-weight: 500;
  
  &:before {
    content: '• ';
    color: ${({ theme }) => (theme as MantineTheme).colors.red[7]};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.35rem 0;
    font-size: 0.85rem;
    margin-left: 1em;
  }
`;

// Animated versions
export const AnimatedContainer = animated(Container);
export const AnimatedCard = animated(Card);
export const AnimatedProblemSection = animated(ProblemSection);
export const AnimatedConsequenceSection = animated(ConsequenceSection);
export const AnimatedMetricsList = animated(MetricsList);
export const AnimatedMetricItem = animated(MetricItem);