import type { Meta, StoryObj } from '@storybook/react';
import { AiIntegrationFlowDiagram } from './AiIntegrationFlowDiagram';

const meta = {
  title: 'Diagrams/AiIntegrationFlowDiagram',
  component: AiIntegrationFlowDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      autodocs: false
    }
  },
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