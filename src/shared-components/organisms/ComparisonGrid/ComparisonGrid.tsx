import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../atoms/Icon';
import { ComparisonGridProps } from './ComparisonGrid.types';
import * as S from './ComparisonGrid.styles';
import { useInView } from 'react-intersection-observer';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';

export const ComparisonGrid: React.FC<ComparisonGridProps> = ({
  before_after,
  style = 'gradient-cards',
  position = 'full-width',
  className,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px',
  });

  const componentName = "ComparisonGrid";

  // Animation variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        mass: 1, 
        tension: 280, 
        friction: 60 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const renderContent = () => (
    <S.Container position={position} className={className}>
      <div ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={gridVariants}
        >
          <S.Grid>
            {before_after.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
              >
                <S.Card styleType={style}>
                  <S.AspectTitle>
                    {item.icon && (
                      <S.IconWrapper>
                        <Icon name={item.icon} size={18} />
                      </S.IconWrapper>
                    )}
                    {item.aspect}
                  </S.AspectTitle>
                  
                  <S.ComparisonContainer>
                    <S.ComparisonItem>
                      <S.Label>Before</S.Label>
                      <S.Value>{item.before}</S.Value>
                    </S.ComparisonItem>
                    
                    <S.ComparisonItem>
                      <S.Label>After</S.Label>
                      <S.Value>{item.after}</S.Value>
                    </S.ComparisonItem>
                  </S.ComparisonContainer>
                </S.Card>
              </motion.div>
            ))}
          </S.Grid>
        </motion.div>
      </div>
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