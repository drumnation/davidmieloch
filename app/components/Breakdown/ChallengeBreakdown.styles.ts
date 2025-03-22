import styled from 'styled-components';
import { AnimatedDiv } from '../../../src/utils/animations/typed-components';

export const StyledFullWidthContainer = styled.div`
  width: 100%;
  margin: 4rem 0;
`;

export const StyledAnimatedContainer = styled(AnimatedDiv)`
  width: 100%;
`;

export const StyledChallengeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledChallengeCard = styled(AnimatedDiv)`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme?.colors?.background?.light || '#fff'};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme?.shadows?.sm || '0 4px 12px rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.light || '#eaeaea'};
`;

export const StyledTrendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
`;

interface TrendIconContainerProps {
  positive?: boolean;
  negative?: boolean;
}

export const StyledTrendIconContainer = styled.div<TrendIconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  margin-top: 8px;
  background-color: ${({ positive, negative, theme }) =>
    positive
      ? theme?.colors?.accent?.green || '#ebfbee'
      : negative
      ? theme?.colors?.accent?.red || '#ffebee'
      : theme?.colors?.background?.light || '#f5f5f5'};
  color: ${({ positive, negative, theme }) =>
    positive
      ? theme?.colors?.accent?.green || '#10b981'
      : negative
      ? theme?.colors?.accent?.red || '#ef4444'
      : theme?.colors?.text?.secondary || '#6b7280'};
`; 