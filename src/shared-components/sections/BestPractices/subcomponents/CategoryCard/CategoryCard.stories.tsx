import type { Meta, StoryObj } from '@storybook/react';
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

/**
 * The default story shows the CategoryCard component with a sample category.
 */
export const Default: Story = {
  args: {
    title: renderedCategory.title,
    description: renderedCategory.description,
    items: renderedCategory.items,
  },
}; 