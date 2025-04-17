import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Conclusion } from './Conclusion';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta = {
  title: 'Pages/02-BestPractices/03-Conclusion',
  component: Conclusion,
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
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
 * The default story shows the Conclusion component with its text content.
 */
export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the Conclusion component.
 */
export const Desktop: Story = {
  args: {},
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the Conclusion component.
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
 * Tablet view of the Conclusion component.
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