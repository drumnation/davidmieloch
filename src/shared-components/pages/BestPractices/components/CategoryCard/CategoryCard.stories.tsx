import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CategoryCard } from './CategoryCard';
import { PRACTICE_CATEGORIES } from '../../BestPractices.constants';
import { renderCategory } from '../../BestPractices.logic';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

// Use the same data and rendering logic as the main component
const renderedCategory = renderCategory(PRACTICE_CATEGORIES[0], 0);

const meta = {
  title: 'Pages/02-BestPractices/04-CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A card component that displays a development practice category with its items and descriptions.'
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: renderedCategory.title,
  description: renderedCategory.description,
  items: renderedCategory.items,
};

/**
 * Desktop view of the CategoryCard component.
 */
export const Desktop: Story = {
  args: defaultArgs,
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the CategoryCard component.
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
 * Tablet view of the CategoryCard component.
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