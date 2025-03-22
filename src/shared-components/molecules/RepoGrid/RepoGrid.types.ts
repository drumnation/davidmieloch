import { Repository } from '../../types';

export interface RepoGridProps {
  repositories: Repository[];
  onRepoClick?: (repo: Repository) => void;
  selectedRepoId?: string;
  className?: string;
  emptyStateMessage?: string;
} 