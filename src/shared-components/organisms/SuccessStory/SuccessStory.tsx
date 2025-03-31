import React, { useEffect, useRef, useState } from 'react';
import { SuccessStoryProps } from './SuccessStory.types';
import * as S from './SuccessStory.styles';

export const SuccessStory: React.FC<SuccessStoryProps> = ({
  title,
  metrics,
  quote,
  style = 'accent-card',
  position = 'right',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-100px" }
    );
    
    // Store a reference to the current value of cardRef
    const currentCardRef = cardRef.current;
    
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }
    
    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <S.Container position={position} className={className}>
      <S.Card
        ref={cardRef}
        styleType={style}
        className={isVisible ? 'visible' : 'hidden'}
      >
        <S.Title>{title}</S.Title>
        
        <S.MetricsList>
          {metrics.map((metric, index) => (
            <S.MetricItem key={index}>{metric}</S.MetricItem>
          ))}
        </S.MetricsList>
        
        <S.Quote>{quote}</S.Quote>
      </S.Card>
    </S.Container>
  );
}; 