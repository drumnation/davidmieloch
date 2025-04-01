import React from 'react';
import { BrainGardenComponentsDiagram } from './BrainGardenComponentsDiagram';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Diagrams/BrainGardenComponentsDiagram',
  component: BrainGardenComponentsDiagram,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof BrainGardenComponentsDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
  },
};
