import type { Meta, StoryObj } from '@storybook/react';
import { RepoCard } from './RepoCard';
import { Repository } from '../../types/Repository.types';

const mockRepo: Repository = {
  id: '1',
  name: 'awesome-project',
  fullName: 'username/awesome-project',
  description: 'This is a really awesome project with a ton of features. It includes everything you need to build amazing applications. The codebase is clean, well-tested, and follows best practices.',
  url: 'https://github.com/username/awesome-project',
  language: 'TypeScript',
  stars: 1250,
  forks: 124,
  watchers: 85,
  issues: 35,
  createdAt: '2022-01-10T09:15:00Z',
  updatedAt: '2023-03-15T10:30:00Z',
  topics: ['react', 'typescript', 'storybook', 'frontend', 'ui', 'design-system'],
  isPrivate: false,
  owner: {
    login: 'username',
    id: 'user1',
    avatarUrl: 'https://github.com/username.png',
    url: 'https://github.com/username'
  }
};

const privateRepo: Repository = {
  ...mockRepo,
  id: '2',
  name: 'secret-project',
  fullName: 'username/secret-project',
  isPrivate: true,
  description: 'A private repository with confidential code and features.',
  topics: ['private', 'security', 'enterprise'],
};

const meta = {
  title: 'Molecules/RepoCard',
  component: RepoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isCompact: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RepoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repo: mockRepo,
    isCompact: false,
  },
};

export const Compact: Story = {
  args: {
    repo: mockRepo,
    isCompact: true,
  },
};

export const Private: Story = {
  args: {
    repo: privateRepo,
    isCompact: false,
  },
};

export const NoLanguage: Story = {
  args: {
    repo: {
      ...mockRepo,
      id: '3',
      language: undefined,
    },
    isCompact: false,
  },
};

export const NoTopics: Story = {
  args: {
    repo: {
      ...mockRepo,
      id: '4',
      topics: [],
    },
    isCompact: false,
  },
};

export const MinimalStats: Story = {
  args: {
    repo: {
      ...mockRepo,
      id: '5',
      stars: 0,
      forks: 0,
      issues: 0,
      watchers: 0,
    },
    isCompact: false,
  },
}; 