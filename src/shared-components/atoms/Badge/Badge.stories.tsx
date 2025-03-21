import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'stars', 'forks', 'issues', 'prs'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    count: {
      control: 'number',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 42,
    variant: 'default',
    size: 'md',
  },
};

export const Stars: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'md',
  },
};

export const Forks: Story = {
  args: {
    count: 124,
    variant: 'forks',
    size: 'md',
  },
};

export const Issues: Story = {
  args: {
    count: 35,
    variant: 'issues',
    size: 'md',
  },
};

export const PullRequests: Story = {
  args: {
    count: 12,
    variant: 'prs',
    size: 'md',
  },
};

export const WithLabel: Story = {
  args: {
    count: 1250,
    label: 'stars',
    variant: 'stars',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'lg',
  },
}; 