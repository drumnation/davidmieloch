import { Repository } from '../../types/Repository.types';

export interface GridContainerProps {
  columns?: number;
  gap?: number;
}

export interface RepoGridProps {
  repositories: Repository[];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  emptyMessage?: string;
  columns?: 1 | 2 | 3;
  gap?: number;
  onRepoClick?: (url: string) => void;
} 