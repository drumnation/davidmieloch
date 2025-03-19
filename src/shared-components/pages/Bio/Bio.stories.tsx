import type { Meta, StoryObj } from '@storybook/react';
import { Bio } from '../../sections/Bio';

const meta = {
  title: 'Pages/03-Bio',
  component: Bio,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Bio>;

export default meta;
type Story = StoryObj<typeof Bio>;

export const Default: Story = {
  args: {
    id: 'bio',
  },
}; 