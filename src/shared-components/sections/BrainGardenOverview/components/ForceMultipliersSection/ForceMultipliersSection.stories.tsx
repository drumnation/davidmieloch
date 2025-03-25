import type { Meta, StoryObj } from '@storybook/react';
import { ForceMultipliersSection } from './ForceMultipliersSection';
import { defaultContent } from '../../BrainGardenOverview.constants';
import { Icon } from '../../../../atoms/Icon';

const meta = {
  title: 'sections/BrainGardenOverview/ForceMultipliersSection',
  component: ForceMultipliersSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ForceMultipliersSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const transformedContent = {
  ...defaultContent.forceMultipliers,
  features: defaultContent.forceMultipliers.features.map(feature => ({
    ...feature,
    icon: <Icon name={feature.icon} source="tabler" size={24} />
  }))
};

export const Default: Story = {
  args: {
    forceMultipliersProps: transformedContent
  },
}; 