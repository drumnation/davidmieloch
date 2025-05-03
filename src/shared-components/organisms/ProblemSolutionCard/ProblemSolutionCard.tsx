import React from 'react';
import { Icon } from '../../atoms/Icon';
import { Body } from '../../atoms/Typography';
import { ProblemSolutionCardProps } from './ProblemSolutionCard.types';
import * as S from './ProblemSolutionCard.styles';
import { usePathname } from 'next/navigation';

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
  className,
  variant = 'white',
}) => {
  const pathname = usePathname();
  // Apply 'white' variant for all non-homepage paths to ensure light background
  const isHomePage = pathname === '/';
  const effectiveVariant = isHomePage ? variant : 'white';

  return (
    <S.StyledCard className={className} $variant={effectiveVariant}>
      {slug && (
        <S.IconHeader>
          <S.HeaderIcon>
            {icon && <Icon name={icon} size={24} />}
          </S.HeaderIcon>
          <S.HeaderSlug>{slug}</S.HeaderSlug>
        </S.IconHeader>
      )}

      <S.Content $variant={effectiveVariant}>
        {problem && (
          <S.Section>
            <S.StatusIcon type="problem">
              <Icon name="alertTriangle" size={18} />
            </S.StatusIcon>
            <S.TextContent>
              <Body weight="semibold" color={effectiveVariant === 'blue' ? 'light' : 'primary'}>
                Problem
              </Body>
              <Body weight="regular" color={effectiveVariant === 'blue' ? 'light' : 'secondary'}>
                {problem}
              </Body>
            </S.TextContent>
          </S.Section>
        )}

        {solution && (
          <S.Section>
            <S.StatusIcon type="solution">
              <Icon name="checkCircle" size={18} />
            </S.StatusIcon>
            <S.TextContent>
              <Body weight="semibold" color={effectiveVariant === 'blue' ? 'light' : 'primary'}>
                Solution
              </Body>
              <Body weight="regular" color={effectiveVariant === 'blue' ? 'light' : 'secondary'}>
                {solution}
              </Body>
            </S.TextContent>
          </S.Section>
        )}

        {impact && (
          <S.Section>
            <S.StatusIcon type="impact">
              <Icon name="trendingUp" size={18} />
            </S.StatusIcon>
            <S.TextContent>
              <Body weight="semibold" color={effectiveVariant === 'blue' ? 'light' : 'primary'}>
                Impact
              </Body>
              <S.ImpactTextWrapper>
                <Body weight="bold">
                  {impact.value}
                </Body>
                {impact.label && (
                  <Body weight="regular" color={effectiveVariant === 'blue' ? 'light' : 'secondary'}>
                    {impact.label}
                  </Body>
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