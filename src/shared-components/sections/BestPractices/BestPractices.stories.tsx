import type { Meta, StoryObj } from '@storybook/react';
import { BestPractices } from './BestPractices';

const meta = {
  title: 'Pages/02-BestPractices/Section',
  component: BestPractices,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section component that showcases modern development best practices with detailed content, categories, and conclusions.'
      }
    }
  },
} satisfies Meta<typeof BestPractices>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the BestPractices section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Section: Story = {
  args: {
    id: 'best-practices',
  },
}; 