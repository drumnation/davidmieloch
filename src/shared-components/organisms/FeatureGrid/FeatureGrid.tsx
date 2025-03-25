import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FeatureGridProps } from './FeatureGrid.types';
import { H3, Body } from '../../atoms/Typography/Typography';
import * as S from './FeatureGrid.styles';

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  style = 'gradient-cards',
  animation = 'stagger-fade',
  className,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={className}
    >
      <S.Grid $columns={columns} $style={style} $inView={inView}>
        {features.map((feature, index) => (
          <S.CardWrapper
            key={index}
            $inView={inView}
            $index={index}
          >
            <S.FeatureCard
              variant={style === 'gradient-cards' ? 'gradient' : 'accent'}
              padding="lg"
            >
              <S.IconWrapper>
                {feature.icon}
              </S.IconWrapper>
              <S.Content>
                <H3 color="primary" weight="bold">
                  {feature.title}
                </H3>
                <Body color="secondary">
                  {feature.description}
                </Body>
              </S.Content>
            </S.FeatureCard>
          </S.CardWrapper>
        ))}
      </S.Grid>
    </div>
  );
}; 