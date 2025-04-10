import type { Meta, StoryObj } from '@storybook/react';
import { Conclusion } from './Conclusion';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta = {
  title: 'Pages/02-BestPractices/03-Conclusion',
  component: Conclusion,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The conclusion section of the BestPractices page, summarizing key points and future directions.'
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
} satisfies Meta<typeof Conclusion>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the Conclusion component.
 */
export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the Conclusion component.
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
        story: 'Conclusion as viewed on desktop devices. Shows optimal layout with full width content and appropriate spacing.',
      },
    },
  },
};

/**
 * Mobile view of the Conclusion component.
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
        story: 'Conclusion as viewed on mobile devices. Text and spacing adjust for better readability on smaller screens.',
      },
    },
  },
};

/**
 * Tablet view of the Conclusion component.
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
        story: 'Conclusion as viewed on tablet devices. Shows the responsive behavior between mobile and desktop sizes.',
      },
    },
  },
}; 