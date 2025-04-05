import React from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';
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
  
  // Container animation
  const containerProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  // Feature card animation with trail effect
  const featureTrail = useTrail(features.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 100
  });

  // Create animated versions of styled components
  const AnimatedFeatureGrid = animated(S.FeatureGrid);
  const AnimatedDiv = animated.div;

  return (
    <AnimatedFeatureGrid
      className={className}
      style={animation !== 'none' ? containerProps : undefined}
    >
      {features.map((feature, index) => (
        <AnimatedDiv 
          key={index} 
          style={animation !== 'none' ? 
            { ...featureTrail[index], transform: featureTrail[index].y.to(y => `translateY(${y}px)`) } : 
            undefined
          }
        >
          <Card
            variant={cardVariant}
          >
            <S.FeatureContent>
              <S.IconWrapper>
                <Icon name={feature.icon} size={32} color={cardVariant === 'gradient' ? 'white' : '#6366F1'} />
              </S.IconWrapper>
              <S.Title>{feature.title}</S.Title>
              <S.Description>{feature.description}</S.Description>
            </S.FeatureContent>
          </Card>
        </AnimatedDiv>
      ))}
    </AnimatedFeatureGrid>
  );
}; 