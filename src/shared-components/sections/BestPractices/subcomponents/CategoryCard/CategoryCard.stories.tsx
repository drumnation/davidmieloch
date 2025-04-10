import type { Meta, StoryObj } from '@storybook/react';
import { CategoryCard } from './CategoryCard';
import { PRACTICE_CATEGORIES } from '../../BestPractices.constants';
import { renderCategory } from '../../BestPractices.logic';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

// Get the first category for demo purposes
const category = renderCategory(PRACTICE_CATEGORIES[0], 0);

const meta = {
  title: 'Pages/02-BestPractices/04-CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A card component displaying a category of development practices with title, description, and list items.'
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
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the CategoryCard component with a sample category.
 */
export const Default: Story = {
  args: {
    title: category.title,
    description: category.description,
    items: category.items,
  },
};

/**
 * Desktop view of the CategoryCard component.
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
        story: 'CategoryCard as viewed on desktop devices. Shows optimal card layout with proper spacing and typography.',
      },
    },
  },
};

/**
 * Mobile view of the CategoryCard component.
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
        story: 'CategoryCard as viewed on mobile devices. Card adapts to smaller screens with adjusted padding and typography.',
      },
    },
  },
};

/**
 * Tablet view of the CategoryCard component.
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
        story: 'CategoryCard as viewed on tablet devices. Shows the responsive behavior between mobile and desktop sizes.',
      },
    },
  },
}; 