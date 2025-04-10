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

export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Mobile viewport version of the SystemArchitectureSection component to test responsive behavior at mobile sizes.',
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet viewport version of the SystemArchitectureSection component to test responsive behavior at tablet sizes.',
      },
    },
  },
}; 