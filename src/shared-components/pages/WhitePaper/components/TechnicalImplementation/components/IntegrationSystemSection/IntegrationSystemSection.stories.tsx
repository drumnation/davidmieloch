import type { Meta, StoryObj } from '@storybook/react';
import { IntegrationSystemSection } from './IntegrationSystemSection';
import { defaultContent } from '../../TechnicalImplementation.constants';

const meta = {
  title: 'Pages/01-WhitePaper/04-TechnicalImplementation/04-IntegrationSystemSection',
  component: IntegrationSystemSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IntegrationSystemSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    integrationSystem: defaultContent.integrationSystem,
    integrationSystemDiagram: defaultContent.integrationSystemDiagram
  },
}; 