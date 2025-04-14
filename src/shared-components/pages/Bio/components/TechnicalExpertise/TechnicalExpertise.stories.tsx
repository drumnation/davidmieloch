import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TechnicalExpertise } from './TechnicalExpertise';

const meta = {
  title: 'Pages/03-Bio/Sections/Technical Expertise',
  component: TechnicalExpertise,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TechnicalExpertise>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 