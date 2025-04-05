import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon';
import { NavigationCardProps } from './NavigationCard.types';
import * as S from './NavigationCard.styles';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';

export const NavigationCard: React.FC<NavigationCardProps> = ({
  content,
  title,
  description,
  action,
  link,
  icon,
  style = 'gradient-card',
  animation = 'fade-up',
  className,
}) => {
  const componentName = "NavigationCard";
  
  // Support both content object and direct props
  const cardText = content?.text || title || '';
  const cardDescription = description || '';
  const cardAction = content?.action || action || '';
  const cardLink = content?.link || link || '#';
  const cardIcon = content?.icon || icon || '';
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px 0px',
  });
  
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.1
      }
    }
  };

  const renderContent = () => (
    <S.Container className={className} ref={ref}>
      <S.AnimatedCard 
        $style={style}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <S.CardContent>
          {cardIcon && (
            <S.IconWrapper>
              <Icon name={cardIcon} size={24} />
            </S.IconWrapper>
          )}
          
          <Typography variant="h3" className="mb-3" color="light">
            {cardText}
          </Typography>
          
          {cardDescription && (
            <Typography variant="body" color="secondary" className="mb-4">
              {cardDescription}
            </Typography>
          )}
          
          {cardAction && cardLink && (
            <S.ActionLink href={cardLink}>
              {cardAction}
              <S.IconWrapper style={{ marginLeft: '0.5rem' }}>
                <Icon name="arrow-right" size={18} />
              </S.IconWrapper>
            </S.ActionLink>
          )}
        </S.CardContent>
      </S.AnimatedCard>
    </S.Container>
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