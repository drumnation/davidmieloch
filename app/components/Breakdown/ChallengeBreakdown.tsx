import React from 'react';
import { useSpring, useSprings, config } from '@react-spring/web';
import { Text, Title, Grid, Container } from '@mantine/core';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
} from '@tabler/icons-react';

import {
  Challenge,
  ChallengeBreakdownProps,
} from './ChallengeBreakdown.types';
import {
  StyledAnimatedContainer,
  StyledFullWidthContainer,
  StyledChallengeGrid,
  StyledChallengeCard,
  StyledTrendContainer,
  StyledTrendIconContainer,
} from './ChallengeBreakdown.styles';

export const ChallengeBreakdown: React.FC<ChallengeBreakdownProps> = ({
  title,
  description,
  challenges,
}) => {
  const containerAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    config: config.gentle,
  });

  const itemSprings = useSprings(
    challenges.length,
    challenges.map((_: Challenge, i: number) => ({
      from: {
        opacity: 0,
        transform: 'scale(0.9)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
      },
      delay: 300 + i * 100,
      config: config.gentle,
    }))
  );

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return (
        <StyledTrendIconContainer positive>
          <IconTrendingUp size={16} />
        </StyledTrendIconContainer>
      );
    }
    if (trend < 0) {
      return (
        <StyledTrendIconContainer negative>
          <IconTrendingDown size={16} />
        </StyledTrendIconContainer>
      );
    }
    return (
      <StyledTrendIconContainer>
        <IconMinus size={16} />
      </StyledTrendIconContainer>
    );
  };

  return (
    <StyledFullWidthContainer>
      <StyledAnimatedContainer style={containerAnimation}>
        <Container size="lg">
          <Title order={2} mb="md">
            {title}
          </Title>
          <Text mb="xl">{description}</Text>
          <StyledChallengeGrid>
            {challenges.map((challenge: Challenge, index: number) => (
              <StyledChallengeCard
                key={challenge.id}
                style={itemSprings[index]}
              >
                <Grid>
                  <Grid.Col span={8}>
                    <Title order={4}>{challenge.name}</Title>
                    <Text size="sm" color="dimmed">
                      {challenge.description}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <StyledTrendContainer>
                      <Text fw={700} ta="right">
                        {challenge.value}%
                      </Text>
                      {getTrendIcon(challenge.trend)}
                    </StyledTrendContainer>
                  </Grid.Col>
                </Grid>
              </StyledChallengeCard>
            ))}
          </StyledChallengeGrid>
        </Container>
      </StyledAnimatedContainer>
    </StyledFullWidthContainer>
  );
};

export default ChallengeBreakdown; 