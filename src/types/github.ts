export interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  updated_at: string;
  homepage?: string;
  private: boolean;
}

export interface RepositoryStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  topLanguages: { [key: string]: number };
  topTopics: { [key: string]: number };
} 