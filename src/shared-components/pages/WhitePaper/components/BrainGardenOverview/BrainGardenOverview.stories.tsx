import type { Meta, StoryObj } from '@storybook/react';
import { BrainGardenOverview } from './BrainGardenOverview';
import { defaultContent } from './BrainGardenOverview.constants';

const meta = {
  title: 'Pages/01-WhitePaper/03-BrainGardenOverview',
  component: BrainGardenOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section component that explains the Brain Garden System, including core components, force multipliers, system architecture, and navigation.'
      }
    }
  },
} satisfies Meta<typeof BrainGardenOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the BrainGardenOverview section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    heroProps: defaultContent.hero,
    introProps: defaultContent.intro,
    coreComponentsProps: defaultContent.coreComponents,
    forceMultipliersProps: defaultContent.forceMultipliers,
    systemArchitectureProps: defaultContent.systemArchitecture,
    navigationProps: defaultContent.navigation,
    keyBenefitsProps: defaultContent.keyBenefits,
    ctaProps: defaultContent.cta,
  },
};