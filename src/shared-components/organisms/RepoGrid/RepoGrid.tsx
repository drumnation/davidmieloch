import React from 'react';
import { RepoCard } from '../../molecules/RepoCard';
import { RepoGridProps } from './RepoGrid.types';
import {
  GridContainer,
  EmptyState,
  ErrorState,
  RetryButton,
  LoadingContainer,
  LoadingCard,
} from './RepoGrid.styles';

export const RepoGrid: React.FC<RepoGridProps> = ({
  repositories,
  isLoading = false,
  error,
  onRetry,
  emptyMessage = 'No repositories found',
  columns = 3,
  gap = 24,
  onRepoClick,
}) => {
  if (isLoading) {
    return (
      <LoadingContainer columns={columns} gap={gap}>
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorState>
        {error}
        {onRetry && (
          <RetryButton onClick={onRetry}>
            Try again
          </RetryButton>
        )}
      </ErrorState>
    );
  }

  if (!repositories.length) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <GridContainer columns={columns} gap={gap}>
      {repositories.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
          onClick={() => {
            console.log('Repo clicked:', repo.url);
            if (onRepoClick) {
              onRepoClick(repo.url);
            }
          }}
        />
      ))}
    </GridContainer>
  );
}; 