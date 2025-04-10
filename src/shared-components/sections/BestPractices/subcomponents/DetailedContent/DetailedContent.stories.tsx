import type { Meta, StoryObj } from '@storybook/react';
import { DetailedContent } from './DetailedContent';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta = {
  title: 'Pages/02-BestPractices/01-DetailedContent',
  component: DetailedContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The detailed content section of the BestPractices page, with comprehensive text about modern development practices.'
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
} satisfies Meta<typeof DetailedContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the DetailedContent component with its text content.
 */
export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the DetailedContent component.
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
        story: 'DetailedContent as viewed on desktop devices. Shows the complete layout with optimal spacing and typography.',
      },
    },
  },
};

/**
 * Mobile view of the DetailedContent component.
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
        story: 'DetailedContent as viewed on mobile devices. Text formatting and spacing adjust to maintain readability on smaller screens.',
      },
    },
  },
};

/**
 * Tablet view of the DetailedContent component.
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
        story: 'DetailedContent as viewed on tablet devices. Shows the responsive behavior between mobile and desktop sizes.',
      },
    },
  },
}; 