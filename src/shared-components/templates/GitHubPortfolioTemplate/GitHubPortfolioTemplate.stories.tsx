import type { Meta, StoryObj } from '@storybook/react';
import { GitHubPortfolioTemplate } from './GitHubPortfolioTemplate';
import { Filter } from '../../organisms/FilterBar';

const mockRepositories = [
  {
    id: '1',
    name: 'ts-hot-react-vscode-starter',
    description: 'A VSCode extension starter with hot-reloading React setup, making it easier to develop VSCode extensions with React.',
    url: 'https://github.com/drumnation/ts-hot-react-vscode-starter',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2024-03-01T12:00:00Z',
    isPrivate: false,
    topics: ['vscode-extension', 'react', 'typescript', 'hot-reload', 'developer-tools'],
  },
  {
    id: '2',
    name: 'ai-context-generator',
    description: 'VSCode plugin for quickly packaging file trees and code from folders for pasting to LLMs.',
    url: 'https://github.com/drumnation/ai-context-generator',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2024-02-01T12:00:00Z',
    isPrivate: false,
    topics: ['vscode-extension', 'ai', 'llm', 'developer-tools'],
  },
  {
    id: '3',
    name: 'prompt-forge',
    description: 'Developer tool for saving and enhancing prompts.',
    url: 'https://github.com/drumnation/prompt-forge',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2024-01-15T12:00:00Z',
    isPrivate: false,
    topics: ['ai', 'prompt-engineering', 'developer-tools'],
  },
  {
    id: '4',
    name: 'model-maestro',
    description: 'Project to determine the correct AI model to use based on the prompt.',
    url: 'https://github.com/drumnation/model-maestro',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2024-01-01T12:00:00Z',
    isPrivate: false,
    topics: ['ai', 'machine-learning', 'model-selection'],
  },
  {
    id: '5',
    name: 'cursor-directory-structure-ts',
    description: 'TypeScript library that tracks folder structure in a repo for AI context, using Gemini for enhanced folder and file descriptions.',
    url: 'https://github.com/drumnation/cursor-directory-structure-ts',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2024-02-15T12:00:00Z',
    isPrivate: false,
    topics: ['typescript', 'ai', 'gemini', 'developer-tools'],
  },
  {
    id: '6',
    name: 'game-sage',
    description: 'Electron app that uses ChatGPT to read your screen and provide real-time gaming feedback.',
    url: 'https://github.com/drumnation/game-sage',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2023-12-01T12:00:00Z',
    isPrivate: false,
    topics: ['electron', 'chatgpt', 'gaming', 'ai'],
  },
  {
    id: '7',
    name: 'react-native-cross-platform-responsive-dimensions',
    description: 'Library for handling responsive dimensions across different mobile screen sizes in React Native.',
    url: 'https://github.com/drumnation/react-native-cross-platform-responsive-dimensions',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2022-06-01T12:00:00Z',
    isPrivate: false,
    topics: ['react-native', 'responsive-design', 'mobile', 'library'],
  },
  {
    id: '8',
    name: 'BeatSaber2Ragnarock',
    description: 'TypeScript rewrite with tests for converting Beat Saber levels to Ragnarock game format.',
    url: 'https://github.com/drumnation/BeatSaber2Ragnarock',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2023-08-01T12:00:00Z',
    isPrivate: false,
    topics: ['typescript', 'gaming', 'converter', 'beat-saber'],
  },
  {
    id: '9',
    name: 'react-midi-sequencer',
    description: 'Web-based MIDI sequencer for playing piano rolls and writing music.',
    url: 'https://github.com/drumnation/react-midi-sequencer',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2021-01-01T12:00:00Z',
    isPrivate: false,
    topics: ['react', 'midi', 'music', 'web-audio'],
  },
  {
    id: '10',
    name: 'javascript-es6-design-patterns',
    description: 'Collection of ES6 design patterns for reference and learning.',
    url: 'https://github.com/drumnation/javascript-es6-design-patterns',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    issues: 0,
    lastUpdated: '2022-01-01T12:00:00Z',
    isPrivate: false,
    topics: ['javascript', 'es6', 'design-patterns', 'education'],
  }
];

const mockStats = {
  totalRepositories: 14,
  totalStars: 0,
  totalForks: 0,
  totalIssues: 0,
  topLanguages: [
    { name: 'TypeScript', count: 8, percentage: 57.1 },
    { name: 'JavaScript', count: 6, percentage: 42.9 }
  ],
  topTopics: [
    { name: 'AI/ML', count: 6, percentage: 42.9 },
    { name: 'Developer Tools', count: 4, percentage: 28.6 },
    { name: 'Gaming', count: 2, percentage: 14.3 },
    { name: 'Web Development', count: 2, percentage: 14.3 }
  ],
  contributionsByMonth: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 78 },
    { month: 'Apr', count: 110 },
    { month: 'May', count: 92 },
    { month: 'Jun', count: 86 },
    { month: 'Jul', count: 124 },
    { month: 'Aug', count: 135 },
    { month: 'Sep', count: 98 },
    { month: 'Oct', count: 112 },
    { month: 'Nov', count: 89 },
    { month: 'Dec', count: 67 }
  ]
};

