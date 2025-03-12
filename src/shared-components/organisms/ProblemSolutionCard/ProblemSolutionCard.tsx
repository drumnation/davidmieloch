import React from 'react';
import { Icon } from '../../atoms/Icon';
import { H3, Body } from '../../atoms/Typography';
import { ProblemSolutionCardProps } from './ProblemSolutionCard.types';
import * as S from './ProblemSolutionCard.styles';

export const ProblemSolutionCard: React.FC<ProblemSolutionCardProps> = ({
  problem,
  solution,
  impact,
  icon,
  variant = 'accent',
  className,
}) => {
  return (
    <S.StyledCard variant={variant} className={className}>
      {icon && (
        <S.IconWrapper>
          <Icon name={icon} />
        </S.IconWrapper>
      )}
      
      <S.ProblemSection>
        <H3>Problem</H3>
        <Body>{problem}</Body>
      </S.ProblemSection>
      
      <S.SolutionSection>
        <H3>Solution</H3>
        <Body>{solution}</Body>
      </S.SolutionSection>
      
      <S.ImpactSection>
        <Icon name="chart-line-up" />
        <Body weight="bold">{impact}</Body>
      </S.ImpactSection>
    </S.StyledCard>
  );
}; 