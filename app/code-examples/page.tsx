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
const PRIORITY_REPOS = ['game-sage', 'cursor-directory-structure-ts', 'unsplash-smart-mcp-server', 'ts-import-move'];

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
    topics: ['electron', 'chatgpt', 'gaming', 'ai', 'application', 'desktop-app'],
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
    topics: ['typescript', 'ai', 'gemini', 'developer-tools', 'library', 'cursor'],
  },
  {
    id: 'unsplash-smart-mcp-server',
    name: 'unsplash-smart-mcp-server',
    description: 'AI-powered FastMCP server for intelligent stock photo search, download, and attribution management from Unsplash.',
    url: 'https://github.com/drumnation/unsplash-smart-mcp-server',
    language: 'TypeScript',
    stars: 3,
    forks: 0,
    issues: 1,
    createdAt: '2024-04-01T12:00:00Z',
    lastUpdated: '2024-06-15T12:00:00Z',
    isPrivate: false,
    topics: ['typescript', 'ai', 'unsplash', 'images', 'mcp', 'tool', 'web-development'],
  },
  {
    id: 'ts-import-move',
    name: 'ts-import-move',
    description: 'TypeScript utility for automatically updating import paths when moving or renaming files or directories.',
    url: 'https://github.com/drumnation/ts-import-move',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    createdAt: '2024-02-01T12:00:00Z',
    lastUpdated: '2024-05-01T12:00:00Z',
    isPrivate: false,
    topics: ['typescript', 'developer-tools', 'refactoring', 'imports', 'tool', 'library'],
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
    topics: ['vscode-extension', 'react', 'typescript', 'hot-reload', 'developer-tools', 'library', 'web-development'],
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
    topics: ['vscode-extension', 'ai', 'llm', 'developer-tools', 'tool'],
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
    topics: ['react', 'midi', 'music', 'web-audio', 'web-development', 'application'],
  },
  {
    id: 'prompt-forge',
    name: 'prompt-forge',
    description: 'Optimize and manage AI prompts with Prompt Forge.',
    url: 'https://github.com/drumnation/prompt-forge',
    language: 'TypeScript',
    stars: 2,
    forks: 1,
    issues: 0,
    createdAt: '2025-03-26T12:00:00Z',
    lastUpdated: '2025-03-26T12:00:00Z',
    isPrivate: false,
    topics: ['prompt-engineering', 'prompts', 'ai', 'tool', 'developer-tools'],
  },
];

// Helper function to get related topics
const isRelatedTopic = (topicValue: string, repoTopic: string): boolean => {
  const aiRelatedTerms = ['ai', 'ml', 'machine-learning', 'artificial-intelligence', 'chatgpt', 'llm', 'gemini', 'prompt', 'gpt', 'prompt-engineering'];
  const devToolsRelatedTerms = [
    'developer-tools', 'dev-tools', 'developer', 'development', 
    'vscode', 'vscode-extension', 'ide', 'extension', 'plugin', 
    'code', 'coding', 'programming', 'tool', 'utility', 
    'refactoring', 'cursor', 'typescript', 'react', 'generator',
    'import', 'test', 'helper', 'directory', 'structure'
  ];
  const gamingRelatedTerms = [
    'gaming', 'game', 'games', 'gamer', 'gameplay', 'play',
    'electron-game', 'steam', 'vr', 'virtual-reality', 'oculus',
    'unity', 'unreal', 'beat-saber', 'beatsaber', 'ragnarock',
    'rhythm-game', 'rhythm', 'song', 'converter', 'mod', 'mods', 
    'level', 'levels', 'custom-songs', 'custom-levels'
  ];
  const webDevRelatedTerms = [
    'web', 'web-development', 'frontend', 'front-end', 'ui', 'ux',
    'react', 'javascript', 'typescript', 'node', 'js', 'jsx', 'tsx',
    'html', 'css', 'sass', 'less', 'web-audio', 'audio', 'midi',
    'ruby', 'rails', 'redux', 'tone', 'spa', 'single-page-application',
    'web-app', 'webapp', 'website', 'browser', 'responsive'
  ];

  // Convert to lowercase for comparison
  const normalizedTopicValue = topicValue.toLowerCase();
  const normalizedRepoTopic = repoTopic.toLowerCase();
  
  if (normalizedTopicValue === 'ai' && aiRelatedTerms.some(term => normalizedRepoTopic.includes(term))) {
    return true;
  }
  
  if (normalizedTopicValue === 'developer-tools' && devToolsRelatedTerms.some(term => normalizedRepoTopic.includes(term))) {
    return true;
  }
  
  if (normalizedTopicValue === 'gaming' && gamingRelatedTerms.some(term => normalizedRepoTopic.includes(term))) {
    return true;
  }
  
  if (normalizedTopicValue === 'web-development' && webDevRelatedTerms.some(term => normalizedRepoTopic.includes(term))) {
    return true;
  }
  
  // Exact match fallback
  return normalizedTopicValue === normalizedRepoTopic;
};

