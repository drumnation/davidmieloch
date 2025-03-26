import type { Meta, StoryObj } from '@storybook/react';
import { AiIntegrationFlowDiagram } from './AiIntegrationFlowDiagram';

const meta = {
  title: 'Diagrams/AiIntegrationFlowDiagram',
  component: AiIntegrationFlowDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flow diagram illustrating the AI integration process flow for development workflows'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AiIntegrationFlowDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
    height: '700px',
    showZoomControls: true,
  },
};

export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '700px',
    showZoomControls: true,
    theme: 'dark',
  },
};

export const ForestTheme: Story = {
  args: {
    width: '100%',
    height: '700px',
    showZoomControls: true,
    theme: 'forest',
  },
};

export const CustomSized: Story = {
  args: {
    width: '800px',
    height: '600px',
    showZoomControls: true,
  },
}; 