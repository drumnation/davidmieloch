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