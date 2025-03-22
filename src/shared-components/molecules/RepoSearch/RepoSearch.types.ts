export interface RepoSearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
} 