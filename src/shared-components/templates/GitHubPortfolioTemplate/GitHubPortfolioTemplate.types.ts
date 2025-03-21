import { Filter } from '../../organisms/FilterBar';

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
  isPrivate: boolean;
  topics: string[];
}

export interface GitHubPortfolioTemplateProps {
  repositories: Repository[];
  filters: {
    languages: Filter[];
    topics: Filter[];
    types: Filter[];
  };
  selectedFilters: {
    languages: string[];
    topics: string[];
    types: string[];
  };
  isLoading?: boolean;
  error?: string;
  onFilterChange: (type: string, value: string) => void;
  onClearFilters: () => void;
  onSearch: (query: string) => void;
  onRetry?: () => void;
  onRepoClick?: (url: string) => void;
} 