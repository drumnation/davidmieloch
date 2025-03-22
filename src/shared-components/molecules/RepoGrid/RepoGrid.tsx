import React from 'react';
import { RepoGridProps } from './RepoGrid.types';
import { GridContainer, EmptyState, EmptyStateIcon } from './RepoGrid.styles';
import { RepoCard } from '../RepoCard';

export const RepoGrid: React.FC<RepoGridProps> = ({
  repositories,
  onRepoClick,
  selectedRepoId,
  className,
  emptyStateMessage = 'No repositories found'
}) => {
  if (!repositories.length) {
    return (
      <EmptyState className={className}>
        <EmptyStateIcon>📚</EmptyStateIcon>
        <h3>No Repositories</h3>
        <p>{emptyStateMessage}</p>
      </EmptyState>
    );
  }

  return (
    <GridContainer className={className}>
      {repositories.map((repo) => (
        <RepoCard
          key={repo.id}
          repository={repo}
          onClick={onRepoClick ? () => onRepoClick(repo) : undefined}
          isSelected={selectedRepoId === repo.id}
        />
      ))}
    </GridContainer>
  );
}; 