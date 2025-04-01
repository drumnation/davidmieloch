import React from 'react';
import { BrainGardenComponentsDiagram } from './BrainGardenComponentsDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the BrainGardenComponentsDiagram component
 * 
 * For the most realistic preview, select "Brain Garden Overview" in the Page Structure toolbar option.
 * This will display the diagram in a context similar to where it's actually used in the application.
 */
const meta = {
  title: 'Diagrams/BrainGardenComponentsDiagram',
  component: BrainGardenComponentsDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the core components of the Brain Garden system. To see how this diagram looks in its actual page context, select "Brain Garden Overview" from the Page Structure toolbar option.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BrainGardenComponentsDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display of the Brain Garden Components Diagram
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
  },
};

/**
 * Brain Garden Components Diagram with light blue background
 */
export const WithLightBlueBackground: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    backgroundColor: 'rgba(74, 158, 255, 0.05)',
  },
};

/**
 * Brain Garden Components Diagram with dark theme
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
 * Brain Garden Components Diagram displayed in its actual page context.
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
    // This story always uses the brain garden page structure
    pageStructure: 'garden',
  },
};
