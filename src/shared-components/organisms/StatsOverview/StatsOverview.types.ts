export interface RepositoryStats {
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  totalIssues: number;
  topLanguages: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  topTopics: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  contributionsByMonth: Array<{
    month: string;
    count: number;
  }>;
}

export interface StatsOverviewProps {
  stats: RepositoryStats;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
} 