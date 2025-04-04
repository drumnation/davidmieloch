import React from 'react';
import { KnowledgeSystemDiagram } from './KnowledgeSystemDiagram';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Storybook configuration for the KnowledgeSystemDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/KnowledgeSystemDiagram',
  component: KnowledgeSystemDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the knowledge system flow from Developer Action to Team Benefits.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KnowledgeSystemDiagram>;

export default meta;
type Story = StoryObj<typeof KnowledgeSystemDiagram>;

/**
 * Default display showing the Knowledge System Diagram in its actual page context.
 * This matches how the diagram appears in the Technical Implementation section.
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '300px',
    showZoomControls: false,
    theme: 'default',
  },
  parameters: {
    pageStructure: 'technical',
  },
};

/**
 * Knowledge System Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '300px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Knowledge System Diagram with forest theme, no page context
 */
export const ForestTheme: Story = {
  args: {
    width: '100%',
    height: '300px',
    showZoomControls: true,
    theme: 'forest',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Knowledge System Diagram with neutral theme, no page context
 */
export const NeutralTheme: Story = {
  args: {
    width: '100%',
    height: '300px',
    showZoomControls: true,
    theme: 'neutral',
  },
  parameters: {
    pageStructure: 'none',
  },
}; 