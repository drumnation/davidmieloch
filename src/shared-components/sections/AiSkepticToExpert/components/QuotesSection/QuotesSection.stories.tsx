import type { Meta, StoryObj } from '@storybook/react';
import { QuoteGrid } from '../../../../organisms/QuoteGrid';
import { defaultContent } from '../../AiSkepticToExpert.constants';
import { ReactElement } from 'react';
import { IconBrandLinkedin, IconMessage } from '@tabler/icons-react';

// Create a simple component to display the QuoteGrid
const QuotesSection = () => {
  // Transform quotes to match the expected interface
  const transformedQuotes = defaultContent.quotes.quotes.map(quote => ({
    author: quote.author,
    text: quote.text,
    note: quote.note,
    icon: quote.icon === 'linkedin' 
      ? <IconBrandLinkedin size={20} /> as ReactElement 
      : <IconMessage size={20} /> as ReactElement
  }));

  return (
    <div style={{ 
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '40px 20px',
      background: '#f5f5f5',
      borderRadius: '8px'
    }}>
      <QuoteGrid 
        quotes={transformedQuotes}
        layout={defaultContent.quotes.layout || '3-column'}
        className={defaultContent.quotes.className || ''}
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/01-AiSkepticToExpert/02-QuotesSection',
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