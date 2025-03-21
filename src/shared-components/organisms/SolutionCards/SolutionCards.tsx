import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../atoms/Typography/Typography';
import { Card } from '../../atoms/Card/Card';

export interface SolutionCardsProps {
  solutions: Array<{
    title: string;
    description: string;
  }>;
  style?: string;
  position?: string;
  className?: string;
}

const SolutionCard = styled(Card)`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.accent.blue};
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &.gradient {
    background: ${({ theme }) => theme.colors.accent.blue};
    color: white;
  }
  
  &.accent {
    background-color: ${({ theme }) => theme.colors.accent.blue};
    color: white;
    border-left: 4px solid rgba(255, 255, 255, 0.3);
  }
`;

const Title = styled(Typography)`
  margin-bottom: 1.5rem;
  color: white;
  font-weight: bold;
`;

const Description = styled(Typography)`
  flex-grow: 1;
  color: white;
  line-height: 1.6;
`;

export const SolutionCards: React.FC<SolutionCardsProps> = ({
  solutions,
  style = 'default',
  className,
}) => {
  const getCardClassName = () => {
    if (style === 'gradient-card' || style === 'gradient-cards') return 'gradient';
    if (style === 'accent-card' || style === 'accent-cards') return 'accent';
    return '';
  };

  return (
    <div className={className} style={{ height: '100%' }}>
      {solutions.map((solution, index) => (
        <SolutionCard key={index} className={getCardClassName()}>
          <Title variant="h3">{solution.title}</Title>
          <Description variant="body">{solution.description}</Description>
        </SolutionCard>
      ))}
    </div>
  );
};