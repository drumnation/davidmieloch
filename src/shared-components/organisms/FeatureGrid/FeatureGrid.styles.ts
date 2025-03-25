import styled, { css } from 'styled-components';
import { Card as BaseCard } from '../../atoms/Card/Card';
import { StyledFeatureGridProps } from './FeatureGrid.types';

export const Grid = styled.div<StyledFeatureGridProps & { $inView: boolean }>`
  display: grid;
  gap: 2rem;
  width: 100%;
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transition: opacity 0.5s ease-out;
  
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

export const FeatureCard = styled(BaseCard)`
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

export const CardWrapper = styled.div<{ $inView: boolean; $index: number }>`
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transform: translateY(${({ $inView }) => ($inView ? 0 : '30px')});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${({ $index }) => $index * 100}ms;
`; 