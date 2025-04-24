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

// Extend BaseCard props implicitly and add custom props
interface FeatureCardProps {
  $isAccent?: boolean;
  featureTitle?: string;
}

export const FeatureCard = styled(BaseCard) <FeatureCardProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Add specific styles for accent-cards */
  ${({ $isAccent, featureTitle, theme }) => $isAccent && css`
    /* Use appropriate colors for better contrast */
    background-color: ${() => {
      switch (featureTitle) {
        case 'Configure':
        case 'Validate':
        case 'Seamless VSCode Extension':
          return theme.colors.blue[6]; // Blue
        case 'Integrate':
        case 'Ensure':
        case 'Hierarchical Agent Teams':
          return theme.colors.violet[7]; // Violet/Purple
        case 'Multiply':
        case 'Secure':
        case 'Unified Knowledge System':
          return theme.colors.green[6]; // Green
        case 'Personalize':
        case 'Maintain':
          return theme.colors.red[7]; // Red
        default:
          return theme.colors.teal[7]; // Teal as default
      }
    }};
    background-image: none;
    padding: ${theme.spacing.xl}; /* Increase padding */
    color: white; /* Ensure text is white for all accent cards */
    
    [data-mantine-color-scheme="dark"] & {
      /* Add a subtle border in dark mode for better definition */
      border: 1px solid rgba(255, 255, 255, 0.1);
      /* Slightly darken background colors in dark mode */
      background-color: ${() => {
      switch (featureTitle) {
        case 'Configure':
        case 'Validate':
        case 'Seamless VSCode Extension':
          return theme.colors.blue[8]; // Darker blue 
        case 'Integrate':
        case 'Ensure':
        case 'Hierarchical Agent Teams':
          return theme.colors.violet[9]; // Darker violet
        case 'Multiply':
        case 'Secure':
        case 'Unified Knowledge System':
          return theme.colors.green[8]; // Darker green
        case 'Personalize':
        case 'Maintain':
          return theme.colors.red[9]; // Darker red
        default:
          return theme.colors.teal[9]; // Darker teal as default
      }
    }};
    }
  `}
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

// Add $isAccent prop
interface ContentProps {
  $isAccent?: boolean;
}

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  min-height: 0; /* Needed for Firefox */
  flex-grow: 1; /* Allow content to take remaining space */
  /* Align text left for accent cards */
  ${({ $isAccent }) => $isAccent && css`
    text-align: left;
  `}
`;

export const CardWrapper = styled.div`
  transition: transform 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Title = styled.h4<{ $isKeyword?: boolean, $isAccent?: boolean }>`
  margin: 0 0 1rem 0;
  font-size: ${({ $isKeyword }) => $isKeyword ? '1.2rem' : '1rem'};
  font-weight: bold;
  color: ${({ $isAccent }) => $isAccent ? 'white' : 'var(--text-primary)'}; 
  line-height: 1.3;
  /* Remove min-height to allow natural flow */
  /* min-height: 3rem; */ 
  display: flex;
  align-items: center; 
  /* Justify content left for accent cards */
  justify-content: ${({ $isAccent }) => $isAccent ? 'flex-start' : 'center'};
`;

// Add a new styled component for card body text
export const CardBodyWrapper = styled.div<{ $isAccent?: boolean }>`
  color: ${({ $isAccent }) => $isAccent ? 'white' : 'inherit'};
  font-weight: ${({ $isAccent }) => $isAccent ? 400 : 'inherit'};
  text-align: left;
  margin-top: auto;
  
  /* Ensure any child typography components maintain proper color */
  * {
    color: ${({ $isAccent }) => $isAccent ? 'white !important' : 'inherit'};
  }
`; 