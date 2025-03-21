export interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  lastUpdated: string;
  createdAt?: string;
  isPrivate: boolean;
  topics: string[];
}

export interface RepoCardProps {
  repo: Repository;
  isCompact?: boolean;
  className?: string;
  onClick?: () => void;
} 