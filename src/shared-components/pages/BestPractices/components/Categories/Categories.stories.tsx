import type { Meta, StoryObj } from '@storybook/react';
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

/**
 * The default story shows the Categories component with sample categories.
 */
export const Default: Story = {
  args: {
    categories,
  },
}; 