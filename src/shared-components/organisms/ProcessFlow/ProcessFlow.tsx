'use client';

import React, { useEffect, useState } from 'react';
import { useSpring, useTrail, animated, config } from '@react-spring/web';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon';
import { ProcessFlowProps, ProcessFlowStep } from './ProcessFlow.types';
import * as S from './ProcessFlow.styles';
import { springPresets } from '../../../utils/animations';
import { useInView } from 'react-intersection-observer';

// Create animated versions of styled components
const AnimatedStep = animated(S.Step);
const AnimatedStepsContainer = animated(S.StepsContainer);

export const ProcessFlow: React.FC<ProcessFlowProps> = ({
  steps,
  title,
  subtitle,
  style = 'vertical-steps',
  position = 'left',
  className,
}) => {
  // Use intersection observer to trigger animations when component comes into view
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
    threshold: 0.1
  });

  // State to track if animation should start
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Start animation when component comes into view
  useEffect(() => {
    if (inView) {
      setShouldAnimate(true);
    }
  }, [inView]);

  // Container animation
  const containerSpring = useSpring({
    opacity: shouldAnimate ? 1 : 0,
    config: { duration: 500 },
    delay: 100
  });

  // Trail animation for step items
  const trailSprings = useTrail(steps.length, {
    opacity: shouldAnimate ? 1 : 0,
    transform: shouldAnimate ? 'translateY(0px)' : 'translateY(20px)',
    config: config.gentle,
    delay: 200
  });

  return (
    <S.Container className={className} $position={position} ref={ref}>
      {(title || subtitle) && (
        <S.HeaderContainer>
          {title && <Typography variant="h2">{title}</Typography>}
          {subtitle && <Typography variant="body" color="secondary">{subtitle}</Typography>}
        </S.HeaderContainer>
      )}
      <AnimatedStepsContainer 
        style={containerSpring} 
        $style={style} 
        $isVertical={true}
      >
        {steps.map((step, index) => (
          <AnimatedStep 
            key={index} 
            $style={style} 
            $isVertical={true}
            style={trailSprings[index]}
          >
            <S.StepNumber $style={style}>
              {step.icon ? (
                <Icon name={step.icon} size={24} />
              ) : (
                <span>{index + 1}</span>
              )}
            </S.StepNumber>
            <S.StepContent>
              <Typography variant="h3">{step.title}</Typography>
              <S.StepDescription>
                {step.description}
              </S.StepDescription>
              {step.impact && (
                <S.StepImpact>
                  <strong>Impact:</strong> {step.impact}
                </S.StepImpact>
              )}
            </S.StepContent>
          </AnimatedStep>
        ))}
      </AnimatedStepsContainer>
    </S.Container>
  );
}; 