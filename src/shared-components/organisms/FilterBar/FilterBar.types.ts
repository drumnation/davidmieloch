export interface Filter {
  type: 'language' | 'topic' | 'type';
  value: string;
  label: string;
  count: number;
}

export interface FilterBarProps {
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
  onFilterChange: (type: Filter['type'], value: string) => void;
  onClearFilters?: () => void;
} 