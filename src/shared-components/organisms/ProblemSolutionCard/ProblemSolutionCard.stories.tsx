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
    problem: 'Misaligned metrics incentivize bad code',
    solution: 'Quality-focused measurement approach',
    impact: 'Improved code quality with AI assistance',
    icon: 'chart-bar',
    variant: 'gradient',
  },
};

export const WithLongContent: Story = {
  args: {
    problem: 'Developers spend more time fixing AI-generated code than writing it from scratch',
    solution: "I've developed prompt engineering techniques that produce reliable, maintainable code",
    impact: '30% faster development with fewer rework cycles',
    icon: 'code',
    variant: 'accent',
  },
};

export const MultipleCards: Story = {
  args: {
    problem: 'Misaligned metrics incentivize bad code',
    solution: 'Quality-focused measurement approach',
    impact: 'Improved code quality with AI assistance',
    icon: 'chart-bar',
    variant: 'gradient',
  },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '800px' }}>
      <ProblemSolutionCard {...args} />
      <ProblemSolutionCard
        problem="AI generates plausible but incorrect code"
        solution="Systematic validation approach"
        impact="65% fewer production failures"
        icon="shield-check"
        variant="accent"
      />
    </div>
  ),
}; 