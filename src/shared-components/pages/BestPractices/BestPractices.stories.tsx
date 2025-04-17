import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BestPractices } from './BestPractices';

const meta = {
  title: 'Pages/02-BestPractices/Section',
  component: BestPractices,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
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

/**
 * Desktop view of the BestPractices section.
 */
export const Desktop: Story = {
  args: {
    id: 'best-practices',
  },
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the BestPractices section.
 */
export const Mobile: Story = {
  args: {
    id: 'best-practices',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the BestPractices section.
 */
export const Tablet: Story = {
  args: {
    id: 'best-practices',
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 