'use client';

import { useEffect, useState } from 'react';
import { GitHubPortfolioTemplate } from '@/shared-components/templates/GitHubPortfolioTemplate';
import { fetchGitHubRepos, transformGitHubRepo } from './utils/github';

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt?: string;
  lastUpdated: string;
  isPrivate: boolean;
  topics: string[];
  priority?: number;
}

// Priority repositories to display first
const PRIORITY_REPOS = ['game-sage', 'cursor-directory-structure-ts'];

// Fallback repositories in case GitHub API fails
const FALLBACK_REPOS: Repository[] = [
  {
    id: 'game-sage',
    name: 'game-sage',
    description: 'Electron app that uses ChatGPT to read your screen and provide real-time gaming feedback.',
    url: 'https://github.com/drumnation/game-sage',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    createdAt: '2024-03-01T12:00:00Z',
    lastUpdated: '2025-01-15T12:00:00Z',
    isPrivate: false,
    topics: ['electron', 'chatgpt', 'gaming', 'ai'],
  },
  {
    id: 'cursor-directory-structure-ts',
    name: 'cursor-directory-structure-ts',
    description: 'TypeScript library that tracks folder structure in a repo for AI context, using Gemini for enhanced folder and file descriptions.',
    url: 'https://github.com/drumnation/cursor-directory-structure-ts',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    createdAt: '2023-09-01T12:00:00Z',
    lastUpdated: '2024-03-01T12:00:00Z',
    isPrivate: false,
    topics: ['typescript', 'ai', 'gemini', 'developer-tools'],
  },
  {
    id: 'ts-hot-react-vscode-starter',
    name: 'ts-hot-react-vscode-starter',
    description: 'A VSCode extension starter with hot-reloading React setup, making it easier to develop VSCode extensions with React.',
    url: 'https://github.com/drumnation/ts-hot-react-vscode-starter',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    createdAt: '2023-01-01T12:00:00Z',
    lastUpdated: '2023-11-01T12:00:00Z',
    isPrivate: false,
    topics: ['vscode-extension', 'react', 'typescript', 'hot-reload', 'developer-tools'],
  },
  {
    id: 'ai-context-generator',
    name: 'ai-context-generator',
    description: 'VSCode plugin for quickly packaging file trees and code from folders for pasting to LLMs.',
    url: 'https://github.com/drumnation/ai-context-generator',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    createdAt: '2022-05-01T12:00:00Z',
    lastUpdated: '2023-09-01T12:00:00Z',
    isPrivate: false,
    topics: ['vscode-extension', 'ai', 'llm', 'developer-tools'],
  },
  {
    id: 'react-midi-sequencer',
    name: 'react-midi-sequencer',
    description: 'Web-based MIDI sequencer for playing piano rolls and writing music.',
    url: 'https://github.com/drumnation/react-midi-sequencer',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    issues: 0,
    createdAt: '2015-01-01T12:00:00Z',
    lastUpdated: '2015-03-01T12:00:00Z',
    isPrivate: false,
    topics: ['react', 'midi', 'music', 'web-audio'],
  },
];

const filters = {
  languages: [
    { type: 'language' as const, value: 'typescript', label: 'TypeScript', count: 8 },
    { type: 'language' as const, value: 'javascript', label: 'JavaScript', count: 6 }
  ],
  topics: [
    { type: 'topic' as const, value: 'ai', label: 'AI/ML', count: 6 },
    { type: 'topic' as const, value: 'developer-tools', label: 'Developer Tools', count: 4 },
    { type: 'topic' as const, value: 'gaming', label: 'Gaming', count: 2 },
    { type: 'topic' as const, value: 'web-development', label: 'Web Development', count: 2 }
  ],
  types: [
    { type: 'type' as const, value: 'library', label: 'Library', count: 3 },
    { type: 'type' as const, value: 'tool', label: 'Tool', count: 7 },
    { type: 'type' as const, value: 'application', label: 'Application', count: 4 }
  ]
};

export default function CodeExamplesPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadRepositories = async (forceFresh = false) => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      console.log('Trying to fetch repos from GitHub API...');
      const repos = await fetchGitHubRepos('drumnation');
      
      if (repos && repos.length > 0) {
        const transformedRepos = repos
          .map(transformGitHubRepo)
          .filter(repo => repo !== null) as Repository[]; // Filter out null values
        
        // Sort repositories - prioritize specific repos, then sort by updated date
        const sortedRepos = [...transformedRepos].sort((a, b) => {
          // First check for priority repos
          const aPriority = PRIORITY_REPOS.indexOf(a.name);
          const bPriority = PRIORITY_REPOS.indexOf(b.name);
          
          if (aPriority !== -1 && bPriority !== -1) {
            // Both are priority repos, sort by their order in PRIORITY_REPOS
            return aPriority - bPriority;
          } else if (aPriority !== -1) {
            // Only a is a priority repo
            return -1;
          } else if (bPriority !== -1) {
            // Only b is a priority repo
            return 1;
          }
          
          // Neither are priority repos, sort by most recently updated
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        });
        
        setRepositories(sortedRepos);
        setUsingFallback(false);
        console.log('Using API data. Sorted repositories:', sortedRepos.map(r => r.name));
      } else if (!forceFresh) {
        // If no repositories were returned and not forcing fresh data, use fallback
        console.log('No repositories returned from API, using fallback data');
        setRepositories(FALLBACK_REPOS);
        setUsingFallback(true);
        setApiError('No repositories returned from GitHub API');
      } else {
        setApiError('No repositories found for this user');
      }
    } catch (err) {
      console.error('Error fetching repositories:', err);
      
      if (!forceFresh) {
        console.log('Using fallback data due to error');
        setRepositories(FALLBACK_REPOS);
        setUsingFallback(true);
      }
      
      setApiError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRepositories();
  }, []);

  const handleForceRefresh = () => {
    loadRepositories(true);
  };

  const handleFilterChange = (type: string, value: string) => {
    // TODO: Implement filter logic
    console.log(`Filter changed: ${type} - ${value}`);
  };

  const handleClearFilters = () => {
    // TODO: Implement clear filters logic
    console.log('Filters cleared');
  };

  const handleSearch = (query: string) => {
    // TODO: Implement search logic
    console.log(`Search query: ${query}`);
  };

  const handleRepoClick = (url: string) => {
    console.log('Opening repository URL:', url);
    // Force open in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <GitHubPortfolioTemplate
        repositories={repositories}
        filters={filters}
        selectedFilters={{
          languages: [],
          topics: [],
          types: [],
        }}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onSearch={handleSearch}
        onRepoClick={handleRepoClick}
        isLoading={isLoading}
      />
    </div>
  );
} 