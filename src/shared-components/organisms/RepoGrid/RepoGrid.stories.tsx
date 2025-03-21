import type { Meta, StoryObj } from '@storybook/react';
import { RepoGrid } from './RepoGrid';

const mockRepositories = [
  {
    id: 1,
    name: 'react-component-library',
    description: 'A comprehensive React component library built with TypeScript and styled-components.',
    language: 'TypeScript',
    topics: ['react', 'typescript', 'ui', 'component-library', 'frontend'],
    stargazers_count: 245,
    forks_count: 45,
    open_issues_count: 12,
    html_url: 'https://github.com/user/react-component-library',
    updated_at: '2024-03-19T12:00:00Z',
    private: false,
  },
  {
    id: 2,
    name: 'next-auth-starter',
    description: 'A starter template for Next.js applications with authentication already set up.',
    language: 'TypeScript',
    topics: ['nextjs', 'auth', 'typescript', 'template'],
    stargazers_count: 178,
    forks_count: 32,
    open_issues_count: 5,
    html_url: 'https://github.com/user/next-auth-starter',
    updated_at: '2024-03-18T12:00:00Z',
    private: false,
  },
  {
    id: 3,
    name: 'data-visualization-dashboard',
    description: 'An interactive dashboard for data visualization using D3.js and React.',
    language: 'JavaScript',
    topics: ['d3', 'react', 'data-visualization', 'dashboard', 'javascript'],
    stargazers_count: 302,
    forks_count: 67,
    open_issues_count: 21,
    html_url: 'https://github.com/user/data-visualization-dashboard',
    updated_at: '2024-03-17T12:00:00Z',
    private: false,
  },
];

const meta = {
  title: 'Organisms/RepoGrid',
  component: RepoGrid,
  parameters: {
    layout: 'padded',
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

export const Empty: Story = {
  args: {
    repositories: [],
    columns: 3,
    gap: 24,
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