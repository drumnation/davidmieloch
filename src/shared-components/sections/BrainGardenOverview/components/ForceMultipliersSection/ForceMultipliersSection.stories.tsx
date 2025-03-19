import type { Meta, StoryObj } from '@storybook/react';
import { ForceMultipliersSection } from './ForceMultipliersSection';
import { defaultContent } from '../../BrainGardenOverview.constants';

const meta = {
  title: 'Pages/01-WhitePaper/03-BrainGardenOverview/03-ForceMultipliersSection',
  component: ForceMultipliersSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ForceMultipliersSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    forceMultipliersProps: defaultContent.forceMultipliers
  },
}; 