// Function to check if a repo matches a topic
const repoMatchesTopic = (repo: Repository, topicValue: string): boolean => {
  // Special case for developer tools since it's causing issues
  if (topicValue === 'developer-tools') {
    const devToolTerms = [
      'tool', 'utility', 'helper', 'extension', 'plugin', 'generator',
      'development', 'ide', 'editor', 'vscode', 'code', 'coding',
      'developer', 'typescript', 'import', 'refactoring', 'cursor',
      'context', 'directory', 'structure', 'test'
    ];
    
    // Check repo name
    const name = repo.name.toLowerCase();
    if (devToolTerms.some(term => name.includes(term))) {
      return true;
    }
    
    // Check description
    const desc = repo.description.toLowerCase();
    if (desc.includes('tool') || 
        desc.includes('extension') || 
        desc.includes('plugin') || 
        desc.includes('utility') || 
        desc.includes('generator') ||
        desc.includes('vscode') || 
        desc.includes('cursor') ||
        desc.includes('ide') ||
        desc.includes('development') ||
        desc.includes('directory') ||
        desc.includes('structure') ||
        desc.includes('typescript') && (desc.includes('utility') || desc.includes('tool'))) {
      return true;
    }
    
    // Check topics
    return repo.topics.some(repoTopic => {
      const topic = repoTopic.toLowerCase();
      return topic.includes('tool') || 
             topic.includes('dev') || 
             topic.includes('extension') || 
             topic.includes('utility') || 
             topic.includes('generator') ||
             topic.includes('refactoring') ||
             topic === 'typescript' || 
             topic === 'vscode-extension';
    });
  }
  
  // Special case for gaming
  if (topicValue === 'gaming') {
    // Quick exclusions to prevent false positives
    const name = repo.name.toLowerCase();
    const desc = repo.description.toLowerCase();
    
    // Explicit exclusions for non-gaming repositories that might contain gaming-like terms
    if (name === 'model-maestro' || 
        name === 'javascript-es6-design-patterns' ||
        name.includes('design-patterns') ||
        (desc.includes('design patterns') && desc.includes('play around with'))) {
      return false;
    }
    
    // Check for AI tools that might use metaphorical language
    if ((desc.includes('ai') || desc.includes('machine learning') || name.includes('ai')) && 
        (desc.includes('conductor') || desc.includes('symphony') || desc.includes('maestro'))) {
      return false;
    }
    
    // Only consider programming pattern repos to NOT be games
    if (desc.includes('pattern') && desc.includes('play around with')) {
      return false;
    }
    
    // Main gaming term detection - must contain strong gaming indicators
    const hasStrongGamingTerms = 
      name.includes('game') || 
      name.includes('gaming') || 
      name.includes('beat saber') ||
      name.includes('beatsaber') ||
      name.includes('ragnarock') ||
      desc.includes('game ') || // space after to prevent matching "gameday" etc.
      desc.includes(' game') || // space before to prevent matching "username" etc.
      desc.includes('gaming') || 
      desc.includes('beat saber') ||
      desc.includes('beatsaber') ||
      desc.includes('ragnarock') ||
      desc.includes('vr ') ||
      desc.includes('virtual reality') ||
      desc.includes('rhythm game') ||
      repo.topics.includes('game') ||
      repo.topics.includes('gaming') ||
      repo.topics.includes('vr');
    
    // Weak gaming terms require confirmation through multiple signals
    const hasWeakGamingTerms =
      name.includes('play') ||
      desc.includes('play') ||
      name.includes('beat') ||
      name.includes('saber');
      
    // If it has strong gaming terms, or multiple weak gaming indicators + not excluded
    return hasStrongGamingTerms || (hasWeakGamingTerms && desc.includes('song') && desc.includes('converter'));
  }
  
  // Special case for web development
  if (topicValue === 'web-development') {
    // Almost all TypeScript/JavaScript repositories are web-related
    if (repo.language === 'TypeScript' || repo.language === 'JavaScript' || repo.language === 'Ruby') {
      return true;
    }
    
    // Check repo name for web-related terms
    const name = repo.name.toLowerCase();
    if (name.includes('react') || 
        name.includes('web') || 
        name.includes('js') || 
        name.includes('node') || 
        name.includes('html') ||
        name.includes('css') ||
        name.includes('prompt') ||  // UI for prompts
        name.includes('ui') ||
        name.includes('app')) {
      return true;
    }
    
    // Check description for web-related terms
    const desc = repo.description.toLowerCase();
    if (desc.includes('web') || 
        desc.includes('react') || 
        desc.includes('frontend') || 
        desc.includes('front-end') ||
        desc.includes('ui') || 
        desc.includes('user interface') ||
        desc.includes('browser') ||
        desc.includes('javascript') ||
        desc.includes('typescript') ||
        desc.includes('html') ||
        desc.includes('css') ||
        desc.includes('website') ||
        desc.includes('webapp') ||
        desc.includes('application') ||
        desc.includes('prompt') ||
        desc.includes('model') ||    // Machine learning models often have web UIs
        desc.includes('redux') ||
        desc.includes('tone') ||
        desc.includes('ruby') ||
        desc.includes('rails')) {
      return true;
    }
    
    // Check topics
    return repo.topics.some(repoTopic => {
      const topic = repoTopic.toLowerCase();
      return topic.includes('web') || 
             topic.includes('react') || 
             topic.includes('frontend') || 
             topic.includes('ui') ||
             topic.includes('js') ||
             topic.includes('javascript') ||
             topic.includes('typescript') ||
             topic.includes('html') ||
             topic.includes('css') ||
             topic.includes('ruby') ||
             topic.includes('rails') ||
             topic.includes('redux') ||
             topic.includes('prompt') ||
             topic.includes('forge');
    });
  }
  
  // Regular topic matching for other categories
  const matchesTopics = repo.topics.some(repoTopic => isRelatedTopic(topicValue, repoTopic));
  const matchesDescription = repo.description.toLowerCase().includes(topicValue.toLowerCase());
  const matchesName = repo.name.toLowerCase().includes(topicValue.toLowerCase());
  
  return matchesTopics || matchesDescription || matchesName;
};

