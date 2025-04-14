import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeaturedMedia } from './FeaturedMedia';

const meta = {
  title: 'Pages/03-Bio/Sections/Featured Media',
  component: FeaturedMedia,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedMedia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 