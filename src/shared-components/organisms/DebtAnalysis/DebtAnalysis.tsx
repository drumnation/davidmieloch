import React from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { Typography } from '../../atoms/Typography/Typography';
import { DebtAnalysisProps, DebtCategory } from './DebtAnalysis.types';
import * as S from './DebtAnalysis.styles';
import styled from 'styled-components';
import { springToCss } from '../../../utils/animations/typed-components';

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

export const DebtAnalysis: React.FC<DebtAnalysisProps> = ({
  title,
  categories,
  style = 'accent-cards',
  position = 'full-width',
  className,
}) => {
  // Container animation
  const containerSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  // Card animations with trail effect
  const cardsTrail = useTrail(categories.length, {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 100
  });

  return (
    <S.Container className={className} $position={position}>
      {title && (
        <TitleContainer>
          <Typography variant="h2">
            {title}
          </Typography>
        </TitleContainer>
      )}
      <div
        style={{ 
          ...springToCss(containerSpring as any), 
          width: '100%' 
        }}
      >
        <S.CardsContainer>
          {categories.map((category: DebtCategory, index: number) => (
            <S.Card 
              key={index} 
              $style={style}
              style={springToCss(cardsTrail[index] as any)}
            >
              <S.CardHeader>
                <Typography variant="h3">
                  {category.title}
                </Typography>
              </S.CardHeader>
              <S.CardBody>
                <S.CurrentState>
                  {category.current_state}
                </S.CurrentState>
                <S.Impact>
                  <strong>Impact:</strong> {category.impact}
                </S.Impact>
              </S.CardBody>
            </S.Card>
          ))}
        </S.CardsContainer>
      </div>
    </S.Container>
  );
}; 