import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BrainGardenOverview } from './BrainGardenOverview';
import { defaultContent } from './BrainGardenOverview.constants';
import { enhanceHeroProps } from './BrainGardenOverview.logic';

const meta = {
  title: 'Pages/01-WhitePaper/03-BrainGardenOverview',
  component: BrainGardenOverview,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A section component that explains the Brain Garden System, including core components, force multipliers, system architecture, and navigation.'
      }
    }
  },
} satisfies Meta<typeof BrainGardenOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

const safeHeroProps = (raw: any) => {
  const enhanced = enhanceHeroProps(raw);
  return {
    ...enhanced,
    title: enhanced.title || '',
    subtitle: enhanced.subtitle || '',
  };
};

const defaultArgs = {
  heroProps: safeHeroProps(defaultContent.hero),
  introProps: defaultContent.intro,
  coreComponentsProps: defaultContent.coreComponents,
  forceMultipliersProps: defaultContent.forceMultipliers,
  systemArchitectureProps: defaultContent.systemArchitecture,
  navigationProps: defaultContent.navigation,
  keyBenefitsProps: defaultContent.keyBenefits,
  ctaProps: defaultContent.cta
};

/**
 * Desktop view of the BrainGardenOverview section.
 */
export const Desktop: Story = {
  args: defaultArgs,
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the BrainGardenOverview section.
 */
export const Mobile: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the BrainGardenOverview section.
 */
export const Tablet: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
};