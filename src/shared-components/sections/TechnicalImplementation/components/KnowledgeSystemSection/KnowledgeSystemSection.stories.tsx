import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeSystemSection } from './KnowledgeSystemSection';
import { defaultContent } from '../../TechnicalImplementation.constants';

const meta = {
  title: 'Sections/04-TechnicalImplementation/02-KnowledgeSystemSection',
  component: KnowledgeSystemSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KnowledgeSystemSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    knowledgeSystem: defaultContent.knowledgeSystem,
    knowledgeFlowDiagram: defaultContent.knowledgeFlowDiagram
  },
}; 