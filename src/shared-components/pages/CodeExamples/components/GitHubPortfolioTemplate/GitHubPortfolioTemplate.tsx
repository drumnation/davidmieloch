import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { GitHubPortfolioTemplateProps } from './GitHubPortfolioTemplate.types';
import { SearchInput } from '../../../../molecules/SearchInput';
import { FilterBar } from '../../../../organisms/FilterBar';
import { RepoGrid } from '../../../../organisms/RepoGrid';
import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Sidebar,
  MainContent,
  SearchContainer,
  LoadingContainer,
  ErrorContainer,
  ErrorMessage,
  RetryButton,
  DisclaimerBox,
} from './GitHubPortfolioTemplate.styles';

export const GitHubPortfolioTemplate: React.FC<GitHubPortfolioTemplateProps> = ({
  repositories,
  filters,
  selectedFilters,
  isLoading = false,
  error,
  onFilterChange,
  onClearFilters,
  onRetry,
  onSearch,
  onRepoClick,
}) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Reset search value when filters are cleared
    if (
      !selectedFilters.languages.length &&
      !selectedFilters.topics.length &&
      !selectedFilters.types.length
    ) {
      setSearchValue('');
    }
  }, [selectedFilters]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loader size={48} />
        <ErrorMessage>Loading repositories...</ErrorMessage>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        {onRetry && <RetryButton onClick={onRetry}>Try again</RetryButton>}
      </ErrorContainer>
    );
  }

  const hasActiveFilters = 
    selectedFilters.languages.length > 0 ||
    selectedFilters.topics.length > 0 ||
    selectedFilters.types.length > 0 ||
    searchValue.length > 0;

  const noResults = repositories.length === 0 && hasActiveFilters;

  return (
    <Container>
      <Header>
        <Title>Open Source Projects</Title>
        <Subtitle>A collection of my public GitHub repositories</Subtitle>
        <DisclaimerBox>
          <p>
            Most of my repositories on GitHub are private, they are either private personal projects or work related so my best work is definitely not listed here. This page is here to give a little bit of a taste of what I work on for weekend projects.
          </p>
          <p style={{ marginTop: 'var(--mantine-spacing-sm)', fontStyle: 'italic' }}>
            Note: Project data is fetched live from GitHub and reflects recent activity.
          </p>
        </DisclaimerBox>
      </Header>

      <Content>
        <Sidebar>
          <SearchContainer>
            <SearchInput
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search repositories..."
            />
          </SearchContainer>
          <FilterBar
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            onClearFilters={() => {
              setSearchValue('');
              onClearFilters?.();
            }}
          />
        </Sidebar>

        <MainContent>
          <RepoGrid 
            repositories={repositories.map(repo => ({
              ...repo,
              fullName: repo.name,
              watchers: 0,
              createdAt: repo.lastUpdated,
              updatedAt: repo.lastUpdated,
              owner: {
                login: 'owner',
                id: '0',
                avatarUrl: '',
                url: ''
              }
            }))}
            onRepoClick={onRepoClick}
            emptyMessage={noResults ? "No repositories match your filters" : "No repositories found"}
          />
        </MainContent>
      </Content>
    </Container>
  );
}; 