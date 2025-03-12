import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card/Card';
import { Body } from '../../atoms/Typography/Typography';
import { StyledNavigationCardProps } from './NavigationCard.types';

export const StyledNavigationCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const IconContainer = styled(motion.div)<Pick<StyledNavigationCardProps, '$style'>>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ $style }) =>
    $style === 'gradient-card' ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-light)'};
  color: ${({ $style }) =>
    $style === 'gradient-card' ? 'var(--text-light)' : 'var(--primary-blue)'};
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
`;

export const Arrow = styled(motion.span)`
  font-size: 1.5rem;
  line-height: 1;
`;

export const Description = styled(Body)`
  opacity: 0.8;
`; 