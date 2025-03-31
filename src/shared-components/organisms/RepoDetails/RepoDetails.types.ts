import { Repository } from '../../types/Repository.types';

export interface RepoDetailsProps {
  repository: Repository;
  onBack?: () => void;
  className?: string;
} 