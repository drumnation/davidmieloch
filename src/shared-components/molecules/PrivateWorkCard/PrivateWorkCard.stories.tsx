import type { Meta, StoryObj } from '@storybook/react';
import { Code2, Database, Globe } from 'lucide-react';
import { PrivateWorkCard } from './PrivateWorkCard';

const meta = {
  title: 'Molecules/PrivateWorkCard',
  component: PrivateWorkCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PrivateWorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Enterprise Data Platform',
    company: 'Tech Corp',
    period: 'Jan 2022 - Present',
    description: 'Led the development of a scalable data platform handling millions of daily transactions.',
    role: 'Senior Software Engineer',
    technologies: [
      { name: 'TypeScript', icon: <Code2 size={12} /> },
      { name: 'PostgreSQL', icon: <Database size={12} /> },
      { name: 'GraphQL', icon: <Globe size={12} /> },
    ],
    achievements: [
      'Improved system performance by 40% through optimization',
      'Implemented real-time data processing pipeline',
      'Led a team of 5 developers',
    ],
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    imageUrl: 'https://via.placeholder.com/64',
  },
};

export const NoAchievements: Story = {
  args: {
    ...Default.args,
    achievements: undefined,
  },
};

export const NoRole: Story = {
  args: {
    ...Default.args,
    role: undefined,
  },
}; 