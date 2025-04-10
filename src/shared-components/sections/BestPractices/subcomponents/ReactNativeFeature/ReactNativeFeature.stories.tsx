import type { Meta, StoryObj } from '@storybook/react';
import { ReactNativeFeature } from './ReactNativeFeature';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta = {
  title: 'Pages/02-BestPractices/03-ReactNativeFeature',
  component: ReactNativeFeature,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The React Native feature section highlights Expo and React Native capabilities within the BestPractices page.'
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ReactNativeFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the ReactNativeFeature component.
 */
export const Default: Story = {
  args: {
    isVisible: true,
  },
};

/**
 * Desktop view of the ReactNativeFeature component.
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
        story: 'ReactNativeFeature as viewed on desktop devices. Shows the full-width layout with optimal spacing and content presentation.',
      },
    },
  },
};

/**
 * Mobile view of the ReactNativeFeature component.
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
        story: 'ReactNativeFeature as viewed on mobile devices. Layout adapts to single column with adjusted spacing and typography for mobile screens.',
      },
    },
  },
};

/**
 * Tablet view of the ReactNativeFeature component.
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
        story: 'ReactNativeFeature as viewed on tablet devices. Shows the responsive behavior between mobile and desktop layouts.',
      },
    },
  },
};

/**
 * This story shows the ReactNativeFeature component with custom content.
 */
export const CustomContent: Story = {
  args: {
    isVisible: true,
    title: "Custom React Native Section",
    description: "A custom description for the React Native & Expo feature section.",
    items: [
      { text: "Custom feature item 1" },
      { text: "Custom feature item 2" },
      { text: "Custom feature item 3" },
      { text: "Custom feature item 4" },
    ]
  },
}; 