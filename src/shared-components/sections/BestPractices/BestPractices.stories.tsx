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

/**
 * Desktop view of the BestPractices section.
 */
export const Desktop: Story = {
  args: {
    ...Section.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'BestPractices section as viewed on desktop devices. Shows the complete layout with optimal spacing, multi-column grid, and full content presentation.',
      },
    },
  },
};

/**
 * Mobile view of the BestPractices section.
 */
export const Mobile: Story = {
  args: {
    ...Section.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'BestPractices section as viewed on mobile devices. Layout adapts to a single column with adjusted spacing, typography, and content organization for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet view of the BestPractices section.
 */
export const Tablet: Story = {
  args: {
    ...Section.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'BestPractices section as viewed on tablet devices. Shows the responsive behavior between mobile and desktop layouts with appropriate grid adjustments.',
      },
    },
  },
}; 