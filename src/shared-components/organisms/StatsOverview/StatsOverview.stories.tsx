import type { Meta, StoryObj } from '@storybook/react';
import { StatsOverview } from './StatsOverview';

const mockStats = {
  totalRepositories: 48,
  totalStars: 1250,
  totalForks: 320,
  totalIssues: 25,
  topLanguages: [
    { name: 'TypeScript', count: 20, percentage: 41.7 },
    { name: 'JavaScript', count: 15, percentage: 31.3 },
    { name: 'Python', count: 8, percentage: 16.7 },
    { name: 'Go', count: 3, percentage: 6.3 },
    { name: 'Rust', count: 2, percentage: 4.2 },
  ],
  topTopics: [
    { name: 'React', count: 18, percentage: 37.5 },
    { name: 'Node.js', count: 12, percentage: 25.0 },
    { name: 'API', count: 8, percentage: 16.7 },
    { name: 'DevOps', count: 6, percentage: 12.5 },
    { name: 'Machine Learning', count: 4, percentage: 8.3 },
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
    { month: 'Dec', count: 67 },
  ],
};

const meta = {
  title: 'Organisms/StatsOverview',
  component: StatsOverview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: mockStats,
  },
};

export const CustomTitles: Story = {
  args: {
    stats: mockStats,
    title: 'GitHub Activity Overview',
    subtitle: 'A summary of your open source contributions',
  },
};

export const Loading: Story = {
  args: {
    stats: mockStats,
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    stats: mockStats,
    error: 'Failed to load repository statistics. Please try again.',
    onRetry: () => console.log('Retry clicked'),
  },
}; 