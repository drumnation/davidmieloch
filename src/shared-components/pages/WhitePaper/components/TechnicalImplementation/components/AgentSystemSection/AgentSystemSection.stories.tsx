import type { Meta, StoryObj } from '@storybook/react';
import { AgentSystemSection } from './AgentSystemSection';
import { defaultContent } from '../../TechnicalImplementation.constants';

const meta = {
  title: 'Pages/01-WhitePaper/04-TechnicalImplementation/03-AgentSystemSection',
  component: AgentSystemSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AgentSystemSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    agentSystem: defaultContent.agentSystem,
    agentSystemDiagram: defaultContent.agentSystemDiagram
  },
}; 