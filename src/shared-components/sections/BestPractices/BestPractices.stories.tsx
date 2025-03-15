import type { Meta, StoryObj } from '@storybook/react';
import { BestPractices } from './BestPractices';

const meta: Meta<typeof BestPractices> = {
  title: 'Sections/BestPractices',
  component: BestPractices,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BestPractices>;

export const Default: Story = {
  args: {
    id: 'best-practices',
  },
}; 