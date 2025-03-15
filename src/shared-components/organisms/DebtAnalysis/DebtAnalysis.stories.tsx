import type { Meta, StoryObj } from '@storybook/react';
import { DebtAnalysis } from './DebtAnalysis';

const meta = {
  title: 'Organisms/DebtAnalysis',
  component: DebtAnalysis,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    categories: {
      description: 'Array of debt categories to display',
      control: 'object',
    },
    style: {
      description: 'Visual style of the cards',
      control: 'select',
      options: ['accent-cards', 'gradient-cards', 'default'],
    },
    position: {
      description: 'Position of the component in the layout',
      control: 'select',
      options: ['full-width', 'left', 'right', 'center'],
    },
  },
} satisfies Meta<typeof DebtAnalysis>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories = [
  {
    title: 'Code Debt',
    current_state: 'Legacy systems become increasingly difficult to maintain',
    impact: '2x maintenance cost year over year',
  },
  {
    title: 'Architecture Debt',
    current_state: 'Systems become rigid and resistant to change',
    impact: '3x longer implementation time for new features',
  },
  {
    title: 'Process Debt',
    current_state: 'Workarounds become standard practice',
    impact: '50% increase in development time',
  },
  {
    title: 'Documentation Debt',
    current_state: 'Documentation lags behind implementation',
    impact: '4x longer onboarding time',
  },
];

export const Default: Story = {
  args: {
    title: 'Technical Debt Categories',
    categories: mockCategories,
    style: 'accent-cards',
    position: 'full-width',
  },
};

export const GradientStyle: Story = {
  args: {
    ...Default.args,
    style: 'gradient-cards',
  },
};

export const DefaultStyle: Story = {
  args: {
    ...Default.args,
    style: 'default',
  },
};

export const CenteredPosition: Story = {
  args: {
    ...Default.args,
    position: 'center',
  },
};

export const NoTitle: Story = {
  args: {
    categories: mockCategories,
    style: 'accent-cards',
    position: 'full-width',
  },
}; 