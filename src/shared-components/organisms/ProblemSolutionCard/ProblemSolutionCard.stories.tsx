import type { Meta, StoryObj } from '@storybook/react';
import { ProblemSolutionCard } from './ProblemSolutionCard';

const meta: Meta<typeof ProblemSolutionCard> = {
  title: 'Organisms/ProblemSolutionCard',
  component: ProblemSolutionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'white'],
      defaultValue: 'blue',
    },
    icon: {
      control: 'text',
    },
    slug: {
      control: 'text',
    },
    problem: {
      control: 'text',
    },
    solution: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProblemSolutionCard>;

export const Metrics: Story = {
  args: {
    slug: 'Metrics',
    icon: 'chart-bar',
    problem: 'Misaligned metrics incentivize bad code',
    solution: 'Quality-focused measurement approach',
    variant: 'blue',
  },
};

export const Accuracy: Story = {
  args: {
    slug: 'Accuracy',
    icon: 'refresh',
    problem: 'AI generates plausible but incorrect code',
    solution: 'My systematic validation approach catches AI errors before they reach production',
    variant: 'blue',
  },
};

export const Quality: Story = {
  args: {
    slug: 'Quality',
    icon: 'code',
    problem: 'Developers spend more time fixing AI code than writing it',
    solution: 'I\'ve created prompt engineering techniques that produce reliable, maintainable code',
    variant: 'blue',
  },
};

export const WhiteVariant: Story = {
  args: {
    ...Metrics.args,
    variant: 'white',
  },
}; 