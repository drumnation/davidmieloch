import type { Meta, StoryObj } from '@storybook/react';
import { RepoCard } from './RepoCard';
import { Repository } from './RepoCard.types';

const mockRepo: Repository = {
  id: '1',
  name: 'awesome-project',
  description: 'This is a really awesome project with a ton of features. It includes everything you need to build amazing applications. The codebase is clean, well-tested, and follows best practices.',
  url: 'https://github.com/username/awesome-project',
  language: 'TypeScript',
  stars: 1250,
  forks: 124,
  issues: 35,
  lastUpdated: '2023-03-15T10:30:00Z',
  isPrivate: false,
  topics: ['react', 'typescript', 'storybook', 'frontend', 'ui', 'design-system'],
};

const privateRepo: Repository = {
  ...mockRepo,
  id: '2',
  name: 'secret-project',
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
      language: '',
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
    },
    isCompact: false,
  },
}; 