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
      grid-template-columns: repeat(${$columns}, minmax(0, 1fr));
    }
    
    /* Ensure all cards have the same height and width */
    & > div {
      height: 100%;
      width: 100%;
    }
  ` : css`
    /* Row layout styles */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; /* Allow wrapping instead of forcing no-wrap */
    gap: 1.5rem; /* Keep or adjust gap as needed */
    /* Remove overflow, padding, margin, width calc, and shadow */
    /* overflow-x: auto; */
    /* padding: 1rem 0; */
    /* margin: 0 -1rem; */
    /* width: calc(100% + 2rem); */
    /* position: relative; */

    /* Remove scroll shadow */
    /* &::after { ... } */

    /* Remove scrollbar hiding */
    /* scrollbar-width: none; */
    /* -ms-overflow-style: none; */
    /* &::-webkit-scrollbar { display: none; } */

    /* Let items flex */
    & > div {
      flex: 1 1 280px; /* Allow flex grow/shrink, base width 280px */
      max-width: 100%; /* Allow items to take full width if needed when wrapped */
      /* Remove specific row layout margins */
      /* margin: 0 0.5rem; */
      /* &:first-child { margin-left: 1rem; } */
      /* &:last-child { margin-right: 1rem; padding-right: 50px; } */
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
  margin: 0 auto 1rem auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0; /* Needed for Firefox */
`;

export const CardWrapper = styled.div`
  transition: transform 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Title = styled.h4<{ $isKeyword?: boolean }>`
  margin: 0 0 1rem 0;
  font-size: ${({ $isKeyword }) => $isKeyword ? '1.2rem' : '1rem'};
  font-weight: bold;
  color: white;
  line-height: 1.3;
  min-height: 3rem; /* Ensure consistent height for titles */
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
`; 