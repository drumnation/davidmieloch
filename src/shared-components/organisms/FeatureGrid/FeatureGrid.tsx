import React from 'react';
import { Box } from '@mantine/core';
import { FeatureGridProps } from './FeatureGrid.types';
import * as S from './FeatureGrid.styles';
import { H3, Body } from '../../atoms/Typography/Typography';
import { useInView } from 'react-intersection-observer';

// Import required icons
import { BsCodeSlash } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaBrain } from 'react-icons/fa';

/**
 * FeatureGrid Component
 * 
 * A grid display of features with icons, titles, and descriptions.
 */
export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  style = 'gradient-cards',
  animation = 'stagger-fade',
  className,
  layout = 'grid',
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Ensure columns is only 2, 3, or 4 for type safety
  const safeColumns = columns === 2 ? 2 : columns === 4 ? 4 : 3;

  const getCapabilityIcon = (title: string | undefined) => {
    switch (title) {
      case 'Seamless VSCode Extension':
      case 'Configure':
      case 'Validate':
        return <BsCodeSlash style={{ color: 'white', marginRight: '8px' }} />;
      case 'Hierarchical Agent Teams':
      case 'Integrate':
      case 'Ensure':
        return <HiOutlineUsers style={{ color: 'white', marginRight: '8px' }} />;
      case 'Unified Knowledge System':
      case 'Multiply':
      case 'Secure':
      case 'Personalize':
      case 'Maintain':
        return <FaBrain style={{ color: 'white', marginRight: '8px' }} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
    >

      <S.Grid $columns={safeColumns} $style={style} $layout={layout}>
        {features.map((feature, index) => {
          const isAccent = style === 'accent-cards';
          const capabilityIcon = isAccent ? getCapabilityIcon(feature.title) : null;

          return (
            <S.CardWrapper
              key={index}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ?
                  'translateY(0)' :
                  layout === 'row' ? `translateX(${20 * (features.length - index)}px)` : 'translateY(20px)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <S.FeatureCard
                variant={isAccent ? 'accent' : 'gradient'}
                padding="lg"
                $isAccent={isAccent}
                featureTitle={feature.title}
              >
                {!isAccent && feature.icon && (
                  <S.IconWrapper>
                    {feature.icon}
                  </S.IconWrapper>
                )}
                <S.Content $isAccent={isAccent}>
                  {feature.title && (
                    <S.Title $isKeyword={true} $isAccent={isAccent}>
                      {capabilityIcon}
                      {feature.title}
                    </S.Title>
                  )}
                  <S.CardBodyWrapper $isAccent={isAccent}>
                    <Body>
                      {feature.description}
                    </Body>
                  </S.CardBodyWrapper>
                </S.Content>
              </S.FeatureCard>
            </S.CardWrapper>
          );
        })}
      </S.Grid>
    </div>
  );
};

export default FeatureGrid; 