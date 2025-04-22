import styled from 'styled-components';
import { GridContainerProps } from './RepoGrid.types';
import { MantineTheme } from '@mantine/core';

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.gray[6]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  grid-column: 1 / -1;
`;

export const ErrorState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  grid-column: 1 / -1;
`;

export const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  }
`;

export const LoadingContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0;
  }
`;

export const LoadingCard = styled.div`
  height: 180px;
  background: linear-gradient(
    110deg,
    ${({ theme }) => theme.colors.gray[0]} 8%,
    ${({ theme }) => theme.colors.gray[1]} 18%,
    ${({ theme }) => theme.colors.gray[0]} 33%
  );
  border-radius: ${({ theme }) => theme.radius.lg};
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;

  @keyframes shimmer {
    to {
      background-position-x: -200%;
    }
  }
`; 