import React from 'react';
import { useSpring, useTrail, config } from '@react-spring/web';
import { Icon } from '../../atoms/Icon';
import { ComparisonGridProps } from './ComparisonGrid.types';
import * as S from './ComparisonGrid.styles';
import { useInView } from 'react-intersection-observer';

export const ComparisonGrid: React.FC<ComparisonGridProps> = ({
  before_after,
  style = 'gradient-cards',
  position = 'full-width',
  className,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px',
  });

  // Grid container animation
  const gridSpring = useSpring({
    opacity: inView ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Card animations with trail effect
  const cardsTrail = useTrail(before_after.length, {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    config: config.gentle,
    delay: 100,
  });

  return (
    <S.Container position={position} className={className}>
      <div ref={ref}>
        <S.AnimatedGrid style={gridSpring}>
          {before_after.map((item, index) => (
            <S.AnimatedCard
              key={index}
              styleType={style}
              style={cardsTrail[index]}
            >
              <S.AspectTitle>
                {item.icon && (
                  <S.IconWrapper>
                    <Icon name={item.icon} size={18} />
                  </S.IconWrapper>
                )}
                {item.aspect}
              </S.AspectTitle>
              
              <S.ComparisonContainer>
                <S.ComparisonItem>
                  <S.Label>Before</S.Label>
                  <S.Value>{item.before}</S.Value>
                </S.ComparisonItem>
                
                <S.ComparisonItem>
                  <S.Label>After</S.Label>
                  <S.Value>{item.after}</S.Value>
                </S.ComparisonItem>
              </S.ComparisonContainer>
            </S.AnimatedCard>
          ))}
        </S.AnimatedGrid>
      </div>
    </S.Container>
  );
}; 