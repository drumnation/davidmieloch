import React from 'react';
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
  return (
    <S.Container position={position} className={className}>
      <S.Card
        styleType={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={S.fadeIn}
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