import type { Meta, StoryObj } from '@storybook/react';
import { AiIntegrationProcessDiagram } from './AiIntegrationProcessDiagram';

const meta = {
  title: 'Diagrams/AiIntegrationProcessDiagram',
  component: AiIntegrationProcessDiagram,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A diagram showing the AI integration process flow using React Flow.'
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AiIntegrationProcessDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'AI Integration Process Flow',
    description: 'The following diagram illustrates the ideal process flow for integrating AI into development workflows',
    width: '100%',
    height: '800px',
    showZoomControls: true,
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
    backgroundColor: '#1a1a1a',
  },
};

export const ForestTheme: Story = {
  args: {
    ...Default.args,
    theme: 'forest',
  },
};

export const NeutralTheme: Story = {
  args: {
    ...Default.args,
    theme: 'neutral',
  },
};

export const NoZoomControls: Story = {
  args: {
    ...Default.args,
    showZoomControls: false,
  },
};

export const CustomTitle: Story = {
  args: {
    ...Default.args,
    title: 'Custom AI Integration Flow',
    description: 'A custom implementation of the AI integration process',
  },
}; 