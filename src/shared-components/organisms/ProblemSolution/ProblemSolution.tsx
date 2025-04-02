import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { ProblemSolutionProps } from './ProblemSolution.types';
import * as S from './ProblemSolution.styles';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { FadeIn, Trail } from '../../../utils/animations/framer-patterns';
import { MotionSafe } from '../../../utils/animations/ssr-safe';

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({
  problem,
  consequence,
  metrics,
  style = 'split-card',
  position = 'right',
  className,
}) => {
  const componentName = "ProblemSolution";

  const renderContent = () => (
    <S.Container className={`problem-solution-container ${className || ''}`} $position={position}>
      <FadeIn 
        componentName={componentName} 
        duration={0.8}
      >
        <S.Card $style={style} className="problem-solution-card">
          <S.ProblemSection className="problem-section">
            <Typography variant="h3" weight="bold" mb="0.5rem">
              Problem
            </Typography>
            <S.ProblemText>{problem}</S.ProblemText>
          </S.ProblemSection>
          
          <S.ConsequenceSection className="consequence-section">
            <S.ConsequenceTitle>
              Consequence
            </S.ConsequenceTitle>
            <S.ConsequenceText>{consequence}</S.ConsequenceText>
            
            {metrics && metrics.length > 0 && (
              <S.MetricsList className="metrics-list">
                <Trail 
                  componentName={componentName}
                  staggerDelay={0.1}
                  initialDelay={0.3}
                >
                  {metrics.map((metric, index) => (
                    <motion.li 
                      key={index} 
                      className="metric-item"
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 }
                      }}
                      transition={{ mass: 1, tension: 280, friction: 60 }}
                    >
                      {metric}
                    </motion.li>
                  ))}
                </Trail>
              </S.MetricsList>
            )}
          </S.ConsequenceSection>
        </S.Card>
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