import type { Meta, StoryObj } from '@storybook/react';
import { AiIntegrationFlowDiagram, AIIntegrationFlowDiagramProps } from './AiIntegrationFlowDiagram';
import { ComponentProps } from 'react';

const meta = {
  title: 'Components/Diagrams/AiIntegrationFlowDiagram',
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
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args: ComponentProps<typeof AiIntegrationFlowDiagram>) => <AiIntegrationFlowDiagram {...args} />,
} as Meta<typeof AiIntegrationFlowDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
  },
  render: (args: ComponentProps<typeof AiIntegrationFlowDiagram>) => <AiIntegrationFlowDiagram {...args} />,
};

export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'dark',
  },
  render: (args: ComponentProps<typeof AiIntegrationFlowDiagram>) => <AiIntegrationFlowDiagram {...args} />,
};

export const ForestTheme: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'forest',
  },
  render: (args: ComponentProps<typeof AiIntegrationFlowDiagram>) => <AiIntegrationFlowDiagram {...args} />,
};

export const CustomSized: Story = {
  args: {
    width: '800px',
    height: '600px',
    showZoomControls: true,
  },
  render: (args: ComponentProps<typeof AiIntegrationFlowDiagram>) => <AiIntegrationFlowDiagram {...args} />,
};