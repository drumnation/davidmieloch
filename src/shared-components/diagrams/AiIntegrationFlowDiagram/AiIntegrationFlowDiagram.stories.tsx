import React from 'react';
import { AiIntegrationFlowDiagram } from './AiIntegrationFlowDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the AiIntegrationFlowDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/AiIntegrationFlowDiagram',
  component: AiIntegrationFlowDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the AI integration process from workflow assessment to continuous improvement.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AiIntegrationFlowDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display showing the AI Integration Flow Diagram in its actual page context.
 * This matches how the diagram appears in the AI Integration Process section.
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '800px',
    showZoomControls: false,
  },
  parameters: {
    pageStructure: 'integration',
  },
};

/**
 * AI Integration Flow Diagram with light blue background, no page context
 */
export const WithLightBlueBackground: Story = {
  args: {
    width: '100%',
    height: '800px',
    showZoomControls: true,
    backgroundColor: 'rgba(74, 158, 255, 0.05)',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * AI Integration Flow Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '800px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    pageStructure: 'none',
  },
}; 