const mockPrivateWorks = [
  {
    title: 'Senior Frontend Developer',
    company: 'Enterprise SaaS Company',
    description: 'Led the development of a large-scale enterprise application dashboard used by Fortune 500 companies.',
    technologies: ['React', 'TypeScript', 'GraphQL', 'AWS', 'Material-UI'],
    achievements: [
      'Improved application performance by 40% through code optimization and lazy loading',
      'Implemented real-time data synchronization across multiple user sessions',
      'Led a team of 5 developers and mentored 3 junior developers',
    ],
    period: '2021 - Present',
  },
  {
    title: 'Full Stack Developer',
    company: 'FinTech Startup',
    description: 'Developed a secure financial transaction platform handling millions in daily transactions.',
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
    achievements: [
      'Built a scalable microservices architecture handling 100k+ daily transactions',
      'Implemented bank-grade security protocols and achieved SOC 2 compliance',
      'Reduced deployment time by 70% through CI/CD pipeline optimization',
    ],
    period: '2019 - 2021',
  },
];

const mockFilters = {
  languages: [
    { type: 'language', value: 'typescript', label: 'TypeScript', count: 8 },
    { type: 'language', value: 'javascript', label: 'JavaScript', count: 6 }
  ] as Filter[],
  topics: [
    { type: 'topic', value: 'ai', label: 'AI/ML', count: 6 },
    { type: 'topic', value: 'developer-tools', label: 'Developer Tools', count: 4 },
    { type: 'topic', value: 'gaming', label: 'Gaming', count: 2 },
    { type: 'topic', value: 'web-development', label: 'Web Development', count: 2 }
  ] as Filter[],
  types: [
    { type: 'type', value: 'library', label: 'Library', count: 3 },
    { type: 'type', value: 'tool', label: 'Tool', count: 7 },
    { type: 'type', value: 'application', label: 'Application', count: 4 }
  ] as Filter[]
};

const meta = {
  title: 'Pages/04-Code-Examples',
  component: GitHubPortfolioTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The Code Examples page showcasing GitHub repositories as a portfolio. This is the main page used for the Code Examples section of the site. Adapts to all screen sizes with appropriate layout changes for mobile and tablet devices.'
      }
    }
  },
} satisfies Meta<typeof GitHubPortfolioTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the GitHubPortfolioTemplate without specifying a viewport.
 */
export const Default: Story = {
  args: {
    repositories: mockRepositories,
    filters: mockFilters,
    selectedFilters: {
      languages: [],
      topics: [],
      types: [],
    },
    onFilterChange: (type, value) => console.log(`Filter changed: ${type} - ${value}`),
    onClearFilters: () => console.log('Filters cleared'),
    onSearch: (query) => console.log(`Search query: ${query}`),
  },
};

/**
 * Desktop view of the GitHub Portfolio Template
 */
export const Desktop: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'GitHubPortfolioTemplate as viewed on desktop devices. Shows the full-width layout with optimal spacing and multi-column organization for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the GitHub Portfolio Template
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'GitHubPortfolioTemplate as viewed on mobile devices. The template adapts with a single-column layout for repositories, filters that stack vertically, and improved spacing for touch interactions. All content remains accessible with a mobile-optimized reading experience.'
      },
    },
  },
};

/**
 * Tablet view of the GitHub Portfolio Template
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'GitHubPortfolioTemplate as viewed on tablet devices. Shows an intermediate layout between mobile and desktop, with optimized navigation and content organization for medium-sized screens.'
      },
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

/**
 * Desktop view of the loading state
 */
export const LoadingDesktop: Story = {
  args: {
    ...Loading.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Loading state of the GitHubPortfolioTemplate as viewed on desktop devices.'
      },
    },
  },
};

/**
 * Mobile view of the loading state
 */
export const LoadingMobile: Story = {
  args: {
    ...Loading.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Loading state of the GitHubPortfolioTemplate as viewed on mobile devices. Loading indicators are properly sized and centered for the mobile viewport.'
      },
    },
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'Failed to load portfolio data. Please try again.',
    onRetry: () => console.log('Retry clicked'),
  },
};

/**
 * Desktop view of the error state
 */
export const ErrorDesktop: Story = {
  args: {
    ...Error.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Error state of the GitHubPortfolioTemplate as viewed on desktop devices.'
      },
    },
  },
};

/**
 * Mobile view of the error state
 */
export const ErrorMobile: Story = {
  args: {
    ...Error.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Error state of the GitHubPortfolioTemplate as viewed on mobile devices. Error message and retry button are properly sized and positioned for mobile viewing.'
      },
    },
  },
};

export const WithFilters: Story = {
  args: {
    ...Default.args,
    selectedFilters: {
      languages: ['typescript'],
      topics: ['react', 'nextjs'],
      types: ['library'],
    },
  },
}; 