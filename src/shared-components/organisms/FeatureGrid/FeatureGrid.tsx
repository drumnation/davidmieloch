import React from 'react';
import { FeatureGridProps } from './FeatureGrid.types';
import * as S from './FeatureGrid.styles';
import { H3, Body } from '../../atoms/Typography/Typography';
import { useInView } from 'react-intersection-observer';

/**
 * FeatureGrid Component
 * 
 * A grid display of features with icons, titles, and descriptions.
 */
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
      <S.Grid $columns={columns} $style={style}>
        {features.map((feature, index) => (
          <S.CardWrapper
            key={index}
          >
            <S.FeatureCard
              variant={style === 'gradient-cards' ? 'gradient' : 'accent'}
              padding="lg"
            >
              {feature.icon && (
                <S.IconWrapper>
                  {feature.icon}
                </S.IconWrapper>
              )}
              <S.Content>
                {feature.title && (
                  <S.Title $isKeyword={true}>
                    {feature.title}
                  </S.Title>
                )}
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

export default FeatureGrid; 