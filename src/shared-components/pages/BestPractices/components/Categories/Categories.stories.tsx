import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Categories } from './Categories';
import { PRACTICE_CATEGORIES } from '../../BestPractices.constants';
import { renderCategory } from '../../BestPractices.logic';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

// Use the same data and logic as the main component
const categories = PRACTICE_CATEGORIES.map((category, index) => 
  renderCategory(category, index)
);

const meta = {
  title: 'Pages/02-BestPractices/02-Categories',
  component: Categories,
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'The categories section of the BestPractices page, displaying various development practice categories.'
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
} satisfies Meta<typeof Categories>;

export default meta;
type Story = StoryObj<typeof Categories>;

const defaultArgs = {
  categories,
};

/**
 * Desktop view of the Categories component.
 */
export const Desktop: Story = {
  args: defaultArgs,
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the Categories component.
 */
export const Mobile: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the Categories component.
 */
export const Tablet: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 