// Function to check if a repo matches a type
const repoMatchesType = (repo: Repository, typeValue: string): boolean => {
  // Check if the repo has the type in its topics
  const hasTypeInTopics = repo.topics.some(topic => topic.toLowerCase() === typeValue.toLowerCase());
  
  // Check in description
  const desc = repo.description.toLowerCase();
  const name = repo.name.toLowerCase();
  
  if (typeValue === 'library') {
    // Library type detection - typically any package that provides functionality for other code
    
    // Check for explicit library indicators
    if (hasTypeInTopics || 
        desc.includes('library') || 
        desc.includes('sdk') || 
        desc.includes(' kit') ||
        desc.includes('framework')) {
      return true;
    }
    
    // Check for binding/API wrapper indicators
    if (desc.includes('binding') || 
        desc.includes('wrapper') || 
        desc.includes('api') ||
        name.includes('binding') ||
        name.includes('api') ||
        (desc.includes('for the') && desc.includes('api'))) {
      return true;
    }
    
    // Check for utility libraries 
    if ((name.includes('ts-') || name.includes('js-') || name.includes('react-')) && 
        (desc.includes('util') || desc.includes('helper') || 
         desc.includes('method') || desc.includes('function'))) {
      return true;
    }
    
    // Special indicators for infrastructure/integration libraries
    if (desc.includes('integration') || 
        (name.includes('import') && desc.includes('typescript')) ||
        desc.includes('cross-platform') ||
        (desc.includes('responsive') && desc.includes('react'))) {
      return true;
    }
    
    // Special cases for known libraries that aren't being detected
    const libraryKeywords = [
      'spotify-js-bindings', 
      'react-native-cross-platform', 
      'ts-import-move',
      'cursor-directory-structure'
    ];
    
    if (libraryKeywords.some(keyword => name.includes(keyword))) {
      return true;
    }
    
    return false;
  }
  
  if (typeValue === 'tool') {
    return hasTypeInTopics || 
           desc.includes('tool') || 
           desc.includes('utility') || 
           desc.includes('plugin') || 
           desc.includes('extension') ||
           desc.includes('cli') ||
           repo.name.includes('tool');
  }
  
  if (typeValue === 'application') {
    return hasTypeInTopics || 
           desc.includes('app') || 
           desc.includes('application') || 
           desc.includes('website') || 
           desc.includes('web-based') ||
           desc.includes('electron');
  }
  
  return false;
};

// Function to count repositories for each filter
const countReposForFilters = (repos: Repository[]) => {
  const counts = {
    languages: {} as Record<string, number>,
    topics: {} as Record<string, number>,
    types: {} as Record<string, number>
  };

  // Define filter values
  const topicValues = ['ai', 'developer-tools', 'gaming', 'web-development'];
  const typeValues = ['library', 'tool', 'application'];

  // Count languages
  repos.forEach(repo => {
    const lang = repo.language.toLowerCase();
    counts.languages[lang] = (counts.languages[lang] || 0) + 1;
  });

  // Count topics
  repos.forEach(repo => {
    topicValues.forEach(topic => {
      if (repoMatchesTopic(repo, topic)) {
        counts.topics[topic] = (counts.topics[topic] || 0) + 1;
      }
    });
  });

  // Count types using the improved matcher
  repos.forEach(repo => {
    typeValues.forEach(type => {
      if (repoMatchesType(repo, type)) {
        counts.types[type] = (counts.types[type] || 0) + 1;
      }
    });
  });

  return counts;
};

