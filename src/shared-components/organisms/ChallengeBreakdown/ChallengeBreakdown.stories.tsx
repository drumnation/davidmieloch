import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeBreakdown } from './ChallengeBreakdown';

const meta = {
  title: 'Organisms/ChallengeBreakdown',
  component: ChallengeBreakdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChallengeBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockChallenges = [
  {
    title: 'Development Velocity',
    description: 'Traditional development processes are slow and resource-intensive.',
    impact: 'Delays in feature delivery and market opportunities missed',
    icon: '🚀',
    metrics: [
      {
        value: '45%',
        label: 'Slower Time to Market',
        trend: 'down' as const,
      },
      {
        value: '3x',
        label: 'Higher Development Costs',
        trend: 'up' as const,
      },
    ],
  },
  {
    title: 'Code Quality',
    description: 'Maintaining consistent code quality across large teams is challenging.',
    impact: 'Technical debt accumulation and increased bugs',
    icon: '⚡',
    metrics: [
      {
        value: '30%',
        label: 'More Bug Reports',
        trend: 'up' as const,
      },
      {
        value: '2x',
        label: 'Longer Review Cycles',
        trend: 'up' as const,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    title: 'Key Development Challenges',
    description: 'Common obstacles faced by development teams in enterprise environments',
    challenges: mockChallenges,
    style: 'gradient-card',
    position: 'full-width',
    animation: 'fade-up',
  },
};

export const AccentStyle: Story = {
  args: {
    ...Default.args,
    style: 'accent-card',
  },
};

export const LeftAligned: Story = {
  args: {
    ...Default.args,
    position: 'left',
  },
};

export const NoAnimation: Story = {
  args: {
    ...Default.args,
    animation: 'none',
  },
}; 