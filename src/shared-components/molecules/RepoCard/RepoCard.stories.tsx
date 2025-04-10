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
  title: 'Pages/04-Code-Examples/Components/RepoCard',
  component: RepoCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'RepoCard component used in the Code Examples page with mobile-first design that adapts to different screen sizes. Shows GitHub repository information in a clean card format.',
      },
    },
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

/**
 * Mobile view of the default repository card
 */
export const DefaultMobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Default repository card as viewed on mobile devices. The card layout adjusts to the narrower screen width.',
      },
    },
  },
};

/**
 * Tablet view of the default repository card
 */
export const DefaultTablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Default repository card as viewed on tablet devices.',
      },
    },
  },
};

export const Compact: Story = {
  args: {
    repo: mockRepo,
    isCompact: true,
  },
};

/**
 * Mobile view of the compact repository card
 */
export const CompactMobile: Story = {
  args: {
    ...Compact.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Compact repository card as viewed on mobile devices. The compact layout is particularly useful for mobile views.',
      },
    },
  },
};

export const Private: Story = {
  args: {
    repo: privateRepo,
    isCompact: false,
  },
};

/**
 * Mobile view of a private repository card
 */
export const PrivateMobile: Story = {
  args: {
    ...Private.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Private repository card as viewed on mobile devices.',
      },
    },
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