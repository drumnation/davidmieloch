import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TeamCard } from './TeamCard';

const meta: Meta<typeof TeamCard> = {
  title: 'Organisms/TeamCard',
  component: TeamCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof TeamCard>;

// Base TeamCard Story
export const Default: Story = {
  args: {
    name: 'Team Architect',
    agent: 'Agent Smith',
    icon: '🏛️',
    responsibilities: [
      'Reviews and maintains architectural decisions',
      'Ensures patterns are followed across the codebase',
      'Manages technical debt and system health',
      'Documents key decisions and their rationale',
    ],
    skills: [
      'System Architecture',
      'Pattern Recognition',
      'Technical Planning',
      'Documentation',
    ],
  },
};

// Multiple Teams Story
export const Teams = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <TeamCard
      name="Team Frontend"
      agent="Agent Keen"
      icon="🎨"
      responsibilities={[
        'Implements UI components and features',
        'Maintains consistency in user experience',
        'Handles accessibility and responsive design',
        'Documents component usage and patterns',
      ]}
      skills={[
        'UI Development',
        'UX Design',
        'Accessibility',
        'Component Systems',
      ]}
    />
    <TeamCard
      name="Team AI/ML"
      agent="Agent Mulder"
      icon="🧠"
      responsibilities={[
        'Optimizes AI integrations',
        'Manages model interactions and prompts',
        'Handles data processing pipelines',
        'Documents AI-related patterns and practices',
      ]}
      skills={[
        'AI Integration',
        'Model Management',
        'Data Processing',
        'Pattern Documentation',
      ]}
    />
  </div>
); 