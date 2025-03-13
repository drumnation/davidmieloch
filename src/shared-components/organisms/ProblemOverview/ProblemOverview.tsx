import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography';
import { ProblemOverviewProps } from './ProblemOverview.types';
import * as S from './ProblemOverview.styles';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const slideVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const getAnimationVariant = (animation?: 'fade-up' | 'slide-in' | 'none') => {
  switch (animation) {
    case 'fade-up':
      return fadeUpVariants;
    case 'slide-in':
      return slideVariants;
    case 'none':
      return undefined;
    default:
      return fadeUpVariants;
  }
};

export const ProblemOverview: React.FC<ProblemOverviewProps> = ({
  title,
  description,
  metrics,
  style = 'gradient-card',
  position = 'full-width',
  animation = 'fade-up',
  background = 'light',
  className
}) => {
  const MotionContainer = motion(S.Container);
  const animationVariant = getAnimationVariant(animation);

  return (
    <MotionContainer
      $position={position}
      $style={style}
      $background={background}
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <S.Header>
        <motion.div variants={animationVariant}>
          <Typography
            variant="h2"
            color={background === 'light' ? 'primary' : 'inherit'}
          >
            {title}
          </Typography>
        </motion.div>
      </S.Header>

      <S.Description>
        <motion.div variants={animationVariant}>
          <Typography
            variant="body"
            color={background === 'light' ? 'primary' : 'inherit'}
          >
            {description}
          </Typography>
        </motion.div>
      </S.Description>

      <S.MetricsGrid>
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={animationVariant}
          >
            <S.MetricCard>
              <S.MetricNumber>
                {metric.prefix && <span>{metric.prefix}</span>}
                {metric.number}
                {metric.suffix && <span>{metric.suffix}</span>}
              </S.MetricNumber>
              <S.MetricLabel>
                <Typography
                  variant="body"
                  color={background === 'light' ? 'secondary' : 'inherit'}
                >
                  {metric.label}
                </Typography>
              </S.MetricLabel>
            </S.MetricCard>
          </motion.div>
        ))}
      </S.MetricsGrid>
    </MotionContainer>
  );
}; 