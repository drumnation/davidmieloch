import styled, { css } from 'styled-components';
import { Card as BaseCard } from '../../atoms/Card/Card';
import { StyledFeatureGridProps } from './FeatureGrid.types';

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

export const CardWrapper = styled.div`
  transition: transform 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Title = styled.h4<{ $isKeyword?: boolean }>`
  margin: 0 0 0.5rem 0;
  font-size: ${({ $isKeyword }) => $isKeyword ? '1.2rem' : '1rem'};
  font-weight: bold;
  color: white;
  line-height: 1.3;
`; 