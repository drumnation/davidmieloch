import type { Meta, StoryObj } from '@storybook/react';
import { RepoGrid } from './RepoGrid';
import { Repository } from '../../types/Repository.types';

const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react-component-library',
    fullName: 'user/react-component-library',
    description: 'A comprehensive React component library built with TypeScript and styled-components.',
    language: 'TypeScript',
    topics: ['react', 'typescript', 'ui', 'component-library', 'frontend'],
    stars: 245,
    forks: 45,
    watchers: 78,
    issues: 12,
    url: 'https://github.com/user/react-component-library',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-03-19T12:00:00Z',
    isPrivate: false,
    owner: {
      login: 'user',
      id: 'user1',
      avatarUrl: 'https://github.com/user.png',
      url: 'https://github.com/user'
    }
  },
  {
    id: '2',
    name: 'next-auth-starter',
    fullName: 'user/next-auth-starter',
    description: 'A starter template for Next.js applications with authentication already set up.',
    language: 'TypeScript',
    topics: ['nextjs', 'auth', 'typescript', 'template'],
    stars: 178,
    forks: 32,
    watchers: 56,
    issues: 5,
    url: 'https://github.com/user/next-auth-starter',
    createdAt: '2023-05-20T14:30:00Z',
    updatedAt: '2024-03-18T12:00:00Z',
    isPrivate: false,
    owner: {
      login: 'user',
      id: 'user1',
      avatarUrl: 'https://github.com/user.png',
      url: 'https://github.com/user'
    }
  },
  {
    id: '3',
    name: 'data-visualization-dashboard',
    fullName: 'user/data-visualization-dashboard',
    description: 'An interactive dashboard for data visualization using D3.js and React.',
    language: 'JavaScript',
    topics: ['d3', 'react', 'data-visualization', 'dashboard', 'javascript'],
    stars: 302,
    forks: 67,
    watchers: 120,
    issues: 21,
    url: 'https://github.com/user/data-visualization-dashboard',
    createdAt: '2023-02-10T09:15:00Z',
    updatedAt: '2024-03-17T12:00:00Z',
    isPrivate: false,
    owner: {
      login: 'user',
      id: 'user1',
      avatarUrl: 'https://github.com/user.png',
      url: 'https://github.com/user'
    }
  },
];

const meta = {
  title: 'Pages/04-Code-Examples/Components/RepoGrid',
  component: RepoGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Repository grid component used in the Code Examples page. This component has a mobile-first design that adapts to different screen sizes. Automatically adjusts the number of columns and spacing based on viewport width.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3],
    },
    gap: {
      control: 'number',
    },
  },
} satisfies Meta<typeof RepoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repositories: mockRepositories,
    columns: 3,
    gap: 24,
  },
};

/**
 * Mobile view of the repository grid
 */
export const DefaultMobile: Story = {
  args: {
    ...Default.args,
    columns: 1, // Force single column for mobile
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Repository grid as viewed on mobile devices. Automatically adjusts to a single column layout for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet view of the repository grid
 */
export const DefaultTablet: Story = {
  args: {
    ...Default.args,
    columns: 2, // Two columns for tablet
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Repository grid as viewed on tablet devices. Uses a two-column layout that works well on medium-sized screens.',
      },
    },
  },
};

export const TwoColumns: Story = {
  args: {
    repositories: mockRepositories,
    columns: 2,
    gap: 24,
  },
};

export const Loading: Story = {
  args: {
    repositories: [],
    isLoading: true,
    columns: 3,
    gap: 24,
  },
};

/**
 * Mobile view of the loading state
 */
export const LoadingMobile: Story = {
  args: {
    ...Loading.args,
    columns: 1,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Loading state of the repository grid as viewed on mobile devices.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    repositories: [],
    columns: 3,
    gap: 24,
  },
};

/**
 * Mobile view of the empty state
 */
export const EmptyMobile: Story = {
  args: {
    ...Empty.args,
    columns: 1,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Empty state of the repository grid as viewed on mobile devices.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    repositories: [],
    error: 'Failed to load repositories. Please try again.',
    onRetry: () => console.log('Retry clicked'),
    columns: 3,
    gap: 24,
  },
};

/**
 * Mobile view of the error state
 */
export const ErrorMobile: Story = {
  args: {
    ...Error.args,
    columns: 1,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Error state of the repository grid as viewed on mobile devices.',
      },
    },
  },
}; 