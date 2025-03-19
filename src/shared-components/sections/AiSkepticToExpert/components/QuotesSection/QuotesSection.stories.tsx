import type { Meta, StoryObj } from '@storybook/react';
import { QuoteGrid } from '../../../../organisms/QuoteGrid';
import { defaultContent } from '../../AiSkepticToExpert.constants';

// Create a simple component to display the QuoteGrid
const QuotesSection = () => {
  return (
    <div style={{ 
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '40px 20px',
      background: '#f5f5f5',
      borderRadius: '8px'
    }}>
      <QuoteGrid 
        quotes={defaultContent.quotes.quotes}
        variant={defaultContent.quotes.variant || 'gradient'}
        columns={defaultContent.quotes.columns || 2}
      />
    </div>
  );
};

const meta = {
  title: 'Sections/01-AiSkepticToExpert/02-QuotesSection',
  component: QuotesSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof QuotesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 