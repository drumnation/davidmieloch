import { Repository } from '../../types/Repository.types';

export interface RepoCardProps {
  repo: Repository;
  isCompact?: boolean;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
} 