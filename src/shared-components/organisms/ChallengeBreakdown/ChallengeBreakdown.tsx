import React from 'react';
import { motion } from 'framer-motion';
import { Text, Title, Group } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react';
import { ChallengeBreakdownProps } from './ChallengeBreakdown.types';
import {
  Container,
  StyledCard,
  ContentWrapper,
  MainTitle,
  MainDescription,
  ChallengeGrid,
  ChallengeCard,
  MetricsContainer,
  ImpactText,
  MetricValue,
  ChallengeDescription
} from './ChallengeBreakdown.styles';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { MotionSafe } from '../../../utils/animations/ssr-safe';

export const ChallengeBreakdown: React.FC<ChallengeBreakdownProps> = ({
  title,
  description,
  challenges = [],
  key_issues = [],
  style = 'gradient-card',
  position = 'full-width',
  animation = 'fade-up',
  className
}) => {
  const componentName = "ChallengeBreakdown";

  // Animation variants
  const containerVariants = {
    hidden: animation === 'none' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 1,
        tension: 280,
        friction: 20,
        delay: 0.3 + (i * 0.05)
      }
    })
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    const color = trend === 'up' ? '#E53E3E' : trend === 'down' ? '#38A169' : '#718096';
    
    switch (trend) {
      case 'up':
        return <IconTrendingUp size={16} color={color} />;
      case 'down':
        return <IconTrendingDown size={16} color={color} />;
      default:
        return <IconMinus size={16} color={color} />;
    }
  };

  // Items array
  const items = challenges.length > 0 ? challenges : key_issues;

  const renderContent = () => (
    <MotionSafe
      componentName={componentName}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Container position={position}>
        <StyledCard $styleType={style}>
          <ContentWrapper>
            {title && (
              <MainTitle>
                {title}
              </MainTitle>
            )}
            {description && (
              <MainDescription>
                {description}
              </MainDescription>
            )}
            <ChallengeGrid>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                >
                  <ChallengeCard>
                    {/* Challenge Title if it exists */}
                    {item.title && (
                      <Title order={3} mb="sm">
                        {item.title}
                      </Title>
                    )}
                    
                    {/* Description */}
                    <ChallengeDescription>
                      {item.description}
                    </ChallengeDescription>
                    
                    {/* Metrics if they exist */}
                    {item.metrics && (
                      <MetricsContainer>
                        {Object.entries(item.metrics).map(([key, value]) => (
                          <Group key={key} justify="space-between" mb="xs">
                            <Text size="sm" color="dimmed">{key}:</Text>
                            <Group gap="xs">
                              {typeof value === 'object' && 'value' in value ? (
                                <>
                                  <MetricValue>
                                    {value.value}
                                  </MetricValue>
                                  {getTrendIcon(value.trend)}
                                </>
                              ) : (
                                <MetricValue>
                                  {value as string}
                                </MetricValue>
                              )}
                            </Group>
                          </Group>
                        ))}
                      </MetricsContainer>
                    )}
                    
                    {/* Impact if it exists */}
                    {item.impact && (
                      <ImpactText>
                        Impact: <strong>{item.impact}</strong>
                      </ImpactText>
                    )}
                  </ChallengeCard>
                </motion.div>
              ))}
            </ChallengeGrid>
          </ContentWrapper>
        </StyledCard>
      </Container>
    </MotionSafe>
  );

  return (
    <AnimationErrorBoundary componentName={componentName}>
      <AnimationDebugger 
        componentName={componentName} 
        trackRenders={true} 
        logLifecycle={true}
        detectCircular={true}
      >
        {renderContent()}
      </AnimationDebugger>
    </AnimationErrorBoundary>
  );
};