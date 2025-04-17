import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BioPage } from './Bio';

const meta = {
  title: 'Pages/03-Bio',
  component: BioPage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
} satisfies Meta<typeof BioPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete Bio page with all sections.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    id: 'bio',
  },
};

/**
 * Desktop view of the Bio page.
 */
export const Desktop: Story = {
  args: {
    id: 'bio',
  },
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the Bio page.
 */
export const Mobile: Story = {
  args: {
    id: 'bio',
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
 * Tablet view of the Bio page.
 */
export const Tablet: Story = {
  args: {
    id: 'bio',
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 