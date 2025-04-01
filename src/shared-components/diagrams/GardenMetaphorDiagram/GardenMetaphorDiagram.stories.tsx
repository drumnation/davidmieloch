import React from 'react';
import { GardenMetaphorDiagram } from './GardenMetaphorDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the GardenMetaphorDiagram component
 * 
 * For the most realistic preview, select "Brain Garden Overview" in the Page Structure toolbar option.
 * This will display the diagram in a context similar to where it's actually used in the application.
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
        component: 'A diagram showing the three phases of a Brain Garden project\'s growth - from initial setup to self-improving system. To see how this diagram looks in its actual page context, select "Brain Garden Overview" from the Page Structure toolbar option.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GardenMetaphorDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display of the Garden Metaphor Diagram with transparent background.
 * For the most realistic preview, select "Brain Garden Overview" in the Page Structure toolbar.
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
  },
  parameters: {
    backgrounds: { default: 'light-green' },
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

/**
 * Garden Metaphor Diagram displayed in its actual page context.
 * This matches how the diagram appears in the Brain Garden Overview section.
 */
export const InPageContext: Story = {
  args: {
    width: '100%',
    height: '500px',
    showZoomControls: false,
    backgroundColor: 'transparent',
  },
  parameters: {
    backgrounds: { default: 'light-green' },
    // This story always uses the brain garden page structure
    pageStructure: 'garden',
  },
}; 