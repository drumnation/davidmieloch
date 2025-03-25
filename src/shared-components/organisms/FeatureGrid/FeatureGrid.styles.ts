import styled, { css } from 'styled-components';
import { Card as BaseCard } from '../../atoms/Card/Card';
import { StyledFeatureGridProps } from './FeatureGrid.types';

export const Grid = styled.div<StyledFeatureGridProps>`
  width: 100%;
  
  ${({ $layout = 'grid', $columns }) => $layout === 'grid' ? css`
    display: grid;
    gap: 2rem;
    
    /* Mobile first - single column */
    grid-template-columns: 1fr;
    
    /* Tablet - 2 columns */
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    /* Desktop - specified number of columns */
    @media (min-width: 1024px) {
      grid-template-columns: repeat(${$columns}, 1fr);
    }
  ` : css`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 2rem;
    overflow-x: auto;
    padding: 1rem 0;
    margin: 0 -1rem;
    width: calc(100% + 2rem);
    position: relative;
    
    /* Add a shadow to indicate scrolling */
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 50px;
      background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8));
      pointer-events: none;
    }
    
    /* Hide scrollbar but allow scrolling */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Ensure cards maintain consistent width in row layout */
    & > div {
      flex: 0 0 auto;
      width: 280px;
      max-width: 85%;
      margin: 0 0.5rem;
      
      &:first-child {
        margin-left: 1rem;
      }
      
      &:last-child {
        margin-right: 1rem;
        padding-right: 50px; /* Add space for the shadow */
      }
    }
  `}
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