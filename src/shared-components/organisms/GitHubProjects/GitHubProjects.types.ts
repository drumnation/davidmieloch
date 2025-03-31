import { Repository } from '../../types/Repository.types';

export interface GitHubProjectsProps {
  initialRepositories?: Repository[];
  title?: string;
  description?: string;
  className?: string;
} 