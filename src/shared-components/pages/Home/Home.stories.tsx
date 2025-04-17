import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Home } from './Home';

const meta: Meta<typeof Home> = {
  title: 'pages/00-Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    // Default viewport for the component documentation page
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Home>;

// Default story (inherits defaultViewport: 'responsive')
export const Desktop: Story = {
  args: {},
  name: 'Desktop (Default)',
};

// Mobile story
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphonex', // Example mobile viewport
    },
    docs: { disable: true }, // Optional: hide from docs page if redundant
  },
  name: 'Mobile (iPhone X)',
};

// Tablet story
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad', // Example tablet viewport
    },
    docs: { disable: true }, // Optional: hide from docs page if redundant
  },
  name: 'Tablet (iPad)',
}; 