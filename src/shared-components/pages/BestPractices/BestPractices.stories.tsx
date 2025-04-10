import type { Meta, StoryObj } from '@storybook/react';
import { BestPractices } from './BestPractices';

const meta = {
  title: 'Pages/02-BestPractices',
  component: BestPractices,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The complete BestPractices page that showcases modern development best practices with all sections included.'
      }
    }
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

/**
 * Desktop view of the BestPractices page.
 */
export const Desktop: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'BestPractices page as viewed on desktop devices. Shows the complete page with optimal spacing, multi-column grid layouts, and full content presentation.',
      },
    },
  },
};

/**
 * Mobile view of the BestPractices page.
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'BestPractices page as viewed on mobile devices. The complete page layout adapts to a single column with adjusted spacing, typography, and content organization for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet view of the BestPractices page.
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'BestPractices page as viewed on tablet devices. Shows the responsive behavior between mobile and desktop layouts with appropriate grid adjustments for the entire page.',
      },
    },
  },
}; 