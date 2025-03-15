import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { StatsComparisonProps } from './StatsComparison.types';
import * as S from './StatsComparison.styles';

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

export const StatsComparison: React.FC<StatsComparisonProps> = ({
  comparisons,
  style = 'gradient-cards',
  position = 'right',
  className,
}) => {
  return (
    <S.Container className={className} $position={position}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <S.CardsContainer>
          {comparisons.map((comparison, index) => (
            <S.Card 
              key={index} 
              $style={style}
              variants={itemVariants}
            >
              <S.CardHeader>
                <Typography variant="subtitle1" className="mb-1">
                  {comparison.metric}
                </Typography>
              </S.CardHeader>
              <S.CardBody>
                <S.CurrentValue>
                  {comparison.current}
                </S.CurrentValue>
                <S.Impact>
                  {comparison.impact}
                </S.Impact>
              </S.CardBody>
            </S.Card>
          ))}
        </S.CardsContainer>
      </motion.div>
    </S.Container>
  );
}; 