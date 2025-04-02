import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { DebtAnalysisProps, DebtCategory } from './DebtAnalysis.types';
import * as S from './DebtAnalysis.styles';
import styled from 'styled-components';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { FadeIn, Trail } from '../../../utils/animations/framer-patterns';
import { MotionSafe } from '../../../utils/animations/ssr-safe';

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
  const componentName = "DebtAnalysis";

  const renderContent = () => (
    <S.Container className={className} $position={position}>
      {title && (
        <TitleContainer>
          <Typography variant="h2">
            {title}
          </Typography>
        </TitleContainer>
      )}
      <FadeIn
        componentName={componentName}
        duration={0.8}
      >
        <S.CardsContainer>
          <Trail
            componentName={componentName}
            staggerDelay={0.1}
            initialDelay={0.1}
          >
            {categories.map((category: DebtCategory, index: number) => (
              <motion.div 
                key={index} 
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ mass: 1, tension: 280, friction: 60 }}
              >
                <S.Card 
                  $style={style}
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
              </motion.div>
            ))}
          </Trail>
        </S.CardsContainer>
      </FadeIn>
    </S.Container>
  );

  return (
    <AnimationErrorBoundary componentName={componentName}>
      <AnimationDebugger
        componentName={componentName}
        trackRenders={true}
        logLifecycle={true}
        detectCircular={true}
      >
        {renderContent()}
      </AnimationDebugger>
    </AnimationErrorBoundary>
  );
}; 