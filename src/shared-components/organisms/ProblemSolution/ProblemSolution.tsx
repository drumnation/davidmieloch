import React from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { Typography } from '../../atoms/Typography/Typography';
import { ProblemSolutionProps } from './ProblemSolution.types';
import * as S from './ProblemSolution.styles';
import { springToCss } from '../../../utils/animations/typed-components';

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({
  problem,
  consequence,
  metrics,
  style = 'split-card',
  position = 'right',
  className,
}) => {
  // Container animation
  const containerSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  // Metrics animation with trail effect
  const metricsTrail = useTrail(metrics?.length || 0, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 300
  });

  return (
    <S.Container className={`problem-solution-container ${className || ''}`} $position={position}>
      <div
        className="problem-solution-motion-container"
        style={{ 
          ...springToCss(containerSpring as any),
          width: '100%' 
        }}
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
                {metrics.map((metric, index) => (
                  <li 
                    key={index} 
                    className="metric-item"
                    style={springToCss(metricsTrail[index] as any)}
                  >
                    {metric}
                  </li>
                ))}
              </S.MetricsList>
            )}
          </S.ConsequenceSection>
        </S.Card>
      </div>
    </S.Container>
  );
}; 