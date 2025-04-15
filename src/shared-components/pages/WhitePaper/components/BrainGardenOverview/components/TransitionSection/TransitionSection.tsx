import React from 'react';
import * as S from './TransitionSection.styles';

interface TransitionSectionProps {
  /**
   * Description text explaining the next section
   */
  description?: string;
}

export const TransitionSection: React.FC<TransitionSectionProps> = ({ 
  description = "Explore how BrainGarden's innovative architecture is engineered to transform your team's productivity and knowledge management capabilities."
}) => {
  // Split text into sentences for readability
  const sentences = description.split('. ').map((sentence: string) => 
    sentence.endsWith('.') ? sentence : `${sentence}.`
  );

  return (
    <S.TransitionContainer>
      <S.ContentWrapper>
        <div>
          {sentences.map((sentence: string, index: number) => (
            <span 
              key={index}
              style={{ display: 'inline' }}
            >
              <S.TransitionText as="span">{sentence} </S.TransitionText>
            </span>
          ))}
        </div>
      </S.ContentWrapper>
    </S.TransitionContainer>
  );
}; 