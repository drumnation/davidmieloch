import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';

interface ContainerProps {
  $position: 'full-width' | 'left' | 'right' | 'center';
}

interface CardProps {
  $style: 'accent-cards' | 'gradient-cards' | 'default';
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  justify-content: ${({ $position }) => {
    switch ($position) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      case 'center': return 'center';
      case 'full-width': return 'stretch';
      default: return 'flex-start';
    }
  }};
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div<CardProps>`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
  
  ${({ $style, theme }) => $style === 'gradient-cards' && css`
    background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    color: white;
  `}
  
  ${({ $style, theme }) => $style === 'accent-cards' && css`
    background: ${theme.colors.primary.light};
    color: white;
    border: 1px solid ${theme.colors.primary.main};
  `}
  
  ${({ $style, theme }) => $style === 'default' && css`
    background: ${theme.colors.background.paper};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.light};
  `}
`;

export const CardHeader = styled.div`
  padding: 1.25rem 1.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.1);
  
  p {
    font-weight: 700;
    font-size: 1.25rem;
    margin: 0;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: white;
    margin: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const CardBody = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CurrentState = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  flex: 1;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
`;

export const Impact = styled.div`
  font-size: 1.1rem;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  
  strong {
    font-weight: 700;
    color: white;
    margin-right: 0.5rem;
  }
`;

// Animated versions
export const AnimatedContainer = animated(Container);
export const AnimatedCardsContainer = animated(CardsContainer);
export const AnimatedCard = animated(Card);
export const AnimatedCardHeader = animated(CardHeader);
export const AnimatedCardBody = animated(CardBody);
export const AnimatedCurrentState = animated(CurrentState);
export const AnimatedImpact = animated(Impact); 