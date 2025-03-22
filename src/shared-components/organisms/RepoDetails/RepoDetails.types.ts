import { Repository } from '../../types';

export interface RepoDetailsProps {
  repository: Repository;
  onBack?: () => void;
  className?: string;
} 