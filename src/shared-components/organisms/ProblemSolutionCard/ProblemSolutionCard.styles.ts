import styled from 'styled-components';
import { Card } from '../../atoms/Card';
import { motion } from 'framer-motion';

interface StyledCardProps {
  variant?: 'gradient' | 'accent';
}

export const StyledCard = styled(Card)<StyledCardProps>`
  padding: 2rem;
  height: 100%;
  background: ${({ variant, theme }) =>
    variant === 'gradient'
      ? theme.colors.gradient
      : theme.colors.accent.main};
  color: ${({ variant, theme }) =>
    variant === 'gradient' ? theme.colors.text.light : theme.colors.text.primary};
`;

export const ProblemSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const SolutionSection = styled.div`
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ImpactSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.light};
  margin-bottom: 1rem;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`; 