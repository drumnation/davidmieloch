import { useState, useEffect } from 'react';
import { Repository, RepositoryFilterOptions, RepositoriesState } from '../../types/Repository.types';

// This would normally come from an API
import { mockRepositories } from './mockData';

export const useGitHubProjects = (initialRepositories?: Repository[]) => {
  const [state, setState] = useState<RepositoriesState>({
    repositories: initialRepositories || [],
    filteredRepositories: initialRepositories || [],
    isLoading: !initialRepositories,
    error: null,
    filterOptions: {
      language: null,
      sortBy: 'stars',
      order: 'desc',
      searchTerm: ''
    }
  });
  
  // Fetch repositories on first load if not provided
  useEffect(() => {
    if (!initialRepositories) {
      // Simulate API call
      setState(prev => ({ ...prev, isLoading: true }));
      
      // In a real app, this would be a fetch call to GitHub API
      setTimeout(() => {
        try {
          setState(prev => ({
            ...prev,
            repositories: mockRepositories,
            filteredRepositories: mockRepositories,
            isLoading: false
          }));
        } catch (error) {
          setState(prev => ({
            ...prev,
            error: 'Failed to load repositories',
            isLoading: false
          }));
        }
      }, 1000);
    }
  }, [initialRepositories]);
  
  // Extract available languages from repositories
  const availableLanguages = Array.from(
    new Set(
      state.repositories
        .filter(repo => repo.language)
        .map(repo => repo.language as string)
    )
  ).sort();
  
  // Apply filters when filter options change
  useEffect(() => {
    const { language, sortBy, order, searchTerm } = state.filterOptions;
    
    let filtered = [...state.repositories];
    
    // Filter by language
    if (language) {
      filtered = filtered.filter(repo => repo.language === language);
    }
    
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(search) || 
        (repo.description && repo.description.toLowerCase().includes(search))
      );
    }
    
    // Sort repositories
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'stars':
          comparison = b.stars - a.stars;
          break;
        case 'forks':
          comparison = b.forks - a.forks;
          break;
        case 'updated':
          comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          break;
        case 'created':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return order === 'asc' ? -comparison : comparison;
    });
    
    setState(prev => ({
      ...prev,
      filteredRepositories: filtered
    }));
  }, [state.repositories, state.filterOptions]);
  
  // Update filter options
  const updateFilterOptions = (newOptions: Partial<RepositoryFilterOptions>) => {
    setState(prev => ({
      ...prev,
      filterOptions: {
        ...prev.filterOptions,
        ...newOptions
      }
    }));
  };
  
  // Select a specific repository by ID
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  
  const selectedRepository = selectedRepoId 
    ? state.repositories.find(repo => repo.id === selectedRepoId) || null 
    : null;
  
  return {
    ...state,
    availableLanguages,
    updateFilterOptions,
    selectedRepoId,
    setSelectedRepoId,
    selectedRepository
  };
}; 