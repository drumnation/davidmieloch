import type { Meta, StoryObj } from '@storybook/react';
import { Categories } from './Categories';
import { PRACTICE_CATEGORIES } from '../../BestPractices.constants';
import { renderCategory } from '../../BestPractices.logic';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';
import { Category } from './Categories.types';
import { PracticeCategory } from '../../BestPractices.types';

// Convert PracticeCategory to Category using the renderCategory function
const categoriesWithKeys = PRACTICE_CATEGORIES.map((category, index) => 
  renderCategory(category, index)
);

const meta = {
  title: 'Pages/02-BestPractices/02-Categories',
  component: Categories,
  parameters: {
    layout: 'fullscreen',
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
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the Categories component with practice categories.
 */
export const Default: Story = {
  args: {
    categories: categoriesWithKeys,
  },
};

/**
 * Desktop view of the Categories component.
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
        story: 'Categories as viewed on desktop devices. Shows the multi-column grid layout with optimal spacing.',
      },
    },
  },
};

/**
 * Mobile view of the Categories component.
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
        story: 'Categories as viewed on mobile devices. The grid layout adjusts to a single column for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet view of the Categories component.
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
        story: 'Categories as viewed on tablet devices. Shows the responsive grid behavior between mobile and desktop sizes.',
      },
    },
  },
}; 