import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Stack } from '@mantine/core';
import { Text, Title } from '@mantine/core';

interface StyledProps {
  styleType?: 'gradient-card' | 'accent-card';
}

export const Container = styled(motion.div)<{ position?: string }>`
  width: 100%;
  max-width: 100%;
`;

export const StyledCard = styled.div<StyledProps>`
  background: ${({ styleType, theme }) =>
    styleType === 'gradient-card'
      ? 'linear-gradient(90deg, #0052CC 0%, #3730A3 100%)'
      : styleType === 'accent-card'
      ? theme.colors.accent.light
      : theme.colors.background.light};
  color: ${({ styleType, theme }) =>
    styleType === 'gradient-card'
      ? theme.colors.text.light
      : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space.xl} 0;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl};
`;

export const ChallengeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ChallengeCard = styled(motion.div)`
  padding: ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }
`;

export const MetricsContainer = styled(Stack)`
  margin-top: ${({ theme }) => theme.space.lg};
  padding-top: ${({ theme }) => theme.space.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ImpactText = styled.p`
  color: ${({ theme }) => theme.colors.accent.red};
  font-weight: 600;
  margin-top: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

export const MetricValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MetricLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const MainTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 800;
  font-size: 2.5rem;
  letter-spacing: -0.02em;

  ${StyledCard}[styleType="gradient-card"] & {
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const MainDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.6;

  ${StyledCard}[styleType="gradient-card"] & {
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`; 