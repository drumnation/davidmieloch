import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, useTrail, SpringValue, Interpolation } from '@react-spring/web';
import { FeatureGridProps } from './FeatureGrid.types';
import { H3, Body } from '../../atoms/Typography/Typography';
import * as S from './FeatureGrid.styles';
import { springPresets } from '../../../utils/animations';

// Type definition for react-spring animations
type AnimatedStyles = {
  opacity: SpringValue<number>;
  y: SpringValue<number>;
  scale: SpringValue<number>;
};

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

  // Animation for the container
  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    config: springPresets.default,
  });

  // Staggered animations for each feature card
  const trail = useTrail(features.length, {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    scale: inView ? 1 : 0.95,
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
    },
    delay: 200,
  });

  return (
    <S.AnimatedDiv
      ref={ref}
      style={containerSpring}
      className={className}
    >
      <S.Grid $columns={columns} $style={style}>
        {trail.map((props: AnimatedStyles, index) => (
          <S.AnimatedDiv
            key={index}
            style={{
              opacity: props.opacity,
              transform: props.y.to(
                (y, s = props.scale.get()) => `translateY(${y}px) scale(${s})`
              ),
            }}
          >
            <S.FeatureCard
              variant={style === 'gradient-cards' ? 'gradient' : 'accent'}
              padding="lg"
            >
              <S.AnimatedDiv 
                style={{
                  transform: props.scale.to(s => `scale(${s})`),
                }}
              >
                <S.IconWrapper>
                  {features[index].icon}
                </S.IconWrapper>
              </S.AnimatedDiv>
              <S.Content>
                <H3 color={style === 'gradient-cards' ? 'light' : 'primary'}>
                  {features[index].title}
                </H3>
                <Body color={style === 'gradient-cards' ? 'light' : 'secondary'}>
                  {features[index].description}
                </Body>
              </S.Content>
            </S.FeatureCard>
          </S.AnimatedDiv>
        ))}
      </S.Grid>
    </S.AnimatedDiv>
  );
}; 