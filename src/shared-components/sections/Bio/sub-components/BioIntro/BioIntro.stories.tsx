import type { Meta, StoryObj } from '@storybook/react';
import { BioIntro } from './BioIntro';

const meta = {
  title: 'Pages/03-Bio/Sections/Introduction',
  component: BioIntro,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof BioIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 