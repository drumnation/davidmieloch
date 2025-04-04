import React from 'react';
import { SystemOverviewDiagram } from './SystemOverviewDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the SystemOverviewDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/SystemOverviewDiagram',
  component: SystemOverviewDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the Brain Garden system architecture with main components and their relationships.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SystemOverviewDiagram>;

export default meta;
type Story = StoryObj<typeof SystemOverviewDiagram>;

/**
 * Default display showing the System Overview Diagram in its actual page context.
 * This matches how the diagram appears in the Technical Implementation section.
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: false,
    theme: 'default',
  },
  parameters: {
    pageStructure: 'technical',
  },
};

/**
 * System Overview Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * System Overview Diagram with forest theme, no page context
 */
export const ForestTheme: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: true,
    theme: 'forest',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * System Overview Diagram with neutral theme, no page context
 */
export const NeutralTheme: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: true,
    theme: 'neutral',
  },
  parameters: {
    pageStructure: 'none',
  },
}; 