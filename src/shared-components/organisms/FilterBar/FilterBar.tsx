import React from 'react';
import { X } from 'lucide-react';
import { FilterItem } from '../../molecules/FilterItem';
import { FilterBarProps, Filter } from './FilterBar.types';
import {
  FilterBarContainer,
  FilterSection,
  SectionTitle,
  FilterList,
  ClearFiltersButton,
  Header,
  Title,
} from './FilterBar.styles';

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasSelectedFilters = Object.values(selectedFilters).some((values) => values.length > 0);

  const renderFilterSection = (title: string, items: Filter[], type: Filter['type']) => {
    if (!items.length) return null;

    return (
      <FilterSection>
        <SectionTitle>{title}</SectionTitle>
        <FilterList>
          {items.map((filter) => (
            <FilterItem
              key={`${filter.type}-${filter.value}`}
              label={`${filter.label} (${filter.count})`}
              value={filter.value}
              variant={filter.type}
              isSelected={selectedFilters[`${filter.type}s` as keyof typeof selectedFilters].includes(
                filter.value
              )}
              onClick={() => onFilterChange(filter.type, filter.value)}
            />
          ))}
        </FilterList>
      </FilterSection>
    );
  };

  return (
    <FilterBarContainer>
      <Header>
        <Title>Filters</Title>
        {hasSelectedFilters && onClearFilters && (
          <ClearFiltersButton onClick={onClearFilters}>
            <X size={16} />
            Clear all
          </ClearFiltersButton>
        )}
      </Header>

      {renderFilterSection('Languages', filters.languages, 'language')}
      {renderFilterSection('Topics', filters.topics, 'topic')}
      {renderFilterSection('Types', filters.types, 'type')}
    </FilterBarContainer>
  );
}; 