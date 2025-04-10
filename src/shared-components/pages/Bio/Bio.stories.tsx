import type { Meta, StoryObj } from '@storybook/react';
import { BioPage } from './Bio';

const meta = {
  title: 'Pages/03-Bio',
  component: BioPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-page Bio component that presents professional information, testimonials, and technical expertise. Features responsive design for optimal viewing on all devices.'
      }
    }
  },
} satisfies Meta<typeof BioPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete Bio page without specifying a viewport.
 */
export const Default: Story = {
  args: {
    id: 'bio',
  },
};

/**
 * Desktop view of the Bio page
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
        story: 'BioPage as viewed on desktop devices. Shows the full-width layout with optimal spacing and multi-column organization for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the Bio page
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
        story: 'BioPage as viewed on mobile devices. The layout adapts with appropriate spacing, font sizing, and content organization for smaller screens. All sections stack vertically with touch-friendly interactions and readable typography.'
      },
    },
  },
};

/**
 * Tablet view of the Bio page
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
        story: 'BioPage as viewed on tablet devices. Shows an intermediate layout with optimized content flow for medium-sized screens, balancing between the desktop and mobile experiences.'
      },
    },
  },
}; 