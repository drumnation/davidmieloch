import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import RootLayout from '../../app/layout';
import HomePage from '../../app/page';

/**
 * This story showcases the main application layout with routing support
 * and responsive design for different device sizes (desktop, tablet, mobile).
 */
const meta = {
  title: '00-App/MainApp',
  component: RootLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'The main app layout with routing support and responsive design. Demonstrates the complete app experience as users would see it.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RootLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default desktop view of the application.
 */
export const Desktop: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    nextRouter: {
      path: '/',
      asPath: '/',
      query: {},
    },
  },
  name: 'Desktop View',
};

/**
 * Tablet view of the application.
 */
export const Tablet: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    nextRouter: {
      path: '/',
      asPath: '/',
      query: {},
    },
  },
  name: 'Tablet View (iPad)',
};

/**
 * Mobile view of the application.
 */
export const Mobile: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    nextRouter: {
      path: '/',
      asPath: '/',
      query: {},
    },
  },
  name: 'Mobile View (iPhone X)',
};

/**
 * Application with a custom route demonstration.
 */
export const WithCustomRoute: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    nextRouter: {
      path: '/experience',
      asPath: '/experience',
      query: {},
    },
  },
  name: 'Custom Route Example',
}; 