'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon';
import { ProcessFlowProps, ProcessFlowStep } from './ProcessFlow.types';
import * as S from './ProcessFlow.styles';
import { useInView } from 'react-intersection-observer';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';

export const ProcessFlow: React.FC<ProcessFlowProps> = ({
  steps,
  title,
  subtitle,
  style = 'vertical-steps',
  position = 'left',
  className,
}) => {
  const componentName = "ProcessFlow";
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + (i * 0.1),
        type: "spring", 
        damping: 15,
        stiffness: 100
      }
    })
  };

  const renderContent = () => (
    <S.Container className={className} $position={position} ref={ref}>
      {(title || subtitle) && (
        <S.HeaderContainer>
          {title && <Typography variant="h2">{title}</Typography>}
          {subtitle && <Typography variant="body" color="secondary">{subtitle}</Typography>}
        </S.HeaderContainer>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
      >
        <S.StepsContainer $style={style} $isVertical={true}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={stepVariants}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
            >
              <S.Step $style={style} $isVertical={true}>
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
              </S.Step>
            </motion.div>
          ))}
        </S.StepsContainer>
      </motion.div>
    </S.Container>
  );

  return (
    <AnimationErrorBoundary componentName={componentName}>
      <AnimationDebugger
        componentName={componentName}
        trackRenders={true}
        logLifecycle={true}
      >
        {renderContent()}
      </AnimationDebugger>
    </AnimationErrorBoundary>
  );
}; 