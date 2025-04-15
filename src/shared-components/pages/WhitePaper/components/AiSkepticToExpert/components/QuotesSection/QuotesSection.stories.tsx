import type { Meta, StoryObj } from '@storybook/react';
import { QuotesSection } from './QuotesSection';
import { defaultContent } from '../../AiSkepticToExpert.constants';
import { enhanceQuotesProps } from '../../AiSkepticToExpert.logic';

const meta = {
  title: 'Pages/01-WhitePaper/01-AiSkepticToExpert/02-QuotesSection',
  component: QuotesSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    quotesProps: enhanceQuotesProps(defaultContent.quotes)
  }
} satisfies Meta<typeof QuotesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoColumnLayout: Story = {
  args: {
    quotesProps: enhanceQuotesProps({
      ...defaultContent.quotes,
      layout: '2-column'
    })
  }
}; 