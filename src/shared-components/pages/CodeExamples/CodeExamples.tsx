'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Container } from '@mantine/core';
import { GitHubPortfolioTemplate, Repository as PortfolioRepository } from './components/GitHubPortfolioTemplate';
import { Filter } from '../../organisms/FilterBar';
import { Repository } from '@shared-components/types/Repository.types';
import { PageLoader } from '../../atoms/PageLoader';

export interface FilterState {
  languages: string[];
  topics: string[];
  types: string[];
}

interface Props {
  repositories: Repository[];
  className?: string;
}

export const CodeExamples = ({ repositories, className }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    languages: [],
    topics: [],
    types: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = useCallback((type: string, value: string) => {
    setSelectedFilters((prev) => {
      let filterKey: keyof FilterState;
      switch (type) {
        case 'language':
          filterKey = 'languages';
          break;
        case 'topic':
          filterKey = 'topics';
          break;
        case 'type':
          filterKey = 'types';
          break;
        default:
          console.warn(`Unknown filter type: ${type}`);
          return prev;
      }

      const currentFilters = prev[filterKey];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterKey]: currentFilters.filter((filter) => filter !== value),
        };
      }
      
      return {
        ...prev,
        [filterKey]: [...currentFilters, value],
      };
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters({
      languages: [],
      topics: [],
      types: [],
    });
    setSearchQuery('');
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const mappedRepositories = useMemo<PortfolioRepository[]>(() => {
    return repositories.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.url,
      language: repo.language || 'Unknown',
      stars: repo.stars,
      forks: repo.forks,
      issues: repo.issues,
      lastUpdated: repo.updatedAt,
      isPrivate: repo.isPrivate,
      topics: repo.topics
    }));
  }, [repositories]);

  const filters = useMemo(() => {
    const languageMap = new Map<string, number>();
    const topicMap = new Map<string, number>();
    const typeMap = new Map<string, number>();

    repositories.forEach((repo) => {
      // Count languages
      if (repo.language) {
        languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
      }

      // Count topics
      repo.topics.forEach((topic) => {
        topicMap.set(topic, (topicMap.get(topic) || 0) + 1);
      });

      // Count types (public/private)
      const type = repo.isPrivate ? 'Private' : 'Public';
      typeMap.set(type, (typeMap.get(type) || 0) + 1);
    });

    return {
      languages: Array.from(languageMap.entries()).map(([value, count]) => ({
        type: 'language' as const,
        value,
        label: value,
        count
      })),
      topics: Array.from(topicMap.entries()).map(([value, count]) => ({
        type: 'topic' as const,
        value,
        label: value,
        count
      })),
      types: Array.from(typeMap.entries()).map(([value, count]) => ({
        type: 'type' as const,
        value,
        label: value,
        count
      }))
    };
  }, [repositories]);

  const filteredRepositories = useMemo(() => {
    return mappedRepositories.filter(repo => {
      // Apply language filter
      if (selectedFilters.languages.length > 0 && !selectedFilters.languages.includes(repo.language)) {
        return false;
      }

      // Apply topic filter
      if (selectedFilters.topics.length > 0 && !repo.topics.some(topic => selectedFilters.topics.includes(topic))) {
        return false;
      }

      // Apply type filter
      if (selectedFilters.types.length > 0) {
        const repoType = repo.isPrivate ? 'Private' : 'Public';
        if (!selectedFilters.types.includes(repoType)) {
          return false;
        }
      }

      // Apply search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          repo.name.toLowerCase().includes(searchLower) ||
          (repo.description && repo.description.toLowerCase().includes(searchLower)) ||
          repo.topics.some(topic => topic.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [mappedRepositories, selectedFilters, searchQuery]);

  return (
    <Container 
      size="xl" 
      className={className} 
      pb="calc(var(--mantine-spacing-xl) * 4)"
    >
      <GitHubPortfolioTemplate
        repositories={filteredRepositories}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onSearch={handleSearch}
      />
    </Container>
  );
}; 