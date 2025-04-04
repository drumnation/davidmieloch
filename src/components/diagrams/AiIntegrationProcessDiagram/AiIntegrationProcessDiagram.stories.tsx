import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DiagramEditor from '../DiagramEditor';
import { AiIntegrationProcessDiagram, nodes, edges } from '.';

/**
 * Storybook configuration for the AiIntegrationProcessDiagram component.
 * This diagram illustrates the process flow for integrating AI into development workflows.
 */

// Using the exact app dimensions (898x798) to ensure consistency with the actual app
const APP_DIAGRAM_DIMENSIONS = {
  width: '898px',
  height: '798px',
};

// This ensures all diagrams show the edit controls in Storybook only
const meta: Meta<typeof AiIntegrationProcessDiagram> = {
  title: 'Diagrams/AI Integration Process',
  component: AiIntegrationProcessDiagram,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component: 'Interactive diagram showing the AI integration process flow. Includes controls for editing and capturing node positions in Storybook environment only.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    ...APP_DIAGRAM_DIMENSIONS,
    showZoomControls: true, // Always enable in Storybook
    initialZoom: 0.65,
  },
};

export default meta;
type Story = StoryObj<typeof AiIntegrationProcessDiagram>;

/**
 * Default display showing the AI Integration Process Flow diagram
 * Uses the exact app dimensions (898x798) to ensure consistency with the actual app
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '100%',
    isStorybook: true
  },
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Compact view of the diagram with a smaller size but maintaining proportions
 */
export const CompactView: Story = {
  args: {
    title: 'AI Integration Process (Compact)',
    width: '700px',
    height: '620px',
    initialZoom: 0.45,
  },
};

/**
 * Diagram view without editing controls, as it would appear in production
 */
export const WithoutControls: Story = {
  args: {
    showZoomControls: false,
    title: 'AI Integration Process (View Only)',
  },
};

export const WithCustomDimensions: Story = {
  args: {
    width: '800px',
    height: '700px',
    isStorybook: true
  },
}; 