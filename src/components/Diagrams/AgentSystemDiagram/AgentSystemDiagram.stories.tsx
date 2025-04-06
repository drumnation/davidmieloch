import React from 'react';
import { AgentSystemDiagram } from './AgentSystemDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the AgentSystemDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/AgentSystemDiagram',
  component: AgentSystemDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the agent system workflow from Task to Integration through Analysis, Planning, Distribution, and Results.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AgentSystemDiagram>;

export default meta;
type Story = StoryObj<typeof AgentSystemDiagram>;

/**
 * Default display showing the Agent System Diagram in its actual page context.
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
 * Agent System Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '700px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Agent System Diagram with forest theme, no page context
 */
export const ForestTheme: Story = {
  args: {
    width: '100%',
    height: '700px',
    showZoomControls: true,
    theme: 'forest',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Agent System Diagram with neutral theme, no page context
 */
export const NeutralTheme: Story = {
  args: {
    width: '100%',
    height: '700px',
    showZoomControls: true,
    theme: 'neutral',
  },
  parameters: {
    pageStructure: 'none',
  },
}; 