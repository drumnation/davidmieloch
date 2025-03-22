export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string;
  language?: string;
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  createdAt: string;
  updatedAt: string;
  pushedAt?: string;
  topics: string[];
  isPrivate: boolean;
  owner: RepositoryOwner;
}

export interface RepositoryOwner {
  login: string;
  id: string;
  avatarUrl: string;
  url: string;
}

export interface RepositoryFilterOptions {
  language?: string | null;
  sortBy?: \"stars\" | \"forks\" | \"updated\" | \"created\";
  order?: \"asc\" | \"desc\";
  searchTerm?: string;
}

export interface RepositoriesState {
  repositories: Repository[];
  filteredRepositories: Repository[];
  isLoading: boolean;
  error: string | null;
  filterOptions: RepositoryFilterOptions;
}
