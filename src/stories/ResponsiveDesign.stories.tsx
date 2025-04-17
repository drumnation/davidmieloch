import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import RootLayout from '../../app/layout';
import HomePage from '../../app/page';

/**
 * This story focuses specifically on responsive design patterns.
 * It demonstrates how the application adapts to different screen sizes
 * with detailed viewport information.
 */
const meta = {
  title: '00-App/ResponsiveDesign',
  component: RootLayout,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {}
      }
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        // Custom viewport sizes
        smallMobile: {
          name: 'Small Mobile',
          styles: {
            width: '320px',
            height: '568px',
          },
          type: 'mobile',
        },
        largeMobile: {
          name: 'Large Mobile',
          styles: {
            width: '428px',
            height: '926px',
          },
          type: 'mobile',
        },
        smallTablet: {
          name: 'Small Tablet',
          styles: {
            width: '744px',
            height: '1133px',
          },
          type: 'tablet',
        },
        largeTablet: {
          name: 'Large Tablet',
          styles: {
            width: '1024px',
            height: '1366px',
          },
          type: 'tablet',
        },
        smallDesktop: {
          name: 'Small Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
          type: 'desktop',
        },
        largeDesktop: {
          name: 'Large Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
          type: 'desktop',
        },
      },
    },
    docs: {
      description: {
        component: 'Demonstrates responsive design patterns across various device sizes.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RootLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Small Mobile View (320px width)
 */
export const SmallMobile: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'smallMobile',
    },
  },
  name: 'Small Mobile (320px)',
};

/**
 * Standard Mobile View (iPhone X - 375px width)
 */
export const StandardMobile: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
  name: 'Standard Mobile (iPhone X - 375px)',
};

/**
 * Large Mobile View (428px width)
 */
export const LargeMobile: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'largeMobile',
    },
  },
  name: 'Large Mobile (428px)',
};

/**
 * Small Tablet View (744px width)
 */
export const SmallTablet: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'smallTablet',
    },
  },
  name: 'Small Tablet (744px)',
};

/**
 * Standard Tablet View (iPad - 768px width)
 */
export const StandardTablet: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  name: 'Standard Tablet (iPad - 768px)',
};

/**
 * Large Tablet View (1024px width)
 */
export const LargeTablet: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'largeTablet',
    },
  },
  name: 'Large Tablet (1024px)',
};

/**
 * Small Desktop View (1280px width)
 */
export const SmallDesktop: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'smallDesktop',
    },
  },
  name: 'Small Desktop (1280px)',
};

/**
 * Large Desktop View (1920px width)
 */
export const LargeDesktop: Story = {
  args: {
    children: <HomePage />
  },
  parameters: {
    viewport: {
      defaultViewport: 'largeDesktop',
    },
  },
  name: 'Large Desktop (1920px)',
}; 