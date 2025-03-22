import React from 'react';
import { RepoFilterProps } from './RepoFilter.types';
import {
  FilterContainer,
  FilterSection,
  SectionTitle,
  FilterGroup,
  LanguageTag,
  SortSelect,
  OrderToggle
} from './RepoFilter.styles';

export const RepoFilter: React.FC<RepoFilterProps> = ({
  filterOptions,
  onFilterChange,
  availableLanguages,
  className
}) => {
  const handleLanguageChange = (language: string | null) => {
    onFilterChange({
      language: language === filterOptions.language ? null : language
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      sortBy: e.target.value as 'stars' | 'forks' | 'updated' | 'created'
    });
  };

  const handleOrderToggle = () => {
    onFilterChange({
      order: filterOptions.order === 'desc' ? 'asc' : 'desc'
    });
  };

  return (
    <FilterContainer className={className}>
      <FilterSection>
        <SectionTitle>Languages</SectionTitle>
        <FilterGroup>
          <LanguageTag
            $active={filterOptions.language === null}
            onClick={() => handleLanguageChange(null)}
          >
            All
          </LanguageTag>
          
          {availableLanguages.map(language => (
            <LanguageTag
              key={language}
              $active={filterOptions.language === language}
              onClick={() => handleLanguageChange(language)}
            >
              {language}
            </LanguageTag>
          ))}
        </FilterGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Sort By</SectionTitle>
        <SortSelect value={filterOptions.sortBy} onChange={handleSortChange}>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Recently Updated</option>
          <option value="created">Recently Created</option>
        </SortSelect>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Order</SectionTitle>
        <OrderToggle
          $active={filterOptions.order === 'desc'}
          onClick={handleOrderToggle}
          aria-label={filterOptions.order === 'desc' ? 'Descending' : 'Ascending'}
        >
          {filterOptions.order === 'desc' ? '↓' : '↑'}
        </OrderToggle>
      </FilterSection>
    </FilterContainer>
  );
}; 