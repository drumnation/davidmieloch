import React from 'react';
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