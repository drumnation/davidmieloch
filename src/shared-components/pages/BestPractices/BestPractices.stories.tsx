import type { Meta, StoryObj } from '@storybook/react';
import { BestPractices } from '../../sections/BestPractices';

const meta = {
  title: 'Pages/02-BestPractices',
  component: BestPractices,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BestPractices>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'best-practices',
  },
}; 