import styled from 'styled-components';
import { Stack } from '@mantine/core';
import { Text, Title } from '@mantine/core';

interface StyledProps {
  styleType?: 'gradient-card' | 'accent-card' | 'challenge-cards';
}

export const Container = styled.div<{ position?: string }>`
  width: 100%;
  max-width: 100%;
`;

export const StyledCard = styled.div<{ $styleType?: 'gradient-card' | 'accent-card' | 'challenge-cards' }>`
  background: ${({ $styleType, theme }) =>
    $styleType === 'gradient-card'
      ? 'linear-gradient(90deg, #0052CC 0%, #3730A3 100%)'
      : $styleType === 'accent-card'
      ? theme.colors.accent.light
      : $styleType === 'challenge-cards'
      ? theme.colors.background.light
      : theme.colors.background.light};
  color: ${({ $styleType, theme }) =>
    $styleType === 'gradient-card'
      ? theme.colors.text.light
      : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space.xl} 0;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.sm};
    padding-bottom: ${({ theme }) => theme.space.xl};
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.sm};
    overflow: visible;
    width: 100%;
  }
`;

export const ChallengeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.md};
    margin-top: ${({ theme }) => theme.space.md};
    width: 100%;
    max-width: 100%;
  }
`;

export const ChallengeCard = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.md};
    max-width: 100%;
    min-height: auto;
    overflow: visible;
    width: 100%;
    margin: 0 0 0.75rem 0;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.colors.border.light};
  }

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
    font-size: 1.25rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
      padding: 0 0.25rem;
      line-height: 1.4;
    }
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    padding: 0 0.25rem 0 0.5rem;
  }
`;

export const MetricValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MetricLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ChallengeDescription = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
`;

export const MainTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 800;
  font-size: 2.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  ${StyledCard}[styleType="gradient-card"] & {
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    line-height: 1.3;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    letter-spacing: -0.01em;
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    line-height: 1.4;
  }
`; 