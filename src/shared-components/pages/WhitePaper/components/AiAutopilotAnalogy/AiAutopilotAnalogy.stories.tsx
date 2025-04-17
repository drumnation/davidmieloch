import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { AiAutopilotAnalogy } from './AiAutopilotAnalogy';

const meta = {
  title: 'Pages/01-WhitePaper/02-AiAutopilotAnalogy',
  component: AiAutopilotAnalogy,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
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
 */
export const Desktop: Story = {
  args: {},
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the AiAutopilotAnalogy section.
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the AiAutopilotAnalogy section.
 */
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
};