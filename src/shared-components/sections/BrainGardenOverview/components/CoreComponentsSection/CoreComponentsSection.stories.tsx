import type { Meta, StoryObj } from '@storybook/react';
import { CoreComponentsSection } from './CoreComponentsSection';
import { defaultContent } from '../../BrainGardenOverview.constants';

const meta = {
  title: 'Pages/01-WhitePaper/03-BrainGardenOverview/02-CoreComponentsSection',
  component: CoreComponentsSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CoreComponentsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coreComponentsProps: defaultContent.coreComponents
  },
}; 

export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view of the Core Components Section. This story tests responsive behavior at mobile viewport sizes.',
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
        story: 'Tablet view of the Core Components Section. This story tests responsive behavior at tablet viewport sizes.',
      },
    },
  },
}; 