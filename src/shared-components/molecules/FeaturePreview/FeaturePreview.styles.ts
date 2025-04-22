import styled from 'styled-components';
import { animated } from '@react-spring/web';
import { MantineTheme } from '@mantine/core';

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const IconWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
`;

// Animated versions
export const AnimatedFeatureGrid = animated(FeatureGrid);
export const AnimatedFeatureContent = animated(FeatureContent);
export const AnimatedIconWrapper = animated(IconWrapper);
export const AnimatedTitle = animated(Title);
export const AnimatedDescription = animated(Description); 