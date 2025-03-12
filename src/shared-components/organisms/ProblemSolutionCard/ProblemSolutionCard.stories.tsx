import type { Meta, StoryObj } from '@storybook/react';
import { ProblemSolutionCard } from '.';

const meta = {
  title: 'Organisms/ProblemSolutionCard',
  component: ProblemSolutionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    problem: {
      control: 'text',
      description: 'The problem statement',
    },
    solution: {
      control: 'text',
      description: 'The solution description',
    },
    impact: {
      control: 'text',
      description: 'The impact statement',
    },
    icon: {
      control: 'text',
      description: 'Icon name from Tabler icons',
    },
    variant: {
      control: 'select',
      options: ['gradient', 'accent'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof ProblemSolutionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    problem: 'AI Integration Complexity',
    solution: 'Simplified AI Workflow System',
    impact: 'Reduced integration time by 75%',
    icon: 'robot',
    variant: 'gradient',
  },
};

export const WithLongContent: Story = {
  args: {
    problem: 'Complex AI systems require extensive training and expertise to implement effectively',
    solution: 'Our automated workflow system handles the complexity, allowing teams to focus on their core tasks',
    impact: 'Teams can start using AI tools within days instead of months, with 90% less training time',
    icon: 'brain',
    variant: 'accent',
  },
};

export const MultipleCards: Story = {
  args: {
    problem: 'AI Integration Complexity',
    solution: 'Simplified AI Workflow',
    impact: '75% faster integration',
    icon: 'robot',
    variant: 'gradient',
  },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '800px' }}>
      <ProblemSolutionCard {...args} />
      <ProblemSolutionCard
        problem="Training Overhead"
        solution="Automated Learning System"
        impact="90% less training time"
        icon="brain"
        variant="accent"
      />
    </div>
  ),
}; 