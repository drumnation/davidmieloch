import styled, { css } from 'styled-components';
import { animated, SpringValue, Interpolation } from '@react-spring/web';
import { Card } from '../../atoms/Card/Card';
import { StyledFeatureGridProps } from './FeatureGrid.types';
import { PropsWithChildren } from 'react';

export const Grid = styled.div<StyledFeatureGridProps>`
  display: grid;
  gap: 2rem;
  width: 100%;
  
  /* Mobile first - single column */
  grid-template-columns: 1fr;
  
  /* Tablet - 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Desktop - specified number of columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  }
`;

export const FeatureCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--bg-light);
  color: var(--primary-blue);
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

// Define properly typed animated components
interface AnimatedProps {
  style?: {
    opacity?: SpringValue<number> | number;
    transform?: string | SpringValue<string> | Interpolation<number, string>;
    [key: string]: any;
  };
  className?: string;
  ref?: React.RefObject<any> | ((node: any) => void);
}

// Create properly typed animated components that can accept children
export const AnimatedDiv = animated.div as React.FC<PropsWithChildren<AnimatedProps>>;
export const AnimatedContent = animated(Content) as React.FC<PropsWithChildren<AnimatedProps>>; 