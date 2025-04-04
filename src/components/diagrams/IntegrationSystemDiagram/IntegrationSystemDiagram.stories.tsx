import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IntegrationSystemDiagram } from './IntegrationSystemDiagram';

/**
 * Storybook configuration for the IntegrationSystemDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta: Meta<typeof IntegrationSystemDiagram> = {
  title: 'Diagrams/IntegrationSystemDiagram',
  component: IntegrationSystemDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the integration system structure with connections to Git, IDE, and CI/CD integrations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      options: ['default', 'dark', 'forest', 'neutral'],
      control: { type: 'select' },
    },
  },
};

export default meta;

// Define the story type
type Story = StoryObj<typeof IntegrationSystemDiagram>;

/**
 * Default display showing the Integration System Diagram in its actual page context.
 * This matches how the diagram appears in the Technical Implementation section.
 */
export const Default: Story = {
  args: {
    title: 'Integration System',
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
 * Integration System Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    title: 'Integration System',
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Integration System Diagram with forest theme, no page context
 */
export const ForestTheme: Story = {
  args: {
    title: 'Integration System',
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'forest',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Integration System Diagram with neutral theme, no page context
 */
export const NeutralTheme: Story = {
  args: {
    title: 'Integration System',
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'neutral',
  },
  parameters: {
    pageStructure: 'none',
  },
}; 