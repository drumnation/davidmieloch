import type { Meta, StoryObj } from '@storybook/react';
import { ReactFlowDiagram } from './ReactFlowDiagram';

const meta = {
  title: 'Molecules/ReactFlowDiagram',
  component: ReactFlowDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A React Flow component for rendering interactive diagrams with various node types and styling options.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReactFlowDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: true,
    accessibilityDescription: 'Demo diagram showing different node types with icons',
  },
};

export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: true,
    theme: 'dark',
    accessibilityDescription: 'Demo diagram with dark theme',
  },
};

export const ForestTheme: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: true,
    theme: 'forest',
    accessibilityDescription: 'Demo diagram with forest theme',
  },
};

export const NeutralTheme: Story = {
  args: {
    width: '100%',
    height: '400px',
    showZoomControls: true,
    theme: 'neutral',
    accessibilityDescription: 'Demo diagram with neutral theme',
  },
};

// This story is for debugging purposes only
export const DebugReactSpringIssue: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    showBackground: true,
    theme: 'default',
    accessibilityDescription: 'Debugging diagram to help isolate React Spring maximum call stack issues',
    definition: {
      nodes: [
        {
          id: 'node-1',
          type: 'default',
          position: { x: 100, y: 100 },
          data: { label: 'Node 1' },
        },
        {
          id: 'node-2',
          type: 'default',
          position: { x: 300, y: 100 },
          data: { label: 'Node 2' },
        },
        {
          id: 'node-3',
          type: 'default',
          position: { x: 200, y: 250 },
          data: { label: 'Node 3' },
        },
      ],
      edges: [
        { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
        { id: 'edge-1-3', source: 'node-1', target: 'node-3' },
        { id: 'edge-2-3', source: 'node-2', target: 'node-3' },
      ],
    },
  },
}; 