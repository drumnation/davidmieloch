import React from 'react';
import { GardenMetaphorDiagram } from './GardenMetaphorDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the GardenMetaphorDiagram component
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
  },
} satisfies Meta<typeof GardenMetaphorDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display of the Garden Metaphor Diagram with transparent background
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
  },
};

/**
 * Garden Metaphor Diagram with white background
 */
export const WithWhiteBackground: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    backgroundColor: '#ffffff',
  },
};

/**
 * Garden Metaphor Diagram with dark theme
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
  },
}; 