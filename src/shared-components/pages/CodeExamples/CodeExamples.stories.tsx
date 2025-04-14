import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { GitHubPortfolioTemplate } from './components/GitHubPortfolioTemplate';
import { Repository } from './components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.types';

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
    lastUpdated: '2025-01-15T12:00:00Z',
    isPrivate: false,
    topics: ['electron', 'chatgpt', 'gaming', 'ai', 'application', 'desktop-app']
  },
  {
    id: 'cursor-directory-structure-ts',
    name: 'cursor-directory-structure-ts',
    description: 'TypeScript tool for monitoring and analyzing project directory structures, with a focus on Cursor IDE integration',
    url: 'https://github.com/drumnation/cursor-directory-structure-ts',
    language: 'TypeScript',
    stars: 3,
    forks: 0,
    issues: 0,
    lastUpdated: '2024-03-01T12:00:00Z',
    isPrivate: false,
    topics: ['typescript', 'ai', 'gemini', 'developer-tools', 'library', 'cursor']
  },
  {
    id: 'ts-import-move',
    name: 'ts-import-move',
    description: 'Use ts-import-move when moving or renaming TypeScript files or directories to ensure all related import paths are automatically updated',
    url: 'https://github.com/drumnation/ts-import-move',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2024-05-01T12:00:00Z',
    isPrivate: false,
    topics: ['typescript', 'developer-tools', 'refactoring', 'imports', 'tool', 'library']
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
    lastUpdated: '2025-03-26T12:00:00Z',
    isPrivate: false,
    topics: ['prompt-engineering', 'prompts', 'ai', 'tool', 'developer-tools']
  },
  {
    id: 'ts-hot-react-vscode-starter',
    name: 'ts-hot-react-vscode-starter',
    description: 'Streamline your VSCode extension development with this TypeScript and React-based generator. Equipped with built-in hot reloading for faster iteration.',
    url: 'https://github.com/drumnation/ts-hot-react-vscode-starter',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2023-11-01T12:00:00Z',
    isPrivate: false,
    topics: ['vscode-extension', 'react', 'typescript', 'hot-reload', 'developer-tools', 'library', 'web-development']
  },
  {
    id: 'spotify-js-bindings',
    name: 'spotify-js-bindings',
    description: 'Javascript bindings for the Spotify Developers API',
    url: 'https://github.com/drumnation/spotify-js-bindings',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2015-03-01T12:00:00Z',
    isPrivate: false,
    topics: ['javascript', 'spotify', 'api', 'web-development', 'library']
  }
];

// Initial filters with counts
const initialFilters = {
  languages: [
    { type: 'language' as const, value: 'typescript', label: 'TypeScript', count: 9 },
    { type: 'language' as const, value: 'javascript', label: 'JavaScript', count: 4 }
  ],
  topics: [
    { type: 'topic' as const, value: 'ai', label: 'AI/ML', count: 8 },
    { type: 'topic' as const, value: 'developer-tools', label: 'Developer Tools', count: 6 },
    { type: 'topic' as const, value: 'gaming', label: 'Gaming', count: 5 },
    { type: 'topic' as const, value: 'web-development', label: 'Web Development', count: 16 }
  ],
  types: [
    { type: 'type' as const, value: 'library', label: 'Library', count: 12 },
    { type: 'type' as const, value: 'tool', label: 'Tool', count: 14 },
    { type: 'type' as const, value: 'application', label: 'Application', count: 10 }
  ]
};

const GitHubPortfolioStory = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    languages: [] as string[],
    topics: [] as string[],
    types: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [repositories, setRepositories] = useState(FALLBACK_REPOS);

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters(prev => {
      const filters = { ...prev };
      const filterKey = type === 'language' ? 'languages' : type === 'topic' ? 'topics' : 'types';
      
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
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <GitHubPortfolioTemplate
      repositories={repositories}
      filters={initialFilters}
      selectedFilters={selectedFilters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
      onSearch={handleSearch}
      onRepoClick={handleRepoClick}
      isLoading={false}
    />
  );
};

const meta = {
  title: 'Pages/04-code-examples',
  component: GitHubPortfolioStory,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GitHubPortfolioStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Loading: Story = {
  render: () => (
    <GitHubPortfolioTemplate
      repositories={[]}
      filters={initialFilters}
      selectedFilters={{
        languages: [],
        topics: [],
        types: []
      }}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
      onSearch={() => {}}
      onRepoClick={() => {}}
      isLoading={true}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <GitHubPortfolioTemplate
      repositories={FALLBACK_REPOS}
      filters={initialFilters}
      selectedFilters={{
        languages: [],
        topics: [],
        types: []
      }}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
      onSearch={() => {}}
      onRepoClick={() => {}}
      isLoading={false}
      error="Failed to load portfolio data. Please try again."
      onRetry={() => {}}
    />
  ),
};

export const WithInitialFilter: Story = {
  render: () => {
    const [selectedFilters, setSelectedFilters] = useState({
      languages: ['typescript'] as string[],
      topics: [] as string[],
      types: [] as string[]
    });
    
    const handleFilterChange = (type: string, value: string) => {
      setSelectedFilters(prev => {
        const filters = { ...prev };
        const filterKey = type === 'language' ? 'languages' : type === 'topic' ? 'topics' : 'types';
        
        if (filters[filterKey].includes(value)) {
          filters[filterKey] = filters[filterKey].filter(v => v !== value);
        } else {
          filters[filterKey] = [...filters[filterKey], value];
        }
        
        return filters;
      });
    };

    return (
      <GitHubPortfolioTemplate
        repositories={FALLBACK_REPOS}
        filters={initialFilters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={() => {
          setSelectedFilters({
            languages: [],
            topics: [],
            types: []
          });
        }}
        onSearch={() => {}}
        onRepoClick={() => {}}
        isLoading={false}
      />
    );
  },
}; 