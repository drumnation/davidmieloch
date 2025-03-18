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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -10 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
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
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      <S.Grid $columns={columns} $style={style}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.03, 
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 } 
            }}
          >
            <S.FeatureCard
              variant={style === 'gradient-cards' ? 'gradient' : 'accent'}
              padding="lg"
            >
              <S.IconWrapper 
                variants={iconVariants}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 5,
                  transition: { duration: 0.3 } 
                }}
              >
                {feature.icon}
              </S.IconWrapper>
              <S.Content variants={textVariants}>
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