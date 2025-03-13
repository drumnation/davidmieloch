import React from 'react';
import { motion } from 'framer-motion';
import { FeatureGridProps } from './FeatureGrid.types';
import { H3, Body } from '../../atoms/Typography/Typography';
import * as S from './FeatureGrid.styles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      delay: 0.2,
    },
  },
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  style = 'gradient-cards',
  animation = 'stagger-fade',
  className,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <S.Grid $columns={columns} $style={style}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <S.FeatureCard
              variant={style === 'gradient-cards' ? 'gradient' : 'accent'}
              padding="lg"
            >
              <S.IconWrapper variants={iconVariants}>
                {feature.icon}
              </S.IconWrapper>
              <S.Content>
                <H3 color={style === 'gradient-cards' ? 'light' : 'primary'}>
                  {feature.title}
                </H3>
                <Body color={style === 'gradient-cards' ? 'light' : 'secondary'}>
                  {feature.description}
                </Body>
              </S.Content>
            </S.FeatureCard>
          </motion.div>
        ))}
      </S.Grid>
    </motion.div>
  );
}; 