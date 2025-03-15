import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ContainerProps {
  $position: 'left' | 'right' | 'center' | 'full-width';
}

interface StepProps {
  $isVertical: boolean;
  $style: 'vertical-steps' | 'horizontal-steps';
}

interface StepNumberProps {
  $style: 'vertical-steps' | 'horizontal-steps';
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

export const StepsContainer = styled.div<StepProps>`
  display: flex;
  flex-direction: ${({ $isVertical }) => $isVertical ? 'column' : 'row'};
  gap: ${({ $isVertical }) => $isVertical ? '2rem' : '1.5rem'};
  width: ${({ $isVertical }) => $isVertical ? '100%' : 'auto'};
  max-width: ${({ $isVertical }) => $isVertical ? '100%' : '100vw'};
  overflow-x: ${({ $isVertical }) => $isVertical ? 'visible' : 'auto'};
  padding: ${({ $isVertical }) => $isVertical ? '0' : '1rem 0.5rem'};
  
  ${({ $style, theme }) => $style === 'vertical-steps' && css`
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 24px;
      width: 2px;
      background: ${theme.colors.primary.light};
      transform: translateX(-50%);
      z-index: 0;
    }
  `}
  
  ${({ $style, theme }) => $style === 'horizontal-steps' && css`
    position: relative;
    align-items: flex-start;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 24px;
      height: 2px;
      background: ${theme.colors.primary.light};
      z-index: 0;
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
      flex-direction: column;
      
      &::before {
        left: 24px;
        right: auto;
        top: 0;
        bottom: 0;
        width: 2px;
        height: auto;
      }
    }
  `}
`;

export const Step = styled(motion.div)<StepProps>`
  display: flex;
  flex-direction: ${({ $isVertical }) => $isVertical ? 'row' : 'column'};
  align-items: ${({ $isVertical }) => $isVertical ? 'flex-start' : 'center'};
  gap: 1rem;
  position: relative;
  z-index: 1;
  
  ${({ $isVertical }) => !$isVertical && css`
    flex: 1;
    min-width: 200px;
    text-align: center;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: row;
      text-align: left;
    }
  `}
`;

export const StepNumber = styled.div<StepNumberProps>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.background.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  ${({ $style }) => $style === 'horizontal-steps' && css`
    margin-bottom: 1rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: 0;
    }
  `}
`;

export const StepContent = styled.div`
  flex: 1;
`;

export const StepDescription = styled.p`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StepImpact = styled.p`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  
  strong {
    font-weight: 600;
  }
`; 