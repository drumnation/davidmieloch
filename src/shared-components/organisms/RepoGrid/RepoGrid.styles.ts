import styled from 'styled-components';
import { GridContainerProps } from './RepoGrid.types';

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  grid-column: 1 / -1;
`;

export const ErrorState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: ${({ theme }) => theme.fontSizes.md};
  grid-column: 1 / -1;
`;

export const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const LoadingContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const LoadingCard = styled.div`
  height: 180px;
  background: linear-gradient(
    110deg,
    ${({ theme }) => theme.colors.background.light} 8%,
    ${({ theme }) => theme.colors.background.paper} 18%,
    ${({ theme }) => theme.colors.background.light} 33%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;

  @keyframes shimmer {
    to {
      background-position-x: -200%;
    }
  }
`; 