import { Repository } from '../../types';

export interface GitHubProjectsProps {
  initialRepositories?: Repository[];
  username?: string;
  className?: string;
} 