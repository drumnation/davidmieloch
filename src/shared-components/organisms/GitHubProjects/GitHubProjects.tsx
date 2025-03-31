import React from 'react';
import { GitHubProjectsProps } from './GitHubProjects.types';
import { useGitHubProjects } from './GitHubProjects.hook';
import { RepoSearch } from '../../molecules/RepoSearch';
import { RepoFilter } from '../../molecules/RepoFilter';
import { RepoGrid } from '../../molecules/RepoGrid';
import { RepoDetails } from '../RepoDetails';
import { Repository } from '../../types/Repository.types';
import {
  ProjectsContainer,
  FiltersRow,
  ContentArea,
  LoadingIndicator,
  ErrorMessage
} from './GitHubProjects.styles';

export const GitHubProjects: React.FC<GitHubProjectsProps> = ({
  initialRepositories,
  className
}) => {
  const {
    filteredRepositories,
    isLoading,
    error,
    filterOptions,
    availableLanguages,
    updateFilterOptions,
    selectedRepoId,
    setSelectedRepoId,
    selectedRepository
  } = useGitHubProjects(initialRepositories);

  // Handle search input changes
  const handleSearchChange = (searchTerm: string) => {
    updateFilterOptions({ searchTerm });
  };

  // Handle repository selection
  const handleRepoClick = (repo: Repository) => {
    setSelectedRepoId(selectedRepoId === repo.id ? null : repo.id);
  };
  
  // Handle back button click in repository details
  const handleBackClick = () => {
    setSelectedRepoId(null);
  };

  return (
    <ProjectsContainer className={className}>
      <FiltersRow>
        <RepoSearch
          searchTerm={filterOptions.searchTerm || ''}
          onSearchChange={handleSearchChange}
          isLoading={isLoading}
        />
        
        {!selectedRepository && availableLanguages.length > 0 && (
          <RepoFilter
            filterOptions={filterOptions}
            onFilterChange={updateFilterOptions}
            availableLanguages={availableLanguages}
          />
        )}
      </FiltersRow>
      
      <ContentArea>
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        
        {isLoading ? (
          <LoadingIndicator>Loading repositories...</LoadingIndicator>
        ) : selectedRepository ? (
          <RepoDetails
            repository={selectedRepository}
            onBack={handleBackClick}
          />
        ) : (
          <RepoGrid
            repositories={filteredRepositories}
            onRepoClick={handleRepoClick}
            selectedRepoId={selectedRepoId || undefined}
            emptyStateMessage={
              filterOptions.searchTerm || filterOptions.language
                ? "No repositories match your filters"
                : "No repositories found"
            }
          />
        )}
      </ContentArea>
    </ProjectsContainer>
  );
}; 