// Initial filters (will be updated with actual counts once data is loaded)
const initialFilters = {
  languages: [
    { type: 'language' as const, value: 'typescript', label: 'TypeScript', count: 0 },
    { type: 'language' as const, value: 'javascript', label: 'JavaScript', count: 0 }
  ],
  topics: [
    { type: 'topic' as const, value: 'ai', label: 'AI/ML', count: 0 },
    { type: 'topic' as const, value: 'developer-tools', label: 'Developer Tools', count: 0 },
    { type: 'topic' as const, value: 'gaming', label: 'Gaming', count: 0 },
    { type: 'topic' as const, value: 'web-development', label: 'Web Development', count: 0 }
  ],
  types: [
    { type: 'type' as const, value: 'library', label: 'Library', count: 0 },
    { type: 'type' as const, value: 'tool', label: 'Tool', count: 0 },
    { type: 'type' as const, value: 'application', label: 'Application', count: 0 }
  ]
};

export default function CodeExamplesPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    languages: [] as string[],
    topics: [] as string[],
    types: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  const loadRepositories = async (forceFresh = false) => {
    setLoading(true);
    
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
        setFilteredRepos(sortedRepos);
        
        // Update filter counts based on actual data
        updateFilterCounts(sortedRepos);
        
        console.log('Using API data. Sorted repositories:', sortedRepos.map(r => r.name));
      } else if (!forceFresh) {
        // If no repositories were returned and not forcing fresh data, use fallback
        console.log('No repositories returned from API, using fallback data');
        setRepositories(FALLBACK_REPOS);
        setFilteredRepos(FALLBACK_REPOS);
        
        // Update filter counts based on fallback data
        updateFilterCounts(FALLBACK_REPOS);
      } else {
        console.log('No repositories found for this user');
      }
    } catch (err) {
      console.error('Error fetching repositories:', err);
      
      if (!forceFresh) {
        console.log('Using fallback data due to error');
        setRepositories(FALLBACK_REPOS);
        setFilteredRepos(FALLBACK_REPOS);
        
        // Update filter counts based on fallback data
        updateFilterCounts(FALLBACK_REPOS);
      }
    } finally {
      setLoading(false);
    }
  };

  // Update filter counts based on available repositories
  const updateFilterCounts = (repos: Repository[]) => {
    const counts = countReposForFilters(repos);
    
    // Update filters with accurate counts
    setFilters({
      languages: initialFilters.languages.map(lang => ({
        ...lang,
        count: counts.languages[lang.value.toLowerCase()] || 0
      })),
      topics: initialFilters.topics.map(topic => ({
        ...topic,
        count: counts.topics[topic.value] || 0
      })),
      types: initialFilters.types.map(type => ({
        ...type,
        count: counts.types[type.value] || 0
      }))
    });
  };

  // Apply filters and search to repositories
  useEffect(() => {
    if (repositories.length === 0) return;
    
    let result = [...repositories];
    
    // Apply filters
    if (selectedFilters.languages.length > 0) {
      result = result.filter(repo => 
        selectedFilters.languages.some(lang => 
          repo.language.toLowerCase() === lang.toLowerCase()
        )
      );
    }
    
    if (selectedFilters.topics.length > 0) {
      result = result.filter(repo => 
        selectedFilters.topics.some(topic => 
          repoMatchesTopic(repo, topic)
        )
      );
    }
    
    // Use improved type matcher for filtering
    if (selectedFilters.types.length > 0) {
      result = result.filter(repo => 
        selectedFilters.types.some(type => repoMatchesType(repo, type))
      );
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(repo => 
        repo.name.toLowerCase().includes(query) || 
        repo.description.toLowerCase().includes(query) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }
    
    setFilteredRepos(result);
  }, [repositories, selectedFilters, searchQuery]);

  useEffect(() => {
    loadRepositories();
  }, []);

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters(prev => {
      const filters = { ...prev };
      const filterKey = type === 'language' ? 'languages' : type === 'topic' ? 'topics' : 'types';
      
      // Toggle the filter value - add if not present, remove if present
      if (filters[filterKey].includes(value)) {
        filters[filterKey] = filters[filterKey].filter(v => v !== value);
      } else {
        filters[filterKey] = [...filters[filterKey], value];
      }
      
      return filters;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      languages: [],
      topics: [],
      types: []
    });
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRepoClick = (url: string) => {
    console.log('Opening repository URL:', url);
    // Force open in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <GitHubPortfolioTemplate
        repositories={filteredRepos}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onSearch={handleSearch}
        onRepoClick={handleRepoClick}
        isLoading={loading}
      />
    </div>
  );
} 