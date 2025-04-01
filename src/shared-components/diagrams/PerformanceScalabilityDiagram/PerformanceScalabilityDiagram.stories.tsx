import React from 'react';
import { PerformanceScalabilityDiagram } from './PerformanceScalabilityDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the PerformanceScalabilityDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/PerformanceScalabilityDiagram',
  component: PerformanceScalabilityDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the performance and scalability strategies including Distribution, Caching, and Optimization approaches.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PerformanceScalabilityDiagram>;

export default meta;
type Story = StoryObj<typeof PerformanceScalabilityDiagram>;

/**
 * Default display showing the Performance & Scalability Diagram in its actual page context.
 * This matches how the diagram appears in the Technical Implementation section.
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '500px',
    showZoomControls: false,
    theme: 'default',
  },
  parameters: {
    pageStructure: 'technical',
  },
};

/**
 * Performance & Scalability Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '500px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Performance & Scalability Diagram with forest theme, no page context
 */
export const ForestTheme: Story = {
  args: {
    width: '100%',
    height: '500px',
    showZoomControls: true,
    theme: 'forest',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Performance & Scalability Diagram with neutral theme, no page context
 */
export const NeutralTheme: Story = {
  args: {
    width: '100%',
    height: '500px',
    showZoomControls: true,
    theme: 'neutral',
  },
  parameters: {
    pageStructure: 'none',
  },
}; 