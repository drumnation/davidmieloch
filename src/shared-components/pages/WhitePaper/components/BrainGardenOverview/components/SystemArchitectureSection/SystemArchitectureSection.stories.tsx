import type { Meta, StoryObj } from '@storybook/react';
import { SystemArchitectureSection } from './SystemArchitectureSection';
import { defaultContent } from '../../BrainGardenOverview.constants';

const meta = {
  title: 'Pages/01-WhitePaper/03-BrainGardenOverview/05-SystemArchitectureSection',
  component: SystemArchitectureSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SystemArchitectureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    systemArchitectureProps: defaultContent.systemArchitecture
  },
}; 