import React from 'react';
import { GardenMetaphorDiagram } from './GardenMetaphorDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the GardenMetaphorDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/GardenMetaphorDiagram',
  component: GardenMetaphorDiagram,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light-green',
      values: [
        { name: 'light-green', value: '#f0fff4' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    docs: {
      description: {
        component: 'A diagram showing the three phases of a Brain Garden project\'s growth - from initial setup to self-improving system.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GardenMetaphorDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display showing the Garden Metaphor Diagram in its actual page context.
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
    backgrounds: { default: 'light-green' },
    pageStructure: 'garden',
  },
};

/**
 * Garden Metaphor Diagram with white background, no page context
 */
export const WithWhiteBackground: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    backgroundColor: '#ffffff',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Garden Metaphor Diagram with dark theme, no page context
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