import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon';
import { ProcessFlowProps, ProcessFlowStep } from './ProcessFlow.types';
import * as S from './ProcessFlow.styles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const ProcessFlow: React.FC<ProcessFlowProps> = ({
  steps,
  title,
  subtitle,
  style = 'vertical-steps',
  position = 'left',
  className,
}) => {
  return (
    <S.Container className={className} $position={position}>
      {(title || subtitle) && (
        <S.HeaderContainer>
          {title && <Typography variant="h2">{title}</Typography>}
          {subtitle && <Typography variant="body" color="secondary">{subtitle}</Typography>}
        </S.HeaderContainer>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <S.StepsContainer $style={style} $isVertical={true}>
          {steps.map((step, index) => (
            <S.Step 
              key={index} 
              $style={style} 
              $isVertical={true}
              variants={itemVariants}
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
            </S.Step>
          ))}
        </S.StepsContainer>
      </motion.div>
    </S.Container>
  );
}; 