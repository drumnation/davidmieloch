import React from 'react';
import { AiIntegrationFlowDiagram } from './AiIntegrationFlowDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the AiIntegrationFlowDiagram component
 * 
 * For the most realistic preview, select "AI Integration Process" in the Page Structure toolbar option.
 * This will display the diagram in a context similar to where it's actually used in the application.
 */
const meta = {
  title: 'Diagrams/AiIntegrationFlowDiagram',
  component: AiIntegrationFlowDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the AI integration process from workflow assessment to continuous improvement. To see how this diagram looks in its actual page context, select "AI Integration Process" from the Page Structure toolbar option.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AiIntegrationFlowDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display of the AI Integration Flow Diagram
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '800px',
    showZoomControls: true,
  },
};

/**
 * AI Integration Flow Diagram with light blue background
 */
export const WithLightBlueBackground: Story = {
  args: {
    width: '100%',
    height: '800px',
    showZoomControls: true,
    backgroundColor: 'rgba(74, 158, 255, 0.05)',
  },
};

/**
 * AI Integration Flow Diagram with dark theme
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
  },
};

/**
 * AI Integration Flow Diagram displayed in its actual page context.
 * This matches how the diagram appears in the AI Integration Process section.
 */
export const InPageContext: Story = {
  args: {
    width: '100%',
    height: '800px',
    showZoomControls: false,
  },
  parameters: {
    // This story always uses the AI integration page structure
    pageStructure: 'integration',
  },
}; 