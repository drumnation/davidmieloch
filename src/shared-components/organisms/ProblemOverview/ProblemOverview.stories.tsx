import type { Meta, StoryObj } from '@storybook/react';
import { ProblemOverview } from './ProblemOverview';

const meta = {
  title: 'Organisms/ProblemOverview',
  component: ProblemOverview,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['gradient-card', 'accent-card'],
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'full-width'],
    },
    animation: {
      control: 'select',
      options: ['fade-up', 'slide-in', 'none'],
    },
    background: {
      control: 'select',
      options: ['light', 'dark', 'gradient'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProblemOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentProblems: Story = {
  args: {
    title: 'Current Problems in AI Integration',
    description: 'Teams are facing significant challenges with AI tool adoption, leading to decreased productivity and increased technical debt.',
    metrics: [
      {
        number: '100',
        suffix: '%',
        label: 'increase in suggestion acceptance metrics',
      },
      {
        number: '2',
        prefix: '~',
        suffix: 'x',
        label: 'longer to fix AI-generated code issues',
      },
      {
        number: '3',
        suffix: 'x',
        label: 'higher maintenance costs with poor AI integration',
      },
    ],
    style: 'gradient-card',
    position: 'full-width',
    animation: 'fade-up',
    background: 'gradient',
  },
};

export const CognitiveLoadManagement: Story = {
  args: {
    title: 'Cognitive Load Management',
    description: 'Manual development tasks consume significant mental bandwidth, limiting capacity for strategic thinking and architecture decisions.',
    metrics: [
      {
        number: '40',
        suffix: '%',
        label: 'reduction in routine coding tasks',
      },
      {
        number: '60',
        suffix: '%',
        label: 'more time for architecture',
      },
      {
        number: '25',
        suffix: '%',
        label: 'increase in code quality',
      },
    ],
    style: 'accent-card',
    position: 'right',
    animation: 'slide-in',
    background: 'light',
  },
};

export const EngineeringExcellence: Story = {
  args: {
    title: 'Critical Requirements for Success',
    description: 'Implementing AI tools effectively requires a strong foundation of engineering practices and quality controls.',
    metrics: [
      {
        number: '6',
        label: 'key quality gates required',
      },
      {
        number: '100',
        suffix: '%',
        label: 'type coverage needed',
      },
      {
        number: '95',
        suffix: '%',
        label: 'test coverage target',
      },
    ],
    style: 'gradient-card',
    position: 'left',
    animation: 'fade-up',
    background: 'dark',
  },
}; 