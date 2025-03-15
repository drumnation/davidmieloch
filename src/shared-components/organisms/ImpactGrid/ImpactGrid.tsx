import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { ImpactGridProps, ImpactCategory } from './ImpactGrid.types';
import * as S from './ImpactGrid.styles';

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

export const ImpactGrid: React.FC<ImpactGridProps> = ({
  impacts,
  style = 'gradient-cards',
  position = 'full-width',
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
        <S.GridContainer>
          {impacts.map((impact: ImpactCategory, index: number) => (
            <S.Card 
              key={index} 
              $style={style}
              variants={itemVariants}
            >
              <S.CardHeader>
                <Typography variant="subtitle1" className="mb-1">
                  {impact.category}
                </Typography>
              </S.CardHeader>
              <S.CardBody>
                <S.MetricsList>
                  {impact.metrics.map((metric: string, metricIndex: number) => (
                    <S.MetricItem key={metricIndex}>
                      {metric}
                    </S.MetricItem>
                  ))}
                </S.MetricsList>
              </S.CardBody>
            </S.Card>
          ))}
        </S.GridContainer>
      </motion.div>
    </S.Container>
  );
}; 