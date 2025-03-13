import React from 'react';
import { Icon } from '../../atoms/Icon';
import { Body } from '../../atoms/Typography';
import { ProblemSolutionCardProps } from './ProblemSolutionCard.types';
import * as S from './ProblemSolutionCard.styles';

/**
 * ProblemSolutionCard displays a problem statement and its solution
 * with visual indicators and optional impact metrics.
 */
export const ProblemSolutionCard: React.FC<ProblemSolutionCardProps> = ({
  slug,
  problem,
  solution,
  impact,
  icon,
  variant = 'blue',
  className,
}) => {
  return (
    <S.StyledCard $variant={variant} className={className}>
      <S.IconHeader>
        <S.HeaderIcon>
          <Icon name={icon || 'chart-bar'} />
        </S.HeaderIcon>
        <S.HeaderSlug>{slug}</S.HeaderSlug>
      </S.IconHeader>

      <S.Content $variant={variant}>
        <S.Section>
          <S.StatusIcon type="problem">
            <Icon name="x" />
          </S.StatusIcon>
          <S.TextContent>
            <Body>{problem}</Body>
          </S.TextContent>
        </S.Section>

        <S.Section>
          <S.StatusIcon type="solution">
            <Icon name="check" />
          </S.StatusIcon>
          <S.TextContent>
            <Body>{solution}</Body>
          </S.TextContent>
        </S.Section>

        {impact && (
          <S.Section>
            <S.StatusIcon type="impact">
              <Icon name="chart-bar" />
            </S.StatusIcon>
            <S.TextContent>
              <S.ImpactTextWrapper>
                <Body weight="bold">{impact.value}</Body>
                {impact.label && (
                  <Body color="secondary">{impact.label}</Body>
                )}
              </S.ImpactTextWrapper>
            </S.TextContent>
          </S.Section>
        )}
      </S.Content>
    </S.StyledCard>
  );
};

export default ProblemSolutionCard;