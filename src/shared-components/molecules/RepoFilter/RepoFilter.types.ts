import { RepositoryFilterOptions } from '../../types/Repository.types';

export interface RepoFilterProps {
  filterOptions: RepositoryFilterOptions;
  onFilterChange: (newFilters: Partial<RepositoryFilterOptions>) => void;
  availableLanguages: string[];
  className?: string;
}
