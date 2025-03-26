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