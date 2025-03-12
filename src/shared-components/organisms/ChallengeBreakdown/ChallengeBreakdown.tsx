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
  MetricValue
} from './ChallengeBreakdown.styles';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  }
};

export const ChallengeBreakdown: React.FC<ChallengeBreakdownProps> = ({
  title,
  description,
  challenges,
  style = 'gradient-card',
  position = 'full-width',
  animation = 'fade-up'
}) => {
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

  return (
    <Container
      position={position}
      initial={animation === 'none' ? undefined : 'hidden'}
      animate={animation === 'none' ? undefined : 'visible'}
      variants={containerVariants}
    >
      <StyledCard styleType={style}>
        <ContentWrapper>
          <MainTitle>
            {title}
          </MainTitle>
          <MainDescription>
            {description}
          </MainDescription>

          <ChallengeGrid>
            {challenges.map((challenge, index) => (
              <ChallengeCard
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {challenge.icon && (
                  <Group mb="lg">
                    <Text size="xl">{challenge.icon}</Text>
                  </Group>
                )}
                <Title order={3} size="h3" mb="xs" fw={600}>
                  {challenge.title}
                </Title>
                <Text mb="md" c="dimmed" size="md">
                  {challenge.description}
                </Text>
                <ImpactText>{challenge.impact}</ImpactText>

                {challenge.metrics && challenge.metrics.length > 0 && (
                  <MetricsContainer>
                    {challenge.metrics.map((metric, idx) => (
                      <Group key={idx} justify="space-between">
                        <Text size="sm" c="dimmed">
                          {metric.label}
                        </Text>
                        <Group gap="xs">
                          <MetricValue>{metric.value}</MetricValue>
                          {getTrendIcon(metric.trend)}
                        </Group>
                      </Group>
                    ))}
                  </MetricsContainer>
                )}
              </ChallengeCard>
            ))}
          </ChallengeGrid>
        </ContentWrapper>
      </StyledCard>
    </Container>
  );
};