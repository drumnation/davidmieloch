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
  layout = 'grid',
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Ensure columns is only 2, 3, or 4 for type safety
  const safeColumns = columns === 2 ? 2 : columns === 4 ? 4 : 3;

  return (
    <div
      ref={ref}
      className={className}
    >
  
      <S.Grid $columns={safeColumns} $style={style} $layout={layout}>
        {features.map((feature, index) => (
          <S.CardWrapper
            key={index}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 
                'translateY(0)' : 
                layout === 'row' ? `translateX(${20 * (features.length - index)}px)` : 'translateY(20px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: `${index * 100}ms`
            }}
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
                <Body color="primary">
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