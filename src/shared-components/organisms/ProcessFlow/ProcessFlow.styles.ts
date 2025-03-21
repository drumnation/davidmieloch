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
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: ${({ $position }) => {
    switch ($position) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      case 'center': return 'center';
      case 'full-width': return 'stretch';
      default: return 'flex-start';
    }
  }};
  overflow: visible;
`;

export const StepsContainer = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  width: 100%;
  max-width: 800px;
  overflow: visible;
  padding: 0;
  margin: 0;
  
  ${({ $style, theme }) => css`
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
`;

export const Step = styled(motion.div)<StepProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
  width: 100%;
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
`;

export const StepContent = styled.div`
  flex: 1;
  padding-left: 0.5rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const StepDescription = styled.p`
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.05rem;
  line-height: 1.6;
`;

export const StepImpact = styled.p`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 0.95rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: rgba(0, 120, 255, 0.08);
  border-radius: 6px;
  line-height: 1.5;
  
  strong {
    font-weight: 600;
    margin-right: 0.5rem;
  }
`;

export const HeaderContainer = styled.div`
  margin-bottom: 2.5rem;
  text-align: left;
  width: 100%;
  max-width: 800px;
  
  h2 {
    margin-bottom: 0.75rem;
    font-size: 2rem;
    line-height: 1.2;
  }
`; 