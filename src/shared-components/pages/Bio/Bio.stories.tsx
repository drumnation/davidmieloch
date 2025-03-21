import type { Meta, StoryObj } from '@storybook/react';
import { BioPage } from './Bio';

const meta = {
  title: 'Pages/03-Bio',
  component: BioPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BioPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete Bio page with all sections.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    id: 'bio',
  },
}; 