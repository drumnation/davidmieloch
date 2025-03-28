import type { Meta, StoryObj } from '@storybook/react';
import { BestPractices } from './BestPractices';

const meta = {
  title: 'Pages/02-BestPractices',
  component: BestPractices,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BestPractices>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete BestPractices page with all sections.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    id: 'best-practices',
  },
}; 