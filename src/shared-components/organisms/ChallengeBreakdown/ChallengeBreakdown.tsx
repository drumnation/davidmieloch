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
  challenges = [],
  key_issues = [],
  style = 'gradient-card',
  position = 'full-width',
  animation = 'fade-up',
  className
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

  // Use either challenges or key_issues, prioritizing challenges if both are provided
  const items = challenges.length > 0 ? challenges : key_issues;

  return (
    <Container
      position={position}
      initial={animation === 'none' ? undefined : 'hidden'}
      animate={animation === 'none' ? undefined : 'visible'}
      variants={containerVariants}
      className={`challenge-breakdown-container ${className || ''}`}
    >
      <StyledCard $styleType={style} className="challenge-breakdown-card">
        <ContentWrapper className="challenge-breakdown-content">
          <MainTitle className="challenge-breakdown-title">
            {title}
          </MainTitle>
          <div className="challenge-breakdown-description" style={{ 
            fontSize: '1.125rem', 
            fontWeight: 500, 
            lineHeight: 1.6, 
            color: style === 'gradient-card' ? 'rgba(255, 255, 255, 0.95)' : 'inherit', 
            marginBottom: '1.5rem',
            padding: '0 0.5rem' 
          }}>
            {description}
          </div>

          <ChallengeGrid className="challenge-grid">
            {items && items.length > 0 ? items.map((challenge, index) => (
              <ChallengeCard
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="challenge-card"
              >
                {challenge.icon && (
                  <Group mb="sm" gap="md" className="challenge-icon" style={{ alignItems: 'center' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '30px',
                      height: '30px'
                    }}>
                      <Text size="xl">{challenge.icon}</Text>
                    </div>
                  </Group>
                )}
                <Title order={3} size="h3" mb="xs" fw={600} className="challenge-title" style={{ 
                  textAlign: 'left', 
                  paddingLeft: challenge.icon ? '0.25rem' : '0'
                }}>
                  {challenge.title}
                </Title>
                <Text mb="md" c="dimmed" size="md" className="challenge-description" style={{ 
                  fontSize: '1rem', 
                  lineHeight: 1.5,
                  paddingLeft: challenge.icon ? '0.25rem' : '0'
                }}>
                  {challenge.description}
                </Text>
                <ImpactText className="challenge-impact">{challenge.impact}</ImpactText>

                {challenge.metrics && challenge.metrics.length > 0 && (
                  <MetricsContainer className="challenge-metrics">
                    {challenge.metrics.map((metric, idx) => (
                      <Group key={idx} justify="space-between" className="challenge-metric-item">
                        <Text size="sm" c="dimmed" className="challenge-metric-label">
                          {metric.label}
                        </Text>
                        <Group gap="xs" className="challenge-metric-value-container">
                          <MetricValue className="challenge-metric-value">{metric.value}</MetricValue>
                          {getTrendIcon(metric.trend)}
                        </Group>
                      </Group>
                    ))}
                  </MetricsContainer>
                )}
              </ChallengeCard>
            )) : (
              <div className="no-challenges-message">No challenges to display</div>
            )}
          </ChallengeGrid>
        </ContentWrapper>
      </StyledCard>
    </Container>
  );
};