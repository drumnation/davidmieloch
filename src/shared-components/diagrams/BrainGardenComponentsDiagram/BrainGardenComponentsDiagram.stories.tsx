import React from 'react';
import { BrainGardenComponentsDiagram } from './BrainGardenComponentsDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the BrainGardenComponentsDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/BrainGardenComponentsDiagram',
  component: BrainGardenComponentsDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the core components of the Brain Garden system.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BrainGardenComponentsDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display showing the Brain Garden Components Diagram in its actual page context.
 * This matches how the diagram appears in the Brain Garden Overview section.
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '500px',
    showZoomControls: false,
    backgroundColor: 'transparent',
  },
  parameters: {
    pageStructure: 'garden',
  },
};

/**
 * Brain Garden Components Diagram with light blue background, no page context
 */
export const WithLightBlueBackground: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    backgroundColor: 'rgba(74, 158, 255, 0.05)',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Brain Garden Components Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    pageStructure: 'none',
  },
};
