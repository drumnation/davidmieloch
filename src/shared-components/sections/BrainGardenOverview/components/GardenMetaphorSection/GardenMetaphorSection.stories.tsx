import type { Meta, StoryObj } from '@storybook/react';
import { GardenMetaphorSection } from './GardenMetaphorSection';

const meta = {
  title: 'Sections/03-BrainGardenOverview/04-GardenMetaphorSection',
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