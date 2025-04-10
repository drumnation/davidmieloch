import type { Meta, StoryObj } from '@storybook/react';
import { AiAutopilotAnalogy } from './AiAutopilotAnalogy';

const meta = {
  title: 'Pages/01-WhitePaper/02-AiAutopilotAnalogy',
  component: AiAutopilotAnalogy,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section that explains AI using the autopilot analogy, helping users understand how AI can augment human capabilities without replacing them.'
      }
    }
  },
} satisfies Meta<typeof AiAutopilotAnalogy>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the AiAutopilotAnalogy section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {}
};

/**
 * Desktop view of the AiAutopilotAnalogy section.
 * Shows the component optimized for desktop screens.
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
        story: 'AiAutopilotAnalogy section as viewed on desktop devices. Shows the full experience with optimal spacing and layout for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the AiAutopilotAnalogy section.
 * Shows the component adapted for mobile devices.
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
        story: 'AiAutopilotAnalogy section as viewed on mobile devices. The comparison tables and content sections adapt for smaller screens with appropriate spacing and typography.'
      },
    },
  },
};

/**
 * Tablet view of the AiAutopilotAnalogy section.
 * Shows the component adapted for tablet screens.
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
        story: 'AiAutopilotAnalogy section as viewed on tablet devices. Provides an intermediate responsive experience between mobile and desktop layouts.'
      },
    },
  },
};