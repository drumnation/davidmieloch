import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '../../../../app/page';

const meta = {
  title: 'Pages/00-Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main landing page of the website, featuring a hero section, persona-targeted navigation, and sections showcasing the Full-Stack Business Person concept. Fully responsive with optimized layouts for all device sizes.'
      }
    }
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete Home page without specifying a viewport.
 */
export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the Home page
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
        story: 'HomePage as viewed on desktop devices. Shows the full-width layout with optimal spacing and multi-column organization for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the Home page
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
        story: 'HomePage as viewed on mobile devices. The layout adapts with single-column organization of content, appropriate spacing, and optimized typography for smaller screens. All interactive elements are sized for touch interaction, and content is prioritized for mobile reading.'
      },
    },
  },
};

/**
 * Tablet view of the Home page
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
        story: 'HomePage as viewed on tablet devices. Shows an intermediate layout optimized for medium-sized screens, with refined spacing and organization that bridges the desktop and mobile experiences.'
      },
    },
  },
}; 