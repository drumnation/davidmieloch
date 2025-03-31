import React, { useEffect, useRef, useState } from 'react';
import { CaseStudyProps } from './CaseStudy.types';
import * as S from './CaseStudy.styles';

export const CaseStudy: React.FC<CaseStudyProps> = ({
  title,
  challenge,
  solution,
  results,
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
        
        <S.Section>
          <S.SectionTitle>Challenge</S.SectionTitle>
          <S.SectionContent>{challenge}</S.SectionContent>
        </S.Section>
        
        <S.Section>
          <S.SectionTitle>Solution</S.SectionTitle>
          <S.SectionContent>{solution}</S.SectionContent>
        </S.Section>
        
        <S.Section>
          <S.SectionTitle>Results</S.SectionTitle>
          <S.ResultsList>
            {results.map((result, index) => (
              <S.ResultItem key={index}>{result}</S.ResultItem>
            ))}
          </S.ResultsList>
        </S.Section>
        
        <S.Quote>{quote}</S.Quote>
      </S.Card>
    </S.Container>
  );
}; 