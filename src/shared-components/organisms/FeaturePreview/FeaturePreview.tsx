import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card';
import { Icon } from '../../atoms/Icon';
import { FeaturePreviewProps } from './FeaturePreview.types';
import * as S from './FeaturePreview.styles';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { MotionSafe } from '../../../utils/animations/ssr-safe';

export const FeaturePreview: React.FC<FeaturePreviewProps> = ({
  features,
  style = 'gradient-cards',
  animation = 'stagger-fade',
  className,
}) => {
  const componentName = "FeaturePreview";
  const cardVariant = style === 'gradient-cards' ? 'gradient' : 'accent';
  
  // If animation is disabled, render without animation
  if (!animation || animation === 'none') {
    return (
      <S.FeatureGrid className={className}>
        {features.map((feature, index) => (
          <div key={index}>
            <Card variant={cardVariant}>
              <S.FeatureContent>
                <S.IconWrapper>
                  <Icon name={feature.icon} size={32} color={cardVariant === 'gradient' ? 'white' : '#6366F1'} />
                </S.IconWrapper>
                <S.Title>{feature.title}</S.Title>
                <S.Description>{feature.description}</S.Description>
              </S.FeatureContent>
            </Card>
          </div>
        ))}
      </S.FeatureGrid>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.6,
        mass: 1,
        tension: 280,
        friction: 60
      }
    })
  };

  const renderContent = () => (
    <MotionSafe
      componentName={componentName}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <S.FeatureGrid className={className}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={featureVariants}
          >
            <Card variant={cardVariant}>
              <S.FeatureContent>
                <S.IconWrapper>
                  <Icon name={feature.icon} size={32} color={cardVariant === 'gradient' ? 'white' : '#6366F1'} />
                </S.IconWrapper>
                <S.Title>{feature.title}</S.Title>
                <S.Description>{feature.description}</S.Description>
              </S.FeatureContent>
            </Card>
          </motion.div>
        ))}
      </S.FeatureGrid>
    </MotionSafe>
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