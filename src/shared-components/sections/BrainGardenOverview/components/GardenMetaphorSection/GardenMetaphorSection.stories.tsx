import type { Meta, StoryObj } from '@storybook/react';
import { GardenMetaphorSection } from './GardenMetaphorSection';

const meta = {
  title: 'Pages/01-WhitePaper/03-BrainGardenOverview/04-GardenMetaphorSection',
  component: GardenMetaphorSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GardenMetaphorSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
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
        story: 'Mobile viewport version of the GardenMetaphorSection component to test responsive behavior at mobile sizes.',
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
        story: 'Tablet viewport version of the GardenMetaphorSection component to test responsive behavior at tablet sizes.',
      },
    },
  },
}; 