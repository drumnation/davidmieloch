import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card';
import { Icon } from '../../atoms/Icon';
import { FeaturePreviewProps } from './FeaturePreview.types';
import * as S from './FeaturePreview.styles';

export const FeaturePreview: React.FC<FeaturePreviewProps> = ({
  features,
  style = 'gradient-cards',
  animation = 'stagger-fade',
  className,
}) => {
  const cardVariant = style === 'gradient-cards' ? 'gradient' : 'accent';
  
  // Use the 'as' prop approach for conditional animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <S.FeatureGrid
      className={className}
      {...(animation !== 'none' ? {
        as: motion.div,
        initial: "hidden",
        animate: "visible",
        variants: containerVariants
      } : {})}
    >
      {features.map((feature, index) => (
        <Card
          key={index}
          variant={cardVariant}
          {...(animation !== 'none' ? {
            as: motion.div,
            variants: cardVariants
          } : {})}
        >
          <S.FeatureContent>
            <S.IconWrapper>
              <Icon name={feature.icon} size={32} color={cardVariant === 'gradient' ? 'white' : '#6366F1'} />
            </S.IconWrapper>
            <S.Title>{feature.title}</S.Title>
            <S.Description>{feature.description}</S.Description>
          </S.FeatureContent>
        </Card>
      ))}
    </S.FeatureGrid>
  );
}; 