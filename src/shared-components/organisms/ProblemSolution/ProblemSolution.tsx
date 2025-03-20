import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { ProblemSolutionProps } from './ProblemSolution.types';
import * as S from './ProblemSolution.styles';

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

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({
  problem,
  consequence,
  metrics,
  style = 'split-card',
  position = 'right',
  className,
}) => {
  return (
    <S.Container className={`problem-solution-container ${className || ''}`} $position={position}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="problem-solution-motion-container"
        style={{ width: '100%' }}
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
                  <S.MetricItem key={index} variants={itemVariants} className="metric-item">
                    {metric}
                  </S.MetricItem>
                ))}
              </S.MetricsList>
            )}
          </S.ConsequenceSection>
        </S.Card>
      </motion.div>
    </S.Container>
  );
}; 