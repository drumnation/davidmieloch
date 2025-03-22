import React from 'react';
import { useSpring, useTrail, config } from '@react-spring/web';
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
  // Container animation
  const containerSpring = useSpring({
    from: animation === 'none' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: config.gentle,
    delay: 100
  });

  // Items animation with trail effect
  const items = challenges.length > 0 ? challenges : key_issues;
  const trails = useTrail(items.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { mass: 1, tension: 280, friction: 20 },
    delay: 300
  });

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
      className={`challenge-breakdown-container ${className || ''}`}
      style={containerSpring as any}
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
            {items && items.length > 0 ? 
              items.map((challenge, index) => (
                <ChallengeCard
                  key={index}
                  style={trails[index] as any}
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
              ))
            : (
              <div className="no-challenges-message">No challenges to display</div>
            )}
          </ChallengeGrid>
        </ContentWrapper>
      </StyledCard>
    </Container>
  );
};