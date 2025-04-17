import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import RootLayout from '../../app/layout';
import HomePage from '../../app/page';

/**
 * This story demonstrates different routes in the application.
 * It showcases how the app handles different URL paths and parameters.
 */
const meta = {
  title: '00-App/AppRouting',
  component: RootLayout,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        component: 'Demonstrates different routes in the application, showing how the app handles different URL paths and parameters.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RootLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Home route ("/")
 */
export const HomeRoute: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
        query: {}
      }
    },
  },
  name: 'Home Route',
};

/**
 * Experience route ("/experience")
 */
export const ExperienceRoute: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/experience',
        query: {}
      }
    },
  },
  name: 'Experience Route',
};

/**
 * Bio route ("/bio")
 */
export const BioRoute: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/bio',
        query: {}
      }
    },
  },
  name: 'Bio Route',
};

/**
 * Route with query parameters
 */
export const RouteWithQueryParams: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/experience',
        query: {
          filter: 'projects',
          sort: 'recent'
        }
      }
    },
  },
  name: 'Route With Query Parameters',
}; 