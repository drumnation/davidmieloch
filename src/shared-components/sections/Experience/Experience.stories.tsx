import type { Meta, StoryObj } from '@storybook/react';
import { Experience } from './Experience';

const meta = {
  title: 'Sections/Experience',
  component: Experience,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'experience',
    className: '',
  },
}; 