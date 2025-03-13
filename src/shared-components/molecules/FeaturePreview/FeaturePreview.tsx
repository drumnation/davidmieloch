import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card';
import { Icon } from '../../atoms/Icon';
import { FeaturePreviewProps } from './FeaturePreview.types';
import * as S from './FeaturePreview.styles';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

export const FeaturePreview: React.FC<FeaturePreviewProps> = ({
  features,
  style = 'gradient-cards',
  animation = 'stagger-fade',
  className,
}) => {
  const cardVariant = style === 'gradient-cards' ? 'gradient' : 'accent';
  const AnimatedGrid = animation !== 'none' ? motion(S.FeatureGrid) : S.FeatureGrid;
  const AnimatedCard = animation !== 'none' ? motion(Card) : Card;

  return (
    <AnimatedGrid
      className={className}
      variants={animation === 'stagger-fade' ? container : undefined}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature, index) => (
        <AnimatedCard
          key={index}
          variant={cardVariant}
          variants={animation === 'stagger-fade' ? item : undefined}
          initial={animation === 'slide-in' ? { opacity: 0, x: -30 } : undefined}
          animate={animation === 'slide-in' ? { opacity: 1, x: 0 } : undefined}
          transition={animation === 'slide-in' ? { duration: 0.6, delay: index * 0.1 } : undefined}
        >
          <S.FeatureContent>
            <S.IconWrapper>
              <Icon name={feature.icon} size={32} color={cardVariant === 'gradient' ? 'white' : '#6366F1'} />
            </S.IconWrapper>
            <S.Title>{feature.title}</S.Title>
            <S.Description>{feature.description}</S.Description>
          </S.FeatureContent>
        </AnimatedCard>
      ))}
    </AnimatedGrid>
  );
}; 