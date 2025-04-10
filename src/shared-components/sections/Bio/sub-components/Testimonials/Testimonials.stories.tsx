import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Testimonials from './Testimonials';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta: Meta<typeof Testimonials> = {
  title: 'Pages/Bio/Sections/Testimonials',
  component: Testimonials,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ margin: '2rem', maxWidth: '1200px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A testimonials section that showcases feedback from different professional categories. Features responsive design for optimal viewing on all devices.'
      }
    }
  },
};

export default meta;

type Story = StoryObj<typeof Testimonials>;

/**
 * The default story shows the Testimonials component without specifying a viewport.
 */
export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the Testimonials section
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
        story: 'Testimonials section as viewed on desktop devices. Shows the optimal layout for large screens with multi-column arrangement of testimonial cards.'
      },
    },
  },
};

/**
 * Mobile view of the Testimonials section
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
        story: 'Testimonials section as viewed on mobile devices. Notice how the testimonial cards stack vertically and maintain readability on smaller screens. Category headers and icons are properly sized for mobile viewing. Animation timing is optimized for mobile performance.'
      },
    },
  },
};

/**
 * Tablet view of the Testimonials section
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
        story: 'Testimonials section as viewed on tablet devices. This view shows how the layout adapts to medium-sized screens, with an intermediate number of columns compared to mobile and desktop.'
      },
    },
  },
}; 