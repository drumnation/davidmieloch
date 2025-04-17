import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { DetailedContent } from './DetailedContent';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta = {
  title: 'Pages/02-BestPractices/01-DetailedContent',
  component: DetailedContent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
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
  args: {},
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the DetailedContent component.
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
 * Tablet view of the DetailedContent component.
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