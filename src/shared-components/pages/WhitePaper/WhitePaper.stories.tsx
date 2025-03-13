import type { Meta, StoryObj } from '@storybook/react';
import { WhitePaper } from './WhitePaper';

const meta = {
  title: 'Pages/WhitePaper',
  component: WhitePaper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main WhitePaper page that combines all sections into a complete document.'
      }
    }
  },
} satisfies Meta<typeof WhitePaper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete WhitePaper with all sections.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {}
};