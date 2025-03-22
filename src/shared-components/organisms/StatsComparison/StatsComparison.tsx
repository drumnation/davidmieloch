import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Typography } from '../../atoms/Typography/Typography';
import { StatsComparisonProps } from './StatsComparison.types';
import * as S from './StatsComparison.styles';

export const StatsComparison: React.FC<StatsComparisonProps> = ({
  comparisons,
  style = 'gradient-cards',
  position = 'right',
  className,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-100px',
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <S.Container className={className} $position={position}>
      <div ref={ref}>
        <S.CardsContainer>
          {comparisons.map((comparison, index) => (
            <S.CardWrapper 
              key={index}
              className={isVisible ? 'visible' : ''}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <S.Card $style={style}>
                <S.CardHeader>
                  <p>{comparison.metric}</p>
                </S.CardHeader>
                <S.CardBody>
                  <S.CurrentValue>
                    {comparison.current}
                  </S.CurrentValue>
                  <S.Impact>
                    {comparison.impact}
                  </S.Impact>
                </S.CardBody>
              </S.Card>
            </S.CardWrapper>
          ))}
        </S.CardsContainer>
      </div>
    </S.Container>
  );
}; 